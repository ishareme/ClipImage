import utils from './utils';

function ClipImage(...options) {
    console.log('ImageClip');
    return new Promise((resolve, reject) => {
        this.init(options,resolve,reject);
    });
}

ClipImage.prototype = {
    init(options,resolve,reject){
        console.log('options', options);
        this.defaultConfigOption = {
            width: 100,
            height: 100,
            left: 0, //数字 px, %, center top 等等
            top: 0,
            type: 'jpeg',
            quality: 1, //0-1
            success(){},
            error(){},
        };
        this.errorObj = {};

        if (utils.isUndefined(options[0]) || (!utils.isString(options[0]) && !utils.isImageDom(options[0]) && !utils.isCanvasDom(options[0]) && !utils.isVideoDom(options[0]))) return new Error('ClipImage第一个参数是url/HTMLImageElement/HTMLVideoElement/HTMLCanvasElement');
        if (!utils.isObject(options[1])) return new Error('ClipImage第二个参数是对象哦~~');

        this.canvasImageSource = options[0];
        this.configOptions = utils.extend(true, this.defaultConfigOption, options[1]);

        this.initCanvas(this.canvasImageSource,resolve,reject);
    },
    initCanvas(source,resolve,reject){
        this.resultCanvas = document.createElement('canvas');
        this.resultCtx = this.resultCanvas.getContext('2d');

        this.resultW = this.getRealVal(this.configOptions.width, 'x');
        this.resultH = this.getRealVal(this.configOptions.height, 'y');
        this.sourceX = this.getRealVal(this.configOptions.left, 'x');
        this.sourceY = this.getRealVal(this.configOptions.top, 'y');

        this.resultCanvas.width = this.resultW;
        this.resultCanvas.height = this.resultH;

        if (utils.isString(source) || utils.isImageDom(source)){
            this.sourceImage = new Image();
            this.sourceImage.setAttribute('crossOrigin', 'anonymous');
            this.sourceImage.onload = () => {
                this.clip(resolve);
            };
            this.sourceImage.onerror = (error) =>{
                this.configOptions.error && this.configOptions.error(error);
                reject(error);
            };
            this.sourceImage.src = utils.isImageDom(source) ? source.src : source;
        }
        else if (utils.isCanvasDom(source)){
            this.sourceImage = source;
            this.clip(resolve);
        }
        else if (utils.isVideoDom(source)){

        }
    },
    clip(resolve){
        console.log('source',this.sourceImage);

        this.resultCtx.drawImage(this.sourceImage, this.sourceX, this.sourceY, this.resultW, this.resultH, 0, 0, this.resultW, this.resultH);

        this.resultB64 = this.resultCanvas.toDataURL(`image/${this.getOutType(this.configOptions.type)}`, this.configOptions.quality);

        this.configOptions.success && this.configOptions.success(this.resultB64);

        resolve(this.resultB64);
    },

    getRealVal(val, direction){
        if (utils.isNumber(val) || (utils.isString(val) && utils.isPX(val))){
            return utils.isNumber(val) ? val : parseInt(val.trim().slice(0, -2));
        }
        else if (utils.isString(val) && utils.isPercent(val)){
            return direction === 'x' ? this.sourceImage.width * (parseInt(val.slice(0, -1)) / 100 ) : this.sourceImage.height * (parseInt(val.slice(0, -1)) / 100 );
        }
        else if (utils.isString(val) && utils.isCenter(val)){
            return direction === 'x' ? this.sourceImage.width / 2 : this.sourceImage.height / 2;
        }
        else if (utils.isString(val) && (utils.isLeft(val) || utils.isTop(val))){
            return 0;
        }
        else if (utils.isString(val) && (utils.isRight(val) || utils.isBottom(val))){
            return utils.isRight(val) ? this.sourceImage.width : this.sourceImage.height;
        }
        else {
            this.errorObj.msg = '参数配置错误';
            this.configOptions.error && this.configOptions.error(this.errorObj);
            return false;
        }
    },
    getOutType(val){
        return utils.isJPG(val) ? 'jpeg' : 'png';
    },
};

export default ClipImage;
