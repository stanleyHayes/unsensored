import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFollow } from "../../redux/follows/follows-reducer";

const FollowButton = ({ userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);
    const followingIds = useSelector((s) => s.follows.followingIds);

    // Don't render if viewing own profile
    if (userId && currentUser?._id === userId) return null;

    const isFollowing = followingIds.includes(userId);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!token) {
            return navigate('/auth/login');
        }
        dispatch(toggleFollow({ following: userId, token }));
    };

    if (isFollowing) {
        return (
            <Button
                variant="outlined"
                size="small"
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2.5,
                    borderRadius: 3,
                    borderColor: hovered ? "error.main" : "divider",
                    color: hovered ? "error.main" : "text.primary",
                    "&:hover": {
                        borderColor: "error.main",
                        bgcolor: "rgba(239,68,68,0.04)",
                    },
                    transition: "all 0.15s ease",
                }}
            >
                {hovered ? "Unfollow" : "Following"}
            </Button>
        );
    }

    return (
        <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                borderRadius: 3,
                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                "&:hover": {
                    background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                },
                transition: "all 0.2s ease",
            }}
        >
            Follow
        </Button>
    );
};

export default FollowButton;
