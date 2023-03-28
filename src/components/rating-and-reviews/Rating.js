import React, { useEffect, useState } from "react";

const Rating = ({ itemslist }) => {
  const [items, setItems] = useState(itemslist?.rating_radio);
  const [itemsListView, setItemsListView] = useState(itemslist?.rating);
  useEffect(() => {
    setItems(itemslist?.rating_radio);
    setItemsListView(itemslist?.rating);
  }, [itemslist]);
  return (
    <div className="container">
      <div className="rating-value">
        <p className="rating-value-text m-0">{items?.toFixed(1)}</p>
        <p className="text-muted">
          {itemsListView?.length}(Rating And Reviews)
        </p>
      </div>
    </div>
  );
};

export default Rating;
