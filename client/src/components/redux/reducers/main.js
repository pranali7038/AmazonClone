import {getProductsreducer} from "./Productsreducers";
import { combineReducers } from "redux";

const rootreducers = combineReducers({
    getProductsdata : getProductsreducer
});

export default rootreducers;