import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../../components/Header/styles';
import { Box, Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';

export function Header() {
    const classes = useStyles();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    function toggleDrawer() {
        setIsOpen((old) => !old);
    }

    function handleUrlPage(link: any) {
        history.push(link)
    }
    return (
        <AppBar position="static" style={{ boxShadow: 'none' }}>
            <Toolbar variant="dense" className={classes.header}>
                <Typography variant="h6" color="inherit">
                    S-Shop
                </Typography>
                <IconButton onClick={() => toggleDrawer()} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer()}>
                <Box role="presentation" width={320}>
                    <ListItem button onClick={() => handleUrlPage('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Visitante" />
                    </ListItem>
                    <ListItem button onClick={() => handleUrlPage('/admin')}>
                        <ListItemIcon>
                            <SecurityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItem>
                </Box>
            </Drawer>
        </AppBar>
    )
}