import React, { Component } from 'react'
import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import { ButtonComp } from '../ButtonComp/ButtonComp'


export const NavbarComp = ({setShow, isDeleting, setIsDeleting}) => {
    console.log(isDeleting)
    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Minecraft</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <ButtonComp setShow={setShow} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
                        </Nav>
                    </Navbar.Collapse>

                    
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>

                    
                </Container>
            </Navbar>
        </div>
    )
}
