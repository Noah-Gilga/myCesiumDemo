
(function(window){
    'use strict';
	
    function define_CesiumHeatmap_webgl() {
        var CesiumHeatmap_webgl = {
			defaults: {
				useEntitiesIfAvailable: true, //whether to use entities if a Viewer is supplied or always use an ImageryProvider
				minCanvasSize: 2304,//2304,          // minimum size (in pixels) for the heatmap canvas  700
				maxCanvasSize: 3840,//3840,          // maximum size (in pixels) for the heatmap canvas 2000
				radiusFactor: 60,             // data point size factor used if no radius is given (the greater of height and width divided by this number yields the used radius)
				spacingFactor: 1.0,           // extra space around the borders (point radius multiplied by this number yields the spacing)
				maxOpacity: 0.8,              // the maximum opacity used if not given in the heatmap options object
				minOpacity: 0.1,              // the minimum opacity used if not given in the heatmap options object
				blur: 0.85,                   // the blur used if not given in the heatmap options object ,模糊度？
        gradient: {                   // the gradient used if not given in the heatmap options object
					'.4': 'rgb(1.0,0,0)',//'.3': 'blue',
					'.6': 'rgb(1.0,1.0,0)',//'.65': 'green',
					'.8': 'rgb(0,1.0,0)',//'.8': 'yellow',
          '.85': 'rgb(0,0,1.0)',//'.95': 'red'
        },
				intensity:0.3
			}
		};
		
		/*  Create a CesiumHeatmap instance
		 *
		 *  cesium:  the CesiumWidget or Viewer instance
		 *  bb:      the WGS84 bounding box like {north, east, south, west}
		 *  options: a heatmap.js options object (see http://www.patrick-wied.at/static/heatmapjs/docs.html#h337-create)
		 */
		CesiumHeatmap_webgl.create = function(cesium, bb, options) {
			var instance = new CHInstance_webgl(cesium, bb, options);
			return instance;
		};
		
		CesiumHeatmap_webgl._getContainer = function(width, height, id) {
			var c = document.createElement("div");
			if (id) { c.setAttribute("id", id); }
			c.setAttribute("style", "width: " + width + "px; height: " + height + "px; margin: 0px;display: none;");//chkun ; display: none
			document.body.appendChild(c);
			return c;
		};
		
		CesiumHeatmap_webgl._getImageryProvider = function(instance) {

      // var d = instance._heatmap_WebGL.canvas.getDataURL();
      var d = instance._heatmap_WebGL.canvas.toDataURL();
      instance._cesium.testcanvas = d;
			var imgprov = new Cesium.SingleTileImageryProvider({
				url: d,
				rectangle : instance._rectangle //Cesium.Rectangle.fromDegrees(89.99590185965411, 9.99999999999999, 120.00409814034585, 39.999999999999986)
			});
			//console.log("Create imageryprovider: " + ((new Date()).getTime() - n));
			
			// imgprov._tilingScheme = new Cesium.WebMercatorTilingScheme({
			// 	rectangleSouthwestInMeters: new Cesium.Cartesian2(instance._mbounds.west, instance._mbounds.south),
			// 	rectangleNortheastInMeters: new Cesium.Cartesian2(instance._mbounds.east, instance._mbounds.north)
			// });
			
			return imgprov;
		};
		
		CesiumHeatmap_webgl._getID = function(len) {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < ((len) ? len : 8); i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		};
		
		var WMP = new Cesium.WebMercatorProjection();
		
		/*  Convert a WGS84 location into a mercator location
		 *
		 *  p: the WGS84 location like {x: lon, y: lat}
		 */
		CesiumHeatmap_webgl.wgs84ToMercator = function(p) {
			var mp = WMP.project(Cesium.Cartographic.fromDegrees(p.x, p.y));
			return {
				x: mp.x,
				y: mp.y
			};
		};
		
		/*  Convert a WGS84 bounding box into a mercator bounding box
		 *
		 *  bb: the WGS84 bounding box like {north, east, south, west}
		 */
		CesiumHeatmap_webgl.wgs84ToMercatorBB = function(bb) {
			var sw = WMP.project(Cesium.Cartographic.fromDegrees(bb.west, bb.south));
			var ne = WMP.project(Cesium.Cartographic.fromDegrees(bb.east, bb.north));
			return {
				north: ne.y,
				east: ne.x,
				south: sw.y,
				west: sw.x
			};
		};
		
		/*  Convert a mercator location into a WGS84 location
		 *
		 *  p: the mercator lcation like {x, y}
		 */
		CesiumHeatmap_webgl.mercatorToWgs84 = function(p) {
			var wp = WMP.unproject(new Cesium.Cartesian3(p.x, p.y));
			return {
				x: wp.longitude,
				y: wp.latitude
			};
		};
		
		/*  Convert a mercator bounding box into a WGS84 bounding box
		 *
		 *  bb: the mercator bounding box like {north, east, south, west}
		 */
		CesiumHeatmap_webgl.mercatorToWgs84BB = function(bb) {
			var sw = WMP.unproject(new Cesium.Cartesian3(bb.west, bb.south));
			var ne = WMP.unproject(new Cesium.Cartesian3(bb.east, bb.north));
			return {
				north: this.rad2deg(ne.latitude),
				east: this.rad2deg(ne.longitude),
				south: this.rad2deg(sw.latitude),
				west: this.rad2deg(sw.longitude)
			};
		};
		
		/*  Convert degrees into radians
		 *
		 *  d: the degrees to be converted to radians
		 */
		CesiumHeatmap_webgl.deg2rad = function(d) {
			var r = d * (Math.PI / 180.0);
			return r;
		};
		
		/*  Convert radians into degrees
		 *
		 *  r: the radians to be converted to degrees
		 */
		CesiumHeatmap_webgl.rad2deg = function(r) {
			var d = r / (Math.PI / 180.0);
			return d;
		};
		
        return CesiumHeatmap_webgl;
    }
	
    if(typeof(CesiumHeatmap_webgl) === 'undefined'){
        window.CesiumHeatmap_webgl = define_CesiumHeatmap_webgl();
    } else { console.log("CesiumHeatmap_webgl already defined."); }
})(window);

/*  Initiate a CesiumHeatmap_webgl instance
 *
 *  c:  CesiumWidget instance
 *  bb: a WGS84 bounding box like {north, east, south, west}
 *  o:  a heatmap.js options object (see http://www.patrick-wied.at/static/heatmapjs/docs.html#h337-create)
 */

var heatmap_canvas;
var gheatmap_instance;
function CHInstance_webgl(c, bb, o) {
	if (!bb) { return null; }
	if (!o) { o = {}; }

	//webglheatmap_tmp = c;//chkun

	this._cesium = c;
	this._options = o;
	this._id = "vtronheatmap";//CesiumHeatmap_webgl._getID();
	
	this._options.gradient = ((this._options.gradient) ? this._options.gradient : CesiumHeatmap_webgl.defaults.gradient);
	this._options.maxOpacity = ((this._options.maxOpacity) ? this._options.maxOpacity : CesiumHeatmap_webgl.defaults.maxOpacity);
	this._options.minOpacity = ((this._options.minOpacity) ? this._options.minOpacity : CesiumHeatmap_webgl.defaults.minOpacity);
	this._options.blur = ((this._options.blur) ? this._options.blur : CesiumHeatmap_webgl.defaults.blur);
	
  //经纬度范围转成墨卡托范围
	this._mbounds = CesiumHeatmap_webgl.wgs84ToMercatorBB(bb);
  //根据墨卡托的纵横比，计算出canvas的宽高
  this._setWidthAndHeight(this._mbounds);
  //chkun 根据this._factor 修正墨卡托范围
  this._tmpMCenX = (this._mbounds.west + this._mbounds.east)/2.0;
  this._tmpMCenY = (this._mbounds.south + this._mbounds.north)/2.0;
	
	this._options.radius = Math.round((this._options.radius) ? this._options.radius : ((this.width > this.height) ? this.width / CesiumHeatmap_webgl.defaults.radiusFactor : this.height / CesiumHeatmap_webgl.defaults.radiusFactor));
	
	this._spacing = this._options.radius * CesiumHeatmap_webgl.defaults.spacingFactor*0.0;
	this._xoffset = this._mbounds.west;
	this._yoffset = this._mbounds.south;
	
  //chkun 有误差！
	//this.width = Math.round(this.width + this._spacing * 2);
	//this.height = Math.round(this.height + this._spacing * 2);
	// this._mbounds.west -= this._spacing * this._factor;
	// this._mbounds.east += this._spacing * this._factor;
	// this._mbounds.south -= this._spacing * this._factor;
  // this._mbounds.north += this._spacing * this._factor;
  this.width = Math.round(this.width + this._spacing * 2);
  this.height = Math.round(this.height + this._spacing * 2);
  this._mbounds.west = this._tmpMCenX - this.width/2.0*this._factor;
  this._mbounds.east = this._tmpMCenX + this.width/2.0*this._factor;
  this._mbounds.south = this._tmpMCenY - this.height/2.0*this._factor;
  this._mbounds.north = this._tmpMCenY + this.height/2.0*this._factor;
  // this._xoffset = this._mbounds.west;
  // this._yoffset = this._mbounds.south;
	
	this.bounds = CesiumHeatmap_webgl.mercatorToWgs84BB(this._mbounds);
  this._rectangle = Cesium.Rectangle.fromDegrees(this.bounds.west, this.bounds.south, this.bounds.east, this.bounds.north);

  //test
  this._xoffset = this.bounds.west;
  this._yoffset = this.bounds.south;
  this._tfw = (this.bounds.east - this.bounds.west )/this.width;
  this._tfh = (this.bounds.north - this.bounds.south )/this.height;



	//创建div
	this._container = CesiumHeatmap_webgl._getContainer(this.width, this.height, this._id);
	this._options.container = this._container;
	//this._heatmap = h337.create(this._options);//需要修改为heatmap-webgl
	var canvas = document.createElement('canvas');
	canvas.width = this.width;
	canvas.height = this.height;
	canvas.offsetWidth = this.width;
	canvas.offsetHeight = this.height;
	canvas.style.margin = 0;
	canvas.style.padding = 0;
	canvas.style.position = "absolute";
	canvas.class = "heatmap-canvas";
	document.body.appendChild(canvas);

	this._canvas = canvas;//记录canvas
	this._heatmapData = new Array();//记录前端应用传进来的热力点数据

  //canvas.style.overflow = "hidden"; 
  //ljyi将外面传进来的gradient值传进来
  CesiumHeatmap_webgl.defaults.gradient = this._options.gradient;
  this._heatmap_WebGL = createWebGLHeatmap({canvas: canvas, intensityToAlpha:true});
	//document.body.appendChild(this._heatmap_WebGL.canvas);

	this._container.appendChild(canvas);	
	this._container.children[0].setAttribute("id", this._id + "-hm");
	gheatmap_instance = this;
}
/*  Convert a WGS84 location to the corresponding heatmap location
 *
 *  p: a WGS84 location like {x:lon, y:lat}
 */
CHInstance_webgl.prototype.wgs84PointToHeatmapPoint = function(p) {
  //return this.mercatorPointToHeatmapPoint(CesiumHeatmap_webgl.wgs84ToMercator(p));
  return this.mercatorPointToHeatmapPoint(p);
};

/*  Convert a mercator location to the corresponding heatmap location
 *
 *  p: a WGS84 location like {x: lon, y:lat}
 */
CHInstance_webgl.prototype.mercatorPointToHeatmapPoint = function(p) {
	var pn = {};
	
	// pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing*0.0);
	// pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing*0.0);
  // pn.y = this.height - pn.y;

  //test
  pn.x = (p.x - this._xoffset) / this._tfw ;
	pn.y = (p.y - this._yoffset) / this._tfh;
  pn.y = this.height - pn.y;
	
	return pn;
};

CHInstance_webgl.prototype._setWidthAndHeight = function(mbb) {
	this.width = ((mbb.east > 0 && mbb.west < 0) ? mbb.east + Math.abs(mbb.west) : Math.abs(mbb.east - mbb.west));
	this.height = ((mbb.north > 0 && mbb.south < 0) ? mbb.north + Math.abs(mbb.south) : Math.abs(mbb.north - mbb.south));
	this._factor = 1;
	
	if (this.width > this.height && this.width > CesiumHeatmap_webgl.defaults.maxCanvasSize) {
		this._factor = this.width / CesiumHeatmap_webgl.defaults.maxCanvasSize;
		
		if (this.height / this._factor < CesiumHeatmap_webgl.defaults.minCanvasSize) {
			this._factor = this.height / CesiumHeatmap_webgl.defaults.minCanvasSize;
		}
	} else if (this.height > this.width && this.height > CesiumHeatmap_webgl.defaults.maxCanvasSize) {
		this._factor = this.height / CesiumHeatmap_webgl.defaults.maxCanvasSize;
		
		if (this.width / this._factor < CesiumHeatmap_webgl.defaults.minCanvasSize) {
			this._factor = this.width / CesiumHeatmap_webgl.defaults.minCanvasSize;
		}
	} else if (this.width < this.height && this.width < CesiumHeatmap_webgl.defaults.minCanvasSize) {
		this._factor = this.width / CesiumHeatmap_webgl.defaults.minCanvasSize;

		if (this.height / this._factor > CesiumHeatmap_webgl.defaults.maxCanvasSize) {
			this._factor = this.height / CesiumHeatmap_webgl.defaults.maxCanvasSize;
		}
	} else if (this.height < this.width && this.height < CesiumHeatmap_webgl.defaults.minCanvasSize) {
		this._factor = this.height / CesiumHeatmap_webgl.defaults.minCanvasSize;

		if (this.width / this._factor > CesiumHeatmap_webgl.defaults.maxCanvasSize) {
			this._factor = this.width / CesiumHeatmap_webgl.defaults.maxCanvasSize;
		}
	}
	this.width = this.width / this._factor;
	this.height = this.height / this._factor;
	
	//chkun测试
	/*this.width = ((mbb.east > 0 && mbb.west < 0) ? mbb.east + Math.abs(mbb.west) : Math.abs(mbb.east - mbb.west));
	this._factor = this.width/CesiumHeatmap_webgl.defaults.maxCanvasSize;
	this.width = CesiumHeatmap_webgl.defaults.minCanvasSize;
	this.height = this.height / this._factor;*/
};

/*  Set an array of heatmap locations
 *
 *  min:  the minimum allowed value for the data values
 *  max:  the maximum allowed value for the data values
 *  data: an array of data points in heatmap coordinates and values like {x, y, value}
 */
CHInstance_webgl.prototype.setData = function(min, max, data) {
	if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
    if (data == undefined || data.length==0){ return;};
    this.clear(false);
    //var scale = (1.0-this._options.intensity)/(this.maxValue-this.minValue);//每单位value对应的强度
    var scale = (1.0-this._options.intensity)/(max - min);//每单位value对应的强度
    for(var i = 0; i<data.length; i++){
      var gp = data[i];
      var instensity = this._options.intensity + (gp.value-min)*scale;//最大value对应颜色1.0，最小value对应初始化中的options.intensity，其它值在这中间
      this._heatmap_WebGL.addPoint(gp.x,gp.y, this._options.radius||gp.radius, instensity||this._options.intensity);//100，0.5
    }
    //ljyi heatmap颜色赋值start
		// for (var i = 0; i < data.length; i++) {
    //     var gp = data[i];
    //     //var instensity = this._options.intensity + (gp.value-min)*scale;//最大value对应颜色1.0，最小value对应初始化中的options.intensity，其它值在这中间
    //     //this._heatmap_WebGL.addPoint(gp.x,gp.y, gp.radius, instensity||this._options.intensity);//100，0.5
    //     //和色带中的值做对比
    //     if(!this._options.valueBar || this._options.valueBar.constructor != Array){
    //       //this._options.valueBar = [1,10,50,80,100,150]
    //       this._options.valueBar = [1,10,50,80]
    //     }
    //     //要先判断值域最小的
    //     for (var j = 0; j< this._options.valueBar.length; j++){
    //       if(gp.value >= this._options.valueBar[j] && gp.value < this._options.valueBar[j+1] && (j+1)!=this._options.valueBar.length){
    //         //data的value在色带的两个值之间
    //         //每个色带之间的intensity差值是0.1，从0.2开始
    //         var scale = 0.2 / (this._options.valueBar[j+1] - this._options.valueBar[j]);
    //         var intensity = 0.2*(j+1) + (gp.value - this._options.valueBar[j])*scale;//+0.2
    //         this._heatmap_WebGL.addPoint(gp.x,gp.y, this._options.radius||gp.radius, intensity||this._options.intensity);//100，0.5
    //         continue;
    //       }else if(gp.value < this._options.valueBar[0]){
    //         //如果data的value比色带设置的min值还要小，就给一个默认的this._options.minOpacity
    //         intensity = this._options.minOpacity || 0.1;
    //         this._heatmap_WebGL.addPoint(gp.x,gp.y, this._options.radius||gp.radius, intensity||this._options.intensity);//100，0.5
    //         continue;
    //       }else if (gp.value > this._options.valueBar[this._options.valueBar.length-1]){
    //         intensity = this._options.maxOpacity || 0.5;
    //         this._heatmap_WebGL.addPoint(gp.x,gp.y, this._options.radius||gp.radius, intensity||this._options.intensity);//100，0.5
    //         continue;
    //       }
    //     }
    // }
    //ljyi heatmap颜色赋值end
    this._heatmap_WebGL.update();
    this._heatmap_WebGL.display();
    this.updateLayer();//这个是通知cesium更新 暂时不改
    this._layer.update = true;
    
    //图例信息
    var v1=v2=v3=v4=v5=1;
    var varray = [];
    for(var i=0;i<5;i++){
      var value;
      if(this._maxValue==this._minValue){
        if(i*0.25<this._options.intensity)
            value = 0;
        else if(i*0.25-this._options.intensity<0.25){
            value = this._maxValue;
        }else{
          value = undefined;
        }
      }
      else{
        value = Math.floor(Math.max((i*0.25 -  this._options.intensity)/scale + this._minValue,0));
      }
      varray.push(value);
    }
  
    var hmlegend = {
      '0':varray[0],
      '0.25':varray[1],
      '0.50':varray[2],
      '0.75':varray[3],
      '1':varray[4]
    };
    this.hmlegend = hmlegend;
		return true;
	}
	
	return false;
};

/*  Set an array of WGS84 locations
 *
 *  min:  the minimum allowed value for the data values
 *  max:  the maximum allowed value for the data values
 *  data: an array of data points in WGS84 coordinates and values like { x:lon, y:lat, value }
 */
CHInstance_webgl.prototype.setWGS84Data = function(min, max, data) {
	if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
      var minValue = 600000;
      var maxValue = 1;
      if(this._minValue){
        minValue = this._minValue;
        maxValue = this._maxValue;
      }
		  var convdata = [];
		  for (var i = 0; i < data.length; i++) {
          var gp = data[i];

          this._heatmapData.push(gp);//chkun

          var hp = this.wgs84PointToHeatmapPoint(gp);
          if (gp.value || gp.value === 0) { hp.value = gp.value; }
          
            maxValue = Math.max(maxValue,gp.value);
            minValue = Math.min(minValue,gp.value);
            convdata.push(hp);
          }
      this._minValue = minValue;
      this._maxValue = maxValue;
      return this.setData(min, max, convdata);
    }
	
	return false;
};

CHInstance_webgl.prototype.setWGS84DataEx = function(min, max, data) {
	if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
      //预聚合
      this.clear(false);
      for (var i = 0; i < data.length; i++) {
        var gp = data[i];
        this._heatmapData.push(gp);
      }
      console.log("1");
      var clusterData = this.preCluster(this._heatmapData);
      console.log("2");
      var convdata = [];
      
      var minValue = 600000;
      var maxValue = 1;
      for (var i = 0; i < clusterData.length; i++) {
        var gp = clusterData[i];
        var hp = this.wgs84PointToHeatmapPoint(gp);
        if (gp.weight || gp.weight === 0) { hp.value = gp.weight; }	
        maxValue = gp.weight>maxValue?gp.weight:maxValue;
        minValue = gp.weight<minValue?gp.weight:minValue;
        convdata.push(hp);
      }
      this._minValue = minValue;
      this._maxValue = maxValue;
      return this.setData(min, max, convdata);
  }
  else{
      this.clear(false);
      var startTime = new Date();
      var clusterData = this.preCluster(this._heatmapData);
      var endTime = new Date();
      this.preClusterTime = endTime.getTime() - startTime.getTime();
      var convdata = [];
      
      for (var i = 0; i < clusterData.length; i++) {
        var gp = clusterData[i];
        var hp = this.wgs84PointToHeatmapPoint(gp);
        if (gp.value || gp.value === 0) { hp.value = gp.value; }	
        convdata.push(hp);
      }
		
		return this.setData(min, max, convdata);
  }
	
	return false;
};

CHInstance_webgl.prototype.setWGS84Data3 = function(min, max, data) {
	if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
      //预聚合
      this.clear(true);
      for (var i = 0; i < data.length; i++) {
        var gp = data[i];
        this._heatmapData.push(gp);
      }

      var convdata = [];
      
      var minValue = 600000;
      var maxValue = 1;
      for (var i = 0; i < this._heatmapData.length; i++) {
        var gp = this._heatmapData[i];
        var hp = this.wgs84PointToHeatmapPoint(gp);
        if (gp.value || gp.value == 0) { hp.value = gp.value; }	
        maxValue = gp.value>maxValue?gp.value:maxValue;
        minValue = gp.value<minValue?gp.value:minValue;
        hp.radius = gp.radius;
        convdata.push(hp);
      }
      this._minValue = minValue;
      this._maxValue = maxValue;
      return this.setData(min, max, convdata);
  }
	
	return false;
};

/*  Set whether or not the heatmap is shown on the map
 *
 *  s: true means the heatmap is shown, false means the heatmap is hidden
 */
CHInstance_webgl.prototype.show = function(s) {
	if (this._layer) {
		this._layer.show = s;
	}
};

/*
   chkun
   创建heatmap时设置rectangle的坐标范围可以调整
   默认的this._rectangle在高度>30000米时有效
   <30000时，则在鼠标wheel事件中，处理，不断修改大小
 */
//CHInstance_webgl.prototype.UpdateHeatmapRectangle = function(){
/*var UpdateHeatmapRectangle = function(){
  return;
	//获取相机高度
	var viewer = gheatmap_instance._cesium;//cesium viewr
	var height = Math.ceil(viewer.camera.positionCartographic.height);
    return  Cesium.Rectangle(gheatmap_instance._rectangle_update_src.west,gheatmap_instance._rectangle_update_src.south,gheatmap_instance._rectangle_update_src.east ,gheatmap_instance._rectangle_update_src.north);
    
    //初始时，热力图对应的地理范围和中心点
	var lonmin_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.west);
	var latmin_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.south);
	var lonmax_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.east);
	var latmax_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.north);

	//初始地理范围，墨卡托投影
	var lonmin = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmin_src,"y":latmin_src}).x;
	var latmin = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmin_src,"y":latmin_src}).y;
	var lonmax = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmax_src,"y":latmax_src}).x;
	var latmax = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmax_src,"y":latmax_src}).y;

	var cenlon = (lonmax+lonmin)/2;
	var cenlat = (latmax+latmin)/2;

    //初始时，绘制热力图的画布宽和高，分辨率：一个像素对应的米
	var canvas_width = gheatmap_instance._canvas.width;
	var canvas_height = gheatmap_instance._canvas.height;
	var factor_mwp = (lonmax-lonmin)/canvas_width;
    
    var height_factor = 2000;//高度阈值
    var resolution_factor_zero = 1;//高度为0米时，canvas分辨率
    var resolution_factor_height = factor_mwp;//高度>2000，时使用的分辨率
    var resolution_metre = (factor_mwp-resolution_factor_zero)/height_factor;
    if(height<height_factor&&false){
    	var curresolution_heatmap = factor_mwp-(height_factor-height)*resolution_metre;
    	//curresolution_heatmap = 0.001;
        lonmin = cenlon-(canvas_width/2*curresolution_heatmap);
        lonmax = cenlon+(canvas_width/2*curresolution_heatmap);
        latmin = cenlat-(canvas_height/2*curresolution_heatmap);
        latmax = cenlat+(canvas_height/2*curresolution_heatmap);

        //坐标计算	
		//pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing);
		//pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing);
		//pn.y = this.height - pn.y;
		//var llmin = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmin,"y":latmin});
		//var llmax = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmax,"y":latmax});
		gheatmap_instance._xoffset = lonmin,
		gheatmap_instance._yoffset = lonmax;
		gheatmap_instance._factor = (lonmax-lonmin)/canvas_width;
		gheatmap_instance._spacing = gheatmap_instance._options.radius * CesiumHeatmap_webgl.defaults.spacingFactor;

        //rect发生改变，需要清空热力图，并重绘
        //gheatmap_instance._AddPointsAndUpdate();
    }

    lonmin = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmin,"y":latmin}).x;
    latmin = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmin,"y":latmin}).y;
	lonmax = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmax,"y":latmax}).x;
	latmax = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmax,"y":latmax}).y;
    //return  Cesium.Rectangle.fromDegrees(lonmin,latmin,lonmax ,latmax);
    return  Cesium.Rectangle.fromDegrees(gheatmap_instance._rectangle_update_src.west,gheatmap_instance._rectangle_update_src.south,gheatmap_instance._rectangle_update_src.east ,gheatmap_instance._rectangle_update_src.north);
}*/
var UpdateHeatmapRectangle = function(){
//获取相机高度
	var viewer = gheatmap_instance._cesium;//cesium viewr
	var height = Math.ceil(viewer.camera.positionCartographic.height);
  
    //初始时，热力图对应的地理范围和中心点
	var lonmin_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.west);
	var latmin_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.south);
	var lonmax_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.east);
	var latmax_src = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_src.north);

	//初始地理范围，墨卡托投影
	var lonmin = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmin_src,"y":latmin_src}).x;
	var latmin = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmin_src,"y":latmin_src}).y;
	var lonmax = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmax_src,"y":latmax_src}).x;
	var latmax = CesiumHeatmap_webgl.wgs84ToMercator({"x":lonmax_src,"y":latmax_src}).y;

	var cenlon = (lonmax+lonmin)/2;
	var cenlat = (latmax+latmin)/2;

    //初始时，绘制热力图的画布宽和高，分辨率：一个像素对应的米
	var canvas_width = gheatmap_instance._canvas.width;
	var canvas_height = gheatmap_instance._canvas.height;
	var factor_mwp = (lonmax-lonmin)/canvas_width;
    
    var height_factor = 2000;//高度阈值
    var resolution_factor_zero = 1;//高度为0米时，canvas分辨率
    var resolution_factor_height = factor_mwp;//高度>2000，时使用的分辨率
    var resolution_metre = (factor_mwp-resolution_factor_zero)/height_factor;

	if(height<height_factor){
    	var curresolution_heatmap = factor_mwp-(height_factor-height)*resolution_metre;
    	//curresolution_heatmap = 0.001;
        lonmin = cenlon-(canvas_width/2*curresolution_heatmap);
        lonmax = cenlon+(canvas_width/2*curresolution_heatmap);
        latmin = cenlat-(canvas_height/2*curresolution_heatmap);
        latmax = cenlat+(canvas_height/2*curresolution_heatmap);

        //坐标计算	
		gheatmap_instance._xoffset = lonmin,
		gheatmap_instance._yoffset = latmin;
		gheatmap_instance._factor = (lonmax-lonmin)/canvas_width;
		gheatmap_instance._spacing = gheatmap_instance._options.radius * CesiumHeatmap_webgl.defaults.spacingFactor;

        //rect发生改变，需要清空热力图，并重绘
        gheatmap_instance._AddPointsAndUpdate();
    }

    var min = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmin,"y":latmin});
    var max = CesiumHeatmap_webgl.mercatorToWgs84({"x":lonmax,"y":latmax});
    lonmin = Cesium.Math.toDegrees(min.x);
    latmin = Cesium.Math.toDegrees(min.y);
	lonmax = Cesium.Math.toDegrees(max.x);
	latmax = Cesium.Math.toDegrees(max.y);
	
 
    //lonmin = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_tmp.west);
	//latmin = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_tmp.south);
	//lonmax = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_tmp.east);
	//latmax = Cesium.Math.toDegrees(gheatmap_instance._rectangle_update_tmp.north);
    return  Cesium.Rectangle.fromDegrees(lonmin,latmin,lonmax ,latmax);
    
}
/*  Update/(re)draw the heatmap
 */
CHInstance_webgl.prototype.updateLayer = function() {
	//only works with a Viewer instance since the cesiumWidget instance doesn't contain an entities property
	if (CesiumHeatmap_webgl.defaults.useEntitiesIfAvailable && this._cesium.entities&&false) {
		if (this._layer == undefined) {
			this._layer = this._cesium.entities.add({
				show: true,
				rectangle: {
					coordinates: this._rectangle,
					//coordinates: new Cesium.CallbackProperty(UpdateHeatmapRectangle,false),
					material: this._heatmap_WebGL.canvas,
					//material: h,
					/*material: new Cesium.ImageMaterialProperty({
					            //image: this._heatmap_WebGL.canvas,  //chkun 这里需要修改
					            image:this._heatmap_WebGL.canvas,
					            transparent: true,
					            opacity: 0.5
					        }),*/
					//material:new Cesium.CallbackProperty(test,false),
				}
			});
		}	
	} else {
		// if (this._layer) {
		// 	this._cesium.scene.imageryLayers.remove(this._layer);
		// }
		
    if(!this._layer) {
       this._layer = this._cesium.scene.imageryLayers.addImageryProvider(CesiumHeatmap_webgl._getImageryProvider(this));
       this._layer.material =  this._heatmap_WebGL.canvas;
       this._layer.heatmap =  "Test";
    }
	}
};

/*
   clear heatmap
   deletedata:false 不清空数据，而是清空图像，方便做图像更新
   deletedata：true 清空数据，清空图像
 */
CHInstance_webgl.prototype.clear = function(deletedata=true){
	if(deletedata){
    this._heatmapData.splice(0,this._heatmapData.length);
    this._minValue = undefined;
    this._maxValue = undefined;
	}
	this._heatmap_WebGL.clear();
	this._heatmap_WebGL.update();
  this._heatmap_WebGL.display();
  if(this._layer){    //清空通知cesium
    this._layer.update = true;
  }
};

/*
   clear heatmap then add points and display 
 */
CHInstance_webgl.prototype._AddPointsAndUpdate = function(){
	this.clear(false);
	//add and render
	var convdata = [];
    for (var i = 0; i < this._heatmapData.length; i++) {

			var gp = this._heatmapData[i];

			var hp = this.wgs84PointToHeatmapPoint(gp);
			if (gp.value || gp.value === 0) { hp.value = gp.value; }
			
			convdata.push(hp);
	}
		
	return this.setData(0, 1000, convdata);
};

CHInstance_webgl.prototype._pointIsNeighbor = function(item, x, y, edgeX, edgeY) {
  if (item.x <= x + edgeX &&
      item.x >= x - edgeX &&
      item.y <= y + edgeY &&
      item.y >= y - edgeY)
      return true;
  return false;
};

CHInstance_webgl.prototype._splitInBlocks = function(jsonOrigin, edgeX, edgeY) {

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

      jsonOrigin[i]._clusted = false;
  }
  var width =  (maxX == minX)?1:(maxX - minX);//minX maxX是经纬度范围
  var height =  (maxY == minY)?1:(maxY - minY);//所有点的外包矩形
  // width =  (maxX == minX)?1:(maxX - minX);//minX maxX是经纬度范围
  // height = (maxY == minY)?1:(maxY - minY);//所有点的外包矩形

  var blockCountf = Math.sqrt(jsonOrigin.length / 1600)>=1?Math.sqrt(jsonOrigin.length / 1600):1;
  // if(blockCountf<=1){
  //   return {
  //       data: blocks,
  //       edgeX: edgeX,
  //       edgeY: edgeY
  //   };
  // }

  var row = Math.max(1, Math.ceil((height / width) * Math.sqrt(blockCountf)));
  var col = Math.max(1, Math.ceil((width / height) * Math.sqrt(blockCountf)));

  for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++)
          blocks.push([])
  }
  var stepX = width / col;
  var stepY = height / row;
  edgeX = stepX / 20;
  edgeY = stepY / 20;

  for (var i = 0; i < jsonOrigin.length; i++) {
      if (i % 1000 == 0)
          console.log('split index go.......', i)
      if (typeof (jsonOrigin[i].x) != 'number' ||
          typeof (jsonOrigin[i].y) != 'number')
          continue;
      var blockIndex = Math.min(row - 1, Math.floor((jsonOrigin[i].y - minY) / stepY)) * col + Math.min(col - 1, Math.floor((jsonOrigin[i].x - minX) / stepX));
      jsonOrigin[i].id = i;
      blocks[blockIndex].push(jsonOrigin[i])
  }
  return {
      data: blocks,
      edgeX: edgeX,
      edgeY: edgeY
  };
};
CHInstance_webgl.prototype._pointIsNeighbor = function(item, x, y, edgeX, edgeY) {
  if (item.x <= x + edgeX &&
      item.x >= x - edgeX &&
      item.y <= y + edgeY &&
      item.y >= y - edgeY)
      return true;
  return false;
};
CHInstance_webgl.prototype._splitPrevCluster = function(jsonOrigin, preClusterJson, edgeX, edgeY) {

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
          if (this._pointIsNeighbor(neighbor, preClusterItem.x, preClusterItem.y, edgeX, edgeY)) {
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
};
CHInstance_webgl.prototype.preCluster = function(jsonOrigin) {

  //if (jsonOrigin.length < 40000) //无需预先聚合，底图引擎可直接处理
      //return null;
  var preClusterJson = [];

  var blocks = this._splitInBlocks(jsonOrigin);
  
  var blockIndex = 0
  
  blocks.data.forEach(element => {
      console.log('pre cluster go.......', blockIndex++)
      this._splitPrevCluster(element, preClusterJson, blocks.edgeX, blocks.edgeY)
  });

  return preClusterJson;
};

/*  DON'T TOUCH:
* webgl-heatmap
 */
// Generated by CoffeeScript 1.8.0
(function() {
  var Framebuffer, Heights, Node, Shader, Texture, WebGLHeatmap, fragmentShaderBlit, nukeVendorPrefix, textureFloatShims, vertexShaderBlit,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  nukeVendorPrefix = function() {
    var getExtension, getSupportedExtensions, vendorRe, vendors;
    if (window.WebGLRenderingContext != null) {
      vendors = ['WEBKIT', 'MOZ', 'MS', 'O'];
      vendorRe = /^WEBKIT_(.*)|MOZ_(.*)|MS_(.*)|O_(.*)/;
      getExtension = WebGLRenderingContext.prototype.getExtension;
      WebGLRenderingContext.prototype.getExtension = function(name) {
        var extobj, match, vendor, _i, _len;
        match = name.match(vendorRe);
        if (match !== null) {
          name = match[1];
        }
        extobj = getExtension.call(this, name);
        if (extobj === null) {
          for (_i = 0, _len = vendors.length; _i < _len; _i++) {
            vendor = vendors[_i];
            extobj = getExtension.call(this, vendor + '_' + name);
            if (extobj !== null) {
              return extobj;
            }
          }
          return null;
        } else {
          return extobj;
        }
      };
      getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
      return WebGLRenderingContext.prototype.getSupportedExtensions = function() {
        var extension, match, result, supported, _i, _len;
        supported = getSupportedExtensions.call(this);
        result = [];
        for (_i = 0, _len = supported.length; _i < _len; _i++) {
          extension = supported[_i];
          match = extension.match(vendorRe);
          if (match !== null) {
            extension = match[1];
          }
          if (__indexOf.call(result, extension) < 0) {
            result.push(extension);
          }
        }
        return result;
      };
    }
  };

  textureFloatShims = function() {
    var checkColorBuffer, checkFloatLinear, checkSupport, checkTexture, createSourceCanvas, getExtension, getSupportedExtensions, name, shimExtensions, shimLookup, unshimExtensions, unshimLookup, _i, _len;
    createSourceCanvas = function() {
      var canvas, ctx, imageData;
      canvas = document.createElement('canvas');
      canvas.width = 2;
      canvas.height = 2;
      ctx = canvas.getContext('2d');
      imageData = ctx.getImageData(0, 0, 2, 2);
      imageData.data.set(new Uint8ClampedArray([0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]));
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    };
    createSourceCanvas();
    checkFloatLinear = function(gl, sourceType) {
      var buffer, cleanup, fragmentShader, framebuffer, positionLoc, program, readBuffer, result, source, sourceCanvas, sourceLoc, target, vertexShader, vertices;
      program = gl.createProgram();
      vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.attachShader(program, vertexShader);
      gl.shaderSource(vertexShader, 'attribute vec2 position;\nvoid main(){\n    gl_Position = vec4(position, 0.0, 1.0);\n}');
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(vertexShader);
      }
      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.attachShader(program, fragmentShader);
      gl.shaderSource(fragmentShader, 'uniform sampler2D source;\nvoid main(){\n    gl_FragColor = texture2D(source, vec2(1.0, 1.0));\n}');
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(fragmentShader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
      }
      gl.useProgram(program);
      cleanup = function() {
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteTexture(source);
        gl.deleteTexture(target);
        gl.deleteFramebuffer(framebuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.useProgram(null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      };
      target = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, target);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
      sourceCanvas = createSourceCanvas();
      source = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, source);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, sourceType, sourceCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      vertices = new Float32Array([1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1]);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      positionLoc = gl.getAttribLocation(program, 'position');
      sourceLoc = gl.getUniformLocation(program, 'source');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(sourceLoc, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      readBuffer = new Uint8Array(4 * 4);
      gl.readPixels(0, 0, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, readBuffer);
      result = Math.abs(readBuffer[0] - 127) < 10;
      cleanup();
      return result;
    };
    checkTexture = function(gl, targetType) {
      var target;
      target = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, target);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
      if (gl.getError() === 0) {
        gl.deleteTexture(target);
        return true;
      } else {
        gl.deleteTexture(target);
        return false;
      }
    };
    checkColorBuffer = function(gl, targetType) {
      var check, framebuffer, target;
      target = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, target);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
      framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
      check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.deleteTexture(target);
      gl.deleteFramebuffer(framebuffer);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (check === gl.FRAMEBUFFER_COMPLETE) {
        return true;
      } else {
        return false;
      }
    };
    shimExtensions = [];
    shimLookup = {};
    unshimExtensions = [];
    checkSupport = function() {
      var canvas, extobj, gl, halfFloatExt, halfFloatTexturing, singleFloatExt, singleFloatTexturing;
      canvas = document.createElement('canvas');
      gl = null;
      try {
        gl = canvas.getContext('experimental-webgl');
        if (gl === null) {
          gl = canvas.getContext('webgl');
        }
      } catch (_error) {}
      if (gl != null) {
        singleFloatExt = gl.getExtension('OES_texture_float');
        if (singleFloatExt === null) {
          if (checkTexture(gl, gl.FLOAT)) {
            singleFloatTexturing = true;
            shimExtensions.push('OES_texture_float');
            shimLookup.OES_texture_float = {
              shim: true
            };
          } else {
            singleFloatTexturing = false;
            unshimExtensions.push('OES_texture_float');
          }
        } else {
          if (checkTexture(gl, gl.FLOAT)) {
            singleFloatTexturing = true;
            shimExtensions.push('OES_texture_float');
          } else {
            singleFloatTexturing = false;
            unshimExtensions.push('OES_texture_float');
          }
        }
        if (singleFloatTexturing) {
          extobj = gl.getExtension('WEBGL_color_buffer_float');
          if (extobj === null) {
            if (checkColorBuffer(gl, gl.FLOAT)) {
              shimExtensions.push('WEBGL_color_buffer_float');
              shimLookup.WEBGL_color_buffer_float = {
                shim: true,
                RGBA32F_EXT: 0x8814,
                RGB32F_EXT: 0x8815,
                FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
                UNSIGNED_NORMALIZED_EXT: 0x8C17
              };
            } else {
              unshimExtensions.push('WEBGL_color_buffer_float');
            }
          } else {
            if (checkColorBuffer(gl, gl.FLOAT)) {
              shimExtensions.push('WEBGL_color_buffer_float');
            } else {
              unshimExtensions.push('WEBGL_color_buffer_float');
            }
          }
          extobj = gl.getExtension('OES_texture_float_linear');
          if (extobj === null) {
            if (checkFloatLinear(gl, gl.FLOAT)) {
              shimExtensions.push('OES_texture_float_linear');
              shimLookup.OES_texture_float_linear = {
                shim: true
              };
            } else {
              unshimExtensions.push('OES_texture_float_linear');
            }
          } else {
            if (checkFloatLinear(gl, gl.FLOAT)) {
              shimExtensions.push('OES_texture_float_linear');
            } else {
              unshimExtensions.push('OES_texture_float_linear');
            }
          }
        }
        halfFloatExt = gl.getExtension('OES_texture_half_float');
        if (halfFloatExt === null) {
          if (checkTexture(gl, 0x8D61)) {
            halfFloatTexturing = true;
            shimExtensions.push('OES_texture_half_float');
            halfFloatExt = shimLookup.OES_texture_half_float = {
              HALF_FLOAT_OES: 0x8D61,
              shim: true
            };
          } else {
            halfFloatTexturing = false;
            unshimExtensions.push('OES_texture_half_float');
          }
        } else {
          if (checkTexture(gl, halfFloatExt.HALF_FLOAT_OES)) {
            halfFloatTexturing = true;
            shimExtensions.push('OES_texture_half_float');
          } else {
            halfFloatTexturing = false;
            unshimExtensions.push('OES_texture_half_float');
          }
        }
        if (halfFloatTexturing) {
          extobj = gl.getExtension('EXT_color_buffer_half_float');
          if (extobj === null) {
            if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
              shimExtensions.push('EXT_color_buffer_half_float');
              shimLookup.EXT_color_buffer_half_float = {
                shim: true,
                RGBA16F_EXT: 0x881A,
                RGB16F_EXT: 0x881B,
                FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
                UNSIGNED_NORMALIZED_EXT: 0x8C17
              };
            } else {
              unshimExtensions.push('EXT_color_buffer_half_float');
            }
          } else {
            if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
              shimExtensions.push('EXT_color_buffer_half_float');
            } else {
              unshimExtensions.push('EXT_color_buffer_half_float');
            }
          }
          extobj = gl.getExtension('OES_texture_half_float_linear');
          if (extobj === null) {
            if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
              shimExtensions.push('OES_texture_half_float_linear');
              return shimLookup.OES_texture_half_float_linear = {
                shim: true
              };
            } else {
              return unshimExtensions.push('OES_texture_half_float_linear');
            }
          } else {
            if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
              return shimExtensions.push('OES_texture_half_float_linear');
            } else {
              return unshimExtensions.push('OES_texture_half_float_linear');
            }
          }
        }
      }
    };
    if (window.WebGLRenderingContext != null) {
      checkSupport();
      unshimLookup = {};
      for (_i = 0, _len = unshimExtensions.length; _i < _len; _i++) {
        name = unshimExtensions[_i];
        unshimLookup[name] = true;
      }
      getExtension = WebGLRenderingContext.prototype.getExtension;
      WebGLRenderingContext.prototype.getExtension = function(name) {
        var extobj;
        extobj = shimLookup[name];
        if (extobj === void 0) {
          if (unshimLookup[name]) {
            return null;
          } else {
            return getExtension.call(this, name);
          }
        } else {
          return extobj;
        }
      };
      getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
      WebGLRenderingContext.prototype.getSupportedExtensions = function() {
        var extension, result, supported, _j, _k, _len1, _len2;
        supported = getSupportedExtensions.call(this);
        result = [];
        for (_j = 0, _len1 = supported.length; _j < _len1; _j++) {
          extension = supported[_j];
          if (unshimLookup[extension] === void 0) {
            result.push(extension);
          }
        }
        for (_k = 0, _len2 = shimExtensions.length; _k < _len2; _k++) {
          extension = shimExtensions[_k];
          if (__indexOf.call(result, extension) < 0) {
            result.push(extension);
          }
        }
        return result;
      };
      return WebGLRenderingContext.prototype.getFloatExtension = function(spec) {
        var candidate, candidates, half, halfFramebuffer, halfLinear, halfTexture, i, importance, preference, result, single, singleFramebuffer, singleLinear, singleTexture, use, _j, _k, _l, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
        if (spec.prefer == null) {
          spec.prefer = ['half'];
        }
        if (spec.require == null) {
          spec.require = [];
        }
        if (spec.throws == null) {
          spec.throws = true;
        }
        singleTexture = this.getExtension('OES_texture_float');
        halfTexture = this.getExtension('OES_texture_half_float');
        singleFramebuffer = this.getExtension('WEBGL_color_buffer_float');
        halfFramebuffer = this.getExtension('EXT_color_buffer_half_float');
        singleLinear = this.getExtension('OES_texture_float_linear');
        halfLinear = this.getExtension('OES_texture_half_float_linear');
        single = {
          texture: singleTexture !== null,
          filterable: singleLinear !== null,
          renderable: singleFramebuffer !== null,
          score: 0,
          precision: 'single',
          half: false,
          single: true,
          type: this.FLOAT
        };
        half = {
          texture: halfTexture !== null,
          filterable: halfLinear !== null,
          renderable: halfFramebuffer !== null,
          score: 0,
          precision: 'half',
          half: true,
          single: false,
          type: (_ref = halfTexture != null ? halfTexture.HALF_FLOAT_OES : void 0) != null ? _ref : null
        };
        candidates = [];
        if (single.texture) {
          candidates.push(single);
        }
        if (half.texture) {
          candidates.push(half);
        }
        result = [];
        for (_j = 0, _len1 = candidates.length; _j < _len1; _j++) {
          candidate = candidates[_j];
          use = true;
          _ref1 = spec.require;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            name = _ref1[_k];
            if (candidate[name] === false) {
              use = false;
            }
          }
          if (use) {
            result.push(candidate);
          }
        }
        for (_l = 0, _len3 = result.length; _l < _len3; _l++) {
          candidate = result[_l];
          _ref2 = spec.prefer;
          for (i = _m = 0, _len4 = _ref2.length; _m < _len4; i = ++_m) {
            preference = _ref2[i];
            importance = Math.pow(2, spec.prefer.length - i - 1);
            if (candidate[preference]) {
              candidate.score += importance;
            }
          }
        }
        result.sort(function(a, b) {
          if (a.score === b.score) {
            return 0;
          } else if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          }
        });
        if (result.length === 0) {
          if (spec.throws) {
            throw 'No floating point texture support that is ' + spec.require.join(', ');
          } else {
            return null;
          }
        } else {
          result = result[0];
          return {
            filterable: result.filterable,
            renderable: result.renderable,
            type: result.type,
            precision: result.precision
          };
        }
      };
    }
  };

  nukeVendorPrefix();

  textureFloatShims();

  Shader = (function() {
    function Shader(gl, _arg) {
      var fragment, vertex;
      this.gl = gl;
      vertex = _arg.vertex, fragment = _arg.fragment;
      this.program = this.gl.createProgram();
      this.vs = this.gl.createShader(this.gl.VERTEX_SHADER);
      this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      this.gl.attachShader(this.program, this.vs);
      this.gl.attachShader(this.program, this.fs);
      this.compileShader(this.vs, vertex);
      this.compileShader(this.fs, fragment);
      this.link();
      this.value_cache = {};
      this.uniform_cache = {};
      this.attribCache = {};
    }

    Shader.prototype.attribLocation = function(name) {
      var location;
      location = this.attribCache[name];
      if (location === void 0) {
        location = this.attribCache[name] = this.gl.getAttribLocation(this.program, name);
      }
      return location;
    };

    Shader.prototype.compileShader = function(shader, source) {
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        throw "Shader Compile Error: " + (this.gl.getShaderInfoLog(shader));
      }
    };

    Shader.prototype.link = function() {
      this.gl.linkProgram(this.program);
      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        throw "Shader Link Error: " + (this.gl.getProgramInfoLog(this.program));
      }
    };

    Shader.prototype.use = function() {
      this.gl.useProgram(this.program);
      return this;
    };

    Shader.prototype.uniformLoc = function(name) {
      var location;
      location = this.uniform_cache[name];
      if (location === void 0) {
        location = this.uniform_cache[name] = this.gl.getUniformLocation(this.program, name);
      }
      return location;
    };

    Shader.prototype.int = function(name, value) {
      var cached, loc;
      cached = this.value_cache[name];
      if (cached !== value) {
        this.value_cache[name] = value;
        loc = this.uniformLoc(name);
        if (loc) {
          this.gl.uniform1i(loc, value);
        }
      }
      return this;
    };

    Shader.prototype.vec2 = function(name, a, b) {
      var loc;
      loc = this.uniformLoc(name);
      if (loc) {
        this.gl.uniform2f(loc, a, b);
      }
      return this;
    };

    Shader.prototype.float = function(name, value) {
      var cached, loc;
      cached = this.value_cache[name];
      if (cached !== value) {
        this.value_cache[name] = value;
        loc = this.uniformLoc(name);
        if (loc) {
          this.gl.uniform1f(loc, value);
        }
      }
      return this;
    };

    return Shader;

  })();

  Framebuffer = (function() {
    function Framebuffer(gl) {
      this.gl = gl;
      this.buffer = this.gl.createFramebuffer();
    }

    Framebuffer.prototype.destroy = function() {
      return this.gl.deleteFRamebuffer(this.buffer);
    };

    Framebuffer.prototype.bind = function() {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer);
      return this;
    };

    Framebuffer.prototype.unbind = function() {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      return this;
    };

    Framebuffer.prototype.check = function() {
      var result;
      result = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
      switch (result) {
        case this.gl.FRAMEBUFFER_UNSUPPORTED:
          throw 'Framebuffer is unsupported';
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
          throw 'Framebuffer incomplete attachment';
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
          throw 'Framebuffer incomplete dimensions';
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
          throw 'Framebuffer incomplete missing attachment';
      }
      return this;
    };

    Framebuffer.prototype.color = function(texture) {
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, texture.target, texture.handle, 0);
      this.check();
      return this;
    };

    Framebuffer.prototype.depth = function(buffer) {
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffer.id);
      this.check();
      return this;
    };

    Framebuffer.prototype.destroy = function() {
      return this.gl.deleteFramebuffer(this.buffer);
    };

    return Framebuffer;

  })();

  Texture = (function() {
    function Texture(gl, params) {
      var _ref, _ref1;
      this.gl = gl;
      if (params == null) {
        params = {};
      }
      this.channels = this.gl[((_ref = params.channels) != null ? _ref : 'rgba').toUpperCase()];
      if (typeof params.type === 'number') {
        this.type = params.type;
      } else {
        this.type = this.gl[((_ref1 = params.type) != null ? _ref1 : 'unsigned_byte').toUpperCase()];
      }
      switch (this.channels) {
        case this.gl.RGBA:
          this.chancount = 4;
          break;
        case this.gl.RGB:
          this.chancount = 3;
          break;
        case this.gl.LUMINANCE_ALPHA:
          this.chancount = 2;
          break;
        default:
          this.chancount = 1;
      }
      this.target = this.gl.TEXTURE_2D;
      this.handle = this.gl.createTexture();
    }

    Texture.prototype.destroy = function() {
      return this.gl.deleteTexture(this.handle);
    };

    Texture.prototype.bind = function(unit) {
      if (unit == null) {
        unit = 0;
      }
      if (unit > 15) {
        throw 'Texture unit too large: ' + unit;
      }
      this.gl.activeTexture(this.gl.TEXTURE0 + unit);
      this.gl.bindTexture(this.target, this.handle);
      return this;
    };

    Texture.prototype.setSize = function(width, height) {
      this.width = width;
      this.height = height;
      this.gl.texImage2D(this.target, 0, this.channels, this.width, this.height, 0, this.channels, this.type, null);
      return this;
    };

    Texture.prototype.upload = function(data) {
      this.width = data.width;
      this.height = data.height;
      this.gl.texImage2D(this.target, 0, this.channels, this.channels, this.type, data);
      return this;
    };

    Texture.prototype.linear = function() {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      return this;
    };

    Texture.prototype.nearest = function() {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      return this;
    };

    Texture.prototype.clampToEdge = function() {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      return this;
    };

    Texture.prototype.repeat = function() {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
      return this;
    };

    return Texture;

  })();

  Node = (function() {
    function Node(gl, width, height) {
      var floatExt;
      this.gl = gl;
      this.width = width;
      this.height = height;
      floatExt = this.gl.getFloatExtension({
        require: ['renderable']
      });
      this.texture = new Texture(this.gl, {
        type: floatExt.type
      }).bind(0).setSize(this.width, this.height).nearest().clampToEdge();
      this.fbo = new Framebuffer(this.gl).bind().color(this.texture).unbind();
    }

    Node.prototype.use = function() {
      return this.fbo.bind();
    };

    Node.prototype.bind = function(unit) {
      return this.texture.bind(unit);
    };

    Node.prototype.end = function() {
      return this.fbo.unbind();
    };

    Node.prototype.resize = function(width, height) {
      this.width = width;
      this.height = height;
      return this.texture.bind(0).setSize(this.width, this.height);
    };

    return Node;

  })();

  vertexShaderBlit = 'attribute vec4 position;\nvarying vec2 texcoord;\nvoid main(){\n    texcoord = position.xy*0.5+0.5;\n    gl_Position = position;\n}';

  fragmentShaderBlit = '#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp int;\n    precision highp float;\n#else\n    precision mediump int;\n    precision mediump float;\n#endif\nuniform sampler2D source;\nvarying vec2 texcoord;';

  Heights = (function() {
    function Heights(heatmap, gl, width, height) {
      var i, _i, _ref;
      this.heatmap = heatmap;
      this.gl = gl;
      this.width = width;
      this.height = height;
      this.shader = new Shader(this.gl, {
        vertex: 'attribute vec4 position, intensity;\nvarying vec2 off, dim;\nvarying float vIntensity;\nuniform vec2 viewport;\n\nvoid main(){\n    dim = abs(position.zw);\n    off = position.zw;\n    vec2 pos = position.xy + position.zw;\n    vIntensity = intensity.x;\n    gl_Position = vec4((pos/viewport)*2.0-1.0, 0.0, 1.0);\n}',
        fragment: '#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp int;\n    precision highp float;\n#else\n    precision mediump int;\n    precision mediump float;\n#endif\nvarying vec2 off, dim;\nvarying float vIntensity;\nvoid main(){\n    float falloff = (1.0 - smoothstep(0.0, 1.0, length(off/dim)));\n    float intensity = falloff*vIntensity;\n    gl_FragColor = vec4(intensity);\n}'
      });
      this.clampShader = new Shader(this.gl, {
        vertex: vertexShaderBlit,
        fragment: fragmentShaderBlit + 'uniform float low, high;\nvoid main(){\n    gl_FragColor = vec4(clamp(texture2D(source, texcoord).rgb, low, high), 1.0);\n}'
      });
      this.multiplyShader = new Shader(this.gl, {
        vertex: vertexShaderBlit,
        fragment: fragmentShaderBlit + 'uniform float value;\nvoid main(){\n    gl_FragColor = vec4(texture2D(source, texcoord).rgb*value, 1.0);\n}'
      });
      this.blurShader = new Shader(this.gl, {
        vertex: vertexShaderBlit,
        fragment: fragmentShaderBlit + 'uniform vec2 viewport;\nvoid main(){\n    vec4 result = vec4(0.0);\n    for(int x=-1; x<=1; x++){\n        for(int y=-1; y<=1; y++){\n            vec2 off = vec2(x,y)/viewport;\n            //float factor = 1.0 - smoothstep(0.0, 1.5, length(off));\n            float factor = 1.0;\n            result += vec4(texture2D(source, texcoord+off).rgb*factor, factor);\n        }\n    }\n    gl_FragColor = vec4(result.rgb/result.w, 1.0);\n}'
      });
      this.nodeBack = new Node(this.gl, this.width, this.height);
      this.nodeFront = new Node(this.gl, this.width, this.height);
      this.vertexBuffer = this.gl.createBuffer();
      this.vertexSize = 8;
      this.maxPointCount = 1024 * 10*100;//chkun
      this.vertexBufferData = new Float32Array(this.maxPointCount * this.vertexSize * 6);
      this.vertexBufferViews = [];
      for (i = _i = 0, _ref = this.maxPointCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.vertexBufferViews.push(new Float32Array(this.vertexBufferData.buffer, 0, i * this.vertexSize * 6));
      }
      this.bufferIndex = 0;
      this.pointCount = 0;
    }

    Heights.prototype.resize = function(width, height) {
      this.width = width;
      this.height = height;
      this.nodeBack.resize(this.width, this.height);
      return this.nodeFront.resize(this.width, this.height);
    };

    Heights.prototype.update = function() {
      var intensityLoc, positionLoc;
      if (this.pointCount > 0) {
        this.gl.enable(this.gl.BLEND);
        this.nodeFront.use();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexBufferViews[this.pointCount], this.gl.STREAM_DRAW);
        positionLoc = this.shader.attribLocation('position');
        intensityLoc = this.shader.attribLocation('intensity');
        this.gl.enableVertexAttribArray(1);
        this.gl.vertexAttribPointer(positionLoc, 4, this.gl.FLOAT, false, 8 * 4, 0 * 4);
        this.gl.vertexAttribPointer(intensityLoc, 4, this.gl.FLOAT, false, 8 * 4, 4 * 4);
        this.shader.use().vec2('viewport', this.width, this.height);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.pointCount * 6);
        //ljyi测试
        //this.gl.drawElements(this.gl.TRIANGLES,)
        this.gl.disableVertexAttribArray(1);
        this.pointCount = 0;
        this.bufferIndex = 0;
        this.nodeFront.end();
        return this.gl.disable(this.gl.BLEND);
      }
    };

    Heights.prototype.clear = function() {
      this.nodeFront.use();
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      return this.nodeFront.end();
    };

    Heights.prototype.clamp = function(min, max) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
      this.nodeFront.bind(0);
      this.nodeBack.use();
      this.clampShader.use().int('source', 0).float('low', min).float('high', max);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
      this.nodeBack.end();
      return this.swap();
    };

    Heights.prototype.multiply = function(value) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
      this.nodeFront.bind(0);
      this.nodeBack.use();
      this.multiplyShader.use().int('source', 0).float('value', value);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
      this.nodeBack.end();
      return this.swap();
    };

    Heights.prototype.blur = function() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
      this.nodeFront.bind(0);
      this.nodeBack.use();
      this.blurShader.use().int('source', 0).vec2('viewport', this.width, this.height);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
      this.nodeBack.end();
      return this.swap();
    };

    Heights.prototype.swap = function() {
      var tmp;
      tmp = this.nodeFront;
      this.nodeFront = this.nodeBack;
      return this.nodeBack = tmp;
    };

    Heights.prototype.addVertex = function(x, y, xs, ys, intensity) {
      this.vertexBufferData[this.bufferIndex++] = x;
      this.vertexBufferData[this.bufferIndex++] = y;
      this.vertexBufferData[this.bufferIndex++] = xs;
      this.vertexBufferData[this.bufferIndex++] = ys;
      this.vertexBufferData[this.bufferIndex++] = intensity;
      this.vertexBufferData[this.bufferIndex++] = intensity;
      this.vertexBufferData[this.bufferIndex++] = intensity;
      return this.vertexBufferData[this.bufferIndex++] = intensity;
    };

    Heights.prototype.addPoint = function(x, y, size, intensity) {
      var s;
      if (size == null) {
        size = 50;
      }
      if (intensity == null) {
        intensity = 0.2;
      }
      if(!this.heatmapCount){
        this.heatmapCount += this.pointCount;
      }
      if (this.pointCount >= this.maxPointCount - 1) {
        this.update();
      }
      y = this.height - y;
      s = size / 2;
      this.addVertex(x, y, -s, -s, intensity);
      this.addVertex(x, y, +s, -s, intensity);
      this.addVertex(x, y, -s, +s, intensity);
      this.addVertex(x, y, -s, +s, intensity);
      this.addVertex(x, y, +s, -s, intensity);
      this.addVertex(x, y, +s, +s, intensity);
      return this.pointCount += 1;
    };

    return Heights;

  })();

  WebGLHeatmap = (function() {
    function WebGLHeatmap(_arg) {
      var alphaEnd, alphaRange, alphaStart, error, getColorFun, gradientTexture, image, intensityToAlpha, output, quad, textureGradient, _ref, _ref1;
      _ref = _arg != null ? _arg : {}, this.canvas = _ref.canvas, this.width = _ref.width, this.height = _ref.height, intensityToAlpha = _ref.intensityToAlpha, gradientTexture = _ref.gradientTexture, alphaRange = _ref.alphaRange;
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
      }
      try {
        this.gl = this.canvas.getContext('experimental-webgl', {
          depth: false,
          antialias: false
        });
        if (this.gl === null) {
          this.gl = this.canvas.getContext('webgl', {
            depth: false,
            antialias: false
          });
          if (this.gl === null) {
            throw 'WebGL not supported';
          }
        }
      } catch (_error) {
        error = _error;
        throw 'WebGL not supported';
      }
      if (window.WebGLDebugUtils != null) {
        console.log('debugging mode');
        this.gl = WebGLDebugUtils.makeDebugContext(this.gl, function(err, funcName, args) {
          throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
        });
      }
      this.gl.enableVertexAttribArray(0);
      this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
      if (gradientTexture) {
        textureGradient = this.gradientTexture = new Texture(this.gl, {
          channels: 'rgba'
        }).bind(0).setSize(2, 2).nearest().clampToEdge();
        if (typeof gradientTexture === 'string') {
          image = new Image();
          image.onload = function() {
            return textureGradient.bind().upload(image);
          };
          image.src = gradientTexture;
        } else {
          if (gradientTexture.width > 0 && gradientTexture.height > 0) {
            textureGradient.upload(gradientTexture);
          } else {
            gradientTexture.onload = function() {
              return textureGradient.upload(gradientTexture);
            };
          }
        }
        getColorFun = 'uniform sampler2D gradientTexture;\nvec3 getColor(float intensity){\n    return texture2D(gradientTexture, vec2(intensity, 0.0)).rgb;\n}';
      } else {
        textureGradient = null;
        //ljyi存放全局变量CesiumHeatmap_webgl.defaults.gradient
        var gradientArr = {
          '.5': 'rgb(0,0,1.0)',//'.3': 'blue',
          '.4': 'rgb(0,1.0,1.0)',//'.3': 'blue',
          '.3': 'rgb(0,1.0,0)',//'.65': 'green',
          '.2': 'rgb(1.0,1.0,0)',//'.8': 'yellow',
          '.1': 'rgb(1.0,0,0)',//'.95': 'red'
        } || CesiumHeatmap_webgl.defaults.gradient;
        getColorFun = 'vec3 getColor(float intensity){\n    vec3 blue = vec3(0.0, 0.0, 1.0);\n    vec3 cyan = vec3(0.0, 1.0, 1.0);\n    vec3 green = vec3(0.0, 1.0, 0.0);\n    vec3 yellow = vec3(1.0, 1.0, 0.0);\n    vec3 red = vec3(1.0, 0.0, 0.0);\n\n    vec3 color = (\n        fade(-0.25, 0.25, intensity)*blue +\n        fade(0.0, 0.5, intensity)*cyan +\n        fade(0.25, 0.75, intensity)*green +\n        fade(0.5, 1.0, intensity)*yellow +\n        smoothstep(0.75, 1.0, intensity)*red\n    );\n    return color;\n}';
        //ljyi0407copy
        //getColorFun = 'vec3 getColor(float intensity){\n    vec3 black = vec3(1.0, 1.0, 1.0);\n     vec3 blue = vec3(0.0, 0.0, 1.0);\n    vec3 cyan = vec3(0.0, 1.0, 1.0);\n    vec3 green = vec3(0.0, 1.0, 0.0);\n    vec3 yellow = vec3(1.0, 1.0, 0.0);\n    vec3 red = vec3(1.0, 0.0, 0.0);\n\n    vec3 color = (\n        fade(-0.25, 0.25, intensity)*black +\n    fade(0.0, 0.25, intensity)*blue +\n        fade(0.0, 0.5, intensity)*cyan +\n        fade(0.25, 0.75, intensity)*green +\n        fade(0.5, 1.0, intensity)*yellow +\n        smoothstep(0.75, 0.76, intensity)*red\n    );\n    return color;\n}';
        //getColorFun = 'vec3 getColor(float intensity){\n    vec3 black = vec3(0.0, 0.0, 0.0);\n     vec3 blue = vec3('+gradientArr['.5'].split('(')[1]+';\n    vec3 cyan = vec3('+gradientArr['.4'].split('(')[1]+';\n    vec3 green = vec3('+gradientArr['.3'].split('(')[1]+';\n    vec3 yellow = vec3('+gradientArr['.2'].split('(')[1]+';\n    vec3 red = vec3('+gradientArr['.1'].split('(')[1]+';\n\n    vec3 color = (\n        fade(-0.25, 0.25, intensity)*black +\n    fade(0.0, 0.25, intensity)*blue +\n        fade(0.0, 0.5, intensity)*cyan +\n        fade(0.25, 0.6, intensity)*green +\n        fade(0.45, 0.8, intensity)*yellow +\n        smoothstep(0.2, 0.9, intensity/1.5)*red\n    );\n    return color;\n}';
      }
      if (intensityToAlpha == null) {
        intensityToAlpha = true;
      }
      if (intensityToAlpha) {
        _ref1 = alphaRange != null ? alphaRange : [0.0,1.5], alphaStart = _ref1[0], alphaEnd = _ref1[1];
        output = "vec4 alphaFun(vec3 color, float intensity){\n    float alpha = smoothstep(" + (alphaStart.toFixed(8)) + ", " + (alphaEnd.toFixed(8)) + ", intensity*0.5);\n    return vec4(color*alpha, alpha);\n}";
        //output = "vec4 alphaFun(vec3 color, float intensity){\n  if(intensity<-0.2 || intensity>0.65){float alpha = smoothstep(" + (alphaStart.toFixed(8)) + ", " + (alphaEnd.toFixed(8)) + ", intensity);\n    return vec4(color*alpha, alpha);\n}else{float alpha = smoothstep(" + (-0.05) + ", " + (0.6) + ", intensity);\n    return vec4(color*alpha, alpha);\n }}"
      } else {
        output = 'vec4 alphaFun(vec3 color, float intensity){\n    return vec4(color, 1.0);\n}';
      }
      this.shader = new Shader(this.gl, {
        vertex: vertexShaderBlit,
        fragment: fragmentShaderBlit + ("float linstep(float low, float high, float value){\n    return clamp((value-low)/(high-low), 0.0, 1.0);\n}\n\nfloat fade(float low, float high, float value){\n    float mid = (low+high)*0.5;\n    float range = (high-low)*0.5;\n    float x = 1.0 - clamp(abs(mid-value)/range, 0.0, 1.0);\n    return smoothstep(0.0, 1.0, x);\n}\n\n" + getColorFun + "\n" + output + "\n\nvoid main(){\n    float intensity = smoothstep(0.0, 1.0, texture2D(source, texcoord).r);\n    vec3 color = getColor(intensity);\n    gl_FragColor = alphaFun(color, intensity+0.1);\n}")
        //fragment: fragmentShaderBlit + ("float linstep(float low, float high, float value){\n    return clamp((value-low)/(high-low), 0.0, 1.0);\n}\n\nfloat fade(float low, float high, float value){\n    float mid = (low+high)*0.5;\n    float range = (high-low)*0.5;\n    float x = 1.0 - clamp(abs(mid-value)/range, 0.0, 1.0);\n    return smoothstep(0.0, 1.0, x);\n}\n\n" + getColorFun + "\n" + output + "\n\nvoid main(){\n    float intensity = smoothstep(0.0, 1.0, texture2D(source, texcoord).r);\n    vec3 color = getColor(intensity);\n    gl_FragColor = alphaFun(color, intensity+0.1);\n}")
      });
      if (this.width == null) {
        this.width = this.canvas.offsetWidth || 2;
      }
      if (this.height == null) {
        this.height = this.canvas.offsetHeight || 2;
      }
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.gl.viewport(0, 0, this.width, this.height);
      this.quad = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quad);
      quad = new Float32Array([-1, -1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 0, 1, 1, 1, 0, 1]);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, quad, this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      this.heights = new Heights(this, this.gl, this.width, this.height);
    }

    WebGLHeatmap.prototype.adjustSize = function() {
      var canvasHeight, canvasWidth;
      canvasWidth = this.canvas.offsetWidth || 2;
      canvasHeight = this.canvas.offsetHeight || 2;
      if (this.width !== canvasWidth || this.height !== canvasHeight) {
        this.gl.viewport(0, 0, canvasWidth, canvasHeight);
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.width = canvasWidth;
        this.height = canvasHeight;
        return this.heights.resize(this.width, this.height);
      }
    };

    WebGLHeatmap.prototype.display = function() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quad);
      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
      this.heights.nodeFront.bind(0);
      if (this.gradientTexture) {
        this.gradientTexture.bind(1);
      }
      this.shader.use().int('source', 0).int('gradientTexture', 1);
      return this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    };

    WebGLHeatmap.prototype.update = function() {
      return this.heights.update();
    };

    WebGLHeatmap.prototype.clear = function() {
      return this.heights.clear();
    };

    WebGLHeatmap.prototype.clamp = function(min, max) {
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 1;
      }
      return this.heights.clamp(min, max);
    };

    WebGLHeatmap.prototype.multiply = function(value) {
      if (value == null) {
        value = 0.95;
      }
      return this.heights.multiply(value);
    };

    WebGLHeatmap.prototype.blur = function() {
      return this.heights.blur();
    };

    WebGLHeatmap.prototype.addPoint = function(x, y, size, intensity) {
      return this.heights.addPoint(x, y, size, intensity);
    };

    WebGLHeatmap.prototype.addPoints = function(items) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(this.addPoint(item.x, item.y, item.size, item.intensity));
      }
      return _results;
    };

    return WebGLHeatmap;

  })();

  window.createWebGLHeatmap = function(params) {
    return new WebGLHeatmap(params);
  };

}).call(this);
