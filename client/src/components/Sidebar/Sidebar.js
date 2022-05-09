import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TagIcon from '@mui/icons-material/Tag';
<<<<<<< HEAD
import { Link, ListItemButton, useTheme } from '@mui/material';
=======
import { Link as LinkMui, ListItemButton } from '@mui/material';
>>>>>>> main
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
<<<<<<< HEAD
import ThemeToggle from './ThemeToggle/ThemeToggle';

=======
import { Link } from 'react-router-dom';
>>>>>>> main


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
    justifyContent: 'flex-end',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        marginRight: '20px',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = () => {
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
                <Divider />
                <List>
<<<<<<< HEAD
                {listRoom.map((text, index) => (
                    <Link href={`/${text.id}`} underline="none" color={'black'}>
                        <ListItemButton
                        key={text}
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
                        <ListItemText primary={text.rName} sx={{ opacity: open ? 1 : 0, color: 'text.primary' }} />
                        </ListItemButton>
                    </Link>
                ))}
=======
                    {listRoom.map((text, index) => (
                        <Link to={`/${text.id}`} >
                            <LinkMui underline="none" color={'black'}>
                                <ListItemButton
                                    key={text}
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
                                    <ListItemText primary={text.rName} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </LinkMui>
                        </Link>
                    ))}
>>>>>>> main
                </List>
                <ThemeToggle />
            </Drawer>
        </>
    )
}

export default Sidebar
