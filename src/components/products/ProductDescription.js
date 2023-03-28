import React, { useEffect, useState } from "react";

const ProductDescription = ({ details }) => {
  const [productDetails, setProductDetails] = useState(details);
  useEffect(() => {
    setProductDetails(details);
  }, [details]);
  return (
    <div className="description-parent">
      <div
        className="description p-4"
        dangerouslySetInnerHTML={{
          __html: `<div style="padding: 20px;">${productDetails?.description}</div>`,
        }}
      />
    </div>
  );
};

export default ProductDescription;
