import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext';

const CartPage = () => {
    const { user } = useAuth();
    const { deleteProductFromCart, getUserCart, cart, } = useProducts();

    useEffect(() => {
        if(user){
            getUserCart(user);
        }
    }, [user, cart]);

  return (
    <div className='pt-[30px]'>
      cart
    </div>
  )
}

export default CartPage
