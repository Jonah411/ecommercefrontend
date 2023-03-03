import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useGetAllProductsQuery } from "../../feature/profileReducer/authProfile";
import { useDispatch } from "react-redux";
import { searchProductDetails } from "../../feature/loginReducer/loginReducer";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: productData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    if (productData) {
      setProductsList(productData?.data);
    }
  }, [productData]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const searchTerm = searchQuery.search.toLowerCase();
      const matchingProducts = [];
      const matchingCategories = [];
      const matchingBrands = [];

      productsList.forEach((product) => {
        if (product.name.toLowerCase().includes(searchTerm)) {
          matchingProducts.push(product);
        } else if (
          product.categories &&
          product.categories.name.toLowerCase().includes(searchTerm)
        ) {
          matchingCategories.push(product);
        } else if (
          product.brands &&
          product.brands.name.toLowerCase().includes(searchTerm)
        ) {
          matchingBrands.push(product);
        }
      });

      const productList = [
        ...matchingProducts,
        ...matchingCategories,
        ...matchingBrands,
      ];

      const uniqueArray = [...new Set(productList)];

      dispatch(searchProductDetails(uniqueArray));
      navigate("/search_products");
    }
  }, [searchQuery, dispatch, navigate, productsList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        name="search"
        onChange={handleChange}
      />
    </Search>
  );
};

export default SearchFilter;
