import { combineReducers } from "redux";
import { baseLoginApi } from "./loginReducer/authApi";
import { ecommerceLoginApi } from "./loginReducer/authLogin";
import ecommerceadmin from "../feature/loginReducer/loginReducer";

const rootReducer = combineReducers({
  ecommerceadmin: ecommerceadmin,
  [baseLoginApi.reducerPath]: baseLoginApi.reducer,
  [ecommerceLoginApi.reducerPath]: ecommerceLoginApi.reducer,
});

export default rootReducer;
