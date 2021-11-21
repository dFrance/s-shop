import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCheckout } from './checkout';
import { toast } from 'react-toastify'

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
    const [product, setProduct] = useState({});
    const [listProducts, setListProducts] = useState([])
      
    function handleAddProduct(e) {
        try {
            toast.success('Produto cadastrado!')
            const data = {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: 1,
                selected: false,
                id: +new Date(),
            }
            const newListProduct = ([...listProducts, data])
            localStorage.setItem('products', JSON.stringify(newListProduct))
            setListProducts(newListProduct)
            setProduct({ name: '', description: '', price: 0 })
        } catch {
            toast.error('Erro ao cadastrar o produto.')
        }
    }

    function handleIncrementQuantity(listProducts, id){
        const count = listProducts.map(p => p.id === id ? { ...p, quantity: p.quantity+1 } : { ...p });
        setListCheckoutProducts(count)
        localStorage.setItem('checkout', JSON.stringify(count))
    }

    function handleDecremmentQuantity(listProducts, id){
        const count = listProducts.map(p => p.id === id ? { ...p, quantity: p.quantity-1 } : { ...p });
        setListCheckoutProducts(count)
        localStorage.setItem('checkout', JSON.stringify(count))
    }

    function handleAddProductCheckout(id) {
        try {
            toast.success('Produto adicionado no carrinho!')
            const newProducts = [...listProducts];
            const newCheckout = [...listCheckoutProducts];
            const validadeDuplicateProductCheckout = listCheckoutProducts.find(p => p.id === id)
            if(validadeDuplicateProductCheckout !== undefined){
                handleIncrementQuantity(newCheckout, id)
            } else {
                const filter = newProducts.filter(p => p.id === id).map(p => p.id === id ? {...p, selected:true} : {...p})
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
        const filter = newProducts.filter(p => p.id !== id)
        setListProducts(filter)
        localStorage.setItem('products', JSON.stringify(filter))
    }
    useEffect(() => {
        const request = localStorage.getItem('products')
        if (request) {
            const parse = JSON.parse(request)
            setListProducts(parse)
        }
    }, [])
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
