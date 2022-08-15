import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList(){
    try {
     const responseList:ListResponse<City> = yield call(cityApi.getAll)
     yield put(cityActions.fetchCityDataSuccess(responseList))
    } catch (error) {
        yield put(cityActions.fetchCityDataFailed())
    }
}

export default function* citySaga(){
    yield takeLatest(cityActions.fetchCityData.type, fetchCityList)
}