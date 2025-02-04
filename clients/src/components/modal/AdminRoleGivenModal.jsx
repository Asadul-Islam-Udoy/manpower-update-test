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
import { toast } from "react-toastify";
import LodderFrom from "../lodder/LodderFrom";
import {
  getAllRoleListsAction,
  givenRolePermissionAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminRoleGivenModal({ adminId }) {
  const [open, setOpen] = useState(true);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { error, lodding, allRoleLists, allAdminLists, isRolePermission } =
    useSelector((state) => state.registerState);

  //find admin
  const findAdmin = allAdminLists.find((i) => i._id == adminId);

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    dispatch(givenRolePermissionAction(adminId, roles));
  };

  useEffect(() => {
    dispatch(getAllRoleListsAction());
  }, [dispatch]);


  /// initial values show
  useEffect(() => {
    if (findAdmin?.roles?.length > 0) {
      findAdmin?.roles.forEach((item) => {
        if (!roles.includes(item._id)) {
          setRoles((pre) => [...pre, item._id]);
        }
        if (
          !permissions.some((i) => JSON.stringify(i) === JSON.stringify(item))
        ) {
          setPermissions((pre) => [...pre, item]);
        }
      });
    }
  }, []);

  ///select valuse
  const findHandler = (item) => {
    if (!roles.includes(item._id)) {
      setRoles((pre) => [...pre, item._id]);
    } else {
      setRoles(roles.filter((i) => i !== item._id));
    }
    if (!permissions.some((i) => JSON.stringify(i) === JSON.stringify(item))) {
      setPermissions((pre) => [...pre, item]);
    } else {
      setPermissions(permissions.filter((i) => i._id !== item._id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRolePermission) {
      toast.success("user roles create successfully!");
      setOpen(false);
    }
    dispatch(refreshAuthAction());
  }, [dispatch, error, isRolePermission, toast, open]);

  ///check include data
  function checkMethodHandler(item, findAdmin) {
    if (
      findAdmin?.roles?.some((i) => JSON.stringify(i) === JSON.stringify(item))
    ) {
      return true;
    } else {
      return false;
    }
  }
  
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
          <ListItemButton
            style={{
              width: "full",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "gray",
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
              User All Roles Lists
            </p>
          </ListItemButton>
          <div className=" w-full py-4">
            {allRoleLists?.map((item, index) => (
              <div key={index} className="inline-block ml-3">
                <div
                  onClick={() => findHandler(item)}
                  className="flex justify-center items-center m-4"
                >
                  <Checkbox
                    {...label}
                    defaultChecked={checkMethodHandler(item, findAdmin)}
                    color="success"
                  />
                  <Typography>{item.name}</Typography>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-500 w-full text-orange-500 min-h-[80vh]">
            <Divider />
            <ListItemButton
              style={{
                width: "full",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "gray",
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
            <div className=" w-full py-4">
              {permissions?.length > 0 ? (
                <>
                  {[...new Map(permissions?.map(i=>[i._id,i])).values()]?.map((item, index) => (
                    <div key={index} className="inline-block ml-3">
                      <div className="flex justify-center items-center m-4">
                        {item?.permissions?.map((per, index) => (
                          <p
                            style={{
                              margin: "10px",
                              fontWeight: "bold",
                              color: "tomato",
                            }}
                          >
                            <b className="text-white">{index + 1}.</b>{" "}
                            {per.name}
                          </p>
                        ))}
                      </div>
                      <hr />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {allRoleLists?.map((item, index) => (
                    <div key={index} className="inline-block ml-3">
                      <div className="flex justify-center items-center m-2">
                        {item?.permissions?.map((per, index) => (
                          <p
                            style={{
                              margin: "10px",
                              fontWeight: "bold",
                              color: "tomato",
                            }}
                          >
                            <b className="text-white">{index + 1} .</b>{" "}
                            {per.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </List>
      </Dialog>
    </>
  );
}
