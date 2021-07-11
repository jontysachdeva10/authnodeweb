import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";
import { loginAction } from "../actions/auth";

const Login = ({ loginAction, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    hiddenPassword: true,
  });

  const { username, password, hiddenPassword } = formData;

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setAlert("Invalid Credentials", "danger");
    } else {
      setAlert("Welcome!!", "success");
      loginAction({ username, password });
    }
  };

  const togglePassword = () => {
    setFormData({
      ...formData,
      hiddenPassword: !hiddenPassword,
    });
  };

  const showIcon = hiddenPassword ? { display: "none" } : {};
  const hideIcon = !hiddenPassword ? { display: "none" } : {};

  //REDIRECT ON SUCCESS
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Link className="back-button" to="/">
        <FaSignOutAlt className="fa-arrow" />
      </Link>
      <p className="login_heading">Sign In</p>
      <form
        className="form"
        id="login_form"
        onSubmit={(event) => onSubmitHandler(event)}
      >
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(event) => onChangeHandler(event)}
            name="username"
            required
          />
          <label className="placeholders">Username</label>
        </div>
        <div className="form-group">
          <input
            type={hiddenPassword ? "password" : "text"}
            value={password}
            onChange={(event) => onChangeHandler(event)}
            name="password"
            required
          />
          <label className="placeholders">Password</label>
          <FaEye className="fa_eye" style={showIcon} onClick={togglePassword} />
          <FaEyeSlash
            className="fa_eye"
            style={hideIcon}
            onClick={togglePassword}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Get Started" />
      </form>
      <span className="my-2">
        Don't have an account?{" "}
        <Link to="/register" className="links">
          Register
        </Link>{" "}
        yourself.
      </span>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, loginAction })(Login);
