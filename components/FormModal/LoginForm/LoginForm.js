// Main Imports
import { useState } from "react";
// Components
import MainButton from "../../MainButton/MainButton";
// BS Components
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
// Styles
import styles from "./LoginForm.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LoginForm = ({ signupHandler, forgotHandler }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Logged In");
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign In</h2>
      <p className={styles["sign-up"]}>
        Don&apos;t Have an Account? <span onClick={signupHandler}>Sign Up</span>
      </p>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-1">Email address:</Form.Label>
          <Form.Control
            type="email"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            required
          />
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
          <span className={styles.forgot} onClick={forgotHandler}>
            Forogt Password?
          </span>
        </Form.Group>
        <MainButton text="sign in" classes="w-50 mx-auto mb-2" />
      </Form>
    </div>
  );
};

export default LoginForm;
