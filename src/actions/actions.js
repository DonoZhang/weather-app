import { types } from './types';

export const actions = {
    requestApiData : () => ({ type: types.GET_API_DATA }),
    receiveApiData : data => ({ type: types.API_DATA_RECEIVED, payload: data }),
    getErrorMessage : e => ({ type: types.REQUEST_ERROR, error: e }),
    fireSaga: () => ({type: types.FIRE_SAGA}),
    setCity: city => ({type: types.SET_CITY, city})
}