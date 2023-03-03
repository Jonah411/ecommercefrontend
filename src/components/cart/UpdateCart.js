import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useUpdateCartMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const UpdateCart = ({ product, quantity, totalChange }) => {
  const user = useSelector(getLoginDetails);
  const [updateCart, { data, isSuccess }] = useUpdateCartMutation();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && updateCart) {
      let data = {
        userId: user && user?.id,
        productId: product && product?.product?._id,
        quantity: quantity && quantity,
      };
      console.log(data);
      updateCart(data);
    }
  }, [isSubmit, product, quantity, user, updateCart]);

  useEffect(() => {
    if (isSuccess) {
      if (data?.status === true) {
        toast.success(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        data?.totalPrice && totalChange(data?.totalPrice);
        setIsSubmit(false);
      } else {
        toast.error(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsSubmit(false);
      }
    }
  }, [isSuccess, data, totalChange]);

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => {
          handleUpdate(e);
        }}
      >
        Update
      </Button>
      <AlertToast />
    </>
  );
};

export default UpdateCart;
