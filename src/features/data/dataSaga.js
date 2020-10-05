import { put, takeEvery } from "redux-saga/effects";

// server mocking
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* addRow(action) {
  yield put({ type: "data/addRow", payload: action.payload });
}
function* deleteRow(action) {
  yield put({ type: "data/deleteRow", payload: action.payload });
}
function* updateRow(action) {
  yield put({ type: "data/updateRow", payload: action.payload });
}

function* dataSaga() {
  yield delay(1000); // mocking a server
  yield takeEvery("data/addRowAsync", addRow);
  yield takeEvery("data/deleteRowAsync", deleteRow);
  yield takeEvery("data/updateRowAsync", updateRow);
}

export default dataSaga;
