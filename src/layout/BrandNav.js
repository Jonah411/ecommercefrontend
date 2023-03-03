import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { BASE_URL } from "../constants/ConstaltsVariables";
import { useNavigate } from "react-router-dom";
import { useGetAllBrandsQuery } from "../feature/profileReducer/authProfile";

export default function BrandNav() {
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="fw-bold"
          >
            Brand List Items
          </ListSubheader>
        }
      >
        {brands.map((list, index) => {
          return (
            <ListItemButton
              onClick={(e) => {
                e.preventDefault();
                navigate(`/brand/${list._id}`);
              }}
              key={list._id}
            >
              <ListItemIcon>
                <img
                  src={`${BASE_URL}categories/brand_image/${list?.brand_image}`}
                  className="img-thumbnail"
                  width={40}
                  alt={`Thumbnail for ${list?.name} brand`}
                />
              </ListItemIcon>
              <ListItemText primary={`${list.name}`} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)} variant="contained">
          Brand
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
