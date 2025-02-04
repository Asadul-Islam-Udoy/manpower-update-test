import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import {
  CreateServicesAction,
  getAllCategoriesServicesAction,
  refreshServiceAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import LodderFrom from "../lodder/LodderFrom";

function ServiceCreateModal() {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [image, setImage] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceOverview, setServiceOverview] = useState("");
  const [description, setDescription] = useState("");
  const [servicePrice, setServicePrice] = useState();
  const [schedules, setSchedules] = useState([]);
  const [serviceCategory, setServiceCategory] = useState("");
  const [minimumPaidCost, setMinimumPaidCost] = useState(0);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { allCategoriesServices } = useSelector(
    (state) => state.servicesCategoiesState
  );
  const { lodding, error, isServiceCreate } = useSelector(
    (state) => state.servicesState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("name", serviceName);
    myFrom.set("description", description);
    myFrom.set("service_category_id", serviceCategory);
    myFrom.set("service_price", servicePrice);
    myFrom.set("service_overview", serviceOverview);
    myFrom.set("image", image);
    myFrom.set("schedules", Array.from(new Set(schedules)));
    myFrom.set("minimum_advance_paid", minimumPaidCost);
    dispatch(CreateServicesAction(myFrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isServiceCreate) {
      toast.success("service create successfully!");
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceAction());
  }, [dispatch, error, toast, navigate, isServiceCreate]);

  const scheduleHandler = (item) => {
    if (!schedules.includes(item)) {
      setSchedules((pre) => [...pre, item]);
    } else {
      setSchedules((pre) => schedules.filter((i) => i !== item));
    }
  };

  const ScheduleLists = ["hours", "days", "weeks", "months", "years"];
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="worker__delete__container"
      >
        <DialogTitle
          style={{
            display: "flex",
            fontSize: "25px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgb(18, 48, 85)"
                : "rgb(225, 218, 218)",
          }}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Create Service?"}
          <Box>
            {image && (
              <div style={{ margin: "4px" }}>
                <img
                  style={{ height: "40px", width: "40px" }}
                  src={image && URL.createObjectURL(image)}
                />
              </div>
            )}
          </Box>
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgb(18, 48, 85)"
                : "rgb(225, 218, 218)",
          }}
        >
          <DialogContentText
            style={{
              color: "red",
              display: "flex",
              fontWeight: "bold",
              fontSize: "30px",
              fontStyle: "italic",
              margin: "10px",
            }}
            id="alert-dialog-description"
          ></DialogContentText>
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <Typography>Service Name</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{ gridColumn: "span 4" }}
                value={serviceName}
                required
                style={{ color: "red" }}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                required
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Typography>Service Price</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                required
                value={servicePrice}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setServicePrice(e.target.value)}
              />
              <Typography sx={{ gridColumn: "span 4" }}>
                Mimimum Advance Payment To Client
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                required
                value={minimumPaidCost}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setMinimumPaidCost(e.target.value)}
              />
              <Typography>Service Image</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="file"
                inputProps={{ accept: "image/*" }}
                required
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Typography sx={{ gridColumn: "span 4" }}>
                Service Category
              </Typography>
              <Select
                fullWidth
                variant="filled"
                type="text"
                value={serviceCategory}
                sx={{ gridColumn: "span 4" }}
                style={{ cursor: "pointer" }}
                required
                onChange={(e) => setServiceCategory(e.target.value)}
              >
                <option>Select Service Category</option>
                {allCategoriesServices?.map((item) => (
                  <MenuItem value={item._id}>{item.category_name}</MenuItem>
                ))}
              </Select>

              <div>
                <div className="md:w-[540px] w-full">
                  <Typography sx={{ gridColumn: "span 4" }}>
                    Service Overview
                  </Typography>
                  <ReactQuill
                    value={serviceOverview}
                    onChange={setServiceOverview}
                    theme="snow" // Snow theme is good for most use cases
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        ["bold", "italic", "underline", "strike"],
                        ["link"],
                        [{ color: [] }, { background: [] }],
                        [{ script: "sub" }, { script: "super" }],
                        ["blockquote", "code-block"],
                        [{ indent: "-1" }, { indent: "+1" }],
                        ["clean"], // 'clean' to remove formatting
                      ],
                    }}
                  />
                </div>
                <div className="py-3">
                  <Typography>Time Scheduling</Typography>
                  {ScheduleLists.map((i) => (
                    <FormControlLabel
                      label={i}
                      control={
                        <Checkbox
                          {...label}
                          color="secondary"
                          onClick={() => scheduleHandler(i)}
                        />
                      }
                    />
                  ))}
                </div>
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {lodding ? (
                <LodderFrom text='Creating'/>
              ) : (
                <Button
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "rgb(80, 166, 245)",
                  }}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={buttonDisabled}
                >
                  Create Service
                </Button>
              )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default ServiceCreateModal;
