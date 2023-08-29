import React, { useContext, useState, useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import ImageCarousel from '../SubPageComponents/ImageCarousel'
import Collapse from 'react-bootstrap/Collapse';
import DropDownIcon from '../Icons/DropDownIcon';
import DropUpIcon from '../Icons/DropUpIcon';
import Product from '../SubPageComponents/Product';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Tick from '../Icons/Tick';
import Cross from '../Icons/Cross';
import { LikedContext } from '../Context/LikedContext';

function Pricing() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [featured, setFeatured] = useState([]);
  const navigation = useNavigate();

  function screenToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
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
    axios.get(`/Products/getProduct/${id}`, config).then(res => {
      if (res.data.message === 'jwt expired') {
        navigation('/Account/Login');
        return;
      }
      setQuantity(1)
      setProduct(res.data)
    }).catch(err => console.log(err))

    axios.get('/Products/getAllProducts', config).then(res => {
      if (res.data.message === 'jwt expired') {
        navigation('/Account/Login');
        return;
      }
      setFeatured(res.data)
    }).catch(err => console.log(err))
    screenToTop()
  }, [id]);

  const [open, setOpen] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(false);
  const [openDT, setOpenDT] = useState(false);
  const [openEx, setOpenEx] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectSize, setSelectSize] = useState(0);
  const [selectColor, setSelectColor] = useState(0);

  const { updateProduct, cartProducts } = useContext(CartContext);
  const { LikedProducts, addLikedProduct, removeLikedProduct } = useContext(LikedContext);

  const [once, setOnce] = useState(true)

  if (once) {
    screenToTop()
    setOnce(false)
  }

  const [showCart, setShowCart] = useState(false);

  let length = 0;
  for (let cartProduct of cartProducts) {
    length += cartProduct.quantity
  }

  return (
    <>
      {
        product.productName &&
        <Helmet>
          <title>{product.productName} - BAROQUE</title>
        </Helmet>
      }
      {
        product.price ? (
          <>
            <div className='sticky top-28 z-10'>
              <div className={`absolute right-10 -top-8 bg-white border py-8 px-10 max-w-md transition-all duration-500 ${showCart ? '' : 'opacity-0 pointer-events-none'}`}>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-3'>
                    <Tick />
                    <nav>Item added to your cart</nav>
                  </div>
                  <button onClick={() => setShowCart(false)}>
                    <Cross />
                  </button>
                </div>
                <div className='flex gap-3 my-7'>
                  <div className={select === 0 ? 'w-1/5' : 'w-1/4'}>
                    <img src={`http://localhost:4000/${product?.images[0]}`} alt="test" />
                  </div>
                  <div className='flex flex-col gap-2.5'>
                    <nav className='w-60 font-semibold'>{product.productName}</nav>
                    <nav className='text-xs text-gray-500'>Type: {select === 0 ? 'UNSTITCHED' : 'STITCHED'}</nav>
                    {
                      select === 1 && (
                        <nav className='text-xs text-gray-500'>Size: {product.Sizes[selectSize]}</nav>
                      )
                    }
                    <nav className='text-xs text-gray-500'>Custom_Color: {product.Colours[selectColor]}</nav>
                  </div>
                </div>
                <div className='flex flex-col gap-3 mt-10'>
                  <Link to='/Cart' className='text-black'>
                    <button className='uppercase py-2.5 border-2 border-black w-full'>View my cart ({length})</button>
                  </Link>
                  <Link to={`/Payment/${product._id}/${(select === 0 ? 'UNSTITCHED' : product.Sizes[selectSize])}/${product.Colours[selectColor]}/${quantity}`} className='text-black'>
                    <button className='uppercase py-2.5 border-2 border-black font-semibold bg-black text-white w-full'>Check out</button>
                  </Link>
                </div>
                <button onClick={() => setShowCart(false)} className='uppercase underline w-full mt-3 font-semibold'>
                  continue shopping
                </button>
              </div>
            </div>
            <Container className='grid md:grid-cols-2 gap-5'>
              <div className='md:px-24'>
                {
                  product.images ? (<ImageCarousel urls={product.images} />) : (<></>)
                }
              </div>
              <div className='flex flex-col gap-3 pr-10'>
                <nav className='text-lg text-gray-600 pl-10'>{product.productName}</nav>
                <b className='pl-10 text-lg'>
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
                </b>
                <div className='flex pl-10'>
                  <nav>Quantity: </nav>
                  <button className='ml-3 border rounded-sm w-8' onClick={() => {
                    (quantity > 1) ?
                      setQuantity(quantity - 1)
                      : ''
                  }}>-</button>
                  <nav className='w-auto text-right px-3'>{quantity}</nav>
                  <button className='border rounded-sm w-8' onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <nav className='text-sm text-gray-600 pl-10'>SKU:BQU-UF-D369-00</nav>
                <div>
                  <nav
                    className='uppercase cursor-pointer border-y border-gray-300 w-full text-left pl-10 pr-20 py-2 flex items-center justify-between'
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    Description
                    {open ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                  </nav>
                  <Collapse in={open}
                    className='py-4 px-10 text-xs'>
                    <div id="example-collapse-text"
                      dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }}
                    />
                  </Collapse>
                </div>
                <div className='pl-10 flex flex-col gap-3 text-sm'>
                  <div className='grid grid-cols-4'>
                    <b>Type</b>
                    <div className='flex gap-3 text-xs'>
                      <button onClick={() => setSelect(0)} className={select === 0 ? 'border border-black bg-gray-300 p-1' : ''}>UNSTITCHED</button>
                      {
                        product.Sizes.length > 0 && product.Sizes[0] !== "" && (
                          <button onClick={() => setSelect(1)} className={select === 1 ? 'border border-black bg-gray-300 p-1' : ''}>STITCHED</button>
                        )
                      }
                    </div>
                  </div>
                  {
                    select === 1 && (
                      <div className='grid grid-cols-4'>
                        <b>SIZE</b>
                        <div className='flex gap-3 text-xs'>
                          {
                            product.Sizes && product.Sizes.map((size, i) =>
                              <button onClick={() => setSelectSize(i)} className={selectSize === i ? 'border border-black bg-gray-300 p-1' : ''}>{size}</button>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                  <div className='grid grid-cols-4'>
                    <b>COLOR</b>
                    <div className='flex gap-3 text-xs'>
                      {
                        product.Colours && product.Colours.map((colour, i) =>
                          <button key={i} onClick={() => setSelectColor(i)} className={selectColor === i ? 'border border-black bg-gray-300 p-1' : ''}>{colour}</button>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className='grid md:grid-cols-3 md:gap-3 max-md:gap-2 py-3 border-y-2 border-gray-300'>
                  {
                    LikedProducts.includes(product._id) ? (
                      <button onClick={() => removeLikedProduct(product._id)} className='border-2 border-gray-500 py-2.5 font-bold text-xs rounded-none'>
                        REMOVE FROM WISHLIST
                      </button>
                    ) : (
                      <button onClick={() => addLikedProduct(product._id)} className='border-2 border-gray-500 py-2.5 font-bold text-xs rounded-none'>
                        ADD TO WISHLIST
                      </button>
                    )
                  }
                  <button onClick={() => {
                    setShowCart(true)
                    updateProduct(product, (select === 0 ? 'UNSTITCHED' : product.Sizes[selectSize]), product.Colours[selectColor], quantity)
                  }
                  } className='border bg-black text-white px-3 py-2.5 text-xs'>ADD TO CART</button>
                  <Link to={`/Payment/${product._id}/${(select === 0 ? 'UNSTITCHED' : product.Sizes[selectSize])}/${product.Colours[selectColor]}/${quantity}`}>
                    <button className='border-2 w-full text-black border-gray-700 px-3 py-2.5 font-bold text-xs'>BUY IT NOW</button>
                  </Link>
                </div>
                <div className='relative -top-4'>
                  <div>
                    <nav
                      className='uppercase cursor-pointer border-b border-gray-300 w-full text-left pl-10 pr-20 py-2 flex items-center justify-between'
                      onClick={() => setOpenInstruction(!openInstruction)}
                      aria-controls="example-collapse-text"
                      aria-expanded={openInstruction}>
                      INSTRUCTION
                      {openInstruction ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                    </nav>
                    <Collapse in={openInstruction}
                      className='py-4 px-10'>
                      <div id="example-collapse-text">
                        DRY CLEAN RECOMMENDED
                        <br />
                        IRON THE CLOTHES AT MODERATE TEMPERATURE
                        <br />
                        DO NOT USE ANY TYPE OF BLEACH OR STAIN REMOVING CHEMICALS
                        <br />
                        ACTUAL COLOR MAY SLIGHTLY VARY FROM THE IMAGE SHOWN.
                      </div>
                    </Collapse>
                  </div>
                  <div>
                    <nav
                      className='uppercase cursor-pointer border-b border-gray-300 w-full text-left pl-10 pr-20 py-2 flex items-center justify-between'
                      onClick={() => setOpenDT(!openDT)}
                      aria-controls="example-collapse-text"
                      aria-expanded={openDT}>
                      DISPATCH TIME
                      {openDT ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                    </nav>
                    <Collapse in={openDT}
                      className='py-4 px-10'>
                      <div id="example-collapse-text">
                        DISPATCH TIME (PAKISTAN) : WITHIN ONE WEEK
                        <br />
                        DISPATCH TIME (INTERNATIONAL) : WITHIN 2 WEEKS
                      </div>
                    </Collapse>
                  </div>
                  <div>
                    <nav
                      className='uppercase cursor-pointer border-b border-gray-300 w-full text-left pl-10 pr-20 py-2 flex items-center justify-between'
                      onClick={() => setOpenEx(!openEx)}
                      aria-controls="example-collapse-text"
                      aria-expanded={openEx}>
                      EXCHANGE
                      {openEx ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                    </nav>
                    <Collapse in={openEx}
                      className='py-4 px-10'>
                      <div id="example-collapse-text">
                        ANY PRODUCT BOUGHT FROM BAROQUE’S ONLINE STORE CAN BE EXCHANGED FROM THE ONLINE STORE ONLY, PROVIDED IT IS UNUSED AND STILL HAS THE LABEL AND TAG IN THEIR ORIGINAL STATE.
                        <br />
                        FOR SALE ORDERS, EXCHANGES WILL BE PROVIDED FOR VALID REASONS ONLY I.E FAULTY OR INCORRECT ITEMS DELIVERED.
                        <br />
                        REFUNDS ARE NOT IN CASH - THE CLIENT WILL BE ISSUED A COUPON OF THE SAME VALUE VALID FOR ONLINE STORE ONLY, WHICH CAN BE USED IMMEDIATELY OR IN THE FUTURE.
                        <br />
                        EXCHANGE POLICY IS ONLY LIABLE WITHIN 14 DAYS AFTER THE GOODS ARE DELIVERED.
                        <br />
                        FOR MORE INFORMATION REGARDING OUR EXCHANGE POLICY *CLICK HERE*
                        <br />
                        FOR INTERNATIONAL ORDERS, WE DO NOT OFFER EXCHANGES UNLESS WE DELIVER THE INCORRECT ORDER OR THE PRODUCT IS FAULTY. * BAROQUE DOES NOT PROVIDE EXCHANGE/REFUND FOR CUSTOM
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            </Container>
            <div className='text-center text-xl font-semibold mt-5 mb-4'>YOU MAY ALSO LIKE</div>
            <Container className='grid grid-cols-3 gap-3 text-center mb-5 px-5'>
              {
                featured.length ? (
                  <>
                    <Product discount={featured[0].discount} ids={featured[0]._id} price={featured[0].price} title={featured[0].productName} image={featured[0].images} />
                    <Product discount={featured[1].discount} ids={featured[1]._id} price={featured[1].price} title={featured[1].productName} image={featured[1].images} />
                    <Product discount={featured[2].discount} ids={featured[2]._id} price={featured[2].price} title={featured[2].productName} image={featured[2].images} />
                  </>
                ) :
                  (<></>)
              }
            </Container>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Pricing