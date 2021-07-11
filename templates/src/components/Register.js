import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { registerAction } from "../actions/auth";
import { FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";
// import './register.scss';

const Register = ({ setAlert, registerAction, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
    city: "",
    phone: "",
    hiddenPassword: true,
  });

  const { name, username, password, password2, city, phone, hiddenPassword } =
    formData;

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== password2 || passwordValidator(password)) {
      setAlert("Enter valid password", "danger");
    } else {
      setAlert("Registeration Successful", "success");
      registerAction({ name, username, password, city, phone });
    }
  };

  const passwordValidator = (password) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"
    );
    if (strongRegex.test(password)) {
      return false;
    } else {
      return true;
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

  // REDIRECT ON SUCCESS
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="r_form">
        <Link className="back-button" to="/">
          <FaSignOutAlt className="fa-arrow" />
        </Link>
        <p className="register_heading">Volunteer Registeration</p>
        <form
          className="form"
          id="register_form"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(event) => onChangeHandler(event)}
              name="name"
              required
            />
            <label className="placeholders">Full Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(event) => onChangeHandler(event)}
              name="address"
              required
            />
            <label className="placeholders">Address</label>
          </div>
          <div className="form-group">
            <input
              id="register_password"
              type={hiddenPassword ? "password" : "text"}
              value={password}
              onChange={(event) => onChangeHandler(event)}
              name="password"
              required
            />
            <label className="placeholders">Password</label>
            <FaEye
              className="fa_eye"
              style={showIcon}
              onClick={togglePassword}
            />
            <FaEyeSlash
              className="fa_eye"
              style={hideIcon}
              onClick={togglePassword}
            />
          </div>
          <div className="form-group">
            <input
              id="register_confirm_password"
              type="password"
              value={password2}
              onChange={(event) => onChangeHandler(event)}
              name="password2"
              required
            />
            <label className="placeholders" id="confirm_password_placeholder">
              Confirm Password
            </label>
          </div>
          <div className="form-group city">
            <input
              id="register_city"
              type="text"
              value={city}
              onChange={(event) => onChangeHandler(event)}
              name="city"
              required
            />
            <label className="placeholders">City</label>
          </div>
          <div className="form-group phone">
            <input
              id="register_phone"
              type="text"
              value={phone}
              onChange={(event) => onChangeHandler(event)}
              name="phone"
              required
            />
            <label className="placeholders" id="phone_placeholder">
              Phone No.
            </label>
          </div>
          <input
            type="submit"
            id="register_btn"
            className="btn btn-primary"
            value="Register"
          />
        </form>
        <span className="my-1">
          Changed your mind?{" "} Only want to{" "}
          <Link to="/login" className="links">
            Donate
          </Link>
          ?
        </span>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerAction })(Register);
