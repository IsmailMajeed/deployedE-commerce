import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Product from "../SubPageComponents/Product";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Spinner from "../SubPageComponents/Spinner";

export default function Features() {
  const [isLoading, setIsLoading] = useState(false);

  function getToken() {
    return localStorage.getItem('token');
  }

  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  const [categories, setCategories] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const token = getToken();
    // if (!token) {
    //   navigation('/Account/Login')
    //   return;
    // }
    setIsLoading(true);
    axios.get('/Featured/getFeatured', {
      headers: {
        'x-access-token': token, // Include the token in the headers
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        const featuredImageData = res.data[0];
        const { bigImg } = featuredImageData;

        setImageUrl(bigImg); // Assuming this is the URL for the big image
        setImageUrls(featuredImageData); // Assuming this is the URL for the small image
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = getToken();
    // if (!token) {
    //   navigation('/Account/Login')
    //   return;
    // }
    setIsLoading(true);
    axios.get('/Category/getAllCategories', {
      headers: {
        'x-access-token': token, // Include the token in the headers
      },
    })
      .then(res => {
        setIsLoading(false);
        if (res.data.message === 'jwt expired') {
          navigation('/Account/Login');
          return;
        }
        setCategories(res.data)
      }).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setImageUrl(imageUrls?.smallImg);
      } else {
        setImageUrl(imageUrls?.bigImg);
      }
    };

    handleResize()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageUrls]);

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

  return (
    <>
      <Helmet>
        <title>BAROQUE</title>
      </Helmet>
      {
        !isLoading ? (
          <div className="relative md:-top-20 max-md:-top-14">
            <Link className="no-underline" to="/AllProducts">
              {
                imageUrl ?
                  <img src={imageUrl} alt="err" className="max-w-full" />
                  : <></>
              }
              <div className="w-full flex justify-center relative -top-24">
                <button className="bg-black text-white py-2 px-4 text-lg">SHOP NOW</button>
              </div>
            </Link>
            <Container className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center mt-2 pb-5 gap-5">
              {
                categories && categories.map(category => (
                  <Product key={category._id} title={category.categoryName} image={category.categoryImage} id={category._id} />
                ))
              }
            </Container>
            <Container className="grid md:grid-cols-2 mt-5">
              <div className="max-w-full">
                <img src="https://cdn.shopify.com/s/files/1/2277/5269/files/Untitled-1_8b66fd6f-2d54-425e-95a4-c32c8a10b191_750x.jpg?v=1684312263" alt="" />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 bg-f5f5f5 max-md:py-14">
                <span className="flex font-bold">GET 5% OFF!</span>
                <span className="text-sm text-gray-600">SIGN UP NOW TO OUR NEWSLETTER</span>
                <div className="flex w-full justify-center">
                  <input className="w-1/2" type="text" />
                  <button className="uppercase bg-black text-white py-2 px-3">Sign me up</button>
                </div>
              </div>
            </Container>
          </div>
        ):(
          <div className="flex justify-center">
            <Spinner />
          </div>
        )
      }
    </>
  );
}