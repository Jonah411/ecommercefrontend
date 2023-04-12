import React from "react";
import Multiselect from "multiselect-react-dropdown";

const MultiselectProducts = ({ products, handleChange, selectProducts }) => {
  const onSelect = (selectedList, selectedItem) => {
    const datalist = [];
    selectedList?.map((data) => datalist.push(data?._id));

    const e = {
      target: { name: "product", value: datalist },
    };
    handleChange(e);
  };
  const onRemove = (selectedList, selectedItem) => {};
  return (
    <div>
      <Multiselect
        options={products} // Options to display in the dropdown
        selectedValues={selectProducts} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
    </div>
  );
};

export default MultiselectProducts;
