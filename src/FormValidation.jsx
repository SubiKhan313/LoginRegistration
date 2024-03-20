import { useEffect, useState } from "react";

const FormValidation = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    age: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.email.length < 15) {
      errors.email = "Email is too short";
    }
    if (inputValues.password.length < 5) {
      errors.password = "Password is too short";
    }
    if (!inputValues.age || inputValues.age < 18) {
      errors.age = "Minimum age is 18";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    console.log(inputFields);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div>
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}

      {errors.email ? (
        <p className="error">Email should be at least 15 characters long</p>
      ) : null}

      {errors.password ? (
        <p className="error">Password should be at least 5 characters long</p>
      ) : null}

      {errors.age ? <p className="error"> Minimum age is 18</p> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
          ></input>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={inputFields.age}
            onChange={handleChange}
          ></input>
        </div>{" "}
        <button type="submit">Submit Information</button>
      </form>
    </div>
  );
};

export default FormValidation;
