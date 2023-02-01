import React from 'react'
import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hotel = ({ data,handleBook }) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/details/${data._id}`}>
            <Card.Img src={data.image} variant='top'/>
        </Link>
        <Card.Body>
            <Link to={`/details/${data._id}`}>
                <Card.Title as='div'>
                    <strong>{data.hotel_name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='h6'>RS 500<Link className='booknow' onClick={(e) => handleBook(e, data._id)}>Book Now</Link></Card.Text>
    
        </Card.Body>
    </Card>
  )
}

export default Hotel