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
import DeleteIcon from '@material-ui/icons/Delete';

interface ProductProps {
    id: number;
    product: string;
    description: string;
    price: number;
    quantity: number;
}

export function Admin() {
    const classes = useStyles();
    const [product,setProduct] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [products, setProducts] = useState<ProductProps[]>([])

    function SaveData(listProduct: ProductProps[]) {
        setProducts(listProduct)
        localStorage.setItem('products', JSON.stringify(listProduct))
    }

    function handleAddProduct(){
        const data = {
            product,
            description,
            price,
            quantity: 1,
            id: +new Date(),
        }
        const listProduct = ([...products, data])
        SaveData(listProduct)
    }

    function handleDelete(id: number){
        const newProducts = [...products];
        const filter = newProducts.filter(p => p.id !== id)
        setProducts(filter)
        localStorage.setItem('products', JSON.stringify(filter))
    }
    
    useEffect(() => {
        const request = localStorage.getItem('products')
        if(request){
            const parse = JSON.parse(request)
            setProducts(parse)
        }
    }, [])

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={2} alignItems="center" className={classes.header}>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography>Admin / Produtos </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Produto"
                            value={product}
                            onChange={(e:any) => setProduct(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Descrição"
                            value={description}
                            onChange={(e:any) => setDescription(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Preço"
                            value={price}
                            onChange={(e:any) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" style={{height: 56}} color="primary" onClick={handleAddProduct}>
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"> Produto</TableCell>
                            <TableCell align="left"> Descrição</TableCell>
                            <TableCell align="left">Preço</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell align="left">{product.product}</TableCell>
                                <TableCell component="th" scope="row">
                                    {product.description}
                                </TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                                <TableCell className={classes.action}>
                                    <Button variant="outlined" onClick={() => handleDelete(product.id)}>
                                        <DeleteIcon />
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