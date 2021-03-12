/*
    流纹纹理线
    color 颜色 会和原来图片颜色叠加
    duration 持续时间 毫秒
*/
function PolylineImageRepeatMaterialProperty(options) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this._image = undefined;
    this._imageSubscription = undefined;
    this._repeat = undefined;
    this._repeatSubscription = undefined;
    this._exImg = undefined;
    this._exImgSubscription = undefined;
    this.image = options.image;
    this.exImg = options.exImg;
    this.repeat = options.repeat;
    this.exRepeat = options.exRepeat;
    this._time = (new Date()).getTime();
}
Cesium.defineProperties(PolylineImageRepeatMaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return false;
        }
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        }
    },
});
PolylineImageRepeatMaterialProperty.prototype.getType = function (time) {
    return 'PolylineImageRepeat';
}
PolylineImageRepeatMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = this.color ||Cesium.Color.WHITE ;//如果source里面的diffuse使用这个颜色的rgb可以无视图片本来的颜色，这里主要用来计算alpha值
    result.repeat = this.repeat || new Cesium.Cartesian2(1.0,1.0);//正常段的贴图数量,xy是两个方向的
    result.image = this.image || '/vmap2/images/joinLine.png';//贴图路径
    result.exImg = this.exImg || '/vmap2/images/joinLine.png';//用来记录特殊段及其贴图数量的贴图，rgb是用来标识的颜色，一般是(0,0,255)，alpha用来声明该段的贴图数量，这个由地图组件算好了传进来
    return result;
}
PolylineImageRepeatMaterialProperty.prototype.equals = function (other) {
  //这里要加其他属性
    return this === other ||
        (other instanceof PolylineImageRepeatMaterialProperty &&
        Cesium.Color.equals(this._color, other._color))
}
Cesium.PolylineImageRepeatMaterialProperty = PolylineImageRepeatMaterialProperty;
Cesium.Material.PolylineImageRepeatType = 'PolylineImageRepeat';
Cesium.Material.PolylineImageRepeatImage = '/vmap2/images/joinLine.png';//默认贴图路径
Cesium.Material.PolylineImageRepeatSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                            {\n\
                                                czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                vec2 st = materialInput.st;\n\
                                                vec2 p = st.xy;//\n\
                                                vec2 newRepeat;\n\
                                                vec4 colorImageTemple = texture2D(exImg, fract(materialInput.st));\n\
                                                //if( colorImageTemple.b == 1.0){\n\
                                                  newRepeat = vec2(colorImageTemple.a*10.0,1.0);\n\
                                                //}else{\n\
                                                  //newRepeat = repeat;\n\
                                                  //newRepeat = vec2(colorImageTemple.a*100.0,1.0);\n\
                                                //}\n\
                                                vec4 colorImage = texture2D(image, fract(newRepeat*st.st));\n\
                                                //vec4 colorImage = texture2D(image, fract(newRepeat*st.st));\n\
                                                //vec4 colorImage = texture2D(image, vec2(fract(10.0*st.s), st.t));\n\
                                                material.alpha = colorImage.a * color.a;\n\
                                                //material.diffuse = color.rgb;\n\
                                                material.diffuse = colorImageTemple.rgb;//用另外个图的颜色\n\
                                                //material.diffuse = (colorImage.rgb+color.rgb)/2.0;//这里是让图片原本的颜色和传入颜色叠加 现在改成只用传入颜色\n\
                                                return material;\n\
                                            }";

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineImageRepeatType, {
    fabric: {
        type: Cesium.Material.PolylineImageRepeatType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),//传值
            repeat: new Cesium.Cartesian2(1.0,1.0),//传值
            image: Cesium.Material.PolylineImageRepeatImage,//传值
            exImg: Cesium.Material.PolylineImageRepeatImage,//传值
        },
        // components : {
        //     diffuse : 'texture2D(image, fract((gl_FragCoord.xy - anchor.xy) / vec2(imageDimensions.xy))).rgb',
        //     alpha : 'texture2D(image, fract((gl_FragCoord.xy - anchor.xy) / vec2(imageDimensions.xy))).a'
        // },
        source: Cesium.Material.PolylineImageRepeatSource
    },
    translucent: function (material) {
        return true;
    }
});