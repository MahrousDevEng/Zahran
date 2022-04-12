// Main Imports
import { useState } from "react";
// Components
import MainButton from "../../MainButton/MainButton";
// BS Components
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
// Styles
import styles from "./SignupForm.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const SignupForm = ({ loginHandler, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const checker = (values) => {
    // FirstName
    const tempFName = values.firstName.length !== 0;
    !tempFName
      ? setErrors((prev) => ({ ...prev, firstName: "This is required field." }))
      : setErrors((prev) => ({ ...prev, firstName: "" }));
    // LastName
    const tempLName = values.lastName.length !== 0;
    !tempLName
      ? setErrors((prev) => ({ ...prev, lastName: "This is required field." }))
      : setErrors((prev) => ({ ...prev, lastName: "" }));
    // Email
    const tempEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      values.email
    );
    !tempEmail
      ? setErrors((prev) => ({
          ...prev,
          email: "This is required field and must be like a@b.ccc",
        }))
      : setErrors((prev) => ({ ...prev, email: "" }));
    // Password
    const tempPass =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        values.password
      );

    !tempPass
      ? setErrors((prev) => ({
          ...prev,
          password:
            "Minum 6 Characters with At least 1 lowercase letter, 1 uppercase letter, 1 number, 1 spcial character @ # $ % &",
        }))
      : setErrors((prev) => ({ ...prev, password: "" }));

    return {
      firstName: tempFName,
      lastName: tempLName,
      email: tempEmail,
      password: tempPass,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const values = {
      firstName: form["firstName"].value,
      lastName: form["lastName"].value,
      email: form["email"].value,
      password: form["password"].value,
    };

    const errorValues = checker(values);

    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.password
    ) {
      // const { data: user } = await axios.post(
      //   "http://localhost:5000/users",
      //   values
      // );
      // console.log(values);
      form.reset();
      closeModal();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create an Account</h2>
      <p className={styles["sign-up"]}>
        Already have an account? <span onClick={loginHandler}>Sign In</span>
      </p>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label className="mb-1">First Name:</Form.Label>
          <Form.Control
            type="text"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            required
          />
          {errors.firstName && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errors.firstName}</p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label className="mb-1">Last Name:</Form.Label>
          <Form.Control
            type="text"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            required
          />
          {errors.lastName && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errors.lastName}</p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-1">Email address:</Form.Label>
          <Form.Control
            type="email"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            required
          />
          {errors.email && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errors.email}</p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mb-1">Password:</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles["show-password"]}
            />
          </div>
          {errors.password && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errors.password}</p>
            </Alert>
          )}
        </Form.Group>
        <MainButton text="sign up" classes="w-50 mx-auto mb-2" />
      </Form>
    </div>
  );
};

export default SignupForm;
