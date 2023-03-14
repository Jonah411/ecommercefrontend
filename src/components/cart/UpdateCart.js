import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useUpdateCartMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import { MdSystemUpdateAlt } from "react-icons/md";

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
      updateCart(data);
    }
  }, [isSubmit, product, quantity, user, updateCart]);
  const toastRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message, totalPrice } = data;
      if (status) {
        toastRef.current = toast.success(`${message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        totalPrice && totalChange(totalPrice);
        setIsSubmit(false);
      } else {
        toastRef.current = toast.error(`${message}`, {
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

  useEffect(() => {
    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => {
          handleUpdate(e);
        }}
      >
        <MdSystemUpdateAlt />
      </Button>
      <AlertToast />
    </>
  );
};

export default UpdateCart;
