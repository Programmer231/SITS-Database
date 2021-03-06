import classes from "../Form/NewMeetupForm.module.css";
import loginClasses from "./Login.module.css";
import Card from "../UI/Card";
import BeHappy from "../UI/assets/images/smile.jpg";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router";
import { useState } from "react";

const Login = (props) => {
  const { currentUser, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailChangedHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangedHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event, email, password) => {
    event.preventDefault();
    try {
      setError("");
      await login(email, password);
    } catch {
      setError("Failed to Login");
    }
  };

  return (
    <div>
      {currentUser ? <Navigate to="/database" /> : null}
      {props.smileyFace ? (
        <div style = {{width: '100%'}}><img src={BeHappy} alt="Be Happy :)" style = {{width: '50%', display: 'block', margin: 'auto'}}></img></div>
      ) : (
        <div className={loginClasses.loginWrap}>
          <Card>
            <div className={loginClasses.wrapInputs}>
              <form
                className={classes.form}
                onSubmit={(event) => submitHandler(event, email, password)}
              >
                <div className={classes.control}>
                  <label htmlFor="Part">Email</label>

                  <input
                    name="Part"
                    type="email"
                    value={email}
                    onChange={emailChangedHandler}
                    required
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="Part">Password</label>

                  <input
                    name="Part"
                    type="password"
                    value={password}
                    onChange={passwordChangedHandler}
                    required
                  />
                </div>
                <div className={classes.actions}>
                  <button type="submit">Submit</button>
                </div>
              </form>
              {error !== "" ? <h2>{error}</h2> : null}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Login;
