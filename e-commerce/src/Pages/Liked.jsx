import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LikedContext } from '../Context/LikedContext';
import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CartContext } from '../Context/CartContext';

export default function Liked() {
  const navigation = useNavigate();
  function getToken() {
    return localStorage.getItem('token');
  }

  const { LikedProducts, removeLikedProduct } = useContext(LikedContext);
  const { updateProduct } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: {
        'x-access-token': token, // Include the token in the headers
      },
    }

    if (LikedProducts.length > 0) {
      axios.post('/Products/getProductsByIds', { Ids: LikedProducts }, config)
        .then(response => {
          if (response.data.message === 'jwt expired') {
            navigation('/Account/Login');
            return;
          }
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [LikedProducts]);

  const [checked, setChecked] = useState([]);

  function handleChecked(ev) {
    if (ev.target.checked) {
      setChecked(prev => [...prev, ev.target.id])
    }
    else {
      setChecked(prev => prev.filter(p => p !== ev.target.id));
    }
  }
  function handleAllChecks(ev) {
    if (ev.target.checked) {
      setChecked(LikedProducts)
    }
    else {
      setChecked([])
    }
  }

  function handleCart() {
    if (checked.length) {
      for (let check of checked) {
        const product = products.filter(p => p._id === check);
        updateProduct(product[0], 'UNSTITCHED', product[0].Colours[0], 1);
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>Wishlist - BAROQUE</title>
      </Helmet>
      <div className='flex gap-2 text-xs px-5'>
        <Link to='/' className='text-black no-underline'>Home</Link>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <nav className='text-gray-400'>Wishlist</nav>
      </div>
      <div className='px-5 text-gray-500'>
        <hr />
      </div>
      <div className='px-5 py-10'>
        <div className='grid grid-cols-1 gap-10'>
          <div className='bg-white rounded-lg'>
            <div className='flex items-center justify-end mb-3'>
              <button onClick={handleCart} className={'text-lg text-white px-3 py-2 ' + (checked.length ? 'bg-neutral-700' : 'bg-neutral-400')}>Bulk Add To Cart</button>
            </div>
            <table className='w-full text-center'>
              <thead className='border'>
                <tr>
                  <td className='w-60'>
                    <input onChange={handleAllChecks} type="checkbox" />
                  </td>
                  <td className='py-3 w-60 text-gray-500 border'>
                    <span>Image</span>
                  </td>
                  <td className='text-gray-500 w-60 border'>
                    <span>Title</span>
                  </td>
                  <td className='text-gray-500 w-60 border'>
                    <span>SKU</span>
                  </td>
                  <td className='border w-72'></td>
                </tr>
              </thead>
              <tbody className='border-b'>
                {products.map((product, i) => (
                  <tr key={product._id}>
                    <td className='border'>
                      <input onChange={handleChecked} checked={checked.includes(product._id)} type="checkbox" id={product._id} />
                    </td>
                    <td className={'pb-2 pl-2 text-left border' + (i === 0 ? ' pt-2 ' : '')}>
                      <img className='w-28 h-40'
                        src={`http://localhost:4000/${product.images[0]}`} alt="" />
                    </td>
                    <td className='border'>
                      <Link to={`/Pricing/${product._id}`}>
                        {product.productName}
                      </Link>
                    </td>
                    <td className='border'>
                      BQU-UF-D299-00
                    </td>
                    <td className='border'>
                      <div className='flex max-md:flex-col gap-3 px-3 justify-center items-center'>
                        <Link to={`/Pricing/${product._id}`} className='py-2 px-3 w-full text-white bg-neutral-700 no-underline border-2 border-neutral-700'>
                          Shop Now
                        </Link>
                        <button onClick={() => removeLikedProduct(product._id)} className='text-neutral-700 border-2 w-full border-neutral-700 py-2 px-3'>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}