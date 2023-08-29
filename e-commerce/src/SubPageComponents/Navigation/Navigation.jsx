import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CartIcon from '../../Icons/CartIcons';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import MENU from './MENU';
import SliderOpt from './Carousel';
import Footer from './Footer';
import { LikedContext } from '../../Context/LikedContext';
import { userContext } from '../../Context/UserContext';

export default function Navigation() {
  const { cartProducts } = useContext(CartContext);
  const {setUser} = useContext(userContext);
  const { LikedProducts } = useContext(LikedContext);
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setIsNavbarAtTop(scrollTop === 0 || navbar.offsetTop === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let length = 0;
  for (let cartProduct of cartProducts) {
    length += cartProduct.quantity
  }
  return (
    <div>
      <SliderOpt />
      <Navbar id='navbar' className={'flex duration-300 ' + (isNavbarAtTop ? '' : 'bg-white')} sticky="top">
        <div className='flex justify-between md:mx-5 md:my-3 max-md:my-1 text-gray-900 items-center w-full'>
          <div className='w-full flex items-center text-gray-800'>
            <MENU />
          </div>
          <div className='flex w-full justify-center'>
            <Link className='text-gray-700 no-underline' to="/">
              <img src="https://cdn.shopify.com/s/files/1/2277/5269/t/79/assets/baroque-01.svg?v=173726269846380996331680069541" alt="" className='w-36' />
            </Link>
          </div>
          <div className={"flex gap-2.5 w-full justify-end items-center text-2xl mr-10"}>
            <div className='text-gray-600 cursor-pointer flex'>
              <ion-icon name="search-outline"></ion-icon>
            </div>
            <Link className='text-gray-600 no-underline pt-1' to="/Liked">
              <div className='flex pb-1 items-center'>
                <div className={'flex mr-1 ' + (LikedProducts.length > 0 ? 'text-red-600' : '')}>
                  <ion-icon name="heart-outline"></ion-icon>
                </div>
                <nav className='text-sm'>{LikedProducts.length}</nav>
              </div>
            </Link>
            <Link onClick={() => {
              localStorage.removeItem('token')
              setUser(null);
            }
            } className='text-gray-600 flex' to="/Account/Login">
              <ion-icon name="person-outline"></ion-icon>
            </Link>
            <Link className='text-gray-600 flex gap-1 no-underline' to="/Cart">
              <div className='flex items-center'>
                <CartIcon />
                <nav className='text-sm mt-1 ml-1'>({length})</nav>
              </div>
            </Link>
          </div>
        </div>
      </Navbar>
      {pathname === '/' ? (<></>) : (
        <hr className='text-gray-400 relative md:-top-4 max-md:-top-5' />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}