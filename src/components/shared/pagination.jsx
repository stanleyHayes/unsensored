import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        const delta = 1;
        const start = Math.max(2, page - delta);
        const end = Math.min(totalPages - 1, page + delta);

        pages.push(1);
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push("...");
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                pt: 4,
                pb: 2,
            }}
        >
            <IconButton
                size="small"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                sx={{ color: "text.secondary", "&:disabled": { opacity: 0.3 } }}
            >
                <ChevronLeft sx={{ fontSize: 20 }} />
            </IconButton>

            {getPages().map((p, i) =>
                p === "..." ? (
                    <Typography key={`dots-${i}`} variant="body2" color="text.disabled" sx={{ px: 0.5 }}>
                        ...
                    </Typography>
                ) : (
                    <Button
                        key={p}
                        size="small"
                        onClick={() => onPageChange(p)}
                        sx={{
                            minWidth: 34,
                            height: 34,
                            borderRadius: 1.5,
                            fontSize: "0.8rem",
                            fontWeight: p === page ? 700 : 500,
                            color: p === page ? (t) => t.palette.mode === "dark" ? "#0f0f14" : "#fff" : "text.secondary",
                            bgcolor: p === page ? "primary.main" : "transparent",
                            "&:hover": {
                                bgcolor: p === page
                                    ? "primary.light"
                                    : (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                            },
                            transition: "all 0.15s ease",
                        }}
                    >
                        {p}
                    </Button>
                )
            )}

            <IconButton
                size="small"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                sx={{ color: "text.secondary", "&:disabled": { opacity: 0.3 } }}
            >
                <ChevronRight sx={{ fontSize: 20 }} />
            </IconButton>
        </Box>
    );
};

export default Pagination;
