import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicesCategoriesAction,
  getAllCategoriesServicesAction,
  refreshServiceCategoryAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import LodderFrom from "../lodder/LodderFrom";

function ServiceCategoryCreateModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState(null);
  const [color, setColor] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lodding, error, isCategoryCreate, allCategoriesServices } =
    useSelector((state) => state.servicesCategoiesState);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("category_name", categoryName);
    myFrom.set("frontImage", frontImage);
    myFrom.set("backImage", backImage);
    myFrom.set("description", description);
    myFrom.set("color", color);
    if (parentId !== null) {
      myFrom.set("parentId", parentId);
    }
    dispatch(createServicesCategoriesAction(myFrom));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isCategoryCreate) {
      toast.success("service category create successfully!");
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceCategoryAction());
  }, [dispatch, error, toast, navigate, isCategoryCreate]);

  React.useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch]);

  return (
    <React.Fragment>
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
          <QuizIcon /> {"Create Service Category?"}
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
              gap="20px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 2",
                },
              }}
            >
              <div>
                <Typography sx={{ gridColumn: "span 2" }}>
                  Service Category Name
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  sx={{ gridColumn: "span 2" }}
                  value={categoryName}
                  style={{ color: "red" }}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Typography>Description</Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={description}
                  sx={{ gridColumn: "span 2" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Typography sx={{ gridColumn: "span 2" }}>
                  Select Parent Service Category
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  value={parentId}
                  sx={{ gridColumn: "span 2" }}
                  style={{ cursor: "pointer" }}
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option>Select Service Category</option>
                  {allCategoriesServices?.map((item) => (
                    <MenuItem value={item._id}>{item.category_name}</MenuItem>
                  ))}
                </Select>
              </div>

              <div>
                <Typography>Color</Typography>
                <TextField
                  fullWidth
                  required
                  type="color"
                  value={color}
                  sx={{ gridColumn: "span 2" }}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <div>
                <Typography sx={{ gridColumn: "span 2" }}>
                  Service Front Category Image
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  sx={{ gridColumn: "span 2" }}
                  onChange={(e) => setFrontImage(e.target.files[0])}
                />
                <div>
                  {frontImage && (
                    <div style={{ margin: "4px" }}>
                      <img
                        style={{ height: "40px", width: "40px" }}
                        src={frontImage && URL.createObjectURL(frontImage)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Typography sx={{ gridColumn: "span 2" }}>
                  Service Back Category Image
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  sx={{ gridColumn: "span 4" }}
                  onChange={(e) => setBackImage(e.target.files[0])}
                />
                <div>
                  {backImage && (
                    <div style={{ margin: "4px" }}>
                      <img
                        style={{ height: "40px", width: "40px" }}
                        src={backImage && URL.createObjectURL(backImage)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {lodding ? (
                <LodderFrom text="Creating" />
              ) : (
                <Button
                  disabled={buttonDisabled}
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "rgb(80, 166, 245)",
                  }}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Create Service Category
                </Button>
              )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ServiceCategoryCreateModal;
