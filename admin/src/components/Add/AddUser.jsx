import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Box, Button, Checkbox, Fade, Modal, TextField, Typography,} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {CloseSharp, Visibility, VisibilityOff} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, {useContext, useState} from "react";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {AuthContext} from "../../helpers/AuthContext";
import dayjs from "dayjs";

const AddUser = ({
  ProfileData,
  apiEndpoint,
  HandleModal,
  open,
  setOpen,
  data,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const { user } = useContext(AuthContext);

  const validationSchema = Yup.object({
    userName: Yup.string().min(5, "").required(""),
    dateOfBirth: Yup.date().required(""),
    email: Yup.string().email("").required(""),
    Password: Yup.string().required(""),
    isAccepted: Yup.boolean().required(""),
    isAdmin: Yup.boolean().required(""),
  });

  const [User, setUser] = useState({
    ID: "",
    userName: "",
    email: "",
    Password: "",
    dateOfBirth: new Date(),
    isAccepted: false,
    isAdmin: false,
  });

  const { handleSubmit, handleInputChange, handleEdit, handleCancel } =
    useCrudComponent({ apiEndpoint: "http://localhost:4000" });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmitData = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND}auth/admin/checkEmail`,
        { email: values.email }
      );

      if (response.data.Error === "User already exists") {
        setEmailError(true);
      } else if (!response.data.exists) {
        await validationSchema.validate(values);
        await handleSubmit(apiEndpoint, false, Cookies.get("token")).then(
          () => {
            setEmailError(false);
            HandleModal();
          }
        );
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleUpdateData = async () =>
    await handleEdit(user?.ID).then(async () =>
      handleSubmit(`${process.env.BACKEND}`, false, Cookies.get("token"))
    );

  const closeModal = () => {
    setOpen(false);
    setUser({
      ID: "",
      userName: "",
      email: "",
      Password: "",
      dateOfBirth: new Date(),
      isAccepted: false,
      isAdmin: false,
    });
    handleCancel();
  };

  return (
    <div className="space-y-4 min-h-96">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex mb-8 flex-row-reverse w-60 sm:w-full ">
              <CloseSharp
                className="relative right-0 hover:text-primary cursor-pointer"
                onClick={closeModal}
              />
            </div>

            <Formik
              validateOnMount
              initialValues={data ? user : User}
              validationSchema={validationSchema}
              onSubmit={ProfileData ? handleUpdateData : handleSubmitData}
            >
              {({ isValid, dirty, setFieldValue }) => (
                <Form className="gap-4 grid w-full">
                  <Field name="userName">
                    {({ field, meta }) => (
                      <div>
                        <TextField
                          label={"Username"}
                          variant="outlined"
                          fullWidth
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(
                              "userName",
                              e.target.value,
                              false
                            );
                          }}
                        />
                        <ErrorMessage
                          name="userName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field, meta }) => (
                      <div>
                        <TextField
                          label={"Email"}
                          variant="outlined"
                          fullWidth
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange("email", e.target.value, false);
                          }}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500"
                        />
                        {EmailError ? (
                          <div className="text-red-500">
                            Email Already exists
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Field>

                  <FormControl variant="outlined" className="w-full">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <Field name="Password">
                      {({ field, meta }) => (
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          onChange={(e) => {
                            field?.onChange(e);
                            handleInputChange(
                              "Password",
                              e.target.value,
                              false
                            );
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label={"Password"}
                        />
                      )}
                    </Field>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field
                      name="dateOfBirth"
                      component={DatePicker}
                      format="DD/MM/YYYY"
                      label={"DOB"}
                      className="w-full"
                      disableFuture
                      // {...field}
                      value={ProfileData ? dayjs(ProfileData?.DOB) : null}
                      onChange={(e) => {
                        setFieldValue(
                          "dateOfBirth",
                          dayjs().format(e.target?.value)
                        );
                        handleInputChange(
                          "dateOfBirth",
                          dayjs().format(e.target?.value),
                          false
                        );
                      }}
                    />
                  </LocalizationProvider>

                  <div className="flex justify-between items-center">
                    <Typography>Is Admin</Typography>
                    <Field type="checkbox" name="isAdmin">
                      {({ field, meta }) => (
                        <Checkbox
                          {...field}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange("isAdmin", e.target.value, false);
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex justify-between items-center">
                    <Typography>Is Accepted</Typography>
                    <Field type="checkbox" name="isAdmin">
                      {({ field, meta }) => (
                        <Checkbox
                          {...field}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange("isAdmin", e.target.value, false);
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="contained"
                      className="bg-Baige w-full"
                      type="submit"
                      disabled={!isValid || !dirty}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddUser;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  borderRadius: "20px",
  // height: '90vh',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
