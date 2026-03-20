import React, { useState, useCallback } from "react";
import {
    Box, Typography, IconButton, Tooltip, Divider, Stack, Tab, Tabs,
} from "@mui/material";
import {
    FormatBold, FormatItalic, Code, FormatListBulleted,
    FormatListNumbered, FormatQuote, Link as LinkIcon,
    Image, Title, HorizontalRule,
} from "@mui/icons-material";
import MarkdownPreview from "./markdown-preview";

const toolbarItems = [
    { icon: <Title sx={{ fontSize: 18 }} />, label: "Heading", before: "## ", after: "" },
    { icon: <FormatBold sx={{ fontSize: 18 }} />, label: "Bold", before: "**", after: "**" },
    { icon: <FormatItalic sx={{ fontSize: 18 }} />, label: "Italic", before: "_", after: "_" },
    { type: "divider" },
    { icon: <Code sx={{ fontSize: 18 }} />, label: "Code", before: "`", after: "`" },
    { icon: <FormatQuote sx={{ fontSize: 18 }} />, label: "Quote", before: "> ", after: "" },
    { icon: <HorizontalRule sx={{ fontSize: 18 }} />, label: "Divider", before: "\n---\n", after: "" },
    { type: "divider" },
    { icon: <FormatListBulleted sx={{ fontSize: 18 }} />, label: "Bullet list", before: "- ", after: "" },
    { icon: <FormatListNumbered sx={{ fontSize: 18 }} />, label: "Numbered list", before: "1. ", after: "" },
    { type: "divider" },
    { icon: <LinkIcon sx={{ fontSize: 18 }} />, label: "Link", before: "[", after: "](url)" },
    { icon: <Image sx={{ fontSize: 18 }} />, label: "Image", before: "![alt](", after: ")" },
];

const MarkdownEditor = ({ value, onChange, placeholder = "Write your article in markdown...", minRows = 20 }) => {
    const [tab, setTab] = useState(0);
    const textareaRef = React.useRef(null);

    const insertMarkdown = useCallback((before, after) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end);
        const newText = value.substring(0, start) + before + selected + after + value.substring(end);
        onChange(newText);

        // Restore cursor
        setTimeout(() => {
            textarea.focus();
            const cursorPos = start + before.length + selected.length;
            textarea.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    }, [value, onChange]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newText = value.substring(0, start) + "  " + value.substring(end);
            onChange(newText);
            setTimeout(() => {
                e.target.setSelectionRange(start + 2, start + 2);
            }, 0);
        }
    }, [value, onChange]);

    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
                "&:focus-within": {
                    borderColor: "primary.main",
                    boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 0 0 1px rgba(167, 139, 250, 0.2)"
                        : "0 0 0 1px rgba(26, 26, 46, 0.1)",
                },
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            }}
        >
            {/* Tabs: Write / Preview */}
            <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid", borderColor: "divider", px: 1 }}>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    sx={{
                        minHeight: 40,
                        "& .MuiTab-root": {
                            minHeight: 40,
                            textTransform: "none",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            px: 2,
                        },
                    }}
                >
                    <Tab label="Write" />
                    <Tab label="Preview" />
                </Tabs>

                <Box sx={{ flex: 1 }} />

                <Typography variant="caption" color="text.disabled" sx={{ pr: 1 }}>
                    Markdown supported
                </Typography>
            </Box>

            {/* Toolbar (only in write mode) */}
            {tab === 0 && (
                <Stack
                    direction="row"
                    sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                        flexWrap: "wrap",
                        gap: 0.2,
                    }}
                >
                    {toolbarItems.map((item, i) =>
                        item.type === "divider" ? (
                            <Divider key={i} orientation="vertical" flexItem sx={{ mx: 0.3, my: 0.5 }} />
                        ) : (
                            <Tooltip key={i} title={item.label} arrow>
                                <IconButton
                                    size="small"
                                    onClick={() => insertMarkdown(item.before, item.after)}
                                    sx={{
                                        borderRadius: 1,
                                        color: "text.secondary",
                                        "&:hover": { bgcolor: "rgba(0,0,0,0.06)", color: "text.primary" },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            </Tooltip>
                        )
                    )}
                </Stack>
            )}

            {/* Editor / Preview */}
            {tab === 0 ? (
                <Box
                    component="textarea"
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    spellCheck
                    sx={{
                        width: "100%",
                        minHeight: `${minRows * 24}px`,
                        p: 2.5,
                        border: "none",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        color: "text.primary",
                        bgcolor: "transparent",
                        "&::placeholder": { color: "text.disabled" },
                    }}
                />
            ) : (
                <Box sx={{ p: 3, minHeight: `${minRows * 24}px` }}>
                    {value ? (
                        <MarkdownPreview content={value} />
                    ) : (
                        <Typography variant="body2" color="text.disabled" sx={{ fontStyle: "italic" }}>
                            Nothing to preview yet. Start writing in the Write tab.
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default MarkdownEditor;
