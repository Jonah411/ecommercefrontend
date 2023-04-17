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

const AddCart = ({ productId, productQuandity, productStockQuantity }) => {
  const user = useSelector(getLoginDetails);
  const [addCartList, { data, isSuccess, error, isError }] =
    useAddCartListMutation();
  const dispatch = useDispatch();
  const cartList = {
    user: user ? user?.id : null,
    items: [
      {
        product: { _id: productId },
        quantity: productQuandity
          ? productQuandity
          : productStockQuantity
          ? productStockQuantity
          : 1,
      },
    ],
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (user) {
      addCartList(cartList);
    } else {
      dispatch(addCartDetails(cartList));
    }
  };
  useEffect(() => {
    console.log(error);
    if (isSuccess) {
      if (data?.status === true) {
        toast.success(`${data?.msg}`, {
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
        if (isError) {
          toast.error(`${error?.data?.msg}`, {
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
    } else {
      if (isError) {
        console.log("johnnnnn");
        toast.error(`${error?.data?.msg}`, {
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
  }, [isSuccess, data, isError, error]);
  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => handleClick(e)}
        key={productId}
      >
        <span className="product-font">Add Cart</span>
      </Button>
      <AlertToast />
    </>
  );
};

export default AddCart;
