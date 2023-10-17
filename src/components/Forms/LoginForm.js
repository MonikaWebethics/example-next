"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};
const FormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email Format")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.post(
            "https://devcamperserveapi.vercel.app/api/v1/auth/login",
            values
          );
          const token = response.data.token;
          localStorage.setItem("token", JSON.stringify(token));
          console.log(response);
          // router.refresh();
          router.push("/bootcamp");
        } catch (error) {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data.errMsg);
          } else {
            toast.error("An error occurred.");
          }
        }
        setLoading(false);
      },
    });
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#6495ED" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login in</h3>
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.email && touched.email ? (
                        <p className="form-error text-danger">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4 pb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                    {!loading ? null : (
                      <div className="pt-2">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-center pt-2 pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <Link href="/signup" className="link-danger">
                        Register
                      </Link>
                    </div>
                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
