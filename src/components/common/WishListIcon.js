import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useAddWishListMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import CompareListIcon from "./CompareListIcon";
import AlertToast from "./AlertToast";
import { useLocation } from "react-router-dom";

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  //   backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const WishListIcon = ({ image, productId, wishListData, routeList }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const extractedPath = pathname.split("/")[1];
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: extractedPath === "product_details" ? 550 : 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));
  const [images, setImages] = useState();
  const user = useSelector(getLoginDetails);
  const [
    addWishList,
    {
      data: wishListDatas,
      isSuccess: wishlistSuccess,
      isError: wishlistIsError,
      error: wishlistError,
    },
  ] = useAddWishListMutation();

  const [wishList, setWishList] = useState(wishListData);
  useEffect(() => {
    if (wishListData) {
      setWishList(wishListData);
    }
  }, [wishListData]);
  useEffect(() => {
    setImages(image);
  }, [image]);
  const [iconWishList, setIconWishList] = useState();
  useEffect(() => {
    if (wishListDatas) {
      setIconWishList(wishListDatas?.wishlist);
    }
  }, [wishListDatas]);
  useEffect(() => {
    if (wishlistSuccess) {
      toast.success(wishListData?.msg, {
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
      }, 501);
    }
    if (wishlistIsError) {
      toast.error(wishlistError?.data?.msg, {
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
  }, [wishListData, wishlistSuccess, wishlistIsError, wishlistError]);
  return (
    <>
      <ImageButton
        focusRipple
        style={{
          width: "100%",
        }}
        className="image-gallery-design"
        // onClick={(e) => {
        //   e.preventDefault();
        //   navigate(`/brand/${data?.brand?._id}`);
        // }}
      >
        <div class="image-container">
          <div class="image-zoom">
            <ImageSrc
              className="image-src"
              style={{
                backgroundImage: `url(${BASE_URL}categories/product_image/image/${images})`,
              }}
            />
          </div>
        </div>
        {/* <div className="image-container"></div> */}
        <ImageBackdrop className="MuiImageBackdrop-root" />
        {user && (
          <>
            <Image>
              <Stack spacing={2}>
                {iconWishList ? (
                  iconWishList?.find(
                    (icon) => icon.product._id === productId
                  ) ? (
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        let patch = {
                          user: user.id,
                          product: productId,
                          wishList: 0,
                        };
                        addWishList(patch);
                      }}
                    >
                      <MdFavorite />
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        let patch = {
                          user: user.id,
                          product: productId,
                          wishList: 1,
                        };
                        addWishList(patch);
                      }}
                    >
                      <GrFavorite />
                    </button>
                  )
                ) : wishList?.find(
                    (icon) =>
                      icon?.product?._id === productId && icon?.wishlist === 1
                  ) ? (
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      let patch = {
                        user: user.id,
                        product: productId,
                        wishList: 0,
                      };
                      addWishList(patch);
                    }}
                  >
                    <MdFavorite />
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      let patch = {
                        user: user.id,
                        product: productId,
                        wishList: 1,
                      };
                      addWishList(patch);
                    }}
                  >
                    <GrFavorite />
                  </button>
                )}
                {/* <Button variant="outlined">
           <GrFavorite />
         </Button> */}
              </Stack>

              <ImageMarked className="MuiImageMarked-root" />
            </Image>
            <CompareListIcon productId={productId} />
          </>
        )}
      </ImageButton>
      <AlertToast />
    </>
  );
};

export default WishListIcon;
