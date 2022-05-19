import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import UserItem from "../ListUserBar/UserItem";
import multiavatar from '@multiavatar/multiavatar';
import { generateColor } from "../ListUserBar";
import { ColorModeContext } from "../../App";
import { Box } from "@mui/system";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(!open && {
        width: `calc(100% - ${56}px)`,
        marginLeft: `${56}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const TopBar = ({ open, store }) => {
    const location = useLocation();
    const { user_id, room_id } = queryString.parse(location.search);
    const theme = useTheme();
    const { mode } = useContext(ColorModeContext);
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
        >
            <Toolbar
                sx={{
                    display : 'flex',
                    justifyContent : 'space-between'
                }}
                >
                <Typography variant="h6" noWrap component="div">
                    {room_id}
                </Typography>
                <Box>
                {
                    store.info &&
                    <UserItem
                        onClick={() => { }}
                        name={store.info.full_name}
                        title={store.info.username}
                        avatar={multiavatar(store.info.user_id)}
                        color={`#${generateColor(mode)}`}
                    />
                }
                </Box>
            </Toolbar>


        </AppBar>
    );
};

export default TopBar;
