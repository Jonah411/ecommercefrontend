import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProductPagination from "../components/design/ProductPagination";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import {
  AtoZFilter,
  BrandFilter,
  CategorieFilter,
  HtoLPriceFilter,
  HtoLRatingFilter,
  LatestProductFilter,
  LtoHPriceFilter,
  LtoHRatingFilter,
  PriceRangeFilter,
  RatingRangeFilter,
  ZtoAFilter,
} from "../components/filter/Alphabetically";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import {
  useGetAllBrandsQuery,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetWishListQuery,
} from "../feature/profileReducer/authProfile";
import { BsGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      onClick={decoratedOnClick}
      className="btn btn-link text-decoration-none"
    >
      {children}
    </button>
  );
}

const HomeDashboard = () => {
  const user = useSelector(getLoginDetails);
  const { data: productData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: wishListDatas } = useGetWishListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data);
      setFilterList(productData?.data);
    }
  }, [productData]);
  const init = {
    sortList: "",
    priceRangeList: [0, 250],
    ratingRangeList: "",
  };
  const [filter, setFilter] = useState(init);
  const prevRatingRangeListRef = useRef(filter?.ratingRangeList);
  const prevPriceRangeListRef = useRef(filter?.priceRangeList);
  const filterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  useEffect(() => {
    if (filter?.sortList === "1") {
      const filterList = AtoZFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "2") {
      const filterList = ZtoAFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "3") {
      const filterList = LtoHPriceFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "4") {
      const filterList = HtoLPriceFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "5") {
      const filterList = LtoHRatingFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "6") {
      const filterList = HtoLRatingFilter(products && products);
      setFilterList(filterList);
    }
    if (filter?.sortList === "7") {
      const filterList = LatestProductFilter(products && products);
      setFilterList(filterList);
    }
    if (
      filter?.priceRangeList &&
      prevPriceRangeListRef.current !== filter.priceRangeList
    ) {
      const filterList = PriceRangeFilter(
        products && products,
        filter?.priceRangeList
      );
      setFilterList(filterList);
    }
    if (
      filter?.ratingRangeList &&
      products.length > 0 &&
      prevRatingRangeListRef.current !== filter.ratingRangeList
    ) {
      const filterList = RatingRangeFilter(
        products && products,
        filter?.ratingRangeList
      );
      setFilterList(filterList);
    }
    prevRatingRangeListRef.current = filter.ratingRangeList;
    prevPriceRangeListRef.current = filter.priceRangeList;
  }, [filter, products]);

  const [wishList, setWishList] = useState(wishListDatas?.data);
  useEffect(() => {
    if (wishListDatas) {
      setWishList(wishListDatas?.data);
    }
  }, [wishListDatas]);
  const [listView, setListView] = useState(false);

  const valuetext = (value) => {
    return `${value}`;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4 col-lg-3">
          <div className="home-product">
            <div className="price-range bg-secondary p-2">
              <p className="text-light">Price Range</p>
              <div className="container">
                <Slider
                  min={0}
                  max={250}
                  step={20}
                  marks
                  value={filter?.priceRangeList}
                  onChange={filterChange}
                  getAriaValueText={valuetext}
                  name="priceRangeList"
                  valueLabelDisplay="auto"
                />
              </div>
              <p className="text-light">Rating Range</p>
              <div className="container">
                <Rating
                  name="ratingRangeList"
                  className="text-light"
                  //   value={value}
                  onChange={filterChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <CustomToggle eventKey="0">
                      <div className="heading">
                        <h6 style={{ color: "#484c51" }} className="m-0">
                          Categories
                        </h6>
                      </div>
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div>
                        {categoriesData?.categories?.map((data, index) => {
                          return data.map((datalist, index) => {
                            if (datalist?.sub_categories) {
                              return (
                                <div className="form-check" key={index}>
                                  <input
                                    type="radio"
                                    name="categories"
                                    className="form-check-input"
                                    id={`categories-${index}`}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        setFilterList(
                                          CategorieFilter(products, datalist)
                                        );
                                      } else {
                                        // remove the filter from the list
                                        setFilterList((prevList) =>
                                          prevList.filter(
                                            (filter) => filter !== datalist.name
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`categories-${index}`}
                                  >
                                    {datalist?.name}
                                  </label>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          });
                        })}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="mt-2">
                  <Card.Header>
                    <CustomToggle eventKey="1">
                      <div className="heading">
                        <h6 style={{ color: "#484c51" }} className="m-0">
                          Brand
                        </h6>
                      </div>
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <div>
                        {brands?.map((data, index) => {
                          return (
                            <div className="form-check" key={index}>
                              <input
                                type="radio"
                                name="brand"
                                className="form-check-input"
                                id={`brand-${index}`}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setFilterList(BrandFilter(products, data));
                                  } else {
                                    // remove the filter from the list
                                    setFilterList((prevList) =>
                                      prevList.filter(
                                        (filter) => filter !== data.name
                                      )
                                    );
                                  }
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`brand-${index}`}
                              >
                                {data?.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-9">
          <div className="home-product">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setListView(false)}
                >
                  <BsGridFill />
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setListView(true)}
                >
                  <FaListAlt />
                </button>
              </div>
              <div className="">
                <select
                  className="form-select"
                  onChange={filterChange}
                  name="sortList"
                >
                  <option selected>Open this select menu</option>
                  <option value={1}>A to Z Product Name</option>
                  <option value={2}>Z to A Product Name</option>
                  <option value={3}>Lowest to Highest Price</option>
                  <option value={4}>Highest to Lowest Price</option>
                  <option value={5}>Lowest to Highest Rating</option>
                  <option value={6}>Highest to Lowest Rating</option>
                  <option value={7}>Latest Product</option>
                </select>
              </div>
            </div>
          </div>
          <div className=" mt-3 mb-3">
            <ProductPagination
              itemsPerPage={8}
              itemslist={filterList}
              wishListData={wishList}
              listView={listView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
