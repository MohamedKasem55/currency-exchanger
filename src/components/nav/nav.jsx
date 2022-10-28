import React from 'react'
import './nav.css'
function Nav() {
  return (
    <div className='class1'>
        <img src='../../../logo.png' />
        <div className='class2 col-lg-4'>
            <button className='nav-btn mx-3'>EUR-USD Details</button>
            <button className='nav-btn'>EUR-GBP Details</button>
        </div>
    </div>
  )
}

export default Nav