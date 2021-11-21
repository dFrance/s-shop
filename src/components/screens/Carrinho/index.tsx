import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCheckout } from '../../../context/checkout';
import { useIncrementProducts } from '../../../context/IncrementProducts';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Icon from '@material-ui/core/Icon';

interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export function Carrinho() {
    const classes = useStyles();
    const { listCheckoutProducts, setListCheckoutProducts, total, handleDelete } = useCheckout();
    const { handleChangeQuantity } = useIncrementProducts();
    const [name, setName] = useState('');
    const [error, setError] = useState({ error: false, message: '' });

    function buyProduct() {
        if (name.trim() !== '') {
            localStorage.setItem('buyProduct', JSON.stringify(listCheckoutProducts))
            setListCheckoutProducts([])
            localStorage.removeItem('checkout')
            window.location.href = '/';
        } else {
            setError({ error: true, message: 'É preciso preencer seu nome!' })
        }
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container alignItems="center" className={classes.header}>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography>Carrinho</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={error.error}
                            helperText={error.message}
                            fullWidth
                            variant="outlined"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"> Quantidade</TableCell>
                            <TableCell> Produto</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="left">Preço</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCheckoutProducts !== undefined &&
                            listCheckoutProducts.map((product: ProductProps) => (
                                <TableRow key={product.id}>
                                    <TableCell align="center">
                                        <Box display="flex" style={{ gap: 16 }} justifyContent="center" alignItems="center">
                                            <Button onClick={() => handleChangeQuantity(product.id, 'remove')} disabled={product.quantity < 2 && true} className={classes.buttonQuantity}>
                                                <RemoveCircle color={product.quantity < 2 ? 'disabled' : 'error'} />
                                            </Button>
                                            {product.quantity}
                                            <Button onClick={() => handleChangeQuantity(product.id, 'add')}  className={classes.buttonQuantity}>
                                                <AddCircle color='primary' />
                                            </Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="left">{product.description}</TableCell>
                                    <TableCell align="left">{product.price}</TableCell>
                                    <TableCell className={classes.action}>
                                        <Button variant="outlined"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell className={classes.price}>R${total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            <Box mx={'45px'} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button
                    variant="contained"
                    color="primary"
                // onClick={buyProduct}
                >Finalizar Compra</Button>
            </Box>
        </>
    )
}