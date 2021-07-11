import React, { Fragment, useState } from "react";
import { FaSearch, FaSnapchatGhost, MdLocationOff, MdLocationOn, FaSignOutAlt } from "react-icons/all";
import { getNgo } from "../actions/ngo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Ngo from "../components/ngo/Ngo";
// import { Line } from "react-chartjs-2";

const Dashboard = ({ getNgo, ngo: { ngos }, auth: { user }}) => {
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const autoSearch = (ngoType) => {
    toggle ? getNgo(ngoType, user.city) : getNgo(ngoType);
  };

  //   const data = {
  //     labels: [
  //       "2011",
  //       "2012",
  //       "2013",
  //       "2014",
  //       "2015",
  //       "2016",
  //       "2017",
  //       "2018",
  //       "2019",
  //       "2020",
  //     ],
  //     datasets: [
  //       {
  //         label: "Poverty Rate",
  //         data: [23, 28, 43, 40, 50, 52, 63, 70, 72, 79, 90],
  //         fill: true,
  //         backgroundColor: "orange",
  //         borderColor: "orange",
  //         borderWidth: 1,
  //       },
  //     ],
  //   };

  // const options = {
  //   maintainAspectRatio: false,
  // }

  return (
    <Fragment>
      <Link className="back-button" to="/"><FaSignOutAlt className="fa-arrow" /></Link>
      {/* <div className="line-chart"> 
            <Line
            data={data}
            height={400}
            width={600}
            options={options}
            plotOptions={plotOptions}
        />
        </div> */}
      <div className="sidebar">
        <div className="dashboard_heading">
          <h2><FaSnapchatGhost /></h2>
          <p>{user && user.name}</p>
        </div>
        <label className="switch">
          <input type="checkbox" onClick={toggler} />
          <span className="slider"></span>
          <MdLocationOff className="location-off" />
          <MdLocationOn className="location-on" />
        </label>
        {/* <div>
                    <a href="profile.html">
                    <img
                    className="round-img"
                    src={user.avatar}
                    alt=""
                    />
                    <h4>{user.name}</h4>
                    </a>
                </div> */}
        <div className="search-bar">
          <input
            type="text"
            className="search-text"
            onChange={(event) => autoSearch(event.target.value)}
            placeholder="I want to donate.."
          />
          <a className="search-button" href="#">
            <FaSearch className="fa-search" />
          </a>
        </div>
        <div className="card-container">
          {ngos.map((ngo) => (
            <Ngo ngo={ngo} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getNgo: PropTypes.func.isRequired,
  ngo: PropTypes.object.isRequired,
  auth:  PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ngo: state.ngo,
  auth: state.auth,
});

export default connect(mapStateToProps, { getNgo })(Dashboard);
