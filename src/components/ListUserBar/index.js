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

const ListUserBar = () => {
  const lorem = new LoremIpsum();
  const listNameLength = 10;
  const { mode } = useContext(ColorModeContext);
  const [listUser, setListUser] = useState([]);

  function generateRandomColor() {
    let color = hexToRgb(Math.floor(Math.random() * 16777215).toString(16));
    if (color != null) {
      return color;
    } else generateRandomColor();
  }

  function generateUser() {
    const standartContrast = 8;
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
    if (randomColor) {
      const item = {
        name: generateName(),
        title: lorem.generateWords(4),
        color: rgbToHex(randomColor?.r, randomColor?.g, randomColor?.b),
      };
      if (item != null) return item;
      else generateUser();
    }
  }

  useEffect(() => {
    let list = [];
    while (list.length < 10) {
      let item = generateUser();
      if (item) list.push(item);
    }
    setListUser(list);
  }, []);
  // useEffect(() => {
  //   let color;
  //   while (list.length < 10) {
  //     let item = generateUser();
  //     if (item) list.push(item);
  //   }
  // }, []);
  
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
        {listUser.map((item, index) => (
          <UserItem
            key={index}
            name={item.name}
            title={item.title}
            avatar={multiavatar(item.name)}
            color={item.color}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default ListUserBar;
