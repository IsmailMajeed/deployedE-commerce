import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageMagnifier from './ImageMagnifier';

export default function ImageCarousel(product) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  return (
    <>
      <Carousel indicators={false} activeIndex={index} onSelect={handleSelect}>
        {
          product.urls.map((url, i) => (
            <Carousel.Item key={i}>
              <ImageMagnifier
                url={`http://localhost:4000/${url}`}
              />
              {/* <img
                className="max-w-full transition-transform duration-300 hover:scale-125 cursor-crosshair"
                src={`http://localhost:4000/${url}`}
              /> */}
            </Carousel.Item>
          ))
        }
      </Carousel>
      <div className='max-md:flex justify-center'>
        <div className='mt-4 md:px-2 slider max-md:w-96'>
          <Slider {...settings}
            className='flex justify-between'>
            {
              product.urls.map((url, i) => (
                <div key={i} className="slide">
                  <img onClick={() => setIndex(i)} className='max-w-full' src={`http://localhost:4000/${url}`} />
                </div>
              ))
            }
          </Slider >
        </div >
      </div>
    </>
  );
}