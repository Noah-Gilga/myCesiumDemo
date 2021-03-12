function PGISImageryProvider_V10(options) {

    //this._url = "http://online1.map.bdimg.com/onlinelabel/?qt=tile";
    //this._url = "http://localhost:8080/Apps/Demo/pgis0.3/zssl";

    this._url = options.url;

    this._tileformat = options.format||"png";
    this._tileWidth = 256;
    this._tileHeight = 256;
    this._minimumLevel = options.minimumLevel||0;
    this._maximumLevel = options.maximumLevel||20;
    this._PGISonline = options.online;
    this._tilesRule = options.tilesRule;
    this._layer = options.layer;
    this._tileMatrixSetID = options.tileMatrixSetID;
    this._style = options.style;
    this._credit = undefined;
    this._tilingScheme = options.tilingScheme;
    this._format = options.format;
    this._mapType = options.mapType;
    if (options.rectangle != undefined) {
        this._minlon = options.rectangle[0];
        this._minlat = options.rectangle[1];
        this._maxlon = options.rectangle[2];
        this._maxlat = options.rectangle[3];
    }

    if (this._PGISonline == true && this._mapType == 'pgisV11') {//pgisV11:支持wmts，天地图就是该类型，公安的pgis虽然有wmts列表但不一定能用这种方式
        this._PGISV10 = this.useWmtsForPgisV10();
        this._credit = undefined;
        this._ready = true;

        if (this._PGISonline == true)
            return this._PGISV10;
    }
    else {
        //pgis1.0 本地服务  将标准的WMTS数据下载到本地（类似arcgis格式，配置文件是conf.json）
        if(this._mapType != 'pgisV11'&&this._PGISonline == false){
               //获取到json文件中的分辨率等信息
                var capabilitieurl = options.url + '/conf.json';
                /*fetch(capabilitieurl).then((reponse) => {
                    return reponse.json();
                }).then((data) => {
                    var topleftlon = data.tileInfo.origin.x;
                    var topleftlat = data.tileInfo.origin.y;
                    if(topleftlon!=-180 || topleftlat!=90){
                        console.log("topleftlon:",topleftlon,"topleftlat:",topleftlat);
                    }
                    for(var i = 0, len = data.tileInfo.lods.length; i < len; i++) {
                         var resolution = data.tileInfo.lods[i].resolution;
                         var tmpnumberOfLevelZerotilesX = Math.round(360 /resolution / 256);
                         var tmpnumberOfLevelZerotilesy = Math.round(180 /resolution / 256);
                         if(tmpnumberOfLevelZerotilesX>=2 && tmpnumberOfLevelZerotilesX%2==0){
                             this._numberOfLevelZerotilesX = tmpnumberOfLevelZerotilesX;
                             this._numberOfLevelZerotilesY  = tmpnumberOfLevelZerotilesy;
                             break;
                         }
                    }

                     this._tilingScheme = new Cesium.GeographicTilingScheme({ numberOfLevelZeroTilesX: this._numberOfLevelZerotilesX, numberOfLevelZeroTilesY: this._numberOfLevelZerotilesY });
                     this._rectangle = this._tilingScheme.rectangle;

                     this._credit = undefined;
                     this._ready = true;

                     if (this._PGISonline == true)
                         return this._PGISV10;
                });*/
                this._tilingScheme = new Cesium.GeographicTilingScheme({ numberOfLevelZeroTilesX: 2, numberOfLevelZeroTilesY: 1 });
                this._rectangle = this._tilingScheme.rectangle;

                this._credit = undefined;
                this._ready = true;

                if (this._PGISonline == true)
                    return this._PGISV10;
        }
        else{
            //
             this._tilingScheme = new Cesium.GeographicTilingScheme({ numberOfLevelZeroTilesX: 2, numberOfLevelZeroTilesY: 1 });
             this._rectangle = this._tilingScheme.rectangle;

             this._credit = undefined;
             this._ready = true;

             if (this._PGISonline == true)
                 return this._PGISV10;
        }
    }     
}
PGISImageryProvider_V10.prototype.InBaseLayerRectangle = function(point){
    if(this._minlon==undefined || !this._maxlon || !this._maxlat || !this._minlat) return true;
    if(point.lon< this._minlon ||  point.lon>this._maxlon || point.lat>this._maxlat || point.lat<this._minlat){
        return false;
    }
    else{
        return true;
    }
}
PGISImageryProvider_V10.prototype.useWmtsForPgisV10 = function () {

    /*
      var optionsV10 = {
            url: "http://10.94.0.8:8080/tilemapserver/Maps/SX_DLG_TDT_2K",
            layer: 'layer0',
            format: "tiles",
            minimumLevel: 7,//需要显示的级别
            maximumLevel: 14,
            online: true,
        }
    */
    //?为什么在天地图非底图上在南北极有黑洞，而用在底图则没有
    /*return new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
        //url:'http://t0.tianditu.com/vec_w/wmts?',
        layer: 'vec',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'w',
        //credit: new Cesium.Credit('天地图全球矢量服务'),
        //subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        //maximumLevel: 15,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        //tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
    });*/
    /*var log={
        url: this._url,
        layer: this._layer,
        style: this._style,//'default',
        format: this._format,
        tileMatrixSetID: this._tileMatrixSetID,
        tilingScheme:this._tilingScheme
    };
    console.log(JSON.stringify(log));*/
        return new Cesium.WebMapTileServiceImageryProvider({
            url: this._url,
            layer: this._layer,
            style: this._style,//'default',
            format: this._format,
            tileMatrixSetID: this._tileMatrixSetID,
            tilingScheme:this._tilingScheme
        });
}

//PGISImageryProvider_V10.prototype.implocalserverforpgistile = function () {
    Cesium.defineProperties(PGISImageryProvider_V10.prototype, {
        url: {
            get: function () {
                return this._url;
            }
        },

        token: {
            get: function () {
                return this._token;
            }
        },

        proxy: {
            get: function () {
                return this._proxy;
            }
        },

        tileWidth: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('tileWidth must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._tileWidth;
            }
        },

        tileHeight: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('tileHeight must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._tileHeight;
            }
        },

        maximumLevel: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._maximumLevel;
            }
        },

        minimumLevel: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return 0;
            }
        },

        tilingScheme: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._tilingScheme;
            }
        },

        rectangle: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('rectangle must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._rectangle;
            }
        },

        tileDiscardPolicy: {
            get: function () {
                //>>includeStart('debug', pragmas.debug);
                if (!this._ready) {
                    throw new DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.');
                }
                //>>includeEnd('debug');

                return this._tileDiscardPolicy;
            }
        },

        errorEvent: {
            get: function () {
                return this._errorEvent;
            }
        },

        ready: {
            get: function () {
                return this._ready;
            }
        },

        readyPromise: {
            get: function () {
                return this._readyPromise.promise;
            }
        },

        credit: {
            get: function () {
                return this._credit;
            }
        },

        usingPrecachedTiles: {
            get: function () {
                return this._useTiles;
            }
        },

        hasAlphaChannel: {
            get: function () {
                return true;
            }
        },

        layers: {
            get: function () {
                return this._layers;
            }
        }
    });

    PGISImageryProvider_V10.prototype.getTileCredits = function (x, y, level) {
        return undefined;
    };

    PGISImageryProvider_V10.prototype.requestImage = function (x, y, level) {
        if (!this._ready) {
            throw new DeveloperError('requestImage must not be called before the imagery provider is ready.');
        }
        //wmts的方式（useWmtsForPgisV10;下载wmts到本地的方式（buildImageUrl_LocalServer）
        var url;
        if(this._mapType == 'pgisV10'&&this._PGISonline == false){ //pgisV11是wmts pgisV10
            if(this._tilesRule == 'arcgis'){
                url = this.buildImageUrl_LocalServer(this, x, y, level);//下载的wmts的数据以后，用自己的服务发布,arcgis切图的类型的
            }else{
                url = this.buildImageUrl_LocalServerWMTS(this, x, y, level);//下载的wmts的数据以后，用自己的服务发布
            }
        }
        else{
            url = this.buildImageUrl(this, x, y, level);
        }
        return Cesium.ImageryProvider.loadImage(this, url);
    };
//}
PGISImageryProvider_V10.prototype.buildImageUrl_LocalServer = function (imageryProvider, x, y, level) {
    //level = level - 7;

    var url = imageryProvider._url + "/_alllayers/L{z}/R{y}/C{x}.png";
    var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
    var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);
    //注意瓦片行列号计算
    //瓦片数据放在cesium的本地服务中
    //扩展PGISImageryProvider，设置第0级分辨率，所谓第0级，对于自定义地图来说可以认为是
    //横向和纵向瓦片为整数的级别，cesium会更经纬度范围和图片数目，计算分辨率，因此不能使用pgis真是的0级作为imageryprovider的0级
    //算法：
    //横向瓦片总数量：tileW，由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileW/2；而cesium计算是从-180开始，因此x - tileW / 2
    //纵向瓦片总数量：tileH,由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileH/2;而cesium计算从90开始，因此tileH / 2 - y - 1
    //为什么纵向需要多减去1：最上面的一张瓦片如果用00点为起点编号是tileH / 2 - 1
    var x16 = x.toString(16);
    var y16 = y.toString(16);
    var ll2 = level + 1;
    if (ll2 < 10) {
        ll2 =  (Array(2).join('0') + ll2).slice(-2);
    }

    x16 = (Array(8).join('0') + x16).slice(-8);
    y16 = (Array(8).join('0') + y16).slice(-8);
    url = url
            .replace('{x}', x16)
            .replace('{y}', y16)
            .replace('{z}', ll2);

    var xx = x;
    var yy = y;
    var ll = level + 1;
    if (xx < 0 || yy < 0 || ll > this._maximumLevel || ll < this._minimumLevel) {
        return "";
    }

    return url;
    return 'http://localhost:8080/Apps/Demo/pgis1.0/SXMap/SX_DLG_TDT_2K/Layers/_alllayers/C0000019d.png';
};

PGISImageryProvider_V10.prototype.buildImageUrl_LocalServerWMTS = function (imageryProvider, x, y, level) {
    //level = level - 7;

    var url = imageryProvider._url + "/{z}/{x}/{y}.png";
    var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
    var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);
    //注意瓦片行列号计算
    //瓦片数据放在cesium的本地服务中
    //扩展PGISImageryProvider，设置第0级分辨率，所谓第0级，对于自定义地图来说可以认为是
    //横向和纵向瓦片为整数的级别，cesium会更经纬度范围和图片数目，计算分辨率，因此不能使用pgis真是的0级作为imageryprovider的0级
    //算法：
    //横向瓦片总数量：tileW，由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileW/2；而cesium计算是从-180开始，因此x - tileW / 2
    //纵向瓦片总数量：tileH,由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileH/2;而cesium计算从90开始，因此tileH / 2 - y - 1
    //为什么纵向需要多减去1：最上面的一张瓦片如果用00点为起点编号是tileH / 2 - 1
    
    url = url
            .replace('{x}', x)
            .replace('{y}', y)
            .replace('{z}', level+1);

    var xx = x;
    var yy = y;
    var ll = level + 1;
    if (xx < 0 || yy < 0 || ll > this._maximumLevel || ll < this._minimumLevel) {
        return "";
    }

    return url;
    return 'http://localhost:8080/Apps/Demo/pgis1.0/SXMap/SX_DLG_TDT_2K/Layers/_alllayers/C0000019d.png';
};

PGISImageryProvider_V10.prototype.buildImageUrl = function (imageryProvider, x, y, level) {
    //如果瓦片查出范围则不请求
    var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
    var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);
    var curresolution = 360.0/tileW/256.0;

    var url = imageryProvider._url + "&Zoom={z}&Row={y}&Col={x}&V=1.0&key=";
    url = url
            .replace('{x}', x)
            .replace('{y}', y)
            .replace('{z}', level+1);

    var xx = x;
    var yy = y;
    var ll = level + 1;

    var tilelon = xx * 256 * curresolution-180;
    var tilelat = 90.0-yy * 256 * curresolution;
    var point = {};
    point.lon = tilelon;
    point.lat = tilelat;

    if (xx < 0 || yy < 0 || ll > this._maximumLevel || ll < this._minimumLevel || !this.InBaseLayerRectangle(point)) {
        return "";
    }

    return url;
}


