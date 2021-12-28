import { toast } from 'react-toastify'
import { useHistory } from 'react-router';
import { useIncrementProducts } from '../context';
import { FormEvent } from 'react';
import axios from 'axios';

// export interface ProductProps {
//     _id: number;
//     name: string;
//     product: string;
//     description: string;
//     price: number;
//     quantity: number;
// }

// export async function handleAddProduct(e, product, listProducts, setListProducts, setProduct) {
//     try {
//         const data = {
//             name: product.name,
//             description: product.description,
//             price: product.price,
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
// }

// function handleIncrementQuantity(listProducts:any, id:Number, setListCheckoutProducts: any){
//     const count = listProducts.map((p:ProductProps) => p._id === id ? { ...p, quantity: p.quantity+1 } : { ...p });
//     setListCheckoutProducts(count)
//     localStorage.setItem('checkout', JSON.stringify(count))
// }

// export function handleDecremmentQuantity(listProducts:any, id:Number, setListCheckoutProducts: any){
//     const count = listProducts.map((p:ProductProps) => p._id === id ? { ...p, quantity: p.quantity-1 } : { ...p });
//     setListCheckoutProducts(count)
//     localStorage.setItem('checkout', JSON.stringify(count))
// }

// export function handleAddProductCheckout(id:Number, listProducts: any, listCheckoutProducts) {
//     try {
//         toast.success('Produto adicionado no carrinho!')
//         const newProducts = [...listProducts];
//         const newCheckout = [...listCheckoutProducts];
//         const validadeDuplicateProductCheckout = listCheckoutProducts.find((p:ProductProps) => p._id === id)
//         if(validadeDuplicateProductCheckout !== undefined){
//             handleIncrementQuantity(newCheckout, id)
//         } else {
//             const filter = newProducts.filter((p:ProductProps)  => p._id === id).map((p:ProductProps) => p._id === id ? {...p, selected:true} : {...p})
//             const newListCheckout = [...listCheckoutProducts, ...filter]
//             localStorage.setItem('checkout', JSON.stringify(newListCheckout))
//             setListCheckoutProducts(newListCheckout)
//         }
//     } catch {
//         toast.error('Erro ao adicionar o produto no carrinho')
//     }
// }

// export function handleChangeQuantity(id:Number, operation:String) {
//     const newCheckout = [...listCheckoutProducts];
//     if(operation === 'remove'){
//         handleDecremmentQuantity(newCheckout, id)
//     } else {
//        handleIncrementQuantity(newCheckout, id)
//     }
// }


// export function handleDelete(id:Number){
//     const newProducts = [...listProducts];
//     const filter = newProducts.filter(p => p._id !== id)
//     setListProducts(filter)
//     localStorage.setItem('products', JSON.stringify(filter))
// }