import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import counterReducer from "../features/counter/counterSlice";
import dataReducer from "../features/data/dataSlice";
import dataSaga from "../features/data/dataSaga";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(dataSaga);
