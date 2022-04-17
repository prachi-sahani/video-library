import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./login-signup.css";
import { useAuth } from "../../context/authorization-context";

export function SignupPage() {
  const { authToken, signupUser, isLoadingSignup } = useAuth();
  const navigate = useNavigate();
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const initialFormErrors = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };
  const [signupForm, setSignupForm] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // if user is already logged in and tries to access signup page, they will be redirected to previous page
    if (authToken) {
      navigate(-1);
    }
  }, []);
  function signupUserClickHandler(e) {
    e.preventDefault();
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!signupForm.firstName) {
      setFormErrors((data) => ({ ...data, firstNameError: "Required field" }));
    }
    if (!signupForm.lastName) {
      setFormErrors((data) => ({ ...data, lastNameError: "Required field" }));
    }
    if (!signupForm.email) {
      setFormErrors((data) => ({ ...data, emailError: "Required field" }));
    } else if (!emailRegex.test(signupForm.email)) {
      setFormErrors((data) => ({ ...data, emailError: "Invalid email" }));
    }
    if (!signupForm.password) {
      setFormErrors((data) => ({ ...data, passwordError: "Required field" }));
    }
    if (!signupForm.confirmPassword) {
      setFormErrors((data) => ({
        ...data,
        confirmPasswordError: "Required field",
      }));
    }
    if (
      signupForm.password &&
      signupForm.confirmPassword &&
      signupForm.password !== signupForm.confirmPassword
    ) {
      setFormErrors((data) => ({
        ...data,
        confirmPasswordError: "Passwords do not match",
      }));
    }
    if (
      signupForm.firstName &&
      signupForm.lastName &&
      signupForm.email &&
      signupForm.password &&
      signupForm.confirmPassword &&
      signupForm.password === signupForm.confirmPassword &&
      emailRegex.test(signupForm.email)
    ) {
      signupUser({ email: signupForm.email, password: signupForm.password });
    }
  }

  function inputChangeHandler(e, type) {
    setFormErrors((data) => ({ ...data, [`${type}Error`]: "" }));
    setSignupForm((data) => ({
      ...data,
      [type]: e.target.value,
    }));
  }
  return (
    <main className="auth-page">
      <div className="card card-basic auth-card">
        <h2 className="card-header txt-center heading h2 heading-auth">
          <Link to="/login" className="btn-link btn-link-basic login-auth">
            Login
          </Link>{" "}
          /
          <Link to="/signup" className="btn-link btn-link-primary signup-auth">
            Signup
          </Link>
        </h2>
        <form className="form-auth my-3 txt-left">
          <div className="input-group auth-input-group">
            <label className="input-label py-1 py-1" htmlFor="firstName">
              First Name<sup>*</sup>
            </label>
            <input
              className="input-outline"
              type="text"
              autoComplete="off"
              name="firstName"
              placeholder="John"
              id="firstName"
              onChange={(e) => inputChangeHandler(e, "firstName")}
              required
            />
            <small className="msg-error">{formErrors.firstNameError}</small>
          </div>
          <div className="input-group auth-input-group">
            <label className="input-label py-1" htmlFor="lastName">
              Last Name<sup>*</sup>
            </label>
            <input
              className="input-outline"
              type="text"
              autoComplete="off"
              name="lastName"
              placeholder="Doe"
              id="lastName"
              onChange={(e) => inputChangeHandler(e, "lastName")}
              required
            />
            <small className="msg-error">{formErrors.lastNameError}</small>
          </div>
          <div className="input-group auth-input-group">
            <label className="input-label py-1" htmlFor="emailID">
              Email ID<sup>*</sup>
            </label>
            <input
              className="input-outline w-100"
              type="email"
              autoComplete="off"
              name="emailID"
              placeholder="delicious_desserts@email.com"
              id="emailID"
              onChange={(e) => inputChangeHandler(e, "email")}
              required
            />
            <small className="msg-error">{formErrors.emailError}</small>
          </div>
          <div className="input-group auth-input-group">
            <label className="input-label py-1" htmlFor="password">
              Password<sup>*</sup>
            </label>
            <input
              className="input-outline w-100"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*******"
              id="password"
              onChange={(e) => inputChangeHandler(e, "password")}
              required
            />
            <button
              className="btn-icon material-icons password-toggler"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </button>
            <small className="msg-error">{formErrors.passwordError}</small>
          </div>
          <div className="input-group auth-input-group">
            <label className="input-label py-1" htmlFor="confirm-password">
              Confirm Password<sup>*</sup>
            </label>
            <input
              className="input-outline w-100"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="*******"
              id="confirm-password"
              onChange={(e) => inputChangeHandler(e, "confirmPassword")}
              required
            />
            <button
              className="btn-icon material-icons password-toggler"
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
            >
              {showConfirmPassword ? "visibility" : "visibility_off"}
            </button>
            <small className="msg-error">
              {formErrors.confirmPasswordError}
            </small>
          </div>
          {/* <p className="txt checkbox-input-group auth-checkbox">
          <input type="checkbox" name="tnc" value="tnc" />
          <label htmlFor="tnc">
            Agree to terms and conditions<sup>*</sup>
          </label>
        </p> */}
          <button
            className="btn-basic btn-primary btn-auth my-3"
            onClick={signupUserClickHandler}
          >
            {!isLoadingSignup ? "Register" : "Loading..."}
          </button>
        </form>
        <div className="card-footer">
          <div className="action-button">
            <Link to="/" className="btn-link btn-link-basic">
              FORGOT PASSWORD?
            </Link>
          </div>
          <div className="action-icons">
            ALREADY REGISTERED?
            <Link
              to="/login"
              className="btn-link btn-link-primary txt-bold pl-1"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
