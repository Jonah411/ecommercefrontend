import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { BiGitCompare } from "react-icons/bi";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useAddCompareListMutation } from "../../feature/profileReducer/authProfile";
import AlertToast from "./AlertToast";

const ImageLeft = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  color: theme.palette.common.white,
}));
const CompareListIcon = ({ productId }) => {
  const user = useSelector(getLoginDetails);
  const [addCompareList, { data: compareListData, isSuccess, isError, error }] =
    useAddCompareListMutation();
  const [popIsError, setPopIsError] = useState(false);

  const [popIsSuccess, setPopIsSuccess] = useState(false);
  useEffect(() => {
    if (isError) {
      setPopIsError(true);
      setTimeout(() => {
        setPopIsError(false);
      }, 4000);
    }
    if (isSuccess) {
      setPopIsSuccess(true);
      setTimeout(() => {
        setPopIsSuccess(false);
      }, 4000);
    }
    // return () => {
    //   clearTimeout(alertTimeout);
    //   setPopIsError(false);
    // };
  }, [isSuccess, isError, error, compareListData]);
  return (
    <>
      <ImageLeft>
        <Stack spacing={2}>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              let patch = {
                user: user.id,
                productId: productId,
              };
              addCompareList(patch);
            }}
          >
            <BiGitCompare />
          </button>
        </Stack>
        <AlertToast />
      </ImageLeft>
      {popIsSuccess && (
        <div className="alert-ecommerce alert-ecommerce-success popupalert show">
          {compareListData?.msg}
        </div>
      )}
      {popIsError && (
        <div className="aalert-ecommerce alert-ecommerce-danger popupalert show">
          {error?.data?.msg}
        </div>
      )}
    </>
  );
};

export default CompareListIcon;
