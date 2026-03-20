import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import Layout from "../../components/layout/layout";

const ArticleViewsPage = () => {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "60vh",
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
                        <VisibilityOutlined sx={{ fontSize: 28, color: "text.disabled" }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                        Article Views
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Views for this article will appear here
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
};

export default ArticleViewsPage;
