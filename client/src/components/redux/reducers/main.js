import {getProductsreducer} from "./Productsreducers";
import {combinerReducers} from "redux";

const rootreducers = combinerReducers({
    getProductsdata : getProductsreducer
});

export default rootreducers;