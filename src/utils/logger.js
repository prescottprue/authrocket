import config from '../config';
import _ from 'lodash';

let logger = {
	log(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace') {
			runConsoleMethod('log', msgArgs);
		}
	},
	debug(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug') {
			runConsoleMethod('debug', msgArgs);
		}
	},
	info(logData) {
		if (config.logLevel === 'trace'  || config.logLevel === 'debug' || config.logLevel === 'info') {
			let msgArgs = buildMessageArgs(logData);
			runConsoleMethod('info', msgArgs);
		}
	},
	warn(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn') {
			runConsoleMethod('warn', msgArgs);
		}
	},
	error(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn' || config.logLevel === 'error' || config.logLevel === 'fatal') {
			runConsoleMethod('error', msgArgs);
		}
	}
};

export default logger;

function runConsoleMethod(methodName, methodData) {
	//Safley run console methods or use console log
	if (methodName && console[methodName]) {
		return console[methodName].apply(console, methodData);
	} else {
		return console.log.apply(console, methodData);
	}
}
function buildMessageArgs(logData) {
	var msgStr = '';
	var msgObj = {};
	//TODO: Attach time stamp
	//Attach location information to the beginning of message
	if (_.isObject(logData)) {
		if (config.logLevel == 'debug') {
			if (_.has(logData, 'func')) {
				if (_.has(logData, 'obj')) {
					//Object and function provided
					msgStr += `[${logData.obj}.${logData.func}()]\n `;
				} else if (_.has(logData, 'file')) {
					msgStr += `[${logData.file} > ${logData.func}()]\n `;
				} else {
					msgStr += `[${logData.func}()]\n `;
				}
			}
		}
		//Print each key and its value other than obj and func
		_.each(_.omit(_.keys(logData)), (key) => {
			if (key != 'func' && key != 'obj') {
				if (key == 'description' || key == 'message') {
					msgStr += logData[key];
				} else if (_.isString(logData[key])) {
					// msgStr += key + ': ' + logData[key] + ', ';
					msgObj[key] = logData[key];
				} else {
					//Print objects differently
					// msgStr += key + ': ' + logData[key] + ', ';
					msgObj[key] = logData[key];
				}
			}
		});
		msgStr += '\n';
	} else if (_.isString(logData)) {
		msgStr = logData;
	}
	var msg = [msgStr, msgObj];

	return msg;
}
