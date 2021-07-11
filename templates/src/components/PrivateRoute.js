import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
/**
 * We have to accept components coming from App.js
 *
 * ...rest for getting any other params
 * 
 * @desc We have added a render prop, where we check if our user is !authenticated & !loading, them it will redirect to login
 *       otherwise, it will load the component
 */
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Redirect to="/" />
      ): (
        <Component {...props} />
      )} />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
