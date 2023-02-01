import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner animation='border' role='status' style={{marginLeft:"50%"}}>
        <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader