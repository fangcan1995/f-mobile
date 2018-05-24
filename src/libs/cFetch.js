require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import StandardError from 'standard-error';
import { API_CONFIG } from './../config/api';
import { Toast, Modal } from 'antd-mobile';
import { browserHistory } from 'react-router';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
    // 登陆界面不需要做401校验
    if (res.status === 401 && !res.url.match('uaa/oauth/token')) {
        Modal.alert('登录验证过期', '您的登录验证已过期，请重新登录', [
            {
                text: 'OK',
                onPress: () => {
                    cookie.remove('token');
                    cookie.remove('userInfo');
                    let redirect=location.pathname
                    location.href = '/mobile/login?redirect='+redirect;
                }
            }
        ]);
        return Promise.reject(errorMessages(res));

    }
    return res;
}

function check404(res) {
    if (res.status === 404) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        if (res instanceof Response) {
            // 这里补充更多错误参数
            //406 操作失败
            //500
            console.log('-----------res 500 406----------');
            console.log(res)
            return res.json().then(error => {
                console.log('-----------res 500 406 error----------');
                console.log(error)
                  if(res.code == 406){
                    console.log(res)
                      return res;
                  }else if(res.code == 500) {
                    console.log(res)
                      return res;
                  }else if(res.status == 406){
                    console.log(error)
                    return error;
                  }else if(res.status == 500){
                    console.log(error)
                    return error;
                  }else {
                return new StandardError({
                    statusCode: res.status,
                    msg: error.message ? error.msg ? error.msg : error.message : JSON.stringify(error),
                });
                }
            }).then(err => {
                throw err;
            });
        } else {
            return new StandardError({
                statusCode: -1,
                msg: res,
            });
        }

    }
}

function jsonParse(res) {
    return res.json();
}

function setUriParam(keys, value, keyPostfix) {
    let keyStr = keys[0];

    keys.slice(1).forEach((key) => {
        keyStr += `[${key}]`;
    });

    if (keyPostfix) {
        keyStr += keyPostfix;
    }

    return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
    const array = [];

    if (object instanceof(Array)) {
        object.forEach((value) => {
            array.push(setUriParam(keys, value, '[]'));
        });
    } else if (object instanceof(Object)) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];

                array.push(getUriParam(keys.concat(key), value));
            }
        }
    } else {
        if (object !== undefined) {
            array.push(setUriParam(keys, object));
        }
    }

    return array.join('&');
}

function toQueryString(object) {
    const array = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const str = getUriParam([key], object[key]);

            if (str !== '') {
                array.push(str);
            }
        }
    }

    return array.join('&');
}


function cFetch(url, options, withAuth = true,defaultUrl = API_CONFIG.baseUri) {
    //let mergeUrl = API_CONFIG.baseUri + url;
    let mergeUrl = defaultUrl+url;
    const defaultOptions = {
        method: 'GET'
    };

    const opts = Object.assign({}, defaultOptions, { ...options
    });

    // add query params to url when method is GET
    if (opts && opts.method == "GET" && opts['params']) {
        mergeUrl = mergeUrl + '?' + toQueryString(opts['params']);
    }

    const {
        token_type,
        access_token
    } = cookie.getJSON('token') || {};
    opts.headers = {
        'Authorization': withAuth ? `${token_type} ${access_token}` : '',
        ...opts.headers,
    };

    return fetch(mergeUrl, opts)
        .then(check401)
        .then(check404)
        .then(checkStatus)
        .then(jsonParse);
}

//catch all the unhandled exception
window.addEventListener("unhandledrejection", function (err) {
    const ex = err.reason;
    if (ex.constructor != null && ex.constructor == StandardError || ex.msg != null) {
        Toast.fail(ex.msg, 2.5);
    }
});

export default cFetch;