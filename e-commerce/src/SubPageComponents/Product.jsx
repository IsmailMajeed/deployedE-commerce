import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { LikedContext } from '../Context/LikedContext';

export default function Product(product) {
  const { pathname } = useLocation();
  const { cartProducts } = useContext(CartContext);
  const { setCartProducts } = useContext(CartContext);
  const { LikedProducts, addLikedProduct, removeLikedProduct } = useContext(LikedContext);
  const [heart, setHeart] = useState([]);
  // function addToCart() {
  //   setCartCount(cartCount + 1);
  // }

  const [Image, setImage] = useState(pathname === "/" ? product.image : product.image[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (pathname !== "/") {
      setImage(product.image[1]);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pathname !== "/") {
      setImage(product.image[0]);
      setIsHovered(false);
    }
  };

  return (
    <div className='relative'>
      <Link
        to={pathname === "/" ? `/AllProducts/${product.id}` : `/Pricing/${product.ids}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col bg-white no-underline text-black">
        <div className='overflow-hidden'>
          <div>
            <img
              loading='lazy'
              src={`${Image}`}
              alt="img"
              className={"max-w-full max-h-full rounded-sm transition-transform duration-700 " + (pathname === '/' ? '' : (isHovered ? ' scale-105' : ''))} />
          </div>
        </div>
        <span className='font-bold text-gray-600 mt-2'>{product.title}</span>
        {pathname === "/" ? (
          <div className="flex justify-center w-full items-center mt-2">
            <Link to={pathname === "/" ? `/AllProducts/${product.id}` : `/Pricing/${product.ids}`} className='text-black text-sm transition-all hover:font-bold'>SHOP NOW</Link>
          </div>
        ) :
          (
            <>
              <div className='absolute right-0'>
                {
                  product.discount > 0 ?
                    <nav className='bg-red-400 bg-opacity-50 text-white font-semibold px-3 py-0.5'>
                      -{product.discount}%
                    </nav>
                    : <></>
                }
              </div>
              <div className="flex justify-center w-full items-center mt-2">
                <nav className='text-black font-bold no-underline'>
                  {
                    product.discount > 0 ? (
                      <div className='flex gap-2'>
                        <s>PKR {product.price.toLocaleString()}</s>
                        <nav className='text-red-600'>
                          PKR {(product.price - (product.price * product.discount / 100)).toLocaleString()}
                        </nav>
                      </div>
                    ) :
                      <>
                        PKR {product.price.toLocaleString()}
                      </>
                  }
                </nav>
              </div>
            </>
          )}
      </Link>
      {
        pathname !== '/' && (
          <div
            onClick={() => {
              LikedProducts.includes(product.ids) ? (
                removeLikedProduct(product.ids)
                // setHeart(prev => prev.filter(id => id !== product.ids))
              ) :
                addLikedProduct(product.ids)
              // setHeart(prev => [...prev, product.ids]);
            }}
            id={product.ids}
            className={'absolute top-0 p-2 text-2xl cursor-pointer ' + (LikedProducts.includes(product.ids) ? 'text-red-800' : '')}>
            <ion-icon name="heart-outline"></ion-icon>
          </div>
        )
      }
    </div>
  );
}