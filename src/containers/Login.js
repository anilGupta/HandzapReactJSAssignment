/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Facebook } from 'styled-icons/fa-brands';
import { authenticate } from '../actions/auth';
import Button from '../component/styles/ThemeButton';
import CardStyle from '../component/styles/CardStyle';

@connect(
  state => ({ todo: state.todo }),
  dispatch =>
    bindActionCreators(
      {
        authenticate,
      },
      dispatch,
    ),
)
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.authenticate();
  }

  render() {
    return (
      <CardStyle padding offset>
        <h2 className="title">Please Sign In before Continuing</h2>
        <Button onClick={this.handleClick} className="altColor">
          <span>
            Login <Facebook size={24} />
          </span>
        </Button>
      </CardStyle>
    );
  }
}

export default Login;
