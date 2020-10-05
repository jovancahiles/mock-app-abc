import { createSlice } from "@reduxjs/toolkit";
import cryptoId from "crypto-random-string";

const headers = [
  { label: "Name", name: "name" },
  { label: "Age", name: "age" },
  { label: "Nationality", name: "nationality" },
  { label: "Gender", name: "gender" },
  { label: "Actions", name: "actions" },
];

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    rows: [],
    headers: [...headers],
  },
  reducers: {
    addRow: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.rows.push({ ...action.payload, id: cryptoId({ length: 10 }) });
    },
    addRowAsync: () => {
      console.log("added row asynchronously");
    },
    deleteRow: (state, action) => {
      const index = state.rows.findIndex((row) => row.id === action.payload);
      state.rows.splice(index, 1);
    },
    deleteRowAsync: () => {
      console.log("deleted row asynchronously");
    },
    updateRow: (state, action) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      state.rows[index] = { ...state.rows[index], ...action.payload };
    },
    updateRowAsync: () => {
      console.log("updated row asynchronously");
    },
  },
});

export const {
  addRowAsync,
  deleteRowAsync,
  updateRowAsync,
} = dataSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRows = (state) => state.data.rows;
export const selectHeaders = (state) => state.data.headers;

export default dataSlice.reducer;
