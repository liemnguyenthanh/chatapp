import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import multiavatar from "@multiavatar/multiavatar";
import React, { useMemo, useContext, useState, useEffect } from "react";
import { contrast, generateName, hexToRgb, rgbToHex } from "../../utils";
import UserItem from "./UserItem";
import { LoremIpsum } from "lorem-ipsum";
import { ColorModeContext } from "../../App";

const drawerWidth = 240;

const ListUserBar = (props) => {
  const { userList } = props;
  const { mode } = useContext(ColorModeContext);

  function generateColor() {
    const standartContrast = 8;
    function generateRandomColor() {
      let color = hexToRgb(Math.floor(Math.random() * 16777215).toString(16));
      if (color != null) {
        return color;
      } else generateRandomColor();
    }
    let randomColor = generateRandomColor();
    while (
      contrast(mode === "dark" ? [44, 47, 51] : [255, 255, 255], [
        randomColor?.r,
        randomColor?.g,
        randomColor?.b,
      ]) < standartContrast
    ) {
      randomColor = hexToRgb(Math.floor(Math.random() * 16777215).toString(16));
    }
    if (randomColor) 
      return rgbToHex(randomColor.r, randomColor.g, randomColor.b);
    else generateColor();
  }
  
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Divider />
      <List sx={{ px: 1 }}>
        {userList.map((item, index) => (
          <UserItem
            key={index}
            name={item.full_name}
            title={item.username}
            avatar={multiavatar(item.username)}
            color={`#${generateColor()}`}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default ListUserBar;
