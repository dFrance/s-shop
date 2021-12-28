import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { ProductProps } from '../index'
import { useDispatch, useSelector } from 'react-redux';
import { handleAddProduct, handleDelete } from '../../../context/store';
import { useState } from 'react';

const schema = yup.object({
    name: yup.string().required('Esse campo é obrigatório.').min(2, 'O nome do produto precisa ter mais de uma letra'),
    description: yup.string().required('Esse campo é obrigatório.'),
    price: yup.number().min(1, 'O valor precisa ser maior que zero.').required('Esse campo é obrigatório.')
    //.positive('O preço precisa ser maior que zero.'),
}).required('Esse campo é obrigatório.');

interface RegisterProduct {
    name: string,
    description: string,
    price: number,
}

export function Admin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products } = useSelector((state: any) => state.store)
    const [product, setProduct] = useState<RegisterProduct>({ name: '', description: '', price: 0 });
    
    const data = {
        name: product.name,
        description: product.description,
        price: product.price,
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
        }
    });

    return (
        <>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit(() => dispatch(handleAddProduct(data)))}>
                    <Grid container spacing={2} className={classes.header}>
                        <Grid item xs={12} style={{ marginBottom: 16 }}>
                            <Typography>Admin / Produtos </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Produto"
                                value={product.name}
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                                {...register("name")}
                                onChange={(e: any) => setProduct({ ...product, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Descrição"
                                value={product.description}
                                error={errors.description ? true : false}
                                helperText={errors.description?.message}
                                {...register("description")}
                                onChange={(e: any) => setProduct({ ...product, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Preço"
                                type="number"
                                value={product.price}
                                error={errors.price ? true : false}
                                helperText={errors.price?.message}
                                {...register("price")}
                                onChange={(e: any) => setProduct({ ...product, price: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="outlined" type="submit" style={{ height: 56 }} color="primary">
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
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
                        {products !== undefined &&
                            products.map((product: ProductProps) => (
                                <TableRow key={product._id}>
                                    <TableCell align="left">{product.name}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.description}
                                    </TableCell>
                                    <TableCell align="left">{product.price}</TableCell>
                                    <TableCell /*className={classes.action}*/>
                                        <Button variant="outlined" onClick={() => dispatch(handleDelete(product._id))}>
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