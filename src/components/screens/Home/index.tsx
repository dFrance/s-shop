import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useIncrementProducts } from '../../../context/';

import {ProductProps} from '../index'

export function Home() {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const {
        listProducts,
        handleAddProductCheckout
    } = useIncrementProducts();
    const filterProducts = listProducts.filter((p:any) => p.name.toLowerCase().includes(search));
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container alignItems="center" className={classes.header}>
                    <Grid item xs={8}>
                        <Typography>Home</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Pesquisar produtos"
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Produto</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProducts !== undefined &&
                            filterProducts.map((product: ProductProps) => (
                                <TableRow key={product._id}>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="left">{product.description}</TableCell>
                                    <TableCell className={classes.action}>
                                        <Button variant="outlined" color="primary" onClick={() => handleAddProductCheckout(product._id)}>
                                            <AddIcon />
                                            1
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}