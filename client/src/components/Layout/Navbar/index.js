import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import '../Navbar/index.scss'


const NavbarComp = ({ getCards, searchString, setSearchString, handleShowFilter }) => {
    
    const searchThings = (e)=>{
        e.preventDefault()
        getCards({searchString:searchString})
    }

    return (
        <div className='fixed-nav'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">INVENTORY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button type="primary" onClick={handleShowFilter}>Меню</Button>{' '}
                        </Nav>
                    </Navbar.Collapse>

                    
                    <Form className="d-flex" onSubmit={searchThings}> 
                        <FormControl 
                            value={searchString}
                            onChange={(e)=> setSearchString(e.target.value)}
                            type="search"
                            placeholder="Поиск"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComp
