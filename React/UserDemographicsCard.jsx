import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import userDemoServices from "../../services/userDemographicsService";
import debug from "sabio-debug";

const _logger = debug.extend("UserDemographicsCard");

function UserDemographicsCard() {
  const [demoData, setDemoData] = useState({
    preferredName: "",
    pronunciation: "",
    aboutMe: "",
    genderId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    userDemoServices.getDemo(4).then(onGetDemoSuccess).catch(onGetDemoError);
  }, []);
  _logger("useEffect");

  const onGetDemoSuccess = (response) => {
    _logger("onGetDemoSuccess", response.item);
    setDemoData(response.item);
  };

  const onGetDemoError = (error) => {
    _logger("onGetDemoError", error);
  };

  const handleEditClick = () => {
    navigate("/dashboard/users/demographics/edit");
  };

  _logger("DEMODATA", demoData);

  return (
    <div className="demo-outer-container">
      <div className="card-main">
        <div className="demo-user-info-parent-container">
          <div className="demo-card-header-user-info-container">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">User Demographics</Card.Title>
                <Button
                  variant="primary"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row className="d-flex">
                    <Col md="7">
                      <div className="user-settings-form">
                        <div>
                          <p>Preferred Name: {demoData.preferredName}</p>
                        </div>
                        <div>
                          <p>Pronunciation: {demoData.pronunciation}</p>
                        </div>
                        <div>
                          <p>About Me: {demoData.aboutMe}</p>
                        </div>
                        <div>
                          <p>Gender Id: {demoData.genderId}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDemographicsCard;
