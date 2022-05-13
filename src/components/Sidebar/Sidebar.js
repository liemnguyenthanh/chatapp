import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TagIcon from '@mui/icons-material/Tag';
import { Box, Link as LinkMui, ListItemButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import { Link } from 'react-router-dom';


const drawerWidth = 240;
const listRoom = [
    {
        id: 1,
        rName: 'Room 1',
    },
    {
        id: 2,
        rName: 'Room 2',
    },
    {
        id: 3,
        rName: 'Room 3',
    },
    {
        id: 4,
        rName: 'Room 4',
    }
]

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    zIndex: 200,
    border: 1,
    boxShadow: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
        position: 'relative',
        overflow: 'hidden'
    }),
);

const Sidebar = ({user_id}) => {
    const [open, setOpen] = React.useState(true);
    const handleDrawer = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h5" noWrap sx={{ flexGrow: 1, marginLeft: '15px' }} component="div">
                        Discorn
                    </Typography>
                    <IconButton onClick={handleDrawer}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{mt: '64px'}}/>
                <Box sx={{height: '100%', ...(open ? {overflowY: 'auto'} : {overflow: 'hidden'}) }}>
                    <List>
                        {listRoom.map((text, index) => (
                            <Link to={`/dashboard?user_id=${user_id}&room_id=${text.id}`} key={text}>
                                <LinkMui underline="none" color={'black'}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TagIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={text.rName} sx={{ opacity: open ? 1 : 0, color: 'text.primary', }} />
                                    </ListItemButton>
                                </LinkMui>
                            </Link>
                        ))}
                    </List>
                </Box>
                <ThemeToggle />
            </Drawer>
        </>
    )
}

export default Sidebar
