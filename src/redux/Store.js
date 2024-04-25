import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./Slice"; // Replace with the actual path to your slice

const store = configureStore({
  reducer: {
    details: detailsReducer,
  },
});

export default store;