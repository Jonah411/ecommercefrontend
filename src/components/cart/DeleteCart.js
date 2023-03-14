import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useDeleteCartMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const DeleteCart = ({ cartData }) => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const [deleteCart, { data, isSuccess }] = useDeleteCartMutation();
  const deleteCartList = (cartData) => {
    let deleteId = {
      productid: cartData,
      userid: user?.id,
    };
    deleteCart(deleteId);
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
        }, 300);
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
  }, [isSuccess, data, navigate]);
  return (
    <button className="btn btn-danger" onClick={() => deleteCartList(cartData)}>
      <AiFillDelete />
    </button>
  );
};

export default DeleteCart;
