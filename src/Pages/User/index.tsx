import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useStyles } from "./styles";
// import { Home } from "../../components/screens/Home";
import { Cart, Home } from "../../components/screens/";
import { useCheckout } from "../../context/checkout";
import { useHistory } from "react-router";
import { useUserData } from "../../context/user";

export function UserPage() {
    const [value, setValue] = useState(0);
    const {userData} = useUserData();
    const { listCheckoutProducts } = useCheckout()
    const history = useHistory();
    const classes = useStyles();
    
    useEffect(() => {
        if(userData.logged)
            goToLogin()
    }, [])

    function goToLogin(){
        history.push('/login')
    }
    return (
        <>
            <Header />
            <Grid container>
                <Grid item xs={3} className={classes.sidebar}>
                    <List component="nav">
                        <ListItem button onClick={() => setValue(0)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => setValue(1)}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Carrinho" />
                            <span className={classes.howManyItems}>
                                {listCheckoutProducts[0]?.name !== '' ? listCheckoutProducts.length : ''}
                            </span>
                        </ListItem>
                        <ListItem button onClick={goToLogin}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9} className={classes.screen}>
                    {value === 0
                        ? <Home />
                        : <Cart />}
                </Grid>

            </Grid>
        </>
    )
}