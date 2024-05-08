import React, { useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

const SplashVariants = {
  hidden: {
    width: "100vw",
  },
  visible: {
    width: "50vw",
    transition: {
      delay: 3,
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const LogoVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      duration: 2,
      type: "spring",
      stiffness: 120,
      ease: "easeInOut",
    },
  },
};

const LoginVariants = {
  hidden: {
    width: "0vw",
    x: "100vw",
  },
  visible: {
    width: "50vw",
    x: 0,
    transition: {
      delay: 3,
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 5,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const SplashScreen = () => {
  const { login, errorMessage } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      ValidationSchema.validate(values)
        .then(async () => {
          login(values.email, values.password);
        })
        .then(async () => {
          // fetchAdmin(Cookies.get('token') as string)
          // router("/dashboard");
        });
    } catch (error) {}
  };

  return (
    <div className="flex overflow-hidden h-screen w-screen">
      <motion.div
        className={`bg-white flex items-center justify-center`}
        variants={SplashVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Animation */}
        <motion.img
          src={"/logo512.png"}
          alt="Logo"
          width={400}
          height={400}
          style={{ filter: "drop-shadow(2px 2px 2px #000000)" }}
          initial="hidden"
          animate="visible"
          variants={LogoVariants}
        />
      </motion.div>
      <motion.div
        className={`bg-darkBackground flex items-center justify-center`}
        variants={LoginVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Login Form */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white p-8 w-10/12 md:w-6/12 rounded-lg shadow-xl space-y-8 flex flex-col justify-around"
        >
          <Typography variant="h4">Welcome Back,</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-8 flex flex-col justify-center w-full">
                <Field
                  type="text"
                  name="email"
                  as={TextField}
                  color="secondary"
                  label={"Email"}
                  variant="outlined"
                  fullWidth
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                />

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  as={TextField}
                  color="secondary"
                  label={"Password"}
                  variant="outlined"
                  fullWidth
                  error={errors.password && touched.password}
                  helperText={touched.password && errors.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Field>
                {errorMessage ? errorMessage : null}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="bg-primary"
                >
                  <Typography variant="button">LOGIN</Typography>
                </Button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
