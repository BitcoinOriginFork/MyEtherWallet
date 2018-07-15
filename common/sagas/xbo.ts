import { setContractData } from 'actions/xbo';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { getXboContractDetails } from '../api/xbo';

export function* requestXboContractDetails(): SagaIterator {
  const data = yield call(getXboContractDetails);
  yield put(setContractData(data));
}

export default function* xboSaga(): SagaIterator {
  yield takeEvery('GET_XBO_CONTRACT_DATA', requestXboContractDetails);
}
