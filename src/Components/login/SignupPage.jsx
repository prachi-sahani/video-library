import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login-signup.css"
import { useAuth } from "../../context/authorization-context";

export function SignupPage(){
    const { authToken } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        // if user is already logged in and tries to access signup page, they will be redirected to lastRoute or home page
        if (authToken) {
          navigate(
            localStorage.getItem("lastRoute")
              ? localStorage.getItem("lastRoute")
              : "/"
          );
        }
      },[])
      ;
    return(
        <main className="auth-page">
        <div className="card card-basic auth-card">
            <h2 className="card-header txt-center heading h2 heading-auth">
                <Link to="/login" className="btn-link btn-link-basic login-auth">Login</Link> /
                <Link to="/signup" className="btn-link btn-link-primary signup-auth">Signup</Link>
            </h2>
            <form className="form-auth my-3 txt-left">
                <div className="input-group auth-input-group">
                    <label className="input-label py-1 py-1" htmlFor="firstName">First Name<sup>*</sup></label>
                    <input className="input-outline" type="text" autoComplete="off" name="firstName"
                        placeholder="John" id="firstName" required />
                </div>
                <div className="input-group auth-input-group">
                    <label className="input-label py-1" htmlFor="lastName">Last Name<sup>*</sup></label>
                    <input className="input-outline" type="text" autoComplete="off" name="lastName"
                        placeholder="Doe" id="lastName" required />
                </div>
                <div className="input-group auth-input-group">
                    <label className="input-label py-1" htmlFor="emailID">Email ID<sup>*</sup></label>
                    <input className="input-outline w-100" type="email" autoComplete="off" name="emailID"
                        placeholder="delicious_desserts@email.com" id="emailID" required />
                </div>
                <div className="input-group auth-input-group">
                    <label className="input-label py-1" htmlFor="password">Password<sup>*</sup></label>
                    <input className="input-outline w-100" type="password" name="password" placeholder="*******"
                        id="password" required />
                </div>
                <div className="input-group auth-input-group">
                    <label className="input-label py-1" htmlFor="confirm-password">Confirm Password<sup>*</sup></label>
                    <input className="input-outline w-100" type="password" name="confirm-password" placeholder="*******"
                        id="confirm-password" required />
                </div>
                <p className="txt checkbox-input-group auth-checkbox">
                    <input type="checkbox" name="tnc" value="tnc" />
                    <label htmlFor="tnc">Agree to terms and conditions<sup>*</sup></label>
                </p>
                <button className="btn-basic btn-primary btn-auth my-3">Register</button>

            </form>
            <div className="card-footer">
                <div className="action-button">
                    <Link to="/" className="btn-link btn-link-basic">FORGOT PASSWORD?</Link>
                </div>
                <div className="action-icons">
                    ALREADY REGISTERED? <Link to="/login"
                        className="btn-link btn-link-primary txt-bold">LOGIN</Link>
                </div>
            </div>
        </div>
    </main>
    )
}