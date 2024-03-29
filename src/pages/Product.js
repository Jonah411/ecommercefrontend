import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useGetAllProductsQuery } from "../feature/profileReducer/authProfile";
import { BASE_URL } from "../constants/ConstaltsVariables";

const Product = () => {
  const { data: productsData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productsData) {
      setProducts(productsData?.data);
    }
  }, [productsData]);
  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    //   wrap: true,
    //   maxWidth: "200px",
    // },
    {
      name: "Image",
      selector: (row) => {
        return (
          <img
            src={`${BASE_URL}categories/product_image/image/${row.product_image}`}
            width="100%"
            alt={`Thumbnail for ${row.product_image} product`}
          />
        );
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      wrap: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("brand");
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/profile/update-product/${row._id}`);
            }}
          >
            <FiEdit2 />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="form-product ">
      <DataTable
        className="data-table-store"
        title={<p>Products List</p>}
        columns={columns}
        data={products}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search Products"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile/add-product");
              }}
            >
              Add
            </button>
          </Stack>
        }
      />
    </div>
  );
};

export default Product;
