import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import Comment from "./comment";
import EmptyState from "./empty-state";

const ThreadSkeleton = () => (
    <Box>
        {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Skeleton variant="circular" width={34} height={34} />
                    <Skeleton width={2} sx={{ flex: 1, mt: 0.8, minHeight: 30 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", gap: 0.8, mb: 0.8 }}>
                        <Skeleton width={90} height={14} />
                        <Skeleton width={50} height={12} />
                    </Box>
                    <Skeleton width="95%" height={14} sx={{ mb: 0.3 }} />
                    <Skeleton width="70%" height={14} sx={{ mb: 1 }} />
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                        <Skeleton width={30} height={14} />
                        <Skeleton width={30} height={14} />
                    </Box>
                </Box>
            </Box>
        ))}
    </Box>
);

const CommentList = ({ comments, loading }) => {
    if (loading) return <ThreadSkeleton />;

    if (!comments?.length) {
        return (
            <EmptyState
                icon={<ChatBubbleOutline />}
                title="No comments yet"
                description="Start the conversation — be the first to share your thoughts."
                doodles={false}
            />
        );
    }

    return (
        <Box>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", mb: 2, display: "block" }}>
                {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </Typography>
            {comments.map((comment, i) => (
                <Comment key={comment._id} comment={comment} index={i} />
            ))}
        </Box>
    );
};

export default CommentList;
