import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface ProductProps {
    id: number;
    product: string;
    description: string;
    price: number;
    quantity: number;
}

export function Carrinho() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [error, setError] = useState({error:false, message:''});
    const [checkout, setCheckout] = useState<ProductProps[]>([]);

    console.log(checkout);
    const subTotal = checkout.map(p => p.quantity > 1 ? p.price * p.quantity : p.price * 1)
    const total = subTotal.reduce((acc, sum) => acc + sum, 0)

    function handleDelete(id: number){
        const newProducts = [...checkout];
        const filter = newProducts.filter(p => p.id !== id)
        setCheckout(filter)
        localStorage.setItem('checkout', JSON.stringify(filter))
    }

    function buyProduct(){
        if (name.trim() !== '') {
            localStorage.setItem('buyProduct', JSON.stringify(checkout))
            setCheckout([])
            localStorage.removeItem('checkout')
            window.location.href='/';
        } else {
            setError({error:true, message: 'É preciso preencer seu nome!'})
        }
    }
    useEffect(() => {
        const request = localStorage.getItem('checkout')
        if (request) {
            const parse = JSON.parse(request)
            setCheckout(parse)
        }
    }, [])
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
                        {checkout.map(product => (
                            <TableRow key={product.id}>
                                <TableCell align="center">{product.quantity ? product.quantity : 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {product.product}
                                </TableCell>
                                <TableCell align="left">{product.description}</TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                                <TableCell className={classes.action}>
                                    <Button variant="outlined" onClick={() => handleDelete(product.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell className={classes.price}>R${total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            <Box mx={'45px'} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={buyProduct}
                >Finalizar Compra</Button>
            </Box>
        </>
    )
}