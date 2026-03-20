import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import CommentReply from "./reply";
import EmptyState from "./empty-state";

const ThreadSkeleton = () => (
    <Box>
        {[1, 2].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton width={2} sx={{ flex: 1, mt: 0.8, minHeight: 20 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", gap: 0.8, mb: 0.5 }}>
                        <Skeleton width={80} height={12} />
                        <Skeleton width={40} height={10} />
                    </Box>
                    <Skeleton width="90%" height={13} sx={{ mb: 0.3 }} />
                    <Skeleton width="60%" height={13} />
                </Box>
            </Box>
        ))}
    </Box>
);

const ReplyList = ({ replies, loading }) => {
    if (loading) return <ThreadSkeleton />;

    if (!replies?.length) {
        return (
            <EmptyState
                icon={<ChatBubbleOutline />}
                title="No replies yet"
                description="Be the first to reply to this comment."
                doodles={false}
            />
        );
    }

    return (
        <Box>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", mb: 2, display: "block" }}>
                {replies.length} repl{replies.length !== 1 ? "ies" : "y"}
            </Typography>
            {replies.map((reply, i) => (
                <CommentReply key={reply._id} reply={reply} index={i} isLast={i === replies.length - 1} />
            ))}
        </Box>
    );
};

export default ReplyList;
