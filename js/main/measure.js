GASProjection.Gauss_to_XY = function(L, B, middleL2) {
    var t = 0
        , yita = 0;
    var nn = 0;
    var n = 0;
    var middleL = GASProjection.to_Radian(middleL2);
    B = GASProjection.to_Radian(B);
    L = GASProjection.to_Radian(L);
    var dL = L - middleL;
    var cosB = Math.cos(B);
    n = to_N(B);
    nn = n * Math.cos(B);
    t = Math.tan(B);
    yita = e2 * cosB;
    var pow_t2 = Math.pow(t, 2);
    var pow_t4 = Math.pow(t, 4);
    var pow_yita2 = Math.pow(yita, 2);
    var pow_yita4 = Math.pow(yita, 4);
    var pow_cosB3 = Math.pow(cosB, 3);
    var pow_cosB5 = Math.pow(cosB, 5);
    var tY = to_Sm(B) + Math.pow(dL, 2) / 2 * nn * cosB * t + Math.pow(dL, 4) / 24 * t * nn * pow_cosB3 * (5.0 - pow_t2 + 9.0 * pow_yita2 + 4 * pow_yita4) + Math.pow(dL, 6) / 720 * t * nn * pow_cosB5 * (61.0 - 58.0 * t * t + pow_t4 + 270 * pow_yita2 - 330 * t * t * pow_yita2);
    var tX = dL * n * cosB + Math.pow(dL, 3) / 6.0 * n * pow_cosB3 * (1 - t * t + yita * yita) + Math.pow(dL, 5) / 120.0 * n * pow_cosB5 * (5 - 18 * t * t + pow_t4 + 14.0 * pow_yita2 - 58.0 * pow_yita2 * pow_t2);
    return new Cesium.Cartesian2(tX,tY)
}
;
GASProjection.to_Radian = function(degree) {
    return degree * Math.PI / 180.0
}
;
GASProjection.to_Sm = function(B) {
    var AA, BB, CC, DD, EE;
    AA = 1 + (GASProjection.e1 * GASProjection.e1) * 3 / 4 + Math.pow(GASProjection.e1, 4.0) * 45 / 64 + Math.pow(GASProjection.e1, 6) * 175 / 256 + Math.pow(GASProjection.e1, 8) * 11025 / 16384;
    BB = Math.pow(GASProjection.e1, 2) * 3 / 4 + Math.pow(GASProjection.e1, 4) * 15 / 16 + Math.pow(GASProjection.e1, 6) * 525 / 512 + Math.pow(GASProjection.e1, 8) * 2205 / 2048;
    CC = Math.pow(GASProjection.e1, 4) * 15 / 64 + Math.pow(GASProjection.e1, 6) * 105 / 256 + Math.pow(GASProjection.e1, 8) * 2205 / 4096;
    DD = Math.pow(GASProjection.e1, 6) * 35 / 512 + Math.pow(GASProjection.e1, 8) * 315 / 2048;
    EE = Math.pow(GASProjection.e1, 8) * 315 / 16384;
    return GASProjection.aEarth * (1 - GASProjection.e1 * GASProjection.e1) * (AA * B - BB / 2 * Math.sin(2 * B) + CC / 4 * Math.sin(4 * B) - DD / 6 * Math.sin(6 * B) + EE / 8 * Math.sin(8 * B))
}
;
GASProjection.to_N = function(B) {
    var ans = (GASProjection.aEarth / Math.sqrt(1.00 - GASProjection.e1 * GASProjection.e1 * Math.sin(B) * Math.sin(B)));
    return ans
}
;
GASProjection.Gauss_to_XY = function(L, B, middleL2) {
    var t = 0
        , yita = 0;
    var nn = 0;
    var n = 0;
    var middleL = GASProjection.to_Radian(middleL2);
    B = GASProjection.to_Radian(B);
    L = GASProjection.to_Radian(L);
    var dL = L - middleL;
    var cosB = Math.cos(B);
    n = GASProjection.to_N(B);
    nn = n * Math.cos(B);
    t = Math.tan(B);
    yita = GASProjection.e2 * cosB;
    var pow_t2 = Math.pow(t, 2);
    var pow_t4 = Math.pow(t, 4);
    var pow_yita2 = Math.pow(yita, 2);
    var pow_yita4 = Math.pow(yita, 4);
    var pow_cosB3 = Math.pow(cosB, 3);
    var pow_cosB5 = Math.pow(cosB, 5);
    var tY = GASProjection.to_Sm(B) + Math.pow(dL, 2) / 2 * nn * cosB * t + Math.pow(dL, 4) / 24 * t * nn * pow_cosB3 * (5.0 - pow_t2 + 9.0 * pow_yita2 + 4 * pow_yita4) + Math.pow(dL, 6) / 720 * t * nn * pow_cosB5 * (61.0 - 58.0 * t * t + pow_t4 + 270 * pow_yita2 - 330 * t * t * pow_yita2);
    var tX = dL * n * cosB + Math.pow(dL, 3) / 6.0 * n * pow_cosB3 * (1 - t * t + yita * yita) + Math.pow(dL, 5) / 120.0 * n * pow_cosB5 * (5 - 18 * t * t + pow_t4 + 14.0 * pow_yita2 - 58.0 * pow_yita2 * pow_t2);
    return new Cesium.Cartesian2(tX,tY)
}
;
GASProjection.Sm_to_B = function(Sm) {
    var B;
    var B2, B4, B6, B8, fai;
    var AA, BB, CC, DD, EE;
    var A2, A4, A6, A8;
    AA = 1 + (GASProjection.e1 * GASProjection.e1) * 3 / 4 + Math.pow(GASProjection.e1, 4.0) * 45 / 64 + Math.pow(GASProjection.e1, 6) * 175 / 256 + Math.pow(GASProjection.e1, 8) * 11025 / 16384;
    BB = Math.pow(GASProjection.e1, 2) * 3 / 4 + Math.pow(GASProjection.e1, 4) * 15 / 16 + Math.pow(GASProjection.e1, 6) * 525 / 512 + Math.pow(GASProjection.e1, 8) * 2205 / 2048;
    CC = Math.pow(GASProjection.e1, 4) * 15 / 64 + Math.pow(GASProjection.e1, 6) * 105 / 256 + Math.pow(GASProjection.e1, 8) * 2205 / 4096;
    DD = Math.pow(GASProjection.e1, 6) * 35 / 512 + Math.pow(GASProjection.e1, 8) * 315 / 2048;
    EE = Math.pow(GASProjection.e1, 8) * 315 / 16384;
    fai = Sm / (GASProjection.aEarth * (1 - GASProjection.e1 * GASProjection.e1) * AA);
    A2 = BB / AA / 2;
    A4 = -CC / AA / 4;
    A6 = DD / AA / 6;
    A8 = -EE / AA / 8;
    B2 = A2 - A2 * A4 - A4 * A6 - 0.5 * Math.pow(A2, 3) - A2 * Math.pow(A4, 2) + 0.5 * Math.pow(A2, 2) * A6 - 18.3 * Math.pow(A2, 3) * A4;
    B4 = A4 + Math.pow(A2, 2) - A2 * A6 * 2 - 4 * A2 * A2 * A4 - 1.3 * Math.pow(A2, 4);
    B6 = A6 + 3 * A2 * A4 - 3 * A2 * A8 + 1.5 * Math.pow(A2, 3) - 4.5 * A2 * A4 * A4 - 9 * A2 * A2 * A6 - 12.5 * Math.pow(A2, 3) * A4;
    B8 = A8 + 2 * A4 * A4 + 4 * A2 * A6 + 8 * A2 * A2 * A4 + 2.7 * Math.pow(A2, 4);
    B = fai + B2 * Math.sin(2 * fai) + B4 * Math.sin(4 * fai) + B6 * Math.sin(6 * fai) + B8 * Math.sin(8 * fai);
    return B
}
;
GASProjection.Gauss_to_BL = function(x, y, m_fL0) {
    var bf;
    var n, t, yita;
    bf = GASProjection.Sm_to_B(y);
    n = GASProjection.to_N(bf);
    t = Math.tan(bf);
    yita = GASProjection.e2 * Math.cos(bf);
    var B = bf + t * (-1 - yita * yita) * x * x / (2.0 * Math.pow(n, 2)) + t * (5 + 3 * Math.pow(t, 2) + 6.0 * Math.pow(yita, 2) - 6.0 * Math.pow(t, 2) * Math.pow(yita, 2) - 3.0 * Math.pow(yita, 4) - 9.0 * Math.pow(t, 2) * Math.pow(yita, 4)) * Math.pow(x, 4) / (24.0 * Math.pow(n, 4)) + t * (-61.0 - 90.0 * Math.pow(t, 2) - 45.0 * Math.pow(t, 4) - 107 * Math.pow(yita, 2) + 162 * Math.pow(t, 2) * Math.pow(yita, 2) + 45 * Math.pow(t, 4) * Math.pow(yita, 2)) * Math.pow(x, 6) / (720.0 * Math.pow(n, 6));
    var L = x / (n * Math.cos(bf)) + (-1 - 2 * Math.pow(t, 2) - Math.pow(yita, 2)) * Math.pow(x, 3) / (6 * Math.pow(n, 3) * Math.cos(bf)) + (5 + 28 * Math.pow(t, 2) + 24 * Math.pow(t, 4) + 6 * Math.pow(yita, 2) + 8 * Math.pow(t, 2) * Math.pow(yita, 2)) * Math.pow(x, 5) / (120 * Math.pow(n, 5) * Math.cos(bf));
    return new Cesium.Cartographic(L + m_fL0,B / Math.PI * 180)
}
;
GASProjection.to_Degree = function(radian) {
    return radian / Math.PI * 180.0
}
;
GASProjection.aEarth = 6378137;
GASProjection.bEarth = 6356752.3142;
GASProjection.e1 = Math.sqrt(GASProjection.aEarth * GASProjection.aEarth - GASProjection.bEarth * GASProjection.bEarth) / GASProjection.aEarth;
GASProjection.e2 = Math.sqrt(GASProjection.aEarth * GASProjection.aEarth - GASProjection.bEarth * GASProjection.bEarth) / GASProjection.bEarth;
function GASProjection() {}

var CreatePolygon = (function() {
    function _(positons,cesium) {
        if (!Cesium.defined(positons)) {
            throw new Cesium.DeveloperError('positions is required!');
        }
        if (positons.length < 3) {
            throw new Cesium.DeveloperError('positions 的水平长度必须大于等于3');
        }
        this.options = {
			name : '量测绘图',
            polygon : {
                show : true,
                hierarchy : undefined,
                outline:true,
                outlineColor:Cesium.Color.WHITE,
                outlineWidth:2,
				//贴模型测量绘图
				classificationType: Cesium.ClassificationType.BOTH,
                material : Cesium.Color.YELLOW.withAlpha(0.4)
            }
        };
        this.path = positons;

        this._init(cesium);
    }

    _.prototype._init = function(cesium) {
        var that = this;
        var positionCBP = function() {
            return that.path;
        };
        this.options.polygon.hierarchy = new Cesium.CallbackProperty(positionCBP, false);
        this.polygonEntity=cesium.entities.add(this.options);
    };

    return _;
})();
//测量面积
var measureArea=function(cesium){
    var isDraw = true;
    var polygonPath = [];
    var polygon = undefined;
    var scene=cesium.scene;
    var ellipsoid = scene.globe.ellipsoid;
    var entities=[];
    var billboards = new Cesium.BillboardCollection();
    scene.primitives.add(billboards);
    var billboard=undefined;
    var tooltip = document.getElementById('toolTip');
	var resultToolBar = document.getElementById('measure-tool-bar');
	var resultText = document.getElementById('measure-result');
	resultToolBar.style.display = 'block';
	resultText.innerHTML='<span>当前正在进行：<br/>面积测量</span>';
    tooltip.innerHTML='<span>单击开始,双击结束</span>';
    //隐藏选中容器标识
    $(".cesium-selection-wrapper").hide();
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    var tempLabelCollection = new Cesium.LabelCollection();
    var measureDisplayLabel=tempLabelCollection.add({
        fillColor: Cesium.Color.RED,
        outlineColor: Cesium.Color.BLACK,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        font : '16px sans-serif',                                //测量结果label的样式
        verticalOrigin: Cesium.VerticalOrigin.TOP
    });
    scene.primitives.add(tempLabelCollection);
    handler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.endPosition);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic){
            //海拔
            var height = cesium.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180,cartographic.latitude / Math.PI * 180,height);
            if (isDraw) {
                tooltip.style.left = movement.endPosition.x + 10 + "px";
                tooltip.style.top = movement.endPosition.y + 20 + "px";
                tooltip.style.display = "block";

                if (polygonPath.length < 2) {
                    return;
                }
                if (!Cesium.defined(polygon)) {
                    polygonPath.push(point);
                    polygon = new CreatePolygon(polygonPath,cesium);
                } else {
                    polygon.path.pop();
                    polygon.path.push(point);
                }
                if(polygonPath.length>=2){
                    var label = String(countAreaInCartesian3(polygon.path));
                    label = label.substr(0, label.indexOf(".", 0));
                    var text;
                    if (label.length < 6)
                        text = "当前投影面积为：<br/>" + label + "平方米";
                    else {
                        label = String(label / 1000000);
                        label = label.substr(0, label.indexOf(".", 0) + 3);
                        text = "当前投影面积为：<br/>" + label + "平方公里"
                    }
                    //measureDisplayLabel.text=text;                              //计算结果
					//measureDisplayLabel.show='true';
                    //measureDisplayLabel.position = countCenter(polygon.path);
					resultText.innerHTML = text;
                    tooltip.innerHTML='<p>双击确定终点</p>';
                }
            }
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.position);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic){
            //海拔
            var height = cesium.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180,cartographic.latitude / Math.PI * 180,height);
            if (isDraw) {
                polygonPath.push(point);
                entities.push(cesium.entities.add({
                    position: point,
                    point: {
                        show: true,
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 3,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 1
                    },
                }));
            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(function() {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        cesium.trackedEntity = undefined;
        isDraw = false;
        billboard=billboards.add({
            show : true,
            id:"measureTool",
            position : polygonPath[polygonPath.length-1],
            pixelOffset : new Cesium.Cartesian2(0.0, 20),
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.CENTER,
            scale : 1.0,
            image: 'Content/images/measure/close.png',
            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });
        //关闭按钮执行事件
        handler.setInputAction(function(movement){
            var pickedObjects ={};
            pickedObjects=scene.drillPick(movement.position);
            if (Cesium.defined(pickedObjects)) {
                for (var i = 0; i < pickedObjects.length; i++)
                    if (pickedObjects[i].primitive == billboard){
                        cesium.entities.remove(polygon.polygonEntity);
                        for(var j=0;j<entities.length;j++){
                            cesium.entities.remove(entities[j]);
                        }
                        entities=[];
                        billboards.remove(billboard);
                        tempLabelCollection.remove(measureDisplayLabel);
                        polygonPath = [];
                        polygon = undefined;
                        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    }
            }
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        tooltip.style.display='none';
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	
	/*
	var xVal = 0;
	var yVal = 0;
	var zVal = 0;
	$('#btn1').click(function(){
			 xVal = $("#xlayer").val();
			 yVal = $("#ylayer").val();
			 zVal = $("#zlayer").val();
			//台贸小镇模型没贴地 需要通过调整矩阵来让它贴地
			//var translation=Cesium.Cartesian3.fromArray([ xVal,yVal,zVal]);
			//var m= Cesium.Matrix4.fromTranslation(translation);

			//生效
			//tileset2._modelMatrix = m;
			//viewer.scene.primitives.update(tileset2);
		})
	*/
	
	
    var countCenter=function(ps) {
        var x = 0;
        y = 0;
        z = 0;
        for (var j = 0; j < ps.length; j++) {
            x += ps[j].x;
            y += ps[j].y;
            z += ps[j].z;
        }
        var center = new Cesium.Cartesian3(x / ps.length-300,y / ps.length+800,z / ps.length+500);                //计算结果中心转换
        return center
    }
    var countAreaInCartesian3=function(pointsold) {
        var points = new Array(pointsold.length);
        for (var i = 0; i < pointsold.length; i++) {
            points[i] = PItoDU(ellipsoid.cartesianToCartographic(pointsold[i]))
        }
        var center = 0;
        for (var i = 0; i < points.length; i++)
            center += points[i].longitude;
        center = center / points.length;
        for (var i = 0; i < points.length; i++) {
            points[i] = GASProjection.Gauss_to_XY(points[i].longitude, points[i].latitude, center)
        }
        return Math.abs(countArea(points))
    }
    var PItoDU=function(location) {
        location.longitude = location.longitude / Math.PI * 180;
        location.latitude = location.latitude / Math.PI * 180;
        return location;
    }
    var countArea=function(ps) {
        var s = 0;
        for (var i = 0; i < ps.length; i++) {
            var p1 = ps[i];
            var p2;
            if (i < ps.length - 1)
                p2 = ps[i + 1];
            else
                p2 = ps[0];
            s += p1.x * p2.y - p2.x * p1.y                          //计算结果
        }
        return s / 2
    }
};
var CreatePolyline = (function() {
    function _(positons,cesium) {
        if (!Cesium.defined(positons)) {
            throw new Cesium.DeveloperError('positions is required!');
        }
        if (positons.length < 2) {
            throw new Cesium.DeveloperError('positions 的水平长度必须大于等于2');
        }
        var material = Cesium.Material.fromType(Cesium.Material.ColorType);
        material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 0.5);
        this.options = {
			name : '量测线',
            polyline : {
                show : true,
                width : 4,
                material : new Cesium.PolylineOutlineMaterialProperty({
                    color : Cesium.Color.ORANGE.withAlpha(0.5),
                    outlineWidth : 0,
                    outlineColor : Cesium.Color.ORANGE
                }),
                depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                    color : Cesium.Color.RED,
                    outlineWidth : 1,
                    outlineColor : Cesium.Color.RED
                }),
                followSurface : false
            }
        };
        this.path = positons;

        this._init(cesium);
    }

    _.prototype._init = function(cesium) {
        var that = this;
        var positionCBP = function() {
            return that.path;
        };
        this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
        this.lineEntity=cesium.entities.add(this.options);
    };

    return _;
})();

//测量贴模型距离
var measureClampDistance = function(cesium){
    var isDraw = false;
    var polylinePath = [];
    var polylineCartographic = [];//弧度数组,地表插值用
    var polyline = undefined;
    var scene=cesium.scene;
    var ellipsoid = scene.globe.ellipsoid;
    var billboards = new Cesium.BillboardCollection();
    scene.primitives.add(billboards);
    var WebMercatorProjection = new Cesium.WebMercatorProjection();
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var tooltip = document.getElementById('toolTip');
    tooltip.innerHTML='<span>单击开始,双击结束</span>';
	var resultText = document.getElementById('measure-result');
	resultText.innerHTML='<span>当前正在进行：<br/>距离测量</span>';
    var entities = [];
    var billboard=undefined;
    //隐藏选中容器标识
    $(".cesium-selection-wrapper").hide();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    isDraw=true;
    handler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.endPosition);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic) {
            //海拔-获取球面坐标
            //var height = cesium.scene.globe.getHeight(cartographic);
			//height-获取建筑坐标
			var height = scene.sampleHeight(cartographic, entities);
            //地理坐标（弧度）转经纬度坐标
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            //var point = Cesium.Cartesian3.fromDegrees(currentLon, currentLat, height);
            if (isDraw) {
                tooltip.style.left = movement.endPosition.x + 10 + "px";
                tooltip.style.top = movement.endPosition.y + 20 + "px";
                tooltip.style.display = "block";
                if (polylinePath.length < 1) {
                    return;
                }
                if (!Cesium.defined(polyline)) {
                    polylinePath.push(point);
                    polyline = new CreatePolyline(polylinePath,cesium);
                } else {
                    polyline.path.pop();
                    polyline.path.push(point);
                }
                if(polylinePath.length>=1){
                    if(polyline && polyline.path){
                        var distance=getDistance(polyline.path);
                        tooltip.innerHTML='<p>水平长度：'+distance+'</p><p>双击确定终点</p>';
						resultText.innerHTML = '<p>当前水平长度：<br/>' + distance + '</p>';
                    }
                }
            }
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //线段之间地表插值
    var SurfaceLine=function(cartographic){
        polylineCartographic.push(cartographic);
        var terrainSamplePositions = [];
        if (polylineCartographic.length > 1) {
            var p1 = polylineCartographic[polylineCartographic.length - 2];
            var p2 = polylineCartographic[polylineCartographic.length - 1];
            var a = Math.abs(p1.longitude - p2.longitude) * 10000000;
            var b = Math.abs(p1.latitude - p2.latitude) * 10000000;
            if (a > b) b = a;
            var length = parseInt(b / 10);
            if (length > 1000) length = 1000;
            if (length < 2) length = 2;
            for (var i = 0; i < length; ++i) {
                terrainSamplePositions.push(
                    new Cesium.Cartographic(
                        Cesium.Math.lerp(p1.longitude, p2.longitude, i / (length - 1)),
                        Cesium.Math.lerp(p1.latitude, p2.latitude, i / (length - 1))
                    )
                );
            }

        }
        else {
            terrainSamplePositions = polylineCartographic;
        }
        if(terrainSamplePositions.length>0){
            for(var j=0;j<terrainSamplePositions.length;j++){
                //地理坐标（弧度）转经纬度坐标
                var cartographic = terrainSamplePositions[j];
				//椭球贴地的高-贴地量算
                //var height = cesium.scene.globe.getHeight(cartographic);
				//建筑高
				var height = scene.sampleHeight(cartographic, entities);
                var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
                polylinePath.push(point);
                //console.log(point);
            }
        }
    }

    handler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.position);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic){
            //海拔
            //var height = cesium.scene.globe.getHeight(cartographic);
            //地理坐标（弧度）转经纬度坐标
			//height-获取建筑坐标
			var height = scene.sampleHeight(cartographic, entities);
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180,cartographic.latitude / Math.PI * 180,height);
            if (isDraw) {
                if(polyline)
                    polyline.path.pop();
                SurfaceLine(cartographic);
                var text="起点";
                if(polyline){
                    text=getDistance(polyline.path);
                }
                entities.push(cesium.entities.add({
                    position: point,
                    point: {
						//贴地是CLAMP_TO_GROUND这里是贴模型
                        //heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,
                        heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,
                        show: true,
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 5,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 2
                    },
                    label: {
                        text: text,
                        font: '16px sans-serif',
                        style : Cesium.LabelStyle.FILL,
                        outlineWidth : 2,
                        fillColor:Cesium.Color.GOLD,
                        showBackground:false,
                        backgroundColor:Cesium.Color.RED.withAlpha(0.6),
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        pixelOffset: new Cesium.Cartesian2(5.0,-20.0),
                    }
                }));
            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function() {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        cesium.trackedEntity = undefined;
        isDraw = false;
        billboard=billboards.add({
            show : true,
            id:"measureTool",
            position : polylinePath[polylinePath.length-1],
            pixelOffset : new Cesium.Cartesian2(0.0, 20),
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.CENTER,
            scale : 1.0,
            image: 'Content/images/measure/close.png',
            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });

        tooltip.style.display = "none";
        //关闭按钮执行事件
        handler.setInputAction(function(movement){
            var pickedObjects ={};
            pickedObjects=scene.drillPick(movement.position);
            if (Cesium.defined(pickedObjects)) {
                for (var i = 0; i < pickedObjects.length; i++)
                    if (pickedObjects[i].primitive == billboard){
                        cesium.entities.remove(polyline.lineEntity);
                        for(var j=0;j<entities.length;j++){
                            cesium.entities.remove(entities[j]);
                        }
                        entities=[];
                        billboards.remove(billboard);
                        polylinePath = [];
                        polyline = undefined;
                        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    }
            }
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);

    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //获取线段距离
    var getDistance=function(path){
        var Len = 0;
        var distance=0+'米';
        var cg, cs, x1, y1, x2, y2;
        for (i = 0; i < path.length-1; i += 1) {
            cg = ellipsoid.cartesianToCartographic(path[i]);
            cs = WebMercatorProjection.project(cg);
            x1 = cs.x;
            y1 = cs.y;
            cg = ellipsoid.cartesianToCartographic(path[i+1]);
            cs = WebMercatorProjection.project(cg);
            x2 = cs.x;
            y2 = cs.y;
            Len = Len + Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
        }
        if(Len>0){
            distance=Len.toFixed(2)+'米'
        }
        if(Len/1000>=1){
            distance=(Len/1000).toFixed(2)+'公里';
        }
        return distance;
    }


}


//测量距离
var measureDistance=function(cesium){
    var isDraw = false;
    var polylinePath = [];
    var polylineCartographic = [];//弧度数组,地表插值用
    var polyline = undefined;
    var scene=cesium.scene;
    var ellipsoid = scene.globe.ellipsoid;
    var billboards = new Cesium.BillboardCollection();
    scene.primitives.add(billboards);
    var WebMercatorProjection = new Cesium.WebMercatorProjection();
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var tooltip = document.getElementById('toolTip');
    tooltip.innerHTML='<span>单击开始,双击结束</span>';
	var resultText = document.getElementById('measure-result');
	resultText.innerHTML='<span>当前正在进行：<br/>距离测量</span>';
    var entities = [];
    var billboard=undefined;
    //隐藏选中容器标识
    $(".cesium-selection-wrapper").hide();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    isDraw=true;
    handler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.endPosition);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic) {
            //海拔
            var height = cesium.scene.globe.getHeight(cartographic);
            //地理坐标（弧度）转经纬度坐标
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            //var point = Cesium.Cartesian3.fromDegrees(currentLon, currentLat, height);
            if (isDraw) {
                tooltip.style.left = movement.endPosition.x + 10 + "px";
                tooltip.style.top = movement.endPosition.y + 20 + "px";
                tooltip.style.display = "block";
                if (polylinePath.length < 1) {
                    return;
                }
                if (!Cesium.defined(polyline)) {
                    polylinePath.push(point);
                    polyline = new CreatePolyline(polylinePath,cesium);
                } else {
                    polyline.path.pop();
                    polyline.path.push(point);
                }
                if(polylinePath.length>=1){
                    if(polyline && polyline.path){
                        var distance=getDistance(polyline.path);
                        tooltip.innerHTML='<p>长度：'+distance+'</p><p>双击确定终点</p>';
						resultText.innerHTML = '<p>当前线段总长度：<br/>' + distance + '</p>';
                    }
                }
            }
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //线段之间地表插值
    var SurfaceLine=function(cartographic){
        polylineCartographic.push(cartographic);
        var terrainSamplePositions = [];
        if (polylineCartographic.length > 1) {
            var p1 = polylineCartographic[polylineCartographic.length - 2];
            var p2 = polylineCartographic[polylineCartographic.length - 1];
            var a = Math.abs(p1.longitude - p2.longitude) * 10000000;
            var b = Math.abs(p1.latitude - p2.latitude) * 10000000;
            if (a > b) b = a;
            var length = parseInt(b / 10);
            if (length > 1000) length = 1000;
            if (length < 2) length = 2;
            for (var i = 0; i < length; ++i) {
                terrainSamplePositions.push(
                    new Cesium.Cartographic(
                        Cesium.Math.lerp(p1.longitude, p2.longitude, i / (length - 1)),
                        Cesium.Math.lerp(p1.latitude, p2.latitude, i / (length - 1))
                    )
                );
            }

        }
        else {
            terrainSamplePositions = polylineCartographic;
        }
        if(terrainSamplePositions.length>0){
            for(var j=0;j<terrainSamplePositions.length;j++){
                //地理坐标（弧度）转经纬度坐标
                var cartographic = terrainSamplePositions[j];
                var height = cesium.scene.globe.getHeight(cartographic);
                var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
                polylinePath.push(point);
                //console.log(point);
            }
        }
    }

    handler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = cesium.scene.camera.getPickRay(movement.position);
        if(ray)
            position1 = cesium.scene.globe.pick(ray,cesium.scene);
        if(position1)
            cartographic= Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if(cartographic){
            //海拔
            var height = cesium.scene.globe.getHeight(cartographic);
            //地理坐标（弧度）转经纬度坐标
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180,cartographic.latitude / Math.PI * 180,height);
            if (isDraw) {
                if(polyline)
                    polyline.path.pop();
                SurfaceLine(cartographic);
                var text="起点";
                if(polyline){
                    text=getDistance(polyline.path);
                }
                entities.push(cesium.entities.add({
                    position: point,
                    point: {
                        heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                        show: true,
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 5,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 2,
						heightReference:Cesium.HeightReference.NONE
                    },
                    label: {
                        text: text,
                        font: '16px sans-serif',
                        style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth : 2,
                        fillColor:Cesium.Color.GOLD,
                        showBackground:false,
                        backgroundColor:Cesium.Color.RED.withAlpha(0.6),
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        pixelOffset: new Cesium.Cartesian2(5.0,-20.0),
						heightReference:Cesium.HeightReference.NONE
                    }
                }));
            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function() {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        cesium.trackedEntity = undefined;
        isDraw = false;
        billboard=billboards.add({
            show : true,
            id:"measureTool",
            position : polylinePath[polylinePath.length-1],
            pixelOffset : new Cesium.Cartesian2(0.0, 20),
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.CENTER,
            scale : 1.0,
            image: 'Content/images/measure/close.png',
            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });

        tooltip.style.display = "none";
        //关闭按钮执行事件
        handler.setInputAction(function(movement){
            var pickedObjects ={};
            pickedObjects=scene.drillPick(movement.position);
            if (Cesium.defined(pickedObjects)) {
                for (var i = 0; i < pickedObjects.length; i++)
                    if (pickedObjects[i].primitive == billboard){
                        cesium.entities.remove(polyline.lineEntity);
                        for(var j=0;j<entities.length;j++){
                            cesium.entities.remove(entities[j]);
                        }
                        entities=[];
                        billboards.remove(billboard);
                        polylinePath = [];
                        polyline = undefined;
                        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    }
            }
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);

    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //获取线段距离
    var getDistance=function(path){
        var Len = 0;
        var distance=0+'米';
        var cg, cs, x1, y1, x2, y2;
        for (i = 0; i < path.length-1; i += 1) {
            cg = ellipsoid.cartesianToCartographic(path[i]);
            cs = WebMercatorProjection.project(cg);
            x1 = cs.x;
            y1 = cs.y;
            cg = ellipsoid.cartesianToCartographic(path[i+1]);
            cs = WebMercatorProjection.project(cg);
            x2 = cs.x;
            y2 = cs.y;
            Len = Len + Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
        }
        if(Len>0){
            distance=Len.toFixed(2)+'米'
        }
        if(Len/1000>=1){
            distance=(Len/1000).toFixed(2)+'公里';
        }
        return distance;
    }


}