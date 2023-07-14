import moment from 'moment';
import {push} from 'connected-react-router';
import generateAlertError from '../utils/generate-alert-error';
import {refresh, REFRESH, LOGIN} from '../store/reducer/authorization';
import {REQUEST_PASSWORD_RESET, RESET_PASSWORD, RESET_NEW_PASSWORD} from '../store/reducer/user';
import Errors from '../constants/errors';
import {setAlert} from './reducer/alert';

export function createRemoteCallAction(actionTypes, method, logout, download = false) {
  const action = params => async (dispatch, getState, {api}) => {
    const {fetch: fetchActionType, returnedRequestParams, loading, reload} = actionTypes;
    let authorization = getState().authorization || {};
    const tokenExpired = moment(authorization.expiryDate).diff(new Date()) < 0;

    if (tokenExpired && fetchActionType !== REFRESH && fetchActionType !== LOGIN && fetchActionType !== REQUEST_PASSWORD_RESET && fetchActionType !== RESET_PASSWORD && fetchActionType !== RESET_NEW_PASSWORD) {
      console.log('Fetching Refresh Token')
      await dispatch(refresh({refresh_token: authorization.refresh_token}));
      authorization = getState().authorization;
    }

    if (reload) {
      dispatch({type: reload});
    }

    if (loading) {
      dispatch({type: loading});
    }

    const response = await method(api)(params, authorization.token);
    if (response.ok) {
      const payload = download ? await response.blob() : await response.json();
      dispatch({
        type: fetchActionType,
        payload,
        ...(returnedRequestParams ? {returnedRequestParams} : {}),
      });
      return {payload};
    }

    switch (response.status) {
      case 400: {
        const data = await response.json();

        return {error: Errors.BAD_REQUEST, messages: data};
      }
      case 401:
        if (logout) {
          dispatch(logout());
        }

        return {error: Errors.UNAUTHORIZED};
      case 403:
        return dispatch(push('/403'));
      case 404:
        return {error: Errors.NOT_FOUND};
      case 422: {
        const data = await response.json();

        return {error: Errors.VALIDATION, fields: data.errors};
      }
      case 500: {
      const data = await response.json();
      return {error: Errors.INTERNAL_ERROR, messages: data};
      }
      default:
        return {error: Errors.UNKNOWN};
    }
  };

  return action;
}

export function createReducer(initialState = null, actions = {}) {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
      return actions[action.type](state, action);
    }

    return state;
  };
}

export function normalizeArray(array = [], idName) {
  return array.reduce((result, item) => {
    result[idName ? item[idName] : item.id] = item;
    return result;
  }, {});
}

export const normalizeSelectValue = (id = 0, value = '') => ({id, value, label: value});

export const normalizeSelectValues = (values = [], valueName) => values.map(value => ({
  id: value.id,
  value: valueName ? value[valueName] : value.value,
  label: valueName ? value[valueName] : value.value,
}));

export const normalizeServerFiltersQueryParams = (filterParams = {}) => {
  let normalizedServerFilters = {};
  const keys = Object.keys(filterParams);
  if (keys) {
    normalizedServerFilters = keys.reduce((result, id) => {
      if (filterParams[id].serverFilter) {
        result[filterParams[id].serverFilter] = filterParams[id].serverValue ? filterParams[id].serverValue : '';
      }
      return result;
    }, {});
  }
  return normalizedServerFilters;
};

export const denormalizeSelectValues = (values = {}) => {
  const keys = Object.keys(values);
  return keys.reduce((result, key) => {
    result[key] = values[key].id;
    return result;
  }, {});
};

export const dispatchAlert = (dispatch, result, successMessage = 'Success!') => {
  const alert = {
    color: result.error ? 'danger' : 'success',
    text: result.error ? generateAlertError(result) : successMessage,
  };

  return dispatch(setAlert(alert));
};
