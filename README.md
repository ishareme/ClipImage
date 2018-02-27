# MAPP 的参数配置工具

# ClipImage

> [git](https://github.com/ishareme/clipimage)

> [npm](http://npm.meitu-int.com/#@meitu/clipimage)

## Example

[example](http://f2er.meitu.com/hmz/imageclip/example/index.html)

## Getting Started
 
 ```shell
 npm set registry http://npm.meitu-int.com 
 ```
 
 ```shell
 npm i @meitu/clipimage --save
 ```

 ```shell
 import ImageClip from '@meitu/clipimage';
 ```
 
 
####  new ClipImage(image,options):

```sh
    image: 背景图片 type: url/HTMLImageElement/HTMLCanvasElement/HTMLVideoElement
    options:{
        // 结果图宽度 高度
        // 100 / '100%[相对于原图]' / '100px'
        width: 100,
        height: 100,
        //left top 从哪开始裁剪
        // 100 / '50%' / '100px' / 'center' / 'top' / 'left'
        left: 'center',
        top: 'center',
        //导出图片类型 'jpeg' / 'jpg' / 'png'
        type: 'jpg',
        //导出图片的质量 数值[0-1]
        quality: 1, 
        //成功时的回调
        success(b64){
        
        },
        //失败时的回调
        error(err){
        }
    }
    
    //默认值
    {
        width: 100,
        height: 100,
        left: 0, 
        top: 0,
        type: 'jpeg',
        quality: 1, 
        success(){},
        error(){},
    }
```

## Basic Usage
```sh
ClipImage


new ClipImage($originCanvas,{
    width: '200px',
    height: '200px',
    left: '100px', 
    top: '100px',
    type: 'jpg',
    quality: 1, 
    success(b64){
         $result.src = b64
    },
    error(){},
})

or

new ClipImage('http://mtapplet.meitudata.com/596c72073971d86b5128.jpg',{
    width: 100,
    height: 100,
    left: 'center', 
    top: 'center',
    type: 'png',
    quality: 0.8, 
}).then(function (b64) {
    $result.src = b64
})

```


