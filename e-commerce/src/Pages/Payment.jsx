import React, { useContext, useEffect, useState } from 'react'
import { Button, Collapse, Container } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { countries } from 'countries-list';
import DropDownIcon from '../Icons/DropDownIcon';
import DropUpIcon from '../Icons/DropUpIcon';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CartContext } from '../Context/CartContext';
import { userContext } from '../Context/UserContext';

function Payment() {
  const {user} = useContext(userContext);
  const { id, type, colour, quantity } = useParams();
  const [products, setProducts] = useState([]);
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { pathname } = useLocation();

  const [email, setEmail] = useState(user?.email || '');
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [address, setAddress] = useState('');
  const [appartment, setAppartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (pathname === '/Payment/checkout') {
      setProducts(cartProducts)
    }
  }, [cartProducts]);

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
    if (pathname !== '/Payment/checkout') {
      axios.get(`/Products/getProduct/${id}`, config).then(res => {
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        setProducts([{ product: res.data, type: type, colour: colour, quantity: quantity }]);
      }).catch(err => console.log(err))
    }
  }, [id]);

  const [openSummery, setOpenSummery] = useState(true);
  const allCountries = Object.values(countries);
  const countryNames = allCountries.map(country => country.name);

  function handleResize() {
    if (window.innerWidth >= 1024) {
      setOpenSummery(true);
    }
    if (window.innerWidth < 1024) {
      setOpenSummery(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [once, setOnce] = useState(true)

  function screenToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (once) {
    screenToTop()
    setOnce(false)
  }

  let total = 0;
  for (let p of products) {
    const price = p.product.price * p.quantity;
    const discount = p.product.discount;

    total += price - (price * discount / 100);
  }

  async function handleOrder(ev) {
    ev.preventDefault();

    const data = {
      line_items: products,
      firstname: firstname,
      lastname: lastname,
      email: email,
      city: city,
      postalCode: postalCode,
      streetAddress: address,
      country: country,
      phone: phoneNumber,
      totalPrice: total,
    }
    if (appartment.length) {
      data.appartment = appartment
    }

    await axios.post('/Order/addNewOrder', data).then(res => {
      if (res.data.message === 'jwt expired') {
        navigation('/Account/Login');
        return;
      }
      if (pathname === '/Payment/checkout') {
        setCartProducts([]);
      }

      alert(`Order Placed Successfully\nYour Order number is: ${res.data._id}`);
      navigation('/');
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <Helmet>
        <title>Information - BAROQUE - Checkout</title>
      </Helmet>
      {
        products && (
          <>
            <Container
              className='flex justify-between py-3 border-y lg:hidden cursor-pointer'
              onClick={() => setOpenSummery(!openSummery)}
              aria-controls="example-collapse-text"
              aria-expanded={openSummery}>
              <button className='flex items-center gap-2 no-underline text-blue-500'>
                <nav className='mt-1'>
                  <ion-icon name="cart-outline"></ion-icon>
                </nav>
                <nav>Show order summary</nav>
                {openSummery ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
              </button>
              <button className='font-semibold text-lg'>Rs{total.toLocaleString()}.00</button>
            </Container>
            <Container>
              <div className='grid lg:grid-cols-5'>
                <Collapse in={openSummery}
                  className='lg:order-2 lg:col-span-2 max-md:col-span-3 md:col-span-3 py-16 px-12'>
                  <div id="example-collapse-text" className='flex flex-col gap-2'>
                    {
                      products.map((p, i) =>
                        <div key={i} className='flex justify-between items-center'>
                          <div className='flex items-center gap-2'>
                            <div className='relative'>
                              <nav className='absolute -right-3 -top-3 rounded-full bg-gray-500 text-white px-2'>{p.quantity}</nav>
                              <img className='border px-2.5 rounded-lg bg-white w-16' src={`http://localhost:4000/${p.product.images[0]}`} />
                            </div>
                            <div className='text-xs'>
                              <b>{p.product.productName}</b>
                              <nav className='text-gray-500'>
                                {
                                  p.type === 'UNSTITCHED' ?
                                    p.type :
                                    <>
                                      Size: {p.type}
                                    </>
                                }
                              </nav>
                              <nav className='text-gray-500'>Custom_Colour: {p.colour}</nav>
                            </div>
                          </div>
                          <div>
                            {
                              p.product.discount ? (
                                <div className='flex flex-col'>
                                  <s>
                                    Rs{(p.product.price * p.quantity).toLocaleString()}.00
                                  </s>
                                  <nav className='text-red-600'>
                                    Rs{((p.product.price - (p.product.price * p.product.discount / 100)) * p.quantity).toLocaleString()}.00
                                  </nav>
                                </div>
                              ) : (
                                <nav>Rs{(p.product.price * p.quantity).toLocaleString()}.00</nav>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                    <hr />
                    <div className='flex gap-3'>
                      <input className='border py-2.5 pl-2 w-full' type="text" placeholder='Gift card or discount code' />
                      <button className='bg-gray-300 py-2.5 px-4 rounded-md'>
                        Apply
                      </button>
                    </div>
                    <hr />
                    <div className='flex justify-between text-sm text-gray-600'>
                      <nav>Subtotal</nav>
                      <nav className='font-semibold text-gray-800'>Rs{total.toLocaleString()}.00</nav>
                    </div>
                    <div className='flex justify-between text-sm text-gray-600 mt-2'>
                      <nav className='flex items-center'>
                        <nav>
                          Shipping
                        </nav>
                        <nav className='text-lg mt-1 ml-1'>
                          <ion-icon name="help-circle"></ion-icon>
                        </nav>
                      </nav>
                      <nav className='text-xs'>Calculated at next step</nav>
                    </div>
                    <hr />
                    <div className='flex justify-between text-gray-600'>
                      <nav>Total</nav>
                      <div className='flex gap-2 items-center'>
                        <nav>PKR</nav>
                        <nav className='font-semibold text-gray-800 text-xl'>Rs{total.toLocaleString()}.00</nav>
                      </div>
                    </div>
                  </div>
                </Collapse>
                <div className='lg:border-r py-14 lg:pr-16 lg:order-1 col-span-3 bg-white'>
                  <Link to="/">
                    <img className='w-1/2' src="https://cdn.shopify.com/s/files/1/2277/5269/files/unnamed__1_-removebg-preview.png?31937" alt="BAROQUE" />
                  </Link>
                  <div className='flex gap-2 items-center text-xs'>
                    <Link to='/Cart' className='no-underline'>Cart</Link>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                    <nav>Information</nav>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                    <nav>Shipping</nav>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                    <nav>Payment</nav>
                  </div>
                  <div className='flex justify-between my-3'>
                    <nav>Contact Information</nav>
                    <nav className='flex gap-1 text-sm'>
                      {
                        !getToken() && (
                          <>
                            <nav>Already have an account?</nav>
                            <Link className='no-underline' to="/Account/Login">Log in</Link>
                          </>
                        )
                      }
                    </nav>
                  </div>
                  <form onSubmit={handleOrder}>
                    <div>
                      <input value={email} onChange={(ev) => setEmail(ev.target.value)} className='border py-2.5 pl-2 w-full' type="email" placeholder='Email' required={true} />
                      <nav className='text-sm text-gray-700 mt-3'>Email me with news and offers</nav>
                    </div>
                    <div>
                      <nav className='text-lg mt-5 mb-3'>Shipping address</nav>
                    </div>
                    <div className='grid gap-2'>
                      <select value={country} onChange={(ev) => setCountry(ev.target.value)} className='border py-2.5 pl-2 w-full'>
                        {
                          countryNames.map(country =>
                            <option>
                              {country}
                            </option>
                          )
                        }
                      </select>
                      <div className='grid md:grid-cols-2 gap-2'>
                        <input value={firstname} onChange={(ev) => setFirstname(ev.target.value)} className='border py-2.5 pl-2 w-full' pattern="[a-zA-Z]{6,}" type="text" placeholder='First name' required />
                        <input value={lastname} onChange={(ev) => setLastname(ev.target.value)} className='border py-2.5 pl-2 w-full' pattern="[a-zA-Z]{6,}" type="text" placeholder='Last name' required />
                      </div>
                      <div>
                        <input value={address} onChange={(ev) => setAddress(ev.target.value)} className='border py-2.5 pl-2 w-full' pattern=".{10,}" type="text" placeholder='Address' required />
                      </div>
                      <div>
                        <input value={appartment} onChange={(ev) => setAppartment(ev.target.value)} className='border py-2.5 pl-2 w-full' type="text" placeholder='Appartment, suite, etc (optional)' />
                      </div>
                      <div className='grid md:grid-cols-2 gap-2'>
                        <input value={city} onChange={(ev) => setCity(ev.target.value)} className='border py-2.5 pl-2 w-full' type="text" placeholder='City' required />
                        <input value={postalCode} onChange={(ev) => setPostalCode(ev.target.value)} className='border py-2.5 pl-2 w-full' type="number" placeholder='Postal code' required />
                      </div>
                      <div>
                        <input
                          value={phoneNumber}
                          onChange={(ev) => {
                            const num = ev.target.value;
                            if (num.length === 0) {
                              setPhoneNumber('')
                            } else if (num.charCodeAt(num.length - 1) >= 48 && num.charCodeAt(num.length - 1) <= 57)
                              setPhoneNumber(num)
                          }}
                          className='border py-2.5 pl-2 w-full'
                          type="text"
                          placeholder='Phone'
                          required />
                      </div>
                      <nav className='text-sm pl-1 text-gray-700 pt-1'>Save this information for next time</nav>
                    </div>
                    <div className='flex justify-between'>
                      <Link className='no-underline flex items-center text-sm' to='/Cart'>
                        <ion-icon name="chevron-back-outline"></ion-icon>
                        <nav>Return to cart</nav>
                      </Link>
                      <Button type='submit' className='p-3 font-bold'>Continue to Shipping</Button>
                    </div>
                  </form>
                </div>
              </div>
            </Container >
          </>
        )
      }
    </div >
  )
}

export default Payment