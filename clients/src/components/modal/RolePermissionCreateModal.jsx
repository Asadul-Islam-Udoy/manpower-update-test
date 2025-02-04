import React, { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoleAction,
  getAllPermissionListsAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
import { toast } from "react-toastify";
import LodderFrom from "../lodder/LodderFrom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PermissionCreateModal() {
  const [open, setOpen] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { error, lodding, allPermissionLists, isRoleCreate } = useSelector(
    (state) => state.registerState
  );
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    dispatch(createRoleAction(roleName, permissions));
  };

  useEffect(() => {
    dispatch(getAllPermissionListsAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRoleCreate) {
      toast.success("role create successfully!");
      setOpen(false);
    }
    dispatch(refreshAuthAction());
  }, [dispatch, error, isRoleCreate, toast, open]);
  
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            {lodding ? (
              <LodderFrom />
            ) : (
              <Button autoFocus color="inherit" onClick={submitHandler}>
                save
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <List>
          <Typography style={{
                width: "full",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}>Role Name</Typography>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            sx={{ gridColumn: "span 4" }}
            value={roleName}
            required
            style={{ color: "red" }}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Divider />
          <ListItemButton
          style={{
            width: "full",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "gray",
            marginTop:'20px'
          }}
          >
            <p
              style={{
                width: "full",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              User All Permission Lists
            </p>
          </ListItemButton>
          <div className="w-[100%] ">
            {allPermissionLists?.map((item, index) => (
              <div key={index} className=" inline-block w-[90%] ml-3">
                <div
                  onClick={() =>
                    !permissions.includes(item._id)
                      ? setPermissions((pre) => [...pre, item._id])
                      : setPermissions(
                          permissions.filter((i) => i !== item._id)
                        )
                  }
                  className="flex justify-center  items-center m-4"
                >
                  <Checkbox {...label} defaultChecked={false} color="success" />
                  <Typography>{item.name}</Typography>
                </div>
              </div>
            ))}
          </div>
        </List>
      </Dialog>
    </>
  );
}
