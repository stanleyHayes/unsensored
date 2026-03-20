import React, { useEffect, useState } from "react";
import {
    Box, Chip, Grid, InputAdornment, MenuItem, Stack,
    TextField, Typography,
} from "@mui/material";
import { SearchRounded, SortOutlined, PeopleOutline } from "@mui/icons-material";
import { UserCardSkeleton } from "../../components/shared/loader";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import { getUsers } from "../../redux/users/user-reducer";
import User from "../../components/shared/user";
import EmptyState from "../../components/shared/empty-state";
import Pagination from "../../components/shared/pagination";

const sortOptions = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "name", label: "Name A–Z" },
];

const UsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((s) => s.users.users);
    const loading = useSelector((s) => s.users.loading);
    const pagination = useSelector((s) => s.users.pagination);
    const token = useSelector((s) => s.auth.token);

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => { setSearch(query); setPage(1); }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        dispatch(getUsers({
            token,
            page,
            search: search || undefined,
            sortBy: sortBy === "newest" ? undefined : sortBy,
        }));
    }, [dispatch, token, page, search, sortBy]);

    const handlePageChange = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
    const handleSortChange = (e) => { setSortBy(e.target.value); setPage(1); };

    return (
        <Layout>
            <PageBanner
                title="Writers"
                description="Meet the people shaping the conversation."
                gradient="linear-gradient(135deg, #1a1a2e 0%, #2d3561 50%, #1a1a2e 100%)"
            >
                <TextField
                    placeholder="Search by name, username, or bio..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    size="small"
                    sx={{
                        maxWidth: 420,
                        "& .MuiOutlinedInput-root": {
                            bgcolor: "rgba(255,255,255,0.1)", color: "white", borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                        },
                        "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.4)" },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </PageBanner>

            <Box sx={{ pb: 6 }}>
                {/* Toolbar — results count + sort */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {pagination && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
                                {pagination.total} writer{pagination.total !== 1 ? "s" : ""}
                            </Typography>
                        )}
                        {search && (
                            <Chip
                                label={`"${search}"`}
                                size="small"
                                onDelete={() => { setQuery(""); setSearch(""); }}
                                sx={{ fontWeight: 500, fontSize: "0.72rem" }}
                            />
                        )}
                    </Box>
                    <TextField
                        select
                        size="small"
                        value={sortBy}
                        onChange={handleSortChange}
                        sx={{
                            minWidth: 150,
                            "& .MuiOutlinedInput-root": { fontSize: "0.82rem" },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SortOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    >
                        {sortOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>

                {/* Grid */}
                {loading && !users?.length ? (
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <UserCardSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : users?.length ? (
                    <>
                        <Grid container spacing={2}>
                            {users.map((user) => (
                                <Grid key={user._id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <User user={user} />
                                </Grid>
                            ))}
                        </Grid>
                        {pagination && <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />}
                    </>
                ) : (
                    <EmptyState
                        icon={<PeopleOutline />}
                        title={search ? `No writers matching "${search}"` : "No writers yet"}
                        description={search ? "Try a different search term." : "Writers will show up here as they join the community."}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default UsersPage;
