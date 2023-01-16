import { combineReducers } from "redux";
import auth from "../features/auth/AuthSlice";
import category from "../features/category/CategorySlice";
import post from "../features/post/PostSlice";
import adminpost from "features/adminPost/AdminPostSlice";
import i18n from "features/i18n/i18nSlice";
import patient from "features/patient/PatientSlice";

const reducers = combineReducers({
  auth,
  category,
  post,
  patient,
  adminpost,
  i18n
});

export default reducers;
