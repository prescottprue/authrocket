import config from '../config';
import logger from './logger';
import superagent from 'superagent';
import {each, keys} from 'lodash';

let request = {
	get(endpoint, queryData) {
		var req = superagent.get(endpoint);
		if (queryData) {
			req.query(queryData);
		}
		// req = addAuthHeader(req);
		return handleResponse(req);
	},
	post(endpoint, data) {
		var req = superagent.post(endpoint).send(data);
		// req = addAuthHeader(req);
		return handleResponse(req);
	},
	put(endpoint, data) {
		var req = superagent.put(endpoint, data);
		// req = addAuthHeader(req);
		return handleResponse(req);
	},
	del(endpoint, data) {
		var req = superagent.put(endpoint, data);
		// req = addAuthHeader(req);
		return handleResponse(req);
	},
	/** Attach AuthRocket request headers and make a request
	 * @param {String} endpoint - Endpoint to send request to
	 * @param {Object|String} data - Request data
	 * @return {Promise}
	 */
	 postWithHeaders(url, data) {

	 }
};

export default request;

//Wrap response in promise that has error handling
function handleResponse(req) {
	return new Promise((resolve, reject) => {
		req.end((err, res) => {
			if (!err) {
				// logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
				return resolve(res.body);
			} else {
				if (err.status == 401) {
					logger.warn({description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse'});
				}
				if (err && err.response) {
					return reject(err.response.text);
				}
				logger.warn({description: 'Error response.', error: err, func: 'handleResponse'});
				return reject(err);
			}
		});
	});
}
//Add auth rocket headers to request
function addAuthRocketHeaders(req) {
	//TODO: Make this work
  let headers = {
    'X-Authrocket-Account': config.accountId,
    'X-Authrocket-Api-Key': config.apiKey,
    'X-Authrocket-Realm': config.realmId,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-agent': 'https://github.com/prescottprue/authrocket' //To provide AuthRocket a contact
  };
	//Add each header to the request
	each(keys(headers), (key) => {
		req = addHeaderToReq(key, headers[key]);
	});
}
//Add header to an existing request
function addHeaderToReq(req, headerName, headerVal) {
	return req.set(headerName, headerVal);
}
//Add token to Authorization header if it exists
function addAuthHeader(req) {
	// if (token.string) {
	// 	req = req.set('Authorization', 'Bearer ' + token.string);
	// 	console.info({message: 'Set auth header', func: 'addAuthHeader', file: 'request'});
	// }
	// return req;
}
