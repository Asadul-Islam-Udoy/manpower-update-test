import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkerConfrimAction,
  createWorkerOtpAction,
  refreshWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import LodderFrom from "../../components/lodder/LodderFrom";
const WorkerCreate = () => {
  const theme = useTheme();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [showOtpFrom, setShowOtpFrom] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [userType, setUserType] = useState("worker");
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfromPassword] = useState("");
  const navigate = useNavigate();
  const { error, lodding, isOtpWorker, isConfirmWorker } = useSelector(
    (state) => state.allworkerState
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isOtpWorker) {
      toast.success("send otp your phone");
      setShowOtpFrom(true);
      setButtonDisabled(false);
    }
    if (isConfirmWorker) {
      toast.success("worker create successfully!");
      navigate("/dashboard/worker");
      setShowOtpFrom(false);
      setButtonDisabled(false);
    }
    dispatch(refreshWorkerAction());
  }, [error, toast, isOtpWorker, navigate, isConfirmWorker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warn("confirm password is not match!");
    }
    if (phone == "" && email == "") {
      return toast.warn("at list you hove to be a give email or phone");
    }
    const newFrom = new FormData();
    newFrom.set("username", username);
    newFrom.set("phone", phone);
    newFrom.set("email", email);
    newFrom.set("password", password);
    newFrom.set("userType", userType);
    dispatch(createWorkerOtpAction(newFrom));
    setButtonDisabled(true);
  };

  const handleSubmitConfrim = (e) => {
    e.preventDefault();
    dispatch(createWorkerConfrimAction(phoneOtp, "admin"));
    setButtonDisabled(true);
  };
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2 "
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <Header title="CREATE WORKER" subtitle="Create a New Worker" />

            <Formik>
              {showOtpFrom ? (
                <form onSubmit={handleSubmitConfrim}>
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      placeholder="Enter Otp Number"
                      sx={{ gridColumn: "span 4" }}
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      required
                    />
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
                        disabled={buttonDisabled}
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                </form>
              ) : (
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      placeholder="worker name..."
                      sx={{ gridColumn: "span 4" }}
                      className=" text-white"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      placeholder="worker contact number ..."
                      sx={{ gridColumn: "span 4" }}
                      className=" text-white"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="email"
                      placeholder="worker contact  email address..."
                      sx={{ gridColumn: "span 4" }}
                      className=" text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      placeholder="worker password..."
                      sx={{ gridColumn: "span 4" }}
                      className=" text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      placeholder="worker confirm password..."
                      sx={{ gridColumn: "span 4" }}
                      className=" text-white"
                      value={confirmPassword}
                      onChange={(e) => setConfromPassword(e.target.value)}
                      required
                    />
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
                        disabled={buttonDisabled}
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Create New Worker
                      </Button>
                    )}
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
};

export default WorkerCreate;
