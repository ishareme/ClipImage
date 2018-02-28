var utils = {
    readFileSize: function (file) {
        return (file.size / 1024).toFixed(4) > 1024 ? (file.size / 1024 * 1024).toFixed(4) + ' MB' : (file.size / 1024).toFixed(4) + ' KB';
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

    isPNG(val) {
        return val.trim().toLowerCase() === 'png';
    },
    isJPG(val) {
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
    $(ele) {
        if (document.querySelector) {
            return document.querySelector(ele);
        } else {
            if (ele.indexOf('#') > -1) {
                return document.getElementById(ele.replace('#', ''));
            } else if (ele.indexOf('.') > -1) {
                return document.getElementsByClassName(ele.replace('.', ''))[0];
            } else {
                return document.getElementsByTagName(ele)[0];
            }
        }
    },
    extend() {
        let options,
            name,
            clone,
            copy,
            source,
            copyIsArray,
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
    }
};

function type(object) {
    let class2type = {},
        type = class2type.toString.call(object),
        typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

    if (object == null) {
        return object + '';
    }

    typeString.split(' ').forEach(type => {
        class2type[`[object ${type}]`] = type.toLowerCase();
    });

    return typeof object === 'object' || typeof object === 'function' ? class2type[type] || 'object' : typeof object;
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

function ClipImage(...options) {
    console.log('ImageClip');
    return new Promise((resolve, reject) => {
        this.init(options, resolve, reject);
    });
}

ClipImage.prototype = {
    init(options, resolve, reject) {
        console.log('options', options);
        this.defaultConfigOption = {
            width: 100,
            height: 100,
            left: 0, //数字 px, %, center top 等等
            top: 0,
            type: 'jpeg',
            quality: 1, //0-1
            success() {},
            error() {}
        };
        this.errorObj = {};

        if (utils.isUndefined(options[0]) || !utils.isString(options[0]) && !utils.isImageDom(options[0]) && !utils.isCanvasDom(options[0]) && !utils.isVideoDom(options[0])) return new Error('ClipImage第一个参数是url/HTMLImageElement/HTMLVideoElement/HTMLCanvasElement');
        if (!utils.isObject(options[1])) return new Error('ClipImage第二个参数是对象哦~~');

        this.canvasImageSource = options[0];
        this.configOptions = utils.extend(true, this.defaultConfigOption, options[1]);

        this.initCanvas(this.canvasImageSource, resolve, reject);
    },
    initCanvas(source, resolve, reject) {
        this.resultCanvas = document.createElement('canvas');
        this.resultCtx = this.resultCanvas.getContext('2d');

        this.resultW = this.getRealVal(this.configOptions.width, 'x');
        this.resultH = this.getRealVal(this.configOptions.height, 'y');
        this.sourceX = this.getRealVal(this.configOptions.left, 'x');
        this.sourceY = this.getRealVal(this.configOptions.top, 'y');

        this.resultCanvas.width = this.resultW;
        this.resultCanvas.height = this.resultH;

        if (utils.isString(source) || utils.isImageDom(source)) {
            this.sourceImage = new Image();
            this.sourceImage.setAttribute('crossOrigin', 'anonymous');
            this.sourceImage.onload = () => {
                this.clip(resolve);
            };
            this.sourceImage.onerror = error => {
                this.configOptions.error && this.configOptions.error(error);
                reject(error);
            };
            this.sourceImage.src = utils.isImageDom(source) ? source.src : source;
        } else if (utils.isCanvasDom(source) || utils.isVideoDom(source)) {
            this.sourceImage = source;
            this.clip(resolve);
        } else {
            reject();
        }
    },
    clip(resolve) {
        console.log('source', this.sourceImage);

        this.resultCtx.drawImage(this.sourceImage, this.sourceX, this.sourceY, this.resultW, this.resultH, 0, 0, this.resultW, this.resultH);

        this.resultB64 = this.resultCanvas.toDataURL(`image/${this.getOutType(this.configOptions.type)}`, this.configOptions.quality);

        this.configOptions.success && this.configOptions.success(this.resultB64);

        // this.resultCanvas.toBlob((result) => {
        //     console.log('toBlob result', result)
        //
        //     this.resultObj.b64 = this.resultB64
        //     this.resultObj.size = 'Size: ' + utils.readFileSize(result)
        //     this.resultObj.type = 'Type: ' + result.type
        //     this.resultObj.width = this.op
        // }, `image/${this.getOutType(this.configOptions.type)}`)
        resolve(this.resultB64);
    },

    getRealVal(val, direction) {
        if (utils.isNumber(val) || utils.isString(val) && utils.isPX(val)) {
            return utils.isNumber(val) ? val : parseInt(val.trim().slice(0, -2));
        } else if (utils.isString(val) && utils.isPercent(val)) {
            return direction === 'x' ? this.sourceImage.width * (parseInt(val.slice(0, -1)) / 100) : this.sourceImage.height * (parseInt(val.slice(0, -1)) / 100);
        } else if (utils.isString(val) && utils.isCenter(val)) {
            return direction === 'x' ? this.sourceImage.width / 2 : this.sourceImage.height / 2;
        } else if (utils.isString(val) && (utils.isLeft(val) || utils.isTop(val))) {
            return 0;
        } else if (utils.isString(val) && (utils.isRight(val) || utils.isBottom(val))) {
            return utils.isRight(val) ? this.sourceImage.width : this.sourceImage.height;
        } else {
            this.errorObj.msg = '参数配置错误';
            this.configOptions.error && this.configOptions.error(this.errorObj);
            return false;
        }
    },
    getOutType(val) {
        return utils.isJPG(val) ? 'jpeg' : 'png';
    }
};

export default ClipImage;
