import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NavStyles from './styles/NavStyles';

const Logo = styled.h1`
  font-size: 1rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  font-weight: lighter;
  justify-content: center;
  letter-spacing: 2px;
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <StyledHeader>
        <div className="bar">
          <Logo>
            <NavLink to="/">Facebook App</NavLink>
          </Logo>
        </div>
        <div>
          {user && (
            <NavStyles data-test="nav">
              {user && <span>Welcome {user}</span>}
              {user && <NavLink to="/">Profile</NavLink>}
              {user && (
                <NavLink to="#" onClick={this.handleLogout}>
                  Logout
                </NavLink>
              )}
              {!user && <NavLink to="/login">Sign In</NavLink>}
            </NavStyles>
          )}
        </div>
      </StyledHeader>
    );
  }
}
export default Header;

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired,
};
