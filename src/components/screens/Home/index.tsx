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

interface ProductProps {
    quantity: number;
    id: number;
    product: string;
    description: string;
    price: number;
}

export function Home() {
    const classes = useStyles();
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [checkout, setCheckout] = useState<ProductProps[]>([]);

    function handleChangeQuantity(id: number, quantity: number){
        const newProducts = [...products];
        const filter = newProducts.map(p => p.id === id ? {...p, quantity} : {...p});
        setProducts(filter)
    }
    function SaveData(listProduct: ProductProps[]){
        setCheckout(listProduct)
        localStorage.setItem('checkout', JSON.stringify(listProduct))
    }

    function handleAddProductCheckout(id: number){
        const newCheckout = [...products];
        const filter = newCheckout.filter(p => p.id === id)
        const listProduct = [...checkout, ...filter] 
        SaveData(listProduct)
    }
    
    useEffect(() => {
        const request = localStorage.getItem('products')
        if (request) {
            const parse = JSON.parse(request)
            setProducts(parse)
        }
    }, [])
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
                    <Grid item xs={8}>
                        <Typography>Home</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Pesquisar produtos"
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
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell component="th" scope="row">
                                    {product.product}
                                </TableCell>
                                <TableCell align="left">{product.description}</TableCell>
                                <TableCell className={classes.action}>
                                    <TextField
                                        id="outlined-adornment-amount"
                                        // className={classNames)}
                                        type="number"
                                        variant="outlined"
                                        placeholder="Quantidade"
                                        value={product.quantity ? product.quantity : 1}
                                        onChange={(e:any) => handleChangeQuantity(product.id, e.target.value)}
                                    />

                                    <Button variant="outlined" color="primary" onClick={() => handleAddProductCheckout(product.id)}>
                                        <AddIcon />
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