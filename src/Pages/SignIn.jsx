import { useEffect } from "react";
import { useSignInMutation } from "../Features/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setApiToken, setUserId } from "../Features/slice/authSlice";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignIn = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();

  const phoneValue = localStorage.getItem("PhoneNo");

  useEffect(() => {
    if (phoneValue !== null) {
      setPhone(phoneValue);
    }
  }, [phoneValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const response = await signIn(formData);
      console.log(response);
      if (response.data.success === true) {
        localStorage.setItem("api_token", response.data.data.api_token);
        localStorage.setItem("user_id", response.data.data.user_id);

        dispatch(setUserId(response.data.data.user_id));
        dispatch(setApiToken(response.data.data.api_token));

        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        marginTop: "250px",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phone}
            type="number"
            placeholder="Enter Phone Number"
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {/* <input style={{margin: '7px'}} value={phone} type="number" readOnly/>
            <input style={{margin: '7px'}} value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button style={{margin: '7px'}} type='submit'>SignIn</button> */}
      </form>
    </div>
  );
};

export default SignIn;
