import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Article from "./article";
import Comment from "./comment";
import CommentReply from "./reply";

const LikeList = ({ likes, message }) => {
    const getItemByType = (item) => {
        switch (item.type) {
            case "ARTICLE":
                return <Article article={item.article} />;
            case "COMMENT":
                return <Comment comment={item.comment} />;
            case "REPLY":
                return <CommentReply reply={item.reply} />;
            default:
                return <Article article={item.article} />;
        }
    };

    if (!likes?.length) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 10,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "rgba(0,0,0,0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <FavoriteBorder sx={{ fontSize: 28, color: "text.disabled" }} />
                </Box>
                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    {message || "No likes yet"}
                </Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            {likes.map((like, index) => (
                <Box key={like._id || index}>{getItemByType(like)}</Box>
            ))}
        </Stack>
    );
};

export default LikeList;
