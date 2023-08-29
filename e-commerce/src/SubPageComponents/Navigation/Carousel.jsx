import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef } from 'react';

export default function SliderOpt() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000); // Adjust the time interval (in milliseconds) as needed

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <Slider {...settings}
        className='flex justify-between bg-black text-white text-center py-1.5' ref={sliderRef}>
        <div className="slide">
          <span className='text-sm font-bold'>FREE SHIPPING IN PAKISTAN</span>
        </div>
        <div className="slide">
          <span className='text-sm font-bold'>FOR ANY QUERY CONTACT US AT <span className='underline text-gray-600'>0321-1234567</span></span>
        </div>
        <div className="slide">
          <span className='text-sm font-bold'>EXCHANGE FORM <Link className='text-gray-600'>(CLICK HERE)</Link></span>
        </div>
      </Slider >
    </>
  );
}