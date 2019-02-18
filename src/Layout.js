/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, logout } from './actions/auth';
import Wrapper from './component/styles/Wrapper';
import { Header, Footer, Spinner } from './component/Index';
import Routers from './Routes';

@connect(
  state => ({ auth: state.auth, user: state.user.profile.name }),
  dispatch =>
    bindActionCreators(
      {
        initialize,
        logout,
      },
      dispatch,
    ),
)
class Layout extends PureComponent {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    const {
      auth: { loading, authenticated },
      user,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <BrowserRouter>
        <div>
          <Header
            logout={this.props.logout}
            user={authenticated ? user || '' : ''}
          />
          <Wrapper>
            <Route
              path="/"
              render={matchProps => (
                <Routers authenticated={authenticated} {...matchProps} />
              )}
            />
          </Wrapper>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;
