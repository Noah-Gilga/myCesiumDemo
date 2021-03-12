
/*
options
{
  version:0.3,   //0.3��ʾ���ϵ�pgis��ͼ ��1.0��ʾ֧��wmts
  url:pgis�����url,
  online:false  //false��ʾ���ص�ͼ�����أ�Ȼ��ͨ�����ط��񷢲���true��ʾֱ�Ӵ�PGIS�����ȡ��Ƭ
  wkid:4326,//4326:wgs84
  tileWidth��256,
  tileHeight��256,
}
*/
function PGISImageryProvider(options) {
    if (options == undefined) {
        //Ĭ�ϴӱ��ط����ȡ
    }
    else
    {
        if (options.version != undefined && options.version == 0.3) {
            return new PGISImageryProvider_V03_local(options);
        }
        else if(options.version != undefined && options.version == 1.0){

        }
    }
}
function PGISImageryProvider_V03_local(options) {

    //this._url = "http://online1.map.bdimg.com/onlinelabel/?qt=tile";
    //this._url = "http://localhost:8080/Apps/Demo/pgis0.3/zssl"; //��Ƭurl:http://localhost:8080/Apps/Demo/pgis0.3/zssl/L1/R1/C1.png  pgis:http://10.1.12.18/PGIS_s_LWTileMap/Maps/beijingSL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col=468&Row=159&Zoom=11&V=0.3
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
    //this._minimumLevel = options.minimumLevel;  //��Ӧ��7��
    //this._maximumLevel = options.maximumLevel;  //��Ӧ��10��

    if (options.online != undefined) {
        this._PGISonline = options.online;
    }

    //var rectangleSouthwestInMeters = new Cesium.Cartesian2(-25165824, -25165824);
    //var rectangleNortheastInMeters = new Cesium.Cartesian2(25165824, 25165824);
    //this._tilingScheme = new Cesium.WebMercatorTilingScheme({rectangleSouthwestInMeters:rectangleSouthwestInMeters,rectangleNortheastInMeters:rectangleNortheastInMeters});

    //��������rect ����
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
    this._tilingScheme = new Cesium.GeographicTilingScheme({ numberOfLevelZeroTilesX: 90, numberOfLevelZeroTilesY: 45 });//��ʵpgis�ĵ�7����Ӧcesium�еĵ�0��

    // this._tilingScheme = new Cesium.GeographicTilingScheme();
    this._credit = undefined;
    this._rectangle = this._tilingScheme.rectangle;
    this._ready = true;
}

PGISImageryProvider_V03_local.prototype.InBaseLayerRectangle = function(point){
    if(point.lon< this._minlon ||  point.lon>this._maxlon || point.lat>this._maxlat || point.lat<this._minlat){
        return false;
    }
    else{
        return true;
    }
}
PGISImageryProvider_V03_local.prototype.buildImageUrl = function(imageryProvider, x, y, level) {
    //level = level - 7;
    //cesium�� pgis����ӵ�7����ʼ
    var url = "";
    if(this._PGISonline==false){
       url = imageryProvider._url + "/L{z}/R{y}/C{x}.{f}";
    }
    else{
        url = imageryProvider._url + "/EzMap?Service=getImage&ZoomOffset=0&V=0.3&Zoom={z}&Row={y}&Col={x}.{f}";
    }
    
    var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
    var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);

    //�ж�xylevel �Ƿ��ڵ�ǰ��ͼ

    //ע����Ƭ���кż���
    //��Ƭ���ݷ���cesium�ı��ط�����
    //��չPGISImageryProvider�����õ�0���ֱ��ʣ���ν��0���������Զ����ͼ��˵������Ϊ��
    //�����������ƬΪ�����ļ���cesium�����γ�ȷ�Χ��ͼƬ��Ŀ������ֱ��ʣ���˲���ʹ��pgis���ǵ�0����Ϊimageryprovider��0��
    //�㷨��
    //������Ƭ��������tileW������pgis�����ĵ���00�㣬����й�����Ƭ�����0-������tileW/2����cesium�����Ǵ�-180��ʼ�����x - tileW / 2
    //������Ƭ��������tileH,����pgis�����ĵ���00�㣬����й�����Ƭ�����0-������tileH/2;��cesium�����90��ʼ�����tileH / 2 - y - 1
    //Ϊʲô������Ҫ���ȥ1���������һ����Ƭ�����00��Ϊ�������tileH / 2 - 1
    url = url
            .replace('{x}', x - tileW / 2)
            .replace('{y}', tileH / 2 - y - 1)
            .replace('{z}', level + 7)
           .replace('{f}',imageryProvider._tileformat);

    var xx = x - tileW / 2;
    var yy = tileH / 2 - y - 1;
    var ll = level + 7;
    var curresolution = 2.0 / Math.pow(2,ll);

    var tilelon = xx * 256 * curresolution;
    var tilelat = yy * 256 * curresolution;
    var point = {};
    point.lon = tilelon;
    point.lat = tilelat;

    //if (xx < 0 || yy < 0 || ll > this._maximumLevel || ll < this._minimumLevel || !this.InBaseLayerRectangle(point)) {
       // return "";
    //}

    var locallevel = ll.toString();
    var localrow = yy.toString();
    var localcol = xx.toString();
    var tileformat=".png";
    //var localpath = "X:\\chkun\\vtron_cesium_MapEngine2.0\\cesium-vismart\\Cesium-1.44\\Apps\\Demo\\pgis0.3\\njsl" + "\\"+locallevel+"\\"+localrow+"\\"+localcol+tileformat; 
    var localpath =  imageryProvider._url + "\\"+locallevel+"\\"+localcol+"\\"+localrow+tileformat;  
    if(url.indexOf("http")>0){
        return url;
    }
    else{
        return localpath;
    }
  
}

Cesium.defineProperties(PGISImageryProvider_V03_local.prototype,
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

PGISImageryProvider_V03_local.prototype.getTileCredits = function (x, y, level) {
    return undefined;
};

PGISImageryProvider_V03_local.prototype.requestImage = function (x, y, level) {
    if (!this._ready) {
        throw new DeveloperError('requestImage must not be called before the imagery provider is ready.');
    }

    var url = this.buildImageUrl(this, x, y, level);
    return Cesium.ImageryProvider.loadImage(this, url);
};