import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

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

const TopBar = ({ open }) => {
  const location = useLocation();
  const { user_id, room_id } = queryString.parse(location.search);
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Room {room_id}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
