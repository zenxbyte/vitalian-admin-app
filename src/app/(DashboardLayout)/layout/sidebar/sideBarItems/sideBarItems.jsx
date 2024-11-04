import React from "react";

import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import Menuitems from "../menuItems";
import NavGroup from "../navGroup/navGroup";
import NavItem from "../navItem/navItem";

const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={index} />;

            // {/********If Sub Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={index}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
