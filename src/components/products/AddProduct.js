import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import {
  useCreateProductMutation,
  useGetAllBrandsQuery,
  useGetCategoriesQuery,
} from "../../feature/profileReducer/authProfile";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [createProduct, { data, error, isSuccess, isError }] =
    useCreateProductMutation();
  const { data: parentData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  const navigate = useNavigate();
  useEffect(() => {
    if (parentData) {
      setParentCategories(parentData?.data);
    }
  }, [parentData]);
  const [parentCategories, setParentCategories] = useState([]);

  const init = {
    name: "",
    description: "",
    product_strength: "",
    price: "",
    pack_size: "",
    categories: "",
    brand: "",
  };
  const [formValues, setFormValues] = useState(init);
  const [productImage, setProductImage] = useState();
  const [productGallery, setProductGallery] = useState();
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && name === "product_image") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductImage({ ...productImage, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
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
      }
    } else if (e.target.type === "file" && name === "product_gallery") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductGallery({ ...productGallery, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
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
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const editor = useRef(null);

  const handleSave = () => {
    setIsSubmit(true);
    setFormError(validation(formValues));
    //handleClose();
  };
  const validation = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "Name Field is Required";
    }
    if (!value.description) {
      error.description = "Description Field is Required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValues));
      formData.append(
        "product_image",
        productImage?.product_image && productImage?.product_image[0]
      );
      if (productGallery) {
        Array.from(
          productGallery?.product_gallery && productGallery?.product_gallery
        ).forEach((item) => {
          formData.append("product_gallery", item);
        });
      }

      createProduct(formData);
    }
  }, [
    formError,
    formValues,
    isSubmit,
    productImage,
    productGallery,
    createProduct,
  ]);
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
        setIsSubmit(false);
        navigate("/profile/product");
      }, 2001);
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
  const listCategories = [];
  parentCategories.forEach((data) => {
    if (data.sub_categories) {
      listCategories.push(data);
    }
  });
  return (
    <div className="form-product ">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Products
      </Typography>

      <TextField
        fullWidth
        id="standard-basic"
        label="Product Name"
        variant="standard"
        name="name"
        type="text"
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <Typography
        variant="p"
        noWrap
        component="div"
        justifyContent="center"
        sx={{ flexGrow: 1, mb: 1.5 }}
      >
        {formError.name}
      </Typography>

      <JoditEditor
        ref={editor}
        // value={content}
        //config={config}
        tabIndex={1} // tabIndex of textarea
        //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => {
          let data = {
            target: {
              name: "description",
              value: e,
            },
          };
          handleChange(data);
        }}
      />
      <Typography
        variant="p"
        noWrap
        component="div"
        justifyContent="center"
        sx={{ flexGrow: 1, mb: 1.5 }}
      >
        {formError?.description}
      </Typography>
      <TextField
        fullWidth
        id="standard-basic"
        label="Product Strength"
        variant="standard"
        name="product_strength"
        type="text"
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Strength"
        variant="standard"
        name="product_image"
        type="file"
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Image"
        variant="standard"
        name="product_gallery"
        type="file"
        inputProps={{
          multiple: true,
        }}
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Price"
        variant="standard"
        name="price"
        type="number"
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Pack Size"
        variant="standard"
        name="pack_size"
        type="number"
        sx={{ flexGrow: 1, mb: 1.5 }}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Categories"
          variant="standard"
          name="categories"
          onChange={handleChange}
          defaultValue={formValues?.categories}
        >
          <MenuItem value={1}>Parent</MenuItem>
          {listCategories?.map((data) => {
            return (
              <MenuItem value={data._id} key={data._id}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Brand"
          variant="standard"
          name="brand"
          onChange={handleChange}
          defaultValue={formValues?.brand}
        >
          {brands?.map((data) => {
            return (
              <MenuItem value={data._id} key={data._id}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Stack
        spacing={2}
        direction="row"
        mt={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Stack>

      <AlertToast />
    </div>
  );
};

export default AddProduct;
