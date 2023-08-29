import React from 'react'
import { Link } from 'react-router-dom'

function Contact_us() {
  return (
    <div className='text-center flex flex-col gap-3'>
      <span>Name: M. Ismail</span>
      <span>Contact Number: <Link to="#">03111437753</Link></span>
    </div>
  )
}

export default Contact_us