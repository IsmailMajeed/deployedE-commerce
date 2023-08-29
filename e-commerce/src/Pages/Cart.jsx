import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const navigation = useNavigate();
  function getToken() {
    return localStorage.getItem('token');
  }
  useEffect(() => {
    const token = getToken();
    // if(!token){
    //   navigation('/Account/Login');
    // }
  }, []);

  const { cartProducts, updateProduct } = useContext(CartContext);

  function moreOfThisProduct(product, type, colour) {
    updateProduct(product, type, colour, 1)
  }
  function lessOfThisProduct(product, type, colour) {
    updateProduct(product, type, colour, -1)
    // removeProduct(id);
  }

  let total = 0;
  for (const cartProduct of cartProducts) {
    const price = cartProduct.product.price * cartProduct.quantity;
    const discount = cartProduct.product.discount;
    total += (price - (price * discount / 100));
  }


  return (
    <div>
      <Helmet>
        <title>Your Shopping Cart - BAROQUE</title>
      </Helmet>
      {
        cartProducts.length === 0 ?
          (
            <div className='text-center pt-10'>
              <h1>Your cart is empty</h1>
              <div className='mt-32 pb-5'>
                {
                  !getToken() && (
                    <>
                      <h3>Have an account?</h3>
                      <nav className='text-xl'>
                        <Link to={'/Account/Login'} className='text-black'>
                          Log in
                        </Link>
                        &nbsp;
                        to check out faster.
                      </nav>
                    </>
                  )
                }
              </div>
            </div>
          ) : (
            <>
              <div className='px-5 py-10'>
                <div className='grid grid-cols-1 gap-10'>
                  <div className='bg-white rounded-lg'>
                    {cartProducts?.length > 0 && (
                      <>
                        <div className='flex items-center justify-between'>
                          <span className='uppercase text-5xl'>Your Cart</span>
                          <Link to='/' className='uppercase text-xl text-black'>Continue Shopping</Link>
                        </div>
                        <table className='w-full text-center'>
                          <thead className='border-b'>
                            <tr>
                              <td
                                className='uppercase py-4 text-left text-gray-500 text-xs'>
                                <span>Product</span>
                              </td>
                              <td
                                className='uppercase text-gray-500 text-xs'>
                                <span>Quantity</span>
                              </td>
                              <td
                                className='uppercase text-right text-gray-500 text-xs'>
                                <span>Total</span>
                              </td>
                            </tr>
                          </thead>
                          <tbody className='border-b'>
                            {cartProducts?.map((cartProduct, i) => (
                              <tr key={i}>
                                <td className={'pb-5 w-1/2' + (i === 0 ? ' pt-5 ' : '')}>
                                  <div className='flex'>
                                    <img className='w-36 h-56'
                                      src={`${cartProduct.product.images[0]}`} alt="" />
                                    <div className='text-left text-gray-500 ml-10'>
                                      <Link to={`/Pricing/${cartProduct.product._id}`} className='text-black no-underline hover:underline font-semibold text-lg'>
                                        {cartProduct.product.productName}
                                      </Link>
                                      <nav>
                                        {
                                          cartProduct.product.discount ? (
                                            <div className='flex gap-2'>
                                              <s>
                                                PKR {cartProduct.product.price.toLocaleString()}
                                              </s>
                                              <nav className='text-red-600'>
                                                PKR {(cartProduct.product.price - (cartProduct.product.price * cartProduct.product.discount / 100)).toLocaleString()}
                                              </nav>
                                            </div>
                                          ) : (
                                            <>
                                              PKR {cartProduct.product.price.toLocaleString()}
                                            </>
                                          )
                                        }
                                      </nav>
                                      <nav>
                                        {
                                          cartProduct.type === 'UNSTITCHED' ?
                                            (
                                              <nav>
                                                Type: UNSTITCHED
                                              </nav>
                                            ) : (
                                              <div className='flex flex-col gap-1'>
                                                <nav>
                                                  Type: STITCHED
                                                </nav>
                                                <nav>
                                                  Size: {cartProduct.type}
                                                </nav>
                                              </div>
                                            )
                                        }
                                      </nav>
                                      <nav>
                                        Custom_Color: {cartProduct.colour}
                                      </nav>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className='flex justify-center'>
                                    <div className='flex justify-center items-center border-2 border-black'>
                                      <button
                                        className='px-2'
                                        onClick={() => lessOfThisProduct(cartProduct.product, cartProduct.type, cartProduct.colour)}>-</button>
                                      <nav className='border-x-2 border-black px-2'>
                                        {
                                          cartProduct.quantity
                                        }
                                      </nav>
                                      <button
                                        className='px-2'
                                        onClick={() => moreOfThisProduct(cartProduct.product, cartProduct.type, cartProduct.colour)}>+</button>
                                    </div>
                                  </div>
                                </td>
                                <td className='text-right'>
                                  {/* PKR {(cartProducts.filter(item => item.product._id === cartProduct.product._id).length * (cartProduct.product.price - (cartProduct.product.price * cartProduct.product.discount / 100))).toLocaleString()} */}
                                  PKR {(cartProduct.quantity * (cartProduct.product.price - (cartProduct.product.price * cartProduct.product.discount / 100))).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className='flex flex-col items-end gap-3 mt-5'>
                          <nav className='text-xl uppercase flex gap-4'>
                            <nav className='font-semibold'>SubTotal</nav>
                            PKR {total.toLocaleString()}</nav>
                          <nav>Taxes and <u>shipping</u> calculated at checkout</nav>
                          <Link to='/Payment/checkout' className='bg-black no-underline text-white uppercase py-3 px-36 font-bold tracking-wide'>Checkout</Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}