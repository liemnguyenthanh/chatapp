import { Avatar, Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";
import multiavatar from "@multiavatar/multiavatar";


const RenderAvatar = ({ user_id }) => {
  
  const buff = new Buffer(multiavatar(user_id));
  const base64data = buff.toString("base64");
  return (
    <Avatar
        src={`data:image/svg+xml;base64,${base64data}`}
    />
  );
};
const Messages = ({ messagesGroup, mySelfId }) => {
    const params = (new URL(document.location)).searchParams;
    const roomId = params.get("room_id");
    const [listMessage, setListMessage] = useState([])
    // get list message by room
    useLayoutEffect(() => {
        setListMessage(messagesGroup?.message?.filter(item => item.room_id === roomId))
    }, [roomId])

    return (
        <ScrollToBottom className="messages px-3">
        {messagesGroup.length > 0 &&
            messagesGroup.map((item, i) => {
            let isSentByCurrentUser = false;

            if (item.info === mySelfId) {
                isSentByCurrentUser = true;
            }
            return (
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                }}
                key={item.key}
                >
                {!isSentByCurrentUser && <RenderAvatar user_id={item.info} />}
                <Box
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    ...(isSentByCurrentUser
                        ? { justifyContent: "flex-end", width: "100%" }
                        : { width: "calc(100% - 100px)" }),
                    }}
                >
                    {item.messages.length &&
                    item.messages.map((mes) => (
                        <Box
                        key={mes._id}
                        className={`d-flex ${
                            isSentByCurrentUser ? "justify-content-end" : ""
                        }`}
                        sx={{
                            display: "flex",
                            ...(isSentByCurrentUser && {
                            justifyContent: "flex-end",
                            }),
                        }}
                        >
                        <Message
                            message={mes}
                            isSentByCurrentUser={isSentByCurrentUser}
                        />
                        </Box>
                    ))}
                </Box>
                </Box>
            );
            })}
        </ScrollToBottom>
    );
    };

    export default Messages;
