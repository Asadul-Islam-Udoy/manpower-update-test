import * as React from "react";
import { Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { getSingleWorkerAction, workerisFreeUpdateAction } from "../../action/auth_admin/AdminMaintainAction";

function WorkerStatusModal({ workerId, workerName ,id }) {
    const [show, setShow] = React.useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const { singleworker } = useSelector((state) => state.sigleWorkerState);
    const [workerStatus, setWorkerStaus] = React.useState(singleworker?.worker?.is_free);
    const handleShow = () => setShow(true);
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    const { isUpdateWorker, error } = useSelector(
        (state) => state.allworkerState
    );
    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (isUpdateWorker) {
            toast.success("worker is free update successfully!");
            setOpen(false);
            window.location.reload();
        }
    }, [isUpdateWorker, error, toast]);



    const statusUpdateHandler = (workerId, workerStatus) => {
      dispatch(workerisFreeUpdateAction(workerId, workerStatus));
    }

    React.useEffect(() => {
        dispatch(getSingleWorkerAction(id));
    }, [dispatch,id]);
    
    React.useEffect(() => {
        setWorkerStaus(singleworker?.worker?.is_free)
    }, [dispatch.singleworker?.worker?.is_free]);
    const isDarkMode = theme.palette.mode === "dark";
    return (
        <>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="worker__delete__container"
                >
                    <DialogTitle
                        style={{ display: "flex", fontSize: "25px", backgroundColor: theme.palette.mode === "dark" ? 'rgb(18, 48, 85)' : 'rgb(225, 218, 218)' }}
                        id="alert-dialog-title"
                    >
                        <QuizIcon /> {"are sure you want to update this worker status?"}
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: theme.palette.mode === "dark" ? 'rgb(18, 48, 85)' : 'rgb(225, 218, 218)' }}>
                        <DialogContentText
                            style={{
                                color: "white",
                                display: "flex",
                                fontWeight: "bold",
                                fontSize: "30px",
                                fontStyle: "italic",
                                margin: "10px",
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            id="alert-dialog-description"
                        >
                            {workerName} Status
                        </DialogContentText>
                        <div>
                            <Typography style={{marginLeft:'16px'}} sx={{ gridColumn: "span 4" }}>
                                Worker Is Free
                            </Typography>
                            <select
                                style={{ borderBottom: "1px solid black" }}
                                onChange={(e) => setWorkerStaus(e.target.value)}
                                className={`p-[10px] w-[95%]  ml-5 rounded-t-[2px] ${isDarkMode
                                    ? "bg-gray-700"
                                    : "bg-gray-200 p-[14px]"
                                    }`}
                            >
                               
                                {[
                                    'YES',
                                    'NO'
                                ].map((item) => (
                                    <option  value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ color: "white", borderRadius:'5px', backgroundColor: "red", padding: '5px 30px', border: 'none' }}
                            onClick={handleClose}
                        >
                            Disagree
                        </Button>
                        <Button
                            style={{ color: "white", borderRadius:'5px', backgroundColor:"rgb(80, 166, 245)", padding: '5px 35px', border: 'none' }}
                            onClick={() => statusUpdateHandler(workerId,workerStatus)}
                            autoFocus
                            disabled={buttonDisabled}
                        >

                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
}

export default WorkerStatusModal;
