import { useState, useEffect } from "react";
import { useSignUpMutation } from "../Features/api/authApi";
import { useNavigate } from "react-router-dom";
import { setApiToken, setUserId } from "../Features/slice/authSlice";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useSignUpMutation();
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
      const response = await signUp(formData);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("ApiToken", response.data.data.api_token);
        localStorage.setItem("user_id", response.data.data.user_id);

        dispatch(setUserId(response.data.data.user_id));
        dispatch(setApiToken(response.data.data.api_token));

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // const change = () => {}

  const handleChange = (event) => {
    setPassword(event.target.value);
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
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {/* <input style={{margin: '7px'}} value={phone} type="number" name='phone' onChange={change} required/> */}
        {/* <input style={{margin: '7px'}} type="password" value={password} name='password' onChange={handleChange} required/> */}
      </form>
    </div>
  );
};

export default SignUp;
