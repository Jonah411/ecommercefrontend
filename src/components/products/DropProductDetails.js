import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDropProductDetailsMutation } from "../../feature/profileReducer/authProfile";
import AlertToast from "../common/AlertToast";
import { useNavigate } from "react-router-dom";

const DropProductDetails = ({ productId }) => {
  const [dropProductDetails, { data, error, isSuccess, isError }] =
    useDropProductDetailsMutation();
  const navigate = useNavigate();
  const handleDrop = (e) => {
    e.preventDefault();
    console.log("productId", productId);
    dropProductDetails(productId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/profile/product");
      }, 3000);
    }
    if (isError) {
      toast.error(error?.data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isError, data, error, navigate]);
  return (
    <>
      <button className="btn btn-danger" onClick={(e) => handleDrop(e)}>
        Drop
      </button>
      <AlertToast />
    </>
  );
};

export default DropProductDetails;
