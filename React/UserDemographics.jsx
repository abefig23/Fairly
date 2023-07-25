import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as lookUpService from "../../services/lookUpService";
import debug from "sabio-debug";
import userDemoSchema from "../../schemas/userDemographicsSchema";
import "./userDemographics.css";
import { useNavigate } from "react-router-dom";
import userDemoServices from "../../services/userDemographicsService";
import { Button, Card, Col, FormLabel as Label } from "react-bootstrap";
import Swal from "sweetalert2";

const _logger = debug.extend("UserDemographics");

_logger("UserDemographicsForm", UserDemographicsForm);

function UserDemographicsForm() {
  const navigate = useNavigate();
  const formData = {
    preferredName: "",
    pronunciation: "",
    aboutMe: "",
    genderId: 0,
  };

  const [genderinfo, setGenderInfo] = useState({
    genderComponents: [],
  });

  const mapSelectOption = (item) => {
    return (
      <option value={item.id} key={"ListA-" + item.id}>
        {item.name}
      </option>
    );
  };

  useEffect(() => {
    lookUpService
      .getTypes(["genderTypes"])
      .then(onGetTypeSuccess)
      .catch(onGetTypeError);
  }, []);

  const onGetTypeSuccess = (response) => {
    _logger("Your form was successfully created", response);

    const genderList = response?.item.genderTypes;

    setGenderInfo((pState) => {
      const newState = { ...pState };
      newState.genderComponents = genderList.map(mapSelectOption);
      return newState;
    });
    userDemoServices
      .updateDemo(values)
      .then(onGetTypeSuccess)
      .catch(onGetTypeError);
  };

  const onGetTypeError = (err) => {
    _logger("onGetTypeError", err);
  };

  const handleSubmit = (values) => {
    Swal.fire({
      title: "Create new form",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add form",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          confirmButtonText: "Ok",
        });
        navigate("/dashboards/candidate");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    _logger("submitted", values);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={userDemoSchema}
      onSubmit={handleSubmit}
    >
      <Card className="user-demographics-form">
        <h1 className="form-header">Demographics</h1>
        <Col className="form-group">
          <Label htmlFor="preferredName" className="form-label">
            Preferred Name
          </Label>
          <Field
            type="text"
            id="preferredName"
            name="preferredName"
            className="form-control"
          />
          <ErrorMessage
            className="text-danger"
            name="preferredName"
            component="div"
          />
        </Col>

        <Col className="form-group">
          <Label htmlFor="pronunciation" className="form-label">
            Pronunciation
          </Label>
          <Field
            type="text"
            id="pronunciation"
            name="pronunciation"
            className="form-control"
          />
          <ErrorMessage
            className="text-danger"
            name="pronunciation"
            component="div"
          />
        </Col>

        <Col className="form-group">
          <Label htmlFor="aboutMe" className="form-label">
            About Me
          </Label>
          <Field
            as="textarea"
            id="aboutMe"
            name="aboutMe"
            className="form-control"
          />
          <ErrorMessage
            className="text-danger"
            name="aboutMe"
            component="div"
          />
        </Col>

        <Col className="form-group">
          <Label htmlFor="genderId">Gender</Label>
          <Field
            as="select"
            id="genderId"
            name="genderId"
            className="form-control"
          >
            <option value="">Select</option>
            {genderinfo.genderComponents}
            {/* <option value="0">Prefer Not to Answer</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Non binary</option> */}
          </Field>
          <ErrorMessage
            className="text-danger"
            name="genderId"
            component="div"
          />
        </Col>

        <Button
          onClick={handleSubmit}
          type="submit"
          className=" primary submit-button"
        >
          Save Changes
        </Button>
      </Card>
    </Formik>
  );
}

export default UserDemographicsForm;
