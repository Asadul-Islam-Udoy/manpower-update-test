import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import LodderFrom from "../lodder/LodderFrom";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminRegisterAction,
  getAllAdminListsAction,
  refreshAuthAction,
  registerOtpAction,
} from "../../action/auth_admin/AdminAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function NewAdminRegister() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [otp, setOtp] = useState("");
  const [showOtpFrom, setShowOtpFrom] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, lodding, isRegister, isUserOtp } = useSelector(
    (state) => state.registerState
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warn("confirm password is not match!");
    }
    const myfrom = new FormData();
    myfrom.set("name", name);
    myfrom.set("email", email);
    myfrom.set("phone", phone);
    myfrom.set("password", password);
    myfrom.set("userRole", userRole);
    dispatch(AdminRegisterAction(myfrom));
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    dispatch(registerOtpAction(otp));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRegister) {
      toast.success("send otp new admin user email address!");
      setShowOtpFrom(true);
    }
    if (isUserOtp) {
      toast.success("new admin user create successfully!");
      setOpen(false);
    }

    dispatch(getAllAdminListsAction());
    dispatch(refreshAuthAction());
  }, [
    dispatch,
    error,
    isRegister,
    toast,
    navigate,
    open,
    isUserOtp,
  ]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="worker__delete__container"
      >
        {showOtpFrom ? (
          <>
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
              <QuizIcon /> {"Validation New Admin User?"}
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
              <form onSubmit={handleSubmitOtp}>
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
                  <Typography>Verified Otp</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 4" }}
                    value={otp}
                    required
                    style={{ color: "red" }}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  {lodding ? (
                    <LodderFrom text="Creating" />
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
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </form>
            </DialogContent>
          </>
        ) : (
          <>
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
              <QuizIcon /> {"Create New Admin User?"}
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
                  <Typography>Name</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 4" }}
                    value={name}
                    required
                    style={{ color: "red" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Typography>Email Address</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    required
                    type="email"
                    value={email}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Typography>Phone Number</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    required
                    value={phone}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Typography>Password</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Typography>Confirm Password</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    required
                    value={confirmPassword}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Select
                    fullWidth
                    variant="filled"
                    type="text"
                    value={userRole}
                    sx={{ gridColumn: "span 4" }}
                    style={{ cursor: "pointer" }}
                    required
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option>Select Service Category</option>
                    {['super-admin','admin']?.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  {lodding ? (
                    <LodderFrom text="Sending" />
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
                    >
                      Create
                    </Button>
                  )}
                </Box>
              </form>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

export default NewAdminRegister;
