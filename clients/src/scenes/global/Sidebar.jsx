import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { ProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ApprovalIcon from "@mui/icons-material/Approval";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import CategoryIcon from "@mui/icons-material/Category";
import { useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { userInfo } = useSelector((state) => state.loginState);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {" "}
                <img
                  alt="profile-user"
                  src={Localhost + `/images/avatars/${userInfo?.user?.avatar}`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                    height: "100px",
                    width: "100px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo?.user?.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {(userInfo?.user?.permissions?.includes("admin-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="User Permissions"
                to="/dashboard/permissions"
                icon={<GroupIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("worker-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Workers"
                to="/dashboard/worker"
                icon={<EngineeringIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("client-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Clients"
                to="/dashboard/client"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("service-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Services"
                to="/dashboard/services"
                icon={<CleaningServicesIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("service-category-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Categories"
                to="/dashboard/services/categories"
                icon={<CategoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes(
              "client-notification-lists"
            ) ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Notifications"
                to="/dashboard/notifications/"
                icon={<NotificationsActiveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("apply-worker-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Workers Apply"
                to="/dashboard/applications"
                icon={<ApprovalIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("banner-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Banner Informations"
                to="/dashboard/banners"
                icon={<ViewCarouselIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes(
              "invoices-balances-lists"
            ) ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Invoices Balances"
                to="/dashboard/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("booking-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Bookings"
                to="/dashboard/booking"
                icon={<LaptopChromebookIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(userInfo?.user?.permissions?.includes("home-pages-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Manage Home Pages"
                to="/dashboard/home/page"
                icon={<AccountBalanceIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {(userInfo?.user?.permissions?.includes("admin-profile-lists") ||
              userInfo?.user?.userType == "super-admin") && (
              <Item
                title="Profile Form"
                to={`/dashboard/admin/profile/${userInfo?.user?._id}`}
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {/* <Item
              title="FAQ Pages"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
