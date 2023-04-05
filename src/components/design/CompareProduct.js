import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useGetCompareListQuery } from "../../feature/profileReducer/authProfile";

const CompareProduct = () => {
  const user = useSelector(getLoginDetails);
  const { data: compareData } = useGetCompareListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [compareList, setCompareList] = useState({});
  useEffect(() => {
    setCompareList(compareData?.data);
  }, [compareData]);
  return (
    <>
      {compareList?.products?.length > 0 && (
        <div className="bottom-right-sticky">
          <Link className="m-0 text-light" to="/compare-products">
            Compare - {compareList?.products?.length}
          </Link>
        </div>
      )}
    </>
  );
};

export default CompareProduct;
