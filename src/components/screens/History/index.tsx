import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

interface ProductProps {
    _id: number;
    product: string;
    description: string;
    price: number;
    quantity: number;
}

export function History() {
    const classes = useStyles();
    const [history, setHistory] = useState<ProductProps[]>([])

    useEffect(() => {
        const request = localStorage.getItem('buyProduct')
        if (request) {
            const parse = JSON.parse(request)
            setHistory(parse)
        }
    }, [])
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={2} alignItems="center" className={classes.header}>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography>Admin / Histórico </Typography>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"> Produto</TableCell>
                            <TableCell align="left"> Quantidade</TableCell>
                            <TableCell align="left">Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map(h => (
                            <TableRow key={h._id}>
                                <TableCell component="th" scope="row">
                                    {h.product}
                                </TableCell>
                                <TableCell align="center">{h.quantity}</TableCell>
                                <TableCell align="left">{h.price * h.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}