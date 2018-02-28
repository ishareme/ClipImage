export default {
    readFileSize: function (file) {
        return (file.size / 1024).toFixed(4) > 1024 ?  (file.size / 1024 * 1024).toFixed(4)+ ' MB' : (file.size / 1024).toFixed(4)+ ' KB'
    },
    isImageDom: function (img) {
        return img.tagName.toLowerCase() === 'img';
    },
    isCanvasDom: function (canvas) {
        return canvas.tagName.toLowerCase() === 'canvas';
    },
    isVideoDom: function (video) {
        return video.tagName.toLowerCase() === 'video';
    },

    isPX: function (str) {
        return str.trim().endsWith('px');
    },
    isPercent: function (str) {
        return str.trim().endsWith('%');
    },
    isCenter: function (str) {
        return str.trim().toLowerCase() === 'center';
    },
    isLeft: function (str) {
        return str.trim().toLowerCase() === 'left';
    },
    isTop: function (str) {
        return str.trim().toLowerCase() === 'top';
    },
    isRight: function (str) {
        return str.trim().toLowerCase() === 'right';
    },
    isBottom: function (str) {
        return str.trim().toLowerCase() === 'bottom';
    },

    isPNG(val){
        return val.trim().toLowerCase() === 'png';
    },
    isJPG(val){
        return val.trim().toLowerCase() === 'jpg' || val.trim().toLowerCase() === 'jpeg';
    },
    //数组判断
    isArray: Array.isArray || function (arr) {
        return Array.prototype.toString.call(arr) === '[object Array]';
    },
    //判断数字
    isNumber: function (val) {
        //isFinite 检测是否为无穷大
        //isNumber(parseInt(a))   // true
        // 第一种写法
        return typeof val === 'number' && isFinite(val);
        //第二种写法
        // return typeof val === 'number' && !isNaN(val)
    },
    //判断字符串
    isString: function (str) {
        return typeof str === 'string';
    },
    //判断布尔值
    isBoolean: function (bool) {
        return typeof bool === 'boolean';
    },
    //判断函数
    isFun: function (fn) {
        return typeof fn === 'function';
    },
    //判断对象
    isObject: function (obj) {
        //{},[],null 用typeof检测不出来
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    //判断undefined
    isUndefined: function (undefined) {
        return typeof undefined === 'undefined';
    },
    isNull: function (n) {
        //判断空值用 n === null
        return n === null;
    },
    isNaN: function (val) {
        return typeof val === 'number' && isNaN(val);
    },
    $(ele){
        if(document.querySelector){
            return document.querySelector(ele);
        } else {
            if (ele.indexOf('#') > -1){
                return document.getElementById(ele.replace('#',''));
            } else if (ele.indexOf('.') > -1){
                return document.getElementsByClassName(ele.replace('.',''))[0];
            } else {
                return document.getElementsByTagName(ele)[0];
            }
        }
    },
};