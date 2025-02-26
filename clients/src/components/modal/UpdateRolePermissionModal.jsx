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
  getAllRoleListsAction,
  refreshAuthAction,
  updateRoleAction,
} from "../../action/auth_admin/AdminAction";
import { toast } from "react-toastify";
import LodderFrom from "../lodder/LodderFrom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateRolePermissionModal({ roleId }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { error, lodding, allRoleLists, isRoleUpdate, allPermissionLists } =
    useSelector((state) => state.registerState);

  //find role
  const rolefind = allRoleLists?.find((i) => i._id == roleId);

  const [roleName, setRoleName] = useState(rolefind?.name);
  const [permissions, setPermissions] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (roleId, roleName, permissions) => {
    dispatch(updateRoleAction(roleId, roleName, permissions));
  };

  useEffect(() => {
    dispatch(getAllPermissionListsAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRoleUpdate) {
      toast.success("role update successfully!");
      setOpen(false);
    }
    dispatch(refreshAuthAction());
    dispatch(getAllRoleListsAction());
  }, [dispatch, error, isRoleUpdate, toast, open]);


  /// initial values show
  useEffect(() => {
    if (rolefind?.permissions?.length > 0) {
      rolefind?.permissions?.forEach((item) => {
        if (!permissions.includes(item._id)) {
          setPermissions((pre) => [...pre, item._id]);
        }
      });
    }
  }, []);


  ///check include data
  function checkMethodHandler(item, rolefind) {
    if (
      rolefind?.permissions?.some(
        (i) => JSON.stringify(i) === JSON.stringify(item)
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  console.log("per", permissions);
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
              <Button
                autoFocus
                color="inherit"
                onClick={() => submitHandler(roleId, roleName, permissions)}
              >
                Update
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <List>
          <Typography
            style={{
              width: "full",
              alignItems: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Role Name
          </Typography>
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
              marginTop: "20px",
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
          <div className=" w-full">
            {allPermissionLists?.map((item, index) => (
              <div key={index} className="inline-block ml-3">
                <div
                  onClick={() =>
                    !permissions.includes(item._id)
                      ? setPermissions((pre) => [...pre, item._id])
                      : setPermissions(
                          permissions.filter((i) => i !== item._id)
                        )
                  }
                  className="flex justify-center items-center m-4"
                >
                  <Checkbox
                    {...label}
                    defaultChecked={checkMethodHandler(item, rolefind)}
                    color="success"
                  />
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
