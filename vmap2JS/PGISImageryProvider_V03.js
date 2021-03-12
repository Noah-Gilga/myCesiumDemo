
/*
options
{
  version:0.3,   //0.3表示最老的pgis地图 ，1.0表示支持wmts
  url:pgis服务的url,
  online:false  //false表示下载地图到本地，然后通过本地服务发布；true表示直接从PGIS服务获取瓦片
  wkid:4326,//4326:wgs84
  tileWidth：256,
  tileHeight：256,
}
*/
function PGISImageryProvider(options) {
    if (options == undefined) {
        //默认从本地服务获取
    }
    else
    {
        if (options.version != undefined && options.version == 0.3) {
            return new PGISImageryProvider_V03(options);
        }
        else if(options.version != undefined && options.version == 1.0){

        }
    }
}
function PGISImageryProvider_V03(options) {

    //this._url = "http://online1.map.bdimg.com/onlinelabel/?qt=tile";
    //this._url = "http://localhost:8080/Apps/Demo/pgis0.3/zssl"; //瓦片url:http://localhost:8080/Apps/Demo/pgis0.3/zssl/L1/R1/C1.png  pgis:http://10.1.12.18/PGIS_s_LWTileMap/Maps/beijingSL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col=468&Row=159&Zoom=11&V=0.3
    this._url = options.url;

    if (options.format == undefined) {
        this._tileformat = "png";
    } else {
        this._tileformat = options.format;
    }
    
    this._tileWidth = 256;
    this._tileHeight = 256;

    if (options.minimumLevel != undefined) {
        this._minimumLevel = options.minimumLevel;
    } else {
        this._minimumLevel = 7;
    }

    if (options.maximumLevel != undefined) {
        this._maximumLevel = options.maximumLevel;
    } else {
        this._maximumLevel = 20;
    }

    if (options.originX != undefined) {
        this._originX = options.originX;
    }

    if (options.originY != undefined) {
        this._originY = options.originY;
    }

    //this._minimumLevel = options.minimumLevel;  //对应第7级
    //this._maximumLevel = options.maximumLevel;  //对应第10级

    if (options.online != undefined) {
        this._PGISonline = options.online;
    }

    //var rectangleSouthwestInMeters = new Cesium.Cartesian2(-25165824, -25165824);
    //var rectangleNortheastInMeters = new Cesium.Cartesian2(25165824, 25165824);
    //this._tilingScheme = new Cesium.WebMercatorTilingScheme({rectangleSouthwestInMeters:rectangleSouthwestInMeters,rectangleNortheastInMeters:rectangleNortheastInMeters});

    //以下设置rect 报错
    //var west = new Cesium.Math.toRadians(-180.0);
    //var east = new Cesium.Math.toRadians(180.0);
    //var south = new Cesium.Math.toRadians(-90.0);
    //var nort = new Cesium.Math.toRadians(90.0);
    //var Rect = new Cesium.Rectangle(west, south, east, nort);
    //var Rect = new Cesium.Rectangle(-Cesium.Pi, -Cesium.Pi/2, Cesium.Pi, Cesium.Pi/2.0);

    //rectangle: [121.3, 29.32, 123.25, 31.04]
    if (options.rectangle != undefined) {
        this._minlon = options.rectangle[0];
        this._minlat = options.rectangle[1];
        this._maxlon = options.rectangle[2];
        this._maxlat = options.rectangle[3];
    }
    //pgis
    this._tilingScheme = new Cesium.GeographicTilingScheme({ numberOfLevelZeroTilesX: 90, numberOfLevelZeroTilesY: 45 });//真实pgis的第7级对应cesium中的第0级

    // this._tilingScheme = new Cesium.GeographicTilingScheme();
    this._credit = undefined;
    this._rectangle = this._tilingScheme.rectangle;
    this._ready = true;
}

PGISImageryProvider_V03.prototype.InBaseLayerRectangle = function(point){
    if(point.lon< this._minlon ||  point.lon>this._maxlon || point.lat>this._maxlat || point.lat<this._minlat){
        return false;
    }
    else{
        return true;
    }
}
PGISImageryProvider_V03.prototype.buildImageUrl = function(imageryProvider, x, y, level) {
    //level = level - 7;
    //cesium中 pgis级别从第7级开始
    var url = "";
    if(this._PGISonline==false){
       url = imageryProvider._url + "/L{z}/R{y}/C{x}.{f}";
    }
    else{
        url = imageryProvider._url + "/EzMap?Service=getImage&ZoomOffset=0&V=0.3&Zoom={z}&Row={y}&Col={x}";//.{f}
    }
    
    var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
    var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);

    //判断xylevel 是否在当前地图

    //注意瓦片行列号计算
    //瓦片数据放在cesium的本地服务中
    //扩展PGISImageryProvider，设置第0级分辨率，所谓第0级，对于自定义地图来说可以认为是
    //横向和纵向瓦片为整数的级别，cesium会更经纬度范围和图片数目，计算分辨率，因此不能使用pgis真是的0级作为imageryprovider的0级
    //算法：
    //横向瓦片总数量：tileW，由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileW/2；而cesium计算是从-180开始，因此x - tileW / 2
    //纵向瓦片总数量：tileH,由于pgis的中心点在00点，因此中国的瓦片编号在0-》》》tileH/2;而cesium计算从90开始，因此tileH / 2 - y - 1
    //为什么纵向需要多减去1：最上面的一张瓦片如果用00点为起点编号是tileH / 2 - 1
    var xx = x - tileW / 2;
    var yy = tileH / 2 - y - 1;
    var ll = level + 7;
    var curresolution = 2 / Math.pow(2,ll);

    if(this._originX ==0&&this._originY==90){
        yy = tileH - y - 1;
    }

    url = url
    .replace('{x}', xx)
    .replace('{y}', yy)
    .replace('{z}', ll)
    .replace('{f}',imageryProvider._tileformat);


    var tilelon = xx * 256 * curresolution;
    var tilelat = yy * 256 * curresolution;
    var point = {};
    point.lon = tilelon;
    point.lat = tilelat;

    if ((xx < 0 || yy < 0 || ll > this._maximumLevel || ll < this._minimumLevel || !this.InBaseLayerRectangle(point)) && ll>7) {//chkun null
        return "";
    }

    return url;
}

Cesium.defineProperties(PGISImageryProvider_V03.prototype,
{
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

PGISImageryProvider_V03.prototype.getTileCredits = function (x, y, level) {
    return undefined;
};

PGISImageryProvider_V03.prototype.requestImage = function (x, y, level) {
    if (!this._ready) {
        throw new DeveloperError('requestImage must not be called before the imagery provider is ready.');
    }

    var url = this.buildImageUrl(this, x, y, level);
    return Cesium.ImageryProvider.loadImage(this, url);
};