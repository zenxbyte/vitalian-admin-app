import React from "react";

import Drawer from "@mui/material/Drawer";
import SidebarItems from "./sideBarItems/sideBarItems";
import { Box } from "@mui/material";

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
      <SidebarItems />
    </Drawer>
  );
};

export default SideBar;
