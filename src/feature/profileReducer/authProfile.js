import { baseLoginApi } from "../loginReducer/authApi";

export const authCouponApi = baseLoginApi.injectEndpoints({
  endpoints: (builder) => ({
    authRegister: builder.mutation({
      query: (patch) => ({
        url: `/api/users/register`,
        method: "POST",
        body: patch,
      }),
    }),
    addCategories: builder.mutation({
      query: (patch) => ({
        url: `/api/categories/add`,
        method: "POST",
        body: patch,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/product/create",
        method: "POST",
        body: data,
      }),
    }),
    getMenus: builder.query({
      query: (user) => ({
        url: `api/dashboard/menu/${user}`,
      }),
    }),
    addMenu: builder.mutation({
      query: (patch) => ({
        url: `/api/dashboard/menu`,
        method: "POST",
        body: patch,
      }),
    }),
    deleteMenu: builder.mutation({
      query: (patch) => ({
        url: `/api/dashboard/menu/delete`,
        method: "POST",
        body: patch,
      }),
    }),
    getParentCategories: builder.query({
      query: () => ({
        url: "/api/categories/parent",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/categories",
      }),
    }),
    getCategorie: builder.query({
      query: (id) => ({
        url: `/api/categories/${id}`,
      }),
    }),
    getProducts: builder.query({
      query: (data) => ({
        url: `/api/product/${data.id}/${data.type}/${data && data.user}`,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `/api/product/`,
      }),
    }),
    getAllBrands: builder.query({
      query: () => ({
        url: `/api/brand/`,
      }),
    }),
    addBrand: builder.mutation({
      query: (patch) => ({
        url: "/api/brand/add",
        method: "POST",
        body: patch,
      }),
    }),
    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/api/brand/${id}`,
      }),
    }),
    getAllBanner: builder.query({
      query: (id) => ({
        url: `api/brand/allbanner`,
      }),
    }),
    updateBanner: builder.mutation({
      query: (patch) => ({
        url: `/api/brand/update/${patch.id}`,
        method: "PUT",
        body: { ...patch.data },
      }),
    }),
    getActiveBanner: builder.query({
      query: (id) => ({
        url: `/api/brand/activebanner`,
      }),
    }),
    addWishList: builder.mutation({
      query: (patch) => ({
        url: `/api/wishlist/add`,
        method: "POST",
        body: patch,
      }),
    }),
    getWishList: builder.query({
      query: (user) => ({
        url: `/api/wishlist/product/${user}`,
      }),
    }),
    getSingleWishList: builder.query({
      query: (list) => ({
        url: `/api/wishlist/${list.user_id}/${list.product_id}`,
      }),
    }),
    getAllCart: builder.query({
      query: (id) => ({
        url: `/api/cart/getcart/${id}`,
      }),
    }),
    addCartList: builder.mutation({
      query: (patch) => ({
        url: `/api/cart/addcart`,
        method: "POST",
        body: patch,
      }),
    }),
    getCart: builder.query({
      query: (id) => ({
        url: `/api/cart/${id}`,
      }),
    }),
    deleteCart: builder.mutation({
      query: (patch) => ({
        url: `/api/cart/singledelete`,
        method: "POST",
        body: patch,
      }),
    }),
    updateCart: builder.mutation({
      query: (patch) => ({
        url: `/api/cart/${patch.userId}`,
        method: "PUT",
        body: patch,
      }),
    }),
    addOrder: builder.mutation({
      query: (patch) => ({
        url: `/api/order/addorder`,
        method: "POST",
        body: patch,
      }),
    }),
    getOrder: builder.query({
      query: (order) => ({
        url: `/api/order/getorder/${order?.user}/${order?.type}`,
      }),
    }),
    getAddress: builder.query({
      query: (id) => ({
        url: `api/address/${id}`,
      }),
    }),
    addAddress: builder.mutation({
      query: (patch) => ({
        url: `api/address/${patch.id}`,
        method: "POST",
        body: patch,
      }),
    }),
    updateAddress: builder.mutation({
      query: (patch) => ({
        url: `api/address/${patch.id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    getAllUsers: builder.query({
      query: (id) => ({
        url: `/api/users/allusers`,
      }),
    }),
    removeUser: builder.mutation({
      query: (patch) => ({
        url: `api/users/${patch.user}`,
        method: "Post",
        body: patch,
      }),
    }),
    changeRoll: builder.mutation({
      query: (patch) => ({
        url: `/api/users/changeroll`,
        method: "Post",
        body: patch,
      }),
    }),
    getAllRolls: builder.query({
      query: (id) => ({
        url: `/api/dashboard/roll`,
      }),
    }),
    getRollsMenus: builder.query({
      query: (id) => ({
        url: `/api/dashboard/menu/roll/${id}`,
      }),
    }),
    applycoupon: builder.mutation({
      query: (patch) => ({
        url: `/api/coupon`,
        method: "POST",
        body: patch,
      }),
    }),
    createRatingReviews: builder.mutation({
      query: (patch) => ({
        url: `/api/rates/product`,
        method: "Post",
        body: patch,
      }),
    }),
    getCompareList: builder.query({
      query: (id) => ({
        url: `/api/compare/${id}`,
      }),
    }),
    addCompareList: builder.mutation({
      query: (patch) => ({
        url: `/api/compare/${patch?.user}`,
        method: "Post",
        body: patch,
      }),
    }),
    removeCompareList: builder.mutation({
      query: (patch) => ({
        url: `/api/compare/${patch?.user}`,
        method: "Delete",
        body: patch,
      }),
    }),
    getRecentViewProducts: builder.query({
      query: (data) => ({
        url: `/api/latestview/${data}`,
      }),
    }),
    getRelatedProducts: builder.query({
      query: (data) => ({
        url: `/api/relatedproduct/${data}`,
      }),
    }),
    getProductTypes: builder.query({
      query: () => ({
        url: `/api/productdetails/product_types`,
      }),
    }),
    createProductDetails: builder.mutation({
      query: (patch) => ({
        url: `/api/productdetails/create_product`,
        method: "Post",
        body: patch,
      }),
    }),
    getAllProductDetails: builder.query({
      query: () => ({
        url: `/api/productdetails/product`,
      }),
    }),
    updateProductDetails: builder.mutation({
      query: (patch) => ({
        url: `/api/productdetails/update_product`,
        method: "Put",
        body: patch,
      }),
    }),
    dropProductDetails: builder.mutation({
      query: (patch) => ({
        url: `/api/productdetails/drop_product/${patch}`,
        method: "Delete",
      }),
    }),
    getAttributes: builder.query({
      query: (ids) => ({
        url: `api/attribute/${ids.join(",")}`,
      }),
    }),
    createAttributes: builder.mutation({
      query: (patch) => ({
        url: `/api/attribute/${patch.simpleId}`,
        method: "Post",
        body: patch.data,
      }),
    }),
    deleteAttributes: builder.mutation({
      query: (patch) => ({
        url: `/api/attribute/${patch}`,
        method: "Delete",
        body: patch,
      }),
    }),
    createVariants: builder.mutation({
      query: (patch) => ({
        url: `/api/productdetails/create_variable`,
        method: "Post",
        body: patch,
      }),
    }),
    getVariantsDetails: builder.query({
      query: (ids) => ({
        url: `api/productdetails/get_variable/${ids}`,
      }),
    }),
    getVariantsProduct: builder.query({
      query: (ids) => ({
        url: `api/productdetails/get_variants/${ids.join(",")}`,
      }),
    }),
    updateProductVariants: builder.mutation({
      query: (patch) => ({
        url: `/api/productdetails/update_product/${patch.id}`,
        method: "Post",
        body: patch,
      }),
    }),
  }),
});

export const {
  useAuthRegisterMutation,
  useAddCategoriesMutation,
  useCreateProductMutation,
  useGetMenusQuery,
  useGetParentCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategorieQuery,
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useGetSingleBrandQuery,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useGetActiveBannerQuery,
  useAddWishListMutation,
  useGetWishListQuery,
  useGetSingleWishListQuery,
  useGetAllCartQuery,
  useAddCartListMutation,
  useGetCartQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useAddOrderMutation,
  useGetOrderQuery,
  useGetAddressQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useGetAllUsersQuery,
  useChangeRollMutation,
  useGetAllRollsQuery,
  useGetRollsMenusQuery,
  useAddMenuMutation,
  useDeleteMenuMutation,
  useRemoveUserMutation,
  useApplycouponMutation,
  useCreateRatingReviewsMutation,
  useGetCompareListQuery,
  useAddCompareListMutation,
  useRemoveCompareListMutation,
  useGetRecentViewProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductTypesQuery,
  useCreateProductDetailsMutation,
  useGetAllProductDetailsQuery,
  useUpdateProductDetailsMutation,
  useDropProductDetailsMutation,
  useGetAttributesQuery,
  useCreateAttributesMutation,
  useDeleteAttributesMutation,
  useCreateVariantsMutation,
  useGetVariantsDetailsQuery,
  useGetVariantsProductQuery,
  useUpdateProductVariantsMutation,
} = authCouponApi;
