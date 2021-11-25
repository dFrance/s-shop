import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    paper: {
        margin: '40px 45px',
    },
    header: {
        padding: '16px 16px 0 16px',
    },
    action: {
        justifyContent: 'space-between',
        display: 'flex',
        gap: 16,
    },
    price: {
        height: 30,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    buttonQuantity: {
        borderRadius: '50%',
        padding: '8px',
        minWidth: '40px',
},
}))