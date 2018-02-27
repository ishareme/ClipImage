export default {
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
    extend(){
        let options, name, clone, copy, source, copyIsArray,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== 'object' && type(target) !== 'function') {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            //
            if ((options = arguments[i]) !== null) {
                // for in source object
                for (name in options) {

                    source = target[name];
                    copy = options[name];

                    if (target == copy) {
                        continue;
                    }

                    // deep clone
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        // if copy is array
                        if (copyIsArray) {
                            copyIsArray = false;
                            // if is not array, set it to array
                            clone = source && Array.isArray(source) ? source : [];
                        } else {
                            // if copy is not a object, set it to object
                            clone = source && isPlainObject(source) ? source : {};
                        }

                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    },
};

function type(object) {
    let class2type = {},
        type = class2type.toString.call(object),
        typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

    if (object == null) {
        return object + '';
    }

    typeString.split(' ').forEach((type) => {
        class2type[`[object ${type}]`] = type.toLowerCase();
    });

    return (
        typeof object === 'object' ||
        typeof object === 'function' ?
            class2type[type] || 'object' :
            typeof object
    );
}

function isPlainObject(object) {
    let proto,
        ctor,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);

    if (!object || toString.call(object) !== '[object Object]') return false;

    proto = Object.getPrototypeOf(object);

    if (!proto) return true;

    ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

    return typeof ctor === 'function' && fnToString.call(ctor) === ObjectFunctionString;
}