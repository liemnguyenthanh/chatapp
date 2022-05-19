import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import {generateName} from '../../../utils'
import { StyledBadge } from "./style";

const UserItem = ({ name, title, avatar, color ,onClick}) => {
  const buff = new Buffer(avatar);
  const base64data = buff.toString("base64");

  return (
    <ListItem
      disablePadding
      onClick={onClick}
      sx={{
        marginBottom: "5px",
        borderRadius: "5px",
        paddingLeft: '5px',
        paddingRight: '5px',
        cursor:'pointer',
        "&:hover": {
          boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <ListItemAvatar>
      <StyledBadge 
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar
            alt={name}
            src={`data:image/svg+xml;base64,${base64data}`}
          />
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            color: color,
          },
          "& .MuiListItemText-secondary" : {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '12px'
        }
        }}
        primary={name}
        secondary={title}
      />
    </ListItem>
  );
};

export default UserItem;
