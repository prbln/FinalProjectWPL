import { Fragment, useContext } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const signOutUser = (e) => {
    e.preventDefault();
    setCurrentUser("");
    navigate("/signin");
    navigate(0);
  };
  const location = useLocation();
  const renderAuthLink = () => {
    if (location.pathname == "/signin") {
      return <NavLink to="/signup">SIGN UP</NavLink>;
    } else {
      return <NavLink to="/signin">SIGN IN</NavLink>;
    }
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <b>Theme Box Store</b>
        </LogoContainer>

        <NavLinks>
          {parseInt(currentUser?.user.admin) ? (
            <NavLink to="/inventory">Check Inventory</NavLink>
          ) : (
            <></>
          )}

          {currentUser ? (
            <NavLink as="span">
              <span style={{ "margin-right": "20px", "font-size": "22px" }}>
                <b>Hi! {currentUser.user.name} 🤗 </b>
              </span>
              <span onClick={(e) => signOutUser(e)}>SIGN OUT</span>
            </NavLink>
          ) : (
            renderAuthLink()
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
