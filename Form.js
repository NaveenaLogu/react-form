import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.id]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;

    if (formData.username.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username error',
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email error',
      }));
      isValid = false;
    }

    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password error',
      }));
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Confirm password error',
      }));
      isValid = false;
    }

    if (isValid) {
      display(formData.username, formData.email, formData.password, formData.confirmPassword);
      clear();
    }
  };

  const display = (username, email, password, confirmPassword) => {
    const newData = {
      username,
      email,
      password,
      confirmPassword,
    };

    setSubmittedData((prevData) => [...prevData, newData]);
  };

  const clear = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" id="username" value={formData.username} onChange={handleChange} required/>
        <span>{errors.username}</span>
        <br />

        <label>Email:</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange}/>
        <span>{errors.email}</span>
        <br />

        <label>Password:</label>
        <input type="password" id="password" value={formData.password} onChange={handleChange}/>
        <span>{errors.password}</span>
        <br />

        <label>Confirm Password:</label>
        <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
        <span>{errors.confirmPassword}</span>
        <br />

        <input type="submit" value="Submit" />
      </form>

      <ul>
        {submittedData.map((data, index) => (
          <li key={index}>
            Name: {data.username}, Email: {data.email}, Password: {data.password}, Confirm Password: {data.confirmPassword}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationForm;
