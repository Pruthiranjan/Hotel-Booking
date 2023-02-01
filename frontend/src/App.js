import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<Homepage/>} exact />
              <Route path='/login' element={<LoginScreen/>} />
              <Route path='/register' element={<RegisterScreen/>} />
            </Routes>
          </Container>
        </main>
      <Footer/>
    </Router>
  )
}

export default App
