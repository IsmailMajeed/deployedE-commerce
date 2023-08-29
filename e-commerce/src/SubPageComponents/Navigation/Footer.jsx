import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='bg-f5f5f5 flex justify-center items-center pt-10 pb-3 flex-col'>
        <ul className='flex md:flex-wrap max-md:flex-col gap-3 mx-24 justify-center'>
          <li>
            <Link to="/pages/who-we-are">
              WHO WE ARE
            </Link>
          </li>
          <li>
            <Link to="/pages/contact-us">
              CONTACT US
            </Link>
          </li>
          <li>
            <Link to="/pages/our-responsibility">
              OUR RESPONSIBILITY
            </Link>
          </li>
          <li>
            <Link to="/pages/exchange-refund">
              EXCHANGE &amp; REFUND
            </Link>
          </li>
          <li>
            <Link to="/pages/exchange-form">
              EXCHANGE FORM
            </Link>
          </li>
          <li>
            <Link to="/pages/shipping">
              SHIPPING
            </Link>
          </li>
          <li>
            <Link to="/pages/lookbook">
              LOOKBOOK
            </Link>
          </li>
          <li>
            <Link to="/pages/order-cancellation">
              ORDER CANCELLATION FORM
            </Link>
          </li>
          <li>
            <Link to="/pages/track-your-order-1">
              TRACK YOUR ORDER
            </Link>
          </li>
          <li>
            <Link to="/pages/service-we-provide">
              SERVICE WE PROVIDE
            </Link>
          </li>
          <li>
            <Link to="/pages/career">
              CAREERS
            </Link>
          </li>
          <li>
            <Link to="/">
              LEGAL
            </Link>
          </li>
          <li>
            <Link to="/pages/faq-s">
              FAQ's
            </Link>
          </li>
          <li>
            <Link to="/pages/privacy-policy">
              PRIVACY &amp; POLICY
            </Link>
          </li>
        </ul>
        <div className='flex gap-6 mt-1 socials'>
          <Link to="/">
            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-facebook w-5" viewBox="0 0 18 18">
              <path fill="currentColor" d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z">
              </path>
            </svg>
          </Link>
          <Link to="/">
            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-instagram w-5" viewBox="0 0 18 18">
              <path fill="currentColor" d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"></path>
              <path fill="currentColor" d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z">
              </path>
            </svg>
          </Link>
          <Link to="/">
            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-tiktok" width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.02 0H11s-.17 3.82 4.13 4.1v2.95s-2.3.14-4.13-1.26l.03 6.1a5.52 5.52 0 11-5.51-5.52h.77V9.4a2.5 2.5 0 101.76 2.4L8.02 0z" fill="currentColor">
              </path>
            </svg>
          </Link>
        </div>
        <div className='mt-4 flex gap-5'>
          <span className='text-gray-600'>We Accept</span>
          <div className='flex gap-1'>
            <img src="https://cdn.shopify.com/s/files/1/2277/5269/files/icon-cc-visa.webp?v=1680947140" />
            <img src="https://cdn.shopify.com/s/files/1/2277/5269/files/icon-cc-mastercard.webp?v=1680947140" />
          </div>
        </div>
      </div>
      <div className='bg-black text-white text-center py-3'>
        <nav className='text-xs tracking-wider'>ALL RIGHTS RESERVED TO BAROQUE 2023</nav>
      </div>
    </>
  )
}

export default Footer