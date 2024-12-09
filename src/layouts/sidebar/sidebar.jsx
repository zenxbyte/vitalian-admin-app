import React from "react";

import Drawer from "@mui/material/Drawer";
import SidebarItems from "./sideBarItems/sideBarItems";

const SideBar = ({ isOpen, toggleDrawer }) => {
  const drawerWidth = 280;

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      variant="temporary"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
    >
      <SidebarItems toggleMobileSidebar={toggleDrawer} />
    </Drawer>
  );
};

export default SideBar;
