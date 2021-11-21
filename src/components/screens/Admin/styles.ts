import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    paper: {
        margin: '40px 45px',
        maxHeight: '88vh',
        overflow: 'hidden auto',
    },
    header: {
        padding: '16px 16px 0 16px',
    },
    // action: {
    //     justifyContent: 'flex-end', 
    //     display: 'flex', 
    //     // gap:16,
    // },
    price: {
        height: 30,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
    },
}))