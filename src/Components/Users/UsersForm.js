import React, { useState, useEffect } from "react";
import { showSuccessAlert } from "../../Utils/alerts";
import "../FormStyles.css";
import Map from "../Map/Map";
import { registerUser } from "../../Services/authService";
import UsersFormTerms from "./UsersFormTerms";

const UserForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    roleId: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [sendButton, setSendButton] = useState(true);

  useEffect(() => {
    acceptTerms && setSendButton(false);
  }, [acceptTerms]);

  const showTerms =
    initialValues.name.length > 0 &&
    initialValues.email.length > 0 &&
    initialValues.address.length > 0 &&
    initialValues.roleId.length > 0;

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setInitialValues({
          ...initialValues,
          name: e.target.value,
        });
        break;
      case "email":
        setInitialValues({
          ...initialValues,
          email: e.target.value,
        });
        break;
      case "password":
        setInitialValues({
          ...initialValues,
          password: e.target.value,
        });
        break;
      case "address":
        setInitialValues({
          ...initialValues,
          address: e.target.value,
        });
        break;
      case "roleId":
        setInitialValues({
          ...initialValues,
          roleId: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(initialValues)
      .then((res) => {
        showSuccessAlert("User created");
        setInitialValues({
          name: "",
          email: "",
          password: "",
          address: "",
          roleId: "",
        });
      })
      .catch((err) => {
        showSuccessAlert("Error");
        console.log(err);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        className="input-field"
        type="text"
        name="name"
        value={initialValues.name || ""}
        onChange={handleChange}
        placeholder="Name"
      ></input>
      <label htmlFor="email">Email</label>
      <input
        className="input-field"
        type="email"
        name="email"
        value={initialValues.email || ""}
        onChange={handleChange}
        placeholder="Email"
      ></input>
      <label htmlFor="password">Password</label>
      <input
        className="input-field"
        type="password"
        name="password"
        value={initialValues.password || ""}
        onChange={handleChange}
        placeholder="Password"
      ></input>
      <label htmlFor="address">Address</label>
      <input
        className="input-field"
        type="text"
        name="address"
        value={initialValues.address || ""}
        onChange={handleChange}
        placeholder="Street Number Town"
      ></input>
      <select
        className="input-field"
        name="roleId"
        value={initialValues.roleId || ""}
        onChange={handleChange}
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <Map address={initialValues.address} />
      <UsersFormTerms setAcceptTerms={setAcceptTerms} showTerms={showTerms} />
      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default UserForm;
