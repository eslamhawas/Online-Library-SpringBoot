import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {CloseSharp} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddBook = ({ open, setOpen, data }) => {
  const [postData, setPostData] = useState({
    isbn: "",
    category: "",
    title: "",
    rackNumber: "",
    price: 0,
    stockNumber: 0,
  });

  const initialValues = {
    isbn: "",
    category: "",
    title: "",
    rackNumber: "",
    price: 0,
    stockNumber: 0,
  };
  const apiEndpoint = data ? "http://localhost:8082/api/v1/Book" : `http://localhost:8082/api/v1/Book`;

  const updateBook = async (apiEndpoint, formData, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.put(`${apiEndpoint}`, formData, config);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const { handleInputChange, handleCancel, handleSubmit, handleEdit } =
    useCrudComponent({ apiEndpoint: `http://localhost:8082/api/v1/Book` });

  useEffect(() => {
    setPostData(data);
    handleEdit(data?.isbn);
  }, [data]);

  const closeModal = () => {
    setOpen(false);
    setPostData({
      isbn: "",
      category: "",
      title: "",
      rackNumber: "",
      price: 0,
      stockNumber: 0,
    });
    handleCancel();
  };

  const validationSchema = Yup.object({
    isbn: Yup.string().required("ISBN is Required"),
    category: Yup.string().required("Category is Required"),
    title: Yup.string().required("Title is Required"),
    rackNumber: Yup.string().required("Rack number is Required"),
    price: Yup.number().required("Price is Required"),
    stockNumber: Yup.number().required("Stock number is Required"),
  });

  return (
    <main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box className="grid overflow-y-auto max-h-[80vh]  space-y-8">
              <div className="flex mb-8 flex-row-reverse w-60 sm:w-full ">
                <CloseSharp
                  className="relative right-0 hover:text-primary cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              <Formik
                validateOnMount
                initialValues={data ? data : initialValues}
                validationSchema={validationSchema}
                onSubmit={() =>
                  data
                    ? updateBook(apiEndpoint, postData, Cookies.get("token"))
                    : handleSubmit(apiEndpoint, false, Cookies.get("token"))
                }
              >
                {({ errors, touched, handleChange }) => (
                  <Form className="space-y-4 text-red-500">
                    <Field
                      disabled={data ? true : false}
                      name="isbn"
                      type="text"
                      as={TextField}
                      label={"ISBN"}
                      variant="outlined"
                      fullWidth
                      error={errors.isbn && touched.isbn}
                      helperText={touched.isbn && errors.isbn}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange("isbn", e.target.value, false);
                        setPostData((prevData) => ({
                          ...prevData,
                          isbn: e.target.value,
                        }));
                      }}
                    />

                    {/* <ErrorMessage name='isbn'/> */}

                    <Field
                      name={`title`}
                      type="text"
                      as={TextField}
                      label={"Title"}
                      variant="outlined"
                      fullWidth
                      error={errors.title && touched.title}
                      helperText={touched.title && errors.title}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange("title", e.target.value, false);
                        setPostData((prevData) => ({
                          ...prevData,
                          title: e.target.value,
                        }));
                      }}
                    />

                    <Field
                      name={`category`}
                      type="text"
                      as={TextField}
                      label={"Category"}
                      variant="outlined"
                      fullWidth
                      error={errors.category && touched.category}
                      helperText={touched.category && errors.category}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange("category", e.target.value, false);
                        setPostData((prevData) => ({
                          ...prevData,
                          category: e.target.value,
                        }));
                      }}
                    />

                    <Field
                      name={`rackNumber`}
                      type="text"
                      as={TextField}
                      //   value={postData?.rackNumber || ""}
                      label={"Rack Number"}
                      variant="outlined"
                      fullWidth
                      error={errors.rackNumber && touched.rackNumber}
                      helperText={touched.rackNumber && errors.rackNumber}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange("rackNumber", e.target.value, false);
                        setPostData((prevData) => ({
                          ...prevData,
                          rackNumber: e.target.value,
                        }));
                      }}
                    />

                    <Field
                      name={`price`}
                      type="number"
                      as={TextField}
                      label={"Price"}
                      variant="outlined"
                      fullWidth
                      error={errors.price && touched.price}
                      helperText={touched.price && errors.price}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(
                          "price",
                          Number(e.target.value),
                          false
                        );
                        setPostData((prevData) => ({
                          ...prevData,
                          price: Number(e.target.value),
                        }));
                      }}
                    />

                    <Field
                      name={`stockNumber`}
                      type="number"
                      as={TextField}
                      label={"Stock Number"}
                      variant="outlined"
                      fullWidth
                      error={errors.stockNumber && touched.stockNumber}
                      helperText={touched.stockNumber && errors.stockNumber}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(
                          "stockNumber",
                          Number(e.target.value),
                          false
                        );
                        setPostData((prevData) => ({
                          ...prevData,
                          stockNumber: Number(e.target.value),
                        }));
                      }}
                    />

                    <div className="flex justify-between w-full">
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-primary"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </main>
  );
};

export default AddBook;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  maxHeight: "90vh",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
