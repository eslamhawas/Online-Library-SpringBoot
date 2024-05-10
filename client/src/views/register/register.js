import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import { registeredData } from "../../data/usersData";

export default function Register() {
  // console.log(registeredData);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [created, setcreated] = useState("");

  async function registerSubmit(values) {
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/v1/Register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setcreated("Created Successfully , Wait until admin accept you ");
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  }

  const phoneRegexExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validateSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Name minLength is 3")
      .max(20, "Name maxlength is 20")
      .required("userName is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegexExp, "Phone is invalid")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "passwords do not match") // Adjusted error message
      .required("Re-enter password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validateSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5"></div>
      {error === null ? <div className="alert alert-danger">{error}</div> : ""}

      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">Name:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.userName}
          type="text"
          id="userName"
        />
        {formik.errors.userName && formik.touched.userName && (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.userName}
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          id="email"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.email}
          </div>
        )}

        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          type="tel"
          id="phone"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.phone}
          </div>
        )}

        <label htmlFor="password">password:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.password}
          </div>
        )}

        <label htmlFor="rePassword">rePassword:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          type="password"
          id="rePassword"
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.rePassword}
          </div>
        )}

        {isLoading ? (
          <button className="btn bg-main text-white mt-2" type="button">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main m-2"
          >
            Register
          </button>
        )}
        <div class="alert alert-success" role="alert">
          {created}
        </div>
      </form>
    </>
  );
}
