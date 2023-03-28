import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import JoditEditor from "jodit-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "auto",
};
const AddProductDetails = ({
  handleChange,
  formError,
  formValues,
  listCategories,
  brands,
  handleSave,
}) => {
  const editor = useRef(null);
  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Products
        </Typography>
        <Box>
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
            {formError?.name}
          </Typography>
          {/* <TextField
      fullWidth
      id="standard-basic"
      label="Description"
      variant="standard"
      name="description"
      multiline
      rows={4}
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
      {formError.description}
    </Typography> */}
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
            label="Image"
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
            label="Rating"
            variant="standard"
            name="rating_star"
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
        </Box>

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
          {/* <Button variant="contained" onClick={handleClose} color="error">
            close
          </Button> */}
        </Stack>
      </Box>
    </div>
  );
};

export default AddProductDetails;
