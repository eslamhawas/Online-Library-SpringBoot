import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loginSubmit(values) {
    setIsLoading(true);
    try {
      let response = await axios.post(
        `http://localhost:8080/api/v1/Login`,
        values
      );

      //  response.data ==> id of user

      if (response.data) {
        localStorage.setItem("userId", response.data);
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response);
      console.log(error);
      // console.error(err);
    }
  }

  const validateSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{5,10}$/, "Password is invalid")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5"></div>
      {error === null ? <div className="alert alert-danger">{error}</div> : ""}

      <h3>Login Now </h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          id="email"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.email}
          </div>
        ) : null}

        <label htmlFor="password">Password : </label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.password}
          </div>
        ) : null}

        {isLoading ? (
          <button className="btn bg-main text-white mt-2" type="button">
            <i className="fas-fa-spinner fa-spin"></i>
          </button>
        ) : (
          <>
            <div class="alert alert-danger m-5" role="alert">
              {error.data}
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn"
              >
                Login
              </button>
              <Link className="btn" to={"../register"}>
                Register Now
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
}
