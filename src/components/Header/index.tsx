import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../../components/Header/styles';

export function Header(){
    const classes = useStyles()
    return(
        <AppBar position="static" style={{boxShadow: 'none'}}>
            <Toolbar variant="dense" className={classes.header}>
                <Typography variant="h6" color="inherit">
                    S-Shop
                </Typography>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}