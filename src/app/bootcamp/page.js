"use client";
import { use, useEffect, useState } from "react";
import { slice } from "lodash";
import Navbar from "components/Layout/Navbar";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

function BootCamp() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true);
      try {
        const response = await axios.get(
          "https://devcamperserveapi.vercel.app/api/v1/auth/me",
          { headers }
        );
        setUser(response.data.data);
      } catch (error) {
        toast.error(error);
      }
      setIsLoadingUser(false);
    };
    fetchUser();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://devcamperserveapi.vercel.app/api/v1/bootcamps",
        { headers }
      );
      setData(response.data.data);
    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://devcamperserveapi.vercel.app/api/v1/bootcamps/${id}`,
        { headers }
      );
      console.log(response);
      if (response?.data?.success === true) {
        toast.success("BootCamp Deleted successfully!");
        fetchData();
      }
    } catch (error) {
      if (error?.response?.data?.success === false) {
        toast.error(error?.response?.data?.errMsg);
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  const [index, setIndex] = useState(4);
  useEffect(() => {
    if (!isLoading) {
      setInitialData(slice(data, 0, index));
    }
  }, [isLoading, data, index]);

  const loadMore = () => {
    setIndex(index + 4);
  };
  return (
    <div>
      <Navbar />
      {isLoading && isLoadingUser ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row py-4">
            <div className="col text-end">
              <Link href="bootcamp/add" className="btn btn-outline-success">
                Add BootCamp
              </Link>
            </div>
          </div>
          <div className="row">
            <h1 className="text-center">BootCamp List</h1>
            {initialData.map((item, index) => {
              return (
                <div key={index} className="col-6 p-5">
                  <Link
                    href={`/courses/${item.id}/${item.user}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card bg-success text-white">
                      <div className="card-header">
                        {item.name.toUpperCase()}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.email}</h5>
                        <p className="card-text">
                          {item.description.slice(0, 40)}
                        </p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">{item.phone}</li>
                        <li className="list-group-item">{item.website}</li>
                        <li className="list-group-item">
                          {item.location.formattedAddress}
                        </li>
                      </ul>
                    </div>
                  </Link>

                  <div className="row pt-3">
                    {item.user === user?.id ? (
                      <>
                        <div className="col-6 text-end">
                          <Link
                            className="btn btn-info"
                            href={`/bootcamp/edit/${item.id}`}
                          // href={`/editbootcamp/${item.id}`}
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-6 ">
                          <button
                            onClick={() => {
                              const shouldDelete = window.confirm(
                                "Are you sure you want to delete this bootcamp?"
                              );
                              if (shouldDelete) {
                                handleDelete(item.id);
                              }
                            }}
                            type="button"
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row d-grid mt-3 mb-5">
            {initialData && data && initialData.length < data.length ? (
              <div className="col-12 text-center">
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-lg btn-dark"
                >
                  Load More
                </button>
              </div>
            ) : (
              <div className="text-center p-5">
                <h2 className="alert alert-primary">No More Data</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BootCamp;
