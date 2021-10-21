import { Header } from "../../components/Header";
import { useState } from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useStyles } from "./styles";
import { Home } from "../../components/screens/Home";
import { Carrinho } from "../../components/screens/Carrinho";

export function UserPage() {
    const [value, setValue] = useState(0);
    const classes = useStyles();
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
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9} className={classes.screen}>
                    {value === 0
                        ? <Home />
                        : <Carrinho />}
                </Grid>

            </Grid>
        </>
    )
}