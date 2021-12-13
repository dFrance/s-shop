import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios';

interface StoreProps {
    products: ProductProps[],
    user: UserProps,
    checkout: any,
}

interface UserProps {
    logged: boolean;
}

interface ProductProps {
    name: string,
    description: string,
    price: number,
    quantity: number,
    selected: boolean,
    _id: number,
}
export const initialState = { products: [{}], checkout: [{}], user: {}} as StoreProps;
export const store = createSlice({
    name: 'store',
    initialState,
    reducers: {
        // handleAddProduct(state, action) {
        //     try {
        //         const data = {
        //             name: action.payload.name,
        //             description: action.payload.description,
        //             price: action.payload.price,
        //             quantity: 1,
        //             selected: false,
        //             id: +new Date(),
        //         }
        //         await axios({method: 'post', url: 'http://localhost:8080/product', data, headers: {'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ0ZjExMzY2MzczMGEyOTVlNTZlYSIsImlhdCI6MTYzNzcyMDQ1MSwiZXhwIjoxNjM3ODA2ODUxfQ.4e8Eawd0p4-1t0bBsORtlkbqLMlocnhDMle7RvESoZI'}})
        //         const newListProduct = ([...listProducts, data])
        //         localStorage.setItem('products', JSON.stringify(newListProduct))
        //         setListProducts(newListProduct)
        //         setProduct({ name: '', description: '', price: 0 })
        //         toast.success('Produto cadastrado!')
        //     } catch {
        //         toast.error('Erro ao cadastrar o produto.')
        //     }
        // },

        // getProducts(state, action){
        //     try{
        //         const request = await axios({method: 'get', url: 'http://localhost:8080/product'})
        //         state.user = {...state.user, logged: true}
        //         state.products = request.data
        //     } catch(err) {
        //         state.user = {...state.user, logged: false}
        //     }
        // },

        // handleAddProductCheckout(state, action) {
        //     try {
        //         toast.success('Produto adicionado no carrinho!')
        //         const newProducts = [...state.products];
        //         const newCheckout = [...state.checkout];
        //         const validateDuplicateProductCheckout = newCheckout.find(p => p._id === action.payload)
        //         if (validateDuplicateProductCheckout !== undefined) {
        //             const count = state.products.map(p => p._id === action.payload ? { ...p, quantity: p.quantity + 1 } : { ...p });
        //             state.checkout = count
        //             localStorage.setItem('checkout', JSON.stringify(count))
        //         } else {
        //             const filter = newProducts.filter(p => p._id === action.payload).map(p => p._id === action.payload ? { ...p, selected: true } : { ...p })
        //             const newListCheckout = [...newCheckout, ...filter]
        //             state.checkout = newListCheckout
        //             localStorage.setItem('checkout', JSON.stringify(newListCheckout))
        //         }
        //     } catch {
        //         toast.error('Erro ao adicionar o produto no carrinho')
        //     }
        // },

        handleIncrementQuantity(state, action) {
            const count = state.products.map(p => p._id === action.payload ? { ...p, quantity: p.quantity + 1 } : { ...p });
            state.checkout = count
            localStorage.setItem('checkout', JSON.stringify(count))
        },

        handleDecremmentQuantity(state, action) {
            const count = state.products.map(p => p._id === action.payload ? { ...p, quantity: p.quantity - 1 } : { ...p });
            state.checkout = count
            localStorage.setItem('checkout', JSON.stringify(count))
        },
        
        handleDelete(state, action) {
            const newProducts = [...state.products];
            const filter = newProducts.filter(p => p._id !== action.payload)
            state.products = filter
            localStorage.setItem('products', JSON.stringify(filter))
        }
    }
})

export const {
    handleIncrementQuantity, 
    handleDecremmentQuantity, 
    handleDelete
} = store.actions

export default store.reducer