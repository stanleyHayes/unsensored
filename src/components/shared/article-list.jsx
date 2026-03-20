import React from "react";
import { Box } from "@mui/material";
import { ArticleOutlined } from "@mui/icons-material";
import Article from "./article";
import EmptyState from "./empty-state";

const ArticleList = ({ articles, message, emptyAction }) => {
    if (!articles?.length) {
        return (
            <EmptyState
                icon={<ArticleOutlined />}
                title={message || "No articles yet"}
                description="Articles will appear here once published."
                actionLabel={emptyAction?.label}
                actionTo={emptyAction?.to}
            />
        );
    }

    return (
        <Box>
            {articles.map((article, i) => (
                <Article key={article._id} article={article} index={i} />
            ))}
        </Box>
    );
};

export default ArticleList;
