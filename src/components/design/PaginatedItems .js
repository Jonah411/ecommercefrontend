import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import moment from "moment";

const PaginatedItems = ({ itemsPerPage, itemslist }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const sortedRatings = itemslist
      ? [...itemslist.rating].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      : [];
    setItems(sortedRatings);
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
  console.log(items);
  return (
    <div>
      <Items currentItems={currentItems} />
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

export default PaginatedItems;

const Items = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div className="p-3 reviews_list">
            <div className="d-flex gap-2">
              {(item?.rating_value === 5 || item?.rating_value === 4) && (
                <div className="bg-success p-2">
                  <span> {item?.rating_value}</span> <AiOutlineStar />
                </div>
              )}
              {(item?.rating_value === 3 || item?.rating_value === 2) && (
                <div className="bg-warning p-2">
                  <span> {item?.rating_value}</span> <AiOutlineStar />
                </div>
              )}
              {item?.rating_value === 1 && (
                <div className="bg-danger p-2">
                  <span> {item?.rating_value}</span> <AiOutlineStar />
                </div>
              )}
              <p className=" m-0 p-2 fw-bold">{item?.review_title}</p>
            </div>
            <h5 className="p-2">{item?.review_description}</h5>
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <p className="m-0 text-muted">{item?.review_username}</p>
                <p>{moment(item?.date).fromNow()}</p>
              </div>
              <div className="d-flex gap-3">
                <p className="m-0 text">
                  <FaRegThumbsUp /> 0
                </p>
                <p className="m-0 text">
                  <FaRegThumbsDown /> 0
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
