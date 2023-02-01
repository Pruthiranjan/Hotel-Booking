import React,{useEffect,useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Row,Col,Button,Modal,Alert} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Hotel from '../components/Hotel.js'

function AlertDismissible(props) {
  const type = props.type??"error";
  if(type ==="success"){
    <Alert key={"success"} variant="success" >
      <Alert.Heading>Great! Hotel is Available for booking</Alert.Heading>
    </Alert>
  }else{
    return (
      <Alert  key={"danger"} variant="danger">
        <Alert.Heading>Sorry! Already Booked By Someone Try Another</Alert.Heading>
      </Alert>
    );
  }
}

function ShowModal(props) {
  const today = new Date();
  const [selectedDate, setSelecteddate] = useState(new Date())
  const [type,SetType] = useState(false)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Your Date
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {type?(<AlertDismissible type={type}/>):""}
      <DatePicker
            selected={selectedDate}
            onChange={ async (date) => {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }, 
              }
              var date = new Date(date);
              const NewDate = moment(date).format('DD-MM-YYYY');
              const { data } = await axios.post('/api/hotel/getStatus',{"hotel_id":props.hotelid,"booking_date":NewDate} ,config)
              setSelecteddate(date);
              if(data.hotel_status==0){
                SetType("error")
              }else{
                SetType("success")
              }
              }}
            className="form-control"
            minDate={today}
            customInput={
              <input
                type="text"
                id="validationCustom01"
                placeholder="First name"
              />
            }
          />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button variant="success">Book</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Homepage = () => {

  let loading = false;
  let error = false;
  const hotels = async ()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }   
    const { data } = await axios.get(
      '/api/hotel/getAll'
    )
    localStorage.setItem('Hotels', JSON.stringify(data.data));
  }
  const handleBook = (e,id)=>{
    setHotelId(id)
    setModalShow(true)
  }
  const [modalShow, setModalShow] = useState(false);
  const [hotelid, setHotelId] = useState('');

  const HotelList = JSON.parse(localStorage.getItem('Hotels'));
  useEffect(() => {
    hotels();
  }, [HotelList])
  return (
    <>
    <Meta />
    <h1>Latest Products</h1>
    {loading ?(<Loader/>):error?(<Message variant="danger">{error}</Message>):(
      <>
      <Row>
        {HotelList.map((details) => (
          <Col key={details._id} sm={12} md={6} lg={4} xl={3}>
            <Hotel data={details} handleBook={handleBook} />
          </Col>
        ))}
      </Row>
      <ShowModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        hotelid={hotelid}
      />
    </>
    )
    }
    </>
  )
}

export default Homepage