import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCheckout } from './checkout';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useUserData } from './user';


// interface ProductContext {
//     children?: ReactNode;
// }

// export interface ProductProps {
//     id: number;
//     product: string;
//     description: string;
//     price: number;
//     quantity: number;
// }


export const ProductContext = createContext();


export const ProductProvider = ({children}) => {
    const {listCheckoutProducts, setListCheckoutProducts} = useCheckout();
    const {userData} = useUserData()
    const [product, setProduct] = useState({});
    const [listProducts, setListProducts] = useState([])
      
    async function handleAddProduct(e) {
        try {
            const data = {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: 1,
                selected: false,
                id: +new Date(),
            }
            await axios({method: 'post', url: 'http://localhost:8080/product', data, headers: {'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ0ZjExMzY2MzczMGEyOTVlNTZlYSIsImlhdCI6MTYzNzcyMDQ1MSwiZXhwIjoxNjM3ODA2ODUxfQ.4e8Eawd0p4-1t0bBsORtlkbqLMlocnhDMle7RvESoZI'}})
            const newListProduct = ([...listProducts, data])
            localStorage.setItem('products', JSON.stringify(newListProduct))
            setListProducts(newListProduct)
            setProduct({ name: '', description: '', price: 0 })
            toast.success('Produto cadastrado!')
        } catch {
            toast.error('Erro ao cadastrar o produto.')
        }
    }

    function handleIncrementQuantity(listProducts, id){
        const count = listProducts.map(p => p._id === id ? { ...p, quantity: p.quantity+1 } : { ...p });
        setListCheckoutProducts(count)
        localStorage.setItem('checkout', JSON.stringify(count))
    }

    function handleDecremmentQuantity(listProducts, id){
        const count = listProducts.map(p => p._id === id ? { ...p, quantity: p.quantity-1 } : { ...p });
        setListCheckoutProducts(count)
        localStorage.setItem('checkout', JSON.stringify(count))
    }

    function handleAddProductCheckout(id) {
        try {
            toast.success('Produto adicionado no carrinho!')
            const newProducts = [...listProducts];
            const newCheckout = [...listCheckoutProducts];
            const validadeDuplicateProductCheckout = listCheckoutProducts.find(p => p._id === id)
            if(validadeDuplicateProductCheckout !== undefined){
                handleIncrementQuantity(newCheckout, id)
            } else {
                const filter = newProducts.filter(p => p._id === id).map(p => p._id === id ? {...p, selected:true} : {...p})
                const newListCheckout = [...listCheckoutProducts, ...filter]
                localStorage.setItem('checkout', JSON.stringify(newListCheckout))
                setListCheckoutProducts(newListCheckout)
            }
        } catch {
            toast.error('Erro ao adicionar o produto no carrinho')
        }
    }

    function handleChangeQuantity(id, operation) {
        const newCheckout = [...listCheckoutProducts];
        if(operation === 'remove'){
            handleDecremmentQuantity(newCheckout, id)
        } else {
           handleIncrementQuantity(newCheckout, id)
        }
    }


    function handleDelete(id){
        const newProducts = [...listProducts];
        const filter = newProducts.filter(p => p._id !== id)
        setListProducts(filter)
        localStorage.setItem('products', JSON.stringify(filter))
    }
    useEffect(() => {
        // axios({method: 'get', url: 'http://localhost:8080/product'}).then((response) => setListProducts(response.data))
        // axios({method: 'get', url: 'http://localhost:8080/product'})
        if(userData){
            axios({method: 'get', url: 'http://localhost:8080/product', headers: {'Authorization': 'Bearer ' + userData.token}})
            .then((response) => console.log(response.data))
        }
    }, [userData])
    return (
        <ProductContext.Provider value={{
            product,
            listProducts,
            setProduct,
            handleDelete,
            handleAddProduct,
            handleChangeQuantity,
            handleAddProductCheckout}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useIncrementProducts = () => useContext(ProductContext)
