"use client";
import { useState } from "react";
// import { addBootCamp } from "redux/slices/bootCampSlice";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const FormSchema = Yup.object({
  name: Yup.string().required("Please Enter title"),
  description: Yup.string().required("Please Enter description"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please Enter Your Email"),
  website: Yup.string()
    .url("Invalid website URL")
    .required("Please Enter Your website Name"),
  phone: Yup.string()
    .matches(/^\+?[0-9]*$/, "Invalid phone number format")
    .required("Please Enter Your phone Number"),
  address: Yup.string()
    .min(20, "Address must be at least 20 characters")
    .required("Please Enter Your address"),
});

function BootcampForm() {
  const initialValues = {
    name: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
  };
  const [loading, setLoading] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      onSubmit: async (values, action) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        try {
          const response = await axios.post(
            "https://devcamperserveapi.vercel.app/api/v1/bootcamps",
            values,
            { headers }
          );
          toast.success("BootCamp Added successfully!");
          action.resetForm();
        } catch (error) {
          if (error.response.data.success === false) {
            toast.error(error.response.data.errMsg);
          } else {
            toast.error("An error occurred.");
          }
        }
        action.resetForm();
        setLoading(false);
      },
    });

  return (
    <>
      <div className="container pb-5 pt-5">
        <div className="text-center">
          <h2 className="index-h2">Add BootCamp</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row pb-5 pt-3">
            <div className="col py-5 border rounded-3">
              <div className="ps-3" style={{ width: "50%" }}>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="name"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="BootCamp Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Description..."
                      className="form-control"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.description && touched.description ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="website"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="website"
                      value={values.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.website && touched.website ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.website}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="phone"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone && touched.phone ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="email"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="address"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.address}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="d-grid pt-4 pb-3 gap-6 mx-auto pt-2">
                  <div className="row">
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-success rounded-0"
                        style={{ height: "44px", width: "156px" }}
                      >
                        Add BootCamp
                      </button>
                    </div>
                    <div className="col-4">
                      {!loading ? null : (
                        <div className="spinner-border" role="status"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BootcampForm;
