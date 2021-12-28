import { createContext, useContext, useState } from 'react'
// import { useUserData } from './user';
// import { useHistory } from 'react-router';
// import { useSelector } from 'react-redux';

export const ProductContext = createContext();


export const ProductProvider = ({children}) => {
    // const {checkout, products} = useSelector(state => state.store)
    // const {userData, setUserData} = useUserData();
    // const history = useHistory();
    // const [product, setProduct] = useState({});
    // const [listProducts, setListProducts] = useState([])
      
    // async function handleAddProduct(e) {
    //     try {
    //         
    //         }
    //         await axios({method: 'post', url: 'http://localhost:8080/product', data, headers: {'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ0ZjExMzY2MzczMGEyOTVlNTZlYSIsImlhdCI6MTYzNzcyMDQ1MSwiZXhwIjoxNjM3ODA2ODUxfQ.4e8Eawd0p4-1t0bBsORtlkbqLMlocnhDMle7RvESoZI'}})
    //         const newListProduct = ([...checkout, data])
    //         localStorage.setItem('products', JSON.stringify(newListProduct))
    //         state.checkout = newListProduct
    //         setProduct({ name: '', description: '', price: 0 })
    //         toast.success('Produto cadastrado!')
    //     } catch {
    //         toast.error('Erro ao cadastrar o produto.')
    //     }
    // }

    // function handleIncrementQuantity(listProducts, id){
    //     const count = listProducts.map(p => p._id === id ? { ...p, quantity: p.quantity+1 } : { ...p });
    //     setListCheckoutProducts(count)
    //     localStorage.setItem('checkout', JSON.stringify(count))
    // }

    // function handleDecremmentQuantity(listProducts, id){
    //     const count = listProducts.map(p => p._id === id ? { ...p, quantity: p.quantity-1 } : { ...p });
    //     setListCheckoutProducts(count)
    //     localStorage.setItem('checkout', JSON.stringify(count))
    // }

    // function handleAddProductCheckout(id) {
    //     try {
    //         toast.success('Produto adicionado no carrinho!')
    //         const newProducts = [...listProducts];
    //         const newCheckout = [...listCheckoutProducts];
    //         const validadeDuplicateProductCheckout = listCheckoutProducts.find(p => p._id === id)
    //         if(validadeDuplicateProductCheckout !== undefined){
    //             handleIncrementQuantity(newCheckout, id)
    //         } else {
    //             const filter = newProducts.filter(p => p._id === id).map(p => p._id === id ? {...p, selected:true} : {...p})
    //             const newListCheckout = [...listCheckoutProducts, ...filter]
    //             localStorage.setItem('checkout', JSON.stringify(newListCheckout))
    //             setListCheckoutProducts(newListCheckout)
    //         }
    //     } catch {
    //         toast.error('Erro ao adicionar o produto no carrinho')
    //     }
    // }

    // function handleChangeQuantity(id, operation) {
    //     const newCheckout = [...listCheckoutProducts];
    //     if(operation === 'remove'){
    //         handleDecremmentQuantity(newCheckout, id)
    //     } else {
    //        handleIncrementQuantity(newCheckout, id)
    //     }
    // }


    // function handleDelete(id){
    //     const newProducts = [...listProducts];
    //     const filter = newProducts.filter(p => p._id !== id)
    //     setListProducts(filter)
    //     localStorage.setItem('products', JSON.stringify(filter))
    // }
    // async function getProducts(){
    //     try{
    //         const request = await axios({method: 'get', url: 'http://localhost:8080/product'})
    //         setUserData({...userData, logged: true})
    //         setListProducts(request.data)
    //     } catch(err) {
    //         setUserData({...userData, logged: false})
    //     }
    // }
    // useEffect(() => {
    //     getProducts()
    // }, [])
    return (
        <ProductContext.Provider value={{
            // product,
            // listProducts,
            // setProduct,
            // handleDelete,
            // handleAddProduct,
            // handleChangeQuantity,
            // handleAddProductCheckout
            }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useIncrementProducts = () => useContext(ProductContext)
