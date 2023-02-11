import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Link id='RouterNavLink' className='text-decoration-none' to='/'>
          <Navbar.Brand>Find Your Carpark</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link className='text-decoration-none text-dark nav-link' to='/'>
              Home
            </Link>
            <Link
              className='text-decoration-none text-dark nav-link'
              to='/carpark-list'
            >
              Carpark List
            </Link>
            {/* <Link
              className='text-decoration-none text-dark nav-link'
              to='/production-notes'
            >
              Production Notes
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
