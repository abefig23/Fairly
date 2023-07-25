import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Helmet } from "react-helmet-async";
import { Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";
import CandidateCard from "./CandidateCard";
import CandidateJobSearch from "./CandidateJobSearch";
import CandidateAppointmentList from "./CandidateAppointmentList";
import userService from "../../../../services/userService";
import "./candidate.css";
// import CandidateChat from "./CandidateChat";
import UserDemographicsCard from "../../../../components/users/UserDemographicsCard";

const _logger = debug.extend("Candidate");
const notyf = new Notyf({ position: { y: "top" } });

function Candidate(props) {
  const currentUser = props.currentUser.id;
  const [userData, setUserData] = useState();

  useEffect(() => {
    userService
      .getCurrentById(currentUser)
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  }, []);

  const onGetCurrentUserSuccess = (response) => {
    const user = response.item;
    setUserData(user);
  };

  const onGetCurrentUserError = (error) => {
    _logger(error);
    notyf.error("Failed to retrieve user data");
  };

  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <div className="candidate">
        <Row className="justify-content-between">
          <Col className="col-xl-4 col-s-12">
            <h1 className="h3 mb-3">Profile</h1>
            {userData && <CandidateCard userData={userData} />}
            <br />
            <h1 className="h3 mb-3">Appointments</h1>
            <CandidateAppointmentList currentUser={props.currentUser} />
            <br />
            <h1 className="h3 mb-3">Demographics</h1>
            {userData && (
              <UserDemographicsCard currentUser={props.currentUser} />
            )}
          </Col>
          <Col className="col-xl-8 col-s-1">
            <CandidateJobSearch currentUser={props.currentUser} />
          </Col>
        </Row>
      </div>
      <Col className="col-4">
        {/* <CandidateChat currentUser={props.currentUser} /> */}
      </Col>
    </React.Fragment>
  );
}

Candidate.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Candidate;
