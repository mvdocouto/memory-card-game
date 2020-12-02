import { takeEvery, put, all } from "redux-saga/effects";

function* asyncAddAttempts() {
  yield put({ type: "ADD_ATTEMPTS" });
}

function* asyncAddPoints() {
  yield put({ type: "ADD_POINTS" });
}

export default function* rootSaga() {
  yield all([
    takeEvery("ASYNC_ADD_ATTEMPTS", asyncAddAttempts),
    takeEvery("ASYNC_ADD_POINTS", asyncAddPoints),
  ]);
}
