import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import WorkerDeleteModel from "../../components/modal/DeleteModal";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  GetAllResumeAction,
  WorkerRefreshAction,
} from "../../action/auth_user/UserAction";
import WorkerApplyResumeModel from "../../components/modal/WorkerApplyResumeModal";
import ArupResumeModal from "../../components/modal/ArupResumeModal";
const WorkerApplyIndex = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showResume, setShowResume] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showArupModal, setShowArupModal] = useState(false);
  const [resumeString, setResumeString] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { error, isapplyDelete, getallapplyresume } = useSelector(
    (state) => state.workerResumeApplyState
  );

  const deleteHandler = (id) => {
    setUserId(id);
    setDeleteModal((pre) => !pre);
  };

  const arupResumeHandler = (id) => {
    setUserId(id);
    setShowArupModal((pre) => !pre);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isapplyDelete) {
      toast.success("worker resume delete successfully");
      setDeleteModal((pre) => !pre);
    }
    dispatch(GetAllResumeAction());
    dispatch(WorkerRefreshAction());
  }, [dispatch, error, isapplyDelete, toast]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 0.1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Apply Phone Number Or Email",
      flex: 1,
    },
    {
      field: "userphoneemail",
      headerName: "Phone Number Or Email",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "resume",
      headerName: "Resume",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div
              onClick={() => [
                setShowResume((pre) => !pre),
                setResumeString(params.row.resume),
              ]}
            >
              <img
                className="h-12 w-14 cursor-pointer"
                src="https://static.vecteezy.com/system/resources/previews/023/234/824/non_2x/pdf-icon-red-and-white-color-for-free-png.png"
              />
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  marginLeft: "3px",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0px 10px",
                  cursor: "pointer",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="arup resume"
                onClick={() => arupResumeHandler(params.row.userid)}
              >
                <DoneAllIcon style={{ color: "white" }} />
              </button>
              <button
                style={{
                  backgroundColor: "#ef630f",
                  marginLeft: "3px",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0px 10px",
                  cursor: "pointer",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="delete"
                onClick={() => deleteHandler(params.row.userid)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        );
      },
    },
  ];
  const isDarkMode = theme.palette.mode === "dark";
  let mockDataWorkers = [];

  getallapplyresume.forEach((item, index) => {
    mockDataWorkers.push({
      sn: index + 1,
      id: item?.workerProfile?._id,
      userid: item?.workerResume?.user,
      name: item?.workerResume?.name,
      phone: item?.workerResume?.phone,
      userphoneemail: item?.workerProfile?.phone_or_email,
      address: item?.workerResume?.address,
      description: item?.workerResume?.description,
      resume: item?.workerResume?.resume,
    });
  });

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
          <Topbar setIsSidebar={setIsSidebar} />

          {/* worker delete modal */}
          {deleteModal && <WorkerDeleteModel workerId={userId} />}
          {showArupModal && <ArupResumeModal workerId={userId} />}
          <div className="flex justify-between p-1 pb-0 justify-items-center">
            <Header title="Apply Workers" />
          </div>
          <Box
            m="20px"
            sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
            }}
          >
            <div className="w-[100vw]">
              {showResume && (
                <WorkerApplyResumeModel resumeString={resumeString} />
              )}
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
};

export default WorkerApplyIndex;
