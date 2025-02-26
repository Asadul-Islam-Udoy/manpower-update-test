import { useContext, useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/dashboard/Header";
import { getAllRoleListsAction } from "../../action/auth_admin/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteRoleModal from "../../components/modal/DeleteRoleModal";
import UpdateRolePermissionModal from "../../components/modal/UpdateRolePermissionModal";
function UpdateRole() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const [roleId, setRoleId] = useState("");
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const { error, lodding, allRoleLists } = useSelector(
    (state) => state.registerState
  );
  const { userInfo } = useSelector((state) => state.loginState);
  useEffect(() => {
    dispatch(getAllRoleListsAction());
  }, [dispatch]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "name",
      headerName: "Role",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 3,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            {(userInfo?.user?.permissions?.includes("admin-role-update") ||
              userInfo?.user?.userType == "super-admin") && (
              <button
                onClick={() => [
                  setRoleId(params.row.id),
                  setIsShowUpdate((pre) => !pre),
                ]}
                title="udate role"
                className="bg-blue-600 italic  h-12 mt-[0.4px] text-center font-bold rounded-sm py-[0] px-6"
              >
                Update
              </button>
            )}
            {(userInfo?.user?.permissions?.includes("admin-role-delete") ||
              userInfo?.user?.userType == "super-admin") && (
              <button
                onClick={() => [
                  setRoleId(params.row.id),
                  setIsShowDelete((pre) => !pre),
                ]}
                title="delete role"
                className="text-center ml-2 italic  font-bold h-12 mt-[0.4px] rounded-sm py-[0] px-6 bg-red-600"
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
  if (allRoleLists?.length > 0) {
    allRoleLists.forEach((item, index) => {
      mockDataWorkers.push({
        sn: index + 1,
        id: item._id,
        name: item.name,
        permissions: item?.permissions?.map((item, index) => item.name),
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
          {isShowDelete && <DeleteRoleModal roleId={roleId} />}
          {isShowUpdate && <UpdateRolePermissionModal roleId={roleId} />}
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
            <div className="flex w-full m-2">
              <div>
                <div
                  onClick={() => navigate(-1)}
                  style={{ color: "white", width: "100%" }}
                >
                  <Button className="!py-2 !px-5 !font-bold !text-white !bg-blue-500 !capitalize">
                    <ArrowCircleLeftIcon />
                  </Button>
                </div>
              </div>
              {/* worker district input */}
            </div>
            {/* worker division input */}
            <div className="flex justify-between p-1 pb-0 justify-items-center">
              <Header title="User Roles" />
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

export default UpdateRole;
