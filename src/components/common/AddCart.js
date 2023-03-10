import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartDetails,
  getLoginDetails,
} from "../../feature/loginReducer/loginReducer";
import { toast } from "react-toastify";
import { useAddCartListMutation } from "../../feature/profileReducer/authProfile";
import AlertToast from "./AlertToast";

const AddCart = ({ productId }) => {
  const user = useSelector(getLoginDetails);
  const [addCartList, { data, isSuccess }] = useAddCartListMutation();
  const dispatch = useDispatch();
  const cartList = {
    user: user ? user?.id : null,
    items: [
      {
        product: { _id: productId },
        quantity: 1,
      },
    ],
  };

  const handleClick = () => {
    if (user) {
      addCartList(cartList);
    } else {
      dispatch(addCartDetails(cartList));
    }
  };
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
      }
    }
  }, [isSuccess, data]);
  return (
    <>
      <Button variant="contained" onClick={() => handleClick()} key={productId}>
        Add Cart
      </Button>
      <AlertToast />
    </>
  );
};

export default AddCart;
