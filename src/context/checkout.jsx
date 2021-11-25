import React, { createContext, useContext, useEffect, useState } from 'react'


export const CheckoutContext = createContext();


export const CheckoutProvider = ({children}) => {
    const [listCheckoutProducts, setListCheckoutProducts] = useState([]);
    const subTotal = listCheckoutProducts.map((p) => p.quantity > 1 ? p.price * p.quantity : p.price * 1)
    const total = subTotal.reduce((acc, sum) => acc + sum, 0)
    
    function handleDelete(id){
        const newProducts = [...listCheckoutProducts];
        const filter = newProducts.filter(p => p._id !== id)
        setListCheckoutProducts(filter)
        localStorage.setItem('checkout', JSON.stringify(filter))
    }
    
        useEffect(() => {
        const request = localStorage.getItem('checkout')
        if (request) {
            const parse = JSON.parse(request)
            setListCheckoutProducts(parse)
        }
    }, [])
    return (
        <CheckoutContext.Provider value={{listCheckoutProducts, setListCheckoutProducts, total, handleDelete}}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext)
