import React from "react";
import { Box, Stack } from "@mui/material";
import { BookmarkBorderOutlined } from "@mui/icons-material";
import Article from "./article";
import EmptyState from "./empty-state";

const BookmarkList = ({ bookmarks, loading }) => {
    if (!bookmarks?.length) {
        return (
            <EmptyState
                icon={<BookmarkBorderOutlined />}
                title="No saved articles"
                description="Articles you save will appear here for easy access."
                doodles={false}
            />
        );
    }

    return (
        <Stack spacing={0} sx={{ mt: 1 }}>
            {bookmarks.map((bookmark, i) => (
                bookmark.article && <Article key={bookmark._id} article={bookmark.article} index={i} />
            ))}
        </Stack>
    );
};

export default BookmarkList;
