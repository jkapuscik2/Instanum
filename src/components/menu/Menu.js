import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBCol
} from 'mdbreact';
import Logo from "../../assets/logo.png";
import {useSelector} from "react-redux";

const initialState = {
    collapse: false
}

const Menu = () => {
    const [state, setState] = useState(initialState)
    const user = useSelector(state => state.user)

    const onClick = () => {
        setState({
            collapse: !state.collapse,
        });
    }

    return (
        <header>
            <MDBNavbar color="white" light={true} expand="md" fixed="top">
                <MDBNavbarBrand href="/">
                    <MDBCol size="4" md="2">
                        <img src={Logo} className="img-fluid" alt="Logo"/>
                    </MDBCol>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={onClick}/>
                <MDBCollapse id="navbarCollapse3" isOpen={state.collapse} navbar>
                    <MDBNavbarNav right className={"mr-5"}>
                        {user.auth ? (
                            <>
                                <MDBNavItem>
                                    <MDBNavLink to="/logout">Logout</MDBNavLink>
                                </MDBNavItem>
                            </>
                        ) : (
                            <><MDBNavItem>
                                <MDBNavLink to="/register">Register</MDBNavLink>
                            </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/login">Login</MDBNavLink>
                                </MDBNavItem>
                            </>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
    );
}

export default Menu;