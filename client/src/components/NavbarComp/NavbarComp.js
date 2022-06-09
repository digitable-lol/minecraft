import React, { Component } from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { ButtonComp } from '../ButtonComp/ButtonComp'

export const NavbarComp = () => {
    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Minecraft</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <ButtonComp></ButtonComp>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
