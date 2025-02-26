import { useContext, useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/dashboard/Header";
import NewAdminRegister from "../../components/authUser/NewAdminRegister";
import PermissionCreateModal from "../../components/modal/RolePermissionCreateModal";
import { getAllAdminListsAction } from "../../action/auth_admin/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import AdminDeleteModal from "../../components/modal/AdminDeleteModal";
import AdminRoleGivenModal from "../../components/modal/AdminRoleGivenModal";
import { Link } from "react-router-dom";
function Permission() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");
  const [isShowCreateUser, setIsShowCreateUser] = useState(false);
  const [isShowRolePermission, setShowRolePermission] = useState(false);
  const [isShowAdminRolePermission, setShowAdminRolePermission] =
    useState(false);
  const { error, lodding, allAdminLists } = useSelector(
    (state) => state.registerState
  );
  const { userInfo } = useSelector((state) => state.loginState);
  useEffect(() => {
    dispatch(getAllAdminListsAction());
  }, [dispatch]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 2,
    },
    {
      field: "email",
      headerName: " Email Address",
      flex: 2,
    },
    {
      field: "roles",
      headerName: "User Roles",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            {(userInfo?.user?.permissions?.includes("admin-give-permission") ||
              userInfo?.user?.userType == "super-admin") && (
              <button
                onClick={() => [
                  setAdminId(params.row.id),
                  setShowAdminRolePermission((pre) => !pre),
                ]}
                title="admin permission"
                className="bg-blue-600 italic  h-12 mt-[0.4px] text-center font-bold rounded-sm py-[0] px-6"
              >
                Permission
              </button>
            )}
            {(userInfo?.user?.permissions?.includes("admin-delete") ||
              userInfo?.user?.userType == "super-admin") && (
              <button
                onClick={() => [
                  setAdminId(params.row.id),
                  setAdminName(params.row.name),
                  setIsShowDelete((pre) => !pre),
                ]}
                title="delete admin"
                className="text-center ml-2 italic  font-bold h-12 mt-[0.4px] rounded-sm py-[0] px-10 bg-red-600"
              >
                Delete
              </button>
            )}
          </>
        );
      },
    },
  ];
  const isDarkMode = theme.palette.mode === "dark";

  let mockDataWorkers = [];
  if (allAdminLists?.length > 0) {
    allAdminLists.forEach((item, index) => {
      mockDataWorkers.push({
        sn: index + 1,
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        roles: item?.roles?.map((item, index) => item.name),
      });
    });
  }
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          {isShowCreateUser && <NewAdminRegister />}
          {isShowRolePermission && <PermissionCreateModal />}
          {isShowDelete && (
            <AdminDeleteModal adminId={adminId} name={adminName} />
          )}
          {isShowAdminRolePermission && (
            <AdminRoleGivenModal adminId={adminId} />
          )}
          <Topbar setIsSidebar={setIsSidebar} />
          {/* worker delete modal */}
          <Box
            m="20px"
            sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
            }}
          >
            <div className="w-[100%] flex justify-center items-center"></div>
            {/* worker division input */}
            <div className="flex w-full m-2">
              <div>
                <div
                  onClick={() => setShowRolePermission((pre) => !pre)}
                  style={{ color: "white", width: "100%" }}
                >
                  {(userInfo?.user?.permissions?.includes(
                    "admin-role-create"
                  ) ||
                    userInfo?.user?.userType == "super-admin") && (
                    <Button className="!py-2 !px-5 !font-bold !text-white !bg-blue-500 !capitalize">
                      Create User Role
                    </Button>
                  )}
                </div>
              </div>
              <div className="ml-24">
                <Link to="/dashboard/permissions/roles">
                  <div
                    onClick={() => setShowRolePermission((pre) => !pre)}
                    style={{ color: "white", width: "100%" }}
                  >
                    {(userInfo?.user?.permissions?.includes(
                      "admin-role-lists"
                    ) ||
                      userInfo?.user?.userType == "super-admin") && (
                      <Button className="!py-2 !px-12 !font-bold !text-white !bg-orange-700 !capitalize">
                        Role Lists
                      </Button>
                    )}
                  </div>
                </Link>
              </div>
              {/* worker district input */}
            </div>
            <div className="flex justify-between p-1 pb-0 justify-items-center">
              <Header title="Permissions" />

              <div>
                <div
                  onClick={() => setIsShowCreateUser((pre) => !pre)}
                  style={{ color: "white", width: "100%" }}
                >
                  {(userInfo?.user?.permissions?.includes(
                    "admin-new-user-create"
                  ) ||
                    userInfo?.user?.userType == "super-admin") && (
                    <Button className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize">
                      Create New Admin
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Box
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <DataGrid
                slots={{
                  toolbar: GridToolbar,
                }}
                rows={mockDataWorkers}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Permission;
