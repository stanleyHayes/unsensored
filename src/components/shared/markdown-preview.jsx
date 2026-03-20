import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";

const MarkdownPreview = ({ content }) => (
    <Box
        sx={{
            fontFamily: "'TTSquares', sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "text.primary",
            "& h1": { fontSize: "2rem", fontWeight: 800, mt: 4, mb: 2, letterSpacing: "-0.02em" },
            "& h2": { fontSize: "1.6rem", fontWeight: 700, mt: 3.5, mb: 1.5, letterSpacing: "-0.01em" },
            "& h3": { fontSize: "1.3rem", fontWeight: 700, mt: 3, mb: 1.5 },
            "& h4": { fontSize: "1.1rem", fontWeight: 600, mt: 2.5, mb: 1 },
            "& p": { mb: 2, mt: 0 },
            "& a": { color: "#302b63", textDecoration: "underline", textUnderlineOffset: "3px" },
            "& blockquote": {
                borderLeft: "3px solid",
                borderColor: "divider",
                pl: 2.5,
                py: 0.5,
                my: 2,
                color: "text.secondary",
                fontStyle: "italic",
                "& p": { mb: 0 },
            },
            "& ul, & ol": { pl: 3, mb: 2 },
            "& li": { mb: 0.5 },
            "& hr": { border: "none", borderTop: "1px solid", borderColor: "divider", my: 4 },
            "& img": {
                maxWidth: "100%",
                borderRadius: 2,
                my: 2,
            },
            "& code": {
                fontFamily: "'SF Mono', 'Fira Code', Menlo, Consolas, monospace",
                fontSize: "0.85em",
                bgcolor: "rgba(0,0,0,0.05)",
                px: 0.8,
                py: 0.2,
                borderRadius: 0.5,
            },
            "& pre": {
                my: 2,
                borderRadius: 2,
                overflow: "auto",
                "& code": {
                    bgcolor: "transparent",
                    px: 0,
                    py: 0,
                },
            },
            "& table": {
                width: "100%",
                borderCollapse: "collapse",
                my: 2,
                fontSize: "0.9rem",
            },
            "& th, & td": {
                border: "1px solid",
                borderColor: "divider",
                px: 1.5,
                py: 1,
                textAlign: "left",
            },
            "& th": {
                bgcolor: "rgba(0,0,0,0.03)",
                fontWeight: 600,
            },
        }}
    >
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    if (!inline && match) {
                        return (
                            <SyntaxHighlighter
                                style={oneLight}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    borderRadius: 8,
                                    fontSize: "0.85rem",
                                    border: "1px solid rgba(0,0,0,0.08)",
                                }}
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        );
                    }
                    return (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    </Box>
);

export default MarkdownPreview;
