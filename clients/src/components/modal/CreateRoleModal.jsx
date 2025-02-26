import { useState } from "react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import LodderFrom from "../lodder/LodderFrom";
function CreateRoleModal() {
  const [lodding] = useState(false);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {};
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

export default CreateRoleModal;
