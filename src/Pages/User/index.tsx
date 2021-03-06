import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useStyles } from "./styles";
import { Cart, Home } from "../../components/screens/";
import { useHistory } from "react-router";
import { useUserData } from "../../context/user";
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutAlreadyExist, getProductsAlreadyRegister } from "../../context/store";

export function UserPage() {
    const [value, setValue] = useState(0);
    const [viewCheckout, setViewCheckout] = useState(false)
    const history = useHistory();
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const { checkout } = useSelector((state: any) => state.store);
    
    function goToLogin() {
        history.push('/login')
    }

    useEffect(() => {
        dispatch(getProductsAlreadyRegister())
        dispatch(getCheckoutAlreadyExist())
    }, [])

    useEffect(() => {
        if (checkout[0].name !== null) {
            setViewCheckout(true)
        }
    }, [checkout])
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
                            {viewCheckout &&
                                <span className={classes.howManyItems}>
                                    {checkout.length}
                                </span>
                            }
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