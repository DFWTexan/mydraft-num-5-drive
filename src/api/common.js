/* eslint-disable no-console */
const defaultHeaders = new Headers();
defaultHeaders.append('Content-Type', 'application/json');

// eslint-disable-next-line max-params
async function request(method, url, params, isFormData = false) {
  const API_BASE = 'https://localhost:7242/api';
  let headers = defaultHeaders;
  let token = null;
  // try {
  //   token = JSON.parse(localStorage.getItem('authorization')).token;
  // } catch (e) {
  //   console.log(e, 'Error get token');
  // }

  // if (token) {
  //   headers = new Headers(isFormData ? {} : defaultHeaders);
  //   headers.set('Authorization', `Bearer ${token}`);
  // }

  // if (url.includes('Token')) {
  //   headers = new Headers(isFormData ? {} : defaultHeaders);
  //   headers.set('login-source', 'backoffice');
  // }

  let body;
  if (params && !isFormData) {
    body = JSON.stringify(params);
  }
  if (params && isFormData) {
    body = params;
  }

  try {
    // console.log('BLACKBIRD_API_BASE', BLACKBIRD_API_BASE);
    // console.log('BLACKBIRD_AUCTION_BASE', BLACKBIRD_AUCTION_BASE);
    // console.log('BLACKBIRD_BACKOFFICE_BASE', BLACKBIRD_BACKOFFICE_BASE);
    // console.log('BLACKBIRD_AUCTION_SITE', BLACKBIRD_AUCTION_SITE);
    let response = null;
    // if (params && params.base_url === 'AUCTION') {
    //   response = await fetch(`${API_BASE}/${url}`, {headers, method, body});
    // } else if (params && params.base_url === 'SIMULCAST') {
		// 	response = await fetch(`${API_BASE}/${url}`, {headers, method, body});
		// }
    // else {
      response = await fetch(`${API_BASE}/${url}`, {headers, method, body});
    // }
    return response;
  }

  catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  return {};
}

export const generateQueryString = (paramsObject = {}) => {
  return `?${Object.keys(paramsObject)
    .map(
      (param) =>
        `${param}=${
          typeof paramsObject[param] === "string"
            ? paramsObject[param].replace("#", "%23")
            : paramsObject[param]
        }`
    )
    .join("&")}`;
};

export const generateSearchParams = params => {
  const defaultParams = {
    search_string: '',
    page_number: '',
    page_size: '',
    mypackages: '',
    account_ID: '',
  };

  const mergedParams = {...defaultParams, ...params};

  return generateQueryString(mergedParams);
};

export const generateLookupParams = params => {
  const defaultParams = {
    auctionType: false,
    itemCategory: false,
    imageCategory: false,
    itemYear: false,
    itemMake: false,
    itemModel: false,
    competitor: false,
    contactType: false,
    event: false,
    location: false,
    motivationType: false,
    meterType: false,
    packageOwner: false,
  };

  const mergedParams = {...defaultParams, ...params};

  return generateQueryString(mergedParams);
};
export const parseQueryString = (paramsString = '') => JSON.parse(paramsString ?
  // eslint-disable-next-line no-div-regex
  '{"' + paramsString.replace('?', '').replace(/&/g, '","').replace(/=/g, '":"') + '"}' : '{}',
);

export const get = async url => request('GET', url, null);
export const create = async (url, params, isFormData) => request('POST', url, params, isFormData);
export const update = async (url, params) => request('PUT', url, params);
export const remove = async (url, params) => request('DELETE', url, params);
