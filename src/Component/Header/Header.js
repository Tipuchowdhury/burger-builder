import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import Logo from '../../assets/logo.png';


const mapStateToProps = state => {
    return {
        token: state.token,
    }
}



const Header = props => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink exact to="/login" className="NavLink">LogIn</NavLink>
                </NavItem>
            </Nav>

        )
    } else {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink exact to="/" className="NavLink">BurgerBuilder</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink exact to="/orders" className="NavLink">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/logout" className="NavLink">Logout</NavLink>
                </NavItem>
            </Nav>

        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#D70F64",
                height: "70px",
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand" >
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                {links}

            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header);