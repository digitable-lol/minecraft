import React from 'react'
import { Spinner as SpinnerBootStrap } from 'react-bootstrap'
import './index.scss'

const Spinner = () => {
  return (
    <div className='spinner'>
         <SpinnerBootStrap animation="border" role="status" className='spinner-item'>
          <span className="visually-hidden">Loading...</span>
        </SpinnerBootStrap>
    </div>
  )
}

export default Spinner