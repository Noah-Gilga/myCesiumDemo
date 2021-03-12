/**
 * @namespace vtron.comp.std.map
 */
$.namespace("vtron.comp.std.map");
/**
 * v-std-map-cesium地图组件
 * @module vtron.comp.std.map
 * @class vtron.comp.std.map.Cesium
 */
vtron.comp.std.map.Cesium = Polymer({
    is: "v-std-map-cesium",
    behaviors: [
        vtron.comp.behavior.SizeBehavior,
        vtron.comp.behavior.PositionBehavior,
        vtron.comp.behavior.StdLifecycleBehavior, //标准组件的生命周期扩展行为
    ],
    properties: {
        /**
         * 是否自动加载地图
         * @property autoload
         * @type String
         */
        autoload: {
            type: String,
            value: "",
            reflectToAttribute: true
        },

        /**
        /**
         * 搜索图层集合
         */
        searchLayerArray: {
            type: Array,
            value: []
        },

        /**
         * 地图底图URL
         * @property mapUrl
         * @type String
         */
        mapUrl: {
            type: String,
            reflectToAttribute: true
        },

        /**
         * 地图底图类型
         * @property mapType
         * @type String
         */
        mapType: {
            type: String,
            value: "WebMapServiceImageryProvider",
            reflectToAttribute: true
        },

        /**
         * WMS图层
         * @property wmsLayers
         * @type String
         */
        wmsLayers: {
            type: String,
            reflectToAttribute: true
        },

        /**
         * 地图底图图片格式
         * @property format
         * @type String
         */
        format: {
            type: String,
            value: "png",
            reflectToAttribute: true
        },

        /**
         * 地图中心点X
         * @property cenX
         * @type Number
         */
        cenX: {
            type: Number,
            value: 0,
            reflectToAttribute: true
        },

        /**
         * 地图中心点Y
         * @property cenY
         * @type Number
         */
        cenY: {
            type: Number,
            value: 0,
            reflectToAttribute: true
        },

        /**
         * 地图默认层级
         * @property level
         * @type Number
         */
        level: {
            type: Number,
            value: 10,
            reflectToAttribute: true
        },

        /**
         * 地图最小层级
         * @property minLevel
         * @type Number
         */
        minLevel: {
            type: Number,
            value: 1,
            reflectToAttribute: true
        },

        /**
         * 地图最大层级
         * @property maxLevel
         * @type Number
         */
        maxLevel: {
            type: Number,
            value: 20,
            reflectToAttribute: true
        },

        /**
         * 地理格式
         * @property mapScheme
         * @type String
         */
        mapScheme: {
            type: String,
            value: "GeographicTilingScheme",
            reflectToAttribute: true
        },

        /**
         * 地图倾斜角度
         * 90度为俯视图
         */
        pitch: {
            type: Number,
            value: 90,
            reflectToAttribute: true
        },

        /**
         * 地图允许倾斜阈值
         * height/distance
         */
        canTiltAngle: {
            type: Number,
            value: 0.3,
            reflectToAttribute: true
        },

        /**
         * 地图缺省颜色
         */
        baseColor: {
            type: String,
            value: 'rgba(0, 0, 128, 1.0)',
            reflectToAttribute: true
        },

        /**
         * 图标放大倍数
         */
        imageScaleFactor: {
            type: Number,
            value: 1,
            reflectToAttribute: true
        },

        /**
         * 地图反色
         */
        invertFlag: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },

        /**
         * 线选面选共用的辅助线宽度
         */
        guideLineWidth: {
            type: Number,
            value: 2,
            reflectToAttribute: true
        },

        /**
         * 线选结果的轮廓颜色,其缓冲区填充色在addLineElement中换算
         */
        polylineOutlineColor: {
            type: String,
            value: 'rgba(0, 0, 255, 1)',
            reflectToAttribute: true
        },

        /**
         * 线选结果的轮廓宽度，单位像素，pc端是2，大屏端是10
         */
        polylineOutlineWidth: {
            type: Number,
            value: 2,
            reflectToAttribute: true
        },

        /**
         * zindex全局变量
         */
        polylineZIndex: {
            type: Number,
            value: 1,
            reflectToAttribute: true
        },

        /**
         * 线选的缓冲距离，单位米，默认200米
         */
        bufferRadius: {
            type: Number,
            value: 200,
            reflectToAttribute: true
        },

        /**
         * 线选的缓冲区,0代表是普通的线，1代表线选，有缓冲区
         */
        bufferType: {
            type: Number,
            value: 0,
            reflectToAttribute: true
        },

        /**
         * 面选结果的轮廓颜色,其缓冲区填充色在addPolygonElement中换算
         */
        polygonOutlineColor: {
            type: String,
            value: 'rgba(0, 0, 255, 1)',
            reflectToAttribute: true
        },

        /**
         * 面选的轮廓宽度，单位像素，pc端是2，大屏端是10
         */
        polygonOutlineWidth: {
            type: Number,
            value: 2,
            reflectToAttribute: true
        },

        /**
         * 多边形面的类型，0为普通面，1为有轮廓线的面
         */
        polygonType: {
            type: Number,
            value: 0,
            reflectToAttribute: true
        },

        /**
         * 扇形结果的轮廓颜色,其缓冲区填充色在addPolygonElement中换算
         */
        sectorOutlineColor: {
            type: String,
            value: 'rgba(0, 0, 255, 1)',
            reflectToAttribute: true
        },

        /**
         * 面选的轮廓宽度，单位像素，pc端是2，大屏端是10
         */
        sectorOutlineWidth: {
            type: Number,
            value: 2,
            reflectToAttribute: true
        },

        /**
         * 圈选结果的轮廓颜色,其填充颜色是在addCircleElement中判断线的类型，由填充颜色中得到，透明度是1
         */
        circleOutlineColor: {
            type: String,
            value: 'rgba(0, 0, 255, 1)',
            reflectToAttribute: true
        },

        /**
         * 圈选的轮廓宽度，单位像素，pc端是2，大屏端是10
         */
        circleOutlineWidth: {
            type: Number,
            value: 2,
            reflectToAttribute: true
        },

        /**
         * 折线的填充颜色
         */
        foldLineColor: {
            type: String,
            value: 'rgba(255, 0, 0, 0.8)',
            reflectToAttribute: true
        },

        /**
         * 折线的宽度，单位像素，默认10
         */
        foldLineWidth: {
            type: Number,
            value: 10,
            reflectToAttribute: true
        },

        /**
         * 自由绘笔的填充颜色
         */
        penLineColor: {
            type: String,
            value: 'rgba(255, 0, 0, 0.8)',
            reflectToAttribute: true
        },

        /**
         * 笔线的宽度，单位像素，默认10
         */
        penLineWidth: {
            type: Number,
            value: 10,
            reflectToAttribute: true
        },

        /**
         * 瓦片放大参数
         */
        maximumScreenSpaceError: {
        	type: Number,
            value: 4,
            reflectToAttribute: true
        },
        /**
         * 默认相机参数,"x:,y:,z:,heading:,pitch:,roll:"
         * @property x y z 世界坐标
         * @type Number
         */
        defaultCamera: {
            type: String,
            value: null,
            reflectToAttribute: true
        },

        /**
         * 是否使用OIT
         */
        OIT: {
        	type: Boolean,
            value: true,
            reflectToAttribute: true
        },
    },

    created: function() {
        this._viewer = null; //内部CesiumViewer对象
    },

    attached: function() {
        //触摸事件touchmove禁止往下传递，避免触摸卡顿的问题
        this.addEventListener('touchmove',function(event){ event.preventDefault()}, false); 
        
        if (this.autoload == "true") {
            this.init();
        }
    },

    detached: function() {
        if(this._viewer){
            this._viewer.entities.removeAll();
            this._viewer.dataSources.removeAll();
            this._viewer.destroy();
        }
    },

    /**
     * 地图初始化
     * @param {*} config 地图初始化配置参数，见default.vmap
     * @param {*} callback 地图初始化后的回调函数
     */
    init: function(config, callback) {
        var dom = this.$$("#cesiumContainer");
        $(dom).empty();
        this.canvasWidth = dom.offsetWidth;
        this.canvasHeight = dom.offsetHeight;

        //如果第一个参数是回调函数，则替换第一个参数为传入callback
        if(typeof(config) == "function" && !callback){
            callback = config;
            config = null;
        }

        //创建空配置
        config = config || {};
        config.map = config.map || {};
        config.tiles = config.tiles || [];
        config.layers = config.layers || [];
        
        //地图配置
        if(config.map){
            //基础瓦片
            if(config.map["default-tile"]){
                var defaultTile = {
                    "map-type": "UrlTemplateImageryProvider",
                    "map-url": "/tiles/base/{z}/{x}/{y}.png",
                    "min-level": "1",
                    "max-level": "11",
                    "map-scheme": "WebMercatorTilingScheme",
                  };
                if(config.tiles && config.tiles.length){
                    config.tiles.forEach((item)=>{
                        if(config.map["default-tile"] == item.name){
                            defaultTile = item;
                        }
                    })
                }
                
                $(this).attr({
                    "map-type": defaultTile["map-type"],
                    "format": defaultTile["format"],
                    "map-url": defaultTile["map-url"],
                    "wms-layers": defaultTile["wms-layers"],
                    "tileMatrixLabels": defaultTile["tileMatrixLabels"],
                    "min-level": defaultTile["min-level"],
                    "max-level": defaultTile["max-level"],
                    "map-scheme": defaultTile["map-scheme"],
                    "west": defaultTile["west"],
                    "south": defaultTile["south"],
                    "east": defaultTile["east"],
                    "north": defaultTile["north"],
                });
            }

            var mapConfig = config.map;
            var fontSize = vtron.util.getFontSize(document.body),
                scale = fontSize/16;
                scale = scale < 1 ? 1 : scale;
            var lineBuffer = mapConfig.lineBuffer,
                penLineColor = mapConfig.penLineColor,
                maximumScreenSpaceErrorPC = mapConfig.maximumScreenSpaceErrorPC,
                maximumScreenSpaceErrorWall = mapConfig.maximumScreenSpaceErrorWall,
                lineWidth = (mapConfig.lineWidth || 2)*scale,
                guideLineWidth = (mapConfig.guideLineWidth || 4)*scale,
                penLineWidth = (mapConfig.penLineWidth || 10)*scale,
                OIT = mapConfig.OIT
                imageScaleFactor = (mapConfig.imageScaleFactor ||1) *scale;

            this.polylineOutlineColor = mapConfig.lineColor || this.polylineOutlineColor;
            this.polylineOutlineWidth = lineWidth;
            this.bufferRadius = lineBuffer || this.bufferRadius;
            this.polygonOutlineColor = mapConfig.lineColor || this.polygonOutlineColor;
            this.polygonOutlineWidth = lineWidth;
            this.guideLineWidth = guideLineWidth || this.guideLineWidth;
            this.circleOutlineColor = mapConfig.lineColor || this.circleOutlineColor;
            this.circleOutlineWidth = lineWidth; 
            this.penLineColor = penLineColor || this.penLineColor;
            this.penLineWidth = penLineWidth;
            this.foldLineColor = penLineColor || this.foldLineColor;
            this.foldLineWidth = penLineWidth;
            this.OIT = OIT || this.OIT;
            this.imageScaleFactor = imageScaleFactor;
            this.cenX = mapConfig["cen-x"] || this.cenX;
            this.cenY = mapConfig["cen-y"] || this.cenY;
			this.level = mapConfig.level || this.level;
            this.pitch = Number(mapConfig.pitch) || this.pitch;
            this.canTiltAngle = Number(mapConfig.canTiltAngle) || this.canTiltAngle;
            if($("body").hasClass("theme-pc")){
                this.maximumScreenSpaceError = Number(maximumScreenSpaceErrorPC) || this.maximumScreenSpaceError;
            }else{
                this.maximumScreenSpaceError = Number(maximumScreenSpaceErrorWall) || this.maximumScreenSpaceError;
            }
            this._mapConfig = mapConfig;
        }

        //地图组件内部初始化
        this._init(dom, ()=>{
            //反色配置
            var invertType = 0;
            
            //加载底图瓦片
            //fix 配置页面叠加顺序问题
            var configByOrder = config.tiles.concat();
            configByOrder.reverse();
            for (var tile of configByOrder) {
                if(!tile.disable){
                    this.loadImageryTile(tile.name, tile, tile.show);
                    if(tile.show) {
                        if(tile.invert){
                            invertType = parseInt(tile["invert-type"]) || 0;
                        }else{
                            invertType = 0;
                        }
                    }
                    if(tile.invert) this.invertFlag = true;
                }
            }
            
            //反色900
            if(invertType > 0 && this.invertFlag){
                this.invertMapColor(invertType);
            }

            //公用着色器事件控制,现在源码scene.js里面写死0.02，以后要开出来再在这边配，参考源码中 Camera.prototype.rotateUp = function(angle) {
            //this._viewer.scene.shaderTimeLimit = 
            //鼠标滚轮有无动作标志
            this._viewer.camera.isRotating = false;
            //当前是否有聚合图层
            this._viewer.scene.hasClusterLayer = false;
            //加载图层
            for (var layer of config.layers) {
                if(!layer.disable){
                    var datasource = null;
                    if (layer.layerType == "point") {
                        if(layer.sameIcon !=undefined){
                            if(!layer.sameIcon){
                                //不统一图标
                                datasource = this.loadPointLayerGeoJsonDataByAttribute(layer.layerName, layer.url, layer.imageUrl, layer.scale, 0, layer.show,layer.supportSearch,layer.labelShow, layer.labelField, layer.displayField, layer.pointFieldAttributeList,layer.iconField, layer.near, layer.far);
                            }else{
                                //所有点统一图标
                                datasource = this.loadPointLayerGeoJsonData(layer.layerName, layer.url, layer.imageUrl, layer.scale, 0, layer.show,layer.supportSearch,layer.labelShow, layer.labelField, layer.displayField, layer.near, layer.far);
                            }
                        }else{
                            //所有点统一图标
                            datasource = this.loadPointLayerGeoJsonData(layer.layerName, layer.url, layer.imageUrl, layer.scale, 0, layer.show,layer.supportSearch,layer.labelShow, layer.labelField, layer.displayField, layer.near, layer.far);
                        }
                    } else if (layer.layerType == "line") {
                        var tempWidth;
                        if($("body").hasClass("theme-wall")){
                            tempWidth = layer.wallWidth;
                        }else{
                            tempWidth = layer.pcWidth;
                        }
                        tempWidth = Number(tempWidth);
                        if(layer.sameLineColor){
                            //所有线统一颜色
                            datasource = this.loadPolylineLayerGeoJsonData(layer.layerName, layer.url, tempWidth, layer.color, null, null, layer.show, layer.labelShow, layer.labelField, null, layer.gradientColor,layer.near,layer.far);
                        }else{
                            //根据配置属性不同颜色
                            datasource = this.loadPolylineLayerGeoJsonDataByAttribute(layer.layerName, layer.url, tempWidth, layer.show, layer.labelShow, layer.labelField, null, layer.lineField, layer.lineFieldAttributeList, layer.near, layer.far);
                        }
                    } else if (layer.layerType == "polygon") {
                        var tempWidth;
                        if($("body").hasClass("theme-wall")){
                            tempWidth = layer.wallWidth;
                        }else{
                            tempWidth = layer.pcWidth;
                        }
                        tempWidth = Number(tempWidth);
                        if((layer.fillColorType !='all')){
                            datasource = this.loadPolygonLayerGeoJsonDataByAttribute(layer.layerName, layer.url, layer.show, layer.outlineColor, layer.colorField, layer.fieldAttributeList,tempWidth,layer.labelShow, layer.labelField, layer.near, layer.far);
                            continue;
                        }
                        datasource = this.loadPolygonLayerGeoJsonData(layer.layerName, layer.url, null, layer.show, layer.fillColor, layer.outlineColor,tempWidth,0,layer.labelShow, layer.labelField, layer.near, layer.far);
                    }
                    if(datasource){
                        //设置图层的默认显示字段和扩展显示字段
                        datasource.displayField = layer.displayField;
                        datasource.displayFieldList = layer.displayFieldList;
                    }
                }
            }

            if(callback && typeof(callback) == "function"){
                callback.apply(this);
            }
        });
    },

    /**
     * 内部初始化函数
     * @param {*} dom 渲染DOM节点
     * @param {*} callback 渲染完成的回调函数
     */
    _init: function(dom, callback) {
        //这里开始：加载附加js，异步加载完后再执行后续方法和事件
        seajs.use([
          "/vmap2/js/turf/turf.js",                           //路径算法
          "/vmap2/js/apng-js/apng.js",                         //apng解析
          "/vmap2/js/webgl-heatmap/webgl-heatmap.js",          //WebGL热力图库
          "/vmap2/js/CesiumHeatmap/HeatmapImageryProvider.js", //热力图
          "/vmap2/js/CesiumHeatmap/CesiumHeatmap.js",          //热力图
          "/vmap2/js/CesiumHeatmap/CesiumHeatmap_webgl.js",    //热力图WebGL实现
          "/vmap2/js/PGISImageryProvider_V03.js",              //PGIS0.3
          "/vmap2/js/PGISImageryProvider_V03_local.js",        //PGIS0.3本地磁盘读取
          "/vmap2/js/PGISImageryProvider_V10.js",              //PGIS1.0
          "/vmap2/js/PhotoshopMathFP.js",                      //ps相关文件
        ], ()=>{
            //调试标识 LLL
            this._debugTyle=false;
            this._logEnum={
                    FileError: 'FileError',//文件错误:文件内容为空等
                    DataError: 'DataError',//
                    ParamError: 'ParamError',
                    DataWarn:'DataWarn',
                    Infor:'infor',//普通log
                    OtherError:'OtherError'
            };
            var defaultImageryProvider = this._createImageryProvider({
                mapType: this.mapType,
                mapUrl: this.mapUrl,
                wmsLayers: this.wmsLayers,
                format: this.format,
                minimumLevel: this.minLevel,
                maximumLevel: this.maxLevel,//2||
                mapScheme: this.mapScheme,
                mapName:'defaultBaseMap',
                //invertValue: this.baseTileInvertType //没baseTileInvertType这个参数
                show:true //LLL
            });
            defaultImageryProvider.name = 'defaultBaseMap';
            //defaultImageryProvider.invertValue=
            defaultImageryProvider.show=true;
            this._defaultImageryTile = defaultImageryProvider;

            var mapProjection = new Cesium.GeographicProjection();
            var globe = new Cesium.Globe(mapProjection.ellipsoid);
            globe.tileCacheSize = 8000;        //瓦片缓存数量
            globe.maximumScreenSpaceError  = this.maximumScreenSpaceError || 4;
            
            // 设置默认选项
            var defaultOption = {
                imageryProvider: defaultImageryProvider,
                animation: false,
                baseLayerPicker: false,
                fullscreenButton: false,
                geocoder: false,
                homeButton: false,
                infoBox: false,
                shouldAnimate: true,
                //scene3DOnly: true,//chkun
                sceneModePicker: false,
                selectionIndicator: false,//chkun test
                timeline: false,
                navigationHelpButton: false,
                navigationInstructionsInitiallyVisible: false,
                globe: globe,
                orderIndependentTranslucency: this.OIT|| false,//是否开启oit，true会耗一点性能
                contextOptions: {
                    webgl: {
                        antialias: false,
                        alpha: false
                    }
                },
            };

            //内部CesiumViewer对象
            try{
                this._viewer = new Cesium.Viewer(dom, defaultOption);

                //if(this._debugTyle){
                    var info = {};
                    info.level = 2;//log
                    info.info = "浏览器和地图库信息";
                    info.browser = window.navigator.userAgent.toLowerCase(); 
                    info.region = [this.offsetWidth,this.offsetHeight];
                    info.libVersion = Cesium.VERSION;
                    info.config={'SSE': globe.maximumScreenSpaceError,'OIT':this.OIT,'TILECACHE':globe.tileCacheSize}
                    this._mapLog(info);  
                //}
            }
            catch(error){
                var warn = this._logEnum.OtherError + ":";
                var info = {};
                info.level = 0;//error
                info.function = 'init';
                info.para =[defaultOption];
                info.info = "初始化地图组件失败:"+ error;
                this._mapLog(info);     
            }
            this._viewer.scene.moon.show = false;
            // 地球默认瓦片颜色
            // this._viewer.scene.globe.depthTestAgainstTerrain = true;
            this._viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString(this.baseColor);
            // 重新设置相机修改的阈值
            this._viewer.camera.percentageChanged = 0.01;
            //取消1.56.1版本地图变暗
            this._viewer.scene.highDynamicRange = false;

            //
            var explorer = window.navigator.userAgent.toLowerCase(); 
            if (explorer.indexOf("chrome") >= 0) { 
                var ver = explorer.match(/chrome\/([\d.]+)/)[1]; 
                var mv = ver.split('.')[0]
                if(mv<61){
                    globe.showGroundAtmosphere = false;
                }
            } 
            

            this.moveReset();
            this._initEvent();
            // 初始化完成
            this.loaded = true;
            
            //执行回调函数
            if(callback)callback();
        })
    },

    /**
     * 创建ImageryProvider
     */
    _createImageryProvider: function(config) {
        var imageryProvider = null;
        var options;
        if (config.mapType == "WebMapServiceImageryProvider") {
            options = {
                url: config.mapUrl,
                layers: config.wmsLayers,
                parameters: {
                    "format": "image/" + config.format,
                    "transparent": true,//保证背景透明
                },
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            imageryProvider = new Cesium.WebMapServiceImageryProvider(options);

        } else if (config.mapType == "UrlTemplateImageryProvider") {
            options = {
                url: config.mapUrl,
            };
            
            //针对中山公安的天地图（并不是实际的天地图，而且数据提供方自切图）
			if(config.mapUrl.indexOf('sz')>=0){
				options.customTags = {
                        sz: function(imageryProvider, x, y, level) {
                            return level+1;
                        }
                }
            }
            
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            imageryProvider = new Cesium.UrlTemplateImageryProvider(options);

        } else if (config.mapType == "ArcGisMapServerImageryProvider") {
            options = {
                url: config.mapUrl,
                usePreCachedTilesIfAvailable: config.usePreCachedTilesIfAvailable||false
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            imageryProvider = new Cesium.ArcGisMapServerImageryProvider(options);

        } else if (config.mapType == "PGISImageryProvider_V10") { //PGISV1.0实际上不支持标准的WMTS
            //针对公安pgis支持wmts，并且起点是-180,90，而且每个级别的分辨率固定，符合标准，但是不能通过WMTSURL请求到数据的情况
            //通过pgis服务接口，请求瓦片
            //'http://20.2.11.59:8080/EzServer/Maps/slnew/Ezmap?Service=getImage&Type=RGB&ZoomOffset=0'
            options = {
                url: config.mapUrl,
            };
            //例如：http://20.2.11.59:8080/EzServer/WMTS?service=wmts&request=GetTile&version=1.0.0&LAYER=SL_GD&tileMatrixSet=c
            //&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tile
            //从url中解析出 format layer tileMatrixSet  
            //最好：界面输入wmts的服务串，以及底图名（需要和服务中的地图名称一致），然后provider内部参数
            var urlSeg = config.mapUrl.split('&');
            var urlSegMap = new Map();
            for(var i=0;i<urlSeg.length;i++){
                var seg = urlSeg[i].split('=');
                urlSegMap.set(seg[0],seg[1]);
            }
            var urlLayer=urlSegMap.get('layer');
            var urlTileMatrixSet=urlSegMap.get('tileMatrixSet');
            var urlStyle=urlSegMap.get('style');
            var urlFormat=urlSegMap.get('format');

            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            options.online = true;
            options.mapType = "pgisV10";
            //options.format = urlFormat;//config.format || "tiles";
            //options.layer = urlLayer;//config.layer || "layer0";
            //options.tileMatrixSetID = urlTileMatrixSet;//config.layer || "layer0";
            //options.style = urlStyle;
            imageryProvider = new PGISImageryProvider_V10(options);

        } else if (config.mapType == "PGISImageryProvider_V11") {   //如果PGIS支持wmts的话
            //WMTS服务对接，公网的天地图也支持该类型；注：虽然方正国际的pgis服务有wmts服务列表，当往往不能通过wmts的URL规则请求到瓦片
            options = {
                url: config.mapUrl,
            };
            //例如：http://20.2.11.59:8080/EzServer/WMTS?service=wmts&request=GetTile&version=1.0.0&LAYER=SL_GD&tileMatrixSet=c
            //&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tile
            //从url中解析出 format layer tileMatrixSet  
            //最好：界面输入wmts的服务串，以及底图名（需要和服务中的地图名称一致），然后provider内部参数
            var urlSeg = config.mapUrl.split('&');
            var urlSegMap = new Map();
            for(var i=0;i<urlSeg.length;i++){
                var seg = urlSeg[i].split('=');
                urlSegMap.set(seg[0],seg[1]);
            }
            var urlLayer=urlSegMap.get('layer');
            var urlTileMatrixSet=urlSegMap.get('tileMatrixSet');
            var urlStyle=urlSegMap.get('style');
            var urlFormat=urlSegMap.get('format');

            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            options.online = true;
            options.format = urlFormat;//config.format || "tiles";
            options.layer = urlLayer;//config.layer || "layer0";
            options.tileMatrixSetID = urlTileMatrixSet;//config.layer || "layer0";
            options.style = urlStyle;
            options.mapType = "pgisV11";
            imageryProvider = new PGISImageryProvider_V10(options);

        }else if (config.mapType == "PGISImageryProvider_V10_Local") {
            //针对公安pgis支持wmts，并且起点是-180,90，而且每个级别的分辨率固定，符合标准
            //所以可以通过下载工具下载瓦片到本地，并存成类arcgis松散型数据
            var options = {
                url: config.mapUrl,
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            options.online = false;
            options.tilesRule = config.tilesRule;
            options.format = config.format || "tiles";
            options.layer = config.layer || "layer0";
            options.tileMatrixSetID = config.layer || "layer0";
            options.mapType = "pgisV10";
            imageryProvider = new PGISImageryProvider_V10(options);

        }else if (config.mapType == "PGISImageryProvider_V03") {
            options = {
                url: config.mapUrl,
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            options.online = (config.online == "true")||true;
            options.format = config.format || "png";
            options.originX = config.originX;//chkun wuzhong
            options.originY = config.originY;//chkun wuzhong
            imageryProvider = new PGISImageryProvider_V03(options);

        } else if (config.mapType == "PGISImageryProvider_V03_local") {
            options = {
                url: config.mapUrl,
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            options.online = (config.online == "true");
            options.format = config.format || "png";
            imageryProvider = new PGISImageryProvider_V03_local(options);

        } else if (config.mapType == "TileMapServiceImageryProvider") {
            options = {
                url: config.mapUrl,
            };
            options.tilingScheme = this._createTilingScheme(config);
            options.minimumLevel = parseInt(config.minimumLevel) || 1;
            options.maximumLevel = parseInt(config.maximumLevel) || 20;
            imageryProvider = Cesium.createTileMapServiceImageryProvider(options);
        }else if (config.mapType == "WebMapTileServiceImageryProvider"){
            options = {
                url: config.mapUrl,
            };
            //原来天地图之类的wmts服务都借用PGISImageryProvider_V11类型
            //为了更好的区分地图类型，因此后续wmts都是用WebMapTileServiceImageryProvider
            var urlLowerCase = config.mapUrl.toLowerCase();
            var urlSeg = urlLowerCase.split(/[?&]/);
            var urlSegMap = new Map();
            for(var i=0;i<urlSeg.length;i++){
                var seg = urlSeg[i].split('=');
                urlSegMap.set(seg[0],seg[1]);
            }
            var urlLayer=urlSegMap.get('layer');
            var urlTileMatrixSet=urlSegMap.get('tilematrixset');
            var urlStyle=urlSegMap.get('style');
            var urlFormat=urlSegMap.get('format');

            options.format = urlFormat;
            options.layer = urlLayer;
            options.tileMatrixSetID = urlTileMatrixSet;
            options.style = urlStyle;
            //天地图默认从0开始，minLevel = 1瓦片会出不来
            // options.minimumLevel = parseInt(config.minimumLevel) || 1;
            // options.maximumLevel = parseInt(config.maximumLevel) || 20;
            //瓦片方案
            options.tilingScheme = new Cesium.GeographicTilingScheme();
            if(config.tileMatrixLabels){
                options.tileMatrixLabels = config.tileMatrixLabels.split(',');//天地图level从1开始['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'];
            }
            imageryProvider = new Cesium.WebMapTileServiceImageryProvider(options);
        }


        if(this._debugTyle) { // LLL
            //var warn = this._logEnum.FileError + ":";
            var info = {};
            info.level = 2;//log
            info.function = 'loadImageryTile';
            info.para =[config];
            info.info = "底图显隐性:"+ config.show;
            this._mapLog(info);               
        }

        return imageryProvider;
    },

    /**
     * 设置tilingScheme属性
     */
    _createTilingScheme: function(config) {
        var tilingScheme = null;
        if (config.mapScheme == "GeographicTilingScheme") {
            tilingScheme = new Cesium.GeographicTilingScheme();
        }
        if (config.mapScheme == "WebMercatorTilingScheme") {
            tilingScheme = new Cesium.WebMercatorTilingScheme();
        }
        var west = parseFloat(config.west);
        var south = parseFloat(config.south);
        var east = parseFloat(config.east);
        var north = parseFloat(config.north);
        if (west && south && east && north) {
            tilingScheme.rectangleToNativeRectangle(new Cesium.Rectangle(west, south, east, north));
        }
        return tilingScheme;
    },
});

var _initDrawLineDeleteStyleElement = function(instance){
    var dataInfo={
        'id':'globeDeleteStyle',
        'x':0,
        'y':0,
        'imageUrl':"/vmap2/images/delete_style.png",
        'Visibility':false
    };
    instance.addPointElement('globeLayer',dataInfo,undefined,1);
    return instance.getEntityById('globeLayer','globeDeleteStyle');
};

/**
 * 地球鼠标事件，以及一些列内部属性的初始化
 */
vtron.comp.std.map.Cesium.prototype._initEvent = function() {
    if(!this._viewer) return;
    this.fire('mapLoadedEvent', '');
    
    //设置鼠标的操作
    this._viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];
    this._viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG];
    
    //鼠标图片资源:
    if(this.custom_Cursor==undefined){
        this.custom_Cursor = [];
        if(this.offsetWidth<4096&&this.offsetHeight<4096){
            //this.custom_Cursor['move']=this.addCursorStyle("image/cursor/pc_cursor/move.png",1,8,8,false);//左键平移
            this.custom_Cursor['move']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/move.png",1,10,10,false);//左键平移
            this.custom_Cursor['move-drag']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/move-drag.png",1,10,10,false);//左键平移
            this.custom_Cursor['point']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/point.png",1,0,0,false);
            this.custom_Cursor['draw-line']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/draw-line.png",1,0,0,false);//绘笔
            this.custom_Cursor['choose-line']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-line.png",1,0,0,false);//线选
            this.custom_Cursor['choose-polygon']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-polygon.png",1,0,0,false);//面选
            this.custom_Cursor['draw-polygon']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-polygon.png",1,0,0,false);//单纯画面
            this.custom_Cursor['choose-sector']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-polygon.png",1,0,0,false);//单纯画面
            this.custom_Cursor['choose-circle']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-circle.png",1,0,0,false);//圈选
            this.custom_Cursor['draw-circle']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-circle.png",1,0,0,false);//单纯画圈
            this.custom_Cursor['choose-rectangle']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/choose-rectangle.png",1,0,0,false);//四边形选择
            this.custom_Cursor['delete']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/delete.png",1,0,0,false);//四边形选择
            this.custom_Cursor['tilt']=this.addCursorStyle("/vmap2/images/cursor/pc_cursor/tilt.png",1,0,0,false); //倾斜和旋转
        }
        else{
            this.custom_Cursor['move']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/move.png",1,32,32,false);
            this.custom_Cursor['move-drag']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/move-drag.png",1,32,32,false);
            this.custom_Cursor['point']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/point.png",1,0,0,false);
            this.custom_Cursor['draw']=this.addCursorStyle("/vmap/images/cursor/wall_cursor/draw.png",1,0,0,false);
            this.custom_Cursor['tilt']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/tilt.png",1,0,0,false); 
            this.custom_Cursor['choose-line']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-line.png",1,0,0,false);
            this.custom_Cursor['choose-polygon']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-polygon.png",1,0,0,false);
            this.custom_Cursor['draw-polygon']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-polygon.png",1,0,0,false);
            this.custom_Cursor['choose-sector']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-polygon.png",1,0,0,false);
            this.custom_Cursor['choose-circle']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-circle.png",1,0,0,false);
            this.custom_Cursor['draw-circle']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-circle.png",1,0,0,false);
            this.custom_Cursor['choose-rectangle']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/choose-rectangle.png",1,0,0,false);
            this.custom_Cursor['delete']=this.addCursorStyle("/vmap2/images/cursor/wall_cursor/delete.png",1,0,0,false);
        }
    }

    //聚合图资源
    if(this._clusterIcon==undefined){
        this._clusterIcon=[];
        var stylet2=[];
        for(var i=1;i<7;i++){
            var style={};
            //style.info = '';
            style.url = '/vmap2/images/icon/'+i.toString()+'位数.png';
            this._clusterIcon.push(style);
        }                   
    }
    this._fontSizeScale = vtron.util.getFontSize(document.body)/16;

    //draw-line 删除图标
    this._globeDeleteStyleElement = _initDrawLineDeleteStyleElement(this);
    this._onDeleteStyleElement=false;//当前

    //绘线标识
    this.drawingTag = false;
    this.selectingTag = false;

    //绘图操作是否发送事件表示,默认true
    this.fireEventTag = true;

    //搜索表示
    this.searchEventType = 'mapSearch_inside';

    //历史轨迹重复坐标
    this.pathLog = [];
    this.lastPathLog = [];

    //属性初始化
    this._mousex = -1;//鼠标当前位置
    this._mousey = -1;
    this._premousex = -1;//鼠标的上一次位置
    this._premousey = -1;
    this._recordAngle = null;
    this._sectorClockWise = null;

    this._cameraHeading = 0;//相机当前角度
    this._cameraPitch = 0;
    this._cameraRoll = 0;
    this._preCameraHeading = 0;
    this._preCameraPitch = 0;
    this._preCameraRoll = 0;

    this._earthPosition = 0;
    this.useMousePickEntities=true;//默认开启鼠标移动到要素时的提示信息功能
    this._cameraAngle = 0;
    this.zoomState = false;
    //判断如果flytoRectangle ->大墙setCameraPosition -> 就不要进行其他移动相机操作（目前是moveCenter）
    this.flyFlag = false;
    this.trackPointMachine = undefined;
    //this._imageryTiles=[];//记录底图的信息[{'name':,'visible':,'invertType':}]
    //this._imageryTiles = this._imageryTiles || {};
    //this._imageryTiles[this._defaultImageryTile.name]=this._defaultImageryTile;

    //第一人称视角相关
    //开启开关
    this._onFirstPerson = false;
    //进行第一人称视角的物体（entity）
    this._firstPersonEntity = null;
    //正在进行选中高亮的物体（每次一个）
    this._pickAndHightlightEntity = null;
    this._oldFirstPersonHeading = null;

    this.mapApngMaterial = new Map();//<apngurl,canvas>
    this._mapFramesMaterial = new Map();//序列帧
    this._mapDyCircleMaterial = new Map();//动态圆的材质
    this._mapStreamingLightMaterial = new Map();//贴地流光线材质 

    //apng
    /*var purl = '/app-gongan/images/map/emergency.png';
    var canvasobj = this.mapApngMaterial.get(purl);
    if(!canvasobj){
        canvasobj = document.createElement('canvas');
        var instance = this;
        testpromise(this._viewer,purl,canvasobj).then(function(canvas){
            instance.mapApngMaterial.set(purl,canvasobj);
            var material = new Cesium.ImageMaterialProperty({
                            image: canvasobj,
                            // repeat: new Cesium.Cartesian23(0.5, 0.5),
                            transparent: true
                        });
            canvasobj.material = material;
            
            //test:提前把apng加到一个实体中，后续再用该材质，则能加快速度。
            var apngpolygon = instance._viewer.entities.add({
                    id:'test',               
                    polygon : {
                        hierarchy : {
                             positions : Cesium.Cartesian3.fromDegreesArray([0,90,
                                                                0.01,90,
                                                                0.01,89,
                                                                0,89])
                        },
                        material:new Cesium.ImageMaterialProperty({
                            image:canvas, 
                            transparent:true
                        }),
                    },
            });
            apngpolygon.show = false;
        });  
    }*/
    //apng

    this.pathTracking_startTime = undefined;//轨迹回放的开始时间，该变量用来控制重播
    
    this._baseMapColorModifyByPS = new PhotoshopMathFP({vmap2:this});//创建ps对象
    
    //点图层在相机低于20000米时显示
    //如果要给某些图层设置在某个高度范围内显示，则需要新加接口，后续补充完善
    //this._pointLayer_default_distanceDisplayCondition = 200000;
    //this._pointLayer = new Map();//记录点图层对象，方便控制点图层随高度变化的显隐

    //记录图层的最大最小显示高度
    this._layerDefaultDisplayCondition = 300000;
    this._layerDisplayCondition = new Map();//记录图层对象，方便控制点图层随高度变化的显隐

    //记录包含动态点的图层，避免每次更新都遍历datasourcecollection
    //例如：实时GPS：添加一个点，改变点的位置模拟gps，本质是点图层
    this._dynameLayer_dataSource=[];

    //轨迹图层：本质是线图层
    //历史gps轨迹：添加一个路径，让点沿路径运动
    this._pathTrackingLayer_dataSource=[];

    // 设置当前状态为 'choose-polygon-lineine|draw-line|choose-circle|choose-polygon|move|draw'
    this.changeState('move');
    // 双击选中模型
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        // 判断操作状态:绘线
        switch(this.optState) {
            case 'choose-circle':
               //若没有绘制圆直接双击，则转换为默认点选双击
				if( this.optRadius<=0){
					//删除该圆
					this.optChooseResult = false;
					// 默认双击选中节点
					pointDoubleClick(this,event.position);
				}
				else{
					 // 圆绘制结束后的空间分析
					var result = this.searchByTurf(this.searchLayerArray, this.optID, this.optState, this.optVertices, this.bufferRadius, this.optRadius,{},false);
					//chkun 如果结果为空则清除cirlce
					if(result.searchResultisNull == false){
                        if(this.fireEventTag){
                            this.fire('chooseCircle', {'optState': 'chooseCircle', 
                                'optID': this.optID, 
                                'vertices': this.optVertices, 
                                'radius': this.optRadius,
                                'circleColor':  this.circleOutlineColor
                            });
                        }
						this.optChooseResult = true;

                        //this.fire('elementRangeSelect', result);
					}
					else{
						//如果结果为空，则删除该圆
						this.layerDelete(this.optState,this.optID);
						this.optChooseResult = false;
					}
				}
				this.changeState(this.optState);//this.optState就是继续这个功能，'move'就是每次画完都回到平移状态
                break;
            case 'choose-line':
                //小于等于两个点，则转换为默认点选双击，等于是因为有个单击的点 长度+1
                if(this.optVertices.length <= 2){
                    //删除该线
                    this.optChooseResult = false;
                    //默认双击选中节点
                    pointDoubleClick(this, event.position);
                }
                else{
                    this.addLineElement(this.optState, this.optID, this.optVertices, this.polylineOutlineWidth, this.polylineOutColor,this.polylineOutColor,0,'cartesian','polyline',1);
                    var result = this.searchByTurf(this.searchLayerArray, this.optID, this.optState, this.optVertices, this.bufferRadius,0,{},false);
					if(result.searchResultisNull == false){
                        this.optChooseResult = true;
                    }
					else{
						this.optChooseResult = false;
                    }
                }
                this.changeState(this.optState);//this.optState就是继续这个功能，'move'就是每次画完都回到平移状态
                break;
            case 'draw-polygon':
                if(this.optVertices.length<=2){
                    //删除该面
                    this.optChooseResult = false;
                    // 默认双击选中节点
                    pointDoubleClick(this,event.position);
                }
                var polygonID = this.optID;
                var polygonPos = this.optVertices;
                this.changeState(this.optState,this.fireEventTag);
                if(this.fireEventTag){
                    this.fire('drawPolygon', {'optState': 'draw-polygon', 
                        'optID': polygonID, 
                        'points': polygonPos,
                        'polygonColor':  this.polygonOutlineColor
                    });
                }
                break;
            case 'draw-circle':
                if(this.optVertices.length<=2){
                    //删除该面
                    this.optChooseResult = false;
                    // 默认双击选中节点
                    pointDoubleClick(this,event.position);
                }
                var circleID = this.optID;
                var circlePos = this.optVertices;
                var circleRadius = this.optRadius;
                this.changeState(this.optState);
                //'drawCircle'和圈选重合了
                if(this.fireEventTag){
                    this.fire('drawCircle', {'optState' :'draw-circle',
                        'optID': circleID, 
                        'center': circlePos[0],     //不能返回数组
                        'radius': circleRadius,
                        'outlineWidth': this.circleOutlineWidth,
                        'circleColor':  this.circleOutlineColor
                    });
                }
                break;
            case 'choose-polygon':
				//小于等于两个点，构不成面，则转换为默认点选双击
				if(this.optVertices.length<=2){
					//删除该面
					this.optChooseResult = false;
					// 默认双击选中节点
					pointDoubleClick(this,event.position);
				}
				else{
					var result = this.searchByTurf(this.searchLayerArray, this.optID, this.optState, this.optVertices, this.bufferRadius,0,{},false);
					if(result.searchResultisNull == false){
                        if(this.fireEventTag){
                            this.fire('choosePolygon', {'optState': 'choosePolygon', 
                                'optID': this.optID, 
                                'points': this.optVertices,
                                'polygonColor':  this.polygonOutlineColor
                            });
                        }
                        this.optChooseResult = true;
                    }
					else{
                        this.optChooseResult = false;
                        //没有结果，polygon及其outline都要删除
                        this.layerDelete("choose-polygon",this.optID);
					}
				}
                this.changeState(this.optState);//this.optState就是继续这个功能，'move'就是每次画完都回到平移状态
                break;
            //扇形
            case 'choose-sector':
                //小于等于两个点，构不成面，则转换为默认点选双击
				if(this.optVertices.length<=2){
					//删除该面
					this.optChooseResult = false;
					// 默认双击选中节点
					pointDoubleClick(this,event.position);
				}else{
                    //var result = this.searchByTurf(this.searchLayerArray, this.optID, this.optState, this.optVertices, this.bufferRadius,0,{},false);
                    //搜索坐标用轮廓线的
                    var outlinePositionArr = this.getEntityById(this.optState,this.optID).hierarchy;
                    var result = this.searchByTurf(this.searchLayerArray, this.optID, this.optState, outlinePositionArr, this.bufferRadius,0,{},false);
					if(result.searchResultisNull == false){
                        if(this.fireEventTag){
                            this.fire('chooseSector', {'optState': 'chooseSector', 
                                'optID': this.optID, 
                                'points': this.optVertices,
                                'sectorColor':  this.sectorOutlineColor//之后换成扇形的
                            });
                        }
                        this.optChooseResult = true;
                    }
					else{
                        this.optChooseResult = false;
                        //没有结果，polygon及其outline都要删除
                        this.layerDelete("choose-sector",this.optID);
					}
                }
                break;
            case 'draw-line':
                var lineID = this.optID;
                var linePos = this.optVertices;
                if(this.optState=='draw-line'){
                    this.hideElements('globeLayer','globeDeleteStyle');
                }
                //标志结束
                this.selectingTag = false;
                this.changeState(this.optState,this.fireEventTag);//this.optState就是继续这个功能，'move'就是每次画完都回到平移状态,是否fire 事件的状态也要继承
                if(this.fireEventTag){
                    this.fire('drawFoldLineEvent', {'optState': this.optState, 
                        'optID': lineID, 
                        'points': linePos, 
                        'width': this.foldLineWidth, 
                        'rgb': this.foldLineColor,
                        'coordinateSystem':'cartesian', //表示是3D坐标，而'ellipsoidal' 经纬度
                        'eventState':'drawFoldLineEndTag', //结束本次绘制线
                        'synchronization': true            //同步
                    });
                }else{
                    this.fire('drawFoldLineEndEvent', {'optState': this.optState, 
                        'optID': lineID, 
                        'points': linePos, 
                        'width': this.foldLineWidth, 
                        'rgb': this.foldLineColor,
                        'coordinateSystem':'cartesian', //表示是3D坐标，而'ellipsoidal' 经纬度
                        'eventState':'drawFoldLineEndTag', //结束本次绘制线,
                        'synchronization': false           //不同步
                    });
                }
                break;
            case 'draw':
                if(this.fireEventTag){
                    this.fire('drawLineEvent', {'optState': this.optState, 
                        'optID': this.optID, 
                        'points': this.optVertices, 
                        'width': this.penLineWidth, 
                        'rgb': this.penLineColor,
                        'coordinateSystem':'cartesian', //表示是3D坐标，而'ellipsoidal' 经纬度
                        'eventState':'drawLineEndTag' //结束本次绘制线
                    });
                }

                if(this.optState=='draw-line'){
                    this.hideElements('globeLayer','globeDeleteStyle');
                }
                this.changeState(this.optState, this.fireEventTag);
                break;
            default:
                // 默认双击选中节点
				pointDoubleClick(this,event.position);
        }
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	
    //默认点选双击  zhanggang
    var pointDoubleClick = function(myThis,position){
                //var pickObject = myThis._viewer.scene.pick(position);//LLL
                var pickObject = myThis.pick(position.x,position.y,0);

                if(Cesium.defined(pickObject)) {
                    var entity = pickObject.id;
                    if(entity) {
                        //如果是线
                        if(entity.geoType == "polyline"){
                            //var lineString = entity.polyline.positions[entity.polyline.positions.length-1];       entity.polyline.positions.length-1没有这个属性
                            //var linePos = myThis.getCartographicFromCartesian(lineString.x, lineString.y, lineString.z);
                            var linePos = myThis.getCartographicFromScreenCoord(position.x,position.y);
                            var data = {
                                id: entity.id,
                                _id: "_" + entity.id,
                                x: linePos.lon,
                                y: linePos.lat,
                                info: entity.otherProperty,
                                layerName: entity.entityCollection._owner._name,
                            }
                            myThis.fire("lineDoubleClickEvent", data);
                            return;
                        }
                        //如果是面
                        if(entity.geoType == "polygon"){
                            if(entity.canChangeColor){
                                //如果面支持双击选中改变颜色
                                //前一个被选中的面颜色要改回来
                                if(myThis._pickAndHightlightEntity){
                                    myThis.polygonChangeStyle(entity.entityCollection._owner._name, {"id": myThis._pickAndHightlightEntity, "fillColor":entity.entityCollection.owner.description});
                                }
                                //拿轮廓线
                                //var outlineEntity = myThis.getEntityById(entity.entityCollection._owner._name, entity.id+'.outline');
                                myThis._pickAndHightlightEntity = entity.id;
                                var shinyTimes = 0;
                                var originColor = entity.entityCollection._owner.description.split('.');
                                var handler = setInterval(function(){
                                    shinyTimes++;
                                    if(shinyTimes == 3){
                                        clearInterval(handler);
                                    }
                                    if(shinyTimes%2==0){
                                        var fillColor = entity.entityCollection._owner.description;
                                    }else{
                                        var fillColor = originColor[0]+'.9)';
                                    }
                                    myThis.polygonChangeStyle(entity.entityCollection._owner._name, {"id": entity.id, "fillColor":fillColor});
                                },500);
                                //myThis.polygonChangeStyle(entity.entityCollection._owner._name, {"id": entity.id, "fillColor":'rgba(255,255,0,1)'});
                            }
                            //点击时鼠标的位置
                            var polygonPos = myThis.getCartographicFromCartesian(position.x, position.y, position.z);
                            var data = {
                                id: entity.id,
                                _id: "_" + entity.id,
                                x: polygonPos.lon,
                                y: polygonPos.lat,
                                info: 'null',
                                layerName: entity.entityCollection._owner._name,
                                geo: entity.polygon.hierarchy.getValue()//要转成经纬度再给前端
                            }
                            myThis.fire("polygonDoubleClickEvent", data);
                            return;
                        }
                        if(entity.polygon){
                            var centerPos = myThis.getCartographicFromCartesian(position.x, position.y, position.z);
                            var polygonDetail = {
                                id: entity.id,
                                _id: "_" + entity.id,
                                layerName: entity.entityCollection.name || entity.entityCollection._owner._name,
                                x: centerPos.lon,
                                y: centerPos.lat,
                            };
                            myThis.fire('leftClickPolygonElementEvent', polygonDetail);
                        }
                        //如果是点
                        if(entity.x||entity.y|| entity.billboard)
                        {
                            var data = {
                                id: entity.id,
                                _id: "_" + entity.id,
                                x: entity.x,
                                y: entity.y,
                                info: entity.otherProperty,
                                layerName: entity.name,
                                position: entity.position.getValue(HTMLUnknownElement)
                            }
                            myThis.fire("layerDoubleClickEvent", data);
                            return;
                        }
                        
                    }
                    if(entity || pickObject.primitive){
                        //如果是gltf或者模型
                        if((entity&&entity.geoType == 'gltf') || pickObject.primitive.geoType == 'White' || pickObject.primitive.geoType == 'Oblique'){
                            var data = {
                                id: entity? entity.id : pickObject.primitive.id,
                                position: myThis.getCartographicFromScreenCoord(position.x,position.y),
                                type: '',
                                info: entity? entity.name : pickObject.primitive.layerName,
                            }
                            if(entity&&entity.geoType == 'gltf'){
                                data.type = 'gltf';
                            }else if(pickObject.primitive.geoType == 'White'){
                                data.type = 'White';
                            }else if(pickObject.primitive.geoType == 'Oblique'){
                                data.type = 'Oblique';
                            }
                            myThis.fire("modelDoubleClickEvent",data);
                        }
                    }
                }
    };

	// 左键单击
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        var position = this._viewer.camera.pickEllipsoid(event.position);
        if(!position) return;
        // 判断操作状态:绘线
        switch(this.optState) {
            case 'choose-line':
                //线选的线和普通的线区分：线选线是米为单位，线宽和颜色是polymer传入
                //var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position); 
                //正在画的时候宽度应该是像素 将this.lineWidth改成this.brushWidth lineType默认是corrider单位米这里改成polyline单位像素
                //this.addLineElement(this.optState, this.optID, this.optVertices, 4, this.lineColor,'rgba(255, 0, 0, 0)', 0, 'cartesian', 'polyline');
                this._viewer.scene.requestRender();
                break;
            case 'draw-line':
                //普通线：自由绘笔和折线，宽度是像素，颜色和宽度需要设计接口
                //准备绘线前发送事件
                if(this.optVertices.length==0){
                    if(this.fireEventTag){
                        this.fire('drawFoldLineEvent', {'optState': this.optState, 
                            'optID': this.optID, 
                            'points': this.optVertices, 
                            'width': this.foldLineWidth, 
                            'rgb': this.foldLineColor,
                            'coordinateSystem':'cartesian', //表示是3D坐标，而'ellipsoidal' 经纬度
                            'eventState':'drawFoldLineBeginTag' //开始绘制线
                        });
                    }
                }
                if(this._onDeleteStyleElement){
                    this._onDeleteStyleElement = false;
                    this.optVertices.pop();
                }
                else{
                    //如果点和optVertices中最后一个点相同，则不push
                    var optVerticesLen = this.optVertices.length;
                    if(optVerticesLen>0&&position.x == this.optVertices[optVerticesLen-1].x && position.y == this.optVertices[optVerticesLen-1].y && position.z == this.optVertices[optVerticesLen-1].z){
                        return;
                    }
                    this.optVertices.push(position); 
                }
                //折线
                this.addLineElement(this.optState, this.optID, this.optVertices, this.foldLineWidth, this.foldLineColor,this.foldLineColor,0,'cartesian','polyline');

                //如果是绘折线，则修改删除图标的位置到倒数第二个顶点
                var linePointCount = this.optVertices.length;
                if(linePointCount>0){
                    var pos = this.optVertices[linePointCount-1];
                    var poslla = this.getCartographicFromCartesian(pos.x,pos.y,pos.z);
                    this.movePoints('globeLayer',{'id':'globeDeleteStyle','x':poslla.lon,'y':poslla.lat});
                    //改变x的大小
                    this.pointsChangeStyle('globeLayer', {'id':'globeDeleteStyle'}, "/vmap2/images/delete_style.png", 0.5);
                    this.showElements('globeLayer','globeDeleteStyle');
                }
                else{
                    this.hideElements('globeLayer','globeDeleteStyle');
                }
                this._viewer.scene.requestRender();
                break;
            case 'choose-polygon':
                var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                this.addPolygonElement(this.optState, this.optID, this.optVertices, this.polygonOutlineWidth, this.polygonOutlineColor, this.polygonOutlineColor, 0, 'cartesian');
                this._viewer.scene.requestRender();
                break;
            case 'draw-polygon':
                var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                this.addPolygonElement(this.optState, this.optID, this.optVertices, this.polygonOutlineWidth, this.polygonOutlineColor, this.polygonOutlineColor, 0, 'cartesian');
                this._viewer.scene.requestRender();
                break;
            case 'choose-sector':
                var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                //判断this.optVertices的点的个数并计算扇形的全部点，=3才是扇形
                var positionArr = [];
                var distance = 0;
                var coordType = 'ellipsoidal';
                if(this.optVertices.length<3){
                    positionArr = this.optVertices;
                }else if(this.optVertices.length == 3){
                    //计算真正的扇形
                    var firstPoint = Cesium.Cartographic.fromCartesian(this.optVertices[0]);
                    //计算半径，由第一第二个点算
                    distance = Cesium.Cartesian3.distance(this.optVertices[0],this.optVertices[1]);
                    //计算第一个点偏离正北的角度
                    var tempPositionArr = [];
                    tempPositionArr.push(this.optVertices[0]);
                    var secondTempPt = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude),35);
                    tempPositionArr.push(secondTempPt, this.optVertices[1]);
                    var firstAngle = _betweenAngle(tempPositionArr);
                    //判断第一个点的夹角的正负
                    if(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude > Cesium.Cartographic.fromCartesian(this.optVertices[1]).longitude){
                        firstAngle = -firstAngle;
                    }
                    //计算第二个点便宜正北的角度
                    var tempPositionArr_2 = [];
                    tempPositionArr_2.push(this.optVertices[0]);
                    //跟第一个点同纬度
                    var secondTempPt_2 = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude),35);
                    tempPositionArr_2.push(secondTempPt_2, this.optVertices[2]);
                    var secondAngle = _betweenAngle(tempPositionArr_2);
                    //判断第二个点的夹角的正负
                    if(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude > Cesium.Cartographic.fromCartesian(this.optVertices[2]).longitude){
                        secondAngle = -secondAngle;
                    }
                    //未开启顺时逆时判断
                    //用第二个点和第三个点的屏幕坐标x判断
                    var cartoA = this.getCartographicFromCartesian(this.optVertices[1].x,this.optVertices[1].y,this.optVertices[1].z);
                    var cartoB = this.getCartographicFromCartesian(this.optVertices[2].x,this.optVertices[2].y,this.optVertices[2].z);
                    var cartoO = this.getCartographicFromCartesian(this.optVertices[0].x,this.optVertices[0].y,this.optVertices[0].z);
                    var screenA = this.getScreenCoordFromCartographicFloat(cartoA.lon,cartoA.lat);
                    var screenB = this.getScreenCoordFromCartographicFloat(cartoB.lon,cartoB.lat);
                    var screenO = this.getScreenCoordFromCartographicFloat(cartoO.lon,cartoO.lat);
                    if(this._sectorClockWise==null){
                        //用向量叉乘去判断
                        if(((screenA.x-screenO.x)*((-screenB.y)-(-screenO.y))-(screenB.x-screenO.x)*(-(screenA.y)-(-screenO.y)))>0){
                            this._sectorClockWise = false;
                        }else{
                            this._sectorClockWise = true;
                        }
                    }
                    //console.log("A屏幕坐标：(x:"+screenA.x+",y:"+screenA.y+")\n"+"B屏幕坐标：（x:"+screenB.x+",y:"+screenB.y+")\n是否顺时针"+this._sectorClockWise);
                    
                    if(this._sectorClockWise){
                        if(firstAngle>0){
                            if((secondAngle<0) || (secondAngle>0 && secondAngle<firstAngle)){
                                secondAngle = secondAngle+360;
                            }
                        }else{
                            if(secondAngle<0 && firstAngle>secondAngle){
                                secondAngle = secondAngle+360;
                            }
                        }
                    }else{
                        if(firstAngle>0){
                            if((secondAngle<firstAngle)){
                                var temp = secondAngle;
                                secondAngle = firstAngle;
                                firstAngle = temp;
                            }else if(secondAngle>0 && secondAngle>firstAngle){
                                //第一次直接逆时针
                                var temp = secondAngle;
                                secondAngle = firstAngle+360;
                                firstAngle = temp;
                            }
                        }else{
                            if(secondAngle<0 && firstAngle>secondAngle){
                                var temp = secondAngle;
                                secondAngle = firstAngle;
                                firstAngle = temp;
                            }else if(secondAngle<0 && firstAngle<secondAngle){
                                var temp = secondAngle;
                                secondAngle = firstAngle+360;
                                firstAngle = temp;
                            }else if(secondAngle>0){
                                var temp = secondAngle;
                                secondAngle = firstAngle+360;
                                firstAngle = temp;
                            }
                        }
                    }
                    var mathResult = (((screenA.x-screenO.x)*((-screenB.y)-(-screenO.y))-(screenB.x-screenO.x)*(-(screenA.y)-(-screenO.y))));
                    //两个向量共线的时候重新确定_sectorClockWise
                    if(this._recordAngle && this._sectorClockWise!=null && (Math.round(secondAngle-firstAngle)<1 || Math.round(secondAngle-firstAngle)>359)){
                        if((this._recordAngle<mathResult && this._sectorClockWise) || (this._recordAngle>mathResult && !this._sectorClockWise)){
                            this._sectorClockWise=null;//@this._sectorClockWise;
                            this._recordAngle = null;
                            break;
                        }
                    }
                    if((secondAngle - firstAngle)>359.5){
                        break;
                    }
                    positionArr = _sectorPositionsResult(Cesium.Math.toDegrees(firstPoint.longitude), Cesium.Math.toDegrees(firstPoint.latitude), distance, firstAngle, secondAngle,this);
                    //防止抖动，将resultPolygonVertices[2],[3]换成
                    // if(this._sectorClockWise){
                    //     resultPolygonVertices[2] = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(this.optVertices[1]).longitude);
                    //     resultPolygonVertices[3] = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(this.optVertices[1]).latitude);
                    // }
                    this._recordAngle = secondAngle;
                    var _lightPositionArr = positionArr;
                    _lightPositionArr.push(positionArr[0],positionArr[1]);
                    //发光特效
                    //this.addLightPolyline(this.optState, this.optID+'.light', Cesium.Cartesian3.fromDegreesArray(_lightPositionArr), this.sectorOutlineWidth, this.sectorOutlineColor);
                    this.addPolygonElement(this.optState, this.optID, positionArr, this.sectorOutlineWidth, this.sectorOutlineColor, this.sectorOutlineColor, 0, 'ellipsoidal');
                }
                this._viewer.scene.requestRender();
                break;
            case 'choose-circle':
                // 首先判断圈的ID是否存在
                var circle = this.getEntityById(this.optState, this.optID);
                if(circle) break;
                //var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                var outlineColor = Cesium.Color.fromCssColorString(this.circleOutlineColor);
                outlineColor.alpha = 1.0;
                this.addCircleElement(this.optState, this.optID, position, 1, this.circleOutlineColor, outlineColor.toCssColorString(),4);
                this._viewer.scene.requestRender();
                break;
            case 'draw-circle':
                // 首先判断圈的ID是否存在
                var circle = this.getEntityById(this.optState, this.optID);
                if(circle) break;
                //var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                var outlineColor = Cesium.Color.fromCssColorString(this.circleOutlineColor);
                outlineColor.alpha = 1.0;
                this.addCircleElement(this.optState, this.optID, position, 1, this.circleOutlineColor, outlineColor.toCssColorString(),4);
                this._viewer.scene.requestRender();
                break;
            // case 'draw':
            //     //自由绘笔
            //     var line = this.getEntityById(this.optState, this.optID);
            //     if(line) break;
            //     //var position = this._viewer.camera.pickEllipsoid(event.position);
            //     this.optVertices.push(position);
            //     //this.addLineElement(this.optState, this.optID, this.optVertices, this.lineWidth, this.lineColor);
            //     this.addLineElement(this.optState, this.optID, this.optVertices, this.penLineWidth, this.penLineColor,this.penLineColor,0,'cartesian','polyline');
            //     break;
            //     变成弹起结束
            case 'delete':
                //var pickedObject = this._viewer.scene.pick(event.position);
                var pickedObject = this.pick(event.position.x, event.position.y, 0);
                if(pickedObject && pickedObject.id){
                    var entity = pickedObject.id;
                    //可能会删除了不是绘图以外的东西，以后要做个限制,目前先做了不删除点
                    if(entity.geoType != 'point'){
                        this.deleteElements(entity.entityCollection._owner._name, entity.id);
                        //删除成功抛出事件
                        this.fire('left_ClickDeleteEvent', {'optState': this.optState, 
                            'layerName' : entity.entityCollection._owner._name,
                            'optID': entity.id,
                            'geoType' : entity.geoType,
                            'points': entity.hierarchy || entity.position, 
                            'eventState':'deleteDone' //删除成功标志
                        });
                    }
                }else{
                    //没有找到对应实体的话
                    this.fire('left_ClickDeleteNotFoundEvent', {'optState': this.optState, 
                        'eventState':'notFondEntity' 
                    });
                }
                break;
        }
        if(event) {
            //如果是面要素，抛出面的中心点
            var pickedObject = this._viewer.scene.pick(event.position);
            if(Cesium.defined(pickedObject)){
                var polygonEntity = pickedObject.id;
                if(polygonEntity && polygonEntity.polygon){
                    var centerPos;
                    //暂时将抛出面中心改为当前鼠标点击的位置
                    if(position){
                        centerPos = this.getCartographicFromCartesian(position.x, position.y, position.z);
                    }
                    var polygonDetail = {
                        id: pickedObject.id.id,
                        _id: "_" + pickedObject.id.id,
                        layerName: pickedObject.id.entityCollection.name || pickedObject.id.entityCollection._owner._name,
                        x: centerPos.lon,
                        y: centerPos.lat,
                    };
                    this.fire('leftClickPolygonElementEvent', polygonDetail);
                }
            }
            //let position = this._viewer.camera.pickEllipsoid(event.position);
            if(position) {
                let geoCoord = this.getCartographicFromCartesian(position.x, position.y, position.z);
                let detail = {
                    type: 'left',
                    x: geoCoord.lon,
                    y: geoCoord.lat
                };
                this.fire('leftClickEvent', detail);
                this.fire('leftClickPositionEvent', detail);
            }
        }
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // 鼠标左键按下
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._mousetype ='LEFT_DOWN';
        //this.changeCursor("move");//修改为平移地图的鼠标样式
        switch(this.optState) {
            case 'draw':
                //this.drawingTag = true;
                //自由绘笔进行中
                var line = this.getEntityById(this.optState, this.optID);
                if(line) break;
                this.enableMap(false);
                var position = this._viewer.camera.pickEllipsoid(event.position);
                this.optVertices.push(position);
                //this.addLineElement(this.optState, this.optID, this.optVertices, this.lineWidth, this.lineColor);
                this.addLineElement(this.optState, this.optID, this.optVertices, this.penLineWidth, this.penLineColor,this.penLineColor,0,'cartesian','polyline');
                break;
            case 'move':
                this.changeCursor("move-drag");//修改为旋转地图的鼠标样式
            default:
                this.changeCursor("move-drag");
        }
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    // 鼠标弹起
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._mousetype ='LEFT_UP';
        //this.changeCursor(this.optState);//恢复光标样式
        switch(this.optState) {
            //鼠标弹起，自由绘笔结束
            case 'draw':
                var penLineID = this.optID;
                var penLinePos = this.optVertices;
                if(this.fireEventTag){
                    this.fire('drawLineEvent', {'optState': this.optState, 
                        'optID': penLineID, 
                        'points': penLinePos, 
                        'width': this.penLineWidth, 
                        'rgb': this.penLineColor,
                        'coordinateSystem':'cartesian', //表示是3D坐标，而'ellipsoidal' 经纬度
                        'eventState':'drawLineEndTag' //结束本次绘制线
                    });
                }
                this.changeState('move',this.fireEventTag);
                this.changeState(this.optState,this.fireEventTag);
                if(this.optState=='draw-line'){
                    this.hideElements('globeLayer','globeDeleteStyle');
                }
                this.enableMap(true);
                break;
            case 'move':
                this.fire('mouseMoveEndEvent',{
                    'optState':this.optState,
                })
                this.changeCursor("move");//修改为旋转地图的鼠标样式
            default:
                this.changeCursor(this.optState);
        }
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    // 右键单击
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        event.type = 'right';
        this._mousetype ='RIGHT_CLICK';
        //this.changeCursor("tilt");//修改为旋转地图的鼠标样式
        this.fire('rightClickEvent', event);
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    
    //右键按下
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        event.type = 'RIGHT_DOWN';
        this._mousetype ='RIGHT_DOWN';
        this.changeCursor("tilt");//修改为旋转地图的鼠标样式
        this.fire('rightDownEvent', event);
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

    //右键弹起
    this._viewer.screenSpaceEventHandler.setInputAction((event) =>{
        event.type = 'RIGHT_UP';
        this._mousetype ='RIGHT_UP';
        this.changeCursor(this.optState);//恢复光标样式
        this._viewer.camera.isRotating = false;
        //取消当前选择绘制的图形:
        //（1）图形已经绘制完成的时候取消
        if(this._mousetype2 == 'RIGHT_DOWN+MOUSE_MOVE'){
			if(this._premousex==this._mousex&&this._premousey==this._mousey){
                //增加相机角度判断，旋转会导致两次相机角度不一样
                if(this._preCameraHeading==this._cameraHeading&&this._preCameraPitch==this._cameraPitch&&this._preCameraRoll==this._cameraRoll){
                    if(this.optState == 'choose-sector' && this.optVertices.length==2){
                        //画扇形重新确定半径
                        this.optVertices.pop();
                        this.deleteElements('choose-sector',this.optID);
                        this.optVertices.push(this.getCartesianFromCartographic(this.getCartographicFromScreenCoord(event.position.x, event.position.y).lon,this.getCartographicFromScreenCoord(event.position.x, event.position.y).lat));
                        this.addPolygonElement(this.optState, this.optID, this.optVertices, this.guideLineWidth, this.sectorOutlineColor, this.sectorOutlineColor, 0);
                    }else{
                        this.deleteTmpChooseGeomtry();
                    }
                }
			}
        }
        //（2）图形还未绘制完成的时候取消
        if(this._mousetype2 == 'LEFT_UP+MOUSE_MOVE' || this._mousetype2 == 'LEFT_DOWN+MOUSE_MOVE'){
            event.type = 'RIGHT_UP';
            this._mousetype ='RIGHT_UP';
            if(this.optState == 'choose-sector' && this.optVertices.length==2){
                //画扇形重新确定半径
                this.optVertices.pop();
                this.deleteElements('choose-sector',this.optID);
                this.optVertices.push(this.getCartesianFromCartographic(this.getCartographicFromScreenCoord(event.position.x, event.position.y).lon,this.getCartographicFromScreenCoord(event.position.x, event.position.y).lat));
                this.addPolygonElement(this.optState, this.optID, this.optVertices, this.guideLineWidth, this.sectorOutlineColor, this.sectorOutlineColor, 0);
            }else{
        	    this.deleteTmpChooseGeomtry();
            }
        }
        this.fire('rightUpEvent', event);
    }, Cesium.ScreenSpaceEventType.RIGHT_UP);
    
    //MIDDLE事件
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        event.type = 'MIDDLE';
        this._mousetype ='MIDDLE';
        this.fire('middleEvent', event);
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        event.type = 'MIDDLE-UP';
        this._mousetype ='MIDDLE-UP';
        this.fire('middleUpEvent', event);
        this._viewer.camera.isRotating = false;
    }, Cesium.ScreenSpaceEventType.MIDDLE_UP);

    //wheel事件 //滚轮缩放
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        if(this._viewer.scene.hasClusterLayer){
            this._viewer.camera.isRotating = true; //有聚合图的时候这个才是true
        }
        var retValue = {};
        retValue.type = 'WHEEL';
        retValue.value = event;
        this._mousetype ='WHEEL';
        this.fire('wheelEvent', retValue);
    }, Cesium.ScreenSpaceEventType.WHEEL);

    // 鼠标移动事件
    this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._viewer.camera.isRotating = false;
        var el = window.document.body;//声明一个变量，默认值为body
        var checkDiv = this;
        //做地图操作的时候鼠标点击到非地图的div时将鼠标状态强制转为move
        window.document.body.onclick = function(event){
            if((checkDiv.optState != 'move' && checkDiv.selectingTag )|| (checkDiv.optState == 'draw' && checkDiv.drawingTag)){
                //console.log(checkDiv.optState+","+checkDiv.optVertices);
                el = event.target;//鼠标每经过一个元素，就把该元素赋值给变量el
                //console.log('当前鼠标在', el, '元素上');//在控制台中打印该变量
                //判断鼠标焦点是否在地图组件上
                //map是测试demo的
                //if(el != $("#map").get(0)){
                // if(el != $("#map-engine").get(0) && el != $("#mgrVideo-map-engine").get(0)){              
                //     if(checkDiv.optState == 'draw'){
                //         //新状态 停止draw
                //         checkDiv.changeState('drawStop');
                //     }else{
                //         checkDiv.changeState('move');
                //     }
                //     //抛出事件给前端，取消工具栏图标的选中
                //     checkDiv.fire("cancelMapSelectEvent");
                // }
                //在视频监控界面，鼠标焦点不在地图上野不会取消地图操作
                if(el != $("#map-engine").get(0)){
                    if(checkDiv.id=='map-engine'){
                        if(checkDiv.optState == 'draw'){
                            //新状态 停止draw
                            checkDiv.changeState('drawStop');
                        }else{
                            checkDiv.changeState('move');
                        }
                        //抛出事件给前端，取消工具栏图标的选中
                        checkDiv.fire("cancelMapSelectEvent");
                    }              
                    
                }
            }
        }
        //this._mousetype = 'MOUSE_MOVE';//不能设置鼠标平移！！！！！
        this._premousex = this._mousex;
        this._premousey = this._mousey;
        this._mousex = event.endPosition.x;
        this._mousey = event.endPosition.y;
        
        //this._mousetype记录鼠标按键信息（不包含mousemove）
        //this._mousetype2记录mousetype+mousemove，比如按鼠标左键并移动鼠标等等
        this._mousetype2 = this._mousetype + '+MOUSE_MOVE';

        //记录当前相机角度
        this._preCameraHeading = this._cameraHeading;
        this._preCameraPitch = this._cameraPitch;
        this._preCameraRoll = this._cameraRoll;
        this._cameraHeading = this._viewer.camera.heading;
        this._cameraPitch = this._viewer.camera.pitch;
        this._cameraRoll = this._viewer.camera.roll;
        this._earthPosition = this._viewer.camera.pickEllipsoid(event.endPosition);
        //当前鼠标点的地理坐标
        var position = this._viewer.camera.pickEllipsoid(event.endPosition);
        if(position==undefined)
            return;
        
        switch(this.optState) {
            case 'choose-line':
                //正在进行线选状态
                this.selectingTag = true;
                if(this.optVertices.length) {
                    if(position)
                    {
                        var tempLineVertices = this.optVertices.concat(position);
                        this.addLineElement(this.optState, this.optID, tempLineVertices, this.guideLineWidth, this.polylineOutlineColor,this.polylineOutlineColor,0,'cartesian','polyline');
                    }
                }
                break;
            case 'draw-line':
                //正在进行绘线状态
                this.selectingTag = true;
                // 绘制一截临时线段
                if(this.optVertices.length) {
                    if(position)
                    {
                        var tempLineVertices = this.optVertices.concat(position);
                        //this.addLineElement(this.optState, this.optID, tempLineVertices);
                        this.addLineElement(this.optState, this.optID, tempLineVertices, this.foldLineWidth, this.foldLineColor,this.foldLineColor,0,'cartesian','polyline');
                    }
                }
                break;
            case 'draw':
                //正在进行绘笔状态
                this.drawingTag = true;
                if(this.optVertices.length
                    //以下是实现按住鼠标才画线的
                    &&this._mousetype2 == 'LEFT_DOWN+MOUSE_MOVE'
                    //以下是不按住也可以画时的
                    //&&this._mousetype2 != 'LEFT_DOWN+MOUSE_MOVE' //平移地图时
                    //&&this._mousetype2 != 'RIGHT_DOWN+MOUSE_MOVE'//旋转地图时
                    ) {
                    var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                    if(position){
                        this.optVertices.push(position);
                        //this.addLineElement(this.optState, this.optID, this.optVertices);
                        this.addLineElement(this.optState, this.optID, this.optVertices, this.penLineWidth, this.penLineColor,this.penLineColor,0,'cartesian','polyline');
                    }
                }
                break;
            case 'choose-polygon':
                //正在进行面选状态
                this.selectingTag = true;
                // 绘制一截临时线段
                if(this.optVertices.length) {
                    //var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                    if(position){
                        var tempPolygonVertices = this.optVertices.concat(position);
                        this.addPolygonElement(this.optState, this.optID, tempPolygonVertices, this.guideLineWidth, this.polygonOutlineColor, this.polygonOutlineColor, 0, 'cartesian');
                    }
                }
                break;
            case 'draw-polygon':
                //正在进行面选状态
                this.selectingTag = true;
                // 绘制一截临时线段
                if(this.optVertices.length) {
                    //var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                    if(position){
                        var tempPolygonVertices = this.optVertices.concat(position);
                        this.addPolygonElement(this.optState, this.optID, tempPolygonVertices, this.guideLineWidth, this.polygonOutlineColor, this.polygonOutlineColor, 0, 'cartesian');
                    }
                }
                break;
            case 'choose-sector':
                //正在绘制扇形
                this.selectingTag = true;
                // 绘制一截临时线段
                if(this.optVertices.length) {
                    //var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                    if(position){
                        var tempPolygonVertices = this.optVertices.concat(position);
                        var resultPolygonVertices = [];
                        var coordType = '';
                        var distance = 0;
                        if(tempPolygonVertices.length>2){
                            //节点大于2,3就要开始计算节点
                            //计算真正的扇形
                            var firstPoint = Cesium.Cartographic.fromCartesian(tempPolygonVertices[0]);
                            //计算半径，由第一第二个点算
                            distance = Cesium.Cartesian3.distance(tempPolygonVertices[0],tempPolygonVertices[1]);
                            //计算第一个点偏离正北的角度
                            var tempPositionArr = [];
                            tempPositionArr.push(tempPolygonVertices[0]);
                            //跟第一个点同纬度
                            var secondTempPt = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(tempPolygonVertices[0]).longitude),35);
                            tempPositionArr.push(secondTempPt, tempPolygonVertices[1]);
                            var firstAngle = _betweenAngle(tempPositionArr);
                            //判断第一个点的夹角的正负
                            if(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude > Cesium.Cartographic.fromCartesian(this.optVertices[1]).longitude){
                                firstAngle = -firstAngle;
                            }
                            //计算扇形夹角(0-PI)
                            var secondAngle = Math.abs(firstAngle) + _betweenAngle(tempPolygonVertices);
                            //计算第二个点便宜正北的角度
                            var tempPositionArr_2 = [];
                            tempPositionArr_2.push(tempPolygonVertices[0]);
                            //跟第一个点同纬度
                            var secondTempPt_2 = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(tempPolygonVertices[0]).longitude),35);
                            tempPositionArr_2.push(secondTempPt_2, tempPolygonVertices[2]);
                            var secondAngle = _betweenAngle(tempPositionArr_2);
                            
                            //判断第二个点的夹角的正负
                            if(Cesium.Cartographic.fromCartesian(this.optVertices[0]).longitude > Cesium.Cartographic.fromCartesian(tempPolygonVertices[2]).longitude){
                                secondAngle = -secondAngle;
                            }
                            //未开启顺时逆时判断
                            //用第二个点和第三个点的屏幕坐标x判断
                            var cartoA = this.getCartographicFromCartesian(tempPolygonVertices[1].x,tempPolygonVertices[1].y,tempPolygonVertices[1].z);
                            var cartoB = this.getCartographicFromCartesian(tempPolygonVertices[2].x,tempPolygonVertices[2].y,tempPolygonVertices[2].z);
                            var cartoO = this.getCartographicFromCartesian(tempPolygonVertices[0].x,tempPolygonVertices[0].y,tempPolygonVertices[0].z);
                            var screenA = this.getScreenCoordFromCartographicFloat(cartoA.lon,cartoA.lat);
                            var screenB = this.getScreenCoordFromCartographicFloat(cartoB.lon,cartoB.lat);
                            var screenO = this.getScreenCoordFromCartographicFloat(cartoO.lon,cartoO.lat);
                            if(this._sectorClockWise==null){
                                //用向量叉乘去判断
                                if(((screenA.x-screenO.x)*((-screenB.y)-(-screenO.y))-(screenB.x-screenO.x)*(-(screenA.y)-(-screenO.y)))>0){
                                    this._sectorClockWise = false;
                                }else{
                                    this._sectorClockWise = true;
                                }
                            }
                            //console.log("A屏幕坐标：(x:"+screenA.x+",y:"+screenA.y+")\n"+"B屏幕坐标：（x:"+screenB.x+",y:"+screenB.y+")\n是否顺时针"+this._sectorClockWise);
                            
                            if(this._sectorClockWise){
                                if(firstAngle>0){
                                    if((secondAngle<0) || (secondAngle>0 && secondAngle<firstAngle)){
                                        secondAngle = secondAngle+360;
                                    }
                                }else{
                                    if(secondAngle<0 && firstAngle>secondAngle){
                                        secondAngle = secondAngle+360;
                                    }
                                }
                            }else{
                                if(firstAngle>0){
                                    if((secondAngle<firstAngle)){
                                        var temp = secondAngle;
                                        secondAngle = firstAngle;
                                        firstAngle = temp;
                                    }else if(secondAngle>0 && secondAngle>firstAngle){
                                        //第一次直接逆时针
                                        var temp = secondAngle;
                                        secondAngle = firstAngle+360;
                                        firstAngle = temp;
                                    }
                                }else{
                                    if(secondAngle<0 && firstAngle>secondAngle){
                                        var temp = secondAngle;
                                        secondAngle = firstAngle;
                                        firstAngle = temp;
                                    }else if(secondAngle<0 && firstAngle<secondAngle){
                                        var temp = secondAngle;
                                        secondAngle = firstAngle+360;
                                        firstAngle = temp;
                                    }else if(secondAngle>0){
                                        var temp = secondAngle;
                                        secondAngle = firstAngle+360;
                                        firstAngle = temp;
                                    }
                                }
                            }
                            var mathResult = (((screenA.x-screenO.x)*((-screenB.y)-(-screenO.y))-(screenB.x-screenO.x)*(-(screenA.y)-(-screenO.y))));
                            //两个向量共线的时候重新确定_sectorClockWise
                            if(this._recordAngle && this._sectorClockWise!=null && (Math.round(secondAngle-firstAngle)<1 || Math.round(secondAngle-firstAngle)>359)){
                                if((this._recordAngle<mathResult && this._sectorClockWise) || (this._recordAngle>mathResult && !this._sectorClockWise)){
                                    this._sectorClockWise=null;//@this._sectorClockWise;
                                    this._recordAngle = null;
                                    break;
                                }
                            }
                            if((secondAngle - firstAngle)>359.5){
                                break;
                            }
                            resultPolygonVertices = _sectorPositionsResult(Cesium.Math.toDegrees(firstPoint.longitude), Cesium.Math.toDegrees(firstPoint.latitude), distance, firstAngle, secondAngle,this);
                            //防止抖动，将resultPolygonVertices[2],[3]换成
                            // if(this._sectorClockWise){
                            //     resultPolygonVertices[2] = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(tempPolygonVertices[1]).longitude);
                            //     resultPolygonVertices[3] = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(tempPolygonVertices[1]).latitude);
                            // }
                            //记录每次扇形的夹角值
                            this._recordAngle = mathResult;//secondAngle - firstAngle;
                            coordType = 'ellipsoidal';
                        }else{
                            this._sectorClockWise=null;
                            resultPolygonVertices = tempPolygonVertices;
                            coordType = 'cartesian';
                        }
                        if((coordType=='cartesian'&&resultPolygonVertices.length>=2) || (coordType == 'ellipsoidal'&&resultPolygonVertices.length>=4)){
                            this.addPolygonElement(this.optState, this.optID, resultPolygonVertices, this.guideLineWidth, this.sectorOutlineColor, this.sectorOutlineColor, 0, coordType);
                        }
                    }
                }
                break;
            case 'choose-circle':
                //正在进行圈选状态
                this.selectingTag = true;
                if(this.optVertices.length) {
                    //var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                    if(position){
                        var radius = Math.max(Cesium.Cartesian3.distance(this.optVertices[0], position), 0);
                        this.optRadius = radius;
                        var outlineColor = Cesium.Color.fromCssColorString(this.circleOutlineColor);
                        outlineColor.alpha = 1.0;
                        this.addCircleElement(this.optState, this.optID, this.optVertices[0], radius,this.circleOutlineColor,outlineColor.toCssColorString(),4);
                        var labelOnShow = '当前半径:'+ radius.toFixed(0) + '米';
                        setPickeObjectLabel(this, labelOnShow, 'block');
                    }
                }  
                break;
            case 'draw-circle':
                    //正在进行圈选状态
                    this.selectingTag = true;
                    if(this.optVertices.length) {
                        //var position = this._viewer.camera.pickEllipsoid(event.endPosition);
                        if(position){
                            var radius = Math.max(Cesium.Cartesian3.distance(this.optVertices[0], position), 0);
                            this.optRadius = radius;
                            var outlineColor = Cesium.Color.fromCssColorString(this.circleOutlineColor);
                            outlineColor.alpha = 1.0;
                            this.addCircleElement(this.optState, this.optID, this.optVertices[0], radius,this.circleOutlineColor,outlineColor.toCssColorString(),4);   
                        }
                    }  
                    break;
            case 'delete':
                    this.selectingTag = true;
                    break;
            default:
                if(this.canvasWidth==0){
                    this.canvasWidth = this.offsetWidth;
                    this.canvasHeight = this.offsetHeight;
                }
                if((event.endPosition.x<0||event.endPosition.y<0)||(event.endPosition.x>this.canvasWidth||event.endPosition.y>this.canvasHeight)){
                    this.enableMap(false);
                } 
                else{
                    this.enableMap(true);
                }
                //console.log('move');
                var detail = {};
                detail.position = this._viewer.camera.position;
                detail.heading = this._viewer.camera.heading;
                detail.pitch = this._viewer.camera.pitch;
                detail.roll = this._viewer.camera.roll;
                detail.geoCoord = this.getCartographicFromCartesian(detail.position.x, detail.position.y, detail.position.z); 
                detail.pithDegree = Cesium.Math.toDegrees(detail.pitch);
                detail.positionCartographic = this._viewer.camera.positionCartographic;
                if(this._mousetype=="LEFT_DOWN"||this._mousetype=="RIGHT_DOWN"||this._mousetype =='MIDDLE'){
                    //this._mousetype = 'MOUSE_MOVE';//平移和旋转地图
                    this.fire("moveMapEvent", detail, {bubbles: false}); //鼠标按键+平移=移动地图
                }
                else{
                    this.fire("moveEvent", detail, {bubbles: false});
                }

                //在非choose和draw状态下，进行pick
                //if(this.UseMousePickEntities)
                    //_doPickedJob(this);   
        }
        
		//进行pick
		if(this.useMousePickEntities)
		  _doPickedJob(this);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //ctrol+move事件
    /*this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._mousetype = 'CTRL+MOUSE_MOVE';
        this._mousex = event.endPosition.x;
        this._mousey = event.endPosition.y;
        if((this._mousex<0||this._mousey.y<0)||(this._mousex>this.canvasWidth||this._mousey>this.canvasHeight)){
            this.enableMap(false);
        } 
        else{
            this.enableMap(true);
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE,Cesium.KeyboardEventModifier.CTRL);*/

    //shift+move事件
    /*this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._mousetype = 'SHIFT+MOUSE_MOVE';
        this._mousex = event.endPosition.x;
        this._mousey = event.endPosition.y;
        if((this._mousex<0||this._mousey.y<0)||(this._mousex>this.canvasWidth||this._mousey>this.canvasHeight)){
            this.enableMap(false);
        } 
        else{
            this.enableMap(true);
        }  
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE,Cesium.KeyboardEventModifier.SHIFT);*/

    //alt+move事件 
    /*this._viewer.screenSpaceEventHandler.setInputAction((event) => {
        this._mousetype = 'ALT+MOUSE_MOVE';
        this._mousex = event.endPosition.x;
        this._mousey = event.endPosition.y;
        if((this._mousex<0||this._mousey.y<0)||(this._mousex>this.canvasWidth||this._mousey>this.canvasHeight)){
            this.enableMap(false);
        } 
        else{
            this.enableMap(true);
        }   
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE,Cesium.KeyboardEventModifier.ALT);*/

    // 监听相机移动的事件,比如定位。地图显示范围发生改变，则会进入该函数。
    // 相机改变会外抛相机相关参数，以及 detail.info， detail.info=‘mousemove’表示由于直接使用鼠标操作地图引发的变化
    // 反之，是由于调用接口指令引发的。
    var doCameraChangedEvent = function(instance ,changeEnd=false){
        let detail = {};
            detail.position = instance._viewer.camera.positionWC;
            detail.heading = instance._viewer.camera.heading;
            detail.pitch = instance._viewer.camera.pitch;
            detail.roll = instance._viewer.camera.roll;
            detail.geoCoord = instance.getCartographicFromCartesian(detail.position.x, detail.position.y, detail.position.z); 
            detail.pithDegree = Cesium.Math.toDegrees(detail.pitch);
            detail.positionCartographic = instance._viewer.camera.positionCartographic;
            detail.info=instance._cmdinfo||"";
            //要保证只有鼠标动的时候才互相抛消息
            if((instance.optState == 'move' && instance._mousetype=='MOUSE_MOVE' )
                ||instance._mousetype=='WHEEL'
                //||instance._mousetype=="CTRL+MOUSE_MOVE"
                //||instance._mousetype=="SHIFT+MOUSE_MOVE"
                //||instance._mousetype=="ALT+MOUSE_MOVE"
                ||instance._mousetype2=="RIGHT_DOWN+MOUSE_MOVE"
                ||instance._mousetype2=="LEFT_DOWN+MOUSE_MOVE"
                ){
                    detail.info="mousemove";
                    instance._cmdinfo="";
                

                //如果当前是鼠标滚轮触发的地图缩放，则每次滚轮操作后都恢复mousetype变量
                if(instance._mousetype=='WHEEL') 
                    instance._mousetype='move';
            }
        //每次相机变化，都记录
        instance._viewer.precamera = instance._viewer.camera;
        
        var heading = instance._viewer.camera.heading;
        instance._viewer.compassangle = 360-Cesium.Math.toDegrees(heading);
        detail.compassangle = instance._viewer.compassangle;
        detail.changeEnd = changeEnd;
        var postMessage = true;
        if(!instance._viewer.preCameraDetail){
            instance._viewer.preCameraDetail = detail;
        }
        else{
            if(instance._viewer.preCameraDetail.position == detail.position 
                &&instance._viewer.preCameraDetail.heading == detail.heading
                &&instance._viewer.preCameraDetail.pitch == detail.pitch
                && instance._viewer.preCameraDetail.roll == detail.roll){
                    postMessage = false;
                }
        }
        
        //如果是moveend，并且相机高度在聚合的级间变化时发送消息
        if(changeEnd){
            //this._clusterUpdateCondition=[500,2000,4000,7000,10000,16000,32000,64000,128000]
            // var preHeight = instance._viewer.preCameraDetail.geoCoord.alt;
            // var curHeight = detail.geoCoord.alt;
            // if(preHeight!=curHeight){
            //     var preLevel = instance.heightConvertToLevel(preHeight);
            //     var curLevel = instance.heightConvertToLevel(curHeight);
            //     if(preLevel!=curLevel){
            //         var infor={};
            //         infor.mapLevel=curLevel;
            //         infor.mapHeight = curHeight;
            //         //在加载图层前抛出地图四个角的范围
            //         var viewRectangle = instance.getRegion();
            //         infor.positions = [[viewRectangle.left, viewRectangle.top],
            //                             [viewRectangle.right, viewRectangle.top],
            //                             [viewRectangle.left, viewRectangle.bottom],
            //                             [viewRectangle.right, viewRectangle.bottom]];
            //         instance.fire("heightChanged",infor,{bubbles:false});
            //     }
            // }
            var infor={};
            var curHeight = detail.geoCoord.alt;
            var curLevel = instance.getLevel();
            infor.mapLevel=curLevel;
            infor.mapHeight = curHeight;
            infor.cameraPitch = (instance._viewer.camera.pitch * 180) / Math.PI;//弧度转角度
            //在加载图层前抛出地图四个角的范围
            var viewRectangle = instance.getRegion();
            infor.positions = [[viewRectangle.left, viewRectangle.top],
                               [viewRectangle.right, viewRectangle.top],
                               [viewRectangle.left, viewRectangle.bottom],
                               [viewRectangle.right, viewRectangle.bottom]];
            instance.fire("heightChanged",infor,{bubbles:false});
        }

        if(postMessage){
            instance.fire("cameraChangeEvent", detail, {bubbles: false}); 
        }

        instance._viewer.camera.cmdormouse="";
    };

    this._viewer.camera.changed.addEventListener(() => {
        this._cameraAngle = this.getAngle();//获取相机高度/视线与椭球的交点
        doCameraChangedEvent(this, false);
    });
    var instance = this;
    //暂时用来做第一人称视角
    this._viewer.scene.preUpdate.addEventListener(function(scene, time){
        if(instance._viewer){
            if(instance._onFirstPerson){
                var hpRange = new Cesium.HeadingPitchRange();
                //每时每刻运动的坐标
                var modelCenter = instance._firstPersonEntity.position.getValue(time, modelCenter);
                var modelMatrix = instance._firstPersonEntity.computeModelMatrix(time, modelMatrix);
               
                //让每时每刻的模型矩阵去适配东北上坐标系并得到一个欧拉角（用来规定第一视角看的方向）
                var resultHPR = Cesium.Transforms.fixedFrameToHeadingPitchRoll(modelMatrix, Cesium.Ellipsoid.WGS84, Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west'), resultHPR);
                instance._oldFirstPersonHeading = hpRange.heading;
                hpRange.heading = resultHPR.heading;
                hpRange.pitch = resultHPR.pitch;
                //暂时这样做，防止拐弯变化太大
                if(instance._oldFirstPersonHeading && Math.abs(Math.abs(instance._oldFirstPersonHeading) - Math.abs(hpRange.heading)) > 0.1){
                    hpRange.heading = (hpRange.heading + instance._oldFirstPersonHeading) / 2;
                }
                //之后应该先分符号判断，如果符号不同，先往0那边靠，最后往最后的heading那边靠
                hpRange.range = 30;
                instance._viewer.camera.lookAt(modelCenter,hpRange);
            }else{
                //取消第一人称的时候
                if(!instance._viewer.trackedEntity){
                    instance._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
                }
            }
        }
    });

    //clock停下-历史轨迹目前在用
    this._viewer.clock.onStop.addEventListener(() => {
        this.fire("trackPathEndEvent");
        //this._viewer.clockViewModel.shouldAnimate = !this._viewer.clockViewModel.shouldAnimate;
        this._viewer.clock.currentTime = this.pathTracking_startTime;
    });
    this._viewer.scene.postRender.addEventListener(function(){
        if(this._viewer){
           console.log("postRender");  
        }  
    }); 

    // 键盘空格恢复默认视角
    // document.addEventListener('keydown', (e) => {
    //     switch(e.keyCode) {
    //         case 32: 
    //             this.moveReset();
    //             break;
    //         default:
    //     }
    // });

    //相机移动结束事件
    this._viewer.scene.camera.moveEnd.addEventListener(()=>{
        

        //doCameraChangedEvent(this,true);
        //控制点图层的显隐
        var curcameraHeight = this._viewer.camera.positionCartographic.height;
        var instance = this;
        /*if(curcameraHeight > this._pointLayer_default_distanceDisplayCondition && this._pointLayer.size>0){
            this._pointLayer.forEach(function(value,key,map){
                //value是应用开发设置的图层显隐，
                if(value == true){
                    var layer = instance.getDataSourceByName(key);
                    if(layer.show == true)
                         layer.show = false;
                }                
            })      
        }
        else
        {
            this._pointLayer.forEach(function(value,key,map){
                if(value == true){
                    var layer = instance.getDataSourceByName(key);
                    if(layer.show == false)
                          layer.show = true;
                }
                
            })
        }*/

        //设置图层的显隐
        //遍历this._layerDisplayCondition容器，获取到图层的最大最小显示高度范围
        //如果当前高度在范围内，则该图层显示，否则图层隐藏
        this._layerDisplayCondition.forEach(function(value,key,map){
            var layer = instance.getDataSourceByName(key);
            if(layer){
                var oldshow = layer.show;
                if(curcameraHeight>=value.minDisplayAltitude&&curcameraHeight<=value.maxDisplayAltitude){
                    if(value.visible!=false&&value.visible!=undefined)
                        layer.show = true;
                }
                else{
                    layer.show = false;
                }
                if(oldshow!=layer.show){
                    instance.fire("layer-show", {"layerName": key, show: layer.show}, {bubbles: false});                
                }
            }
        });
        doCameraChangedEvent(this, true);
        this.cameraUpdateHeatmap_webgl('setCameraPosition');
    });

    //时间动画事件
    this._viewer.clock.onTick.addEventListener((clock) => {
        if(this.pathLog.length>0){
            for(var i =0;i<this.pathLog.length;i++){
                if((this.pathLog[i].time.dayNumber == clock.currentTime.dayNumber) && (this.pathLog[i].time.secondsOfDay < clock.currentTime.secondsOfDay)){
                    var detail = {
                        "eventData": this.pathLog[i].event.eventData,
                    }
                    if(this.pathLog[i].isend !=undefined && this.pathLog[i].isend){
                        detail.isend = this.pathLog[i].isend;
                        this.fire(this.pathLog[i].event.eventName,detail);
                        this.pathLog.shift();//防止一直抛事件
                        this.pathLog = [];
                    }else{
                        this.fire(this.pathLog[i].event.eventName,detail);
                        this.pathLog.shift();
                    }
                }
            }
        }
        return;
        //获取轨迹图层
        //轨迹图层中动态线的position更新
        for(var layerObject =0;layerObject<this._pathTrackingLayer_dataSource.length;layerObject++){
            var pathTrackingLayer = this._pathTrackingLayer_dataSource[layerObject];
            for(var i=0;i<pathTrackingLayer.entities._entities.length;i++)
            {
                var entity = pathTrackingLayer.entities.values[i];
                if(!entity.position) return;
                var position = entity.position.getValue(clock.currentTime);
                if(Cesium.JulianDate.compare(clock.currentTime, this._viewer.clock.stopTime)<0){
                    entity.dyPositions = [];
                    entity.dyPositions.push(position);
                }
            }
        }
    });

    // 在每次帧刷新的时候更新序列帧位置
    //后续：当图层不显示时，不更新序列帧的状态
    this._viewer.scene.preRender.addEventListener(() =>{
        if(this._mapFramesMaterial) {
            //序列帧的控制
            this._mapFramesMaterial.forEach(function(value,key,map){
                var framesMat = value;
                framesMat.mat.uniforms.xCurrentStep = framesMat.xCurrentStep;
                framesMat.mat.uniforms.yCurrentStep = framesMat.yCurrentStep;
        
                framesMat.xCurrentStep += 1;
                framesMat.yCurrentStep += 1;
                if (framesMat.xCurrentStep >= framesMat.colNum) {
                    framesMat.xCurrentStep = 0;
                }
        
                if (framesMat.yCurrentStep >= framesMat.rowNum) {
                    framesMat.yCurrentStep = 0;
                } 
            })
        }

        //包围圈材质的转动控制
        if(this._mapDyCircleMaterial){
            this._mapDyCircleMaterial.forEach(function(value,key,map){
                var DyCircleMat = value;
                DyCircleMat.mat.uniforms.iTimer += 0.01;
            })
        }
        var instance = this;
        //流光线材质滑动控制
        if(this._mapStreamingLightMaterial){
            this._mapStreamingLightMaterial.forEach(function(value, key, map){
                var StreaminglLightMat = value;
                StreaminglLightMat.mat.uniforms.time = instance._viewer.scene._shaderControlTimer;//_shaderControlTimer目前在源码中是写死的0.02，以后动态传入
            })
        }
    });
};

/**
 * 内部log函数   LLL
 * information{
 *  level = number; // 0:error   1: warn     2:info
    function = '';
    para =[layerName,url,imageUrl......]
 * }
 */
vtron.comp.std.map.Cesium.prototype._mapLog = function(information){
    var log = "mapEngine_log:" +JSON.stringify(information)
    switch(information.level){
        case 0:
            console.error(log);//已经出现错误
            break;
        case 1:
            console.warn(log);//可能出现错误
            break;
        case 2:
            //if(this._debugTyle){
                console.log(log); //辅助性性日志
            //}
            break;
    }       
}
/**
 * 添加瓦片底图
 */
vtron.comp.std.map.Cesium.prototype.loadImageryTile = function(name, tileInfo, show = true) {
    this._imageryTiles = this._imageryTiles || {};
    var config = {
        mapType: tileInfo.mapType || tileInfo["map-type"],
        mapUrl: tileInfo.mapUrl || tileInfo["map-url"],
        wmsLayers: tileInfo.wmsLayers || tileInfo["wms-layers"],
        tileMatrixLabels: tileInfo.tileMatrixLabels || tileInfo["tileMatrixLabels"],
        format: tileInfo.format,
        minimumLevel: tileInfo.minLevel || tileInfo["min-level"],
        maximumLevel: tileInfo.maxLevel || tileInfo["max-level"],
        mapScheme: tileInfo.mapScheme || tileInfo["map-scheme"],
        west: tileInfo.west,
        south: tileInfo.south,
        east: tileInfo.east,
        north: tileInfo.north,
        online:tileInfo.online||false,
        usePreCachedTilesIfAvailable:tileInfo.usePreCachedTilesIfAvailable || false, //arcServer地图需要配置该字段
        rectangle:tileInfo.rectangle,
        originX:tileInfo["origin-x"],//chkun wuzhong
        originY:tileInfo["origin-y"],//chkun wuzhong
        show: show ///LLL
    }
    var provider = this._createImageryProvider(config);

    var layers = this._viewer.scene.imageryLayers;
    var tile = layers.addImageryProvider(provider);
    tile.invertValue=tileInfo.invertType || tileInfo["invert-type"]||0;//需要反色的值
    tile.name = name;
    this._imageryTiles[name] = tile;
    tile.show = show;
}

/**
 * 瓦片底图显示/隐藏
 */
vtron.comp.std.map.Cesium.prototype.imageryTileShow = function(name, show = true) {
    this._imageryTiles = this._imageryTiles || {};
    var tile = this._imageryTiles[name];
    if(tile){
        tile.show = show;
    }
}

/**
 * 获取所有瓦片底图的info
 * retValue:
 * [
 *   {name:地图名，invertValue：反色值，show：是否显示}
 * ]
 */
vtron.comp.std.map.Cesium.prototype.imageryTileInfo = function(){//imageryTileNames
    this._imageryTiles = this._imageryTiles || {};
    var names = [];
    //names.push({'name':this._defaultImageryTile.name,'invertValue':this._defaultImageryTile.invertValue,'show':this._defaultImageryTile.show});
    for(var name in this._imageryTiles){
        var info = {};
        info.name=name;
        info.invertValue=this._imageryTiles[name].invertValue;
        info.show = this._imageryTiles[name].show;
        names.push(info);
    }
    return names;
}

/**
 * 添加静态点图层数据，数据源是GeoJson格式，其中参数name是选中节点后判断类型的依据
 * layerName：alert|gps|yiyuan, bShowLayer: 默认显示加载层
 */
vtron.comp.std.map.Cesium.prototype.loadPointLayerGeoJsonData = function(layerName, url, imageUrl, scale = 1, height = 10, bShowLayer = true, supportSearch = false,labelShow, labelSelectField, displayField, near = 0.0, far = 100000.0) {
    if(this._debugTyle) console.log('load:'+layerName);
    supportSearch && this.searchLayerArray.push(layerName);

    //创建图层:未考虑该图层已经存在的情况
    var entitiesCollection = this.getDataSourceByName(layerName);
    if(!entitiesCollection) {
        entitiesCollection = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(entitiesCollection);

        if(this._layerDisplayCondition){
            this.setLayerDisplayCondition(layerName,near,far);
        }
    }
    entitiesCollection.show = bShowLayer;

    var instance = this;
    
    var ds = this.$$("#dsInternal"); //内部的数据请求组件shia 
    ds.load({
        url: url,
        success: (data) => {
            if((data.data&&!data.data.length)&&(data.features&&!data.features.length)) { // LLL
                var warn = this._logEnum.FileError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPointLayerGeoJsonData';
                info.para =[layerName,url,imageUrl];
                info.info = "文件数据异常!";
                this._mapLog(info);               
                return;
            }else if(data.data&&!data.features){
                data.features = data.data;
            }
            //var entitiesCollection = new Cesium.CustomDataSource(layerName);
            entitiesCollection.imageSrc = imageUrl;
            for(var i = 0, len = data.features.length; i < len; i++) {
                let geometry = data.features[i].geometry;
                let coord = geometry.coordinates;
                //存在由数据库直接加载的数据，会没有coordinates值    //LLL
                // if(!coord){
                //     var noCoordEntity = entitiesCollection.entities.add({
                //         id: data.features[i].id,
                //         billboard:{
                //             image:imageUrl,
                //             scale: this.imageScaleFactor * scale,
                //             verticalOrigin :Cesium.VerticalOrigin.BOTTOM,
                //             scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 10000, 0.1),
                //         }
                //     });
                //     continue;
                // }
                //存在由数据库直接加载的数据，会没有coordinates值
                //cesium加载geojson中的数据，里面的coordomates值必须是number
                if(!coord || typeof(coord[0]) != 'number'||typeof(coord[1]) != 'number'){
                    //创建没有坐标的entities，方便以后加坐标
                    var noCoordEntity = entitiesCollection.entities.add({
                        id: data.features[i].id,
                        billboard:{
                            image:imageUrl,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin :Cesium.VerticalOrigin.BOTTOM,
                            scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 10000, 0.1),
                            distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                        }
                    });
                    //var warn = this._logEnum.DataError + ":";
                    var info = {};
                    info.level = 1;//warn
                    info.function = 'loadPointLayerGeoJsonData';
                    info.para =[layerName,url,imageUrl];
                    info.info = "坐标数据异常";
                    this._mapLog(info); 
                    continue;
                }
                let id = data.features[i].id,
                //coord = data.features[i].geometry.coordinates,
                properties = data.features[i].properties,
                position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], height),
                entity = entitiesCollection.entities.add({
                    id: id,
                    name: layerName,
                    position: position,
                    billboard: {
                        image : imageUrl,
                        scale: this.imageScaleFactor * scale,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        //sizeInMeters : true,
                        scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(near, far),
                    }
                });
                entity.properties = properties;
                if(labelShow){
                    // 注意这里..结束
                    entity.label={
                        // position:
                        text: String(entity.properties[labelSelectField]),
                        color : Cesium.Color.fromCssColorString('#fff'),
                        font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                        showBackground : false,
                        scale : 0.5,
                        pixelOffset: new Cesium.Cartesian2(0,-40),
                        horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                        scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        pixelOffsetScaleByDistance	: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        disableDepthTestDistance : 10000.0
                    }
                }
                //entity.show = bShowLayer;
                entity.layerName = layerName;
                entity.x = coord[0];
                entity.y = coord[1];
                entity.id = id;
                entity.otherProperty = properties;
                entity.otherProperty.displayField = displayField;
            };
            //entitiesCollection.show = bShowLayer;
            //this._viewer.dataSources.add(entitiesCollection);
            if(instance._layerDisplayCondition){
                //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);

                //如果图层对象已经是隐藏的，则不修改它的显隐性
                if(entitiesCollection.show!=false)
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
            }

            //当数据大于1万，输出警告信息  LLL
            if(data.features.length>10000){
                var warn = this._logEnum.DataError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPointLayerGeoJsonData';
                info.para =[layerName,url,imageUrl];
                info.info = "点数量:"+data.features.length;
                this._mapLog(info); 
            }
            if(!this._debugTyle) {
                console.log('load Completed:'+layerName);
            }
        }
    })
    return entitiesCollection;
};

/**
 * 添加静态点图层数据，数据源是GeoJson格式，根据配置所选字段赋予不同图标
 * layerName：alert|gps|yiyuan, bShowLayer: 默认显示加载层
 */
vtron.comp.std.map.Cesium.prototype.loadPointLayerGeoJsonDataByAttribute = function(layerName, url, imageUrl, scale = 1, height = 10, bShowLayer = true, supportSearch = false, labelShow,labelSelectField, displayField, dataList, selectField, near = 0.0, far = 100000.0) {
    if(this._debugTyle) console.log('load:'+layerName);
    supportSearch && this.searchLayerArray.push(layerName);

    //创建图层:未考虑该图层已经存在的情况
    var entitiesCollection = this.getDataSourceByName(layerName);
    if(!entitiesCollection) {
        entitiesCollection = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(entitiesCollection);

        if(this._layerDisplayCondition){
            this.setLayerDisplayCondition(layerName,near,far);
        }
    }
    entitiesCollection.show = bShowLayer;

    var instance = this;
    
    var ds = this.$$("#dsInternal"); //内部的数据请求组件
    ds.load({
        url: url,
        success: (data) => {
            //if(data.data && !data.data.length) return;   //LLL
            if((data.data&&!data.data.length)&&(data.features&&!data.features.length)) { // LLL
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPointLayerGeoJsonDataByAttribute';
                info.para =[layerName,url,imageUrl];
                info.info = "文件数据异常!";
                this._mapLog(info);               
                return;
            }else if(data.data&&!data.features){
                data.features = data.data;
            }
            //var entitiesCollection = new Cesium.CustomDataSource(layerName);
            //entitiesCollection.imageSrc = imageUrl;
            for(var i = 0, len = data.features.length; i < len; i++) {
                let geometry = data.features[i].geometry;
                let coord = geometry.coordinates;
                //存在由数据库直接加载的数据，会没有coordinates值
                // if(!coord){
                //     var noCoordEntity = entitiesCollection.entities.add({
                //         id: data.features[i].id,
                //         billboard:{
                //             image:imageUrl,                             //没坐标也要有默认的图标
                //             scale: this.imageScaleFactor * scale,
                //             verticalOrigin :Cesium.VerticalOrigin.BOTTOM,
                //             scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 10000, 0.1),
                //         }
                //     });
                //     continue;
                // }

                //存在由数据库直接加载的数据，会没有coordinates值  // LLL
                //cesium加载geojson中的数据，里面的coordomates值必须是number
                if(!coord||typeof(coord[0]) != 'number'||typeof(coord[1]) != 'number'){
                    //创建没有坐标的entities，方便以后加坐标
                    var noCoordEntity = entitiesCollection.entities.add({
                        id: data.features[i].id,
                        billboard:{
                            image:imageUrl,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin :Cesium.VerticalOrigin.BOTTOM,
                            scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 10000, 0.1),
                        }
                    });
                    var info = {};
                    info.level = 1;//warn
                    info.function = 'loadPointLayerGeoJsonDataByAttribute';
                    info.para =[layerName,url,imageUrl];
                    info.info = "坐标数据异常";
                    this._mapLog(info); 
                    continue;
                }
                let id = data.features[i].id,
                    //coord = data.features[i].geometry.coordinates,
                    properties = data.features[i].properties,
                    position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], height);
                
                let entity = entitiesCollection.entities.add({
                        id: id,
                        name: layerName,
                        position: position,
                        billboard: {
                            //image : imageUrl,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            //sizeInMeters : true,
                            scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(near, far),
                        }
                    });
                //entity.show = bShowLayer;
                entity.layerName = layerName;
                entity.x = coord[0];
                entity.y = coord[1];
                entity.id = id;
                entity.otherProperty = properties;
                entity.otherProperty.displayField = displayField;
                if(labelShow){
                    // 注意这里..结束
                    entity.label={
                        // position:
                        text: String(entity.otherProperty[labelSelectField]),
                        color : Cesium.Color.fromCssColorString('#fff'),
                        font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                        showBackground : false,
                        scale : 0.5,
                        pixelOffset: new Cesium.Cartesian2(0,-40),
                        horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                        scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        pixelOffsetScaleByDistance	: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        disableDepthTestDistance : 10000.0
                    }
                }
                //传入的dataList中，根据field值和imageUrl值分别赋值entity
                if(dataList){
                    for(var j = 0;j<dataList.length;j++){
                        if(entity.otherProperty[selectField] == dataList[j].field){
                            entity.billboard.image = dataList[j].imageUrl;
                            entity.imageSrc = dataList[j].imageUrl;//鼠标放上去不会消失不见
                        }
                    }
                }
            };
            //entitiesCollection.show = bShowLayer;
            //this._viewer.dataSources.add(entitiesCollection);
            if(instance._layerDisplayCondition){
                //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);

                //如果图层对象已经是隐藏的，则不修改它的显隐性
                if(entitiesCollection.show!=false)
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
            }

            //当数据大于1万，输出警告信息  LLL
            if(data.features.length>10000){
                var warn = this._logEnum.DataError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPointLayerGeoJsonDataByAttribute';
                info.para =[layerName,url,imageUrl];
                info.info = "点数量:"+data.features.length;
                this._mapLog(info); 
            }
            if(!this._debugTyle) console.log('load Completed:'+layerName);
        }
    })
    return entitiesCollection;
};

/**
 * 添加线图层
 * bShowLayer: 默认显示加载层
 * distanceDisplay:图层的显示范围，目前修改为在setLayerDisplayCondition中设置图层的最大最小显示比例
 *                 有点是：同个图层具有相同的显隐性，而不会出现应为相机高度不同而出现同个图层某些要素显示而另一些要素隐藏。
 */
vtron.comp.std.map.Cesium.prototype.loadPolylineLayerGeoJsonData = function(layerName, url, width=5, color='rgba(0,200,0,0.8)', glowPower = 0.02, distanceDisplay = 1000, bShowLayer = true,labelShow, labelSelectField, styleEx=null, gradientColor=false,near=0.0, far = 100000.0) {
    if(this._debugTyle) console.log('load:'+layerName);

    var datasource = undefined;
    if(styleEx==null){
        datasource = this.getDataSourceByName(layerName);
        if(!datasource) {
            datasource = new Cesium.GeoJsonDataSource(layerName);
            this._viewer.dataSources.add(datasource);

            if(this._layerDisplayCondition){
                this.setLayerDisplayCondition(layerName,near,far);
            }
        }
        datasource.show = bShowLayer;
        var promise = datasource.load(url);   
        var instance = this;
        promise.then((data) => {
            data.name = layerName;
            var zIndex = 0;
            for(var i = 0, len = data.entities.values.length; i < len; i++) {
                zIndex++;
                var entity = data.entities.values[i];
                //change id with the properties'id
                entity._id = String(entity.properties.getValue(this._viewer.clock._currentTime).id);
                //entity.show = bShowLayer;
                var polyline = entity._polyline;
                // polyline.material = glowMatrial;
                if(gradientColor){
                    polyline.material = new Cesium.ImageMaterialProperty({
                        image: '/vmap2/images/outlineReverse.png',
                        transparent: true,
                        //color: new Cesium.Color(0.8,0.0,0.0,1.0)
                      });//getColorRamp(),
                }else{
                    polyline.material = Cesium.Color.fromCssColorString(color); 
                }
                //polyline.material = Cesium.Color.fromRandom({alpha : 1.0});
                polyline.width = this.imageScaleFactor * width;
                //polyline.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0.0, distanceDisplay);
                //以下两个属性使用geojson等加载路况时，不会有绘图错误的情况，但是可能要设置zindex
                polyline.clampToGround = true;
                polyline.zIndex = zIndex;
                polyline.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(near, far);
                if(labelShow){
                    //线坐标数组
                    var polylinePosArr = entity.polyline.positions.getValue();
                    //每段线路都有名字
                    for(var j=0;j<polylinePosArr.length-1;j++){
                        //每段线段计算中点
                        entity.position = Cesium.Cartesian3.midpoint(polylinePosArr[j], polylinePosArr[j+1], new Cesium.Cartesian3());
                    }
                    entity.label={
                        text: String(entity.properties[labelSelectField]),
                        color : Cesium.Color.fromCssColorString('#fff'),
                        //font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                        showBackground : false,
                        scale : 1.0,
                        horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                        scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        disableDepthTestDistance : 10000.0
                    }
                }
            }
            if(instance._layerDisplayCondition){
                //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);
                //如果图层对象已经是隐藏的，则不修改它的显隐性
                if(datasource.show!=false)
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
            }
            //当数据大于1万，输出警告信息  LLL
            if(this._debugTyle&&data.entities.values.length>10000){
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPolylineLayerGeoJsonData';
                info.para =[layerName,url,imageUrl];
                info.info = "线数量:"+data.entities.values.length;
                this._mapLog(info); 
            }
            if(!this._debugTyle) console.log('load Completed:'+layerName);
        });
    }
    /* 去掉测试：模拟道路
    else{
        //模拟道路
        datasource = this.getDataSourceByName(layerName);
        if(!datasource) {
            datasource = new Cesium.CustomDataSource(layerName);
            this._viewer.dataSources.add(datasource);
        }
        datasource.show = bShowLayer;
        
        // styleEx = {
        //     baseWidth：10,
        //     baseColor ：Cesium.Color.WHITE,
        //     baseImage:,
        //     centerLineWidth: 50 ,//像素
        //     centerLineColor: Cesium.Color.WHITE
        // };
        // var tmaterial = new Cesium.ImageMaterialProperty({
        //       image : styleEx.baseImage||"",
        //       repeat : new Cesium.Cartesian2(1, 1)
        // });

        var ds = this.$$("#dsInternal"); //内部的数据请求组件
        ds.load({
            url: url,
            success: (data) => {
                data.features.forEach((line) => {
                    var wgs84_data=[]; 
                    for(var i=0;i<line.geometry.coordinates.length;i++){
                        wgs84_data.push(line.geometry.coordinates[i][0]);
                        wgs84_data.push(line.geometry.coordinates[i][1]);
                    }
                    datasource.add({
                       //name : 'Red line on terrain',
                        orridor:{
                            positions : Cesium.Cartesian3.fromDegreesArray(wgs84_data),
                            width : styleEx.baseWidth||50,//100.0,
                           // material : tmaterial,
                            clampToGround : true,
                            outline:true,
                            outlineColor : Cesium.Color.WHITE,
                            cornerType: Cesium.CornerType.BEVELED               
                        },
                        polyline : {
                            positions : Cesium.Cartesian3.fromDegreesArray(wgs84_data),
                            width :styleEx.centerLineWidth,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                glowPower : 0.1,
                                color : Cesium.Color.WHITE,//styleEx.centerLineColor
                            }),
                            clampToGround : true
                        }
                   });
                })
                //this._viewer.dataSources.add(datasource);
                if(!this._debugTyle) console.log('load Completed:'+layerName);//test
            }
        });
    }
    */
    this.fire('polylineLayerLoaded', layerName);
    return datasource;
};

/**
 * 按照配置属性添加线图层
 * bShowLayer: 默认显示加载层
 * distanceDisplay:图层的显示范围，目前修改为在setLayerDisplayCondition中设置图层的最大最小显示比例
 *                 有点是：同个图层具有相同的显隐性，而不会出现应为相机高度不同而出现同个图层某些要素显示而另一些要素隐藏。
 */
vtron.comp.std.map.Cesium.prototype.loadPolylineLayerGeoJsonDataByAttribute = function(layerName, url, width=5, bShowLayer = true,labelShow, labelSelectField,styleEx=null, selectField, attributeInfo,near = 0,far = 100000) {
    if(this._debugTyle) console.log('load:'+layerName);

    var datasource = undefined;
    if(styleEx==null){
        datasource = this.getDataSourceByName(layerName);
        if(!datasource) {
            datasource = new Cesium.GeoJsonDataSource(layerName);
            this._viewer.dataSources.add(datasource);

            if(this._layerDisplayCondition){
                this.setLayerDisplayCondition(layerName,near,far);
            }
        }
        datasource.show = bShowLayer;
        var promise = datasource.load(url);   
        var instance = this;
        promise.then((data) => {
            data.name = layerName;
            var zIndex = 0;
            for(var i = 0, len = data.entities.values.length; i < len; i++) {
                zIndex++;
                var entity = data.entities.values[i];
                entity._id = String(entity.properties.getValue(this._viewer.clock._currentTime).id);
                //entity.show = bShowLayer;
                var polyline = entity._polyline;
                for(var j = 0; j< attributeInfo.length;j++){
                    if(entity.properties[selectField]._value == attributeInfo[j].field){
                        polyline.material = Cesium.Color.fromCssColorString(attributeInfo[j].color);//颜色
                    }
                }
                // polyline.material = glowMatrial;
                polyline.width = this.imageScaleFactor * width;
                //polyline.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0.0, distanceDisplay);
                //以下两个属性使用geojson等加载路况时，不会有绘图错误的情况，但是可能要设置zindex
                polyline.clampToGround = true;
                polyline.zIndex = zIndex;
                polyline.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(near, far);
                if(labelShow){
                //线坐标数组
                var polylinePosArr = entity.polyline.positions.getValue();
                //每段线路都有名字
                for(var j=0;j<polylinePosArr.length-1;j++){
                    //每段线段计算中点
                    entity.position = Cesium.Cartesian3.midpoint(polylinePosArr[j], polylinePosArr[j+1], new Cesium.Cartesian3());
                }
                entity.label={
                    text: String(entity.properties[labelSelectField]),
                    color : Cesium.Color.fromCssColorString('#fff'),
                    //font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                    showBackground : false,
                    scale : 1.0,
                    horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                    scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                    disableDepthTestDistance : 10000.0
                    }
                }
            }
            if(instance._layerDisplayCondition){
                //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);
                //如果图层对象已经是隐藏的，则不修改它的显隐性
                if(datasource.show!=false)
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
            }
            //当数据大于1万，输出警告信息  LLL
            if(this._debugTyle&&data.entities.values.length>10000){
                var warn = this._logEnum.DataError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'loadPolylineLayerGeoJsonDataByAttribute';
                info.para =[layerName,url,imageUrl];
                info.info = "线数量:"+data.entities.values.length;
                this._mapLog(info); 
            }
            if(!this._debugTyle) console.log('load Completed:'+layerName);
        });
    }
    this.fire('polylineLayerLoaded', layerName);
    return datasource;
};

/**
 * 添加建筑物图层
 * bShowLayer: 默认显示加载层
 * type:0 普通的显示
 *      1  拔高处理
 */
vtron.comp.std.map.Cesium.prototype.loadPolygonLayerGeoJsonData = function(layerName, url, imageUrl, bShowLayer = true,fillColor=this.polygonOutlineColor,outlineColor=this.polygonOutlineColor,lineWidth=this.polygonOutlineWidth,type=0,labelShow, labelSelectField, near, far) {
    if(this._debugTyle) console.log('load:'+layerName);
    //log 信息
    var vertexCount = 0;
    var entitiesCollection = this.getDataSourceByName(layerName);
    if(type==0){
        if(!entitiesCollection) {
            entitiesCollection = new Cesium.GeoJsonDataSource(layerName);
            this._viewer.dataSources.add(entitiesCollection);
            if(this._layerDisplayCondition){
                this.setLayerDisplayCondition(layerName,near,far);
                this.setLayerDisplayCondition(layerName+'.outline',near,far);
            }
        }
        
        //判断传入的颜色
        //1.有轮廓颜色，根据轮廓颜色算填充颜色
        if(outlineColor){
            if(!fillColor){
                var tempColor = Cesium.Color.fromCssColorString(outlineColor);
                fillColor = 'rgba(' + tempColor.red*255 + ',' + tempColor.green*255 + ',' + tempColor.blue*255 + ',' + 0.4 +')';
            }
        }
        //2.有填充颜色反算轮廓颜色
        if(fillColor){
            if(!outlineColor){
                var tempColor = Cesium.Color.fromCssColorString(fillColor);
                outlineColor = 'rgba(' + tempColor.red*255 + ',' + tempColor.green*255 + ',' + tempColor.blue*255 + ',' + 1.0 +')';
            }
        }

        //添加轮廓线
        var tempDatasource = new Cesium.CustomDataSource(layerName+'.outline');
        this._viewer.dataSources.add(tempDatasource);

        var promise = entitiesCollection.load(url, {
            stroke: Cesium.Color.fromCssColorString(outlineColor),
            fill: Cesium.Color.fromCssColorString(fillColor),
            //strokeWidth: lineWidth
            //name:layerName
        });

        var instance = this;
        //var positionArr = [];
        promise.then((data) => {
            //data.show = bShowLayer;
            data.name = layerName;
            var entities = data.entities.values;
            for(var i = 0;i<entities.length;i++){
                var entity = entities[i];
                entity._id = String(entity.properties.getValue(this._viewer.clock._currentTime).id);
                entity.geoType = 'polygon';
                vertexCount += entity.polygon.hierarchy._value.positions.length;//统计顶点总数 LLL
                // for(var m = 0;m<entity.polygon.hierarchy._value.positions.length;m++){
                //     if(m != entity.polygon.hierarchy._value.positions.length-1){
                //         var pieceLine = entity.polygon.hierarchy._value.positions.slice(m, m+2);
                //         positionArr.push(pieceLine);
                //     }else{
                //         //最后一个点要和第一个点成环
                //         positionArr.push([entity.polygon.hierarchy._value.positions[m], entity.polygon.hierarchy._value.positions[0]]);
                //     }
                // }
                entity.polygon.distanceDisplayCondition= new Cesium.DistanceDisplayCondition(near, far);
                if(labelShow){
                    //标注
                    var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);//暂时是贴地的
                    entity.position = polyCenter;
                    // 注意这里..结束
                    entity.label={
                        // position:
                        text: String(entity.properties[labelSelectField]._value),
                        color : Cesium.Color.fromCssColorString('#fff'),
                        font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                        showBackground : false,
                        scale : 1.0,
                        horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                        scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                        disableDepthTestDistance : 10000.0
                    }
                }
                //额外添加轮廓线
                if(lineWidth>1){
                    var outlineEntity = tempDatasource.entities.add({
                        id: String(entity.properties.getValue(this._viewer.clock._currentTime).id)+'.outline',
                        polyline: {
                            positions: entity.polygon.hierarchy._value.positions,//Cesium.Cartesian3.fromDegreesArrayHeights([start.lon, start.lat, start.alt, stop.lon, stop.lat, stop.alt]),
                            width: lineWidth,
                            distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                            material: Cesium.Color.fromCssColorString(outlineColor),
                        }
                    });
                }
            }
            //this._viewer.dataSources.add(data);
            if(instance._layerDisplayCondition){
                //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);
                //如果图层对象已经是隐藏的，则不修改它的显隐性
                if(entitiesCollection.show!=false){
                
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
                    //轮廓线也是
                    _iniLayerDisplayConditionVisible(instance,layerName+'.outline',bShowLayer);
                }
            }
        });
        entitiesCollection.show = bShowLayer;
        tempDatasource.show = bShowLayer;
        entitiesCollection.name = layerName;
        //单击面要素抛出面的所属图层信息
        entitiesCollection.entities.name = layerName;
        //reset颜色的时候用
        entitiesCollection.description = fillColor;

        //当数据大于10万，输出警告信息  LLL
        if(this._debugTyle&&vertexCount>100000){
            var info = {};
            info.level = 1;//warn
            info.function = 'loadPolygonLayerGeoJsonData';
            info.para =[layerName,url,imageUrl];
            info.info = "面图层包含的顶点总数量:"+vertexCount;
            this._mapLog(info); 
        }
        if(!this._debugTyle) console.log('load Completed:'+layerName);
    }
    /* 暂时不处理拔高
    else{
        if(!entitiesCollection) {
            entitiesCollection = new Cesium.CustomDataSource(layerName);
            entitiesCollection.show = bShowLayer;
            this._viewer.dataSources.add(entitiesCollection);
        }
        var ds = this.$$("#dsInternal"); //内部的数据请求组件
        ds.load({
            url: url,
            success: (data) => {
                if(data.data && !data.data.length) return;
                var material = new Cesium.ImageMaterialProperty({
                    image: imageUrl,
                    // repeat: new Cesium.Cartesian23(0.5, 0.5),
                    transparent: true
                });
                 // var entitiesCollection = this.getDataSourceByName(layerName);
                 // if(!entitiesCollection) {
                 //     entitiesCollection = new Cesium.CustomDataSource(layerName);
                 //     this._viewer.dataSources.add(entitiesCollection);
                 // }
                for(var i = 0, len = data.features.length; i < len; i++) {
                    var coord = data.features[i].geometry.coordinates;
                    var properties = data.features[i].properties;
                    var id = data.features[i].id,
                        positions = [],
                        maxHeights = [];
                    properties.HIGHT = properties.HIGHT || 0;
                    for(var j = 0, len2 = coord.length; j < len2; j++) {
                        var points = coord[j];
                        // 防止多边形不闭合
                        if(JSON.stringify(points[0]) != JSON.stringify(points[points.length -1])) {
                            points.push(points[0]);
                        }
                        for(var k = 0, len3 = points.length; k < len3; k++) {
                            positions.push(points[k][0]);
                            positions.push(points[k][1]);
                            maxHeights.push(properties.HIGHT);
                        }
                    }
                    let entity = entitiesCollection.entities.add({
                        id: id,
                        name: layerName,
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(positions),
                            material: Cesium.Color.fromCssColorString('#85fbc8').withAlpha(0.9),
                            outlineColor: Cesium.Color.fromCssColorString('#27cdeb').withAlpha(1),
                            outline: true,
                            height: properties.HIGHT
                        },
                        wall: {
                            positions:  Cesium.Cartesian3.fromDegreesArray(positions),
                            maximumHeights: maxHeights,
                            material: material,
                        }
                    });
                    //entity.show = bShowLayer;
                    entity.layerName = layerName;
                    entity.otherProperty = properties;
                    entity.height = properties.HIGHT;
                    entity.heightNums = coord[0].length;
                };
                //entitiesCollection.show = bShowLayer;
                if(!this._debugTyle) console.log('load Completed:'+layerName);
            }
        })
    }
    */
   return entitiesCollection;
};

/**
 * 按属性赋值各个面颜色
 * 参数解释：
 * layerName: 图层名称
 * url: geojson所在地址
 * bShowLayer: 默认是否可视
 * outlineColor: 轮廓线颜色
 * selectField: 根据geojson文件中该字段进行属性颜色赋值或者拔高,string，例如"id"
 * attributeInfo: {     //selectField字段中，每个属性值的具体面颜色/具体面拔高高度，例如： selectField字段为："area_name", attributeInfo:{field: "天河区", color: 'rgba(0,0,255,1)', height: 5000}
 *      field: xxx,//string,例如"id"
 *      color: xxx,//'rgba(x,x,x,x)'
 *      height: xxx,//number拔高高度
 * }
 * outlineWidth: 轮廓线宽度
 * labelShow: 是否显示label
 * labelSelectField： label显示的字段
 */
vtron.comp.std.map.Cesium.prototype.loadPolygonLayerGeoJsonDataByAttribute = function(layerName, url, bShowLayer = true, outlineColor, selectField,attributeInfo,outlineWidth,labelShow,labelSelectField,near = 0,far = 100000){
    if(this._debugTyle) console.log('load:'+layerName);
    var vertexCount = 0;//LLL
    var entitiesCollection = this.getDataSourceByName(layerName);
    if(!entitiesCollection) {
        entitiesCollection = new Cesium.GeoJsonDataSource(layerName);
        this._viewer.dataSources.add(entitiesCollection);
        if(this._layerDisplayCondition){
            this.setLayerDisplayCondition(layerName,near,far);
            this.setLayerDisplayCondition(layerName+'.outline',near,far);
        }
    }
    //添加轮廓线
    var tempDatasource = new Cesium.CustomDataSource(layerName+'.outline');
    this._viewer.dataSources.add(tempDatasource);

    var promise = entitiesCollection.load(url, {
        stroke: Cesium.Color.fromCssColorString(outlineColor),
        strokeWidth: 1,
        //name:layerName
    });

    //记录所有实体坐标数组
    var positionArr = [];
    var instance = this;
    promise.then((data) => {
        //data.show = bShowLayer;
        data.name = layerName;
        var entities = data.entities.values;
        entity._id = String(entity.properties.getValue(this._viewer.clock._currentTime).id);
        for(var i = 0;i<entities.length;i++){
            var entity = entities[i];
            vertexCount += entity.polygon.hierarchy._value.positions.length;//统计顶点总数 LLL
            //每个实体的数组
            //未考虑拔高面的轮廓线
            for(var j = 0; j< attributeInfo.length; j++){
                if(entity.properties[selectField]._value == attributeInfo[j].field){
                    entity.polygon.material = Cesium.Color.fromCssColorString(attributeInfo[j].color);//颜色
                    entity.polygon.extrudedHeight = attributeInfo[j].height;
                    entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(near, far);
                    if(labelShow){
                        //标注
                        var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                        var centerCarto = new Cesium.Cartographic.fromCartesian(polyCenter);
                        centerCarto.height = Number(entity.polygon.extrudedHeight._value);
                        polyCenter = new Cesium.Cartographic.toCartesian(centerCarto);
                        //polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);//暂时是贴地的
                        entity.position = polyCenter;
                        // 注意这里..结束
                        entity.label={
                            // position:
                            text: String(entity.properties[labelSelectField]._value),
                            color : Cesium.Color.fromCssColorString('#fff'),
                            font:'bold 36px MicroSoft YaHei',//'normal 32px MicroSoft YaHei',
                            showBackground : false,
                            scale : 1.0,
                            horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                            distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 20000, 0.3),
                            disableDepthTestDistance : 10000.0
                        }
                    }
                    
                    if(entity.polygon.extrudedHeight<1){
                        entity.polygon.extrudedHeight = 0;
                    }
                    if(outlineWidth>1){
                        var outlineEntity = tempDatasource.entities.add({
                            id: String(entity.properties.getValue(this._viewer.clock._currentTime).id)+'.outline',
                            polyline: {
                                positions: entity.polygon.hierarchy._value.positions,//Cesium.Cartesian3.fromDegreesArrayHeights([start.lon, start.lat, start.alt, stop.lon, stop.lat, stop.alt]),
                                width: outlineWidth,
                                distanceDisplayCondition : new Cesium.DistanceDisplayCondition(near, far),
                                material: Cesium.Color.fromCssColorString(outlineColor),
                            }
                        });
                    }
                }
            }
        }
        
        
        if(instance._layerDisplayCondition){
            //instance.setLayerDisplayCondition(layerName,data.minDisplayAltitude,data.maxDisplayAltitude);
            //如果图层对象已经是隐藏的，则不修改它的显隐性
            if(entitiesCollection.show!=false)
                {
                    _iniLayerDisplayConditionVisible(instance,layerName,bShowLayer);
                    //轮廓线也是
                    _iniLayerDisplayConditionVisible(instance,layerName+'.outline',bShowLayer);
                }
        }
    });
    entitiesCollection.show = bShowLayer;
    tempDatasource.show = bShowLayer;
    entitiesCollection.name = layerName;
    //单击面要素抛出面的所属图层信息
    entitiesCollection.entities.name = layerName;
    //reset颜色的时候用
    //entitiesCollection.description = ;

    //当数据大于10万，输出警告信息  LLL
    if(this._debugTyle&&vertexCount>100000){
        var warn = this._logEnum.DataWarn + ":";
        var info = {};
        info.level = 1;//warn
        info.function = 'loadPolygonLayerGeoJsonDataByAttribute';
        info.para =[layerName,url,imageUrl];
        info.info = "面图层包含的顶点总数量:"+vertexCount;
        this._mapLog(info); 
    }
    if(!this._debugTyle) console.log('load Completed:'+layerName);
}

/**
 * 添加部分点, 指定图层的名称，在相应的图层下添加点，否则建立临时层存部分点
 * layerName：alert|gps|yiyuan, bShowLayer: 默认显示加载层
 * isScaleByDistance: 是否开启图标大小跟随
 * 如果dataInfo里面有一个属性是labelInfo,带有lable的信息，还有个useLabel属性，如果是true就启用这个点的label
 * dataInfo:{
 *      'x'
 *      'y'
 *      'id'
 *      'useLabel': true, //true且labelInfo里面有东西才会启用
 *      'labelInfo':{
 *          'text': 点标注文本名
 *          'labelScale': pc端中文本标注的scale，大墙端会自动适配，和标注文字的字体字号一起影响标注大小
 *          'color':字体颜色，没传就默认白色
 *          'font': 字体字号，没传就默认'30px bold sans-serif' 格式是'字体大小 效果 字号'
 *      }
 * }
 */
vtron.comp.std.map.Cesium.prototype.addPointElement = function(layerName, dataInfo, imageUrl, scale = 1, height = 0, bShowLayer = true, supportSearch = false, isScaleByDistance = true) {
    if(!this._viewer) return;
    if(!layerName) layerName = 'tempLayer';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        //supportSearch && this.searchLayerArray.push(layerName);
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
        this.setLayerDisplayCondition(layerName);
        if(bShowLayer!=undefined){
            _iniLayerDisplayConditionVisible(this,layerName,bShowLayer);
        }
    }
    supportSearch && this.searchLayerArray.push(layerName);
    datasource.imageSrc = imageUrl;

    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var instance = this;
    dataInfo.forEach((data) => {
        if(data.x&&data.x!=0 && data.y&&data.y!=0){
            var position = Cesium.Cartesian3.fromDegrees(data.x, data.y, height);
            var entity = datasource.entities.getById(data.id);
            var imagematerial = data.imageUrl||imageUrl;
            var imagePicked = data.imageUrlPicked;
            var verticalOriginType = data.verticalOriginType||Cesium.VerticalOrigin.BOTTOM;
            if(data.imageType=='apng'){
                imagematerial = addApng(instance,data.imageUrl);//billboard的apng不能动！
            }
            //判断图标绘制垂直原点位置
            if(verticalOriginType){
                /*  verticalOriginType代表点图标垂直原点位置类型
                    verticalOriginType = -2     -> Cesium.VerticalOrigin.CENTER
                    verticalOriginType = -1     -> Cesium.VerticalOrigin.TOP
                    verticalOriginType = 1      -> Cesium.VerticalOrigin.BOTTOM
                    verticalOriginType = 2      -> Cesium.VerticalOrigin.BASELINE
                 */
                if(verticalOriginType == -2){
                    verticalOriginType = Cesium.VerticalOrigin.CENTER;
                }
            }
            if(entity){
                //先只更新坐标和图片
                entity.position=position;

                entity.billboard.image = imagematerial;
            }
            else{
                if(data.imageType=='frames'){
                    entity = datasource.entities.add({
                        id:data.id,
                        name:layerName,
                        position: position,
                        billboard: {
                            image :  imagematerial,
                            height : data.width,
                            width : data.height,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        }
                    }); 
                    entity.useFrames = true;
                    entity.billboardColNum = data.colNum;
                    entity.billboardRowNum = data.rowNum;   
                    datasource.useFrames = true;
                }else{
                    entity = datasource.entities.add({
                        id: data.id,
                        name:layerName,
                        _weight: 1,//ljyi 为了散点也可以开启聚合图
                        position: position,
                        billboard: {
                            image : imagematerial,//data.imageUrl||imageUrl,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin: verticalOriginType||Cesium.VerticalOrigin.BOTTOM,
                            //scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                            //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000)
                        }
                    }); 
                    if(isScaleByDistance){
                        //开启跟随距离缩放图标
                        entity.billboard.scaleByDistance = new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1);
                    }
                    //如果要开启label 且label的信息部位
                    if(data.useLabel && (JSON.stringify(data.labelInfo)!="{}")){
                        var labelColor = data.labelInfo.color || 'rgba(0,0,0,1)';
                        entity.label = new Cesium.LabelGraphics({
                            text:data.labelInfo.text,
                            scale : this.imageScaleFactor*0.9*data.labelInfo.labelScale*scale,
                            pixelOffset: new Cesium.Cartesian2(0,-30*data.labelInfo.labelScale*scale*this.imageScaleFactor),//label的scale和pixelOffset要和地图整体图标缩放比，Billboard的scale保持一致
                            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1000,2.8,100000,0.5),
                            horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
                            showBackground: true,
                            backgroundColor: Cesium.Color.fromCssColorString('#0f2b5c'),
                            color:Cesium.Color.fromCssColorString(labelColor),
                            show: true,
                            font: data.labelInfo.font || '30px bold Georgia',
                        });
                        entity.billboard.scale = entity.billboard.scale*data.labelInfo.labelScale;
                        if(isScaleByDistance){
                            entity.label.scaleByDistance = new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1);
                        }
                    }
                }      
            }
            
            entity.imageSrc = imagematerial;//imageUrl||data.imageUrl;//初始设置的图标
            entity.imagePicked = imagePicked;
            entity.show = (typeof(data.Visibility)=="boolean")?data.Visibility:bShowLayer;
            entity.layerName = layerName;
            entity.start_x = data.x;//记录点的初始位置 chkun
            entity.start_y = data.y;
            entity.distance = null;
            entity.normalize = null;
            entity.vec = null;
            //entity.pathTrack = [data.x,data.y,0]; 
            entity.pathTrack = []; 
        }
        else{
            var entity = datasource.entities.getById(data.id);
            if(!entity){
                entity = datasource.entities.add({
                        id: data.id,
                        position: data.position,
                        billboard: {
                            image : data.imageUrl||imageUrl,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin: verticalOriginType||Cesium.VerticalOrigin.BOTTOM,
                            scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                        },
                        name:layerName,
                    }); 
                entity.pathTrack = []; 
            }
            //坐标为空的点，log LLL
            if(this._debugTyle){
                var info = {};
                info.level = 1;//warn
                info.function = 'addPointElement';
                info.para =[layerName,data.id];
                info.info = "添加点的坐标为空!";
                this._mapLog(info); 
            }
        }  
        
        entity.pathRender = [];  
        entity.x = data.x;        
        entity.y = data.y;
        entity.otherProperty = data.info;
        entity.geoType = 'point';
    });
    datasource._clusterChildren = dataInfo;
    //抛出图层名以及图层中的数据量
    var pointLayerDetail = {
        layerName: layerName,
        dataCount: dataInfo.length,
    }
    this.fire('pointLayerAddEvent', pointLayerDetail);
};

/*
* addPointElementEx 将丢弃
 */
vtron.comp.std.map.Cesium.prototype.addPointElementEx = function(layerName, dataInfo, imageUrl, scale = 1, height = 0, bShowLayer = true, supportSearch = false) {
    if(!this._viewer) return;
    if(!layerName) layerName = 'tempLayer';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        supportSearch && this.searchLayerArray.push(layerName);
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }

    // if(this._pointLayer){
    //     this._pointLayer.set(layerName,bShowLayer||true);
    // }

    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var position = Cesium.Cartesian3.fromDegrees(data.x, data.y, height);
        var entity = datasource.entities.add({
            id: data.id,
            position: position,
            billboard: {
                image : data.imageUrl||imageUrl,
                scale: this.imageScaleFactor * scale,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000)
            }
        });
        entity.x = data.x;
        entity.y = data.y;
        entity.otherProperty = data.info;
        entity.show = bShowLayer;
    });
};

/*
*  设置点位置跟踪 ：针对GPS图层（动态点图层）
*  layername：图层名
*  dataInfo：点实体的id array
*  swithch: true：开启跟踪，当点位置变化时，会抛出事件
*           false:关闭跟踪，不再监听点位置变化，不抛事件
 */
vtron.comp.std.map.Cesium.prototype.setPointPositionTrack = function(layerName, dataInfo,track=false) {
    //查找到该点，并设置点的tracked属性
    if(!layerName) return '未设置图层名！';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        //图层不存在！log LLL
        if(this._debugTyle){
            var warn = this._logEnum.OtherError + ":";
            var info = {};
            info.level = 1;//warn
            info.function = 'setPointPositionTrack';
            info.para =[layerName];
            info.info = "图层不存在！";
            this._mapLog(info); 
        }
        return '图层不存在！';
    }
    
    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data);
        if(entity){
           entity.tracked = track;
        }
        else{
            //return '点不存在！';
            if(this._debugTyle){
                var warn = this._logEnum.OtherError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'setPointPositionTrack';
                info.para =[layerName,data];
                info.info = "点不存在！";
                this._mapLog(info); 
            }
        }
    });
};

/**
 * 添加Primitive平面，适用与需要修改方向的面
 * height2:距离地面的高度
 * GPS带拖尾
 */
vtron.comp.std.map.Cesium.prototype.addPrimitivePanel = function(layerName, dataInfo, imageUrl, width, height, height2 = 10, bShowLayer = true) {
    if(!this._viewer||!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }
    // 角度初始化
    var heading = Cesium.Math.toRadians(0.0),
        pitch = 0,
        roll = 0.0,
        hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

    fetch(imageUrl).then((response) => {
        return response.blob();
    }).then((imageBlob) => {
        let image = new Image();
        image.src = URL.createObjectURL(imageBlob);
        let material = new Cesium.Material({
            translucent: true,
            fabric: {
                type: 'Image',
                uniforms: {
                    image: imageUrl,
                },
            },
        });
        material._textures['image'] = new Cesium.Texture({
            context: this._viewer.scene.frameState.context,
            source: {
                width: 1,
                height: 1,
                arrayBufferView : new Uint8Array([255, 255, 0, 0])
            }
        });
        material._loadedImages.push({'id': 'image','image': image});
        var appearance = new  Cesium.EllipsoidSurfaceAppearance({
            // flat: true,  // 光影响了图片显示
            // renderState: {
            //     depthTest: {
            //         enabled: true // 透明度叠加有重影
            //     },
            // },
            material: material
        }); 
        dataInfo.forEach((item) => {
            var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, height2);
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr); 
            var instance = new Cesium.GeometryInstance({
                id: item.id,
                geometry: new Cesium.PlaneGeometry({
                    vertexFormat: Cesium.VertexFormat.ALL
                }),
            });
            var primitive = new Cesium.Primitive({
                geometryInstances: instance,
                appearance: appearance,  
                modelMatrix: Cesium.Matrix4.fromTranslationQuaternionRotationScale(
                    position, 
                    orientation, 
                    new Cesium.Cartesian3(width, height, 1.0),
                    new Cesium.Matrix4()),
            });
            primitive.id = item.id;
            primitive.otherProperty = item;
            primitive.scale = new Cesium.Cartesian3(width, height, 1.0);
            primitiveCollection.add(primitive);
        });
    });
};

/**
 * 绘线,更新线顶点,前提是层和id都存在才能更新线顶点
 * vertices: 世界坐标系下的顶点集合
 * 使用回调的方式更新顶点，会解决绘线时的闪烁
 * linetype:'corridor'  默认是‘走廊’的线样式，单位是米，但是某些情况下用该样式绘制线有错误
 *           'polyline',普通的线，单位是像素
 * coordinateSystem:'cartesian'   3D笛卡尔坐标（x,y,z）
 *                   'ellipsoidal' 经纬度+高度
 * bufferType: 0 没有缓冲区
 *             1 有缓冲区-目前仅支持polyline
 */
vtron.comp.std.map.Cesium.prototype.addLineElement = function(layerName, id, vertices, width, color, outlineColor = this.polylineOutlineColor, height = 0,coordinateSystem='cartesian',lineType='polyline',bufferType = 0,bufferRadius = this.bufferRadius) {
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    color = color || this.polylineOutlineColor;
    var entity = datasource.entities.getById(id);
    var entityPosition;
    this.polylineZIndex++;
    //判断vertices中是否有坐标为空
    for(var i =0;i<vertices.length-1;i++){
    	if(!vertices[i]){
            //log LLL
            if(this._debugTyle){
                var warn = this._logEnum.DataError + ":";
                var info = {};
                info.level = 1;//warn
                info.function = 'addLineElement';
                info.para =[layerName,id];
                info.info = "添加的线，顶点包含非法数据！";
                this._mapLog(info); 
            }
    		return;
    	}
    }
    if(coordinateSystem=='cartesian'||!coordinateSystem){
        entityPosition = vertices;
    }
    else if(coordinateSystem=='ellipsoidal'){
        entityPosition = Cesium.Cartesian3.fromDegreesArray(vertices);
    }
    // 线节点存在则只更新线的顶点，否则需要增加新的线节点
    if(entity) {
        entity.positions = entityPosition;//vertices;
        //先判断是不是线选
        //entityPosition是cartesian
        if(bufferType==1){
            var options = {units: 'meters'};
            //将entityPosition转成geo格式
            var buffGeo = [];
            entityPosition.forEach((vertex)=>{
                var bufferCarts = this.getCartographicFromCartesian(vertex.x, vertex.y, vertex.z);
                buffGeo.push([bufferCarts.lon, bufferCarts.lat]);
            });
            //转化为turf可以识别的线坐标
            var lineStr = turf.lineString(buffGeo);
            bufferRadius = bufferRadius || this.bufferRadius;
            //计算缓冲区
            var lineBuffer = turf.buffer(lineStr, bufferRadius, options);
            //缓冲区最外层坐标
            var bufferCoords = turf.getCoords(lineBuffer);
            //转[lon,lat,lon,lat]形式
            var bufferArr = [];
            bufferCoords[0].forEach((tempArr)=>{
                bufferArr.push(tempArr[0], tempArr[1]);
            });
            //转Cartesian
            var lineBufferCart = Cesium.Cartesian3.fromDegreesArray(bufferArr);
            //隐藏缓冲区的原始线-this-optId
            this.hideElements(this.optState, this.optID);
            var bufferColor;
                //用来判断透明度
            var toutlineColor = Cesium.Color.fromCssColorString(color);
            if(outlineColor==''||toutlineColor.alpha==1){
                outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+1.0+')';
                bufferColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+0.4+')';
                //这里的color和outlineColor都是缓冲区的面的填充颜色，轮廓颜色在addPolygonElement中再根据填充颜色算
                this.addPolygonElement(layerName, id+'.buffer', lineBufferCart, this.polylineOutlineWidth, bufferColor/*this.PolygonColor*/, bufferColor/*this.lineColor*/,0,'cartesian');
            }else{
                //虽然缓冲区是面，但是还是由线选的颜色决定-即color
                this.addPolygonElement(layerName, id+'.buffer', lineBufferCart, this.polylineOutlineWidth, color, outlineColor, 0, 'cartesian');
            }
        }
    } else {
        
        if(lineType=='corridor' || !lineType){
            var entity = datasource.entities.add({
                id: id,
                corridor: {
                    positions: entityPosition,//vertices,
                    width: width,
                    height: height,
                    material: Cesium.Color.fromCssColorString(color),
                    outline: true, 
                    outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                    clampToGround: true,
                }
            });
            entity.positions = entityPosition;//vertices;
            // 属性回调会影响地图场景性能，有待检查
            entity.corridor.positions = new Cesium.CallbackProperty(() => {return entity.positions}, false);
            entity.geoType='corridor';
        }
        else if(lineType=='polyline'){
            //线缓冲区的信息
            var polylineBufferInfo = {};
            //第一次创建线且该线是带缓冲面的线
            if(bufferType == 1){
                var options = {units: 'meters'};
                //将entityPosition转成geo格式
                var buffGeo = [];
                entityPosition.forEach((vertex)=>{
                    var bufferCarts = this.getCartographicFromCartesian(vertex.x, vertex.y, vertex.z);
                    buffGeo.push([bufferCarts.lon, bufferCarts.lat]);
                });
                //转化为turf可以识别的线坐标
                var lineStr = turf.lineString(buffGeo);
                bufferRadius = bufferRadius || this.bufferRadius;
                //计算缓冲区
                var lineBuffer = turf.buffer(lineStr, bufferRadius, options);
                //缓冲区最外层坐标
                var bufferCoords = turf.getCoords(lineBuffer);
                //转[lon,lat,lon,lat]形式
                var bufferArr = [];
                bufferCoords[0].forEach((tempArr)=>{
                    bufferArr.push(tempArr[0], tempArr[1]);
                });
                //转Cartesian
                var lineBufferCart = Cesium.Cartesian3.fromDegreesArray(bufferArr);
                //线选缓冲区填充颜色，若传进来的颜色透明度为1，则要算填充面的颜色，透明度为0.4，传进来不是1，则要重新计算
                var bufferColor;
                //用来判断透明度
                var toutlineColor = Cesium.Color.fromCssColorString(color);
                if(outlineColor==''||toutlineColor.alpha==1){
                    outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+1.0+')';
                    bufferColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+0.4+')';
                    polylineBufferInfo = this.addPolygonElement(layerName, id+'.buffer', lineBufferCart, this.polylineOutlineWidth, bufferColor/*this.PolygonColor*/, bufferColor/*this.lineColor*/,0,'cartesian');
                }else{
                    //原来传进来的就是透明
                    polylineBufferInfo = this.addPolygonElement(layerName, id+'.buffer', lineBufferCart, this.polylineOutlineWidth, color, outlineColor,0,'cartesian');
                }
                polylineBufferInfo.buffer = bufferRadius;
                //传出去的点是原始
                polylineBufferInfo.position = entityPosition;
            }
            else{
                //polyline(普通线)
                var entity = datasource.entities.add({
                    id: id,
                    polyline: {
                        positions: entityPosition,//vertices,
                        width: width,
                        height: height,
                        material: Cesium.Color.fromCssColorString(color),
                        //outline: true, 
                        //outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                        clampToGround: true,
                        zIndex : this.polylineZIndex,
                    }
                });
                entity.positions = entityPosition;
                entity.polyline.positions = new Cesium.CallbackProperty(() => {return entity.positions}, false);
                entity.geoType='polyline';
            }
        }
        return polylineBufferInfo;
    }
};

/**
 * 批量加线
 * dataInfo:{
 *  id:xxxx,
 *  color: "rgba()",
 *  geo:[""],
 *  width:单位像素
 * }
 */
vtron.comp.std.map.Cesium.prototype.addPolylineDataSource = function(layerName, dataInfo, show = true){
    if(!this._viewer) return;
    var primitive = this.getPrimitiveCollectionByName(layerName);
    if(!primitive){
        primitive = new Cesium.Primitive({
            geometryInstances: [],
            appearance: new Cesium.PolylineColorAppearance({
                translucent: false,
            }),
            asynchronous: false,//to fix  error: _workerName must be defined for asynchronous geometry 
        });
        primitive.name = layerName;
        this._viewer.scene.primitives.add(primitive);
    }
    if(!primitive.show){
        show = false;
    }
    let instances = [];
        for(var i = 0;i<dataInfo.length;i++){
            var color = Cesium.Color.fromCssColorString(dataInfo[i].color || 'rgba(255,255,0,1.0)');
            //if(primitive.hasCreated && primitive.getGeometryInstanceAttributes(dataInfo[i].id)){
                //primitive.getGeometryInstanceAttributes(dataInfo[i].id).show = Cesium.ShowGeometryInstanceAttribute.toValue(show);
                //primitive.getGeometryInstanceAttributes(dataInfo[i].id).color = Cesium.ColorGeometryInstanceAttribute.fromColor(color);
                //continue;
            //}else{
                instances.push(
                    new Cesium.GeometryInstance({
                        id: dataInfo[i].id,
                        geometry: new Cesium.PolylineGeometry({
                            positions:Cesium.Cartesian3.fromDegreesArray(dataInfo[i].geo),
                            width: dataInfo[i].width,
                            vertexFormat: Cesium.VertexFormat.ALL,
                            arcType: Cesium.ArcType.NONE,
                            granularity: Cesium.Math.PI_OVER_FOUR,
                            colorsPerVertex: false,  //一个布尔值，确定颜色是在直线的每个段上是平坦的还是在顶点上插值。
                        }),
                        attributes:{
                            color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
                            show : new Cesium.ShowGeometryInstanceAttribute(show),
                        },
                    }),
                )
            //}
        }

        primitive.geometryInstances = instances;
        primitive.hasCreated = true;
        primitive.geoType = 'simpleLine';
    //log LLL
    if(dataInfo.lenghth>10000){
        var warn = this._logEnum.infor + ":";
        var info = {};
        info.level = 1;//warn
        info.function = 'addPolylineDataSource';
        info.para =[layerName];
        info.info = "批量添加的线数量为:"+dataInfo.lenghth;
        this._mapLog(info); 
    }
};

/**
 * 绘多边形
* coordinateSystem:'cartesian'   3D笛卡尔坐标（x,y,z）
 *                   'ellipsoidal' 经纬度+高度
 * 
 * -ljy 20190428
 * 移除polygonType属性
 * 增加polygonOutlineWidth属性，同时判断面的类型，若面为有轮廓线的面，则设置轮廓线宽度
 * polygonOutlineWidth: 0:普通多边形面
 *                    ！0:带轮廓线的多边形面
 */


vtron.comp.std.map.Cesium.prototype.addPolygonElement = function(layerName, id, vertices, outlineWidth, color, outlineColor = 'rgba(255, 255, 0, 0)', height = 0,coordinateSystem='cartesian') {
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    color = color || this.polygonOutlineColor;
    //判断传入的color是不是透明，polygon中的color要是透明的
    var tempColor = Cesium.Color.fromCssColorString(color);
    if(tempColor.alpha==1){
        color = 'rgba('+tempColor.red*255+','+tempColor.green*255+','+tempColor.blue*255+','+0.2+')';
    }
    var entity = datasource.entities.getById(id);
    //外轮廓线
    var outlineEntity = datasource.entities.getById(id + '.outline');
    //主体的坐标（贴地）
    var entityPosition;
    //有高度的那部分点的坐标(用来生成轮廓线)
    //ljyi 扇形高度
    //var entityPositionHeight = [];
    if(coordinateSystem=='cartesian'||!coordinateSystem){
        entityPosition = vertices;
    }
    else if(coordinateSystem=='ellipsoidal'){
        entityPosition = Cesium.Cartesian3.fromDegreesArray(vertices);
        //为了让轮廓线也正常加
        coordinateSystem = 'cartesian';
    }

    // 线节点存在则只更新线的顶点，否则需要增加新的多边形节点
    if(entity) {
        entity.hierarchy = entityPosition;
        entity.extrudedHeight = height;
        //面节点存在且outlineWidth存在时,同时更新线的定点
        if(outlineWidth){
            //并且要收尾相接，line的坐标放在positions中并非hierarchy中
            if(entityPosition.length>2){
                outlineEntity.positions = entityPosition.concat(entityPosition[0]);
            }
            else{
                outlineEntity.positions = entityPosition;
            }
        }
    } else {
        //先判断是普通面还是有轮廓线的面,有polygonOutlineWidth的时候是有轮廓线的面
        var polygonInfo = {};
        if(outlineWidth){
            var outlineVertices;
            //判断是不是[lon,lat,lon,lat]
            if(typeof(entityPosition[0])=="number"){
                entityPosition = Cesium.Cartesian3.fromDegreesArray(entityPosition);
            }
            outlineVertices = entityPosition;
            if((outlineVertices.length>2)&&(outlineVertices[length-1]!=outlineVertices[0])){
                outlineVertices.push(outlineVertices[0]);
            }
            if(outlineColor==''){
                var toutlineColor = Cesium.Color.fromCssColorString(color);
                toutlineColor.alpha = 1.0;
                outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+toutlineColor.alpha+')';
            }
            this.addLineElement(layerName, id+'.outline', outlineVertices, outlineWidth, outlineColor, outlineColor, 0, coordinateSystem, lineType='polyline');
            polygonInfo.layerName = layerName;
            polygonInfo.id = id+'.outline';
            polygonInfo.position = outlineVertices;
            polygonInfo.outlineColor = outlineColor;
        }
        var entity = datasource.entities.add({
            id: id,
            polygon: {
                hierarchy: entityPosition,
                //height: height,
                //extrudedHeight: height,
                material: Cesium.Color.fromCssColorString(color),
                outline: false,
                //自带的轮廓线生效需要height或者extratuHeight = 0
                outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                zIndex: this.polylineZIndex,//polygon的zIndex生效前提是height=undefined
            }
        });
        //判断是不是[lon,lat,lon,lat]
        if(typeof(vertices[0])=="number"){
            entity.hierarchy = Cesium.Cartesian3.fromDegreesArray(vertices);
        }else{
            entity.hierarchy = vertices;
        }
        
        entity.polygon.hierarchy = new Cesium.CallbackProperty(() => {return entity.hierarchy}, false);
        entity.geoType='polygon';
        return polygonInfo;
    }
};

/**
 * 批量加面
 * dataInfo:[{
 *  id:xxxx,
 *  geo:[x,y,x,y..],
 * }]
 * color: //面的颜色，由传进来时的a确定是填充颜色还是轮廓线颜色
 * canChangeColor: 是否支持双击
 */
vtron.comp.std.map.Cesium.prototype.addPolygonDataSource = function(layerName, dataInfo, color, canChangeColor){
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    this.setLayerDisplayCondition(layerName,null,600000,true);
    //var zIndex = 0;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    //处理颜色
    var tempColor = Cesium.Color.fromCssColorString(color);
    var outlineColor = 'rgba('+tempColor.red*255+','+tempColor.green*255+','+tempColor.blue*255+','+1.0+')';
    if(tempColor.alpha==1){
        color = 'rgba('+tempColor.red*255+','+tempColor.green*255+','+tempColor.blue*255+','+0.2+')';
    }
    color = color || this.polygonOutlineColor;
    dataInfo.forEach((item)=>{
        //zIndex++;
        var polygonEntity = datasource.entities.add({
            id: item.id,
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(item.geo),
                outlineWidth: 1.0,//写死1
                outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                height: 0,
                //clampToGround: true,
                material: Cesium.Color.fromCssColorString(color),
                show: true,
                //zIndex: zIndex,
            }
        });
        var outlineEntity = datasource.entities.add({
            id: item.id + '.outline',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(item.geo),
                width: this.polylineOutlineWidth,//写死5
                //outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                //height: 0,
                //clampToGround: true,
                material: Cesium.Color.fromCssColorString(outlineColor),
                show: true,
                //zIndex: zIndex,
            }
        });
        polygonEntity.geoType = 'polygon';
        polygonEntity.canChangeColor = canChangeColor;
        outlineEntity._oldColor = outlineColor;
        outlineEntity.geoType = 'polygon';
    });
    datasource.description = color;//记录颜色
    
    //log LLL
    if(dataInfo.lenghth>10000){
        var warn = this._logEnum.infor + ":";
        var info = {};
        info.level = 1;//warn
        info.function = 'addPolygonDataSource';
        info.para =[layerName];
        info.info = "批量添加的面数量为:"+dataInfo.lenghth;
        this._mapLog(info); 
    }
};

/**
 * 
 */
vtron.comp.std.map.Cesium.prototype.addCircleOutlineElement = function(layerName,id,center, radius,width,color){
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    var entity = datasource.entities.getById(id);
    if(entity) {
        entity.radius = radius;
    } else {
        var instance = this._viewer;
        //由于webgl限制outlinewidth<=1,因此需要在填充的圆的边缘多加一个polyline_circle entity
        var GetOutlineVertex = function(center,radius){
            var circle = new Cesium.CircleOutlineGeometry({
                center : center,//Cesium.Cartesian3.fromDegrees(center.x, center.y),
                radius : radius,
                granularity: 0.02,
            });

            var geometry = Cesium.CircleOutlineGeometry.createGeometry(circle);
            if(geometry==undefined ||geometry.attributes==undefined || geometry.attributes.position==undefined)
                return;
            var circle_outline_vertex = geometry.attributes.position.values;
            var linedata = [];
            //var linedataBB=[];
            //var xmax=-180,xmin=180,ymax=-90;ymin=90;
            for(var vertexid=0;vertexid<circle_outline_vertex.length-2;vertexid+=3){
                linedata.push(new Cesium.Cartesian3(circle_outline_vertex[vertexid],circle_outline_vertex[vertexid+1],circle_outline_vertex[vertexid+2])) ;
                
                //测试
                /*var ellipsoid=instance.scene.globe.ellipsoid;
                var cartesian3=new Cesium.Cartesian3(circle_outline_vertex[vertexid],circle_outline_vertex[vertexid+1],circle_outline_vertex[vertexid+2]);
                var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
                var lat=Cesium.Math.toDegrees(cartographic.latitude);
                var lng=Cesium.Math.toDegrees(cartographic.longitude);
                if(lng<xmin) xmin= lng;
                if(lng>xmax) xmax = lng;
                if(lat<ymin) ymin = lat;
                if(lat>ymax) ymax = lat; */
            }
            /*instance.lonmin = xmin;
            instance.lonmax = xmax;
            instance.latmin = ymin;
            instance.latmax = ymax;*/
            //首尾相连接，构成闭合线
            linedata.push(new Cesium.Cartesian3(circle_outline_vertex[0],circle_outline_vertex[1],circle_outline_vertex[2])) ;
            return linedata;
        }
        
        var linevertex =  GetOutlineVertex(center,radius);
        var entity = datasource.entities.add({
            id: id,
            polyline: {
                positions:linevertex,
                material: Cesium.Color.fromCssColorString(color),
                width: width,
                clampToGround : true
            }
        });
        entity.radius = radius;
        entity.center = center;
        entity.polyline.positions = new Cesium.CallbackProperty(() => {
            return GetOutlineVertex(center,entity.radius);
        }, false);
    }
};

/**
 * 绘圆: 设置高度outlineColor才生效
 */
vtron.comp.std.map.Cesium.prototype.addCircleElement = function(layerName, id, center, radius = 1, color, outlineColor = 'rgba(255, 255, 0, 0)', outlineWidth=2,height = 0) {
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    color = color || this.circleOutlineColor;
    var tempColor = Cesium.Color.fromCssColorString(color);
    if(tempColor.alpha==1){
        color = 'rgba('+tempColor.red*255+','+tempColor.green*255+','+tempColor.blue*255+','+0.2+')';
    }
    var entity = datasource.entities.getById(id);
    if(entity) {
        entity.radius = radius;
    } else {
        var entity = datasource.entities.add({
            id: id,
            position: center,
            ellipse: {
                semiMinorAxis: radius,
                semiMajorAxis: radius,
                height: 0,
                material: Cesium.Color.fromCssColorString(color),
                //outline: true,
                //outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                //outlineWidth: outlineColor,
                granularity: 0.02,
            }
        });
        entity.radius = radius;
        entity.ellipse.semiMinorAxis = new Cesium.CallbackProperty(() => {return entity.radius}, false);
        entity.ellipse.semiMajorAxis = new Cesium.CallbackProperty(() => {return entity.radius}, false);
        entity.geoType='circle';
    }

    //由于webgl限制outlinewidth<=1,因此需要在填充的圆的边缘多加一个polyline_circle entity
    if(outlineWidth>1){
        if(outlineColor==''||outlineColor){
            var toutlineColor = Cesium.Color.fromCssColorString(color);
            toutlineColor.alpha = 1.0;
            outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+toutlineColor.alpha+')';
        }
        this.addCircleOutlineElement(layerName,id+".outline",center,radius,outlineWidth,outlineColor);
    }
};

/**
 * 计算扇形的夹角，
 * positionArr: Cartesian3坐标数组，3个
 * radius:
 */
var _betweenAngle = function(positionArr){
    var p1 = positionArr[0];//Cesium.Cartesian3.fromDegrees(positionArr[0], positionArr[1]);
    var p2 = positionArr[1];//Cesium.Cartesian3.fromDegrees(positionArr[2], positionArr[3]);
    var p3 = positionArr[2];//Cesium.Cartesian3.fromDegrees(positionArr[62], positionArr[63]);
    //向量的积
    var v = (p1.x - p2.x)*(p1.x - p3.x)+(p1.y - p2.y)*(p1.y - p3.y)+(p1.z - p2.z)*(p1.z - p3.z);
    //向量大小
    var _p1p2 = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
    var _p1p3 = Math.sqrt((p1.x - p3.x) ** 2 + (p1.y - p3.y) ** 2 + (p1.z - p3.z) ** 2);
    //弧度制
    var angle = Math.acos(v / (_p1p3 * _p1p2));
    return Cesium.Math.toDegrees(angle);
}

/**
 * 计算扇形的全部坐标，
 * lon:圆心的经度
 * lat:圆心的纬度
 * radius:
 * firstAngle: 第一个顶点与正北的夹角，单位°
 * secondAngle： 第二个点与正北的夹角，单位°
 */
var _sectorPositionsResult = function(lon, lat, radius, firstAngle, secondAngle, instance = this){
    let  Ea = 6378137;      //   赤道半径
    let  Eb = 6356725;      // 极半径 
    let positionArr=[];
    positionArr.push(lon);
    positionArr.push(lat);
    //需求正北是0° cesium正东是0°
    //原始
    for (let i = firstAngle; i <=secondAngle; i++) {
        let dx = radius * Math.sin(i * Math.PI / 180.0);
        let dy = radius * Math.cos(i * Math.PI / 180.0);

        let ec = Eb + (Ea-Eb) * (secondAngle - lat) / 90.0;
        let ed = ec * Math.cos(lat * Math.PI / 180);

        let BJD = lon + (dx / ed ) * 180.0 / Math.PI;
        let BWD = lat + (dy / ec ) * 180.0 / Math.PI;

        positionArr.push(BJD);
        positionArr.push(BWD);
    }
    return positionArr;
}

/**
 * 加载3dtiles格式三维模型
 * modelName: 3dtiles模型名称
 * modelUrl: 存放模型的地址
 * modelVisible: 模型是否可见，默认为true
 * modelType : 模型类型，‘Oblique’-》倾斜摄影，White-》白模，只有白模可以设置useStyle
 * styleConditions: 模型的style样式，仅适合白模，以后要加载倾斜模型时该参数省略，要再补充
 * fileType: 'vmap2'是我们的，'superMap'是用超图的
 * 考虑指定lightColor (Cesium.Cartesian3)
 */
vtron.comp.std.map.Cesium.prototype.add3dTiles = function(layerName, modelName, modelUrl, modelVisible = true, modelType='Oblique',useStyle = false, styleConditions = [["true", "rgba(0, 100, 150, 1.0)"]], fileType='vmap2'){
    if(!this._viewer) return;
    if(!modelName) modelName = 'tempLayer';
    var scene = this._viewer.scene;
    if(fileType == 'superMap'){
        seajs.use(['/s3mPluguins/dist/index.js'], function() {
            let layer = new S3MTilesLayer({
                context : scene._context,
                // url: './data/CBD/cbd.scp' //sdk自带数据 ok
                // url: './data/Data/Config.scp'//坐标都点偏：通过osgb生产s3mb
                // url: './data/Data2/Config.scp',//坐标都点偏：通过osgb生产s3mb
                // url:'http://10.1.55.49:8090/iserver/services/3D-test/rest/realspace/datas/Config/config',//科技园
                url:'http://10.1.55.49:8090/iserver/services/3D-nt/rest/realspace/datas/Config/config',//'http://10.33.68.119:8092/iserver/services/3D-bjhtest/rest/realspace/datas/Config/config',//百家湖
                // url: './data/nt_test/Config.scp',//坐标都点偏：通过osgb生产s3mb
                fromIserver:true
            });
            scene.primitives.add(layer);
        });
        return;
    }
    
    var primitive = this.getPrimitiveCollectionByName(layerName);
    if(!primitive){
        primitive = new Cesium.PrimitiveCollection();
        primitive.name = layerName;
        this._viewer.scene.primitives.add(primitive);
    }
    var modelPrimitive = new Cesium.Cesium3DTileset({
        name: modelName,
        id: modelName,
        url: modelUrl,
        show: modelVisible,
        //lightColor: new Cesium.Cartesian3(0,10,10),//指定光源，可能会影响加载效率
        //dynamicScreenSpaceError: false,
		//preferLeaves: true,
		maximumScreenSpaceError: 2,
		//skipLevels: 20,
		//skipScreenSpaceErrorFactor: 4,
		//immediatelyLoadDesiredLevelOfDetail: true
    });
    if(useStyle && modelType=='White'){
        //如果加载的是倾斜模型的话，style会生效，应该加一个判断，当加入的是倾斜模型的时候，不要让这个style生效
        modelPrimitive.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: styleConditions
            }
        });
    }
    if(modelType == 'Oblique'){
        modelPrimitive.geoType = 'Oblique';
    }else if(modelType=='White'){
        modelPrimitive.geoType = 'White';
    }
    modelPrimitive.layerName = layerName;
    modelPrimitive.id = modelName;
    primitive.add(modelPrimitive);
    //剔除高程，只有倾斜模型才需要
    if(modelType == 'Oblique'){
        modelPrimitive.readyPromise.then(function(){
            var center = Cesium.Cartographic.fromCartesian(modelPrimitive.boundingSphere.center);
            var surface = Cesium.Cartesian3.fromRadians(center.longitude, center.latitude, center.height);
            var offset = Cesium.Cartesian3.fromRadians(center.longitude, center.latitude,20);
            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            modelPrimitive._modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            // var m = Cesium.Transforms.eastNorthUpToFixedFrame(modelPrimitive.boundingSphere.center);
            // var scale = Cesium.Matrix4.fromUniformScale(0.01)
            // Cesium.Matrix4.multiply(m, scale, m);
            // modelPrimitive._root.transform = m;
        });
    }
    
    
    //log LLL
    if(this._debugTyle){
        var warn = this._logEnum.infor + ":";
        var info = {};
        info.level = 1;//warn
        info.function = 'add3dTiles';
        info.para =[layerName,modelUrl];
        info.info = "";
        this._mapLog(info); 
    }
};

/**
 * 让不贴地的三维模型贴地
 * modelName: 3dtiles模型名称
 * modelUrl: 存放模型的地址
 * modelVisible: 模型是否可见，默认为true
 * styleConditions: 模型的style样式，仅适合白模，以后要加载倾斜模型时该参数省略，要再补充
 */
vtron.comp.std.map.Cesium.prototype.modelClampToGround = function(layerName, ids){
    if(!this._viewer) return;
    var primitive = this.getPrimitiveCollectionByName(layerName);
    if(!primitive){
        return;
    }
    if(!(ids instanceof Array)) ids = [ids];
    var result = this.getPrimitiveById(layerName, ids);
    result.forEach((item) =>{
        //获取模型中心
        var modelCenter = Cesium.Cartographic.fromCartesian(item.boundingSphere.center);
        //计算这个中心的贴地坐标
        var surface = Cesium.Cartesian3.fromRadians(modelCenter.longitude, modelCenter.latitude, modelCenter.height);
        var offset = Cesium.Cartesian3.fromRadians(modelCenter.longitude, modelCenter.latitude,20);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        //生效
        item._modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
};

/**
 * 修改部分点样式:修改图标数据和图标大小
 */
vtron.comp.std.map.Cesium.prototype.pointsChangeStyle = function(layerName, dataInfo, imageUrl, scale = 1) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity&&entity.billboard) {
            if(data.imageUrl || imageUrl){
                entity.billboard.image = data.imageUrl||imageUrl;
                entity.imageSrc = data.imageUrl||imageUrl;
            }
            if(data.imageUrlPicked){
                entity.imagePicked = data.imageUrlPicked;
            }
            entity.billboard.scale = this.imageScaleFactor*scale;
        }
    });
};

/**
 * 修改线的样式：宽度和颜色
 * 用corridor：以米为单位，用在线选
 */
vtron.comp.std.map.Cesium.prototype.lineChangeStyle = function(layerName, dataInfo, width, color,linetype='polyline') {
    var datasource = this.getDataSourceByName(layerName) || this.getPrimitiveCollectionByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    if(datasource.geoType == 'simpleLine'){
        dataInfo.forEach((data) => {
            datasource.getGeometryInstanceAttributes(data.id).color = Cesium.ColorGeometryInstanceAttribute.fromColor(data.color || color);
        });
    }else{
        dataInfo.forEach((data) => {
            var entity = datasource.entities.getById(data.id||'lineChangeStyle');
            if(entity) {
                if(linetype=='corridor'){
                    entity.corridor.width = data.width || width; //chkun
                    entity.corridor.material = Cesium.Color.fromCssColorString(data.color || color);//chkun
                }
                else if(linetype=='polyline' && entity.polyline.material != Cesium.Color.fromCssColorString(data.color || color)){
                    entity.polyline.material = Cesium.Color.fromCssColorString(data.color || color);
                    //entity.polyline.width = data.width || width;
                    if(linetype=='polyline' && entity.polyline.width != data.width){
                        entity.polyline.width = data.width || width || entity.polyline.width;
                    }
                }
            }
        });
    }
};

/**
 * 恢复面的样式：颜色
 * dataInfo:
 * [
 *    {
 *       'id':polygonId, //string
 *        'fillColor':'rgba()'
 *    }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.resetPolygonStyle = function(layerName, dataInfo) {
    var datasource = this.getDataSourceByName(layerName);
    //if(!datasource || !dataInfo) return;
    if(!datasource) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    //dataInfo为空时，整个图层所有面要素的颜色都恢复成原来的颜色
    if(dataInfo == false){
        var entities = datasource.entities.values;
        for(var i = 0; i < entities.length; i++){
            var entity = entities[i];
            if(datasource.description == "" || !datasource.description){
                datasource.description = "rgba(255,255,0,0.5)";
            }
            entity.polygon.material = Cesium.Color.fromCssColorString(datasource.description);
        }
        return;
    }
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity) {
            //如果geojson加载的时候color="" cesium默认加载是黄色
            if(datasource.description == ""){
                datasource.description = "rgba(255,255,0,0.5)";
            }
            entity.polygon.material = Cesium.Color.fromCssColorString(datasource.description);

        }
    });
};

/**
 * 修改面的样式：颜色
 * dataInfo:
 * [
 *    {
 *       'id':polygonId, //string
 *        'fillColor':'rgba()'
 *    }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.polygonChangeStyle = function(layerName, dataInfo) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        var entityOutline = datasource.entities.getById(data.id + '.outline');
        if(entity) {
            //如果传进来的颜色是1要做处理
            var tempFillColor = Cesium.Color.fromCssColorString(data.fillColor||'rgba(100,100,100,0.2)');
            if(tempFillColor.alpha == 1){
                var fillColor = 'rgba(' + tempFillColor.red*255 + ',' + tempFillColor.green*255 + ',' + tempFillColor.blue*255 + ',' + 0.2 +')';
                entity.polygon.material = Cesium.Color.fromCssColorString(fillColor);
            }else{
                entity.polygon.material = Cesium.Color.fromCssColorString(data.fillColor||'rgba(100,100,100,0.2)');
            }
            if(entity.polygon.outline){
                //如果本来的polygon有outline
                var toutlineColor = Cesium.Color.fromCssColorString(data.fillColor||'rgba(100,100,100,0.2)');
                toutlineColor.alpha = 1.0;
                outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+toutlineColor.alpha+')';
                entity.polygon.outlineColor = Cesium.Color.fromCssColorString(outlineColor);
            }
        }
        //如果是有轮廓线的要改轮廓线的颜色
        if(entityOutline){
            var toutlineColor = Cesium.Color.fromCssColorString(data.fillColor||'rgba(100,100,100,0.2)');
            toutlineColor.alpha = 1.0;
            outlineColor = 'rgba('+toutlineColor.red*255+','+toutlineColor.green*255+','+toutlineColor.blue*255+','+toutlineColor.alpha+')';
            entityOutline.polyline.material = Cesium.Color.fromCssColorString(outlineColor);
            //如果本身有polygon.outline = true要改成false，防止重叠
            if(entity.polygon.outline){
                entity.polygon.outline = false;
            }
        }
    });
};

/**
 * 修改文字标注的样式：颜色和背景颜色
 * dataInfo:
 * [
 *    {
 *       'id':labelId, //string
 *       'fillColor':'rgba()'
 *       'backgroundColor': 'rgba()'
 *       'text' : '更改文字',
 *       'font' : '50pt monospace'
 *    }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.labelChangeStyle = function(layerName, dataInfo) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity) {
            //判断是要改变label的哪一个属性
            if(data.fillColor){
                entity.label.fillColor = Cesium.Color.fromCssColorString(data.fillColor);
                entity.label.outlineColor = Cesium.Color.fromCssColorString(data.fillColor);
            }
            if(data.backgroundColor){
                entity.label.backgroundColor = Cesium.Color.fromCssColorString(data.backgroundColor);
            }
            if(data.text){
                entity.label.text = data.text;
            }
            if(data.font){
                entity.label.font = data.font;
            }
        }
    });
};

/**
 * 按照传入高度拉伸polygon
 * dataInfo:
 * [
 *    {
 *       'id':polygonId, //string
 *        'height': number, //number
 *    }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.polygonChangeExtrudedHeight = function(layerName, dataInfo) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity) {
            entity.polygon.extrudedHeight = data.height;
        }
    });
};

/**
 * 修改primitive的样式：修改图片和大小
 */
vtron.comp.std.map.Cesium.prototype.planeChangeStyle = function(layerName, dataInfo, imageUrl, width, height) {
    let layer = this.getPrimitiveCollectionByName(layerName);
    if(!layer || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var primitives = this.getPrimitiveById(layerName, data.id);
        primitives.forEach((item) => {
            if(imageUrl) {
                item.material.uniforms.image = imageUrl;
            }
            if(width && height) {
                item.scale = new Cesium.Cartesian3(width, height, 1.0);
            }
        });
    });
};

/**
 * 修改所有primitive的统一样式，比如缩放
 */
vtron.comp.std.map.Cesium.prototype.planeChangeStyleAll = function(layerName, imageUrl, width, height) {
    let layer = this.getPrimitiveCollectionByName(layerName);
    if(!layer) return;
    layer._primitives.forEach((item) => {
        if(item instanceof Cesium.Primitive) {
            if(imageUrl) {
                item.material.uniforms.image = imageUrl;
            }
            if(width && height) {
                item.scale = new Cesium.Cartesian3(width, height, 1.0);
            }
        }
    });
};

/**
 * 获取元素的层级zIndex
 * 1是最底层。zindex值越大，越在最上层
 */
vtron.comp.std.map.Cesium.prototype.getEntityZIndex = function(layerName, id) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer || !id) return;
    //暂时不考虑Primititve
    var entity = this.getEntityById(layerName, id);
    if(!entity) return;
    var zindex;
    //判断这个entity是polygon/polyline/point/circle
    if(entity.geoType == 'polygon'){
        //一般外轮廓
        zindex = entity.polygon.zIndex;
    }else if(entity.geoType == 'polyline'){
        zindex = entity.polyline.zIndex;
    }else if(entity.geoType == 'point'){
        zindex = entity.point.zIndex;
    }
    return zindex;
};

/**
 * 传入参数，改变元素的层级zIndex
 * 1是最底层。zindex值越大，越在最上层
 */
vtron.comp.std.map.Cesium.prototype.changeEntityZIndex = function(layerName, id, newZindex) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer || !id) return;
    //暂时不考虑Primititve
    var entity = this.getEntityById(layerName, id);
    if(!entity) return;
    //判断这个entity是polygon/polyline/point/circle
    if(entity.geoType == 'polygon'){
        //如果是面还要考虑它的outline
        entity.polygon.zIndex = newZindex;
        var entityOutline = this.getEntityById(layerName, id+'.outline');
        if(entityOutline){
            entityOutline.polyline.zIndex = newZindex;
        }
    }else if(entity.geoType == 'polyline'){
        entity.polyline.zIndex = newZindex;
    }else if(entity.geoType == 'point'){
        entity.point.zIndex = newZindex;
    }
};

/**
 * 将元素放置在当前的最顶层
 * 如果后面又加了一层，那么后面加入的元素会成为最顶层
 */
vtron.comp.std.map.Cesium.prototype.upperEntityZIndex = function(layerName, id) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer || !id) return;
    //暂时不考虑Primititve
    var entity = this.getEntityById(layerName, id);
    if(!entity) return;
    this.polylineZIndex++;
    //判断这个entity是polygon/polyline/point/circle
    if(entity.geoType == 'polygon'){
        //如果是面还要考虑它的outline
        entity.polygon.zIndex = this.polylineZIndex;
        var entityOutline = this.getEntityById(layerName, id+'.outline');
        if(entityOutline){
            entityOutline.polyline.zIndex = this.polylineZIndex;
        }
    }else if(entity.geoType == 'polyline'){
        entity.polyline.zIndex = this.polylineZIndex;
    }else if(entity.geoType == 'point'){
        entity.point.zIndex = this.polylineZIndex;
    }
};

/**
 * 将元素放置在当前的最底层
 * 最底层zindex值为1
 */
vtron.comp.std.map.Cesium.prototype.lowerEntityZIndex = function(layerName, id) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer || !id) return;
    //暂时不考虑Primititve
    var entity = this.getEntityById(layerName, id);
    if(!entity) return;
    //判断这个entity是polygon/polyline/point/circle
    if(entity.geoType == 'polygon'){
        //如果是面还要考虑它的outline
        entity.polygon.zIndex = 1;
        var entityOutline = this.getEntityById(layerName, id+'.outline');
        if(entityOutline){
            entityOutline.polyline.zIndex = 1;
        }
    }else if(entity.geoType == 'polyline'){
        entity.polyline.zIndex = 1;
    }else if(entity.geoType == 'point'){
        entity.point.zIndex = 1;
    }
};

/**
 * 传入参数，获取图层在viewer中的层级
 * -1是没有这个图层
 */
vtron.comp.std.map.Cesium.prototype.getDataSourceIndex = function(layerName) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer) return;
    return this._viewer.dataSources.indexOf(layer);
};

/**
 * 让指定图层在_viewer.dataSources里面的位置下降，在底层的是最前显示的
 */
vtron.comp.std.map.Cesium.prototype.lowerDataSource = function(layerName) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer) return;
    this._viewer.dataSources.lower(layer);
};

/**
 * 让指定图层在_viewer.dataSources里面的位置降到最底层，在底层的是最前显示的
 */
vtron.comp.std.map.Cesium.prototype.lowerDataSourceToBottom = function(layerName) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer) return;
    this._viewer.dataSources.lowerToBottom(layer);
};

/**
 * 让指定图层在_viewer.dataSources里面的位置上升，在顶层的最后显示
 */
vtron.comp.std.map.Cesium.prototype.raiseDataSource = function(layerName) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer) return;
    this._viewer.dataSources.raise(layer);
};

/**
 * 让指定图层在_viewer.dataSources里面的位置上升，在顶层的最后显示
 */
vtron.comp.std.map.Cesium.prototype.raiseDataSourceToTop = function(layerName) {
    var layer = this.getDataSourceByName(layerName);
    if(!layer) return;
    this._viewer.dataSources.raiseToTop(layer);
};

/**
 * 修改点的地理坐标
 * layerName:图层名
 * dataInfo：[{'id':'gps-1','x':,'y':}]
 */
vtron.comp.std.map.Cesium.prototype.movePoints = function(layerName, dataInfo,animate=false) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity&&!isNaN(data.x)&&!isNaN(data.y)
            &&data.x!=undefined && data.y!=undefined ) {
            var position = Cesium.Cartesian3.fromDegrees(data.x, data.y);
            entity.position = position;
            entity.x = data.x;
            entity.y = data.y;
        }
        else{
            //log LLL
            if(this._debugTyle){
                var info = {};
                info.level = 1;//warn
                info.function = 'movePoints';
                info.para =[layerName,data.id];
                info.info = "点坐标非法!";
                this._mapLog(info); 
            }
        }
    });
};

/*
   单位向量
 */
function cluculateInterpolationNormalize(startPoint, endPoint){
    var a = glm.vec3(endPoint.x - startPoint.x, endPoint.y - startPoint.y, 0);
    var l = glm.normalize(a);
    return l;
}

/* 计算两个点之间的插值点
*/
function cluculateInterpolationLength(startPoint, endPoint) {
    var length = glm.distance(glm.vec3(startPoint.x, startPoint.y, 0), glm.vec3(endPoint.x, endPoint.y, 0)); 
    return length;
}
/*
    divide: 占两点间线段的百分比
    lenght:两点长度
 */
function getInterpolationPoint(startPoint, endPoint, divide,entity) {
    var retpoint = {};
    //return startPoint;
    //计算线的长度
    var lineLength=0.0;
    if(entity.distance==null){
       lineLength = cluculateInterpolationLength(startPoint, endPoint);
       entity.distance = lineLength;
    }
    else{
        lineLength = entity.distance;
    }

    //等分线的长度
    var perLength = lineLength * divide;
    var a = glm.vec3(endPoint.x - startPoint.x, endPoint.y - startPoint.y, 0);
    if(entity.vec == null){
        a = glm.vec3(endPoint.x - startPoint.x, endPoint.y - startPoint.y, 0);
        entity.vec = a;
    }
    else{
        a = entity.a;
    }

    var l = 0;
    if(entity.normalize==null){
        l = glm.normalize(a);
        entity.normalize = l;
    }
    else{
        l = entity.normalize;
    }
    var curdis = perLength * divide;
    var p = glm.vec3(l.x * curdis, l.y * curdis, 0);
    retpoint.x = p.x + startPoint.x,
    retpoint.y = p.y + startPoint.y

    return retpoint;
}
/**
 * movepointsex
 * 修改点的地理坐标  平滑移动点
 * layerName:图层名
 * dataInfo：[{'id':'gps-1','x':,'y':,'intervaltime':2000}]
 * entity新加属性
 *    x:点当前的位置lon
 *    y:点当前的位置lat
 *    start_x:点初始lon
 *    start_y:点初始lat
 *    end_x:终点位置lon
 *    end_y:终点位置lat
 *    interval:两点间移动时间间隔
 *    start_time:点开始运动时间
 *    distance:两点间距离
 *    normalize:单位化向量
 *    vec:向量
 *    pathTrack：每次movepointex,都把点保存到数组  [lon,lat,alt,lon,lat,alt...lon,lat,alt]
 *    pathRender:需要显示的路径,是pathTrack的一部分
 *    playPath:是否在启动播放轨迹 true：播放，false：停止
 */
var timeDynamicPoint=false;

_updateDynamicPoint = function(instance){
    for(let data in instance._dynameLayer_dataSource){
        var btrackedpoint = false;
        var dypointArray = [];
        var datasource = instance._dynameLayer_dataSource[data];
        if(datasource.animate == true){
            var curtime = new Date().getTime();
            for(var i=0;i<datasource.entities._entities.length;i++)
            {
                var entity = datasource.entities.values[i];
                if(entity && entity.animate ) {
                    var startpoint={},endpoint={};
                    startpoint.x = entity.start_x;
                    startpoint.y = entity.start_y;
                    endpoint.x = entity.end_x;
                    endpoint.y = entity.end_y;
                    
                    var btimeout = (curtime-entity.start_time)/entity.interval;//>=1则是时间到
                    var curpos = {};
                    curpos.x = endpoint.x;
                    curpos.y = endpoint.y;
                    if(btimeout<=1){
                        //curpos = getInterpolationPoint(startpoint,endpoint,(curtime-entity.start_time)/entity.interval,entity);
                        var m = (curtime-entity.start_time)/entity.interval;
                        curpos.x = startpoint.x + (endpoint.x-startpoint.x)*m;
                        curpos.y = startpoint.y + (endpoint.y-startpoint.y)*m;
                    }
                    else{
                        entity.animate = false;
                        entity.start_x = curpos.x;
                        entity.start_y = curpos.y;
                    }
                    if(entity.tracked==true){
                        //entity.tracked:点位置变化时，地图组件抛出该点的新位置信息
                        btrackedpoint = true;
                        //世界坐标转屏幕坐标
                        var ll2pix = instance.getScreenCoordFromCartographic(curpos.x,curpos.y);
                        //instance.fire("pointPositionUpdateEvent", {"layerName": datasource.name, "id": entity.id,"screenCoord":{"x":ll2pix.x,"y":ll2pix.y},"gisCoord":{"lon": curpos.x, "lat": curpos.y}},{bubbles: false});
                        var dypointobject = {};
                        dypointobject.id = entity.id;
                        var screenCoord = {};
                        screenCoord.x = ll2pix.x;
                        screenCoord.y = ll2pix.y;
                        dypointobject.screenCoord = screenCoord;

                        var gisCoord = {};
                        gisCoord.x = curpos.x;
                        gisCoord.y = curpos.y;
                        dypointobject.gisCoord = gisCoord;
                        dypointArray.push(dypointobject);
                    }
                    var position = Cesium.Cartesian3.fromDegrees(curpos.x, curpos.y);
                    entity.position = position;
                    entity._position._value.x = position.x ;
                    entity._position._value.y = position.y ;
                    entity._position._value.z = position.z ;
                    entity.x = curpos.x;
                    entity.y = curpos.y;

                    //计算需要显示的实时轨迹顶点
                    //轨迹=第一个节点前的顶点+
                    if(entity.playRealTimeTrack){
                        var vet = [];
                        if(entity.pathTrack.length>30*3){
                            vet = entity.pathTrack.slice(entity.pathTrack.length-30*3-3,entity.pathTrack.length-3);
                            vet.push(curpos.x,curpos.y,0);
                            entity.pathRender = vet;
                        }else{
                            if(entity.pathTrack.length<=3){
                                //说明是在点运动过程中，开始播放，测试新点还未加到pathTrack中
                                entity.pathRender.push(curpos.x,curpos.y,0);
                                entity.firstPathRenderSeg = entity.pathRender.slice();
                            }
                            else{
                                // if(entity.firstPathRenderSeg)
                                // {
                                    // vet = entity.firstPathRenderSeg.concat(entity.pathTrack.slice(0,entity.pathTrack.length-3));
                                    // vet.push(curpos.x,curpos.y,0);
                                     //entity.pathRender = vet;
                                // }
                                // else{
                                    entity.pathRender.push(curpos.x,curpos.y,0);
                                // }
                            }
                        } 
                    }
                }
            }

            //按图层统一发送所有track的点信息
            if(btrackedpoint){
                var firedata = {};
                firedata.layerName = datasource.name;
                firedata.data = dypointArray;
                instance.fire("pointPositionUpdateEvent", firedata,{bubbles: false});
            }      
        }
    } 
}

vtron.comp.std.map.Cesium.prototype.movePointsEx = function(layerName, dataInfo,animate=true) {

    var datasource = this.getDataSourceByName(layerName);
    if(!datasource || !dataInfo) return;
    datasource.animate = true;
    this._dynameLayer_dataSource[layerName]=datasource;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var entity = datasource.entities.getById(data.id);
        if(entity && animate) {
            var position = Cesium.Cartesian3.fromDegrees(data.x, data.y);
            if(entity.animate==true){
                //当点再运动过程中，接受到新的位置时，用当前的终点作为新的起点
                entity.start_x = entity.end_x;
                entity.start_y = entity.end_y;
            }
            entity.end_x = data.x;
            entity.end_y = data.y;
            entity.interval = data.intervaltime||3000;//default value:3000ms
            entity.start_time = new Date().getTime();
            entity.animate = true;
            entity.normalize = null;
            entity.distance = null;
            entity.vec = null;
            if(entity.playRealTimeTrack){
               //只有在启动实时gps播放才计算
               entity.pathTrack.push(data.x,data.y,0);
            }
        }
    });
    var ViewerObject = this;
    if(timeDynamicPoint == false){
        //创建定时器 30ms 计算更新gps等动态点坐标
        window.setInterval(function(){
            _updateDynamicPoint(ViewerObject);
            },25);
        timeDynamicPoint = true;
    }
};

/**
 * 修改primitive的位置，旋转，目前适用与GPS的更新
 * rotation默认设置heading
 */
vtron.comp.std.map.Cesium.prototype.planeChangePosition = function(layerName, id, lon, lat, rotation = 0) {
    var primitives = this.getPrimitiveById(layerName, id);
    primitives.forEach((item) => {
        let position = Cesium.Cartesian3.fromDegrees(parseFloat(lon), parseFloat(lat), 10),
            // heading = Cesium.Math.toRadians(parseFloat(rotation)),//绕垂直于地心的轴旋转
            heading = parseFloat(rotation),//绕垂直于地心的轴旋转
            pitch = Cesium.Math.toRadians(0.0), //绕纬度线旋转
            roll = Cesium.Math.toRadians(0.0);    //绕经度线旋转
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr); 
        var modelMatrix = Cesium.Matrix4.fromTranslationQuaternionRotationScale(position, orientation, item.scale);
        item.modelMatrix = modelMatrix;
    });
};

/**
 * 按名称查找指定datasource
 * 存在则返回datasource，不存在则返回false
 */
vtron.comp.std.map.Cesium.prototype.getDataSourceByName = function(layerName) {
    if(!this._viewer || !this._viewer.dataSources) return null;
    for(let dataSource of this._viewer.dataSources._dataSources) {
        if(dataSource.name == layerName) {
            return dataSource;
        }
    }
    return null;
};

/**
 * 按index查找指定datasource
 * 存在则返回datasource，不存在则返回false
 */
vtron.comp.std.map.Cesium.prototype.getDataSourceByIndex = function(index) {
    if(!this._viewer) return null;
    var datasource = this._viewer.dataSources.get(index);
    return datasource;
};

/**
 * datasource集合的长度
 * 存在则返回datasource，不存在则返回false
 */
vtron.comp.std.map.Cesium.prototype.getDataSourcelength = function() {
    if(!this._viewer) return 0; 
    return this._viewer.dataSources.length;
};

/**
 * 按名称查找指定primitiveCollection
 * 存在则返回primitiveCollection，不存在则返回false
 */
vtron.comp.std.map.Cesium.prototype.getPrimitiveCollectionByName = function(layerName) {
    if(!this._viewer || !this._viewer.scene.primitives) return null;
    //如果layerName是未定义或者空，没有意义返回
    if(layerName==null||!layerName){
        return;
    }
    for(let primitive of this._viewer.scene.primitives._primitives) {
        if(primitive.name == layerName){
            return primitive;
        }
    }
    return null;
};

/**
 * 查找entity对应的primitive,调整entity的位置和旋转,目前适用与GPS的更新
 * 返回值是数组,因为平面有可能带宽度，设置宽度会新增一个primitive
 */
vtron.comp.std.map.Cesium.prototype.getPrimitiveById = function(layerName, id) {
    let result = [],
        primitiveCollection = null;
    primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(primitiveCollection) {
        var primitives = primitiveCollection._primitives;
        primitives.forEach((item) => {
            if(item instanceof Cesium.Primitive || item instanceof Cesium.Cesium3DTileset) {
                //检查item是Primitive还是3dtileset
                //id传进来的暂时不支持数组
                if(item.id == id) {
                    result.push(item);
                    return;
                }
            }
        });
        return result;
    } 
};

/**
 * 查找entity
 */
vtron.comp.std.map.Cesium.prototype.getEntityById = function(layerName, id) {
    var datasource = this.getDataSourceByName(layerName);
    var result = null;
    if(datasource) {
        result = datasource.entities.getById(id);
    }
    return result;
};

/**
 * 批量显示批量隐藏点\线\面;
 * 如果图层隐藏，则修改图层状态为显示
 * 如果fids为空或者未定义，表示需要设置某图层的所有要素为显示状态，但并不修改图层本省的显隐状态
 */
vtron.comp.std.map.Cesium.prototype.showElements = function(layerName, fids) {
    var datasource = this.getDataSourceByName(layerName);
    var primitives = undefined;
    if(!datasource){
        primitives = this.getPrimitiveCollectionByName(layerName);
    }
    if(!datasource&&!primitives) return;
 
    if(!(fids instanceof Array)) fids = [fids];
    if(datasource.geoType=='simpleLine') {
        fids.forEach(id => {
            datasource.getGeometryInstanceAttributes(id).show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
        });
        return;
    }
    if(datasource){ 
        if(!fids||!fids.length) {
            datasource.entities.values.forEach(entity => entity.show = true);
        } else {
            fids.forEach(id => {
              var entity = datasource.entities.getById(id);
              if(entity){
                entity.show = true;
                if(entity.geoType=='circle' || entity.geoType=='polygon'){
                    //如果是圆要素，则需要把圆的outline实体也显示
                    var circleOutlineEntity = datasource.entities.getById(id+'.outline');
                    var circleOutlineHeighthEntity = datasource.entities.getById(id+'.outlineHeight');
                    if(circleOutlineEntity){
                        circleOutlineEntity.show = true;
                    }
                    if(circleOutlineHeighthEntity){
                        circleOutlineHeighthEntity.show = true;
                    }
                }
              }    
            })
        }
    }else if(primitives){//图层对象
        if(fids) {
            for(let id of fids) {
                var primitiveArray = this.getPrimitiveById(layerName,id);//图层中id对应的图元数组
                for(let primitiveObject of primitiveArray){
                    if(primitiveObject.geoType == 'polygonMask'){
                        //判断是否ready
                        var ready = primitiveObject.ready;
                        var promise =primitiveObject.readyPromise;
                        if(ready==false){
                            promise.then((data) => {
                                var attributes = primitiveObject.getGeometryInstanceAttributes(data.id);//获取某个实例的属性集,比如面蒙版的面图元
                                attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
                                if(primitiveObject.hasOutline){
                                var outlineObject = primitiveObject.outline;
                                var attributesOutline =outlineObject.getGeometryInstanceAttributes(data.id+'.outline');//获取某个实例的属性集，比如面蒙蔽中面的轮廓线
                                attributesOutline.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
                                //定位到该图元
                                this._viewer.zoomTo(outlineObject);
                                }
                            })
                        }else{
                            var attributes = primitiveObject.getGeometryInstanceAttributes(id);//获取某个实例的属性集,比如面蒙版的面图元
                            attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
                            if(primitiveObject.hasOutline){
                            var outlineObject = primitiveObject.outline;
                            var attributesOutline =outlineObject.getGeometryInstanceAttributes(id+'.outline');//获取某个实例的属性集，比如面蒙蔽中面的轮廓线
                            attributesOutline.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
                            //定位到该图元
                            //this._viewer.zoomTo(outlineObject);
                            }
                        }
                    }else{
                        primitiveObject.show = true;
                    }
                }
            }
        }
    }
    //this._viewer.scene.requestRender();
};

/**
 * 批量隐藏点\线\面，不传参数，全部隐藏
 * 如果fids为空或者未定义，表示需要设置某图层的所有要素为显示状态，但并不修改图层本省的显隐状态
 */
vtron.comp.std.map.Cesium.prototype.hideElements = function(layerName, fids) {
    var datasource = this.getDataSourceByName(layerName);
    var primitives = undefined;
    if(!datasource){
        primitives = this.getPrimitiveCollectionByName(layerName);
    }
    if(!datasource&&!primitives) return;
    if(!(fids instanceof Array)) fids = [fids];
    if(datasource.geoType=='simpleLine') {
        fids.forEach(id => {
            datasource.getGeometryInstanceAttributes(id).show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
        });
        return;
    }
    if(datasource){     
        if(!fids||!fids.length) {
            datasource.entities.values.forEach(entity => entity.show = false);
            //也要隐藏轮廓线的
            outlineDatasource = this.getDataSourceByName(layerName+'.outline');
            if(outlineDatasource){
                outlineDatasource.entities.values.forEach(entity => entity.show = false);
            }
        } else {
            fids.forEach(id => {
            var entity = datasource.entities.getById(id||'test');//'test'避免id未定义时的错误
            if(entity){
                entity.show = false;
                if(entity.geoType=='circle' || entity.geoType == 'polygon'){
                    //如果是圆要素和有outline的面要素，则需要把圆的outline实体也隐藏
                    var circleOutlineEntity = datasource.entities.getById(id+'.outline');
                    var circleOutlineHeightEntity = datasource.entities.getById(id+'.outlineHeight');
                    if(circleOutlineEntity){
                        circleOutlineEntity.show = false;
                    }
                    if(circleOutlineHeightEntity){
                        circleOutlineHeightEntity.show = false;
                    }
                }
            }
            })
        }
    }
    else if(primitives){//图层对象
        var setObjectPro = function(primitiveObject,show){
            if(!primitiveObject.ready) return;
            var attributes = primitiveObject.getGeometryInstanceAttributes(primitiveObject.id);//获取某个实例的属性集,比如面蒙版的面图元
            attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            if(primitiveObject.hasOutline){
                var outlineObject = primitiveObject.outline;
                var attributesOutline =outlineObject.getGeometryInstanceAttributes(primitiveObject.id+'.outline');//获取某个实例的属性集，比如面蒙蔽中面的轮廓线
                attributesOutline.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            }
        }
        if(fids&&fids.length) {
            for(let id of fids) {
                var primitiveObject = this.getPrimitiveById(layerName,id);//图层中id对应的图元数组
                //对返回数组中的每个primitive都执行
                for(let element of primitiveObject){
                    element.show = false;
                }
                setObjectPro(primitiveObject,false);
            }
        }else{
            for(let primitiveObject of primitives._primitives){
                setObjectPro(primitiveObject,false);
                console.log('hide'+primitiveObject.id);
           }
        }
    }
    //this._viewer.scene.requestRender();
};

/**
 * 删除隐藏点\线\面，和layerdelete功能重叠，但是对于组件的接口封装来说，deleteelements接口更直观
 * fids为空或者不定义，则标识删除图层中所有的实体（entity）
 */
vtron.comp.std.map.Cesium.prototype.deleteElements = function(layerName, fids=[]) {
    var datasource = this.getDataSourceByName(layerName) || this.getPrimitiveCollectionByName(layerName);
    if(!fids){
        if(datasource){
            datasource.entities.removeAll();
        }
    }
    if(!(fids instanceof Array)) fids = [fids];
    if(datasource){
        if(datasource.geoType=='simpleLine') {
            if(fids.length >0){
				fids.forEach(id => {
					datasource.getGeometryInstanceAttributes(id).show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
				});
			}else{
				if(!datasource.show){
					return;
				}else{
					this._viewer.scene.primitives.remove(datasource);
				}
			}
			return;
        }
        if(datasource.geoType=='polyline'){
            var instance = this;
            fids.forEach(id => {
                var entity = datasource.entities.getById(id);
                datasource.entities.removeById(id);
            });
            instance.fire('polylineDeleter',{
                'layerName':layerName,
                'ids':fids
            })
            return;
        }
        if(!fids||!fids.length||fids==[undefined]) {
            datasource.entities.removeAll();
        } else {
            if(datasource.pathTrackingLayer){
                //如果是轨迹图层，则需要删除额外的点,还要停止计时
                datasource.entities.removeAll();
                this._viewer.clockViewModel.shouldAnimate = false;
            }
            else{
                fids.forEach(id => {
                    var entity = datasource.entities.getById(id);
                    if(entity&&(entity.geoType=='circle'||entity.geoType=='polygon')){
                        //如果是圆要素/多边形要素，则需要把圆/多边形的outline实体也删除 
                        var circleOutlineEntity = datasource.entities.getById(id+'.outline');
                        if(circleOutlineEntity){
                            datasource.entities.removeById(id+'.outline');
                        }   
                    }else if(entity&&(entity.geoType == 'polyline')){
                        //如果是线要素，还要删除缓冲区和缓冲区的外轮廓
                        var polylineBufferEntity = datasource.entities.getById(id+'.buffer');
                        var polylineOutlineEntity = datasource.entities.getById(id+'.buffer.outline');
                        if(polylineBufferEntity){
                            datasource.entities.removeById(id+'.buffer');
                        }
                        if(polylineOutlineEntity){
                            datasource.entities.removeById(id+'.buffer.outline');
                        }
                    }
                    datasource.entities.removeById(id);
                });
            }
        }
    }

    //primitive
    var primitives = this.getPrimitiveCollectionByName(layerName)
    if(primitives){
        if(fids) {
            if(!(fids instanceof Array)) fids = [fids];
            for(let id of fids) {
                var primitiveCollection = this.getPrimitiveById(layerName, id);
                for(let primitive of primitiveCollection) {
                    //primitive.destroy();
                    primitives.remove(primitive)
                    //删除对应的材质记录
                    //如果是圆
                    if(this._mapDyCircleMaterial.get('dyCircleMaterial_'+id)){
                        this._mapDyCircleMaterial.delete('dyCircleMaterial_'+id);
                    }
                    //如果是流光线
                    if(this._mapStreamingLightMaterial.get('streamingLightMaterial_' + id)){
                        this._mapStreamingLightMaterial.delete('streamingLightMaterial_' + id);
                    }
                }
            }
        } else {
            this._viewer.scene.primitives.remove(layer);
            //layer.destroy();
            //  //如果是圆
            // this._mapDyCircleMaterial.removeAll();
        }   
    }
};

/**
 * 添加空图层，默认操作DataSource类型图层
 * 点图层gps，alert：CustomDataSource
 * type:0   往空图层中添加点，线和面要素，包括道路图层（道路上贴图片）和面图层(2D面拔高)  CustomDataSource
 *      1   静态图层，道路图层和面图层(普通样式) GeoJsonDataSource
 *      2   图元图层，目前只有优化后的道路图层使用 primitiveCollection
 */
vtron.comp.std.map.Cesium.prototype.addLayer = function(layerName,type=0) {
    if(!this._viewer) return;
   
    var dataSource = this.getDataSourceByName(layerName) || this.getPrimitiveCollectionByName(layerName);
    if(!dataSource) {
        if(type==0){
            dataSource = new Cesium.CustomDataSource(layerName);
        }
        else if(type == 1){
            dataSource = new Cesium.GeoJsonDataSource(layerName);
        }else if(type == 2){
            dataSource = new Cesium.Primitive({
				geometryInstances: [],
				appearance: new Cesium.PolylineColorAppearance({
					translucent: false,
				}),
				asynchronous: false,//to fix  error: _workerName must be defined for asynchronous geometry 
			});
			dataSource.name = layerName;
			dataSource.geoType='simpleLine';
			this._viewer.scene.primitives.add(dataSource);
			return;
        }

        this.setLayerDisplayCondition(layerName);
        this._viewer.dataSources.add(dataSource);
    }  
};

/**
 * 显示指定名称的图层（dataSource || primitive）,默认操作DataSource类型图层
 * 新增对3dtiles的显示操作 by ljy- 20190412
 */
vtron.comp.std.map.Cesium.prototype.layerShow = function(layerName, bPrimitive = false,ballElementShow=false) {
    var layer = null;
    //如果layerName是未定义或者空，没有意义返回
    if(layerName==null||!layerName){
        return;
    }
    if(this.getPrimitiveCollectionByName(layerName)){
        var showStatus = bPrimitive;
        bPrimitive = true;
        var primitiveLayer = this.getPrimitiveCollectionByName(layerName);
        //设置primitive图层每个元素的显隐
        if(primitiveLayer){
            if(primitiveLayer._primitives){
                primitiveLayer._primitives.forEach((primitive)=>{
                    primitive.show = bPrimitive;
                })
            }else{
                primitiveLayer.show = bPrimitive;
            }
        }
    }
    if(!bPrimitive) {
        layer = this.getDataSourceByName(layerName);
        if(ballElementShow){
            //强制所有点显示
            layer.entities.values.forEach(entity => entity.show = true);
        }
    } else {
        layer = this.getPrimitiveCollectionByName(layerName);
        if(layer.geoType == 'simpleLine'){
            layer.show = true;
            return;
		}
    }
    if(layer) {
        if(layer.clustering && layer.clustering.enabled){
            //拿到聚合后的billboard和label
            layer.clustering._clusterBillboardCollection._billboards.forEach((data)=>{data.show = true});
            layer.clustering._clusterLabelCollection._labels.forEach((data)=>{data.show = true});
            this._viewer.scene.hasClusterLayer = true;
        }
        layer.show = true;
        var outlineLayer = this.getDataSourceByName(layerName+'.outline');
        if(outlineLayer){
            outlineLayer.show = true;
        }
        // if(this._pointLayer&&this._pointLayer.get(layerName)){
        //     this._pointLayer.set(layerName,true);
        // }
        //设置图层的显隐属性
        if(this._layerDisplayCondition){
            var layerDisInfo = this._layerDisplayCondition.get(layerName)
            if(layerDisInfo){
                layerDisInfo.visible = layer.show;
            }
        }

        this._viewer.scene.requestRender();
        this.fire("layer-show", {"layerName": layerName, show: true, bPrimitive: bPrimitive}, {bubbles: false});
    }
};

/**
 * 隐藏指定名称的图层（dataSource || primitive）,默认操作DsataSource类型图层
 * 新增对3dtiles的隐藏操作 by ljy- 20190412
 */
vtron.comp.std.map.Cesium.prototype.layerHide = function(layerName, bPrimitive = false,ballElementHide=false) {
    var layer = null;
    //如果layerName是未定义或者空，没有意义返回
    if(layerName==null||!layerName){
        return;
    }
    if(this.getPrimitiveCollectionByName(layerName)){
        bPrimitive = true;
    }
    if(!bPrimitive) {
        layer = this.getDataSourceByName(layerName);
        if(ballElementHide){
            //强制所有点隐藏
            layer.entities.values.forEach(entity => entity.show = false);
        }
    } else {
        layer = this.getPrimitiveCollectionByName(layerName);
        if(layer.geoType == 'simpleLine'){
			layer.show = false;
		}
    }
    if(layer) {
        //primitiveLayer没有clustering
        if(layer.clustering && layer.clustering.enabled){
            //拿到聚合后的billboard和label
            layer.clustering._clusterBillboardCollection._billboards.forEach((data)=>{data.show = false});
            layer.clustering._clusterLabelCollection._labels.forEach((data)=>{data.show = false});
            this._viewer.scene.hasClusterLayer = false;
        }
        layer.show = false;
        //如果有outline也要隐藏outline
        var layerOutline = this.getDataSourceByName(layerName+".outline");
        if(layerOutline){
            layerOutline.show = false;
        }
        //设置图层的显隐属性
        if(this._layerDisplayCondition){
            var layerDisInfo = this._layerDisplayCondition.get(layerName);
            //如果有outline也要隐藏outline
            var layerOutlineDisInfo = this._layerDisplayCondition.get(layerName+".outline");
            if(layerDisInfo){
                layerDisInfo.visible = layer.show;
            }
            if(layerOutlineDisInfo){
                layerOutlineDisInfo.visible = layer.show;
            }
        }
        this._viewer.scene.requestRender();
        this.fire("layer-show", {"layerName": layerName, show: false, bPrimitive: bPrimitive}, {bubbles: false});
    }
};

/**
 * 删除指定名称的图层
 * layerName不设置的时候，则清除6类图层
 * dataInfo是id数组，不为空的时候，则删除指定名称图层的某些元素
 */
vtron.comp.std.map.Cesium.prototype.layerDelete = function(layerName, dataInfo, bPrimitive = false) {
    if(!layerName) {
        ['choose-line', 'draw-line', 'choose-polygon','choose-sector', 'choose-circle', 'draw', 'tempLayer'].forEach((name) => {
            let datasource = this.getDataSourceByName(name);
            datasource && this._viewer.dataSources.remove(datasource, true);
        });
        return;
    }
    //删除临时绘制的图形
    ['choose-line', 'draw-line', 'choose-polygon', 'choose-sector','choose-circle', 'draw', 'tempLayer'].forEach((name) => {
        if(name == layerName){
            if(name == 'draw'){
                this.drawingTag = false;
            }
            this.deleteTmpChooseGeomtry();
        }
    });
    //当是3dtiles图层时
    if(this.getPrimitiveCollectionByName(layerName)){
        bPrimitive = true;
    }
    if(!bPrimitive) {
        var datasource = this.getDataSourceByName(layerName);
        if(datasource) {
            if(dataInfo) {
                if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
                for(let id of dataInfo) {
                    datasource.entities.removeById(id);
                    var entity = datasource.entities.getById(id+'.outline');
                    if(entity){
                        //outline实体也删除 
                        datasource.entities.removeById(id+'.outline');
                    }
                    var heightEntity = datasource.entities.getById(id+'.outlineHeight');
                    if(heightEntity){
                        //outline实体也删除 
                        datasource.entities.removeById(id+'.outlineHeight');
                    }
                    //线的缓冲区也要删除
                    var bufferPolygon = datasource.entities.getById(id+'.buffer');
                    if(bufferPolygon){//outline实体也删除 
                        datasource.entities.removeById(id+'.buffer');
                        datasource.entities.removeById(id+'.outline');
                        datasource.entities.removeById(id+'.buffer.outline');
                    }
                }
            } else {
                this._viewer.dataSources.remove(datasource, true);
                
                if(this._layerDisplayCondition){
                    var layerDisInfo = this._layerDisplayCondition.get(layerName)
                    if(layerDisInfo){
                        this._layerDisplayCondition.delete(layerName);
                    }
                }
            }
        }
    } else {
        var layer = this.getPrimitiveCollectionByName(layerName);
        if(layer) {
            if(dataInfo) {
                if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
                for(let id of dataInfo) {
                   var primitiveCollection = this.getPrimitiveById(layerName, id);
                   for(let primitive of primitiveCollection) {
                        layer.remove(primitive);
                        //删除单个指定的primitive，暂时不清楚layer.destroy的影响
                        //primitive.destroy();
                        //如果是圆
                        if(this._mapDyCircleMaterial.get('dyCircleMaterial_'+id)){
                            this._mapDyCircleMaterial.delete('dyCircleMaterial_'+id);
                        }
                        //如果是流光线
                        if(this._mapStreamingLightMaterial.get('streamingLightMaterial_' + id)){
                            this._mapStreamingLightMaterial.delete('streamingLightMaterial_' + id);
                        }
                   }
                }
            } else {
                //整个图层删除，现在暂时不清除layer.destroy删除的影响
                this._viewer.scene.primitives.remove(layer);
                //layer.destroy();
            }
        }
    }
};

/**
 * 删除场景所有的datasource
 */
vtron.comp.std.map.Cesium.prototype.layerDeleteAll = function(bPrimitive = false) {
    if(!bPrimitive) {
        this._viewer.dataSources.removeAll(true);
        // if(this._pointLayer&&this._pointLayer.get(layerName)){
        //     this._pointLayer.delete(layerName);
        // }
        if(this._layerDisplayCondition){
            this._layerDisplayCondition.clear();
        }
    } else {
        this._viewer.scene.primitives.destroy();
    }
};

/**
 * 返回图层是否隐藏
 */
vtron.comp.std.map.Cesium.prototype.layerHidden = function(layerName, bPrimitive = false) {
    var layer = null;
    if(!bPrimitive) {
        layer = this.getDataSourceByName(layerName);
    } else {
        layer = getPrimitiveCollectionByName(layerName);
    }
    if(layer) {
        return !layer.show;
    }
    throw Error(layerName + '图层不存在');
};
/*
 *设置图层的显示范围
 *layerName:图层名
 *minAlt：最小显示高度
 *maxAlt：最大显示高度
 *visible:是否需要修改图层显隐属性（通过layerShow和layerHide设置，如果当前距离在minAlt和maxAlt之间时，图层显隐由visible属性控制）
 *
 */
vtron.comp.std.map.Cesium.prototype.setLayerDisplayCondition = function(layerName,minAlt=0,maxAlt=200000,visible = undefined){
    if(!this._viewer || !this._layerDisplayCondition) return;
    var condition = this._layerDisplayCondition.get(layerName);
    var conditionOutline = this._layerDisplayCondition.get(layerName+'.outline');
    if(!condition){
        //不存在该图层的记录，则创建
        var layerDisInfo={};
        layerDisInfo.minDisplayAltitude = minAlt||0;
        layerDisInfo.maxDisplayAltitude = maxAlt||200000;
        layerDisInfo.visible = visible || undefined;
        this._layerDisplayCondition.set(layerName,layerDisInfo);
        this._layerDisplayCondition.set(layerName+'.outline',layerDisInfo);
    }
    else{
        //存在该图层的记录，则更新
        condition.minDisplayAltitude = minAlt||0;
        condition.maxDisplayAltitude = maxAlt||200000;
        condition.visible = visible || undefined;
        if(conditionOutline){
            conditionOutline.minDisplayAltitude = minAlt||0;
            conditionOutline.maxDisplayAltitude = maxAlt||200000;
            conditionOutline.visible = visible || undefined;
        }
    }
};

/*
 *内部函数，在loadpoly***图层以后，设置layerDisInfo.visible
 *map2:mapengine2实例
 */
var _iniLayerDisplayConditionVisible=function(map2,layerName,visible){
    if(map2._layerDisplayCondition){
        var condition = map2._layerDisplayCondition.get(layerName);
        if(condition){
            condition.visible = visible;
            map2._layerDisplayCondition.set(layerName,condition);
        }
    }
};

/**
 * 搜索指定实体内的指定图层
 * layerNameArray:搜索层名集合,如果缺省则搜索默认集合this.searchLayerArray
 * layerName: 指定搜索实体所在的图层
 * id: 指定实体的id
 * optState操作状态, radius参数只有在操作状态为choose-circle才生效
 * bCmd:true或者undefined表示是指令的调用（不需要再通知其它端进行searchByTurf），false表示地图内部进行选择操作（需要发送给其它端）
 * searchEventType是用来标志是不是地图自己做的
 */
vtron.comp.std.map.Cesium.prototype.searchTurfById = function(layerNameArray, layerName, id, otherProperty,bCmd, stopFire) {
    if(this.searchEventType){
        if(!otherProperty){otherProperty={};}
        otherProperty.searchEventType = this.searchEventType ;
    }
    var options = {units: 'meters'},  // 以米为单位
        result = {
            searchPoly: {
                id: id,
                layerName: layerName,
            },
            searchResult:[],
            data:otherProperty || {},
        };  // 返回结果集
    if(!layerNameArray) layerNameArray = this.searchLayerArray;
    if(!(layerNameArray instanceof Array)) layerNameArray = [layerNameArray];
    if(!(id instanceof Array)) id = [id];
    var searchResultisNull = true;
    
    id.forEach((item)=>{
        //获取实体及其边界
        var outlinePos = [];
        var aimEntity = this.getEntityById(layerName, item);
        if(aimEntity && aimEntity.geoType == 'polygon'){
            if(aimEntity.polygon.hierarchy.getValue()[aimEntity.polygon.hierarchy.getValue().length - 2] == aimEntity.polygon.hierarchy.getValue()[aimEntity.polygon.hierarchy.getValue().length - 1]){
                aimEntity.polygon.hierarchy.getValue().pop();
            }
            aimEntity.polygon.hierarchy.getValue().forEach((pos)=>{
                var cart = this.getCartographicFromCartesian(pos.x, pos.y, pos.z);
                outlinePos.push([cart.lon, cart.lat]);
            });
            outlinePos.push(outlinePos[0]);//起点和终点要合并
        }else if(!aimEntity){
            return null;
        }
        //遍历需要搜索的图层
        layerNameArray.forEach((layer)=>{
            var layerResult = [],
                propertiesResult = [],
                datasource = this.getDataSourceByName(layer);
            if(datasource){
                switch(aimEntity.geoType) {
                    case 'polygon':
                        if(outlinePos.length >= 4) {
                            var poly = turf.polygon([outlinePos]);
                            datasource.entities.values.forEach((entity) => {
                                if(entity.x && entity.y){
                                    var pt = turf.point([entity.x, entity.y]);
                                    var bChoose = turf.booleanPointInPolygon(pt, poly);
                                    if(bChoose) {
                                        layerResult.push(entity);
                                    }
                                }
                            });
                        }
                        break;
                }
                // layerResult保存的是entity实体
                layerResult.forEach((entity) => {
                    //也要抛出坐标
                    //lonlat = {lon:,lat:}
                    var lonlat = this.getCartographicFromCartesian(entity.position._value.x, entity.position._value.y, entity.position._value.z);
                    if(!entity.otherProperty){
                        entity.otherProperty = {};
                    }
                    entity.otherProperty.id = entity.id;
                    entity.otherProperty.position = {'x': lonlat.lon, 'y':lonlat.lat};
                    propertiesResult.push(entity.otherProperty);
                    searchResultisNull = false;
                });
                result.searchResult.push({
                    Information: propertiesResult,
                    LayerName: layer
                });
                    
            }
        });
    });
    
    result.bCmd = bCmd== undefined ? true: bCmd;
    !stopFire && this.fire('singleElementSelect', result);
    result.searchResultisNull = searchResultisNull;
    //如果是有返回结果，代表有结果
    //fix空间选择引起的删除顺序的问题
    if(!result.searchResultisNull){
        this.optChooseResult = true;
    }
    //log LLL
    if(this._debugTyle){
        var info = {};
        info.level = 0;//warn
        info.function = 'searchById';
        //info.para =[layerName,data.id];
        info.info = "指定要素的空间查找："+ result;
        this._mapLog(info); 
    }
    return result;
}

/**
 * 搜索指定实体外扩一定范围(缓冲区)的指定图层，和searchTurfById一样目前只做了polygon的
 * layerNameArray:搜索层名集合,如果缺省则搜索默认集合this.searchLayerArray
 * layerName: 指定搜索实体所在的图层
 * id: 指定实体的id
 * bufferRadius: 缓冲距离，单位米
 * optState操作状态, radius参数只有在操作状态为choose-circle才生效
 * bCmd:true或者undefined表示是指令的调用（不需要再通知其它端进行searchByTurf），false表示地图内部进行选择操作（需要发送给其它端）
 * searchEventType是用来标志是不是地图自己做的
 */
vtron.comp.std.map.Cesium.prototype.searchTurfByBuffer = function(layerNameArray, layerName, id, bufferRadius, otherProperty, bCmd, stopFire) {
    if(this.searchEventType){
        if(!otherProperty){otherProperty={};}
        otherProperty.searchEventType = this.searchEventType ;
    }
    var options = {units: 'meters'},  // 以米为单位
        result = {
            searchPoly: {
                id: id,
                layerName: layerName,
            },
            searchResult:[],
            data:otherProperty || {},
        };  // 返回结果集
    if(!layerNameArray) layerNameArray = this.searchLayerArray;
    if(!(layerNameArray instanceof Array)) layerNameArray = [layerNameArray];
    if(!(id instanceof Array)) id = [id];
    var searchResultisNull = true;
    
    id.forEach((item)=>{
        //获取实体及其边界
        var outlinePos = [];
        var aimEntity = this.getEntityById(layerName, item);
        if(aimEntity && aimEntity.geoType == 'polygon'){
            if(aimEntity.polygon.hierarchy.getValue()[aimEntity.polygon.hierarchy.getValue().length - 2] == aimEntity.polygon.hierarchy.getValue()[aimEntity.polygon.hierarchy.getValue().length - 1]){
                aimEntity.polygon.hierarchy.getValue().pop();
            }
            aimEntity.polygon.hierarchy.getValue().forEach((pos)=>{
                var cart = this.getCartographicFromCartesian(pos.x, pos.y, pos.z);
                outlinePos.push([cart.lon, cart.lat]);
            });
            outlinePos.push(outlinePos[0]);//起点和终点要合并
        }else if(aimEntity && aimEntity.geoType == 'polyline'){
            let positions = aimEntity.polyline.positions.getValue(this._viewer.clock.currentTime);
            positions.forEach((pos)=>{
                var cart = this.getCartographicFromCartesian(pos.x, pos.y, pos.z);
                outlinePos.push([cart.lon, cart.lat]);
            });
        }else if(!aimEntity){
            return null;
        }
        //遍历需要搜索的图层
        layerNameArray.forEach((layer)=>{
            var layerResult = [],
                propertiesResult = [],
                datasource = this.getDataSourceByName(layer);
            if(datasource){
                switch(aimEntity.geoType) {
                    case 'polygon':
                        if(outlinePos.length >= 4) {
                            var poly = turf.polygon([outlinePos]);
                            //create buffer
                            var polyBuffer = turf.buffer(poly, bufferRadius, {units: 'meters'});
                            datasource.entities.values.forEach((entity) => {
                                if(entity.x && entity.y){
                                    var pt = turf.point([entity.x, entity.y]);
                                    var bChoose = turf.booleanPointInPolygon(pt, polyBuffer);
                                    if(bChoose) {
                                        layerResult.push(entity);
                                    }
                                }
                            });
                        }else{
                            return null;
                        }
                    break;
                    case 'polyline':
                        var polyline = turf.lineString(outlinePos);
                        var polyBuffer = turf.buffer(polyline, bufferRadius, {units: 'meters'});
                        datasource.entities.values.forEach((entity) => {
                            if(entity.x && entity.y){
                                var pt = turf.point([entity.x, entity.y]);
                                var bChoose = turf.booleanPointInPolygon(pt, polyBuffer);
                                if(bChoose) {
                                    layerResult.push(entity);
                                }
                            }
                        });
                    break;
                    case 'circle':
                        var centerCar = aimEntity.position.getValue(this._viewer.clock.currentTime);
                        var circle = turf.circle([this.getCartographicFromCartesian(centerCar.x, centerCar.y, centerCar.z).lon, this.getCartographicFromCartesian(centerCar.x, centerCar.y, centerCar.z).lat], aimEntity.radius, {units: 'meters'});
                        var circleBuffer = turf.buffer(circle, bufferRadius, {units: 'meters'});
                        datasource.entities.values.forEach((entity) => {
                            if(entity.x && entity.y){
                                var pt = turf.point([entity.x, entity.y]);
                                var bChoose = turf.booleanPointInPolygon(pt, circleBuffer);
                                if(bChoose) {
                                    layerResult.push(entity);
                                }
                            }
                        });
                    break;
                }
                // layerResult保存的是entity实体
                layerResult.forEach((entity) => {
                    //也要抛出坐标
                    //lonlat = {lon:,lat:}
                    var lonlat = this.getCartographicFromCartesian(entity.position._value.x, entity.position._value.y, entity.position._value.z);
                    if(!entity.otherProperty){
                        entity.otherProperty = {};
                    }
                    entity.otherProperty.id = entity.id;
                    entity.otherProperty.position = {'x': lonlat.lon, 'y':lonlat.lat};
                    propertiesResult.push(entity.otherProperty);
                    searchResultisNull = false;
                });
                result.searchResult.push({
                    Information: propertiesResult,
                    LayerName: layer
                });
                    
            }
        });
    });
    
    result.bCmd = bCmd== undefined ? true: bCmd;
    !stopFire && this.fire('singleElementSelect', result);
    result.searchResultisNull = searchResultisNull;
    //如果是有返回结果，代表有结果
    //fix空间选择引起的删除顺序的问题
    if(!result.searchResultisNull){
        this.optChooseResult = true;
    }
    //log LLL
    if(this._debugTyle){
        var info = {};
        info.level = 0;//warn
        info.function = 'searchById';
        //info.para =[layerName,data.id];
        info.info = "指定要素的空间查找："+ result;
        this._mapLog(info); 
    }
    return result;
}

/**
 * 搜索位于传入边界坐标图形内部/缓冲范围内的图层的要素
 * layerNameArray:搜索层名集合,如果缺省则搜索默认集合this.searchLayerArray
 * positions: 用来搜索的实体的边界，[cartesian3，cartesian3,...cartesian3]
 * geoType: 边界的形状 draw-line 线 draw-circle圆 draw-polygon面
 * bufferRadius: 缓冲距离，单位米,如果是draw-circle，则bufferRadius是圆本身半径+搜索半径
 * optState操作状态, radius参数只有在操作状态为choose-circle才生效
 * bCmd:true或者undefined表示是指令的调用（不需要再通知其它端进行searchByTurf），false表示地图内部进行选择操作（需要发送给其它端）
 * searchEventType是用来标志是不是地图自己做的
 */
vtron.comp.std.map.Cesium.prototype.searchTurfByBounds = function(layerNameArray, positions, geoType, bufferRadius, otherProperty, bCmd, stopFire) {
    if(this.searchEventType){
        if(!otherProperty){otherProperty={};}
        otherProperty.searchEventType = this.searchEventType ;
    }
    var options = {units: 'meters'},  // 以米为单位
        result = {
            searchPoly: {
                positions: positions,
            },
            searchResult:[],
            data:otherProperty || {},
        };  // 返回结果集
    if(!layerNameArray) layerNameArray = this.searchLayerArray;
    if(!(layerNameArray instanceof Array)) layerNameArray = [layerNameArray];
    var searchResultisNull = true;
    //构造turf坐标
    var outlinePos = [];
    switch(geoType) {
        case 'draw-polygon':
            if(positions.length > 2){
                positions.forEach((pos)=>{
                    let cart = this.getCartographicFromCartesian(pos.x, pos.y, pos.z);
                    outlinePos.push([cart.lon, cart.lat]);
                });
                outlinePos.push(outlinePos[0]);//起点和终点要合并
            }else{
                return null;
            }
        break;
        case 'draw-line':
            positions.forEach((pos)=>{
                let cart = this.getCartographicFromCartesian(pos.x, pos.y, pos.z);
                outlinePos.push([cart.lon, cart.lat]);
            });
        break;
    }

    //找结果
    //遍历需要搜索的图层
    layerNameArray.forEach((layer)=>{
        var layerResult = [],
            propertiesResult = [],
            datasource = this.getDataSourceByName(layer);
        if(datasource){
            switch(geoType) {
                case 'draw-polygon':
                    if(outlinePos.length >= 4) {
                        var poly = turf.polygon([outlinePos]);
                        //create buffer
                        var polyBuffer = turf.buffer(poly, bufferRadius, {units: 'meters'});
                        datasource.entities.values.forEach((entity) => {
                            if(entity.x && entity.y){
                                var pt = turf.point([entity.x, entity.y]);
                                var bChoose = turf.booleanPointInPolygon(pt, polyBuffer);
                                if(bChoose) {
                                    layerResult.push(entity);
                                }
                            }
                        });
                    }
                break;
                case 'draw-polyline':
                    var polyline = turf.lineString(outlinePos);
                    var polyBuffer = turf.buffer(polyline, bufferRadius, {units: 'meters'});
                    datasource.entities.values.forEach((entity) => {
                        if(entity.x && entity.y){
                            var pt = turf.point([entity.x, entity.y]);
                            var bChoose = turf.booleanPointInPolygon(pt, polyBuffer);
                            if(bChoose) {
                                layerResult.push(entity);
                            }
                        }
                    });
                break;
                case 'draw-circle':
                    let center = turf.point([this.getCartographicFromCartesian(positions[0].x, positions[0].y, positions[0].z).lon, this.getCartographicFromCartesian(positions[0].x, positions[0].y, positions[0].z).lat]);
                    var circleBuffer = turf.buffer(center, bufferRadius, {units: 'meters'});
                    datasource.entities.values.forEach((entity) => {
                        if(entity.x && entity.y){
                            var pt = turf.point([entity.x, entity.y]);
                            var bChoose = turf.booleanPointInPolygon(pt, circleBuffer);
                            if(bChoose) {
                                layerResult.push(entity);
                            }
                        }
                    });
                break;
            }
            // layerResult保存的是entity实体
            layerResult.forEach((entity) => {
                //也要抛出坐标
                //lonlat = {lon:,lat:}
                var lonlat = this.getCartographicFromCartesian(entity.position._value.x, entity.position._value.y, entity.position._value.z);
                if(!entity.otherProperty){
                    entity.otherProperty = {};
                }
                entity.otherProperty.id = entity.id;
                entity.otherProperty.position = {'x': lonlat.lon, 'y':lonlat.lat};
                propertiesResult.push(entity.otherProperty);
                searchResultisNull = false;
            });
            result.searchResult.push({
                Information: propertiesResult,
                LayerName: layer
            });
                
        }
    });
    
    result.bCmd = bCmd== undefined ? true: bCmd;
    !stopFire && this.fire('singleElementSelect', result);
    result.searchResultisNull = searchResultisNull;
    //如果是有返回结果，代表有结果
    //fix空间选择引起的删除顺序的问题
    if(!result.searchResultisNull){
        this.optChooseResult = true;
    }
    //log LLL
    if(this._debugTyle){
        var info = {};
        info.level = 0;//warn
        info.function = 'searchById';
        //info.para =[layerName,data.id];
        info.info = "指定要素的空间查找："+ result;
        this._mapLog(info); 
    }
    return result;
}

/**
 * layerNameArray:搜索层名集合,如果缺省则搜索默认集合this.searchLayerArray
 * 空间搜索: choose-line|draw-line|choose-circle|choose-polygon|move
 * optState操作状态, radius参数只有在操作状态为choose-circle才生效
 * bCmd:true或者undefined表示是指令的调用（不需要再通知其它端进行searchByTurf），false表示地图内部进行选择操作（需要发送给其它端）
 * searchEventType是用来标志是不是地图自己做的
 */
vtron.comp.std.map.Cesium.prototype.searchByTurf = function(layerNameArray, optID, optState, vertices, lineWidth, radius = 0, otherProperty,bCmd, stopFire) {
    if(this.searchEventType){
        if(!otherProperty){otherProperty={};}
        otherProperty.searchEventType = this.searchEventType ;
    }
    var originalPoints = [],
        options = {units: 'meters'},  // 以米为单位
        result = {
            searchPoly: {
                id: optID
            },
            searchResult:[],
            data:otherProperty || {},
        };  // 返回结果集
    if(!layerNameArray) layerNameArray = this.searchLayerArray;
    if(!(layerNameArray instanceof Array)) layerNameArray = [layerNameArray];
    // 将vertices数组转成Geo格式
    vertices.forEach((vertex) => {
        var cart = this.getCartographicFromCartesian(vertex.x, vertex.y, vertex.z);
        originalPoints.push([cart.lon, cart.lat]);
    });
    //最后一个点会因为双击多存一个，pop掉(否则searchResult那边会多找一次，最后多抛出一次结果)只有线选和面选会有
    if(optState=='choose-line'||optState=='choose-polygon'||optState=='choose-sector'){
        if(originalPoints.length >2 && (originalPoints[originalPoints.length - 2] == originalPoints[originalPoints.length - 1])){
            originalPoints.pop();
        }
    }
    var searchResultisNull = true;

    switch(optState) {
        case 'choose-line':
            result.searchPoly.Type = 'line';
            result.searchPoly.GeoPolyLineString = vertices;
            result.searchPoly.LineWidth = lineWidth||this.bufferRadius;//缓冲半径
            break;
        case 'choose-polygon':
            result.searchPoly.Type = 'polygon';
            result.searchPoly.GeoPolyLineString = vertices;
            break;
        case 'choose-sector':
            result.searchPoly.Type = 'sector';
            result.searchPoly.GeoPolyLineString = vertices;
            break;
        case 'choose-circle':
            result.searchPoly.Type = 'circle';
            result.searchPoly.GeoCenter = vertices[0];
            result.searchPoly.GeoRadius = radius;
            break;
    };
    var tempLayerArray = [];
    tempLayerArray.push(layerNameArray[0]);
    for(var i = 1; i<layerNameArray.length;i++){
        if(layerNameArray.indexOf(layerNameArray[i])==i){
            tempLayerArray.push(layerNameArray[i]);//数组中第一次出现
        }else{
            continue;
        }
    }
    layerNameArray = [];
    layerNameArray = tempLayerArray;
    layerNameArray.forEach((layerName) => {
        var layerResult = [],
            propertiesResult = [],
            positions = [],
            datasource = this.getDataSourceByName(layerName);
        if(datasource) {
            switch(optState) {
                case 'choose-line':
                    // 线构建一个面缓冲区
                    var searchResult = [],
                        line = turf.lineString(originalPoints),
                        polyBuffer = turf.buffer(line, lineWidth, options);
                    datasource.entities.values.forEach((entity) => {
                        if(entity.x && entity.y){
                            var pt = turf.point([entity.x, entity.y]);
                            var bChoose = turf.booleanPointInPolygon(pt, polyBuffer);
                            if(bChoose) {
                                searchResult.push(entity);
                            }
                        }
                    });
                    // 排序
                    for(var i = 0, len = originalPoints.length - 1; i < len; i++) {
                        var tempResult = [];
                        var tempLine = turf.lineString(originalPoints.slice(i, i + 2));
                        var tempPolyBuffer = turf.buffer(tempLine, lineWidth, options);
                        searchResult.forEach((item) => {
                            var pt = turf.point([item.x, item.y]);
                            var bChoose = turf.booleanPointInPolygon(pt, tempPolyBuffer);
                            if(bChoose) {
                                var distance = turf.distance(originalPoints[i], pt, options);
                                item.distance = distance;
                                tempResult.push(item);
                            }
                        })
                        tempResult.sort((a, b) => {
                            return a.distance - b.distance;
                        });
                        layerResult = layerResult.concat(tempResult);
                    }
                    var copyResult = layerResult;
                    layerResult = [];
                    for(var i = 0, len = copyResult.length;i<len;i++){
						if(copyResult.indexOf(copyResult[i])!=i){
							continue;
						}
						layerResult.push(copyResult[i]);
                    }
                    break;
                case 'choose-polygon':
                    // 计算多边形的时候，首尾点要一致
                    originalPoints.push(originalPoints[0]);
                    if(originalPoints.length >= 4) {
                        var poly = turf.polygon([originalPoints]);
                        datasource.entities.values.forEach((entity) => {
                            if(entity.x && entity.y){
                                var pt = turf.point([entity.x, entity.y]);
                                var bChoose = turf.booleanPointInPolygon(pt, poly);
                                if(bChoose) {
                                    layerResult.push(entity);
                                }
                            }
                        });
                    }
                    break;
                case 'choose-sector':
                    // 计算多边形的时候，首尾点要一致
                    originalPoints.push(originalPoints[0]);
                    if(originalPoints.length >= 4) {
                        var poly = turf.polygon([originalPoints]);
                        datasource.entities.values.forEach((entity) => {
                            if(entity.x && entity.y){
                                var pt = turf.point([entity.x, entity.y]);
                                var bChoose = turf.booleanPointInPolygon(pt, poly);
                                if(bChoose) {
                                    layerResult.push(entity);
                                }
                            }
                        });
                    }
                    break;
                case 'choose-circle':
                    var from = turf.point(originalPoints[0]);
                    datasource.entities.values.forEach((entity) => {
                        if(entity.x && entity.y){
                            var to = turf.point([entity.x, entity.y]);
                            var distance = turf.distance(from, to, options);
                            if(distance < radius) {
                                entity.distance = distance;
                                layerResult.push(entity);
                            }
                        }
                    });
                    //圈选优化start
                    // var meter2degree = radius/111319.55;
                    // var topleftlon = originalPoints[0][0]-meter2degree;
                    // var topleftlat = originalPoints[0][1]+meter2degree;
                    // var bottomrightlon = originalPoints[0][0]+meter2degree;
                    // var bottomrightlat = originalPoints[0][1]-meter2degree;
                    // var from = turf.point(originalPoints[0]);
                    // datasource.entities.values.forEach((entity) => {
                    //     if(entity.x && entity.y){
                    //         if(!(entity.x > bottomrightlon ||entity.x <topleftlon||entity.y>topleftlat||entity.y<bottomrightlat)) {
                    //             var to = turf.point([entity.x, entity.y]);
                    //             var distance = turf.distance(from, to, options);
                    //             if(distance < radius) {
                    //                 entity.distance = distance;
                    //                 layerResult.push(entity);
                    //             }
                    //         }
                    //     }
                    // });
                    //圈选优化end
                    // 搜索结果按距离升序排
                    layerResult.sort((a, b) => {
                        return a.distance - b.distance;
                    });
                    
                    break;
            }
        }
        // layerResult保存的是entity实体
        layerResult.forEach((entity) => {
            //也要抛出坐标
            //lonlat = {lon:,lat:}
            var lonlat = this.getCartographicFromCartesian(entity.position._value.x, entity.position._value.y, entity.position._value.z);
            if(!entity.otherProperty){
                entity.otherProperty = {};
            }
            entity.otherProperty.id = entity.id;
            entity.otherProperty.position = {'x': lonlat.lon, 'y':lonlat.lat};
            propertiesResult.push(entity.otherProperty);
            searchResultisNull = false;
        });
        result.searchResult.push({
            Information: propertiesResult,
            LayerName: layerName
        });
    })

    result.bCmd = bCmd== undefined ? true: bCmd;
    !stopFire && this.fire('elementRangeSelect', result);
    result.searchResultisNull = searchResultisNull;
    //如果是有返回结果，代表有结果
    //fix空间选择引起的删除顺序的问题
    if(!result.searchResultisNull){
        this.optChooseResult = true;
    }
    //log LLL
    if(this._debugTyle){
        var info = {};
        info.level = 0;//warn
        info.function = 'searchByTurf';
        //info.para =[layerName,data.id];
        info.info = "空间查找："+ result;
        this._mapLog(info); 
    }
    return result;
};

/** 
 * 空间查询功能之一，判断一个是否在另外一个图形里
 * vertices：需要判断的点[x,y]
 * referenceInfo: 参考的实体：
 * 如果是面：第一个点和终点要相同（闭合）：[[x1,y1],[x2,y2],...[xn,yn]]
 * 如果是线：第一个点和终点不需要闭合：[[x1,y1],[x2,y2],...[xn,yn]]
 * 返回结果：false：不在面/线里，true:在面/线里
 */
vtron.comp.std.map.Cesium.prototype.booleanPointInShape = function(vertice, referenceInfo) {
    if(!this._viewer || !vertice || typeof(vertice.x)!= 'number' || typeof(vertice.y)!= 'number'){
        result = false;
    }
    if(referenceInfo[0]==referenceInfo[referenceInfo.length - 1]){
        result = turf.booleanPointInPolygon(turf.point(vertice), turf.polygon([referenceInfo]));
    }else{
        //reference是线
        result = turf.booleanPointOnLine(turf.point(vertice), turf.lineString(referenceInfo));
    }
    return result;
};

/** 
 * 获取内部CesiumViewer对象
 */
vtron.comp.std.map.Cesium.prototype.getInternalMap = function() {
    return this._viewer;
};

/**
 * 遍历_levelZeroTiles四叉树，暂时用于地图反色
 */
vtron.comp.std.map.Cesium.prototype.preorder = function(item) {
    if(!item.data) {
        return;
    }
    this.tileQueueList.push(item);
    this.preorder(item.children[0]);
    this.preorder(item.children[1]);
    this.preorder(item.children[2]);
    this.preorder(item.children[3]);
};

/**
 * 地图反色
 * invertFlag：是否反色的标识，可以丢去
* type：
*      0：原色
*      1：反色
*      2：亮色地图变成黑灰白地图
*      3：亮色地图变成蓝黑色地图
*      4：测试亮地图锐化：突出文字
*      5：测试亮地图锐化：突出文字
*      6：黑地图偏蓝色
 */
vtron.comp.std.map.Cesium.prototype.invertMapColor = function(type=0) {
    //if(this.invertFlag == invertFlag) return;
    //判断cesium版本
    var baseFragmentShaderSourceId;
    if(Cesium.VERSION == "1.56.1"){
		baseFragmentShaderSourceId = 1;
    }else if(Cesium.VERSION == "1.46"){
    	baseFragmentShaderSourceId = 0;
    }
    this.tileQueueList = [];
    var globe = this._viewer.scene.globe;
    // 清除已经创建的surfaceShader,防止新修改的shader不生效
    globe._surfaceShaderSet._shadersByTexturesFlags = [];
    var baseFragmentShaderSource = globe._surfaceShaderSet.baseFragmentShaderSource;  
    // 修改primitive的levelZeroTiles节点，遍历四叉树
    //if(!globe._surface._levelZeroTiles) return;
    if(globe._surface._levelZeroTiles){
        for(var i = 0, len = globe._surface._levelZeroTiles.length; i < len; i++) {
            this.preorder(globe._surface._levelZeroTiles[i]); 
        }
        this.tileQueueList.forEach((tile) => {
            tile.data.surfaceShader = null;
        });
    }
    if(!type){
        //有些显卡可能会识别成未定义
        type = 0;
    }
    if(type!=0){
        var fragmentShader = Cesium._shaders['GlobeFS'];
        baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;
    }
    if(type==0){
        //原色
        var fragmentShader = Cesium._shaders['GlobeFS'];
        this.invertFlag = false;//ljyi无论type是不是0，只要执行了反色，invertFlag这个反色状态就是true
    }else if(type==1){
        var str = `vec4 finalColor = vec4(vec3(1.0 - color.rgb), color.a);
        int invertType = 0;`;
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, str);
        this.invertFlag = true;
    }else if(type==2){
        // 灰度图
        var str = `float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
        vec4 finalColor = vec4(vec3(1.0 - gray), color.a);
        int invertType = 0;`;
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, str);
        this.invertFlag = true;
    }
    else if(type == 3){
        var str ='\n\
            #ifdef GL_FRAGMENT_PRECISION_HIGH\n\
                precision highp float;\n\
            #else\n\
                precision mediump float;\n\
            #endif\n\
            uniform vec4 u_initialColor;\n\
            float blendColorBurn(float base, float blend) {\n\
                return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);\n\
            }\n\
            vec3 blendColorBurn(vec3 base, vec3 blend) {\n\
                return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));\n\
            }\n\
            vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {\n\
                return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));\n\
            }\n\
            \n\
            float blendSoftLight(float base, float blend){\n\
                return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));\n\
            }\n\
            vec3 blendSoftLight(vec3 base, vec3 blend){\n\
                return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));\n\
            }\n\
            \n\
            vec3 blendSoftLight(vec3 base, vec3 blend, float opacity){\n\
                return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));\n\
            }'
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/uniform vec4 u_initialColor;/g, str);
        baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;   

        var mainstr = '\n\
            // Get map image\n\
            //vec4 texMapColor = texture2D(textureToSample, v_textureCoordinates);\n\
            vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
            \n\
            // Convert to greyscale using NTSC weightings \n\
            float grey = dot(texMapColor.xyz, vec3(0.30, 0.59, 0.11));\n\
            vec3 greyColor = vec3(grey);\n\
            \n\
            \n\
            // 第一层叠加: 颜色加深，color(#084666), opacity(80%)\n\
            vec3 blendColor = vec3(8.0/255.0, 70.0/255.0, 102.0/255.0);\n\
            vec3 finalColor3 = blendColorBurn(greyColor, blendColor, 0.8);\n\
            \n\
            // 第二层叠加：柔光，color(##0D66B7), opacity(100%)\n\
            blendColor = vec3(13.0/255.0, 102.0/255.0, 183.0/255.0);\n\
            finalColor3 = blendSoftLight(finalColor3, blendColor, 1.0);\n\
            \n\
            // 第三层叠加：柔光，color(##000000), opacity(80%)\n\
            blendColor = vec3(0.0, 0.0, 0.0);\n\
            finalColor3 = blendSoftLight(finalColor3, blendColor, 0.8);\n\
            vec4 finalColor = vec4(finalColor3, 1.0);\n\
            int invertType = 0;\n\
            //2 finalColor = texMapColor;\n\
            \n\
        ';
        fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, mainstr);
        this.invertFlag = true;    
    }
    else if(type == 4){
        //锐化
        var str='\n\
            #ifdef GL_FRAGMENT_PRECISION_HIGH\n\
              precision highp float;\n\
            #else\n\
              precision mediump float;\n\
            #endif\n\
              uniform vec4 u_initialColor;\n\
              //uniform sampler2D u_Sampler;\n\
              vec2 v_TexCoord;\n\
              \n\
              /*==============================================overlay===================================================*/\n\
            float blendOverlay(float base, float blend){\n\
                return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));\n\
            }\n\
              \n\
            vec3 blendOverlay(vec3 base, vec3 blend){\n\
                return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));\n\
            }\n\
            /*==============================================overlay===================================================*/\n\
            \n\
            /*==============================================Lighten===================================================*/\n\
            float blendLighten(float base, float blend){\n\
                return max(blend,base);\n\
            }\n\
            \n\
            vec3 blendLighten(vec3 base, vec3 blend) {\n\
                return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));\n\
            }';
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/uniform vec4 u_initialColor;/g, str);
        baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;  
        var mainstr = '\n\
            // 文字颜色 \n\
            vec3 overlayColor1 = vec3(0.619661, 0.937255, 1.0);\n\
            overlayColor1 = vec3(1.0, 1.0, 1.0);\n\
            //overlayColor1 = vec3(0.568627, 0.564705, 0.552941);\n\
            \n\
            // 地图叠加颜色 \n\
            vec3 overlayColor = vec3(0.101961, 0.329412, 0.360784);\n\
            \n\
            \n\
            /*============================================== 边缘检测 或 锐化 ===================================================*/\n\
            \n\
            // 上下左右纹理采样偏移亮，保持纹理大小的倒数 \n\
            const float offset = 1.0 / 256.0;  \n\
            \n\
            vec2 offsets[9];\n\
            offsets[0] = vec2(-offset, offset);  \n\
            offsets[0] = vec2(0.0,    offset);  \n\
            offsets[0] = vec2(offset,  offset);  \n\
            offsets[0] = vec2(-offset, 0.0);    \n\
            offsets[0] = vec2(0.0,    0.0);    \n\
            offsets[0] = vec2(offset,  0.0);    \n\
            offsets[0] = vec2(-offset, -offset); \n\
            offsets[0] = vec2(0.0,    -offset); \n\
            offsets[0] = vec2(offset,  -offset); \n\
            \n\
            // 锐化内核 \n\
            float kernel[9];  \n\
            kernel[0] = -1.0; \n\
            kernel[1] = -1.0; \n\
            kernel[2] = -1.0; \n\
            kernel[3] = -1.0; \n\
            kernel[4] = 9.0;  \n\
            kernel[5] = -1.0; \n\
            kernel[6] = -1.0; \n\
            kernel[7] = -1.0; \n\
            kernel[8] = -1.0;  \n\
            \n\
            \n\
            /*\n\
            // 边缘检测内核 \n\
            float kernel[9];  \n\
            kernel[0] = 1.0; \n\
            kernel[1] = 1.0; \n\
            kernel[2] = 1.0; \n\
            kernel[3] = 1.0; \n\
            kernel[4] = -8.0;  \n\
            kernel[5] = 1.0; \n\
            kernel[6] = 1.0; \n\
            kernel[7] = 1.0; \n\
            kernel[8] = 1.0;  \n\
            */\n\
            \n\
            \n\
            vec3 sampleTex[9];\n\
            v_TexCoord[0] = v_textureCoordinates[0];\n\
            v_TexCoord[1] = v_textureCoordinates[1];\n\
            for(int i = 0; i < 9; i++)\n\
            {\n\
              //sampleTex[i] = vec3(texture2D(u_Sampler, v_TexCoord + offsets[i]));\n\
              //vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
              sampleTex[i] = vec3(texture2D(u_dayTextures[0], vec2(v_textureCoordinates.x,v_textureCoordinates.y) + offsets[i]));\n\
              vec3 atest = vec3(vec2(v_textureCoordinates.x,v_textureCoordinates.y) + offsets[i],v_textureCoordinates.z);\n\
              vec4 texMapColor = computeDayColor(u_initialColor, clamp(atest, 0.0, 1.0));\n\
              sampleTex[i] = texMapColor.xyz;\n\
            }\n\
             vec3 col;\n\
            for(int i = 0; i < 9; i++)\n\
                col += sampleTex[i] * kernel[i];\n\
            /*============================================== 下面是边缘检测 或 锐化后进行处理 ===================================================*/\n\
            \n\
            float avr_blend = 0.2126 * col.r + 0.7152 * col.g + 0.0722 * col.b; \n\
            avr_blend = 1.0 - avr_blend; \n\
            float scale = 0.1; //边缘检测后绘制颜色强度\n\
            vec3 blendColor = vec3(1.0-(1.0 - avr_blend)/scale);\n\
            \n\
            blendColor = blendOverlay(blendColor, overlayColor1);\n\
            /*============================================== 边缘检测 或 锐化。完成 ===================================================*/\n\
            \n\
            \n\
            \n\
            // 获取地图图片颜色 \n\
            //vec3 texColor = vec3(texture2D(u_dayTextures[0], v_TexCoord));\n\
            vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
            vec3 texColor = texMapColor.xyz;\n\
            \n\
            // 反色、黑白 \n\
            vec3 invertColor = vec3(1.0) - texColor;\n\
            float average = 0.2126 * invertColor.r + 0.7152 * invertColor.g + 0.0722 * invertColor.b;\n\
            vec3 averageColor = vec3(average);\n\
            \n\
            // 叠加地图颜色 \n\
            vec3 baseColor = blendOverlay(averageColor, overlayColor);\n\
            \n\
            vec3 finalColor3= blendLighten(baseColor, blendColor);\n\;\n\
            vec4 finalColor = vec4(finalColor3,1.0);\n\
            int invertType = 0;\n\
            ';
        fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, mainstr);
        this.invertFlag = true;    
    }
    else if(type == 5){
        //锐化
        var str='\n\
            #ifdef GL_FRAGMENT_PRECISION_HIGH\n\
              precision highp float;\n\
            #else\n\
              precision mediump float;\n\
            #endif\n\
              uniform vec4 u_initialColor;\n\
              //uniform sampler2D u_Sampler;\n\
              vec2 v_TexCoord;\n\
              \n\
              /*==============================================overlay===================================================*/\n\
            float blendOverlay(float base, float blend){\n\
                return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));\n\
            }\n\
              \n\
            vec3 blendOverlay(vec3 base, vec3 blend){\n\
                return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));\n\
            }\n\
            /*==============================================overlay===================================================*/\n\
            \n\
            /*==============================================Lighten===================================================*/\n\
            float blendLighten(float base, float blend){\n\
                return max(blend,base);\n\
            }\n\
            \n\
            vec3 blendLighten(vec3 base, vec3 blend) {\n\
                return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));\n\
            }';
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/uniform vec4 u_initialColor;/g, str);
        baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;  
        var mainstr = '\n\
            // 文字颜色 \n\
            vec3 overlayColor1 = vec3(0.619661, 0.937255, 1.0);\n\
            overlayColor1 = vec3(1.0, 1.0, 1.0);\n\
            \n\
            // 地图叠加颜色 \n\
            vec3 overlayColor = vec3(0.101961, 0.329412, 0.360784);\n\
            \n\
            \n\
            /*============================================== 边缘检测 或 锐化 ===================================================*/\n\
            \n\
            // 上下左右纹理采样偏移亮，保持纹理大小的倒数 \n\
            const float offset = 1.0 / 256.0;  \n\
            \n\
            vec2 offsets[9];\n\
            offsets[0] = vec2(-offset, offset);  \n\
            offsets[0] = vec2(0.0,    offset);  \n\
            offsets[0] = vec2(offset,  offset);  \n\
            offsets[0] = vec2(-offset, 0.0);    \n\
            offsets[0] = vec2(0.0,    0.0);    \n\
            offsets[0] = vec2(offset,  0.0);    \n\
            offsets[0] = vec2(-offset, -offset); \n\
            offsets[0] = vec2(0.0,    -offset); \n\
            offsets[0] = vec2(offset,  -offset); \n\
            \n\
            // 锐化内核 \n\
            float kernel[9];  \n\
            kernel[0] = -1.0; \n\
            kernel[1] = -1.0; \n\
            kernel[2] = -1.0; \n\
            kernel[3] = -1.0; \n\
            kernel[4] = 9.0;  \n\
            kernel[5] = -1.0; \n\
            kernel[6] = -1.0; \n\
            kernel[7] = -1.0; \n\
            kernel[8] = -1.0;  \n\
            \n\
            \n\
            /*\n\
            // 边缘检测内核 \n\
            float kernel[9];  \n\
            kernel[0] = 1.0; \n\
            kernel[1] = 1.0; \n\
            kernel[2] = 1.0; \n\
            kernel[3] = 1.0; \n\
            kernel[4] = -8.0;  \n\
            kernel[5] = 1.0; \n\
            kernel[6] = 1.0; \n\
            kernel[7] = 1.0; \n\
            kernel[8] = 1.0;  \n\
            */\n\
            \n\
            \n\
            vec3 sampleTex[9];\n\
            for(int i = 0; i < 9; i++)\n\
            {\n\
              //sampleTex[i] = vec3(texture2D(u_Sampler, v_TexCoord + offsets[i]));\n\
              //vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
              //sampleTex[i] = vec3(texture2D(u_dayTextures[0], vec2(v_textureCoordinates.x,v_textureCoordinates.y) + offsets[i]));\n\
              vec3 atest = vec3(vec2(v_textureCoordinates.x,v_textureCoordinates.y) + offsets[i],v_textureCoordinates.z);\n\
              vec4 texMapColor = computeDayColor(u_initialColor, clamp(atest, 0.0, 1.0));\n\
              sampleTex[i] = texMapColor.xyz;\n\
            }\n\
             vec3 col;\n\
            for(int i = 0; i < 9; i++)\n\
                col += sampleTex[i] * kernel[i];\n\
            /*============================================== 下面是边缘检测 或 锐化后进行处理 ===================================================*/\n\
            \n\
            float avr_blend = 0.2126 * col.r + 0.7152 * col.g + 0.0722 * col.b; \n\
            avr_blend = 1.0 - avr_blend; \n\
            float scale = 0.01; //边缘检测后绘制颜色强度\n\
            vec3 blendColor = vec3(1.0-(1.0 - avr_blend)/scale);\n\
            \n\
            blendColor = blendOverlay(blendColor, overlayColor1);\n\
            /*============================================== 边缘检测 或 锐化。完成 ===================================================*/\n\
            \n\
            \n\
            \n\
            // 获取地图图片颜色 \n\
            //vec3 texColor = vec3(texture2D(u_dayTextures[0], v_TexCoord));\n\
            vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
            vec3 texColor = texMapColor.xyz;\n\
            \n\
            // 反色、黑白 \n\
            vec3 invertColor = vec3(1.0) - texColor;\n\
            float average = 0.2126 * invertColor.r + 0.7152 * invertColor.g + 0.0722 * invertColor.b;\n\
            vec3 averageColor = vec3(average);\n\
            \n\
            // 叠加地图颜色 \n\
            vec3 baseColor = blendOverlay(averageColor, overlayColor);\n\
            \n\
            vec3 finalColor3 = blendLighten(baseColor, blendColor);\n\;\n\
            vec4 finalColor = vec4(finalColor3,1.0);\n\
            int invertType = 0;\n\
            ';
        fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, mainstr);
        this.invertFlag = true;    
    }else if(type==6){
        // 黑色地图偏蓝
        var str = `float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
        vec4 finalColor = vec4(gray*vec3(0.6,1.0,1.4), color.a);
        int invertType = 0;`;
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, str);
        this.invertFlag = true;    
    }else if(type==7){
        // 滤色A+B(1-A/255)
        var str = `vec4 oppositeColor = vec4(vec3(1.0 - color.rgb), color.a);
        vec3 gray = vec3(0.3 * oppositeColor.r + 0.59 * oppositeColor.g + 0.11 * oppositeColor.b);
        float r = float(0.0)/255.0;
        float g = float(2.0)/255.0;
        float b = float(64.0)/255.0;
        vec4 finalColor = vec4(gray + vec3(r,g,b)*(1.0-gray),1.0);
        int invertType = 0;`;
        var fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, str);
        this.invertFlag = true;    
    } 
    baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;
};
//ps
vtron.comp.std.map.Cesium.prototype._invertMapColorEX = function(options){
    var baseFragmentShaderSourceId;
    if(Cesium.VERSION == "1.56.1"){
		baseFragmentShaderSourceId = 1;
    }else if(Cesium.VERSION == "1.46"){
    	baseFragmentShaderSourceId = 0;
    }
    this.tileQueueList = [];
    var globe = this._viewer.scene.globe;
    // 清除已经创建的surfaceShader,防止新修改的shader不生效
    globe._surfaceShaderSet._shadersByTexturesFlags = [];
    var baseFragmentShaderSource = globe._surfaceShaderSet.baseFragmentShaderSource;  
    // 修改primitive的levelZeroTiles节点，遍历四叉树
    if(globe._surface._levelZeroTiles){
        for(var i = 0, len = globe._surface._levelZeroTiles.length; i < len; i++) {
            this.preorder(globe._surface._levelZeroTiles[i]); 
        }
        this.tileQueueList.forEach((tile) => {
            tile.data.surfaceShader = null;
        });
    }

    var fragmentShader = Cesium._shaders['GlobeFS'];
    baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;

    //添加函数定义
    var str= options.functionDef;
    fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/uniform vec4 u_initialColor;/g, str);
    baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;  

    //修改main中的颜色处理代码
    var mainstr = options.mainstr;
    fragmentShader = baseFragmentShaderSource.sources[baseFragmentShaderSourceId].replace(/vec4 finalColor = color/g, mainstr);
    this.invertFlag = true;   

    baseFragmentShaderSource.sources[baseFragmentShaderSourceId] = fragmentShader;
}
vtron.comp.std.map.Cesium.prototype.baseMapColor_execute = function(){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.execute();
    }
}
//ps gray 灰度
vtron.comp.std.map.Cesium.prototype.baseMapColor_gray = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psGray(options);
    }
}
//ps level 色阶
vtron.comp.std.map.Cesium.prototype.baseMapColor_level = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psLevel(options);
    }
}
//ps liner 线性减淡
vtron.comp.std.map.Cesium.prototype.baseMapColor_linear = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psLinear(options);
    }
}
//ps multiply 正片叠底
vtron.comp.std.map.Cesium.prototype.baseMapColor_multiply = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psMultiply(options);
    }
}
//ps vividLight 亮光
vtron.comp.std.map.Cesium.prototype.baseMapColor_vividLight = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psVividLight(options);
    }
}

//ps screen 滤色
vtron.comp.std.map.Cesium.prototype.baseMapColor_screen = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psScreen(options);
    }
}

//ps inverse 反相
vtron.comp.std.map.Cesium.prototype.baseMapColor_inverse = function(options){
    if(this._baseMapColorModifyByPS){
        this._baseMapColorModifyByPS.psInverse(options);
    }
}
/**
 * 更新地图的操作状态：drawLine|drawMarkLine|drawCircle|drawPolygon|move|draw
 * drawMarkLine:只绘线不搜索
 * 
 * custom_cursor:保存move，tilt，point，choose-line choose-polygon choose-rectangle choose-circled的样式
 * optState：当前的鼠标状态
 *           move 默认状态,开始进入地球的默认状态，只有刚开始时用optstate保存
 *           tilt 临时状态，没有用optstate保存该状态
 *           point 临时状态，没有用optstate保存
 *           choose-line choose-polygon choose-rectangle choose-circle draw draw-line使用optstate保存状态
 * 规则：move、tilt进行地图平移和旋转时，可以进行要素的pick，但在choose和draw操作时则disable
 * 考虑：在选择（choose—*）操作时，需要平移或者倾斜旋转地图，但又需要保留当前状态，因此光标的修改和操作状态不是完全等同！
 * fireTag,相应操作是否会发出事件
 */
vtron.comp.std.map.Cesium.prototype.changeState = function(name, fireTag = true) {
    this.fireEventTag = fireTag;
    if(name == 'move'){
        this.selectingTag = false;
        if(this.optState == 'draw-line'){
            this.deleteElements(this.optState,this.optID);
            this.hideElements('globeLayer','globeDeleteStyle');
        }
        //从空间搜索状态改变为move，要把全局的搜索图层清空
        if(this.optState != 'move'){
            this.removeSearchLayerArray();
        }
    }
    //如果在未完成选择操作/画折线没画完以前就切换状态，则先删除
    //draw状态不用是因为draw是鼠标弹起就结束了
    //this.optChooseResult=false 表示上次的选择结果为空
    if((this.optVertices && this.optVertices.length>0) && (this.optChooseResult == false)&&this.optState!='draw'){
        if(this.optState != name){
            this.selectingTag = false;
            this.deleteElements(this.optState,this.optID);
            //折线时把图标也要删掉
            if(this.optState == 'draw-line'){
                this.hideElements('globeLayer','globeDeleteStyle');
            }
        }
    }
    
    //画线的话每次鼠标弹起结束绘制，然后不取消画线动作继续画
    if(name=='move'&&this.optState=='draw' && this.drawingTag){
        this.optState = 'draw';
        this.optVertices = [];
        this.optRadius = 0;
        this.optID = vtron.util.createUUID();
        this.optChooseResult = false;
        // 禁止相机默认的事件
        //this._viewer.scene.screenSpaceCameraController.enableRotate = false;

        //修改光标样式
        this.changeCursor('draw');
        return;
    }
    if(name == 'drawStop' && this.optState == 'draw'){
        this.optState = 'move';
        this.drawingTag = false;
        this.optVertices = [];
        this.optRadius = 0;
        this.optID = vtron.util.createUUID();
        this.optChooseResult = false;
        // 禁止相机默认的事件
        //this._viewer.scene.screenSpaceCameraController.enableRotate = false;

        //修改光标样式
        this.changeCursor('move');
        return;
    }
    if(this.optState!='move'){
        this.drawingTag = false;
        this.selectingTag = false;
    }
    this.optState = name;
    this.optVertices = [];
    this.optRadius = 0;
    this.optID = vtron.util.createUUID();
    this.optChooseResult = false;
    // 禁止相机默认的事件
    //this._viewer.scene.screenSpaceCameraController.enableRotate = false;

    //修改光标样式
    this.changeCursor(name)
};

/*
 * 删除当前绘制的临时性的线、面和圈
 */
vtron.comp.std.map.Cesium.prototype.deleteTmpChooseGeomtry = function() {
    if((this.optVertices && this.optVertices.length>0) && (this.optChooseResult == false)){
        this.deleteElements(this.optState,this.optID);
        this.optVertices = [];
    }

    //如果有删除图标，也需要去除
    this.hideElements('globeLayer','globeDeleteStyle');
};

/**
 * 经纬度(地理坐标WGS84)转世界坐标
 */
vtron.comp.std.map.Cesium.prototype.getCartesianFromCartographic = function(lon, lat, height) {
    if(!this._viewer) return;
    var cartesian3 = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    return cartesian3;
};

/**
 * 世界坐标转经纬度(地理坐标WGS84)
 */
vtron.comp.std.map.Cesium.prototype.getCartographicFromCartesian = function(x, y, z) {
    if(!this._viewer) return;
    var ellipsoid = this._viewer.scene.globe.ellipsoid;
    var cartesian3 = new Cesium.Cartesian3(x, y, z);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    if(!cartographic){
        return {lon: undefined, lat: undefined, alt:undefined};//暂时规避转入地下时获取不了坐标
    }
    var lon = Cesium.Math.toDegrees(cartographic.longitude);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var alt = cartographic.height;
    return {lon: lon, lat: lat, alt:alt};
};

/**
 * 经纬度(地理坐标WGS84)转屏幕坐标
 */
vtron.comp.std.map.Cesium.prototype.getScreenCoordFromCartographic = function(lon, lat) {
    if(!this._viewer) return;
    var cartesian = Cesium.Cartesian3.fromDegrees(lon, lat);
    var screenCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._viewer.scene, cartesian);
    if(!screenCoord) return null;
    return {x: parseInt(screenCoord.x), y: parseInt(screenCoord.y)};
};

/**
 * 经纬度(地理坐标WGS84)转屏幕坐标，返回浮点数
 */
vtron.comp.std.map.Cesium.prototype.getScreenCoordFromCartographicFloat = function(lon, lat) {
    if(!this._viewer) return;
    var cartesian = Cesium.Cartesian3.fromDegrees(lon, lat);
    var screenCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._viewer.scene, cartesian);
    if(!screenCoord) return null;
    return {x: screenCoord.x, y: screenCoord.y};
};

/**
 * 屏幕坐标转经纬度(地理坐标WGS84)，兼容mapEngine
 * 屏幕坐标 => 世界坐标 => 经纬度
 */
vtron.comp.std.map.Cesium.prototype.getCartographicFromScreenCoord = function(screenX, screenY) {
    if(!this._viewer) return;
    // 借助场景拾取原理计算世界坐标
    var pick = new Cesium.Cartesian2(screenX, screenY);
    var cartesian = this._viewer.camera.pickEllipsoid(pick);
    if(cartesian==undefined) 
        return cartesian;
    return this.getCartographicFromCartesian(cartesian.x, cartesian.y, cartesian.z);
};

/**
 * 手动添加地图支持搜索图层
 * layerName = ['layer1','layer2'..]
 */
vtron.comp.std.map.Cesium.prototype.addSearchLayerArray = function(layerName, searchEventType) {
    if(!this._viewer) return;
    this.searchEventType = searchEventType || 'mapSearch_inside';
    if(!(layerName instanceof Array)) layerName = [layerName];
    if(layerName.length > 0){
        layerName.forEach((layer)=>{
            this.searchLayerArray.push(layer);
        });
    }
    return;
}

/**
 * 手动删除地图支持搜索图层
 * layerName = ['layer1','layer2'..]
 * layerName为空时，this.searchLayerArray = []
 */
vtron.comp.std.map.Cesium.prototype.removeSearchLayerArray = function() {
    if(!this._viewer) return;
    this.searchEventType = 'mapSearch_inside';
    this.searchLayerArray = [];
    return;
}

vtron.comp.std.map.Cesium.LEVEL_TO_HEIGH = [
    1600 * 1000,   //0
    800 * 1000,   //1
    400 * 1000,    //2
    250 * 1000,
    120 * 1000,
    80 * 1000,
    50 * 1000,
    36 * 1000,
    26 * 1000,
    18 * 1000,
    12 * 1000,      //10
    8 * 1000,
    5 * 1000,
    3 * 1000,
    2 * 1000,
    1600,
    1200,
    800,
    500,
    250,             //19
]
/**
 * 等级转换成高度，兼容mapEngine
 */
vtron.comp.std.map.Cesium.prototype.levelConvertToHeight = function(level) {
    level = parseInt(level) || 0;
    if(level < 0)level = 0;
    if(level > 19)level = 19;
    return vtron.comp.std.map.Cesium.LEVEL_TO_HEIGH[level];
};

/**
 * 高度转换成等级，兼容mapEngine
 * 
 * -by ljy
 * 新增：当传入高度为1001m的时候
 */
vtron.comp.std.map.Cesium.prototype.heightConvertToLevel = function(height) {
    var level = 0;
    var tempAsb;
    var asbHeight = [];
    vtron.comp.std.map.Cesium.LEVEL_TO_HEIGH.forEach((data)=>{
        tempAsb = Math.abs(data - height);
        asbHeight.push(tempAsb);
    });
    var min = asbHeight[0];
    for(var i = 0;i<asbHeight.length;i++){
        if(asbHeight[i] < min){
            min = asbHeight[i];
        }
    }
    level = asbHeight.indexOf(min);
    return level;
};

/**
 * 获取当前层级，利用相机高度计算
 * by ljy
 * 不能利用相机高度，改为利用与当前地图中心的点的距离
 */
vtron.comp.std.map.Cesium.prototype.getLevel = function() {
    var pos = this.getCameraPosition();
    //var height = pos.geoCoord.alt;
    var camera = this._viewer.camera;
    var scene = this._viewer.scene;
    var distance;
    var center;
    //找相机和地球的交点（暂定屏幕中心）
    var rayScratch = new Cesium.Ray();
    rayScratch.origin = camera.positionWC;
    rayScratch.direction = camera.directionWC;
    center = scene.globe.pick(rayScratch, scene, center);
    //相机位置
    var cameraPosition = scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic, new Cesium.Cartesian3());
    //地图还没出来的时候没center，等级还是按camera的高度算
    if(!center){
        center = new Cesium.Cartesian3(0, 0, 0);
        var level = this.heightConvertToLevel(pos.geoCoord.alt);
        return level;
    }
    distance = Cesium.Cartesian3.distance(cameraPosition, center);
    var level = this.heightConvertToLevel(distance);
    return level;
};

/**
 * 获取当前范围，兼容mapEngine
 */
vtron.comp.std.map.Cesium.prototype.getRegion = function() {
    // 此方法不适用camera倾斜,正确的方式应该是计算四个点,有待完善
    var rectangle = this._viewer.camera.computeViewRectangle();
    if(!rectangle){
        return {left: -180, right: 180, top: 90, bottom: -90};
    }
    var left = Cesium.Math.toDegrees(rectangle.west),
        right = Cesium.Math.toDegrees(rectangle.east),
        top = Cesium.Math.toDegrees(rectangle.north),
        bottom = Cesium.Math.toDegrees(rectangle.south);
    if(left==undefined||right==undefined||top==undefined||bottom==undefined){
        return {left: -180, right: 180, top: 90, bottom: -90};
    }
    return {left: left, right: right, top: top, bottom: bottom};
};

/**
 * 根据已知中心点和高度，返回符合的范围
 * detail = {
 *      Xmin: 经度min
 *      Ymin: 纬度min
 *      Xmax: 经度max
 *      Ymax: 纬度max
 * }
 */
vtron.comp.std.map.Cesium.prototype.heightToRegion = function(center, defaultHeight, rate){
    if(!center){
        return;
    }
    defaultHeight = defaultHeight || $("#common-config").get(0)&&$("#common-config").get(0).getConfigById("mapAdvanceConfig",'mapLocationHeightSet').value;
    var camera = this._viewer.camera;
    var pitch = -camera.pitch;
    var distance = Math.tan(pitch * Math.PI / 180) * defaultHeight;//单位米
    var _canvasHeight = this.canvasHeight || this.parentElement.offsetHeight;
    var _canvasWidth = this.canvasWidth || this.parentElement.offsetWidth;
    var Xmin, Ymin, Xmax, Ymax;
    var offsetX = distance / 111000;//中心点离left 和 right的°
    Xmin = center.x - offsetX;
    Xmax = center.x + offsetX;
    var screenScale = rate || (_canvasHeight / _canvasWidth) || 1;
    var offsetY = screenScale * offsetX;
    Ymin = center.y - offsetY;
    Ymax = center.y + offsetY;
    return {
        "west":Xmin,
        "east": Xmax,
        "south":Ymin,
        "north": Ymax
    };
};

/**
 * 根据已知一个范围和高度，返回符合的范围
 * region:{                 //已知范围
 *      west:,
 *      east:,
 *      north:,
 *      south:
 * }
 * defaultHeight:           //传入高度，没有取当前配置高度
 * rate：                   //宽高比，没有就去当前屏幕的宽高比
 * 返回： newRegion:{
 *          west:,
 *          east:,
 *          north:,
 *          south:
 *        }
 */
vtron.comp.std.map.Cesium.prototype.regionToRegion = function(region, defaultHeight, rate, offset = 0.0002){
    if(!region){
        return;
    }
    defaultHeight = defaultHeight || $("#common-config").get(0)&&$("#common-config").get(0).getConfigById("mapAdvanceConfig",'mapLocationHeightSet').value;
    var camera = this._viewer.camera;
    var pitch = -camera.pitch;
    //var distance = Math.tan(pitch * Math.PI / 180) * defaultHeight;//单位米
    var _canvasHeight = this.canvasHeight || this.parentElement.offsetHeight;
    var _canvasWidth = this.canvasWidth || this.parentElement.offsetWidth;
    //拿比率，没有就拿当前屏幕的宽高比
    var screenScale = rate || (_canvasWidth / _canvasHeight) || 1;
    //算已有region中心
    //先把弧度转经纬度
    region.west = Cesium.Math.toRadians(region.west);
    region.east = Cesium.Math.toRadians(region.east);
    region.north = Cesium.Math.toRadians(region.north);
    region.south = Cesium.Math.toRadians(region.south);
    //center(longtitude,latitude,height)单位弧度
    var center = new Cesium.Rectangle.center(region);
    //算(north' - center)的纬度差
    var latRadians = Cesium.Math.toRadians(Math.tan(pitch * Math.PI / 180) * defaultHeight/111000);//单位弧度
    if(screenScale>1){
        //如果是长方形
        var maxLat;//单位弧度
        if((region.north - center.latitude) > latRadians){
            maxLat = region.north - center.latitude;
        }else{
            maxLat = latRadians;
        }
        //按照比率算新的(east - center)，单位弧度
        var maxLon = screenScale * maxLat;
        //经度差也要取最大的
        if((region.east - center.longitude) > maxLon){
            maxLon = (region.east - center.longitude);
        }
        maxLat = maxLon/2+offset;
        var newRegion = {};
        newRegion.west = Cesium.Math.toDegrees(center.longitude - maxLon);
        newRegion.east = Cesium.Math.toDegrees(center.longitude + maxLon);
        newRegion.north = Cesium.Math.toDegrees(center.latitude + maxLat);
        newRegion.south = Cesium.Math.toDegrees(center.latitude - maxLat);
        return newRegion;
    }else{
        //是正方形或者长比宽大
        //算上比率的新的经度差，单位弧度
        var lonRadians = latRadians * screenScale;
        if((region.east - region.west) > lonRadians){
            //用回原来的region
            var newRegion = {};
            newRegion.west = Cesium.Math.toDegrees(region.west);
            newRegion.east = Cesium.Math.toDegrees(region.east);
            newRegion.north = Cesium.Math.toDegrees(region.north);
            newRegion.south = Cesium.Math.toDegrees(region.south);
            return newRegion;
        }else{
            //经度用新的,maxLon是终点距离west、east的弧度值
            var maxLon = lonRadians;
            var newRegion = {};
            newRegion.west = Cesium.Math.toDegrees(center.longitude - maxLon);
            newRegion.east = Cesium.Math.toDegrees(center.longitude + maxLon);
            newRegion.north = Cesium.Math.toDegrees(region.north);
            newRegion.south = Cesium.Math.toDegrees(region.south);
            return newRegion;
        }
    }
}
/**
 * 获取相机沿其direction与84椭球的交点的射线与相机在椭球垂线的夹角
 */
vtron.comp.std.map.Cesium.prototype.getAngle = function() {
    var ray = new Cesium.Ray(this._viewer.camera.positionWC, this._viewer.camera.direction);
    if(this._viewer.trackedEntity){
        return 1;
    }
    var intersection = Cesium.IntersectionTests.rayEllipsoid(ray, Cesium.Ellipsoid.WGS84);
    if(!intersection){
        return -1;
    }
    var point = Cesium.Ray.getPoint(ray, intersection.start);
    var longDistance = Cesium.Cartesian3.distance(this._viewer.camera.positionWC, point);
    var cameraPos = Cesium.Cartographic.fromCartesian(this._viewer.camera.positionWC);
    var height = cameraPos.height;
    //var angle = Cesium.Math.acosClamped(height/longDistance);
    var angle = height/longDistance;
    return angle;
};

/**
 * 初始化获取范围和地图等级
 * detail = {
 *      mapLevel: Number,
 *      left: left,
 *      right: right,
 *      top: top,
 *      bottom: bottom
 * }
 */

vtron.comp.std.map.Cesium.prototype.initRegionLevel = function(){
    var detail = {};
    detail.mapLevel = this.getLevel();
    var initRegion = this.getRegion();
    detail.left = initRegion.left;
    detail.right = initRegion.right;
    detail.top = initRegion.top;
    detail.bottom = initRegion.bottom;
    return detail;
}
/**
 * 获取当前中心点，返回经纬度，兼容mapEngine
 */
vtron.comp.std.map.Cesium.prototype.getCenter = function() {
    var halfWidth = this.canvasWidth * 0.5,
        halftHeight = this.canvasHeight * 0.5;
    var geoCoord = this.getCartographicFromScreenCoord(halfWidth, halftHeight);
    return geoCoord;
};

/**
 * 直接获取当前中心点，返回经纬度
 * pointInfo = {
 *      lon: ,
 *      lat: 
 * }
 * 如果当前相机跟随实体，中心点为实体的坐标
 * 如果当前相机与地球椭球没有交点（和水平线平行）返回相机的经纬度？还要商量
 */
vtron.comp.std.map.Cesium.prototype.getCenterByRay = function() { 
    var ray = new Cesium.Ray(this._viewer.camera.positionWC, this._viewer.camera.direction);
    var pointCart;
    var pointCoord;
    var pointInfo = {};
    if(this._viewer.trackedEntity){
        pointCart = this._viewer.trackedEntity.position;
        pointCoord = Cesium.Cartographic.fromCartesian(pointCart._value);
        pointInfo.lon = Cesium.Math.toDegrees(pointCoord.longitude);
        pointInfo.lat = Cesium.Math.toDegrees(pointCoord.latitude);
        return pointInfo;//trackedEbtity的坐标;
    }
    var intersection = Cesium.IntersectionTests.rayEllipsoid(ray, Cesium.Ellipsoid.WGS84);
    if(!intersection){
        pointInfo.lon = Cesium.Math.toDegrees(this._viewer.camera._positionCartographic.longitude);
        pointInfo.lat = Cesium.Math.toDegrees(this._viewer.camera._positionCartographic.latitude);
        return pointInfo;//return相机坐标
    }
    pointCart = Cesium.Ray.getPoint(ray, intersection.start);
    pointCoord = Cesium.Cartographic.fromCartesian(pointCart);
    pointInfo.lon = Cesium.Math.toDegrees(pointCoord.longitude);
    pointInfo.lat = Cesium.Math.toDegrees(pointCoord.latitude);
    return pointInfo;
};

/**
 * 设置相机的位置，用于同步相机平移的操作
 *  @param position 世界坐标
 *  @param heading,pitch,roll 弧度
 */
vtron.comp.std.map.Cesium.prototype.setCameraPosition = function(position, heading, pitch, roll, info="setCameraPosition", flightCompleteCallback,positionCartographic) {
    if(!this._viewer) return;
    flightCompleteCallback = flightCompleteCallback || function() {};
    this._cmdinfo = info;
    if(this._viewer.trackedEntity){
        if(this._viewer.trackedEntity && $("body").hasClass("theme-pc")){
            this.trackedCancel();
        }else{
            //解决跟随时，大墙联动缩放的晃动问题，ljyi
            this._viewer.camera.setView({
                destination: new Cesium.Cartesian3(position.x, position.y, position.z),
                orientation: {
                    heading: heading,
                    pitch: pitch,
                    roll: roll,
                },
            });
        }
    }else{
        if(this._viewer.scene.mode != Cesium.SceneMode.SCENE2D){
            this._viewer.camera.flyTo({
                destination: new Cesium.Cartesian3(position.x, position.y, position.z),
                orientation: {
                    heading: heading,
                    pitch: pitch,
                    roll: roll,
                },
                duration: 0,
                complete: flightCompleteCallback
            });
        }
        else{
            if(!positionCartographic) return;
            if(positionCartographic.longitude == undefined || positionCartographic.latitude == undefined) return;
            var lon = Cesium.Math.toDegrees(positionCartographic.longitude);
            var lat = Cesium.Math.toDegrees(positionCartographic.latitude);
            var h = positionCartographic.height;
            this._viewer.camera.flyTo({
                destination: new Cesium.Cartesian3.fromDegrees(lon,lat,h),
                orientation: {
                    heading: heading,
                    pitch: pitch,
                    roll: roll,
                },
                complete: flightCompleteCallback
            });
        }
    }
};

/**
 * 获取当前相机位置
 */
vtron.comp.std.map.Cesium.prototype.getCameraPosition = function() {
    let detail = {};
    detail.position = this._viewer.camera.positionWC;
    detail.heading = this._viewer.camera.heading;
    detail.pitch = this._viewer.camera.pitch;
    detail.roll = this._viewer.camera.roll;
    detail.geoCoord = this.getCartographicFromCartesian(detail.position.x, detail.position.y, detail.position.z); 
    detail.pitchDegree = Cesium.Math.toDegrees(detail.pitch);
    detail.positionCartographic = this._viewer.camera.positionCartographic;
    return vtron.util.clone(detail);
};


/**
 * 获取当前相机高度，单位米
 */
vtron.comp.std.map.Cesium.prototype.getCameraHeight = function() {
    var pos = this.getCameraPosition();
    var height = pos.geoCoord.alt;
    return height;
};

/**
 *  移动地图中心点 地理坐标
 *  @param x 地理坐标X
 *  @param y 地理坐标Y
 *  @param level level不传入，只移动中心点
 */
vtron.comp.std.map.Cesium.prototype.moveCenter = function(x, y, level, duration = 1, flightCompleteCallback) {
    this._viewer.camera.isRotating = true;
    var z;//ru
    if(this.flyFlag){
        this.flyFlag = false;
        return;
    }
    var instance = this;
    if(level==undefined){
        //没有传level，则按当前高度显示
        z = this.getCameraHeight();
    }
    else{
        z = this.levelConvertToHeight(level || this.getLevel());
    }
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    var heading = Cesium.Math.toRadians(0.0),
        pitch = Cesium.Math.toRadians(-this.pitch),
        range = z;
    this._viewer.camera.cmdormouse = 'cmd';
    var headingPitchRange = new Cesium.HeadingPitchRange(heading, pitch, range);
    flightCompleteCallback = flightCompleteCallback || function() {
        instance._viewer.camera.isRotating = false;
    };
    var boundingSphere = {'center': Cesium.Cartesian3.fromDegrees(x, y), 'radius': 0};
    this._viewer.camera.flyToBoundingSphere(boundingSphere, {
        duration: 0,//duration,
        offset: headingPitchRange,
        complete: flightCompleteCallback
    });
    
};

/**
 * 设置相机
 *  @param x 地理坐标X
 *  @param y 地理坐标Y
 *  @param pitch 俯视角度,填一个[0, 90]之间的数，0是水平,90是垂直向下
 *  @param height 相机高度
 */
vtron.comp.std.map.Cesium.prototype.setCameraPositionByBoundingSphere = function(x, y, height, pitch,  duration = 3, flightCompleteCallback) {
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    var heading = Cesium.Math.toRadians(0.0),
        pitch = Cesium.Math.toRadians(-pitch),
        range = height || this._viewer.camera.positionCartographic.height;
    var headingPitchRange = new Cesium.HeadingPitchRange(heading, pitch, range);
    flightCompleteCallback = flightCompleteCallback || function() {};
    var boundingSphere = {'center': Cesium.Cartesian3.fromDegrees(x, y), 'radius': 0};
    this._viewer.camera.flyToBoundingSphere(boundingSphere, {
        duration: 0,//duration,
        offset: headingPitchRange,
        complete: flightCompleteCallback
    });
};


/**
 *  地图重置为初始位置
 */
vtron.comp.std.map.Cesium.prototype.moveReset = function() {
    if(!this.defaultCamera){
        this.moveCenter(parseFloat(this.cenX), parseFloat(this.cenY), parseInt(this.level));
    }
    else{
        //默认相机参数,JSON字符串'{"x":,"y":,"z":,"heading":,"pitch":,"roll":}'
        var cameraparm = this.defaultCamera;
        var parmObject = JSON.parse(cameraparm);
        var position = {
                x: parmObject.x,
                y: parmObject.y,
                z: parmObject.z
            },
            heading = parmObject.heading;
            pitch = parmObject.pitch;
            roll = parmObject.roll;
        if(this._viewer.trackedEntity && $("body").hasClass("theme-wall")){
            return;
        }
        this.setCameraPosition(position, heading, pitch, roll);
    }
};

/**
 *  相机角度重置,暂时只改pitch
 */
vtron.comp.std.map.Cesium.prototype.setCameraOrientation = function(newPitch) {
    if(!this.defaultCamera){
        this._viewer.camera.pitch = 0;
        this._viewer.camera.heading = 0;
        this._viewer.camera.roll = 0;
    }
    if(this._viewer.trackedEntity){
        //this.trackedCancel();
        //本方法只用来调整相机角度，跟踪时不提示也不生效
        return;
    }
    var camera = this._viewer.camera;
    var center;
    //找相机和地球的交点（暂定屏幕中心）
    //默认有center了
    var rayScratch = new Cesium.Ray();
    rayScratch.origin = camera.positionWC;
    rayScratch.direction = camera.directionWC;
    center = this._viewer.scene.globe.pick(rayScratch, this._viewer.scene, center);
    let defaultHeight = $("#common-config").get(0)&&$("#common-config").get(0).getConfigById("mapAdvanceConfig",'mapLocationHeightSet')||false;
    var cameraLon = camera.positionCartographic.longitude;
    var cameraLat = camera.positionCartographic.latitude;
    if(center){
        //算中心与相机距离，直角三角形中的斜边
        var distance = Cesium.Cartesian3.distance(center, camera.positionWC);
        radsPitch = (Math.PI * newPitch) / 180;
        var cameraHeight = distance * Math.sin(-radsPitch);
        //现在拖动缩放中心在鼠标点击位置，出现许多问题
        camera.flyTo({
            destination: new Cesium.Cartesian3.fromRadians(cameraLon, cameraLat, cameraHeight),
            orientation: {
                heading: this._viewer.camera.heading,
                pitch: Cesium.Math.toRadians(newPitch),
                roll: 0.0,
            },
        });
    }else{
        camera.flyTo({
            destination: new Cesium.Cartesian3.fromRadians(cameraLon, cameraLat, defaultHeight.value),//camera.positionWC,
            orientation: {
                heading: this._viewer.camera.heading,
                pitch: Cesium.Math.toRadians(newPitch),
                roll: 0.0,
            },
        });
    }
    
    
};

/**
 *  地图缩放
 */
vtron.comp.std.map.Cesium.prototype.zoom = function(level) {
    var height = this.levelConvertToHeight(level);
    this._viewer.camera.zoomIn(height);
};

/**
 *  地图放大
 */
vtron.comp.std.map.Cesium.prototype.zoomIn = function() {
    var level = this.getLevel() + 1;
    var height = this.levelConvertToHeight(level);
    this._viewer.camera.zoomIn(height);
};

/**
 *  地图缩小
 */
vtron.comp.std.map.Cesium.prototype.zoomOut = function() {
    var level = this.getLevel() - 1;
    var height = this.levelConvertToHeight(level);
    this._viewer.camera.zoomOut(height);
};

/**
 * 地球自转更新相机的回调
 */
vtron.comp.std.map.Cesium.prototype.icrf = function(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
    }
    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if (Cesium.defined(icrfToFixed)) {
        var offset = Cesium.Cartesian3.clone(scene.camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        scene.camera.lookAtTransform(transform, offset);
    }
};

/**
 * 获取地图绘制面颜色和轮廓线宽之类的
 * 'polylineOutlineColor'---->线轮廓线颜色
 * 'polylineOutlineWidth'---->线轮廓线宽度
 * 'bufferRadius'---->圆的半径
 * 'polygonOutlineWidth'---->多边形轮廓线宽度
 * 'polygonOutlineColor'---->多边形轮廓线颜色
 * 'guideLineWidth'---->临时绘制时的线宽
 * 'circleOutlineColor'---->圆的轮廓线颜色
 * 'circleOutlineWidth'---->圆的轮廓线线宽
 * 'penLineColor'---->笔线颜色
 * 'penLineWidth'---->笔线宽度
 * 'foldLineColor'---->折线颜色
 * 'foldLineWidth'---->折线线宽
 */
vtron.comp.std.map.Cesium.prototype.getMapConfig = function(key) {
    if(key == null || key == ''){
        //返回全部
        return this._mapCofig;
    }else{
        return this[key]
    }
};


/**
 * 热力图初始化，具体参数详见CesiumHeatmap.js
 * bounds = {
 * 		west, east, south, north
 * }
 * options = {
 * 	 radius: 5,
 * 	 maxOpacity: 1.0,
 * 	 minOpacity: 0.2,
 * 	 blur: 0.8,
 * 	 gradient: {
 * 	   '0': 'rgb(0, 255, 0)',
 * 	   '0.5': 'rgb(255, 255, 0)',
 * 	   '1.0': 'rgb(255, 0, 0)'
 * 	 }
 * }
 */
vtron.comp.std.map.Cesium.prototype.initHeatmap = function(bounds, options) {
	if(this.heatmap) return;
    this.heatmap = CesiumHeatmap.create(this._viewer, bounds, options);
};

vtron.comp.std.map.Cesium.prototype.initHeatmap_webgl = function(bounds, options) {
    if(this.heatmap) return;
    //根据当前height和options的maxHeight,minHeight，radius，重新算初始加载的radius
    options.intensity = options.intensity || 0.2;
    var _minHeight = options.minHeight || 8000,
        _minR = options.minRadius || options.radius || 30,
        _maxHeight = options.maxHeight || 1100000,
        _maxR = options.maxRadius || 200,
        _step = (_maxR - _minR)/(_maxHeight-_minHeight);//高度的比率映射到屏幕像素
    //_curR是代表热力图显示在屏幕上面的像素
    var _curR = _minR,
        _curHeight = this._viewer.camera._positionCartographic.height;
    this.heatmap = CesiumHeatmap_webgl.create(this._viewer, bounds, options);
    //算出最小最大倍率
    this.heatmap.canvasRate = (this.heatmap.bounds.east - this.heatmap.bounds.west) / 3840;
    //this.heatmap.maxRate = this.heatmap.canvasRate /((_maxBounds.east - _maxBounds.west)/this.canvasWidth);
    //this.heatmap.minRate = this.heatmap.canvasRate /((_minBounds.east - _minBounds.west)/this.canvasWidth);
    _heatMapBounds = this.heatmap.bounds;
    if(_curHeight <= _minHeight){
        _curR = _minR;
    }else if(_curHeight >= _maxHeight){
        _curR = _maxR;
    }else{
        _curR = _minR+(_curHeight-_minHeight)*_step;
    };
    options.radius = _curR;
    //记录初始的时候的radius
    this.heatmap._initRadius = options.radius;
    this.heatmap._step = _step;
    this.heatmap.maxValue = options.maxValue || 50;
    this.heatmap.minValue = options.minValue || 1;
};

vtron.comp.std.map.Cesium.prototype.cameraUpdateHeatmap_webgl = function(info="null") {
    //如果有热力图,并且在做鼠标滚轮的缩放
    //地图组件内部调用
    //wall端用setCameraPosition做判断，暂时，后续应该判断加上只做鼠标滚轮 不做平移时的热力图更新，可能会有性能问题，ljy
    var tag = this._mousetype == 'move' || info == 'setCameraPosition';
    if(this.heatmap && tag){
        if(this.heatmap._layer && this.heatmap._layer.show){
            var viewHeatmapData = this.heatmap._lastHeatmapData;
            //根据当前height和options的maxHeight,minHeight，radius，重新算初始加载的radius
            var _minHeight = this.heatmap._options.minHeight || 8000,
                _minR = this.heatmap._options.minRadius || this.heatmap._options.radius || 30,
                _maxHeight = this.heatmap._options.maxHeight || 1100000,
                _maxR = this.heatmap._options.maxRadius || 200,
                _step = (_maxR - _minR)/(_maxHeight-_minHeight);//高度的比率映射到屏幕像素
            //_curR是代表热力图显示在屏幕上面的像素
            var _curR = _minR,
                _curHeight = this._viewer.camera._positionCartographic.height,
                _heatMapBounds = this.heatmap.bounds;
            if(_curHeight <= _minHeight){
                _curR = _minR;
                //this.heatmap._options.radius = this.srceenRadiustoHeatmapRadius(_heatMapBounds, null, _curR, this.heatmap._options);
            }else if(_curHeight >= _maxHeight){
                _curR = _minR;
                //this.heatmap._options.radius = this.srceenRadiustoHeatmapRadius(_heatMapBounds, null, _curR, this.heatmap._options);
            }else{
                _curR = _minR+(_curHeight-_minHeight)*_step;
                //this.heatmap._options.radius = this.srceenRadiustoHeatmapRadius(_heatMapBounds, null, _curR, this.heatmap._options);
            };
            this.heatmap._options.radius = _curR;
            //聚合最大值
            //var maxVal = 1, minVal = 1;
            if(viewHeatmapData && viewHeatmapData.constructor == Array){
                //计算色带值
                var max = this.heatmap.maxValue = this.heatmap.maxValue || 50;
                var min = this.heatmap.minValue = this.heatmap.minValue|| 1;
                var updateHeatMap = this.updateHeatmapData_webglEx(min, max, viewHeatmapData);
            }
        }
    }
};

/**
 *  获取前端重新聚合的数据
 *  data = [{'x': 经度， 'y': 纬度, 'value': 聚合数量}]
 */
vtron.comp.std.map.Cesium.prototype.srceenRadiustoHeatmapRadius = function(bounds, nRegion, curRadius, options){
    //获取当前屏幕四角坐标，来算屏幕坐标和当前屏幕地图代表的地理距离
    var nRegion = nRegion || this.getRegion();
    var nLeft = nRegion.left || nRegion.west,
        nRight = nRegion.right || nRegion.east,
        nTop = nRegion.top || nRegion.north,
        nBottom = nRegion.bottom || nRegion.south;
    
    var rateHg = this.heatmap.canvasRate / ((nRight - nLeft)/this.canvasWidth);
        //rateWd = distanceHeatmapWd / distanceScreenWd;
    //_curR需要的地理距离
    rateHg = Math.min(this.heatmap.minRate, rateHg);
    rateHg = Math.max(this.heatmap.maxRate, rateHg);
    var _needRadiusX = curRadius * rateHg;
        //_needRadisxY = curRadius * rateHg;
    //传给热力图
    options.radius =  _needRadiusX;
    return _needRadiusX;
}

/**
 *  更新热力图
 *  dataInfo = [{ x:lon, y:lat, value }]
 */
vtron.comp.std.map.Cesium.prototype.updateHeatmapData = function(min, max, dataInfo) {
	if(this.heatmap) {
		this.heatmap.setWGS84Data(min, max, dataInfo);
	}
};

vtron.comp.std.map.Cesium.prototype.updateHeatmapData_webgl = function(min, max, dataInfo) {
    if(this.heatmap) {
        this.heatmap.setWGS84Data(min, max, dataInfo);
    }
};

vtron.comp.std.map.Cesium.prototype.updateHeatmapData_webglEx = function(min, max, dataInfo) {
    if(this.heatmap) {
        //记录旧数据
        if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
        if(dataInfo.length>0){
            this.heatmap._lastHeatmapData = dataInfo;
            this.heatmap.minValue = min || this.heatmap.minValue;
            this.heatmap.maxValue = max || this.heatmap.maxValue;
            var curcameraHeight = this._viewer.camera.positionCartographic.height;
            //没有传入maxHeight就使用默认的
            radius = curcameraHeight * this.heatmap._initRadius / this.levelConvertToHeight(5);
            if(radius < 15){
                radius = 15;
                //用this.heatmap._options.radius来改,5会出现马赛克，改成15
                this.heatmap._options.radius = radius;
            }else if(radius > this.heatmap._initRadius){
                radius = this.heatmap._initRadius;
                this.heatmap._options.radius = radius;
            }else{
                this.heatmap._options.radius = radius;
            }
            dataInfo.forEach((data)=>{
                if(data.radius){
                    data.radius = radius;
                }
            });
            this.heatmap._lastHeatmapData = dataInfo;
            this.heatmap.setWGS84Data3(this.heatmap.minValue, this.heatmap.maxValue, dataInfo);
        }
    }
};

vtron.comp.std.map.Cesium.prototype.updateHeatmapData_webgl = function(min, max, dataInfo,type=0) {
    if(this.heatmap) {
        /*if(dataInfo.length==0){
            this.heatmap.setWGS84DataEx(min,max,[]);//后续用来实现：鼠标wheel操作，对热力图进行刷新
        }*/
        //记录旧数据
        if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
        this.heatmap._lastHeatmapData = dataInfo;
        //目前并未考虑每个热力点的min和max
        if(type==0){
            //将每个点都传给heatmap lib进行处理
            //这种方案：每次实时加点，不用清空原来的灰度图
            this.heatmap.setWGS84Data(min, max, dataInfo);
        }
        else if(type==1){
            //先进行预聚合（算法和聚合图一样）以后，再传给heatmap lib进行处理
            //这种方案：由于每加一个点，都需要重新计算，所以需要清空原来的灰度图
            //var clusterData = this.heatmap.preCluster(dataInfo);
            //this.heatmap.clear(false);
            var totalTimeS = new Date();
            this.heatmap.setWGS84DataEx(min, max, dataInfo);
            var totalTimeE = new Date();
            var time = totalTimeE.getTime() - totalTimeS.getTime();
            if(time>1000){
                var info = {};
                info.level = 1;//warn
                info.function = 'updateHeatmapData_webgl:';
                info.para =[dataInfo.length];
                info.info = '热力图时间(ms)：总时间'+ '('+time+')'+'    '+'预聚合时间'+'('+this.heatmap.preClusterTime+')';
                this._mapLog(info); 
            }
        }
        return this.heatmap.hmlegend;
    }
};


/**
 *  显示热力图
 *  应该合并到showLayer
 */
vtron.comp.std.map.Cesium.prototype.heatmapLayerShow = function() {
	if(this.heatmap) {
		this.heatmap.show(true);
	}
};

vtron.comp.std.map.Cesium.prototype.heatmapLayerShow_webgl = function() {
    if(this.heatmap) {
        this.heatmap.show(true);
    }
};

/**
 *  隐藏热力图
 */
vtron.comp.std.map.Cesium.prototype.heatmapLayerHide = function() {
	if(this.heatmap) {
		this.heatmap.show(false);
	}
};

/**
 *  清空热力图
 */
vtron.comp.std.map.Cesium.prototype.heatmapLayerClear = function(){
    if(this.heatmap){
        this.heatmap.clear();
        this.heatmap._lastHeatmapData = [];
    }
}
/**
 * 地球自转效果
 */
vtron.comp.std.map.Cesium.prototype.globeRotation = function() {
    if(this._globeRotation) return;
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    this._globeRotation = true;
    this._viewer.camera.flyHome(0);
    this._viewer.clock.multiplier = 24 * 60;//一分钟自转一次
    this._viewer.clock.shouldAnimate = true;
    this._viewer.scene.postUpdate.addEventListener(this.icrf);
};

/**
 * 取消自转效果
 */
vtron.comp.std.map.Cesium.prototype.cancelGlobeRotation = function() {
    this._globeRotation = false;
    this._viewer.clock.multiplier = 1;
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this._viewer.scene.postUpdate.removeEventListener(this.icrf);
};

/**
 * 等待地图初始化完成
 */
vtron.comp.std.map.Cesium.prototype.waitMapInit = function(callback,time) {
  var _this = this;
  time = time || 500;
  var func = function(){
    if(!_this._viewer){
      setTimeout(func, time);
    } else {
      if(typeof(callback) == "function"){
        callback.call(_this);
      }
    }
  }
  func();
};

/*
 * 等待图层创建完成
 */
vtron.comp.std.map.Cesium.prototype.waitLayer = function(layerName,callback,time) {
  var _this = this;
  time = time || 500;
  var func = function(){
    var datasource = _this.getDataSourceByName(layerName) || _this.getPrimitiveCollectionByName(layerName);
    if(!datasource) {
      setTimeout(func, time);
    } else {
      if(typeof(callback) == "function"){
        callback.call(_this);
      }
    }      
  }
  func();
};

/*
*  添加聚合图
*  style:数组，每个值代表聚合图分多少类（50+,100+...）,每类的图标颜色
*  [
*      {
*          name：'10',
*          value:10,
*          bgcolor:'rgba(255, 0, 0, 1)',
*          width:80
*      },
*      {
*          name：'100',
*          value:100,
*          bgcolor:'rgba(100, 20, 0, 1)',
*          width:120
*      },
*  ]
*  
 */

vtron.comp.std.map.Cesium.prototype.addclusterLayer = function(layerName, dataInfo, imageUrl="", style="",pixelRange=0.12,minimumClusterSize=3,scale = 1, height = 0, bShowLayer = true, supportSearch = false) {
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        supportSearch && this.searchLayerArray.push(layerName);
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);

        //设置聚合图属性
        var enabled = true;

        datasource.clustering.enabled = enabled;
        datasource.clustering.pixelRange = pixelRange;
        datasource.clustering.minimumClusterSize = minimumClusterSize;
        
        //每次重新计算的回调
        var removeListener;
        //最小的宽度
        var minSize = 40;

        //将聚合图分类，每一类的pin样式
        var pinBuilder = new Cesium.PinBuilder();
        if(this.pinstyle == undefined){
            if(style==""){
                var pin500 = pinBuilder.fromText('500+', Cesium.Color.RED, 120).toDataURL();
                var pin300 = pinBuilder.fromText('300+', Cesium.Color.ORANGE, 120).toDataURL();
                var pin100 = pinBuilder.fromText('100+', Cesium.Color.YELLOW, 120).toDataURL();
                var pin50 = pinBuilder.fromText('50+', Cesium.Color.GREEN, 80).toDataURL();
                var pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 60).toDataURL();

                this.pinstyle = [];
                this.pinstyle.push({value:500,style:pin500});
                this.pinstyle.push({value:300,style:pin300});
                this.pinstyle.push({value:100,style:pin100});
                this.pinstyle.push({value:50,style:pin50});
                this.pinstyle.push({value:10,style:pin10});
            }
            else{
                if(!(style instanceof Array)) style = [style];
                style.forEach((data) => {
                    if(this.pinstyle==undefined) this.pinstyle = [];
                    //this.pinstyle[data.value.toString()] = pinBuilder.fromText(data.value.toString()+'+', Cesium.Color.fromCssColorString(data.bgcolor), data.width||80).toDataURL();;
                    this.pinstyle.push({value:data.value,style:pinBuilder.fromText(data.value.toString()+'+', Cesium.Color.fromCssColorString(data.bgcolor), data.width||80).toDataURL()});
                
                    if(minSize>=data.width){
                        minSize = data.width;
                    }
                });
            }

            var compare = function (obj1, obj2) {
                var val1 = obj1.value;
                var val2 = obj2.value;
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                  return 0;
                }            
            } 
            this.pinstyle = this.pinstyle.sort(compare);
        }
        

        var singleDigitPins = new Array(8);
        for (var i = 0; i < singleDigitPins.length; ++i) {
            singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.VIOLET, 48).toDataURL();
        }

        if(!datasource.customStyle){
            function customStyle(instacnce) {
                        if (Cesium.defined(removeListener)) {
                            removeListener();
                            removeListener = undefined;
                        } 
                        else {
                            var instance_view = instacnce;
                            removeListener = datasource.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
                                cluster.label.show = false;
                                cluster.billboard.show = true;
                                //cluster.billboard.id = cluster.label.id;
                                cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;

                                var bfind = false;
                                for(var i=0;i<instance_view.pinstyle.length;i++){
                                    if(clusteredEntities.length>=instance_view.pinstyle[i].value){
                                        cluster.billboard.image = instance_view.pinstyle[i].style;
                                        bfind = true;
                                        break;
                                    }
                                }
                                if(bfind==false){
                                    cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
                                }
                            });
                        }
                    }
                }
            customStyle(this);
        }
       
    //聚合图中添加点
    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        if(data.x&&data.y){
            var position = Cesium.Cartesian3.fromDegrees(data.x, data.y, height);
            var entity = datasource.entities.getById(data.id);
            if(entity){
                //先只更新坐标和图片
                entity.position=position;
                entity.billboard.image = imageUrl;
            }
            else{
                entity = datasource.entities.add({
                    id: data.id,
                    name:layerName,
                    position: position,
                    billboard: {
                        image : data.imageUrl||imageUrl,
                        //scale: this.imageScaleFactor * scale,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        //scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                        //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000)
                        width:minSize,
                        height:minSize
                    }
                });        
            }
        }
        else{
            var entity = datasource.entities.getById(data.id);
            entity = datasource.entities.add({
                    id: data.id,
                    name:layerName,
            });       
        }
    });
};
/*
*  添加聚合图:后端进行聚合分析，前端按照结果在地图上加图片和数字，并且在地图高度改变时，发出事件
*  dataInfo:数组
*  [
       {
           id:''
           x:
           y:
       }
   ]
*  style:数组：为了简单规定style 0-6：0是单点的样式，1是十以内的样式，2是百以内的样式，3是千以内，4是万以内，5是10万以内，6是超过十万
*  [
*      {
*          info：'1',  //没有特别功能，之方便理解
*          url:'/app-gongan/images/icon/聚合6.png',//
*      },
*      {
*          info：'2-9',  //没有特别功能
*          url:'/app-gongan/images/icon/聚合6.png',//
*      },
*  ]
 */
vtron.comp.std.map.Cesium.prototype.addclusterLayer2 = function(layerName, dataInfo,styles) {
    if(!layerName) layerName = 'tempLayer';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var lon = undefined;
        var lat = undefined;
        var height = 0;
        if(data.textposition){
            lon = data.textposition.lon;
            lat = data.textposition.lat;
        }
        else{
            lon = data.x;
            lat = data.y;
        }
        var tposition = Cesium.Cartesian3.fromDegrees(lon, lat,0);
        var entity = datasource.entities.getById(data.id.toString());
        if(entity){
            //先只更新label的属性
            //entity.billboard.image = imageUrl;
        }
        else{
            //data中只包含id,x,y,value
            if(data.value>1){
                var v=data.value;
                var styleUrl = undefined;
                var logV = Math.log(v)/Math.log(10);//value是10的几次方法
                var size = Math.floor(logV+1)*15+40;//位数*15+40像素

                var styleId = (Math.ceil(logV)-1)>6?6:(Math.ceil(logV)-1);
                if(!styles){
                    styleUrl = this._clusterIcon[styleId].url;
                }
                else{
                    styleUrl = styles[styleId].url;
                }
                
                entity = datasource.entities.add({
                    id: data.id.toString(),
                    name:layerName,
                    position : tposition,
                    billboard : {
                        image : styleUrl,
                        show : true, 
                        width : size*this._fontSizeScale,
                        height : size*this._fontSizeScale,
                        //verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                    },
                    label : {
                        text : v.toString(),//data.value.toString(),
                        font : '30px sans-serif',// Digital fonts
                        scale : this._fontSizeScale,
                        fillColor : Cesium.Color.fromCssColorString('#ffc901'),//Cesium.Color.WHITE,
                        style: Cesium.LabelStyle.FILL,
                        //verticalOrigin : Cesium.VerticalOrigin.CENTER,
                        //pixelOffset : new Cesium.Cartesian2(0, data.textbackgroundImage.height*-1/2),
                        pixelOffset : new Cesium.Cartesian2(0, 0),
                        //showBackground:true,
                        //backgroundColor:data.textcolor||Cesium.Color.WHITE,
                        outlineColor : Cesium.Color.BLACK,
                        outlineWidth : 2,
                        style : Cesium.LabelStyle.FILL_AND_OUTLINE
                    }
                });    
            }else{
                var singlePointStyle;
                if(!styles){
                    singlePointStyle = this._clusterIcon[0].url;
                }
                else{
                    singlePointStyle = styles[0].url;
                }
                entity = datasource.entities.add({
                    id: data.id.toString(),
                    name:layerName,
                    position : tposition,
                    billboard : {
                        image : singlePointStyle,
                        show : true,
                        width : 35*this._fontSizeScale,
                        height :35*this._fontSizeScale,
                    },
                });    
            }
        }   
    });
}

/**
 * layerName: 聚合图层名称
 * dataInfo : 聚合图层的原始数据
 * dataInfo = [{
 *                  id: 该点id
 *                  x:  经度
 *                  y:  纬度
 *                  imageUrl: 原始图标（聚合前图标）
 * }]
 * imageUrl: 原始单点图层的图标
 * clusterStyle: 点聚合后的style样式
 * clusterStyle = {
 *                  //billboardStyles: 聚合点图标
                    * billboardStyles=[
                    *              //为了简单规定style value：10是十以内的样式，100是百以内的样式，1000是千以内，10000是万以内，100000是10万以内，1000000是超过十万
                    *               {
                    *                   value：'10',  //表示聚合十个点以内的聚合点图标（不代表图标上数字是10）
                    *                   url:'/app-gongan/images/icon/聚合6.png',//
                    *               },
                    *               {
                    *                   value：'100',  //表示聚合十~百个点以内的聚合点图标（不代表图标上数字是10）
                    *                   url:'/app-gongan/images/icon/聚合6.png',//
                    *               },
                    *          ]
 *                  billboardShow: 聚合点图标是否可见 默认为 true 可见
 *                  labelFont: 文字字体 默认为：'30px sans-serif'
 *                  labelColor: 文字颜色 默认为：'rgba(255,0,255,1.0)'
 *                  labelShow: 文字是否可见 默认为 true 可见
 *                  minDistance: 设置一个最小距离，默认0
 *                  minScale: 设置文字在最小距离时的缩放比例，默认1
 *                  maxDistance: 设置一个最大距离，默认拿配置的默认高度
 *                  maxScale: 设置文字在最大距离时的缩放比例，默认0.5
 * }
 */
vtron.comp.std.map.Cesium.prototype.addClusterLayer3 = function(layerName, dataInfo, imageUrl, clusterStyle,clusterType) {
    if(!layerName) layerName = 'tempLayer';
    var clusterDataSource = this.getDataSourceByName(layerName);
    if(!clusterDataSource) {
        clusterDataSource = new Cesium.CustomDataSource(layerName);
    }
    if(!dataInfo) return;
    var _clusterTarget;
    if(clusterType == 'large'){
        ///LLL 预聚合时间
        var startTime = new Date();
        _clusterTarget = _preCluster(dataInfo);
        var preClusterTime = new Date();

        if (_clusterTarget == null) //did not pre cluster
            _clusterTarget = dataInfo;
        //要添加的单点的长度（如果有预聚合，该出长度不等于dataInfo的长度）
        var totalBillboard = _clusterTarget.length;
        //添加原始的点数据
        clusterDataSource.entities.suspendEvents();
        for(var i = 0;i< totalBillboard; i++){
            var billboardImg = _clusterTarget[i].imageUrl || imageUrl;
            //判断数据经纬度是否符合要求
            if (_clusterTarget[i].x == "" || _clusterTarget[i].y == "")
                continue;
            else if (typeof (_clusterTarget[i].x) != 'number' || typeof (_clusterTarget[i].y) != 'number')
                continue;
            else {
                //开始添加单点
                clusterDataSource.entities.add({
                    id: _clusterTarget[i].id,
                    //源码中要用用的权重
                    _weight: _clusterTarget[i].weight,
                    _clusterChildren: _clusterTarget[i].children,
                    position: new Cesium.Cartesian3.fromDegrees(_clusterTarget[i].x, _clusterTarget[i].y, 0),
                    show: true,
                    billboard: {
                        image: billboardImg,
                    },
                    scaleByDistance: true,
                    DistanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, Number.MAX_VALUE)
                })
            }
        }
        clusterDataSource.entities.resumeEvents();
    }else{
        dataInfo.forEach((data)=>{
            clusterDataSource.entities.add({
                position : Cesium.Cartesian3.fromDegrees(data.x, data.y),//data.position,
                id: data.id,
                _weight: 1,
                billboard : {
                    image : imageUrl,
                    //width: 30,
                    //height: 30
                },
                show: true,
                scaleByDistance: true,
                DistanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, Number.MAX_VALUE)
            });
          });
    }
    

    clusterDataSource._clusterChildren = dataInfo;
    //在这里添加聚合图类型，识别聚合图data的数量级，如果数量级太小就要在cesium库里面做预聚合
    clusterDataSource._clusterType = clusterType||'large';
    //聚合后按数量级设定不同billboard样式
    var billBoardSyles = [];
    if(!clusterStyle.billBoardSyles){
        //没有传就用默认的
        billBoardSyles.push({value:100000,url:'/vmap2/images/icon/6位数.png'});
        billBoardSyles.push({value:10000,url:'/vmap2/images/icon/5位数.png'});
        billBoardSyles.push({value:1000,url:'/vmap2/images/icon/4位数.png'});
        billBoardSyles.push({value:100,url:'/vmap2/images/icon/3位数.png'});
        billBoardSyles.push({value:10,url:'/vmap2/images/icon/2位数.png'});
        billBoardSyles.push({value:1,url:'/vmap2/images/icon/1位数.png'});
    }else{
        if(!(clusterStyle.billBoardSyles instanceof Array)){
            billBoardSyles = [clusterStyle.billBoardSyles]
        }
    }
    
    dataSourcePromise = this._viewer.dataSources.add(clusterDataSource).then(function (dataSource) {
        //源码中需要用来*相机高度计算出每个点的聚合范围，暂时不清楚改了会什么效果
        var pixelRange = 0.05;
        var minimumClusterSize = 5;
        var enabled = true;

        dataSource.clustering.enabled = enabled;
        dataSource.clustering.pixelRange = pixelRange;
        dataSource.clustering.minimumClusterSize = minimumClusterSize;
        //var height = $("#common-config").get(0)&&$("#common-config").get(0).getConfigById("mapAdvanceConfig",'mapLocationHeightSet') || 50000;
        //监听聚合，指定聚合图标
        dataSource.clustering.clusterEvent.addEventListener(function(entities, cluster) {
            for(var i=0;i<billBoardSyles.length;i++){
                if(entities.length>=billBoardSyles[i].value){
                    cluster.billboard.image = billBoardSyles[i].url;
                    break;
                }
            }
            cluster.billboard.show = clusterStyle.billboardShow || true;
            //cluster.billboard.image =  clusterStyle.imageUrl;
            cluster.billboard.VerticalOrigin = Cesium.VerticalOrigin.CENTER;
            cluster.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
            cluster.billboard.height = 80;
            cluster.billboard.width = 80;
            cluster.label.show = clusterStyle.labelShow || true;
            cluster.label.font = clusterStyle.labelFont || '30px sans-serif';
            var labelColor = clusterStyle.labelColor|| 'rgba(255,255,255,1.0)';
            cluster.label.fillColor = Cesium.Color.fromCssColorString(labelColor);
            cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
            cluster.label.showBackground = true;
            cluster.label.backgroundColor = Cesium.Color.fromCssColorString('rgba(255,255,255,0.0)');//背景透明才可以把字放在上面
            cluster.label.scaleByDistance = new Cesium.NearFarScalar(0, 1, 50000, 0.5);
            cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
            cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
        });
    });
    this._viewer.scene.hasClusterLayer = true;
    //log LLL
    var clusterTime = new Date();
    this._debugTyle = true;
    var totalTime = clusterTime-startTime;
    if(totalTime>1000){
        var info = {};
        info.level = 1;//普通log
        info.function = 'addClusterLayer3:';
        info.para =[layerName,dataInfo.length];
        info.info = '聚合时间(ms)：总时间'+ '('+totalTime+')'+'    '+'预聚合时间'+'('+(preClusterTime-startTime)+')';
        this._mapLog(info); 
    }
};

/**
 * 计算预聚合的结果 返回preClusterJson
 * @param {array} jsonOrigin 传进来的点数据
 * jsonOrigin = {
 *               x:点的经度
 *               y:点的纬度
 *               }
 * @param {array} preClusterJson 输出结果 
 * preClusterJson = [{
 *                    weight:聚合中心权重
 *                    children: [id1，id2, id3,...]聚合中心的子节点
 *                    x: 聚合中心的经度
 *                    y: 聚合中心的纬度
 *                   }]
 */
var _preCluster = function(jsonOrigin){
    //数据小于4w可以直接处理，否则要进行预聚合，预聚合之后就不能再分解成单个
    // if(jsonOrigin.length < 40000){
    //     return null;
    // }
    var preClusterJson = [];
    var blocks = _splitInBlocks(jsonOrigin);
    blocks.data.forEach(element => {
        //console.log('pre cluster go.......', blockIndex++)
        _splitPrevCluster(element, preClusterJson, blocks.edgeX, blocks.edgeY)
    });

    return preClusterJson;
}

/**
 * 如果原始数据太大（目前临界值是40000,
 * 将元数据分块并计算出临近点与聚合点纬度和经度允许偏差值
 * @param {array} jsonOrigin 传进来的点数据
 * jsonOrigin = {
 *               x:点的经度
 *               y:点的纬度
 *               }
 * @param {*} edgeX 临近点和聚合中心的纬度偏差(距离)
 * @param {*} edgeY 临近点和聚合中心的经度偏差
 */
var _splitInBlocks = function(jsonOrigin, edgeX, edgeY){
    var blocks = []

    var minX = null,
        maxX = null,
        minY = null,
        maxY = null;

    for (var i = 0; i < jsonOrigin.length; i++) {
        if (typeof (jsonOrigin[i].x) != 'number' ||
            typeof (jsonOrigin[i].y) != 'number')
            continue;
        if (minX == null || jsonOrigin[i].x < minX)
            minX = jsonOrigin[i].x
        if (maxX == null || jsonOrigin[i].x > maxX)
            maxX = jsonOrigin[i].x
        if (minY == null || jsonOrigin[i].y < minY)
            minY = jsonOrigin[i].y
        if (maxY == null || jsonOrigin[i].y > maxY)
            maxY = jsonOrigin[i].y
    }
    //计算出所有点数据包络矩形的长和宽
    var width =  (maxX == minX)?1:(maxX - minX);//minX maxX是经纬度范围
    var height =  (maxY == minY)?1:(maxY - minY);//所有点的外包矩形
    //按照原始数据量划分的块数
    var blockCountf = Math.max(Math.sqrt(jsonOrigin.length / 1600),1.0);
    //行列数
    var row = Math.max(1, Math.ceil((height / width) * Math.sqrt(blockCountf)));
    var col = Math.max(1, Math.ceil((width / height) * Math.sqrt(blockCountf)));

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++)
            blocks.push([])
    }
    //每一格占的经纬度
    var stepX = width / col;
    var stepY = height / row;
    //20是经验值
    edgeX = stepX / 20;
    edgeY = stepY / 20;
    
    for (var i = 0; i < jsonOrigin.length; i++) {
        //   if (i % 1000 == 0)
        //       console.log('split index go.......', i)
        if (typeof (jsonOrigin[i].x) != 'number' ||
            typeof (jsonOrigin[i].y) != 'number')
            continue;
        //确定jsonOrigin[i]属于哪一个块
        var blockIndex = Math.min(row - 1, Math.floor((jsonOrigin[i].y - minY) / stepY)) * col + Math.min(col - 1, Math.floor((jsonOrigin[i].x - minX) / stepX));
        jsonOrigin[i].id = i;
        blocks[blockIndex].push(jsonOrigin[i])
    }
    return {
        data: blocks, //分块的结果数组
        edgeX: edgeX,
        edgeY: edgeY
    };
}

/**
 * 计算预聚合的结果 返回preClusterJson
 * @param {array} jsonOrigin 传进来的点数据
 * jsonOrigin = {
 *               x:点的经度
 *               y:点的纬度
 *              }
 * @param {array} preClusterJson 输出结果 
 * preClusterJson = [{
 *                    weight:聚合中心权重
 *                    children: [id1，id2, id3,...]聚合中心的子节点
 *                    x: 聚合中心的经度
 *                    y: 聚合中心的纬度
 *                  }]
 * @param {number} edgeX 临近点和聚合中心的纬度偏差
 * @param {number} edgeY 临近点和聚合中心的经度偏差
 */
var _splitPrevCluster = function(jsonOrigin, preClusterJson, edgeX, edgeY){
    for (var i = 0; i < jsonOrigin.length; i++) {
        if (typeof (jsonOrigin[i].x) != 'number' ||
            typeof (jsonOrigin[i].y) != 'number')
            continue;

        var item = jsonOrigin[i]
        if (item._clusted)
            continue;
        item._clusted = true;
        var preClusterItem = {
            weight: 1,
            children: [item.id],

            x: item.x,
            y: item.y

        };

        for (var j = i + 1; j < jsonOrigin.length; j++) {
            if (typeof (jsonOrigin[j].x) != 'number' ||
                typeof (jsonOrigin[j].y) != 'number')
                continue;
            var neighbor = jsonOrigin[j]
            if (neighbor._clusted)
                continue;
            if (_pointIsNeighbor(neighbor, preClusterItem.x, preClusterItem.y, edgeX, edgeY)) {
                neighbor._clusted = true;
                preClusterItem.children.push(neighbor.id)
                preClusterItem.x = (preClusterItem.x * preClusterItem.weight + neighbor.x) / (preClusterItem.weight + 1)
                preClusterItem.y = (preClusterItem.y * preClusterItem.weight + neighbor.y) / (preClusterItem.weight + 1)
                preClusterItem.weight += 1
            }
        }
        preClusterJson.push(preClusterItem)
    }
    return preClusterJson;
}

/**
 * 
 * @param {object} item 需要判断的临近点
 * @param {number} x 临近点的经度
 * @param {number} y 临近点的纬度
 * @param {number} edgeX 临近点和聚合中心点的偏差经度
 * @param {number} edgeY 临近点和聚合中心点的偏差纬度
 */
var _pointIsNeighbor = function(item, x, y, edgeX, edgeY){
    if (item.x <= x + edgeX &&
        item.x >= x - edgeX &&
        item.y <= y + edgeY &&
        item.y >= y - edgeY)
        return true;
    return false;
}

/*
 * 清空聚合图
*/
vtron.comp.std.map.Cesium.prototype.clearclusterLayer = function(layerName) {
var datasource = this.getDataSourceByName(layerName);
    if(datasource) {
        datasource.clustering.enabled = false;
        this._viewer.dataSources.remove(datasource, true);
    }
};

/*
 * 控制聚合图开关
 * onoff聚合开关,true时是聚合，false是散开
 * clusterNum 最小聚合数量
*/
vtron.comp.std.map.Cesium.prototype.controlClusterLayer = function(layerName, onoff, clusterNum) {
    var datasource = this.getDataSourceByName(layerName);
        if(datasource) {
            if(onoff){
                if(datasource.show){
                    //如果没有clusterEvent
                    if(datasource.clustering.clusterEvent._listeners.length==0){
                        //散点变成可以聚合要取消按距离display的那个
                        var condition = this._layerDisplayCondition.get(layerName);
                        if(condition){
                            this._layerDisplayCondition.delete(layerName);
                        }
                        //图标使用默认样式
                        var billBoardSyles = [];
                        billBoardSyles.push({value:100000,url:'/vmap2/images/icon/6位数.png'});
                        billBoardSyles.push({value:10000,url:'/vmap2/images/icon/5位数.png'});
                        billBoardSyles.push({value:1000,url:'/vmap2/images/icon/4位数.png'});
                        billBoardSyles.push({value:100,url:'/vmap2/images/icon/3位数.png'});
                        billBoardSyles.push({value:10,url:'/vmap2/images/icon/2位数.png'});
                        billBoardSyles.push({value:1,url:'/vmap2/images/icon/1位数.png'});

                        var pixelRange = 0.05;
                        var minimumClusterSize = clusterNum;
                        var enabled = onoff;
                        datasource.clustering.enabled = enabled;
                        datasource.clustering.pixelRange = pixelRange;
                        datasource.clustering.minimumClusterSize = minimumClusterSize;

                        datasource.clustering.clusterEvent.addEventListener(function(entities, cluster) {
                            for(var i=0;i<billBoardSyles.length;i++){
                                if(entities.length>=billBoardSyles[i].value){
                                    cluster.billboard.image = billBoardSyles[i].url;
                                    break;
                                }
                            }
                            //如果要在地图上Pick这个聚合的可以在cluster.billboard中加id，但是id要怎么设定会好一点？
                            cluster.billboard.show = true;
                            //cluster.billboard.image =  clusterStyle.imageUrl;
                            cluster.billboard.VerticalOrigin = Cesium.VerticalOrigin.CENTER;
                            cluster.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                            cluster.billboard.height = 80;
                            cluster.billboard.width = 80;
                            cluster.label.show = true;
                            cluster.label.font = '30px sans-serif';
                            var labelColor = 'rgba(255,255,255,1.0)';
                            cluster.label.fillColor = Cesium.Color.fromCssColorString(labelColor);
                            cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                            cluster.label.showBackground = true;
                            cluster.label.backgroundColor = Cesium.Color.fromCssColorString('rgba(255,255,255,0.0)');//背景透明才可以把字放在上面
                            cluster.label.scaleByDistance = new Cesium.NearFarScalar(0, 1, 50000, 0.5);
                            cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
                            cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                        });
                    }
                    this._viewer.camera.isRotating = true;
                    this._viewer.scene.hasClusterLayer = true;
                }
            }else{
                //散点图层聚合后关闭聚合重新变成散点图层，要把按距离显示重新开出来
                this.setLayerDisplayCondition(layerName, null, null, true);
            }
            datasource.clustering.enabled = onoff;
        }
    };

/*
 *获取圆的外包
 *data{
 *   tyle:'circle',
 *   GeoCenter:{x,y,z,lon,lat}, //世界坐标:xyz,经纬度坐标是lon,lat
 *   GeoRadius:  //米
 *}
 */
vtron.comp.std.map.Cesium.prototype.envelope = function(data) {
    if(data) {
        var type = data.type;
        if(type=='circle'){
            //世界坐标转经纬度
            var lonlat={};
            if(!data.GeoCenter.lon || !data.GeoCenter.lat){
                lonlat = this.getCartographicFromCartesian(data.GeoCenter.x,data.GeoCenter.y,data.GeoCenter.z);
            }
            else{
                lonlat.lon = data.GeoCenter.lon;
                lonlat.lat = data.GeoCenter.lat;
            }
            //方法1：中心点的世界坐标转经纬度，再转墨卡托，然后计算外包，再转经纬度？ 这种方法得到的box不能包住圆，是计算出问题还是圆显示有问题误差！！！
            //墨卡托的n米在实际中达不到n米
            //经纬度转wm
            var wm = this.wgs84ToMercator({x:lonlat.lon,y:lonlat.lat});
            //计算envelope
            var minx = wm.x-data.GeoRadius;
            var maxx = wm.x+data.GeoRadius;
            var miny = wm.y-data.GeoRadius;
            var maxy = wm.y+data.GeoRadius;
            var envelope = this.mercatorToWgs84BB({north:maxy,east:maxx,south:miny,west:minx});
            //方法2：使用turf计算点的缓冲区，计算缓冲区的envelop
            // var point = turf.point([lonlat.lon,lonlat.lat]);
            // var buffer = turf.buffer(point,data.GeoRadius/1000,{units:'kilometers'});
            // var bbox = turf.bbox(buffer);
            // envelope.west = bbox[0];
            // envelope.south = bbox[1];
            // envelope.east = bbox[2];
            // envelope.north = bbox[3];
            // var dis = turf.distance(t,point1,{units:'kilometers'});

            //cesium本身的方式获取到的距离是正确的
            // var geodesic = new Cesium.EllipsoidGeodesic();
            // var endCartographic = Cesium.Cartographic.fromDegrees(this._viewer.lonmax,this._viewer.latmin);;
            // var startCartographic = Cesium.Cartographic.fromDegrees(this._viewer.lonmin,this._viewer.latmin);
            // geodesic.setEndPoints(startCartographic, endCartographic);

            // geodesic.setEndPoints(Cesium.Cartographic.fromDegrees(0,0), Cesium.Cartographic.fromDegrees(0,1));
            // var t =geodesic.surfaceDistance;


            return envelope;
        }
    }
};

/*  Convert a WGS84 location into a mercator location
 *
 *  p: the WGS84 location like {x: lon, y: lat}
*/
vtron.comp.std.map.Cesium.prototype.wgs84ToMercator = function(p) {
    if(this.WMP==undefined) {
        this.WMP = new Cesium.WebMercatorProjection();
    }
    var mp = this.WMP.project(Cesium.Cartographic.fromDegrees(Number(p.x), Number(p.y)));
    return {
        x: mp.x,
        y: mp.y
    };
};

/*  Convert a mercator location into a WGS84 location
 *
 *  p: the mercator lcation like {x, y}
*/
vtron.comp.std.map.Cesium.prototype.mercatorToWgs84 = function(p) {
    if(this.WMP==undefined){
        this.WMP = new Cesium.WebMercatorProjection();
    }
    var wp = this.WMP.unproject(new Cesium.Cartesian3(p.x, p.y));
    return {
        x: wp.longitude,
        y: wp.latitude
    };
};

/*  Convert a mercator bounding box into a WGS84 bounding box
 *
 *  bb: the mercator bounding box like {north, east, south, west}
*/
vtron.comp.std.map.Cesium.prototype.mercatorToWgs84BB = function(bb) {
    if(this.WMP==undefined){
        this.WMP = new Cesium.WebMercatorProjection();
    }
    var sw = this.WMP.unproject(new Cesium.Cartesian3(bb.west, bb.south));
    var ne = this.WMP.unproject(new Cesium.Cartesian3(bb.east, bb.north));
    return {
        north: this.rad2deg(ne.latitude),
        east: this.rad2deg(ne.longitude),
        south: this.rad2deg(sw.latitude),
        west: this.rad2deg(sw.longitude)
    };
};

/*
 *按照四边形区域显示地图
 */
vtron.comp.std.map.Cesium.prototype.flytoRectangle = function(bbox, rate = 1){
    if(!this._viewer) return;
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    this.zoomState = true;
    var rectangle = Cesium.Rectangle.fromDegrees(bbox.west, bbox.south, bbox.east, bbox.north);
    if(rate && rate >1){
        //比较(east - west)和rate*(north-south)*2 *2是因为经度是纬度两倍
        if((bbox.east - bbox.west) > rate*(bbox.north - bbox.south)*2){
            //原来的比较大用原来的
            //比原来宽会导致纬度显示范围少，需要再调整north south宽度
            rectangle = Cesium.Rectangle.fromDegrees(bbox.west, bbox.south, bbox.east, bbox.north);
        }else{
            //为了重新算矩形，线拿原来的center(longitude, latitude, alt)
            var center = new Cesium.Rectangle.center(rectangle);
            //计算(east - center.longitude)
            var maxLon = rate*(bbox.north - bbox.south)/2;    //rate*(bbox.north - bbox.south )是大墙的经度差，除以2才是中心距边线的经度差
            //east 和 west是新的,要用新的变量，防止传入的bbox被污染
            var resultBBox = {};
            resultBBox.west = Cesium.Math.toDegrees(center.longitude) - maxLon;
            resultBBox.east = Cesium.Math.toDegrees(center.longitude) + maxLon;
            //利用新的经度算新的纬度，纬度差是经度的1/2，将新的纬度差和旧的纬度差对比 用大的
            var maxLat = maxLon/2;//中心点距边线纬度差；
            //算出新的纬度
            var tempNorth = Cesium.Math.toDegrees(center.latitude) + maxLat;
            var tempSouth = Cesium.Math.toDegrees(center.latitude) - maxLat;

            var _canvasHeight = this.canvasHeight || this.parentElement.offsetHeight;
            var _canvasWidth = this.canvasWidth || this.parentElement.offsetWidth;
            var cameraLat = _canvasHeight/_canvasWidth * maxLon;

            //分别和旧的比，最终用大范围的纬度
            if(tempNorth > Cesium.Math.toDegrees(center.latitude) + cameraLat){
                resultBBox.north = tempNorth;
            }else{
                resultBBox.north = Cesium.Math.toDegrees(center.latitude) + cameraLat;
            }
            if(tempSouth < Cesium.Math.toDegrees(center.latitude) - cameraLat){
                resultBBox.south = tempSouth;
            }else{
                resultBBox.south = Cesium.Math.toDegrees(center.latitude) - cameraLat
            }
            rectangle = Cesium.Rectangle.fromDegrees(resultBBox.west, resultBBox.south, resultBBox.east, resultBBox.north);
        }
    }
    this._viewer.camera.flyTo({
        destination : rectangle
    });
};

/*  Convert degrees into radians
 *
 *  d: the degrees to be converted to radians
*/
vtron.comp.std.map.Cesium.prototype.deg2rad = function(d) {
    var r = d * (Math.PI / 180.0);
    return r;
};
        
/*  Convert radians into degrees
*
*  r: the radians to be converted to degrees 
*/
vtron.comp.std.map.Cesium.prototype.rad2deg = function(r) {
    var d = r / (Math.PI / 180.0);
    return d;
};

/*
   添加文字标注
   layername 图层名  （往地图中添加任何的要素都需要提供图层名和id，这样方便使用方控制进行添加删除显示隐藏等）
   dataInfo: [
       {
           id:
           name:
           text:
           font:
           textcolor:
            textposition:{lon:,lat}
            verticalOrigin:
            textbackgroundImage:{url:,width:,height:}
       }
   ]
 */
vtron.comp.std.map.Cesium.prototype.addLabelElement = function(layerName,dataInfo){
    if(!layerName) layerName = 'tempLayer';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        //supportSearch && this.searchLayerArray.push(layerName);
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    if(!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    dataInfo.forEach((data) => {
        var tposition = Cesium.Cartesian3.fromDegrees(data.position.lon, data.position.lat, data.position.height||0);
        var entity = datasource.entities.getById(data.id);
        if(entity){
            //先只更新label的属性
            //entity.billboard.image = imageUrl;
        }
        else{
            if(!data.outlineColor || !data.backgroundColor || !data.fillColor){
                data.fillColor = data.fillColor || 'rgba(255, 255, 255, 1.0)';
                data.outlineColor = data.outlineColor || data.fillColor;
                data.backgroundColor = 'rgba(100,100,0,0.1)';
            }
            entity = datasource.entities.add({
                id: data.id,
                name:layerName,
                position : tposition,
                // billboard : {
                //             image : data.textbackgroundImage.url,//"/test-map-engine/image/shui.png", // default: undefined
                //             show : true, // default
                //             width : data.textbackgroundImage.width,//100, // default: undefined
                //             height : data.textbackgroundImage.height,//100, // default: undefined
                //             verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                // },
                // point : {
                //     color : Cesium.Color.SKYBLUE,
                //     pixelSize : 10,
                //     outlineColor : Cesium.Color.YELLOW,
                //     outlineWidth : 3,
                //     heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
                // },
                label : {
                    text : data.text,//'60',
                    font : data.font || '15pt sans-serif',//'30px sans-serif',
                    fillColor : Cesium.Color.fromCssColorString(data.fillColor),//Cesium.Color.WHITE,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth : data.outlineWidth || 1,
                    outlineColor : Cesium.Color.fromCssColorString(data.outlineColor),
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                    //pixelOffset : new Cesium.Cartesian2(0, data.textbackgroundImage.height*-1/2),
                    showBackground : true,
                    backgroundColor : Cesium.Color.fromCssColorString(data.backgroundColor),
                    scaleByDistance: new Cesium.NearFarScalar(5000, 1.0, 100000, 0.2)
                }
            });
            entity.geoType = 'label';
            this.fire('addLabelEvent', {'optState': 'add-label', 
                'optID': data.id, 
                'points': {'lon': data.position.lon, 'lat' : data.position.lat, 'height' : data.position.height || 0},
                'text' : data.text,
                'font' : data.font || '15pt sans-serif',
                'fillColor':  data.fillColor,
                'outlineWidth': data.outlineWidth || 1,
                'outlineColor' : data.outlineColor,
                'backgroundColor' : data.backgroundColor
            });     
        }   
    });
};

/*
 *控制地图移动旋转倾斜的开关
 */
vtron.comp.std.map.Cesium.prototype.enableMap = function(enable){
    this._viewer.scene.screenSpaceCameraController.enableRotate = enable;
    this._viewer.scene.screenSpaceCameraController.enableTranslate = enable;
    this._viewer.scene.screenSpaceCameraController.enableTilt  = enable;
    //this._viewer.scene.screenSpaceCameraController.enableZoom = enable;
};

/*
 *控制地图缩放的开发
 */
vtron.comp.std.map.Cesium.prototype.enableMapZoom = function(enable){
    this._viewer.scene.screenSpaceCameraController.enableZoom = enable;
};

/*
 *指北针的旋转角度，顺时针
 */
vtron.comp.std.map.Cesium.prototype.compassAngle = function(){
    return this._viewer.compassangle;
};

/*
 *
 */
vtron.comp.std.map.Cesium.prototype.resetCompass = function(){
    // var camera = this.getCameraPosition();
    // camera.heading = Cesium.Math.toRadians(0);
    // camera.pitch = Cesium.Math.toRadians(-90);
    // camera.roll = Cesium.Math.toRadians(0);
    // this.setCameraPosition(camera.position,camera.heading,camera.pitch,camera.roll);

     //test
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    var camera = this._viewer.camera;
    var scene = this._viewer.scene;
    var sscc = scene.screenSpaceCameraController;
    var center = undefined;
    var unprojectedScratch = new Cesium.Cartographic();
    //相机和地球的交点
    if(Cesium.defined(this._viewer.trackedEntity)) {
        center = this._viewer.trackedEntity.position.getValue(this._viewer.clock.currentTime, result);
    } else {
        var rayScratch = new Cesium.Ray(); 
        rayScratch.origin = camera.positionWC;
        rayScratch.direction = camera.directionWC;
        center = scene.globe.pick(rayScratch, scene, center);
        if(scene.mode == Cesium.SceneMode.SCENE2D || scene.mode == Cesium.SceneMode.COLUMBUS_VIEW) {
            center = camera.worldToCameraCoordinatesPoint(center, center);
        } 
    }
    //相机位置
    var cameraPosition = scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic, new Cesium.Cartesian3());
    //交点法线？
    var surfaceNormal = scene.globe.ellipsoid.geodeticSurfaceNormal(center);

    var focusBoundingSphere = new Cesium.BoundingSphere(center, 0);
    camera.flyToBoundingSphere(focusBoundingSphere, {
        offset: new Cesium.HeadingPitchRange(0,
            // do not use camera.pitch since the pitch at the center/target is required
            Cesium.Math.PI_OVER_TWO - Cesium.Cartesian3.angleBetween(
                surfaceNormal,
                camera.directionWC
            ),
            // distanceToBoundingSphere returns wrong values when in 2D or Columbus view so do not use
            // camera.distanceToBoundingSphere(focusBoundingSphere)
            // instead calculate distance manually
            Cesium.Cartesian3.distance(cameraPosition, center)
        ),
        duration: 1.5
    });
};

/*
 *鼠标位置，选中的实体
 *type=0 返回最上层的一个实体
 *type=1 返回所有的实体
 *x y 屏幕坐标
 */
vtron.comp.std.map.Cesium.prototype.pick = function(x,y,type){
    var pickedobject;
    try{
        if(type==0){
            pickedobject = this._viewer.scene.pick(new Cesium.Cartesian2(x,y))
        }
        else if(type==1){
            pickedobject = this._viewer.scene.drillPick(new Cesium.Cartesian2(x,y))
        }
        return pickedobject;
    }
    catch(error){
        var info = {};
        info.level = 0;//error
        info.info = 'pick失败，mapLib error！';
        this._mapLog(info);
        return undefined;
    }   
};

/**
 * 添加静态点图层数据，数据源是GeoJson格式，其中参数name是选中节点后判断类型的依据,按照不同的属性配置不同的style
 * layerName：alert|gps|yiyuan, bShowLayer: 默认显示加载层
 * style
 * {
 *     
 *        value1:"imageurl1",//value1是属性值1
 *        value2:"imageurl2" //value2是属性值2
 *     
 * }
 */
/*
vtron.comp.std.map.Cesium.prototype.loadPointLayerGeoJsonData_withAttribute = function(layerName, url, attributeName,style,bShowLayer = true, supportSearch = false) {
    var ds = this.$$("#dsInternal"); //内部的数据请求组件
    supportSearch && this.searchLayerArray.push(layerName);
    ds.load({
        url: url,
        success: (data) => {
            if(data.data && !data.data.length) return;
            var entitiesCollection = new Cesium.CustomDataSource(layerName);
            for(var i = 0, len = data.features.length; i < len; i++) {
                let id = data.features[i].id,
                    coord = data.features[i].geometry.coordinates,
                    properties = data.features[i].properties;
                var imageU = imageUrl;
                    if(style && style.properties[attributeName])
                        imageU = style.properties[attributeName];
                    position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], height),
                    entity = entitiesCollection.entities.add({
                        id: id,
                        name: layerName,
                        position: position,
                        billboard: {
                            image : imageU,
                            scale: this.imageScaleFactor * scale,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            //sizeInMeters : true,
                            scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),
                            //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000),
                        }
                    });
                entity.show = bShowLayer;
                entity.layerName = layerName;
                entity.x = coord[0];
                entity.y = coord[1];
                entity.id = id;
                entity.otherProperty = properties;
            };
            this._viewer.dataSources.add(entitiesCollection);
        }
    })
};
*/

/*
 *添加鼠标样式
 *curUrl:样式图片或者系统光标名
 *type：0：系统光标，1：自定义光标
 *left : 光标热点x
 *top ： 光标热点y 0，0 表示图片左上角
 *可以考虑建立cursor的缓存，避免每次请求图片
 */
vtron.comp.std.map.Cesium.prototype.addCursorStyle = function(curUrl,type=0,left=0,top=0,enable=true){
    //this.style.cursor = "pointer";
    //this.$$("canvas").style.cursor="w-resize";
    var cursorvalue;
    if(curUrl==""||curUrl==undefined){
        cursorvalue = 'default';
    }
    else{
        if(type!=0){
            cursorvalue = "url("+curUrl+")"+left+" "+ top+",auto";
        }
        else{
            cursorvalue = curUrl;
        } 
    }


    return cursorvalue;
};

/*
 * 改变光标的样式：改变光标样式，不影响当前地图的操作状态
 * 内部函数！
 * cursorStyle 参考custom_Cursor变量的赋值,比如"move","choose-line"......
 */
vtron.comp.std.map.Cesium.prototype.changeCursor = function(cursorStyle){
    if(this.custom_Cursor && this.custom_Cursor[cursorStyle]){
        this.$$("canvas").style.cursor = this.custom_Cursor[cursorStyle];
        this.cursorstyle = cursorStyle;
        //console.log(this.cursorstyle);
    }
};

/*
 *恢复光标样式和optstate，保持一致
 *内部函数！
 *目的：
 */
/*vtron.comp.std.map.Cesium.prototype.resetCursor = function(){
    if(this.custom_Cursor&&this.custom_Cursor[this.optState]){
        this.$$("canvas").style.cursor = this.custom_Cursor[this.optState];
        this.cursorstyle = this.optState;
    }
};*/

/*
 *鼠标移动到图层的某个要素时，要素改变显示样式
 */
vtron.comp.std.map.Cesium.prototype.pickedStyle = function(layerName,styleUrl){
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.datasources.add(datasource);
    }
    
    datasource.imagePicked =  styleUrl;
};

/*
 *修改被选中实体的样式以及提示信息，在mouse_move中调用
 *instance: cesium viewer
 *pickedObject: 鼠标选中的一批实体，目前只实现选中一个
 *change：
 *    0：恢复原来图标
 *    1：修改为被选中的图标
 *    //2：显示提示信息
 */
var changeObjectStyle = function(instance,pickedObject,change){

    if(change==1){
        //恢复obj的样式为dataSources.imageSrc 或者 entities.imageSrc
        for(var i=0;i<instance.pickedEntities.length;i++){
            var entity = instance.pickedEntities[i];
            var datasource = instance.getDataSourceByName(entity.layerName);
            if(entity.billboard)
                entity.billboard.image = entity.imageSrc||datasource.imageSrc;
            entity.picked_startTime = undefined;
        }
        instance.pickedEntities = [];

        //修改obj的样式为dataSources.imagePicked
        //获取拿到的实体或者图元
        var entity = pickedObject.id || pickedObject.primitive;
        //如果鼠标移动到3dtile上暂时先不改样式，直接返回 以后可能会用来显示3dtiles信息等
        if(pickedObject.tileset){
            //判断是否移动到3dtile上
            entity = pickedObject.tileset;
            entity.layerName = entity.name;
            return;
        }
        entity.layerName = entity.layerName || 'tempLayer';
        //dataSource可能是实体图层也可能是图元图层
        var datasource = instance.getDataSourceByName(entity.layerName) || instance.getPrimitiveCollectionByName(entity.layerName);
        if(!datasource) return;
        if((entity.imagePicked||datasource.imagePicked||datasource.imageSrc)&&entity.billboard)
            entity.billboard.image = entity.imagePicked||datasource.imagePicked||datasource.imageSrc;//"http://sys01/test-map-engine/image/alert1.png";//
        instance.pickedEntities.push(entity);
        entity.picked_startTime = new Date().getTime();//被选中的时间
    }
    else if(change==0){
        if(instance.pickedEntities.length==0){
            return;
        }
        else{
            //恢复obj的样式为dataSources.imageSrc 或者 entities.imageSrc
            for(var i=0;i<instance.pickedEntities.length;i++){
                var entity = instance.pickedEntities[i];
                var datasource = instance.getDataSourceByName(entity.layerName);
                if(entity.billboard)
                    entity.billboard.image = entity.imageSrc||datasource.imageSrc;
                entity.picked_startTime = undefined;
            }
            instance.pickedEntities = [];
        }
    }
};

var setPickeObjectLabel = function(instance,label,display){
    var mapTag = instance.$$("#mapTag");
    var beshow = mapTag.style.display;
    var plable = mapTag.style.innerHTML;
    if(display=='block'&&( display!=beshow || plable!=label))
    {   
        //如果label需要显示，则更新坐标等信息
        var offset = 20;
        if(this.offsetWidth>4096) 
            offset = 64;
        if(instance.optState!='move'){
            var labelx = instance._mousex + offset;
        }else{
            var labelx = instance._mousex + offset/2;
        }
        var labely = instance._mousey + offset;
        mapTag.innerHTML = label;
        mapTag.style.left= labelx+'px';
        mapTag.style.top= labely+'px';
        mapTag.style.display = display; 
    }
    else if(display == 'none' && display!=beshow)
    {   
        //如果label当前是显示状态，需要设置为隐藏
        mapTag.style.display = display; 
    } 
};

/*
 *处理鼠标mouse时，鼠标移动到点图层上的效果
 */
var _doPickedJob = function(instance){
    //创建定时器，每1S钟，处理标注的显示
    if(instance.timer_ShowLabel_ForPickedObject==undefined){
        //创建定时器10ms（模拟hover）,处理被选中的object的label
        window.setInterval(function(){
            _updateLabel(instance);
            },10);
        instance.timer_ShowLabel_ForPickedObject = true;
    }

    //处理鼠标位置下的实体
    //在非选择和绘制状态下,非旋转，进行pick
    if(instance._mousetype2 != 'RIGHT_DOWN+MOUSE_MOVE'
        &&instance._mousetype2 != 'LEFT_DOWN+MOUSE_MOVE'){
        if(instance.pickedEntities==undefined){
            instance.pickedEntities = [];//记录被选中的一个实体，可能以后会扩展为多个实体
        }
        //增加限制
        if(instance._mousex&&instance._mousey){
            var pickobject = instance.pick(instance._mousex,instance._mousey,0);
        }
        
        if(pickobject){
            if(pickobject==instance.pickedEntities[0]) 
                return;
            //若在绘制进行时，则不改变光标
            if(instance.optState.indexOf('choose')>=0 || instance.optState.indexOf('draw')>=0){
                //绘折线时,鼠标移动到删除线的图标上时，鼠标光标改变
                if(pickobject.id && pickobject.id._id=='globeDeleteStyle'){
                    //修改光标为pointer
                    instance.changeCursor('point');
                    instance._onDeleteStyleElement = true;
                }
                if(instance.optVertices.length>0){
                    return;
                }
            }
            if(!(instance.optState.indexOf('delete')>=0)){
                //修改光标为pointer
                instance.changeCursor('point');
            }
            
            //修改被选中的object图标
            changeObjectStyle(instance,pickobject,1);//true 修改
        }
        else{

            instance._onDeleteStyleElement = false;

            //复原光标
            instance.changeCursor(instance.optState);
            //被选中的object图标改为不被选中
            changeObjectStyle(instance,pickobject,0);//false 恢复默认图标
        }                   
    } 
}

/*
 *处理被选中图标的文字标注
 */
var _updateLabel = function(instance){
    if(!instance || !instance.pickedEntities || !instance.useMousePickEntities) return;
    //如果实体被选中的时间超过0.2S，则显示label
    var curtime = new Date().getTime(); 
    for(var i=0;i<instance.pickedEntities.length;i++){
        var entity = instance.pickedEntities[i];
        if(entity.picked_startTime){
            if(curtime-entity.picked_startTime>200){
                if(entity.otherProperty){
                    var datasource = instance.getDataSourceByName(entity.layerName);
                    var displayField = datasource.displayField || null; //获取默认显示字段

                    //从属性中获取显示值
                    var label = entity.otherProperty[displayField] || entity.otherProperty.Name||entity.otherProperty.name;
                    var block = entity.otherProperty.display ? entity.otherProperty.display : "block";
                    //entity.otherProperty.name有可能传入的是dom节点，鼠标移动到点的时候，由entity.otherProperty.display控制是否显示，默认显示
                    if(label && !instance.getEntityById('choose-circle',instance.optID)){
                        setPickeObjectLabel(instance,label,block);
                    }
                }
            }         
        }
    }
    
    if(instance.pickedEntities.length == 0 && !(instance.getEntityById(instance.optState, instance.optID)))
        //增加圈选的时候调用setPickeObjectLabel显示半径的大小,没有这个圈的时候label要关掉
        setPickeObjectLabel(instance,'','none');
};

/*
 * 设置不移动鼠标pick entities
 */
vtron.comp.std.map.Cesium.prototype.setUseMousePickEntities = function(enable=true){
    this.useMousePickEntities = enable;
};

/*
 * 添加apng，test
 * return:material
 * 注：构建一个map <url,canvasobject>
 */
var addApng = function(instance,url,canvas) {
    if(!this.APNG)
        this.APNG = window["apng-js"];

    var APNGModule = this.APNG;
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,true);
    xmlhttp.responseType = "arraybuffer";
    xmlhttp.onload = function(){      
        if (this.status == 200) {
            var apng = APNGModule.default(this.response);

            if (apng instanceof Error) {
              return;
            }
            apng.createImages().then(function () {
                canvas.width = apng.width;
                canvas.height = apng.height;

                apng.getPlayer(canvas.getContext('2d')).then(function (p) {
                    player = p;
                    player.playbackRate = 1.0;
                    var em = player.emit;
                    player.emit = function (event) {
                        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            args[_key - 1] = arguments[_key];
                        }
                        em.call.apply(em, [player, event].concat(args));
                    };
                    player.play();
                });
            });
        }
    }
    xmlhttp.send();
};

var testpromise = function(instance,url,canvas) {
    var promise = new Promise(function(resolve,reject){
        if(!instance.APNG)
        instance.APNG = window["apng-js"];

        var APNGModule = instance.APNG;
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",url,true);
        xmlhttp.responseType = "arraybuffer";
        xmlhttp.onload = function(){      
            if (this.status == 200) {
                var apng = APNGModule.default(this.response);

                if (apng instanceof Error) {
                   reject('error');
                   return;
                }
                apng.createImages().then(function () {
                    canvas.width = apng.width;
                    canvas.height = apng.height;

                    apng.getPlayer(canvas.getContext('2d')).then(function (p) {
                        player = p;
                        player.playbackRate = 1.0;
                        var em = player.emit;
                        player.emit = function (event) {
                            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                args[_key - 1] = arguments[_key];
                            }
                            em.call.apply(em, [player, event].concat(args));
                        };
                        player.play();
                    });

                    resolve(canvas)
                });
            }
        }
        xmlhttp.send();
    });
    return promise;
};

/*
 * 在地图上的某个位置添加一个APNG动画
 * dataInfor[{
 *     
 *         lon:
 *         lat:
 *         url:
 *         imageType:'apng'
 *         width:  //米
 *         height: //米
 *      }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.addEffectElement = function(layerName,dataInfo){
    if(!this._viewer) return;
    if(!layerName) layerName = 'tempLayer';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        //supportSearch && this.searchLayerArray.push(layerName);
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }

    if(!dataInfo)  return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var instance = this;
    dataInfo.forEach((data) => {
        //计算width,height大概对应的经纬度,LJYI
        //方位角正东90
        var maxLon = _getLonAndLat(data.lon, data.lat, 90, data.width/2).lon;
        var maxLat = _getLonAndLat(data.lon, data.lat, 0, data.height/2).lat;
        var minLon = data.lon - (maxLon - data.lon);
        var minLat = data.lat - (maxLat - data.lat);

        var canvasobj = this.mapApngMaterial.get(data.imageUrl);
        if(!canvasobj){
            canvasobj = document.createElement('canvas');
            //this.mapApngMaterial.set(data.imageUrl,canvasobj);

            //test
            var instance = this;
            testpromise(instance,data.imageUrl,canvasobj).then(function(canvas){
                instance.mapApngMaterial.set(data.imageUrl,canvasobj);
                var apngpolygon = datasource.entities.add({
                    id:data.id,               
                    polygon : {
                        hierarchy : {
                             positions : Cesium.Cartesian3.fromDegreesArray([minLon,maxLat,
                                                                maxLon,maxLat,
                                                                maxLon,minLat,
                                                                minLon,minLat])
                        },
                        material:new Cesium.ImageMaterialProperty({
                            image:canvas, 
                            transparent:true
                        }),
                    },
                });
            },function(err){
                console.log(err);
            });
        }
        else{
            var apngpolygon = datasource.entities.add({
                    id:data.id,               
                    polygon : {
                        hierarchy : {
                             positions : Cesium.Cartesian3.fromDegreesArray([minLon,maxLat,
                                                                maxLon,maxLat,
                                                                maxLon,minLat,
                                                                minLon,minLat])
                        },
                        material:new Cesium.ImageMaterialProperty({
                            image:canvasobj, 
                            transparent:true
                        }),
                    },
               });
        } 
      
    })    
};
/**
 * 根据起点和距离和方位角(终点相对于起点的角度)计算终点的经纬度
 * @param {*} lng 经度 113.3960698
 * @param {*} lat 纬度 22.941386
 * @param {*} brng 方位角 45   ---- 正北方：000°或360°  正东方：090° 正南方：180°  正西方：270°
 * @param {*} dist 距离 9000(单位米)
 * 
*/
var _getLonAndLat = function(lng, lat, brng, dist){
    var a=6378137; 
    var b=6356752.3142; 
    var f=1/298.257223563;

    var lon1 = lng*1;
    var lat1 = lat*1;
    var s = dist;
    var alpha1 = Cesium.Math.toRadians(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);

    var tanU1 = (1-f) * Math.tan(Cesium.Math.toRadians(lat1));
    var cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1;
    var sigma1 = Math.atan2(tanU1, cosAlpha1);
    var sinAlpha = cosU1 * sinAlpha1;
    var cosSqAlpha = 1 - sinAlpha*sinAlpha;
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));

    var sigma = s / (b*A), sigmaP = 2*Math.PI;
    while (Math.abs(sigma-sigmaP) > 1e-12) {
        var cos2SigmaM = Math.cos(2*sigma1 + sigma);
        var sinSigma = Math.sin(sigma);
        var cosSigma = Math.cos(sigma);
        var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
            B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b*A) + deltaSigma;
    }

    var tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
    var lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1,
        (1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
    var lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
    var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
    var L = lambda - (1-C) * f * sinAlpha *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));

    var revAz = Math.atan2(sinAlpha, -tmp);  // final bearing
    
    var lngLatObj = {lon:lon1+Cesium.Math.toDegrees(L),lat:Cesium.Math.toDegrees(lat2)}
    return lngLatObj;
}

/*
 * 版本1：在地图上的某个位置添加一个序列帧动画：注意序列帧是primitiveCollection！！！后续需要完善图层和要素相关的方法
 * dataInfor[{
 *     
 *         lon:
 *         lat:
 *         url:
 *         imageType:'frames' 
 *         width:  //米
 *         height: //米
 *         colNum：
 *         rowNul:
 *         color:
 *      }
 * ]
 *
 *  版本2：8月26扩展 billboard支持 序列帧，在cesium源码中修改billboardcollection及着色器，效果更优。但是一个dataSource一个序列帧文件
 *  dataInfor{
 *       data: [{
 *         x:
 *         y:
 *         imageUrl:
 *         imageType:'frames' 
 *         width:  //像素
 *         height: //像素
 *         colNum：
 *         rowNul:
 *         color:
 *      }],
 *     ground：false
 * 
 */
vtron.comp.std.map.Cesium.prototype._primitiveFrames = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }

    var instance = this;
    dataInfo.forEach((data) => {
        //计算width,height大概对应的经纬度
        //经纬度转wm
        var wm = this.wgs84ToMercator({x:data.x,y:data.y});
        //计算envelope
        var minx = wm.x-data.width/2.0;
        var maxx = wm.x+data.width/2.0;
        var miny = wm.y-data.height/2.0;
        var maxy = wm.y+data.height/2.0;
        var envelope = this.mercatorToWgs84BB({north:maxy,east:maxx,south:miny,west:minx});

        var minLon = envelope.west;
        var maxLon = envelope.east;
        var minLat = envelope.south;
        var maxLat = envelope.north;

        var framesobj = this._mapFramesMaterial.get(data.imageUrl);
        var frameMat;
        if(!framesobj){
            var rowNum = data.rowNum;
            var colNum = data.colNum;
            // 片元着色器代码
            // 注意纹理坐标左下角是（0，0）
            var mat_glsl =
            'czm_material czm_getMaterial(czm_materialInput materialInput) \n' +
            '{ \n' +
                'vec2 animationUV; \n' +
                'float xStepSize = 1.0/colNum; \n' +
                'float yStepSize = 1.0/rowNum; \n' +
                'animationUV.x = xCurrentStep * xStepSize + materialInput.st.x/colNum; \n' +
                'animationUV.y = yCurrentStep * yStepSize + materialInput.st.y/rowNum; \n' +
                'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
                'vec4 textureValue = texture2D(image, animationUV)*color;\n' +
                'm.diffuse  = color.xyz;\n' +
                //'m.emission = color.xyz;\n' +
                'm.alpha = textureValue.a; \n' +
                'return m; \n' +
            '} \n'
     
            // 创建使用自定义着色器的材质
            var framesMat = new Cesium.Material({
                fabric: {
                    type: 'framesImage',
                    uniforms: {
                        image: data.imageUrl,
                        color: Cesium.Color.fromCssColorString(data.color),
                        colNum: colNum,
                        rowNum: rowNum,
                        xCurrentStep: 0.0,
                        yCurrentStep: 0.0
                    },
                    source: mat_glsl
                }
            });

            var tmpObj = {'mat':framesMat,'colNum':colNum,'rowNum':rowNum,'xCurrentStep':0,'yCurrentStep':0};
            this._mapFramesMaterial.set(data.imageUrl,tmpObj);
        }
        frameMat = this._mapFramesMaterial.get(data.imageUrl).mat;
        primitiveCollection.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.RectangleGeometry({
                    rectangle: Cesium.Rectangle.fromDegrees(minLon, minLat, maxLon,maxLat),
                    vertexFormat: Cesium.VertexFormat.ALL
                })
            }),
            appearance: new Cesium.MaterialAppearance({
                material: frameMat
            })
        }));
      
    })   
}
vtron.comp.std.map.Cesium.prototype._billboardFrames = function(layerName,dataInfo){
    this.addPointElement(layerName,dataInfo);
}
vtron.comp.std.map.Cesium.prototype.addFramesEffectElement = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo.data instanceof Array)) dataInfo = [dataInfo.data];
    if(dataInfo.ground||dataInfo.ground == undefined){
        //贴地
        this._primitiveFrames(layerName,dataInfo.data);
    }else{
        //billboard
        this._billboardFrames(layerName,dataInfo.data);
    }
};

/*
 * 添加一条折线：该折线带透明度的渐变。primitiveCollection！！！后续需要完善图层和要素相关的方法
 * dataInfor{
 *     
 *         vertexs:[lon,lat,lon,lat,,,lon,lat] //线所有顶点的经纬度
 *         vertexsSeg: [0.0,0.2,0.21,0.6,,,1.0] //整条线是如何划分的，按长度占整条线的百分比
 *         colorSeg:[0,1,2,0,,,2] //0:红色 1：绿色 2：黄色
 *         width: 20 //像素单位！！！
 *      }
 * 注意：如果添加多条，如果重用和管理材质，未考虑！
 */
vtron.comp.std.map.Cesium.prototype.addGraduatedEffectLine = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];//支持一条线，后续再考虑批量
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }

    var instance = this;
    //着色器：先绘制第一根线的前半部，再将后半部和下一根线的前半部作为一个线对象绘制。。。。
    var mat_glsl = '\n\
    vec2 resolution = vec2(1.0,1.0);\n\
    float gAlpha = 0.6;\n\
    //获取每段路的颜色\n\
    vec3 getColorById(int i){\n\
        vec3  colr = vec3(1.0,0.0,0.0);\n\
        vec3  colg = vec3(0.0,1.0,0.0);\n\
        vec3  coly = vec3(1.0,1.0,0.0);\n\
        vec3 color = vec3(0.0,0.0,0.0);\n\
        if(i==0){\n\
            color  = colr;\n\
        }else if(i==1){\n\
            color = colg;\n\
        }else if(i==2){\n\
            color  = coly;\n\
        }else if(i==3){\n\
            color  = vec3(0.5,0.5,0.5);\n\
        }\n\
        return color;\n\
    }\n\
    czm_material czm_getMaterial(czm_materialInput materialInput) \n\
    { \n\
        czm_material m = czm_getDefaultMaterial(materialInput);\n\
        vec2 p = materialInput.st.xy;\n\
        gAlpha = float(vtAlpha);\n\
        //判断p.x属于哪一段道路\n\
        float ts = 0.0;\n\
        float te = 1.0;\n\
        for(int i=0;i<vlastSeg+1;i++){//<length-2\n\
            float lineSegS = float(lineVertexs[i]);\n\
            float lineSegE = float(lineVertexs[i+1]);\n\
            float lineSegC = (lineSegS+lineSegE)/2.0;\n\
            float nextLineSegS = float(lineVertexs[i+1]);\n\
            float nextLineSegE = float(lineVertexs[i+2]);\n\
            float nextLineSegC = (nextLineSegS+nextLineSegE)/2.0;\n\
            int lineColorId = int(vtlineColor[i]);\n\
            vec3 vlineColor = getColorById(lineColorId);\n\
            int nextLineColorId =  int(vtlineColor[i+1]);\n\
            vec3 vnextLineColor = getColorById(nextLineColorId);\n\
            if(i==0&&p.x>lineSegS && p.x<lineSegC){\n\
                //对于第一根线，绘制前半部份 OK\n\
                m.diffuse = vlineColor;\n\
                float offsetAlpha = (p.x-lineSegS)/(lineSegC-lineSegS);//把p.x映射到-1，1区间,-1是线段的起点，1是线段的终点\n\
                m.alpha = smoothstep(0.0,1.0,abs(offsetAlpha))*gAlpha;\n\
                return m;\n\
            }\n\
            else if(i<=vlastSeg&&p.x>=lineSegC && p.x<nextLineSegC){//<=lenght-3\n\
                //中间端的颜色渐变\n\
                float offsetAlpha = (p.x-lineSegC)/(nextLineSegC-lineSegC);//把p.x映射到-1，1区间,-1是线段的起点，1是线段的终点\n\
                float leftToRight = smoothstep(0.0,1.0,abs(offsetAlpha));\n\
                float rightToLeft = 1.0 - smoothstep(0.0,1.0,abs(offsetAlpha));\n\
                float a1 = rightToLeft, a2 = leftToRight, a3=1.0;\n\
                float r1, g1, b1, r2, g2, b2;\n\
                float r3, g3, b3;\n\
                r1 = vlineColor.r;//上层\n\
                g1 = vlineColor.g;\n\
                b1 = vlineColor.b;\n\
                r2 = vnextLineColor.r;\n\
                g2 = vnextLineColor.g;\n\
                b2 = vnextLineColor.b;\n\
                r3 = r1 * a1 + r2 * a2 * (1.0-a1);\n\
                g3 = g1 * a1 + g2 * a2 * (1.0-a1);\n\
                b3 = b1 * a1 + b2 * a2 * (1.0-a1);\n\
                a3 = 1.0 - (1.0 - a1) * ( 1.0 - a2 );\n\
                m.diffuse = vec3(r3,g3,b3);\n\
                m.alpha = a3*gAlpha;\n\
                return m;\n\
            }\n\
            else if(i==vlastSeg&&p.x>=nextLineSegC){//==length-3\n\
                //对于最后一根线，绘制后半部份 OK\n\
                m.diffuse = vnextLineColor;//vec3(0.5,0.5,0.5);//vnextLineColor;\n\
                float offsetAlpha = (p.x-nextLineSegC)/(nextLineSegE - nextLineSegC);\n\
                m.alpha = (1.0-smoothstep(0.0,1.0,abs(offsetAlpha)))*gAlpha;\n\
                return m;\n\
            }\n\
        }\n\
    }'
    //由于着色器多处只能使用常量数字，因此需要改写字符串
    var lastSeg = dataInfo.vertexsSeg.length - 3;
    mat_glsl = mat_glsl.replace(/vlastSeg/g,lastSeg);
    var customMaterial = new Cesium.Material({
        fabric : {
            type : 'customMaterials_gradient_line',
            uniforms : {
                color : new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                vtlineColor:dataInfo.colorSeg,//各段的颜色
                lineVertexs:dataInfo.vertexsSeg,//各段的占比
                vtAlpha:0.8
            },
                source : mat_glsl
            }
    });

    var gradientLine = new Cesium.Primitive({
        geometryInstances : new Cesium.GeometryInstance({
            geometry : new Cesium.PolylineGeometry({
                positions : Cesium.Cartesian3.fromDegreesArray(dataInfo.vertexs),//所有的顶点
                width : dataInfo.width||30.0,
                vertexFormat : Cesium.VertexFormat.ALL
            })
        }),
        appearance : new Cesium.PolylineMaterialAppearance({
            material : customMaterial 
        }),
        //index:2,
        //clampToGround : true,
    });
    // Add instances to primitives
    this._viewer.scene.primitives.add(gradientLine);
};

/*
 * 添加一条折线缓冲区渐变效果：该折线带透明度的渐变。primitiveCollection！！！后续需要完善图层和要素相关的方法
 * dataInfor{
 * 
 *         vertexsLine: [120.1,30.2,120.2,30.22] //目前只支持2个点构成的线，后续再扩展到复杂线
 *         //colorSeg:[0,1,2,0,,,2] //0:红色 1：绿色 2：黄色
 *         width: 500 //米单位！！！
 *      }
 * 注意：如果添加多条，如果重用和管理材质，未考虑！
 */
vtron.comp.std.map.Cesium.prototype.addGraduatedEffectLineBuffer = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];//支持一条线，后续再考虑批量
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }
    //第一步：计算线的缓冲区
    var options = {units: 'meters'};
    var firLon = dataInfo.vertexsLine[0];
    var firLat = dataInfo.vertexsLine[1];
    var secLon = dataInfo.vertexsLine[2];
    var secLat = dataInfo.vertexsLine[3];
    var turfLine=[[firLon,firLat],[secLon,secLat]];   
    var lineStr = turf.lineString(turfLine);
    var lineBuffer = turf.buffer(lineStr, dataInfo.width||300, options);
    //第二步：缓冲区最外层坐标
    var bufferCoords = turf.getCoords(lineBuffer);
    //转[lon,lat,lon,lat]形式
    var bufferArr = [];
    bufferCoords[0].forEach((tempArr)=>{
        bufferArr.push(tempArr[0], tempArr[1]);
    });

    //第三步： 计算圆弧上的两个点，和缓冲区的经纬度范围，传给着色器
    //var k = (buffGeo[1][1] - buffGeo[0][1])/(buffGeo[1][0] - buffGeo[0][0]);//线段斜率
    var p=[];
    var lonminid = 0;
    var lonmaxid = 0;
    var lonmin = 180.0;
    var lonmax = 0.0;
    var latmin = 90.0;
    var latmax = 0.0;
    for(var t=0;t<bufferCoords[0].length;t++){
        var point = bufferCoords[0][t];
        if(point[0]<lonmin){
            lonmin = point[0];
            lonminid = t;
            p.push(point);
        }

        if(point[0]>lonmax){
            lonmax = point[0];
            lonmaxid = t;
        }
        if(point[1]<latmin){
            latmin = point[1];
        }

        if(point[1]>latmax){
            latmax = point[1];
        }
    }
    var idx = p[p.length-1][0];
    var idy = p[p.length-1][1];
    var instance = this;
    //着色器
    var mat_glsl = '\n\
    vec2 PointToSegDist(float x, float y, float x1, float y1, float x2, float y2)\n\
    {\n\
        float cross = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);\n\
        if (cross <= 0.0) return vec2(-1,sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1)));\n\
        \n\
        float d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);\n\
        if (cross >= d2) return vec2(1.0,sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2)));\n\
        \n\
        float r = cross / d2;\n\
        float px = x1 + (x2 - x1) * r;\n\
        float py = y1 + (y2 - y1) * r;\n\
        return vec2(0.0,sqrt((x - px) * (x - px) + (py - y) * (py - y)));\n\
    }\n\
    \n\
    czm_material czm_getMaterial(czm_materialInput materialInput)\n\
    {\n\
        //缓冲区的范围,经纬度\n\
        float lonmin = float(bufferMinLon);//缓冲区的范围,经纬度\n\
        float lonmax = float(bufferMaxLon);\n\
        float latmin = float(bufferMinLat);\n\
        float latmax = float(bufferMaxLat);\n\
        float arcx = float(arcNx);//圆弧上的某个点,经纬度\n\
        float arcy = float(arcNy);\n\
        float buffGeo[4];//记录线的定点，经纬度\n\
        buffGeo[0] = (float(lineVertexs[0]) - lonmin)/(lonmax-lonmin);\n\
        buffGeo[1] = (float(lineVertexs[1])- latmin)/(latmax-latmin);\n\
        buffGeo[2] = (float(lineVertexs[2]) - lonmin)/(lonmax-lonmin);\n\
        buffGeo[3] = (float(lineVertexs[3]) - latmin)/(latmax-latmin);\n\
        //圆弧点的坐标转换：经纬度归一化到缓冲区的坐标系\n\
        arcx= (arcx - lonmin)/(lonmax-lonmin);\n\
        arcy = (arcy- latmin)/(latmax-latmin);\n\
        //圆弧到线起点距离1.0，即缓冲区大小。方便后面计算每个xy的距离和该值做对比\n\
        float dis0 = distance(vec2(arcx,arcy),vec2(buffGeo[0],buffGeo[1]));\n\
        \n\
        \n\
        czm_material material = czm_getDefaultMaterial(materialInput);\n\
        float b = smoothstep(0.10, 0.12, length(fract(vec2(50.0,50.0) * materialInput.st) - 0.5));\n\
        vec4 color = mix(ftColor, bgColor, b);\n\
        material.diffuse = color.rgb;\n\
        vec2 p = materialInput.st.xy;\n\
        for(int i=0;i<2;i+=2){\n\
            \n\
            //每段线的起点和终点\n\
            float lineSegS_x = (float(lineVertexs[i])- lonmin)/(lonmax-lonmin);\n\
            float lineSegS_y = (float(lineVertexs[i+1])- latmin)/(latmax-latmin);\n\
            float lineSegE_x = (float(lineVertexs[i+2])- lonmin)/(lonmax-lonmin);\n\
            float lineSegE_y = (float(lineVertexs[i+3]) - latmin)/(latmax-latmin);\n\
            //计算像素点到直线距离\n\
            vec2 d = PointToSegDist(p.x,p.y,lineSegS_x,lineSegS_y,lineSegE_x,lineSegE_y);\n\
            float posType = d.x;\n\
            float dis1 = d.y;\n\
            \n\
            material.alpha = 1.0-dis1/dis0;\n\
            // if(posType<-0.5&&i==0){\n\
            //     material.alpha = 1.0-dis1/dis0;\n\
            //     return material;\n\
            // }\n\
            // else if(posType==0.0){\n\
            //     material.alpha = (1.0 - smoothstep(0.0,1.0,dis1/dis0));\n\
            //     //material.diffuse = vec3(0.5,0.5,0.5);\n\
            //     return material;\n\
            // }\n\
            // else if(posType>0.5){\n\
            //      material.alpha = (1.0 - smoothstep(0.0,1.0,dis1/dis0));\n\
            //      //material.diffuse = vec3(0.2,1.5,0.5);\n\
            //     // return material;\n\
            //     // if(dis1>dis0){\n\
            //     //     material.diffuse = vec3(1.0,0.0,0.0);\n\
            //     //     continue;\n\
            //     // }\n\
            // }\n\
            return material;\n\
            \n\
        }\n\
      \n\
        return material;\n\
    }'
    
    //计算道路上个原始点坐标：由于着色器中不能实时修改数组长度，所以预定义线最多不能超过60个顶点
    //注意目前线只支持2个顶点，后续再扩展到60甚至更多
    var arrayRoad = new Array(60);
    // for(var i=0;i<arrayRoad.length;i++){
    //     arrayRoad[i] = -2.0;
    // }
    // for(var i=0;i<buffGeo.length;i++){
    //     arrayRoad[i*2] = buffGeo[i][0];
    //     arrayRoad[i*2+1] = buffGeo[i][1];
    // }
    arrayRoad[0] = firLon;
    arrayRoad[1] = firLat;
    arrayRoad[2] = secLon;
    arrayRoad[3] = secLat;
    var customMaterial = new Cesium.Material({
        fabric : {
            type : 'customMaterials_gradient_lineBuffer',
            uniforms: {
                iTimer: 0.0,
                ftColor:new Cesium.Color(3.0/255, 228.0/255, 240.0/255, 0.1),
                bgColor:new Cesium.Color(0.0, 0.0, 1.0, 0.05),
                lineVertexs:arrayRoad,
                bufferMinLon:lonmin,
                bufferMinLat:latmin,
                bufferMaxLon:lonmax,
                bufferMaxLat:latmax,
                arcNx:idx,
                arcNy:idy
                //vRadias:300 //单位是米
            },
            source : mat_glsl
        }
    });
    var gradientLineBuffer  = this._viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances : new Cesium.GeometryInstance({
            geometry : new Cesium.PolygonGeometry({
                polygonHierarchy : new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(bufferArr)
                ),
            vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        }),
        appearance : new Cesium.EllipsoidSurfaceAppearance({
            aboveGround : true,
            material: customMaterial
        }),
        show : true
     }));
     gradientLineBuffer.layerName = layerName;
};

/*
var dataInfor = {
        id:'circle1';
        center:[113.12, 23.02],
        radius:radius0,
        outlineColor:'rgba(0,255,0,0.3)',
        gradientDistance:radius0/10.0,
        speed:1.0,
        clockwise:true
    }
*/
vtron.comp.std.map.Cesium.prototype.addcircleEffect_0 = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];//支持一个圆，后续再考虑批量
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }

    // 片元着色器代码
    // 注意纹理坐标左下角是（0，0）
    var mat_glsl =
        //You could say it's speed
        //'const float LOOP_TIME = 1.0; \n' +
        'float LOOP_TIME = float(speed); \n' +
        //No i couldn't think of a more unique name
        'float LOOPS = 2.0; \n' +
        //
        //Circle constants
        'const vec2 pK = vec2(0.5, 0.5); \n' + 
        'float r1 = float(gradientDistance);//0.42; \n' +
        'float r2 = 0.50; \n' +
        //
        //PI constants
        'const float PI = 3.14159265359; \n' +
        'const float PI2 = PI * 2.0; \n' + 
        'const float PI_HALF = PI / 2.0; \n' +
        //
        //Based of http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
        'const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0); \n' +
        //'const vec4 K = vec4(1.0, 0.0, 0.0, 3.0); \n' +
        'vec3 hue2rgb(float hue){ \n' +
            'vec3 p = abs(fract(hue + K.xyz) * 6.0 - K.www); \n' +
            'return clamp(p - K.xxx, 0.0, 1.0); \n' +
        '} \n' +
        //
        'float getRingMult(vec2 va){ \n' +
        'return smoothstep(r1, r2, length(va)); \n' +
        '} \n' +
        'vec2 genUV(in vec2 fragCoord){ \n' +
        'vec2 uv = fragCoord; \n' +
        //'uv.x -= (iResolution.x - iResolution.y)/2.0; \n'+
        //'uv /= iResolution.y; \n' +
        'return uv; \n' +
        '} \n' +
        'vec4 getBackground(){ \n' +
            'return vec4(0.0); \n' +
        '} \n' +
        //
        'vec2 getStartVec(){ \n' +
        'float angle = (iTimer/LOOP_TIME) * PI2; \n' +
        'return vec2(cos(angle), sin(angle)); \n' +
        '} \n' +

        'vec4 genColor(vec2 vKA){ \n' +
            'if(LOOP_TIME==0.0){\n'+
               'return circleOutLineColor;\n'+
            '}\n'+
            'float angle = dot(getStartVec(), normalize(vKA)); \n' +
            'angle = acos(angle); \n' +
            // 'return vec4( angle / PI * LOOPS, 0.0, 0.0, angle / PI * LOOPS); \n' +
            //'return vec4( angle / PI * LOOPS, 0.0, 0.0, angle / PI * LOOPS); \n' +
             'return vec4( circleOutLineColor.r*angle / PI * LOOPS, circleOutLineColor.g*angle / PI * LOOPS, circleOutLineColor.b*angle / PI * LOOPS, angle / PI * LOOPS); \n' +
            //'return vec4( 1.0, 0.0, 0.0, 1.0); \n' +
            //eturn hue2rgb(angle / PI * LOOPS);
        '}\n' +
        // 
        'czm_material czm_getMaterial(czm_materialInput materialInput) \n' +
        '{ \n' +
            'vec2 fragCoord = materialInput.st; \n' +
            //'vec2 pA = genUV(fragCoord); \n'+
            'vec2 vKA = fragCoord - pK; \n'+
            'float dist = getRingMult(vKA); \n' +
            'vec4 final = getBackground(); \n' +
            'if(dist!=0.0 && dist!=1.0){ \n'+
                'final = mix(genColor(vKA), final, dist); \n' +
            '} \n'+
            'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
            'm.diffuse  = final.xyz;\n' +
            'm.alpha = final.w /2.0; \n' +
            'return m; \n' +
        '} \n'

    // 创建使用自定义着色器的材质，后续需要统一管理材质，避免每次都创建！！！
    var myMat = new Cesium.Material({
        fabric: {
            type: 'customMaterial_shinyCircle',
            uniforms: {
                iTimer: 0.0,
                circleOutLineColor:Cesium.Color.fromCssColorString(dataInfo.outlineColor),
                gradientDistance:0.5-dataInfo.gradientDistance/dataInfo.radius,
                speed:dataInfo.speed
            },
            source: mat_glsl
        }
    });
    this._mapDyCircleMaterial.set('dyCircleMaterial_'+dataInfo.id,{mat:myMat});

    //Circle，使用自定义材质填充
    var circle =  primitiveCollection.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CircleGeometry({
                center : Cesium.Cartesian3.fromDegrees(dataInfo.center[0],dataInfo.center[1]),
                radius : dataInfo.radius,
                vertexFormat: Cesium.VertexFormat.ALL
            })
        }),
        appearance: new Cesium.MaterialAppearance({
            material: myMat
        })
    }));
    circle.id = dataInfo.id;
    circle.layerName = layerName;
    return circle;
}

/*
var dataInfor = {
        id:'circle1';
        center:[113.12, 23.02],
        radius:radius0,
        outlineColor:'rgba(0,255,0,0.3)',
        gradientDistance:radius0/10.0,
        speed:1.0,
        clockwise:true
    }
*/
vtron.comp.std.map.Cesium.prototype.modiflyCircleMaterial = function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];//支持一个圆，后续再考虑批量
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        console.log('modiflyCircleMaterial:no layer');
        return;
    }
 
    var materialObj = this._mapDyCircleMaterial.get('dyCircleMaterial_'+dataInfo.id);
    if(materialObj){
        materialObj.mat.uniforms.speed = dataInfo.speed;
    }
    return;
}

/*
   添加面蒙版：
   layerName:图层名
   dataInfo = {
                id:'circle-0',
                geo:foshan_shunde,//[lon,lat,,,lon,lat]
                maskColor:Cesium.Color.fromCssColorString('rgba(0,0,0,0.6)')
    }
*/
vtron.comp.std.map.Cesium.prototype.addPolyGonMaskElement= function(layerName,dataInfo){
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];//支持一个面，后续再考虑批量
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }
    var color = Cesium.Color.fromCssColorString(dataInfo.maskColor || 'rgba(0,0,0,0.8)');
    //添加面带孔
    var maskPolygon = primitiveCollection.add(new Cesium.Primitive({
        geometryInstances : new Cesium.GeometryInstance({
            geometry : new Cesium.PolygonGeometry({
                polygonHierarchy : new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray([0.0, 0.0,170.0, 0.0,170.0, 80.0,0, 80.0]),
                    [new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(dataInfo.geo),
                    )]
                ),
                vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            }),
            id : dataInfo.id,
            attributes : {
                //color : Cesium.ColorGeometryInstanceAttribute.fromColor( new Cesium.Color( 0.0, 0.0, 0.0, 0.8 ) ),
                color : Cesium.ColorGeometryInstanceAttribute.fromColor(color),
                show : new Cesium.ShowGeometryInstanceAttribute(false)//默认隐藏
            }
        }),
        appearance : new Cesium.PerInstanceColorAppearance(),
        allowPicking:false
     }));

    maskPolygon.geoType = 'polygonMask';
    maskPolygon.hasOutline = true;
    maskPolygon.id = dataInfo.id;
    //outline线着色器
    var mat_glsl = 
    'vec2 resolution = vec2(1.0,1.0); \n\
    czm_material czm_getMaterial(czm_materialInput materialInput) \n\
    { \n\
        czm_material m = czm_getDefaultMaterial(materialInput);\n\
        vec2 p = materialInput.st.xy;\n\
        float t = abs(p.y*2.0 - 1.0);\n\
        vec3 destColor = color.xyz;\n\
        vec3  col = vec3(19.0/255.0,218.0/255.0,233.0/255.0);\n\
        m.diffuse  = col;\n\
        m.alpha = 1.0-t;\n\
        return m; \n\
    }'
    var myMat = new Cesium.Material({
        fabric : {
            uniforms : {
                color : new Cesium.Color(0.0, 1.0, 0.0, 1.0),
                time : 0.0
            },
                source : mat_glsl
            }      
    });
    var fontSize = vtron.util.getFontSize(document.body),
        scale = fontSize/16;
        scale = scale < 1 ? 1 : scale;
    var primitiveOutline = new Cesium.Primitive({
        geometryInstances : new Cesium.GeometryInstance({
            geometry : new Cesium.PolylineGeometry({
                positions : Cesium.Cartesian3.fromDegreesArray(dataInfo.geo),
                width : 15.0*scale,
                vertexFormat : Cesium.VertexFormat.ALL,
                arcType:Cesium.ArcType.RHUMB,
                //granularity:0.01,//无效
               // scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1),//无效
            }),
            id: dataInfo.id + ".outline",
            attributes : {
                //color : Cesium.ColorGeometryInstanceAttribute.fromColor( new Cesium.Color( 0.0, 0.0, 0.0, 0.6 ) ),
                show : new Cesium.ShowGeometryInstanceAttribute(false)
            }
        }),
        appearance : new Cesium.PolylineMaterialAppearance({
            material : myMat 
        }),
        //index:2,
        clampToGround : true,
        allowPicking:false
    });
    primitiveOutline.id = dataInfo.id + ".outline";//一个蒙版对象，包含一个id的polygon和一个id_outline的轮廓线，所以删除和隐藏时需要同时删除两个
    maskPolygon.outline = primitiveOutline;
    primitiveCollection.add(primitiveOutline);
    // this._viewer.camera.flyTo({
    //         duration: 0,
    //         destination: new Cesium.Cartesian3.fromDegrees(113.12, 23.02, 50000),
    // });
}

/*
 * path tracking:物体按照预设的路径，运动.
 * layerName: 图层名
 * dataInfo: [
 *      {
 *            id:  'pathtracking-1',
 *            image:"./car.png",// './car.gltf'
 *            scale:0.5,
 *            path:[
 *              {time:,lon:,lat:,alt:}, //位置点的时间，纬度，高度
 *              {time,lon,lat,alt},
 *              {time,lon,lat,alt,event={'eventName'：抛出事件名,'eventData':抛出的数据}}
 *            ], 
 *            playTime: 10   //轨迹回放时，播放的时间 单位s
 *            color:
 *      }
 * ]
 * 逻辑： 1.在某空图层中添加(addPathTrackingElement)一个轨迹--->播放轨迹playPathTracking--->暂停轨迹pausePathTracking
 *        2.当轨迹播放结束以后，重播该轨迹playPathTracking
 *        3.显示隐藏删除操作参考showelement、hideelement、deleteelement
 * 注意：目前只支持一条轨迹的回放！！！
 */
vtron.comp.std.map.Cesium.prototype.addPathTrackingElement = function(layerName,dataInfo=[],pathColor){
    if(!this._viewer) return;
    var datasource = this.getDataSourceByName(layerName);//PathTrackingLayer
    if(!datasource) {
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
        this._pathTrackingLayer_dataSource.push(datasource);
    }

    if(!dataInfo)  return;
    if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var instance = this;
    var pathWidth;
    this.pathLog = [];//置空
    this.lastPathLog = [];
    dataInfo.forEach((data) => {
        if(data.id){
            var bexistEntity = datasource.entities.getById(data.id);
            if(!bexistEntity){//如果存在该entity，则不做处理
                var playTime = data.playTime;
                var s = new Date();
                this.pathTracking_startTime = s;//如果多条轨迹回放，需要统一计算PathTracking_startTime
                var start = Cesium.JulianDate.fromDate(s);
                var stop = Cesium.JulianDate.addSeconds(start, playTime , new Cesium.JulianDate());

                this._viewer.clock.startTime = start.clone();
                this._viewer.clock.stopTime = stop.clone();
                this._viewer.clock.currentTime = start.clone();
                this._viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; //LOOP_STOP
                //this._viewer.clock.multiplier = 1;

                //计算总时长
                var actualDurTime = data.path[data.path.length-1].time - data.path[0].time;
                var positionProperty = new Cesium.SampledPositionProperty();
                var positions = [];
                for (var i = 0; i < data.path.length; i++) {
                    var t = (data.path[i].time - data.path[0].time)/actualDurTime*playTime;
                    var time = Cesium.JulianDate.addSeconds(start,t, new Cesium.JulianDate());
                    var position = Cesium.Cartesian3.fromDegrees(data.path[i].lon, data.path[i].lat, data.path[i].alt);
                    positionProperty.addSample(time, position);
                    positions.push(position);
                    datasource.entities.add({
                        id: data.id+'.tmpPosition.'+i,
                        position : position,
                        point : {
                            pixelSize : 0,
                            color : Cesium.Color.WHITE.withAlpha(0.001),
                        }
                    });
                    //如果遇到要抛出事件的点,记录事件和event字段的值
                    if(data.path[i].event){
                        if(data.path[i].isend!=undefined && data.path[i].isend){
                            this.pathLog.push({'time':time,'event':data.path[i].event,'isend':data.path[i].isend});
                        }else{
                            this.pathLog.push({'time':time,'event':data.path[i].event});
                        }
                    }
                }
                //计算路径宽度
                if($("body").hasClass("theme-pc")){
                    pathWidth = data.width;
                }else{
                    pathWidth = data.width*3;
                }
                pathColor = pathColor || "#f9d901";//走过路径颜色

                //Actually create the entity
                var entity = undefined;
                if(data.image.indexOf("gltf")>0){
                    //路径本身
                    entity = datasource.entities.add({
                        id: data.id,
                        availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                            start : start,
                            stop : stop
                        })]),
                        model:{
                            uri:data.image,
                            minimumPixelSize:64
                        },
                        position : positionProperty,
                        orientation : new Cesium.VelocityOrientationProperty(positionProperty),
                        path : {
                            resolution : 1,
                            trailTime: 0,
                            material : new Cesium.PolylineGlowMaterialProperty({
                               glowPower : 0.1,
                               color : Cesium.Color.fromCssColorString(data.color)||Cesium.Color.YELLOW
                            }),
                            width : pathWidth||10,
                        },
                        /*polyline : {
                            positions : positions,//Cesium.Cartesian3.fromDegreesArrayHeights([118, 32, 25000,119, 32, 25000]),
                            //positions : Cesium.Cartesian3.fromDegreesArrayHeights([118.12, 30.0, 0,118.15, 30.0, 0,118.15,29.95,0]),
                            width : data.width||10,
                            material : Cesium.Color.fromCssColorString(data.color),
                            zIndex: 2,
                        }*/
                    });

                    var entityPath = datasource.entities.add({
                        position : positionProperty,
                        name : 'path',
                        path : {
                            show : true,
                            leadTime : 0,
                            trailTime : 60,
                            width : pathWidth || 10,
                            resolution : 60,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                //glowPower : 0.1,
                                //taperPower : 0.3,
                                color : Cesium.Color.fromCssColorString(pathColor) || Cesium.Color.PALEGOLDENROD,
                            }),
                        }
                    });
                    // 属性回调会影响地图场景性能，有待检查
                    //entity.polyline.positions = new Cesium.CallbackProperty(() => {return entity.dyPositions}, false);
                    
                    //路径的线
                    // var baseline = datasource.entities.add({
                    //     name : "1",
                    //     polyline : {
                    //         positions : Cesium.Cartesian3.fromDegreesArrayHeights([118.12, 30.0, 0,118.15, 30.0, 0,119,30,0]),
                    //         width : data.width||10,
                    //         material : Cesium.Color.RED,
                    //     }
                    // });

                    //当前的轨迹
                    // var curMovementline = datasource.entities.add({
                    //     name:"2",
                    //     polyline : {
                            
                    //         positions : Cesium.Cartesian3.fromDegreesArrayHeights([119.12, 30.0, 1000,118.15, 30.0, 100]),
                    //         //positions : [],
                    //         //width : data.width||10,
                    //         //material : Cesium.Color.BLUE,
                    //     }
                    // });
                    //curMovementline.polyline.positions = new Cesium.CallbackProperty(() => {return entity.dyPositions}, false);
                }
                else{
                    entity = datasource.entities.add({
                        id:data.id,
                        availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                            start : start,
                            stop : stop
                        })]),
                        position : positionProperty,
                        orientation : new Cesium.VelocityOrientationProperty(positionProperty),
                        billboard: {
                           image:data.image,//"/test-map-engine/image/alert.png",
                           scale:this.imageScaleFactor*(data.scale||1.0),
                           verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                           scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1)
                        },
                        //Show the path as a pink line sampled in 1 second increments.
                        //跑完的path
                        //leadTime: 在运动物体后多少秒显示
                        path : {
                            resolution : 1,
                            trailTime: 0,
                            leadTime: 99999,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                glowPower : 0.1,
                                color : Cesium.Color.fromCssColorString("#09e0f9")||Cesium.Color.YELLOW
                            }),
                            width : pathWidth || 10,
                        },
                    });
                    //还没跑完的path
                    //trailTime: 在运动物体运动前多少秒显示
                    var entityPath = datasource.entities.add({
                        id:data.id+'notRun',
                        position : positionProperty,
                        name : 'path',
                        path : {
                            show : true,
                            leadTime : 0,
                            trailTime : 99999,
                            width : pathWidth || 10,
                            resolution : 60,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                glowPower : 0.1,
                                taperPower : 0.3,
                                color : Cesium.Color.fromCssColorString(pathColor) || Cesium.Color.PALEGOLDENROD,
                            }),
                        }
                    });
                }
                entity.pathTracking_startTime = s;//每条轨迹都有一个开始播放的时间
                entity.dyPositions = [];//记录该路径中图片运动的实时点序列
                entity.animate = true;
                entity.layerName = layerName;
                entity.imageSrc = data.image;
            }
            else{
                // LLL
                if(this._debugTyle){
                    var warn = this._logEnum.infor + ":";
                    var info = {};
                    info.level = 2;//普通log
                    info.function = 'addPathTrackingElement:';
                    info.para =[layerName,dataInfo.length];
                    info.info = '目前版本只支持一个历史轨迹的显示。';
                    this._mapLog(info); 
                }
            }
        }
    });
    for(var i=0;i<this.pathLog.length;i++){
        this.lastPathLog.push(this.pathLog[i]);
    }
    //this._viewer.trackedEntity = undefined;
    datasource.pathTrackingLayer = true;//标记该图层是轨迹回放图层
    this._viewer.clockViewModel.shouldAnimate = false;
};

/*
 * 播放轨迹（历史轨迹和实时轨迹路径跟踪）:只实现单个历史轨迹，实时轨迹则可以多个
 * layerName:图层名
 * dataInfo:[    //如果要实现多个历史轨迹的控制时，需要设置
 * id:,id:]
 * color:实时轨迹的颜色
 * width：实时轨迹的宽度
 * usePathTrackLine, 是否开启实时轨迹，默认开启
 * useJoinLine: 是否开启连接线，默认不开启
 * joinLineStyle：{center:[lon,lat],width:,imagerUrl:,color:,from:'left',//起点是坐标,'right'，起点是右边,duration:,//动画持续时间，默认2000毫秒}
 */
vtron.comp.std.map.Cesium.prototype.playPathTracking = function(layerName,dataInfo=[],color='rgba(255,0,0,1)',width=5,usePathTrackLine = true, useJoinLine = false, joinLineStyle){
    if(this._viewer){
        var datasource = this.getDataSourceByName(layerName);
        if(!datasource) return;
        if(datasource.pathTrackingLayer==undefined && datasource.animate==undefined){
            if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
            dataInfo.forEach((data) => {
                var entity = datasource.entities.getById(data);
                var lineId = data +'-realTime_line';
                var entityLine = datasource.entities.getById(lineId);
                var joinLineEntity = datasource.entities.getById(data+'-join_line');
                if(entity&&entityLine==undefined){
                    //开牵引线
                    if(useJoinLine){
                        if(!Cesium.Material.PolylineTrailLinkType){
                            /*
                                流纹纹理线
                                color 颜色
                                duration 持续时间 毫秒
                            */
                            function PolylineTrailLinkMaterialProperty(color, duration) {
                                this._definitionChanged = new Cesium.Event();
                                this._color = undefined;
                                this._colorSubscription = undefined;
                                this.color = color;
                                this.duration = duration;
                                this._time = (new Date()).getTime();
                            }
                            Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
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
                                color: Cesium.createPropertyDescriptor('color')
                            });
                            PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
                                return 'PolylineTrailLink';
                            }
                            PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
                                if (!Cesium.defined(result)) {
                                    result = {};
                                }
                                result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
                                result.image = Cesium.Material.PolylineTrailLinkImage;
                                result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
                                return result;
                            }
                            PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
                                return this === other ||
                                    (other instanceof PolylineTrailLinkMaterialProperty &&
                                    Property.equals(this._color, other._color))
                            }
                            Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
                            Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
                            Cesium.Material.PolylineTrailLinkImage = '/vmap2/images/joinLine.png';//joinLineStyle.imageUrl;
                            Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                                        {\n\
                                                                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                                            vec2 st = materialInput.st;\n\
                                                                            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                                            material.alpha = colorImage.a * color.a;\n\
                                                                            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                                            return material;\n\
                                                                        }";
                            Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
                                fabric: {
                                    type: Cesium.Material.PolylineTrailLinkType,
                                    uniforms: {
                                        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                                        image: Cesium.Material.PolylineTrailLinkImage,
                                        time: 0
                                    },
                                    source: Cesium.Material.PolylineTrailLinkSource
                                },
                                translucent: function (material) {
                                    return true;
                                }
                            });
                        }
                        //first load
                        if(!joinLineEntity){
                            var durationTime = joinLineStyle.duration || 2000;
                            var material = new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.RED, durationTime);
                            var join_line = datasource.entities.add({
                                id : data +'-join_line',
                                polyline : {
                                    positions : [],// Cesium.Cartesian3.fromDegreesArrayHeights(entity.pathTrack),
                                    width : joinLineStyle.width || 20,
                                    material : material,//Cesium.Color.fromCssColorString(color)||Cesium.Color.RED
                                    //clampToGround : true
                                }
                            });
                            join_line.polyline.positions = new Cesium.CallbackProperty(() => {
                                if(entity.pathRender.length>=6){
                                    if(joinLineStyle.from == 'right'){
                                        return Cesium.Cartesian3.fromDegreesArrayHeights([entity.pathRender[entity.pathRender.length-3], entity.pathRender[entity.pathRender.length-2], entity.pathRender[entity.pathRender.length-1],joinLineStyle.center[0], joinLineStyle.center[1], 0.0]);
                                    }else{
                                        return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.pathRender[entity.pathRender.length-3], entity.pathRender[entity.pathRender.length-2], entity.pathRender[entity.pathRender.length-1]]);
                                    }
                                }else{
                                    if(!entity.end_x && !entity.end_y){
                                        if(joinLineStyle.from == 'right'){
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([entity.x, entity.y, 0.0, joinLineStyle.center[0], joinLineStyle.center[1], 0.0])
                                        }else{
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.x, entity.y, 0.0])
                                        }
                                    }else if(entity.end_x && entity.end_y && entity.pathRender.length == 0){
                                        if(joinLineStyle.from == 'right'){
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([entity.end_x, entity.end_y, 0.0, joinLineStyle.center[0], joinLineStyle.center[1], 0.0])
                                        }else{
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.end_x, entity.end_y, 0.0])
                                        }
                                    }else{
                                        return [];
                                    }
                                }
                            }, false);
                        }
                    }
                }
            });
        };
        if(datasource.pathTrackingLayer){ 
            //历史轨迹图层的时间控制
            this._viewer.clockViewModel.shouldAnimate = true;
            //this._viewer.clock.currentTime = this.pathTracking_startTime;
             if(Cesium.JulianDate.compare(this._viewer.clock.tick(), this._viewer.clock.stopTime)>=0){
            //     this._viewer.clockViewModel.shouldAnimate = true;
                this._viewer.clock.currentTime = this.pathTracking_startTime;
            } 
        }
        else if(datasource.animate){
            //实时轨迹比如实时gps
            //遍历到某个要素
            if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
            dataInfo.forEach((data) => {
                var entity = datasource.entities.getById(data);
                var lineId = data +'-realTime_line';
                var entityLine = datasource.entities.getById(lineId);
                var joinLineEntity = datasource.entities.getById(data+'-join_line');
                if(entity&&entityLine==undefined){
                    //开实时轨迹
                    if(usePathTrackLine){
                        //存在gps点，但没有实时轨迹，则创建轨迹对象
                        var realTime_line = datasource.entities.add({
                            id : data +'-realTime_line',
                            polyline : {
                                positions : [],// Cesium.Cartesian3.fromDegreesArrayHeights(entity.pathTrack),
                                width : width||5,
                                material : Cesium.Color.fromCssColorString(color)||Cesium.Color.RED
                                //clampToGround : true
                            }
                        });
                        realTime_line.polyline.positions = new Cesium.CallbackProperty(() => {
                            if(entity.pathRender.length>=6)
                                return Cesium.Cartesian3.fromDegreesArrayHeights(entity.pathRender)
                            else
                                return [];
                        }, false);
                    }
                    //开牵引线
                    if(useJoinLine){
                        if(!Cesium.Material.PolylineTrailLinkType){
                            /*
                                流纹纹理线
                                color 颜色
                                duration 持续时间 毫秒
                            */
                            function PolylineTrailLinkMaterialProperty(color, duration) {
                                this._definitionChanged = new Cesium.Event();
                                this._color = undefined;
                                this._colorSubscription = undefined;
                                this.color = color;
                                this.duration = duration;
                                this._time = (new Date()).getTime();
                            }
                            Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
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
                                color: Cesium.createPropertyDescriptor('color')
                            });
                            PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
                                return 'PolylineTrailLink';
                            }
                            PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
                                if (!Cesium.defined(result)) {
                                    result = {};
                                }
                                result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
                                result.image = Cesium.Material.PolylineTrailLinkImage;
                                result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
                                return result;
                            }
                            PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
                                return this === other ||
                                    (other instanceof PolylineTrailLinkMaterialProperty &&
                                    Property.equals(this._color, other._color))
                            }
                            Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
                            Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
                            Cesium.Material.PolylineTrailLinkImage = '/vmap2/images/joinLine.png';//joinLineStyle.imageUrl;
                            Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                                        {\n\
                                                                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                                            vec2 st = materialInput.st;\n\
                                                                            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                                            material.alpha = colorImage.a * color.a;\n\
                                                                            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                                            return material;\n\
                                                                        }";
                            Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
                                fabric: {
                                    type: Cesium.Material.PolylineTrailLinkType,
                                    uniforms: {
                                        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                                        image: Cesium.Material.PolylineTrailLinkImage,
                                        time: 0
                                    },
                                    source: Cesium.Material.PolylineTrailLinkSource
                                },
                                translucent: function (material) {
                                    return true;
                                }
                            });
                        }
                        //first load
                        if(!joinLineEntity){
                            var durationTime = joinLineStyle.duration || 2000;
                            var material = new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.RED, durationTime);
                            var join_line = datasource.entities.add({
                                id : data +'-join_line',
                                polyline : {
                                    positions : [],// Cesium.Cartesian3.fromDegreesArrayHeights(entity.pathTrack),
                                    width : joinLineStyle.width || 20,
                                    material : material,//Cesium.Color.fromCssColorString(color)||Cesium.Color.RED
                                    //clampToGround : true
                                }
                            });
                            join_line.polyline.positions = new Cesium.CallbackProperty(() => {
                                if(entity.pathRender.length>=6){
                                    if(joinLineStyle.from == 'right'){
                                        return Cesium.Cartesian3.fromDegreesArrayHeights([entity.pathRender[entity.pathRender.length-3], entity.pathRender[entity.pathRender.length-2], entity.pathRender[entity.pathRender.length-1],joinLineStyle.center[0], joinLineStyle.center[1], 0.0]);
                                    }else{
                                        return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.pathRender[entity.pathRender.length-3], entity.pathRender[entity.pathRender.length-2], entity.pathRender[entity.pathRender.length-1]]);
                                    }
                                }else{
                                    if(!entity.end_x && !entity.end_y){
                                        if(joinLineStyle.from == 'right'){
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([entity.x, entity.y, 0.0, joinLineStyle.center[0], joinLineStyle.center[1], 0.0])
                                        }else{
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.x, entity.y, 0.0])
                                        }
                                    }else if(entity.end_x && entity.end_y && entity.pathRender.length == 0){
                                        if(joinLineStyle.from == 'right'){
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([entity.end_x, entity.end_x, 0.0, joinLineStyle.center[0], joinLineStyle.center[1], 0.0])
                                        }else{
                                            return Cesium.Cartesian3.fromDegreesArrayHeights([joinLineStyle.center[0], joinLineStyle.center[1], 0.0, entity.x, entity.y, 0.0])
                                        }
                                    }else{
                                        return [];
                                    }
                                }
                            }, false);
                        }
                    }
                    //当前entity的pathTrackde长度
                    //gps当前点正在朝最后一个点运动
                    entity.playRealTimeTrack = true;
                }
            });
        }
    }
}

/*
 * stop:暂停历史轨迹；或者暂停实时轨迹
 * layerName:图层名
 * dataInfo:[
 * id:,id:]
 */
vtron.comp.std.map.Cesium.prototype.stopPathTracking = function(layerName,dataInfo=[]){
    if(this._viewer){
        var datasource = this.getDataSourceByName(layerName);
        if(!datasource) return;
        if(datasource.pathTrackingLayer==undefined&&datasource.animate==undefined) return;
        if(datasource.pathTrackingLayer){ 
            //lishi l
            this._viewer.clockViewModel.shouldAnimate = false;
        }
        else if(datasource.animate != undefined){
            //隐藏实时轨迹，后续考虑
            if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
            dataInfo.forEach((data) => {
                var lineId = data +'-realTime_line';
                datasource.entities.removeById(lineId);
                datasource.entities.removeById(data+'-join_line');
                var entity = datasource.entities.getById(data);
                if(entity){
                    entity.pathRender = [];
                    entity.pathTrack = [];
                    entity.playRealTimeTrack = false;
                }
            });
        }
    }
};

/*
 * 重头播放轨迹
 * layerName:图层名
 * dataInfo:[
 * id:,id:]
 */
vtron.comp.std.map.Cesium.prototype.replayPathTracking = function(layerName,dataInfo=[]){
    if(this._viewer){
        var datasource = this.getDataSourceByName(layerName);
        if(!datasource) return;
        if(!datasource.pathTrackingLayer) return;
        this._viewer.clock.currentTime = this.pathTracking_startTime;
        this.pathLog = [];
        for(var i =0;i<this.lastPathLog.length;i++){
            this.pathLog.push(this.lastPathLog[i]);
        }
        this.playPathTracking(layerName,dataInfo);
    }
};

/*
 * 添加第一视角有关的图层，图层中可能有很多条线路（不同id）
    dataInfo = [
        { id: //每条路的id,
          playTime: //每条路规定总共跑完的时间，
          path: [{  //存放顶点坐标及每个点用时
              time：//从0开始到每个顶点总共需要的时间，单位秒
              lon:
              lat:
              alt:  //高度
              color: 路线的颜色
          }],
          model:{
              url: 
              size: //模型大小
              show:
          },
          image: {
              url:
              show://image和model的show只能选择一个
              scale:
          }
    }]
 */
vtron.comp.std.map.Cesium.prototype.addFirstPersonPath = function(layerName,dataInfo=[]){
    if(!this._viewer)
        return;
    //存放这个layerName的图层
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource){
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    if(!dataInfo)
        return;
    if(!(dataInfo instanceof Array)){
        dataInfo = [dataInfo];
    }
    this._viewer.clockViewModel.shouldAnimate = true;
    dataInfo.forEach((data) =>{
        //整条路径的id
        if(data.id){
            var bexistEntity = datasource.entities.getById(data.id);
            //如果存在该entity，则不做处理，要给每个到达位置的点绘制一个entity
            if(!bexistEntity){
                //传进来的data的时长,单位是秒
                var playTime = data.playTime;
                //随机创建一个日期来做时间序列的开始日期
                var randomTime = new Date();
                var start = Cesium.JulianDate.fromDate(randomTime);
                //结束时间 = 开始时间 + 整个路程总长
                var stop = Cesium.JulianDate.addSeconds(start, playTime, new Cesium.JulianDate());
                //把开始时间和结束时间绑定在clock上
                this._viewer.clock.startTime = start.clone();
                this._viewer.clock.stopTime = stop.clone();
                this._viewer.clock.currentTime = start.clone();
                this._viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
                this._viewer.clock.multiplier = 10;//暂不清楚啥意思

                //第一个点到最后一个点的实际用时
                var actualDurTime = data.path[data.path.length-1].time - data.path[0].time;
                //之后用来将时间跟点关联起来,存放到一个position数据集中
                var positionProperty = new Cesium.SampledPositionProperty();
                //开始加一条路径的每一个点，并将每一个点同时间关联起来
                for(var i = 0; i< data.path.length; i++){
                    //计算从第一个点到第i个点真正播放时间长度（*playTime是为了将actualDurTime放大/缩小）
                    var t = (data.path[i].time - data.path[0].time)/actualDurTime*playTime;
                    var time = Cesium.JulianDate.addSeconds(start,t, new Cesium.JulianDate());
                    var position = Cesium.Cartesian3.fromDegrees(data.path[i].lon, data.path[i].lat, data.path[i].alt);
                    positionProperty.addSample(time, position);
                    datasource.entities.add({
                        id: data.id + '.firstPersonPosition.' + i,
                        position: position,
                        point: {
                            pixelSize: 0,
                            color: Cesium.Color.TRANSPARENT//暂时隐藏顶点
                        }
                    })
                };
                var pathColor = data.path.color || 'rgba(0, 255, 0, 1)';
                //添加路径并用model（billboard）代表运动着的物体
                var wholePathEntity = datasource.entities.add({
                    id: data.id,//传进来的id为整条路的id，
                    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                        start : start,
                        stop : stop
                    })]),
                    //已经将时间跟位置关联起来
                    position: positionProperty,
                    //自动根据位置计算方向，用来后面调整第一视角
                    orientation : new Cesium.VelocityOrientationProperty(positionProperty),
                    //应该打算开一个接口，有没有模型，没有就把模型隐藏，有默认路径，不可以完全不要，因为要通过模型的矩阵是算第一视角的方向
                    model: {
                        uri: data.model.url,
                        minimumPixelSize : data.model.size || 64,
                        show : data.model.show || true,
                        scale: 1,
                    },
                    //模型没有显示就用billboard代替
                    billboard: {
                        image: data.image.url,
                        scale:this.imageScaleFactor*(data.image.scale||1.0),
                        show: data.image.show,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        scaleByDistance : new Cesium.NearFarScalar(1000, 0.5, 100000, 0.1)
                    },
                    path : {
                        resolution : 1,
                        material : Cesium.Color.fromCssColorString(pathColor),
                        width : data.path.width || 10
                    }
                });
            }
        }
    });
    
};

/*
 * 将可以设置为第一视角的图层设置为当前的第一视角,目前一次只能设置一条（一个id）
 */
vtron.comp.std.map.Cesium.prototype.setPathAsFirstPerson = function(layerName, id, isFirstPerson){
    if(!this._viewer) return;
    //一个图层可能包含许多个不同id的不同第一视角的路
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource){
        datasource = new Cesium.CustomDataSource(layerName);
        this._viewer.dataSources.add(datasource);
    }
    if(!id) return;
    
    var entity = datasource.entities.getById(id);
    if(entity){
        this._firstPersonEntity = entity;
        //打开第一视角的开关,没有传进来就默认开启
        this._onFirstPerson = isFirstPerson;
        this._viewer.clockViewModel.shouldAnimate = true;
    }else{
        return;
    }
}

/*
 * 添加贴地流光线图层，可以包括复数条流光线
   
 */
vtron.comp.std.map.Cesium.prototype.addStreamingLight = function(layerName, dataInfo){
    //流光线的图层属于primitive的图层
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }
    //之后要先判断这个id的primitive是不是已经存在了
    //用shader创建顶点着色器和片元着色器
    var streamingLight_glsl = 
        // 'float HEAD_SIZE = 0.05; \n' +
        // 'float TAIL_SIZE = 0.5; \n' +
        // 'float WIDTH_OFFSET = 0.1; \n'+
        // 'float CORE_SIZE  = 0.1; \n' +
        // 'vec4 drawLight(float xPos, vec2 st, float headOffset, float tailOffset, float widthOffset){ \n'+
        //     'float lineLength = smoothstep(xPos-headOffset, xPos, st.x) - smoothstep(xPos, xPos + tailOffset, st.x); \n' +
        //     'float lineWidth = smoothstep(widthOffset, 0.5, st.y) - smoothstep(0.5, 1.0 - widthOffset, st.y); \n' +
        //     'return vec4(lineLength * lineWidth); \n'+
        // '}\n'+
        // 'czm_material czm_getMaterial(czm_materialInput materialInput) \n' + 
        // '{ \n' +
        //     'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
        //     'float sinTime = sin(time); \n' +
        //     //'float xCol = (3.0 - (sinTime / 3.0)) *3.0;\n' +
        //     //'xCol = mod(xCol, 3.0);\n' +
        //     'vec4 v4_core;\n'+
        //     'vec4 v4_color;\n'+
        //     'float xPos = 0.0; \n'+
        //     'if (sinTime > 0.0){ \n' +
        //         'xPos = cos(time)+1.0-TAIL_SIZE; \n' +
        //         'v4_color = drawLight(xPos, materialInput.st, HEAD_SIZE, TAIL_SIZE, WIDTH_OFFSET);\n'+
        //         'v4_core = drawLight(xPos, materialInput.st, HEAD_SIZE, HEAD_SIZE*2.0, WIDTH_OFFSET*2.0);\n'+
        //         '} \n' +
        //     'm.diffuse = color.xyz + v4_core.xyz*v4_core.w*0.8; \n' +
        //     'm.alpha = pow(v4_color.w, 3.0); \n' +
        //     'return m; \n' +
        // '} \n';
        'float HEAD_SIZE = 0.05; \n' +
        'float TAIL_SIZE = 1.5; \n' +
        'float WIDTH_OFFSET = 0.1; \n'+
        'float CORE_SIZE  = 0.1; \n' +
        'vec4 drawLight(float xPos, vec2 st, float headOffset, float tailOffset, float widthOffset){ \n'+
            'float lineLength = smoothstep(xPos-headOffset, xPos, st.x) - smoothstep(xPos, xPos + tailOffset, st.x); \n' +
            'float lineWidth = smoothstep(widthOffset, 0.5, st.y) - smoothstep(0.5, 1.0 - widthOffset, st.y); \n' +
            'return vec4(lineLength * lineWidth); \n'+
        '}\n'+
        'czm_material czm_getMaterial(czm_materialInput materialInput) \n' + 
        '{ \n' +
            'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
            'float sinTime = sin(time); \n' +
            //'float xCol = (3.0 - (sinTime / 3.0)) *3.0;\n' +
            //'xCol = mod(xCol, 3.0);\n' +
            'vec4 v4_core;\n'+
            'vec4 v4_color;\n'+
            'float xPos = 0.0; \n'+
            'if (sinTime > 0.0){ \n' +
                'xPos = cos(time)+1.0-TAIL_SIZE; \n' +
                'v4_color = drawLight(xPos+0.3, materialInput.st, HEAD_SIZE, TAIL_SIZE, WIDTH_OFFSET);\n'+
                'v4_core = drawLight(xPos+0.3, materialInput.st, HEAD_SIZE, HEAD_SIZE*2.0, WIDTH_OFFSET*2.0);\n'+
            '}else{ \n' +
                'xPos = -cos(time)+1.0-TAIL_SIZE; \n' +
                'v4_color = drawLight(xPos-0.3, materialInput.st, HEAD_SIZE, TAIL_SIZE, WIDTH_OFFSET);\n'+
                'v4_core = drawLight(xPos-0.3, materialInput.st, HEAD_SIZE, HEAD_SIZE*2.0, WIDTH_OFFSET*2.0);\n'+
            '}\n'+
            'm.diffuse = color.xyz + v4_core.xyz*v4_core.w*0.8; \n' +
            'm.alpha = pow(v4_color.w, 3.0); \n' +
            'return m; \n' +
        '} \n';
    if(!(dataInfo instanceof Array)){
        dataInfo = [dataInfo];
    }
    dataInfo.forEach((data)=>{
        //首先判断这个id存在了没有
        var primitiveItem = this.getPrimitiveById(layerName, data.id);
        if(primitiveItem.length == 0){
            //判断dataInfo里面有没有传颜色
            var color = data.color || 'rgba(255, 0, 0, 1.0)';
            //将着色器赋值给材质
            var streamingLightMat = new Cesium.Material({
                fabric : {
                    type: 'streamingLight',
                    uniforms:{
                        color: Cesium.Color.fromCssColorString(color),//new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                        time: data.time||0.0
                    },
                    source: streamingLight_glsl
                }
            });
            this._mapStreamingLightMaterial.set('streamingLightMaterial_'+data.id,{mat:streamingLightMat});

            var streamingLight = primitiveCollection.add(new Cesium.Primitive({
                geometryInstances : new Cesium.GeometryInstance({
                    geometry: new Cesium.PolylineGeometry({
                        positions : Cesium.Cartesian3.fromDegreesArray(data.geo),//[lon,lat,lon,lat]]
                        width : data.width || 10,
                        vertexFormat : Cesium.VertexFormat.ALL
                    })
                }),
                id: data.id,
                appearance : new Cesium.PolylineMaterialAppearance({
                    material: streamingLightMat
                })
            }));
            streamingLight.id = data.id;
        }
    });
};

/**
 * 批量添加抛物线流光线
 * @param {*} layerName //抛物线流光线图层名称，一个图层可以包含多条流光线
 * @param {*} dataInfo 
 * dataInfo=[{
 *      id:
 *      color:      //底线的颜色
 *      width:
 *      options:{
 *          height:     //抛物线最高的高度，如果起点和终点的距离比较远要设置得高一点
 *          num：       //插值点的数量
 *      
 *          pt1: {      //流光的终点
 *              lon:
 *              lat
 *           }
 *          pt2: {      //流光的起点
 *              lon:
 *              lat:
 *           }
 *      }
 *      
 * }]
 */
vtron.comp.std.map.Cesium.prototype.addParabolaLight = function(layerName, dataInfo){
    //流光抛物线的图层属于primitive的图层
    if(!this._viewer||!dataInfo) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }

    //创建抛物线流光线定点着色器
    var parabolaLight_glsl = 
        //ljy 第三次修改start
        'float HEAD_SIZE = 0.1; \n' +
        'float TAIL_SIZE = 0.5; \n' +
        'float WIDTH_OFFSET = 0.1; \n'+
        'float CORE_SIZE  = 0.1; \n' +
        'vec4 drawLight(float xPos, vec2 st, float headOffset, float tailOffset, float widthOffset){ \n'+
            'float lineLength = smoothstep(xPos-headOffset, xPos, st.x) - smoothstep(xPos, xPos + tailOffset, st.x); \n' +
            'float lineWidth = smoothstep(widthOffset, 0.5, st.y) - smoothstep(0.5, 5.0 - widthOffset, st.y); \n' +       //线的宽度在 widthOffset和5.0-widthOffset之间插值
            'return vec4(lineLength * lineWidth); \n'+
         '}\n'+
        'czm_material czm_getMaterial(czm_materialInput materialInput) \n' + 
        '{ \n' +
            'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
            'float sinTime = sin(time); \n' +
            'vec4 v4_core;\n'+
            'vec4 v4_color;\n'+
            'float xPos = 0.0; \n'+
            'if (sinTime > 0.0){ \n' +        //如果是sinTime<0.0可以变成白光向反方向运动
                'xPos = cos(time)+1.0-TAIL_SIZE; \n' +
                'v4_color = drawLight(xPos, materialInput.st, HEAD_SIZE, TAIL_SIZE, WIDTH_OFFSET);\n'+
                'v4_core = drawLight(xPos, materialInput.st, HEAD_SIZE, HEAD_SIZE*2.0, WIDTH_OFFSET*5.0);\n'+
                '} \n' +
              'else{\n'+
                'xPos = 1.0-cos(time)-TAIL_SIZE; \n' +
                'v4_color = drawLight(xPos, materialInput.st, HEAD_SIZE, TAIL_SIZE, WIDTH_OFFSET);\n'+
                'v4_core = drawLight(xPos, materialInput.st, HEAD_SIZE, HEAD_SIZE*2.0, WIDTH_OFFSET*5.0);\n'+
              '}\n'+
            'vec4 colorImage = texture2D(image, vec2(fract(materialInput.st.s - time), materialInput.st.t));\n'+
            'm.diffuse = color.xyz + v4_core.xyz*v4_core.w*1.5; \n' +
            'm.alpha = color.r*0.05+color.g*0.05+color.b*0.05+(v4_color.w)*color.a; \n' +
            'return m; \n' +
        '} \n';
    //ljy 第三次修改end
    if(!(dataInfo instanceof Array)){
        dataInfo = [dataInfo];
    }
    dataInfo.forEach((item)=>{
        var color = item.color || 'rgba(255, 255, 0, 1.0)';
        //构造material
        var parabolaLightMat = new Cesium.Material({
            fabric : {
                type: 'parabolaLight',
                uniforms:{
                    color: Cesium.Color.fromCssColorString(color),//new Cesium.Color(0.0, 0.3, 5.2, 0.5),    //之后颜色可能要开出来配
                    image: '/test-map-engine/test/colors1.png',
                    time: 0.0
                },
                source: parabolaLight_glsl
            }
        });
        //管理这个material的时候目前先跟贴地流光线放在一起
        this._mapStreamingLightMaterial.set('parabolaLight'+item.id ,{mat:parabolaLightMat});
        //计算抛物线坐标
        var coordinatesArr = [];
        coordinatesArr = _parabolaEquationResult(this, item.options);
        //生成primitive
        var parabolaPrimitive = new Cesium.Primitive({
            geometryInstances : new Cesium.GeometryInstance({
              geometry : new Cesium.PolylineGeometry({
                  positions : Cesium.Cartesian3.fromDegreesArrayHeights(coordinatesArr),
                  width : item.width,//5.0,
                  vertexFormat : Cesium.VertexFormat.ALL
              }),
            }),
            id: item.id,
            appearance : new Cesium.PolylineMaterialAppearance({
                material :parabolaLightMat 
            })
        });
        parabolaPrimitive.id = item.id;
        primitiveCollection.add(parabolaPrimitive);
    });
}

/**
 * 输入options数组
 * options=[{
 *      height:     //抛物线最高的高度，如果起点和终点的距离比较远要设置得高一点
 *      num：       //插值点的数量
 *      pt1: {      //流光的终点
 *              lon:
 *              lat
 *           }
 *      pt2: {      //流光的起点
 *              lon:
 *              lat:
 *           }
 * }]
 * 计算抛物线各个定点
 * 返回一条线数组result=[lon1, lat1, height1, lon2, lat2, height2, .... lonN, latN, heightN]
 * resultInfo = [result1, result2, ..., resultN]
 */
var _parabolaEquationResult = function(instance, options){
    //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
    //options{height:最大高度？, num:抛物线插值数量, pt1:{lon:, lat:},pt2:{lon:,lat:}}
    //高度大于5000用原来的，小于5000用5000
    var h = options.height && options.height >1000? options.height:1000;
    var L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat);
    var num = options.num&& options.num > 50? options.num : 50;
    var result = [];
    var dlt = L/num;
    if(Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat -options.pt2.lat)){
        //以lon为基准
        var delLat = (options.pt2.lat - options.pt1.lat) / num;
        if(options.pt1.lon - options.pt2.lon >0){
            dlt = -dlt;
        }
        for(var i = 0;i<num;i++){
            var tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) *i),2)*4*h/Math.pow(L,2);
            //计算插值出来的抛物线上的点
            var lon = options.pt1.lon + dlt *i;
            var lat = options.pt1.lat + delLat * i;
            result.push(lon, lat, tempH);
        }
        //手动加上最后一个点
        result.push(options.pt2.lon, options.pt2.lat, 0);
    }else{
    //以lat为基准
        var delLon = (options.pt2.lon - options.pt1.lon) / num;
        if(options.pt1.lat - options.pt2.lat > 0){
            dlt = -dlt;
        }
        for(var i = 0;i<num;i++){
            var tempH = h - Math.pow((-0.5) * L + Math.abs(dlt)* i,2)*4*h/Math.pow(L,2);
            var lon = options.pt1.lon + delLon * i;
            var lat = options.pt1.lat + dlt *i;
            result.push(lon, lat, tempH);
        }
        //手动加上最后一个点
        result.push(options.pt2.lon, options.pt2.lat, 0);
    }
    return result;
}

/**
 * 批量添加glsl发光线
 * @param {*} layerName //抛物线流光线图层名称，一个图层可以包含多条流光线
 * @param {*} dataInfo 
 * dataInfo=[{
 *      id:
 *      color:      //底线的颜色
 *      width:
 *      options:{
 *          height:     //抛物线最高的高度，如果起点和终点的距离比较远要设置得高一点
 *          num：       //插值点的数量
 *      
 *          pt1: {      //流光的终点
 *              lon:
 *              lat
 *           }
 *          pt2: {      //流光的起点
 *              lon:
 *              lat:
 *           }
 *      }
 *      
 * }]
 */
vtron.comp.std.map.Cesium.prototype.addLightPolyline = function(layerName, id, vertices, width, color){
    //流光抛物线的图层属于primitive的图层
    if(!this._viewer) return;
    //if(!(dataInfo instanceof Array)) dataInfo = [dataInfo];
    var primitiveCollection = this.getPrimitiveCollectionByName(layerName);
    if(!primitiveCollection) {
        primitiveCollection = new Cesium.PrimitiveCollection();
        primitiveCollection.name = layerName;
        this._viewer.scene.primitives.add(primitiveCollection);
    }
    var parabolaPrimitive = this.getPrimitiveById(layerName,id);
    if(!(parabolaPrimitive && parabolaPrimitive.length!=0)){
        //创建抛物线流光线定点着色器
        var lightOutline_glsl = 
            //ljy 第三次修改start
            'czm_material czm_getMaterial(czm_materialInput materialInput) \n' + 
            '{ \n' +
                'czm_material m = czm_getDefaultMaterial(materialInput);\n' +
                'float tau = 3.141592635*2.0;\n' +
                'float sinTime = sin(time); \n' +
                'float xCol = (3.0 - (sinTime / 3.0)) *3.0;\n' +
                'xCol = mod(xCol, 3.0);\n' +
                'vec3 horColour = vec3(0.25, 0.25, 0.25);\n' +
                'if(xCol < 1.0){\n' +
                    'horColour.r += 1.0 - xCol;\n' +
                    'horColour.g += xCol;\n' +
                '}else if(xCol < 2.0){\n' +
                    'xCol -= 1.0;\n'+
                    'horColour.g += 1.0 - xCol;\n'+
                    'horColour.b += xCol;\n'+
                '}else {\n'+
                    'xCol -= 2.0;\n'+
                    'horColour.b += 1.0 - xCol;\n'+
                    'horColour.r += xCol;\n'+
                '}\n' +
                'float beamWidth = (0.7+0.5*cos(3.0*10.0*tau*0.15*clamp(floor(0.0), 0.0, 10.0)));\n' +
                'vec3 horBeam = vec3(beamWidth);\n'+
                'vec4 fragColor = vec4((( horBeam) * horColour), 1.0);\n' +
                'm.diffuse = fragColor.xyz; \n' +
                'm.alpha = 0.5;\n' +
                'return m; \n' +
            '} \n';
        color = color || 'rgba(255, 255, 0, 1.0)';
        //构造material
        var lightOutline_glslMat = new Cesium.Material({
            fabric : {
                type: 'lightOutline_glsl',
                uniforms:{
                    color: Cesium.Color.fromCssColorString(color),//new Cesium.Color(0.0, 0.3, 5.2, 0.5),    //之后颜色可能要开出来配
                    time: 0.0
                },
                source: lightOutline_glsl
            }
        });
        //管理这个material的时候目前先跟贴地流光线放在一起
        this._mapStreamingLightMaterial.set('parabolaLight'+id ,{mat:lightOutline_glslMat});
        //生成primitive
        parabolaPrimitive = new Cesium.Primitive({
            geometryInstances : new Cesium.GeometryInstance({
              geometry : new Cesium.PolylineGeometry({
                  positions : vertices,//Cesium.Cartesian3.fromDegreesArray(item.),
                  width : width,//5.0,
                  vertexFormat : Cesium.VertexFormat.ALL
              }),
            }),
            releaseGeometryInstances:false,
            id: id,
            appearance : new Cesium.PolylineMaterialAppearance({
                material :lightOutline_glslMat 
            })
        });
        //单击完成的时候同时添加primitive特效面
        var lightPolygonPrimitive = new Cesium.Primitive({
            geometryInstances : new Cesium.GeometryInstance({
              geometry: new Cesium.PolygonGeometry({
                  polygonHierarchy: new Cesium.PolygonHierarchy(vertices),
                  //extrudedHeight:3000,让面有高度，能执行ok
              })
            }),
            releaseGeometryInstances:false,
            id: id+'polygon',
            appearance : new Cesium.MaterialAppearance({
                material :lightOutline_glslMat 
            })
        });
        parabolaPrimitive.id = id;
        primitiveCollection.add(parabolaPrimitive);
        primitiveCollection.add(lightPolygonPrimitive);
        parabolaPrimitive.geometryInstances.geometry.positions = new Cesium.CallbackProperty(() => {return parabolaPrimitive.geometryInstances.geometry.positions}, false);
    }else{
        parabolaPrimitive[0].geometryInstances.geometry.positions = vertices;
    }
}

/*
 * 获取所有的图层
 */
vtron.comp.std.map.Cesium.prototype.getLayers = function(){
    if(!this._viewer) return null;
    var layers = []
    for(let dataSource of this._viewer.dataSources._dataSources) {
        layers.push(dataSource);
    }
    return layers;
};

/*
 * 获取指定图层的显隐性
 */
vtron.comp.std.map.Cesium.prototype.getLayerShow = function(layerName){
    if(!this._viewer) return null;
    var layer = this.getDataSourceByName(layerName) || this.getPrimitiveCollectionByName(layerName);
    if(layer.geoType == 'road'){
		return layer.show;
	}
    var layerDisInfo = this._layerDisplayCondition.get(layerName)
    var layerDisplayCondition;
    if(layerDisInfo && layerDisInfo.visible && (typeof layerDisInfo.visible)=="boolean"){
        layerDisplayCondition = layerDisInfo.visible;
    }else{
        layerDisplayCondition = false;
    }
    //show = false但是图层可视属性是true的话，整个图层判断还是true
    return layer&&(layer.show && layerDisplayCondition);
};

/*
 * 当前地图场景输出成图片 
 * 用法1：pc端模拟大分辨率显示，然后调用本接口，可以生成一张大分辨率的图片
 */
vtron.comp.std.map.Cesium.prototype.getCurrentSceneMap = function(layerName){
    //renderer/context.js里面要先打开开关，但是未测试所以不知道会有什么影响
    //拿到和cesium有关的canvas并存成png
    var c = document.getElementsByClassName("cesium-widget")[0].firstElementChild.toDataURL("image/png");
    // var imgt = document.getElementById('imgt')
    var a = document.createElement("a");
    //保存位置
    a.download = "http://127.0.0.1:8080/1";
    a.href =c; 
    document.body.appendChild(a); a.click(); a.remove();　　//下载之后把创建的元素删除

}

/*
 * searchbyturf方法的封装性不好！
 * 空间搜索：通过几何体的方式，从图层中查找 //下个版本完成该函数selectElementByShape
 * layers： [layerName,layerName...]
 * shape: geojson的描述，目前只支持面,圆
 * 注：普通的面的表示如下：
 * shape:
 * {
 *    "type":"Polygon",
 *    "coordinates":[
 *        [[120.1,30.2],[120.2,30.2],[120.2,30.1],[120.1,30.1],[120.1,30.2]]
 *    ]
 * }
 *
 * 圆的shape：
 * {
 *     "type":"Circle",
 *     "centre":[120.1,30.2],
 *     "radius":500 //米
 * }
 *
 * 返回：
 * [
 *   {
 *      layerName: 'name',
 *      elements:[id,id,id]
 *   },
 *   {
 *      layerName: 'name',
 *      elements:[id,id,id]
 *   }
 * ]
 */
vtron.comp.std.map.Cesium.prototype.selectElementByShape = function(layers,shape){
    return;
    /*if(!this._viewer) return null;
    var retValue = []
    for(var layerObject of layers) {
        var oneLayerValue = {};
        oneLayerValue.name = layerObject.name;
        var selectedEle = [];

    }
    return retValue;*/
};

/*
 * 定位到某些element，相当于当这些elements在屏幕显示范围内
 * layerName:图层名
 * fids：要素id数组
 * fids=[]时定位到整个图层
 */
vtron.comp.std.map.Cesium.prototype.zoomToElement = function(layerName,fids,rate=7680/2304){
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) return;
    if(this._viewer.trackedEntity){
        this.trackedCancel();
        return;
    }
    //有要素id，但是id不是数组是number的情况
    if(isNaN(fids)&&!(fids instanceof Array)) fids = [fids];
    if(!fids) return;
    //设置offset，每次zoom完要和地图垂直,4000这只值以后要根据
    var hpRoll = new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90), 0);
    this.zoomState = true;  //zoomToElement方法被使用时可以让大屏也联动
    if(!datasource.pathTrackingLayer){
        //普通图层：例如gps，等等
        var entities = [];//new Cesium.EntityCollection();//如果直接用EntityCollection，会多加一个图层在地图上，影响display
        if(fids.length!=0){
            fids.forEach(id => {
                var entity = datasource.entities.getById(id);
                if(entity){
                  entities.push(entity);
                }
              });
            this._viewer.zoomTo(entities, hpRoll);
        }else{
            this._viewer.zoomTo(datasource, hpRoll);
        }
        
    }
    else{
        //历史轨迹图层中只有一条历史轨迹，每条轨迹（每个id）可能对应若干个辅助定位的entity
        //this._viewer.zoomTo(datasource.entities, hpRoll);//cesium集成的方法，不能把entity缩放到都在屏幕范围内，比如历史轨迹
        //遍历datasource里面的entitiy
        var entities = datasource.entities._entities._array;
        //获取所有entity的包络矩形
        var maxX = null;
        var maxY = null;
        var minX = null;
        var minY = null;
        entities.forEach((entity)=>{
            //将坐标转换成经纬度(radians)
            if(entity.position._value){
                var lonlat = Cesium.Cartographic.fromCartesian(entity.position._value);
                if (minX == null || lonlat.longitude < minX)
                    minX = lonlat.longitude
                if (maxX == null || lonlat.longitude > maxX)
                    maxX = lonlat.longitude
                if (minY == null || lonlat.latitude < minY)
                    minY = lonlat.latitude
                if (maxY == null || lonlat.latitude > maxY)
                    maxY = lonlat.latitude
            }
        });
        //用regionToRegion返回适合屏幕的rectangle
        var rate = rate < 1 ? 1 : rate;
        var rectangle = this.regionToRegion({west: Cesium.Math.toDegrees(minX),east: Cesium.Math.toDegrees(maxX),south: Cesium.Math.toDegrees(minY),north: Cesium.Math.toDegrees(maxY)}, null, rate);
        //返回的west east north south单位是degree
        //计算相机新坐标(这里的rectangle的四边要用raidans)
        rectangle.south = Cesium.Math.toRadians(rectangle.south);
        rectangle.north = Cesium.Math.toRadians(rectangle.north);
        rectangle.east = Cesium.Math.toRadians(rectangle.east);
        rectangle.west = Cesium.Math.toRadians(rectangle.west);
        //这个是笛卡尔坐标
        var cameraPos = this._viewer.camera.getRectangleCameraCoordinates(rectangle);
        //计算新rectangle的中心
        var center = Cesium.Rectangle.center(rectangle);
        //计算中心到camera的距离
        var range = Cesium.Cartesian3.distance(cameraPos, Cesium.Cartographic.toCartesian(center));
        hpRoll = new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90), range);
        //this._viewer.zoomTo(datasource.entities, hpRoll);
        //镜头定位到可以看到矩形的那个点
        this._viewer.camera.setView({
            destination: cameraPos,
        })
    }
};

/*
*  设置要素的跟踪 ：要素位置变化时，始终在屏幕中间限制
*  layername：图层名
*  fid 
*  swithch: true：开启跟踪
*           false:关闭跟踪
 */
vtron.comp.std.map.Cesium.prototype.trackElement = function(layerName, fid,track=false) {
    //查找到该点，并设置点的tracked属性
    if(!layerName) return '未设置图层名！';
    var datasource = this.getDataSourceByName(layerName);
    if(!datasource) {
        return '图层不存在！';
    }
    
    if(!fid) return;
    var entity = datasource.entities.getById(fid);
    if(entity){
        if(track){
            this._viewer.trackedEntity = entity;
            //entity.tracking = true;解决跟随时鼠标操作引起的偏移问题
            //针对开启点要素跟踪以后，地图瓦片不加载的问题，进行规避
            if(entity.geoType = 'point')
            {
                var pos = this.getCameraPosition();
                var height = pos.geoCoord.alt;
                this._viewer.trackedEntity.viewFrom = new Cesium.Cartesian3(0, 0, height);
            }
        }
        else{
            this._viewer.trackedEntity = null;
        }
    }
};

/*
*  已经跟随了实体，就不能进行其他定位操作，弹出提示
*  
 */
vtron.comp.std.map.Cesium.prototype.trackedCancel = function(){
    if(this._viewer.trackedEntity && $("body").hasClass("theme-pc")){
        if($("#mapNotices").get(0)){
            $("#mapNotices").show();
        }else{
            var dialog = document.createElement("div");
            dialog.id="mapNotices";
            dialog.style.position = "absolute";
            dialog.style.left = "45%";
            dialog.style.top = "30%";
            dialog.style.background = "#15333e";
            dialog.style.width = "15.5em";
            dialog.style.height = "8em";
            dialog.style["z-index"] = 15;
            document.body.appendChild(dialog);
            var title = document.createElement("div");
            title.style.position = "relative";
            title.style.height = "2em";
            title.style["line-height"] = "2em";
            title.style["border-bottom"] = "0.1em solid #15333e";
            title.style.color = "#ffffff";
            title.style.padding = "0 1em";
            title.innerText = "提示";
            dialog.appendChild(title);
            var wrapCon = document.createElement("div");
            wrapCon.style.height = "calc(100% - 7.7em)";
            wrapCon.style["font-size"] = "0.875em";
            wrapCon.style.margin = "0.5em";
            wrapCon.style["border-radius"] = "0.2em";
            wrapCon.style.position = "relative";
            wrapCon.innerText = "正在跟随，不可进行其他定位操作！";
            dialog.appendChild(wrapCon);
            var btnDiv = document.createElement("div");
            btnDiv.style["background-color"] = "inherit";
            btnDiv.style["padding-top"] = "0.8em";
            btnDiv.style["text-align"] = "right";
            btnDiv.style["padding-right"] = "1em";
            dialog.appendChild(btnDiv);
            var btn = document.createElement("button");
            btn.style.padding = "0.35em 1.2em";
            btn.style.margin = "0.5em";
            btn.style["background-color"] = "#1c3c49";
            btn.style.color = "#ffffff";
            btn.style["box-shadow"] = "0 -0.1em 0.3em rgba(0,0,0,0.5)";
            btn.style.border = "0.1em solid transparent";
            btn.style["border-radius"] = "0.3em";
            btn.style.outline = "none";
            btn.style["letter-spacing"] = "0.2em";
            btn.style.cursor = "pointer";
            btn.innerText = "确定"
            btnDiv.appendChild(btn);
            btn.onclick = function(){
                $("#mapNotices").hide();
            };
        }
    }
    
    
};
