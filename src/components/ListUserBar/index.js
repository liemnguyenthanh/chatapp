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
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
export function generateColor(mode) {
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
const ListUserBar = (props) => {
    const { userList,user_id, store, setStore } = props;
    const { mode } = useContext(ColorModeContext);
    const history = useHistory()
    const createNewRoom = (room_id, room_name) => {
        return {
            room_id,
            room_name
        }
    }
    const handleChangeRoom = (user) => {
        history.push(`/dashboard?user_id=${user_id}&room_id=${user.user_id}`)
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
                {userList.map((item) => (
                    <UserItem
                        onClick={() => handleChangeRoom(item)}
                        key={item.user_id}
                        name={item.full_name}
                        title={ item?.isTyping ? 'typing...' : item.username}
                        avatar={multiavatar(item.user_id)}
                        color={`#${generateColor(mode)}`}
                    />
                ))}
            </List>
        </Drawer>
    );
};

export default ListUserBar;
