import React, {useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@material-ui/core";
import {useRouteMatch, useHistory} from "react-router-dom";
import {
    Explore, ExploreOutlined,
    Note,
    NotesOutlined,
    Search, SearchOutlined,
    Timeline,
    TimelineOutlined,
    TrendingUp,
    TrendingUpOutlined, TrendingUpRounded, TrendingUpSharp
} from "@material-ui/icons";


const BottomNavBar = () => {

    const [active, setActive] = useState('');

    const history = useHistory();
    const {path} = useRouteMatch();

    const handleNavigationChange = (event, path) => {
        console.log(path);
        setActive(path);
        history.push(path);
    }

    useEffect(() => {
        setActive(path);
    }, [history, path]);

    return (
        <Paper square={true} variant="elevation" elevation={1}>
            <BottomNavigation value={active} showLabels={true} onChange={handleNavigationChange}>
                <BottomNavigationAction
                    value='/'
                    selected={active === '/'}
                    label='timeline'
                    icon={<TimelineOutlined/>}
                />

                <BottomNavigationAction
                    value='/articles'
                    selected={active === '/articles'}
                    label='articles'
                    icon={<NotesOutlined/>}
                />

                <BottomNavigationAction
                    value='/trending'
                    selected={active === '/trending'}
                    label='trending'
                    icon={<TrendingUp/>}
                />

                <BottomNavigationAction
                    value='/search'
                    selected={active === '/search'}
                    label='search'
                    icon={<SearchOutlined/>}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavBar;