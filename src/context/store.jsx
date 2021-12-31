import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios';
import { StoreProps } from './interfacesRedux';
import { useSelector } from 'react-redux';
import requestApi from '../services/requestApi';

export const initialState = {
    products: [{}], checkout: [{ name: null }], user: {}
};

export const getProductsAlreadyRegister = createAsyncThunk(
    'request/getProductsAlreadyRegister',
    async (_,thunkAPI) => {
        console.log(thunkAPI)
        console.log(thunkAPI.getState())
        const request = await requestApi.get('product')
        return request.data
    }
)


export const handleDelete = (productId) => (
    async () =>
    {
        const data = {_id: productId}
        try {
            await requestApi.delete('product', data)
            toast.success('Produto excluído com sucesso!')
        } catch {
            toast.success('Erro ao excluir!')

        }
    }
)



export const store = createSlice({
    name: 'store',
    initialState,
    reducers: {
        // handleAddProduct(state, action) {
        //     const data = {
        //         name: action.payload.name,
        //         description: action.payload.description,
        //         price: action.payload.price,
        //         quantity: 1,
        //         selected: false,
        //         id: +new Date(),
        //     }
        //     axios({
        //         method: 'post',
        //         url: 'http://localhost:8080/product',
        //         data,
        //         // headers: { 'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ0ZjExMzY2MzczMGEyOTVlNTZlYSIsImlhdCI6MTYzNzcyMDQ1MSwiZXhwIjoxNjM3ODA2ODUxfQ.4e8Eawd0p4-1t0bBsORtlkbqLMlocnhDMle7RvESoZI' } 
        //     }).then(() => {
        //         const newListProduct = ([...state.products, data])
        //         localStorage.setItem('products', JSON.stringify(newListProduct))
        //         state.products = newListProduct
        //         toast.success('Produto cadastrado!')
        //     }).catch((err) => {
        //         console.log(err)
        //         toast.error('Erro ao cadastrar o produto.')
        //     })
        // },

        handleIncrementQuantity(state, action) {
            const count = state.checkout.map(p => p._id === action.payload ? { ...p, quantity: p.quantity + 1 } : { ...p });
            state.checkout = count
            localStorage.setItem('checkout', JSON.stringify(count))
        },

        handleDecrementQuantity(state, action) {
            const count = state.checkout.map((p) => p._id === action.payload ? { ...p, quantity: p.quantity - 1 } : { ...p });
            state.checkout = count
            localStorage.setItem('checkout', JSON.stringify(count))
        },

        handleDeleteFromCheckout(state, action) {
            const newCheckout = [...state.checkout];
            const filter = newCheckout.filter(p => p._id !== action.payload)
            state.checkout = filter
            localStorage.setItem('checkout', JSON.stringify(filter))
        },

        handleDeleteProduct(state, action) {
            console.log('entrou')
            const newProducts = [...state.products];
            const filter = newProducts.filter(p => p._id !== action.payload)
            state.products = filter
            localStorage.setItem('products', JSON.stringify(filter))
        },

        handleAddProductCheckout(state, action) {
            try {
                toast.success('Produto adicionado no carrinho!')
                const newProducts = [...state.products];
                const newCheckout = [...state.checkout];
                const validateDuplicateProductCheckout = newCheckout.find(p => p._id === action.payload)
                if (validateDuplicateProductCheckout !== undefined) {
                    const count = newCheckout.map(p => p._id === action.payload ? { ...p, quantity: p.quantity += 1 } : { ...p });
                    state.checkout = count
                    localStorage.setItem('checkout', JSON.stringify(count))
                } else {
                    const filter = newProducts.filter(p => p._id === action.payload).map(p => p._id === action.payload ? { ...p, selected: true } : { ...p })
                    if (newCheckout[0].name) {
                        const newListCheckout = [...newCheckout, ...filter]
                        localStorage.setItem('checkout', JSON.stringify(newListCheckout))
                        state.checkout = newListCheckout
                    } else {
                        const newListCheckout = [...filter]
                        localStorage.setItem('checkout', JSON.stringify(newListCheckout))
                        state.checkout = newListCheckout
                    }
                }
            } catch {
                toast.error('Erro ao adicionar o produto no carrinho')
            }
        },

        getCheckoutAlreadyExist(state) {
            const request = localStorage.getItem('checkout')
            const parse = JSON.parse(request)
            if (parse && parse.length > 0) {
                state.checkout = parse
            }
        },
    },
    extraReducers: {
        [getProductsAlreadyRegister.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getProductsAlreadyRegister.fulfilled]: (state, action) => {
            state.products = action.payload
            state.status = 'success'
        },
        [getProductsAlreadyRegister.rejected]: (state, action) => {
            state.status = 'failed'
        },
    }
})

export const {
    handleAddProduct,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleAddProductCheckout,
    getCheckoutAlreadyExist,
    handleDeleteFromCheckout,
} = store.actions

export default store.reducer