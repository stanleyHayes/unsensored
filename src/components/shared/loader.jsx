import React from "react";
import { Box, keyframes, Skeleton, Stack } from "@mui/material";

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const progressSlide = keyframes`
    0% { left: -40%; }
    100% { left: 100%; }
`;

/**
 * Top bar loader — a clean sliding bar.
 */
export const InlineLoader = () => (
    <Box
        sx={{
            height: 2,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.06)",
            overflow: "hidden",
            position: "relative",
        }}
    >
        <Box
            sx={{
                position: "absolute",
                top: 0,
                height: "100%",
                width: "40%",
                bgcolor: "#1a1a2e",
                animation: `${progressSlide} 1s ease-in-out infinite`,
            }}
        />
    </Box>
);

/**
 * Article card skeleton — mimics the article list item layout.
 */
export const ArticleSkeleton = () => (
    <Box sx={{ display: "flex", gap: 3, py: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton width={100} height={14} />
                <Skeleton width={60} height={14} />
            </Box>
            <Skeleton width="85%" height={22} sx={{ mb: 0.8 }} />
            <Skeleton width="65%" height={22} sx={{ mb: 1.2 }} />
            <Skeleton width="95%" height={14} sx={{ mb: 0.5 }} />
            <Skeleton width="70%" height={14} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1.5 }}>
                <Skeleton width={50} height={20} sx={{ borderRadius: 4 }} />
                <Skeleton width={50} height={20} sx={{ borderRadius: 4 }} />
                <Skeleton width={70} height={14} />
            </Box>
        </Box>
        <Skeleton
            variant="rounded"
            sx={{
                width: { xs: 100, sm: 180 },
                height: { xs: 80, sm: 130 },
                borderRadius: 2,
                flexShrink: 0,
                display: { xs: "none", sm: "block" },
            }}
        />
    </Box>
);

/**
 * Feed skeleton — multiple article skeletons.
 */
export const FeedSkeleton = ({ count = 3 }) => (
    <Stack>
        {Array.from({ length: count }).map((_, i) => (
            <ArticleSkeleton key={i} />
        ))}
    </Stack>
);

/**
 * Profile skeleton — mimics the profile page header.
 */
export const ProfileSkeleton = () => (
    <Box>
        <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3, mb: -6 }} />
        <Box sx={{ px: 2 }}>
            <Skeleton variant="circular" width={100} height={100} sx={{ border: "4px solid white", mb: 2 }} />
            <Skeleton width={180} height={28} sx={{ mb: 0.5 }} />
            <Skeleton width={120} height={18} sx={{ mb: 1.5 }} />
            <Skeleton width="60%" height={16} sx={{ mb: 0.5 }} />
            <Skeleton width="40%" height={16} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4].map((i) => (
                    <Box key={i} sx={{ textAlign: "center" }}>
                        <Skeleton width={30} height={24} sx={{ mx: "auto" }} />
                        <Skeleton width={50} height={14} />
                    </Box>
                ))}
            </Box>
        </Box>
    </Box>
);

/**
 * User card skeleton.
 */
export const UserCardSkeleton = () => (
    <Box sx={{ p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Skeleton variant="circular" width={44} height={44} />
            <Box>
                <Skeleton width={100} height={16} sx={{ mb: 0.3 }} />
                <Skeleton width={70} height={12} />
            </Box>
        </Box>
        <Skeleton width="100%" height={14} sx={{ mb: 0.4 }} />
        <Skeleton width="85%" height={14} sx={{ mb: 0.4 }} />
        <Skeleton width="60%" height={14} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton width={60} height={12} />
            <Skeleton width={50} height={12} />
        </Box>
    </Box>
);

const Loader = () => <FeedSkeleton />;

export default Loader;
