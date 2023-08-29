import Container from 'react-bootstrap/Container';
import Product from '../SubPageComponents/Product';
import DropDownIcon from '../Icons/DropDownIcon';
import { useEffect, useState } from 'react';
import DropUpIcon from '../Icons/DropUpIcon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Slider } from '@mui/material';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Spinner from '../SubPageComponents/Spinner';

export default function AllProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  function getToken() {
    return localStorage.getItem('token');
  }
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();

  const { id } = useParams();
  const navigation = useNavigate();
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

    if (id === undefined) {
      setIsLoading(true);
      axios.get('/Products/getAllProducts', config).then(res => {
        setIsLoading(false);
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        setProducts(res.data)
      }).catch(err => console.log(err))
    }
    else {
      setIsLoading(true);
      axios.get(`/Products/getProductsByCategoryId/${id}`, config).then(res => {
        setIsLoading(false);
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        setProducts(res.data)
      }).catch(err => console.log(err))


      setIsLoadingCategory(true);
      axios.get(`/Category/getCategory/${id}`, config).then(res => {
        setIsLoadingCategory(false);
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        setCategory(res.data)
      }).catch(err => console.log(err))
    }
  }, [id]);

  const [show, setShow] = useState([]);
  const [max, setMax] = useState(30000);
  const [min, setMin] = useState(0);

  useEffect(() => {
    if (category && category.properties) {
      setShow(Array(category.properties.length).fill(false));
    }
  }, [category]);

  const [showPrice, setShowPrice] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const [SizeFilter, setSizeFilter] = useState([]);

  const [Filter, setFilter] = useState(false);
  const [Filters, setFilters] = useState([]);
  const [applyFilters, setApplyFilters] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [value, setValue] = useState([0, 30000]);

  function handleSizeFilter(ev) {
    if (ev.target.checked) {
      setSizeFilter(prev => [...prev, ev.target.id])
    }
    else {
      setSizeFilter(prev => prev.filter(p => p !== ev.target.id));
    }
  }

  const handleChange = (e, x) => {
    setValue(x);
    setMax(x[1]);
    setMin(x[0]);
  };

  useEffect(() => {
    function toggleButtonVisibility() {
      if (window.pageYOffset > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    function handleScroll() {
      toggleButtonVisibility();
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleResize() {
    if (window.innerWidth >= 768) {
      setFilter(false);
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

  function handleFilters(ev, filterType) {
    const filterValue = ev.target.id;
    if (!ev.target.checked) {
      // If the checkbox is unchecked, remove its value from the filters array
      setFilters(prev => prev.filter(item => !(item.type === filterType && item.value === filterValue)));
    } else {
      // If the checkbox is checked, add its value to the filters array
      setFilters(prev => [...prev, { type: filterType, value: filterValue }]);
    }
  }

  function lieOnCondition(product) {
    // console.log(product);
    // Iterate over each property in the product
    for (const property of product.properties) {
      const propertyName = property.name;
      const propertyValue = property.value;

      // Check if there is a filter with the same type as the property name
      const hasFilterForProperty = Filters.some(filter => filter.type === propertyName);

      // If no filter exists for the property name, skip checking and return true
      if (!hasFilterForProperty) {
        continue;
      }

      // Check if the property name and value are included in the filters
      if (!Filters.some(filter => filter.type === propertyName && filter.value === propertyValue)) {
        return false;
      }
    }

    // If all properties in the product are included in the filters, return true

    if ((product.price - (product.price * product.discount / 100)) >= min && (product.price - (product.price * product.discount / 100) <= max))
      return true;
    else
      return false
  }
  function lieOnSizeCondition(product) {
    if (SizeFilter.length === 0) {
      return true;
    } else if (product.Sizes.some((value) => SizeFilter.includes(value))) {
      return true;
    } else {
      return false
    }
  }
  function handleFilterBtn() {
    if (Filters.length > 0)
      setApplyFilters(true)
  }


  return (
    <>
      {
        category ?
          <Helmet>
            <title>{category.categoryName} - BAROQUE</title>
          </Helmet>
          :
          <></>
      }
      <div onClick={screenToTop} className={'fixed rounded-md bg-white border-black border-2 left-5 cursor-pointer duration-500 ' + (showButton ? 'bottom-5' : '-bottom-full')}>
        <DropUpIcon w="10" h="10" />
      </div>
      <Container>
        <div className='flex gap-2 items-center border-b h-14 text-sm relative -top-8 pl-1 max-md:hidden'>
          <Link className='no-underline text-black' to="/">Home</Link>
          <div className='text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className='text-gray-400'>
            {category?.categoryName}
            {category ? '' : 'All'}
          </div>
        </div>
        <div className='grid md:grid-cols-5 gap-10'>
          <button onClick={() => setFilter(!Filter)} className='flex gap-2 absolute md:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <nav>FILTER</nav>
          </button>
          <div className="grid md:col-span-3 lg:col-span-4 lg:grid-cols-3 md:grid-cols-1 text-center pb-5 gap-5 max-md:mt-10 order-2">
            {
              isLoading ? (
                <div className='flex justify-center'>
                  <Spinner />
                </div>
              ) : (
                products?.length > 0 && products.map((product, i) => (
                  applyFilters ? (
                    lieOnCondition(product) && lieOnSizeCondition(product) && (
                      <Product key={product._id} discount={product.discount} ids={product._id} price={product.price} title={product.productName} image={product.images} />
                    )
                  ) : (
                    <div key={i}>
                      <Product key={product._id} discount={product.discount} ids={product._id} price={product.price} title={product.productName} image={product.images} />
                    </div>
                  )
                ))
              )
            }
          </div>
          {
            isLoadingCategory ? (
              <Spinner />
            ) : (
              <div className={'uppercase md:col-span-2 lg:col-span-1 order-1 w-full dropDown max-md:absolute max-md:bg-white transition-all duration-300 h-screen z-10 max-md:w-full ' + (Filter ? 'max-md:left-0 max-md:px-4' : '-left-full')}>
                <div onClick={() => setFilter(false)} className='md:hidden cursor-pointer absolute right-5'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                {
                  category && category.properties.map((property, index) => (
                    <div key={index}>
                      <button onClick={() => setShow((prev) => (prev.map((value, i) => (i === index ? !value : value))))}>
                        {show[index] ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                        <span>{property.name}</span>
                      </button>
                      <section className={'flex duration-600 transition-all ' + (show[index] ? 'translate-y-0' : 'absolute -z-10 -translate-y-1/3 opacity-0')}>
                        {
                          property.values.map(value =>
                          (
                            <nav key={value}>
                              <input onClick={(ev) => handleFilters(ev, property.name)} type="checkbox" id={value} />
                              <label htmlFor={value}>{value}</label>
                            </nav>
                          )
                          )
                        }
                        <nav>
                          <button onClick={(handleFilterBtn)} className='rounded-md bg-black py-2 px-4 mt-2 text-white w-auto'>FILTER</button>
                        </nav>
                      </section>
                    </div>
                  ))
                }
                <button onClick={() => setShowPrice(!showPrice)}>
                  {showPrice ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                  <span>Price</span>
                </button>
                <section className={'flex duration-600 transition-all ' + (showPrice ? 'translate-y-0' : 'absolute -z-10 -translate-y-1/3 opacity-0')}>
                  <nav className='gap-5 px-2'>
                    <input className='h-10 w-16' value={min} placeholder='From' type="number" />
                    <input className='h-10 w-16' value={max} placeholder='To' type="number" />
                  </nav>
                  <nav>
                    <Slider
                      className='text-black'
                      value={value}
                      min={0}
                      max={30000}
                      onChange={handleChange}
                      valueLabelDisplay="auto" />
                  </nav>
                  <nav>
                    <button onClick={() => setApplyFilters(!applyFilters)} className='rounded-md bg-black py-2 px-4 mt-2 text-white w-auto'>FILTER</button>
                  </nav>
                </section>
                <button onClick={() => setShowSize(!showSize)}>
                  {showSize ? (<DropUpIcon w="4" h="4" />) : (<DropDownIcon />)}
                  <nav>Size</nav>
                </button>
                <section className={'flex duration-600 transition-all ' + (showSize ? 'translate-y-0' : 'absolute -z-10 -translate-y-1/3 opacity-0')}>
                  <nav>
                    <input onChange={handleSizeFilter} checked={SizeFilter.includes('XS')} type="checkbox" id='XS' />
                    <label htmlFor="XS">XS</label>
                  </nav>
                  <nav>
                    <input onChange={handleSizeFilter} checked={SizeFilter.includes('S')} type="checkbox" id='S' />
                    <label htmlFor="S">S</label>
                  </nav>
                  <nav>
                    <input onChange={handleSizeFilter} checked={SizeFilter.includes('M')} type="checkbox" id='M' />
                    <label htmlFor="M">M</label>
                  </nav>
                  <nav>
                    <input onChange={handleSizeFilter} checked={SizeFilter.includes('L')} type="checkbox" id='L' />
                    <label htmlFor="L">L</label>
                  </nav>
                  <nav>
                    <input onChange={handleSizeFilter} checked={SizeFilter.includes('XL')} type="checkbox" id='XL' />
                    <label htmlFor="XL">XL</label>
                  </nav>
                  <nav>
                    <button onClick={() => setApplyFilters(!applyFilters)} className='rounded-md bg-black py-2 px-4 mt-2 text-white w-auto'>FILTER</button>
                  </nav>
                </section>
              </div>
            )
          }
        </div>
      </Container>
    </>
  )
}
