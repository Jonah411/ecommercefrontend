export const AtoZFilter = (value) => {
  const sortedItems = [...value].sort((a, b) => a.name.localeCompare(b.name));
  return sortedItems;
};

export const ZtoAFilter = (value) => {
  const sortedItems = [...value].sort((a, b) => b.name.localeCompare(a.name));
  return sortedItems;
};

export const LtoHPriceFilter = (value) => {
  const sortedItems = [...value].sort((a, b) => a.price - b.price);
  return sortedItems;
};
export const HtoLPriceFilter = (value) => {
  const sortedItems = [...value].sort((a, b) => b.price - a.price);
  return sortedItems;
};
export const LtoHRatingFilter = (value) => {
  const sortedItems = [...value].sort(
    (a, b) => a?.rating_star?.rating_radio - b?.rating_star?.rating_radio
  );
  return sortedItems;
};
export const HtoLRatingFilter = (value) => {
  const sortedItems = [...value].sort(
    (a, b) => b?.rating_star?.rating_radio - a?.rating_star?.rating_radio
  );
  return sortedItems;
};
export const LatestProductFilter = (value) => {
  const sortedItems = [...value].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sortedItems;
};
export const PriceRangeFilter = (value, priceRange) => {
  const sortedItems =
    value &&
    value?.filter((product) => {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    });
  return sortedItems;
};
export const RatingRangeFilter = (value, priceRange) => {
  const sortedItems =
    value &&
    value?.filter((product) => {
      return product.rating_star?.rating_radio === parseInt(priceRange);
    });
  return sortedItems;
};
export const BrandFilter = (value, brand) => {
  const sortedItems =
    value &&
    value?.filter((product) => {
      return product.brand?.name === brand?.name;
    });
  return sortedItems;
};
export const BrandsFilter = (value, brand) => {
  const sortedItems =
    value &&
    value?.filter((product) => {
      return product.brand?.name === brand;
    });
  return sortedItems;
};
export const CategorieFilter = (value, categorie) => {
  const sortedItems =
    value &&
    value?.filter((product) => {
      return product.categorie?.name === categorie?.name;
    });
  return sortedItems;
};

export const categoriesFilter = (value, products) => {
  const sortedItems = products?.filter((product) => {
    return product?.categorie?.name === value;
  });
  return sortedItems;
};
