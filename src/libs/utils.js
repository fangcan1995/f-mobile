// 工具类

// 表单验证
const isNumber = val => {
  var reg = /^\d*$/;
  return val == "" ? false : reg.test(val);
};
const isTel = val => {
  var reg = /^1[3|4|5|7|8]\d{9}$/;
  return reg.test(val);
};
const isIdCard = val => {
  var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
  return reg.test(val);
};
const isBankcard = val => {
  var reg = /^(\d{16}|\d{19})$/;
  return reg.test(val);
};

// 字符串处理
const trim = (str, isGlobal) => {
  return isGlobal ? str.replace(/\s/g, "") : str.replace(/(^\s+)|(\s+$)/g, "");
};

// 是否为数组
const isArray = obj => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

// 图片预加载
const preloadImage = path =>
  new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  });

// cookie操作
const _setCookie = (key, value, days) => {
  var expiryDate = new Date();
  expiryDate.setTime(
    expiryDate.getTime() + (days ? days : 30) * 24 * 60 * 60 * 1000
  );
  document.cookie =
    key + "=" + escape(value) + ";expires=" + expiryDate.toGMTString();
};

const _getCookie = key => {
  var arr,
    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

const _delCookie = key => {
  _setCookie(key, "0", -1);
};

const _clearCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      _setCookie(keys[i], "0", -1);
    }
  }
};

//本地存储
const _existStorage = () => !!window.localStorage;

const setStorage = ({ key, value }) => {
  value = JSON.stringify(value);
  if (_existStorage()) {
    window.localStorage.setItem(key, value);
  } else {
    _setCookie(key, value);
  }
};

const getStorage = ({ key }) => {
  let value = "";
  if (_existStorage()) {
    value = window.localStorage.getItem(key);
  } else {
    value = _getCookie(key);
  }
  return JSON.parse(value);
};

const delStorage = ({ key }) => {
  if (_existStorage()) {
    window.localStorage.removeItem(key);
  } else {
    _delCookie(key);
  }
};

const clearStorage = () => {
  if (_existStorage()) {
    window.localStorage.clear();
  } else {
    _clearCookie();
  }
};

const isWeiXin = () =>
  window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
  "micromessenger";
const isAndroid = () =>
  window.navigator.userAgent.indexOf("Android") > -1 ||
  window.navigator.userAgent.indexOf("Linux") > -1; //g
const isIOS = () =>
  !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

const setBrowserTitle = str => {
  document.title = str;
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "display: none; width: 0; height: 0;";
  iframe.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=";

  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener("load", listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener("load", listener);
  document.body.appendChild(iframe);
};
// 文件转DataURL
const readBlobAsDataURL = blob =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    let handleSuccess = function(e) {
      reader.removeEventListener("load", handleSuccess);
      reader.removeEventListener("error", handleFail);
      resolve(this.result);
    };
    let handleFail = function(e) {
      reader.removeEventListener("load", handleSuccess);
      reader.removeEventListener("error", handleFail);
      reject(this.result);
    };
    handleSuccess = handleSuccess.bind(reader);
    handleFail = handleFail.bind(reader);
    reader.addEventListener("load", handleSuccess);
    reader.addEventListener("error", handleFail);
    reader.readAsDataURL(blob);
  });
// 图片转DataURL
const imageToDataURL = (file, limitSize) =>
  new Promise((resolve, reject) => {
    if (!file || typeof file != "object") {
      throw new Error("文件格式不正确");
    }
    const type = file.type;
    const size = file.size;
    const name = file.name;
    const reg = /image\/\w+/;
    if (!reg.test(type)) {
      return reject({ status: -2, msg: "不是图片" });
    } else if (limitSize && size > limitSize) {
      return reject({ status: -3, msg: "图片尺寸过大" });
    }
    readBlobAsDataURL(file)
      .then(dataURL => {
        resolve({ name, type, dataURL });
      })
      .catch(err => {
        reject({ status: -1, msg: "转换DataURL失败" });
      });
  });
// 压缩图片
const zipImage = ({ name, type, dataURL }, maxWidth = 1024, maxHeight) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const originWidth = img.width;
      const originHeight = img.height;
      const scale = originWidth / originHeight;
      let newWidth, newHeight;
      if (maxWidth && maxHeight) {
        const scaleWidth = originWidth / maxWidth;
        const scaleHeight = originHeight / maxHeight;
        if (
          (scaleWidth > 1 || scaleHeight > 1) &&
          scaleWidth / scaleHeight > 1
        ) {
          newWidth = maxWidth;
          newHeight = newWidth / scale;
        } else if (
          (scaleWidth > 1 || scaleHeight > 1) &&
          scaleWidth / scaleHeight <= 1
        ) {
          newHeight = maxHeight;
          newWidth = newHeight * scale;
        } else {
          newWidth = originWidth;
          newHeight = originHeight;
        }
      } else if (maxWidth) {
        newWidth = originWidth > maxWidth ? maxWidth : originWidth;
        newHeight = newWidth / scale;
      } else if (maxHeight) {
        newHeight = originHeight > maxHeight ? maxHeight : originHeight;
        newWidth = newHeight * scale;
      } else {
        newWidth = originWidth;
        newHeight = originHeight;
      }
      let canvas = document.createElement("canvas");
      canvas.style.cssText = "display: block; width: 0; height: 0";
      let ctx = canvas.getContext("2d");
      canvas.setAttribute("width", newWidth);
      canvas.setAttribute("height", newHeight);
      document.body.appendChild(canvas);

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const newDataURL = canvas.toDataURL(type);
      document.body.removeChild(canvas);
      resolve({ name, type, dataURL: newDataURL });
    };
    img.onerror = () => {
      reject({ status: -1, msg: "图片压缩失败" });
    };
    img.src = dataURL;
  });
// dataURL转Blob对象
const dataURLtoBlob = dataURL => {
  const arr = dataURL.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);
  let n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
const parseQueryString = url => {
    let obj = {},
        queryStr = url.substr(url.lastIndexOf('?') + 1, url.length),
        arr = queryStr.split('&');
    for ( let i = 0, len = arr.length; i < len; i++ ) {
      let tmp = arr[i].split('=');
      if ( tmp[0].length && typeof tmp[1] != 'undefined' ) {
        obj[tmp[0]] = tmp[1];
      }
    }
    return obj;
  }

export {
  isNumber,
  isTel,
  isIdCard,
  trim,
  isArray,
  preloadImage,
  setStorage,
  getStorage,
  delStorage,
  clearStorage,
  isWeiXin,
  isAndroid,
  isIOS,
  setBrowserTitle,
  readBlobAsDataURL,
  imageToDataURL,
  zipImage,
  dataURLtoBlob,
  parseQueryString
};
