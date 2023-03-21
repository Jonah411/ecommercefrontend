import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../feature/profileReducer/authProfile";

function Nav() {
  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  // console.log(hoveredCategory);
  return (
    <ul className="nav-menu">
      {categoriesData?.categories?.map((data, index) => {
        return data.map((list, index) => {
          if (list?.sub_categories) {
            return null;
          } else {
            return (
              <li className="ca-list" key={list?._id}>
                <Link
                  to="#"
                  className="nav-link text-light  link-text"
                  key={list._id}
                  onMouseEnter={() =>
                    setHoveredCategory(list.parent_categories)
                  }
                >
                  {list?.name}
                </Link>
                <div className="ca-content">
                  {categoriesData?.categories?.map((data, index) => {
                    return data.map((datalist, index) => {
                      if (
                        datalist?.parent_categories === hoveredCategory &&
                        datalist?.sub_categories
                      ) {
                        return (
                          <p
                            className="p-2"
                            key={datalist?._id}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/category/${datalist._id}`);
                            }}
                          >
                            <Link className="nav-link">
                              {datalist?.name ? datalist?.name : "No SubItems"}
                            </Link>
                          </p>
                        );
                      } else {
                        return null;
                      }
                    });
                  })}
                </div>
              </li>
            );
          }

          //   if (list?.sub_categories) {
          //     return null;
          //   } else {
          //     return (

          //     );
          //   }
        });
      })}
    </ul>
  );
}

export default Nav;
