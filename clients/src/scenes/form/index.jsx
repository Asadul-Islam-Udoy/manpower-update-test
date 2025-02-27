import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import { updateAdminProfileAction } from "../../action/auth_admin/AdminAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import LodderFrom from "../../components/lodder/LodderFrom";
import AdminProfileSidbar from "../global/AdminProfileSidbar";
import UpdateAdminEamilModal from "../../components/modal/UpdateAdminEamilModal";
import UpdateAdminPasswordModal from "../../components/modal/UpdateAdminPasswordModal";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { lodding, error, isProfileUpdate, userInfo } = useSelector(
    (state) => state.loginState
  );
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [name, setName] = useState(userInfo?.user?.name);
  const [avatar, setAvatar] = useState("");
  const [showAvatar, setShowAvatar] = useState(userInfo?.user?.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myfrom = new FormData();
    myfrom.set("name", name);
    myfrom.append("avatar", avatar);
    dispatch(updateAdminProfileAction(userInfo?.user?._id, myfrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isProfileUpdate) {
      toast.success("profile update successfully!");
    }
  }, [error, isProfileUpdate, toast]);

  return (
    <div className="sidbar__app">
      <Sidebar isSidebar={isSidebar} />
      <div
        className={
          theme.palette.mode === "dark"
            ? "sidbar__content"
            : "sidbar__container__2"
        }
      >
        <Topbar setIsSidebar={setIsSidebar} />
        {showEmailUpdate && (
          <UpdateAdminEamilModal setShowEmailUpdate={setShowEmailUpdate} />
        )}
        {showPasswordUpdate && (
          <UpdateAdminPasswordModal
            setShowPasswordUpdate={setShowPasswordUpdate}
          />
        )}
        <Box m="20px">
          <div className="flex justify-between">
            <Header
              title="ADMIN PROFILE"
              subtitle="You Can Update  Admin Profile"
            />
            <div>
              {" "}
              {!showEmailUpdate && !showPasswordUpdate ? (
                <AdminProfileSidbar
                  setShowEmailUpdate={setShowEmailUpdate}
                  setShowPasswordUpdate={setShowPasswordUpdate}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatar ? (
              <Typography>
                <Avatar
                  style={{ height: "200px", width: "200px" }}
                  src={avatar && URL.createObjectURL(avatar)}
                />
              </Typography>
            ) : (
              <Link to={Localhost + `/images/avatars/${showAvatar}`}>
                <Typography>
                  <Avatar
                    style={{ height: "200px", width: "200px" }}
                    src={Localhost + `/images/avatars/${showAvatar}`}
                  />
                </Typography>
              </Link>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              flexDirection="column"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 2",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                required
                type="text"
                label={`${name ? "" : "Name"}`}
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                name="avatar"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {lodding ? (
                <LodderFrom text="Updating" />
              ) : (
                <>
                  {(userInfo?.user?.permissions?.includes(
                    "admin-profile-update"
                  ) ||
                    userInfo?.user?.userType == "super-admin") && (
                    <Button
                      type="submit"
                      className=" hover:text-white"
                      style={{ fontWeight: "bold" }}
                      color="secondary"
                      variant="contained"
                    >
                      Update Admin
                    </Button>
                  )}
                </>
              )}
            </Box>
          </form>
        </Box>
      </div>
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default AdminProfile;
