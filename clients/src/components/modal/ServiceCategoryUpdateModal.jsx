import React, { useState, useEffect } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesServicesAction,
  refreshServiceCategoryAction,
  updateServicesCategoriesAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Localhost } from "../../action/host/HostConnection";
import LodderFrom from "../lodder/LodderFrom";

function ServiceCategoryUpdateModal({ categoryId }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lodding, error, allCategoriesServices, isCategoryUpdate } =
    useSelector((state) => state.servicesCategoiesState);
  const dispatch = useDispatch();
  const singleService = allCategoriesServices?.find(
    (i) => i._id === categoryId
  );
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [shwoFrontImage, setShowFrontImage] = useState(
    singleService?.frontImage
  );
  const [shwoBackImage, setShowBackImage] = useState(singleService?.backImage);
  const [color, setColor] = useState(singleService?.color);
  const [categoryName, setCategoryName] = useState(
    singleService?.category_name
  );
  const [description, setDescription] = useState(singleService?.description);
  const [parentId, setParentId] = useState(singleService?.parentId);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("category_name", categoryName);
    myFrom.set("description", description);
    myFrom.set("parentId", parentId);
    myFrom.set("color", color);
    if (frontImage) {
      myFrom.set("frontImage", frontImage);
    }
    if (backImage) {
      myFrom.set("backImage", backImage);
    }
    dispatch(updateServicesCategoriesAction(categoryId, myFrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isCategoryUpdate) {
      toast.success("service category update successfully!");
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceCategoryAction());
  }, [dispatch, error, toast, navigate, isCategoryUpdate]);

  useEffect(() => {
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
          <QuizIcon /> {"Update Service Category?"}
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
                <Typography sx={{ gridColumn: "span 2" }}>Color</Typography>
                <TextField
                  fullWidth
                  type="color"
                  value={color}
                  sx={{ gridColumn: "span 2" }}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <Typography>Service Category Front Image</Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  inputProps={{ accept: "image/*" }}
                  type="file"
                  sx={{ gridColumn: "span 4" }}
                  onChange={(e) => setFrontImage(e.target.files[0])}
                />
                {frontImage ? (
                  <Typography>
                    <Typography>New Front Image</Typography>
                    <img
                      style={{ height: "80px", width: "80px" }}
                      src={frontImage && URL.createObjectURL(frontImage)}
                    />
                  </Typography>
                ) : (
                  <>
                    {shwoFrontImage && (
                      <Typography>
                        <Typography>Old Front Image</Typography>
                        <img
                          style={{ height: "80px", width: "80px" }}
                          src={
                            Localhost +
                            `/images/services_categories/${shwoFrontImage}`
                          }
                        />
                      </Typography>
                    )}
                  </>
                )}
              </div>

              <div>
                {/* backe image */}
                <Typography>Service Category Back Image</Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  sx={{ gridColumn: "span 4" }}
                  onChange={(e) => setBackImage(e.target.files[0])}
                />
                {backImage ? (
                  <Typography>
                    <Typography>New Back Image</Typography>
                    <img
                      style={{ height: "80px", width: "80px" }}
                      src={backImage && URL.createObjectURL(backImage)}
                    />
                  </Typography>
                ) : (
                  <>
                    {shwoBackImage && (
                      <Typography>
                        <Typography>Old Back Image</Typography>
                        <img
                          style={{ height: "80px", width: "80px" }}
                          src={
                            Localhost +
                            `/images/services_categories/${shwoBackImage}`
                          }
                        />
                      </Typography>
                    )}
                  </>
                )}
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {lodding ? (
                <LodderFrom text="Updating" />
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
                  Update
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

export default ServiceCategoryUpdateModal;
