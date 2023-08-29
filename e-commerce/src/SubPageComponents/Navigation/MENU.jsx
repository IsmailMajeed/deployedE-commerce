import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';

export default function MENU() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categories, setCategories] = useState([]);
  const navigation = useNavigate();
  function getToken() {
    return localStorage.getItem('token');
  }
  useEffect(() => {
    const token = getToken();
    // if (!token) {
    //   navigation('/Account/Login')
    //   return;
    // }
    const config = {
      headers: {
        'x-access-token': token, // Include the token in the headers
      },
    }
    axios.get('/Category/getAllCategories', config).then(res => {
      if (res.data.message === 'jwt expired') {
        navigation('/Account/Login');
        return;
      }
      setCategories(res.data);
    }).catch(err => console.log(err))
  }, []);

  return (
    <>
      <button className='flex gap-1 items-center md:pl-10 max-md:pl-5' onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-10 md:h-10 max-md:w-6 max-md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <span className='mt-1 text-sm max-md:hidden'>MENU</span>
      </button>

      <Offcanvas className="uppercase" scroll show={show} onHide={handleClose} backdrop="static" bsPrefix='offcanvas'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='pl-4'>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='flex flex-col gap-1 px-0'>
          <button className='uppercase'>
            <div className='flex justify-between px-4 py-1 bg-gray-100'>
              <span>Collection</span>
              <span>+</span>
            </div>
          </button>
          {
            categories.length && categories.map(category =>
              <Link onClick={handleClose} className={`no-underline ${(category.categoryName === 'SPECIAL PRICES') ? 'text-red-700' : 'text-black'}  px-4 py-1 bg-gray-100`} to={`/AllProducts/${category._id}`}>
                <span>{category.categoryName}</span>
                {
                  category.categoryName === 'SPECIAL PRICES' && (
                    <span className='text-xs italic ml-5'>new</span>
                  )
                }
              </Link>
            )
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}