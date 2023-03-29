import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductList from "../products/ProductList";

const ProductPagination = ({
  itemsPerPage,
  itemslist,
  wishListData,
  listView,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // const sortedRatings = itemslist
    //   ? [...itemslist.rating].sort(
    //       (a, b) => new Date(b.date) - new Date(a.date)
    //     )
    //   : [];
    setItems(itemslist);
  }, [itemslist]);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = items?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <Items
        currentItems={currentItems}
        wishListData={wishListData}
        listView={listView}
      />
      <ReactPaginate
        // nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        // previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-end"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ProductPagination;

const Items = ({ currentItems, wishListData, listView }) => {
  return (
    <>
      {currentItems && (
        <div className="p-3 reviews_list">
          <ProductList
            productData={currentItems}
            title="All"
            wishListData={wishListData}
            listView={listView}
          />
        </div>
      )}
    </>
  );
};
