//visiableAnalysis
//created by William 2018.05.03
// define('AnalysisTool',['Cesium'],function(Cesium){
	// "use strict";
	// var clickTimes=true;
	// $("#analysisTool").click(function(){
		// if(clickTimes==true){
			// $("#analysistoolbar").css("display", "block");
			// return clickTimes=false;
		// }
		// if (clickTimes==false) {
			// $("#analysistoolbar").css("display", "none");
			// return clickTimes=true;
		// }

	// })
	var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
	var lng_start,lat_start,height_start,lng_stop,lat_stop,height_stop;
	var lng_lerp=[],lat_lerp=[],height_lerp=[];
	var cartographic=[];
	var cartographic_lerp=[];
	var height_terrain=[];
	var isSeen=true;
	var visiableOrNot;
	var inPoint=[];
	var outPoint=[];
	var m=0;
	var n=0;
	//var AnalysisTool=function(){}; 
	//AnalysisTool.prototype.visiableAnalysis=function(Cesium,viewer){
		//var scene=viewer.scene;
		var ellipsoid=viewer.scene.globe.ellipsoid;
		var ellipsoidTerrainProvider = viewer.terrainProvider;
		viewer.scene.pickTranslucentDepth =true;
		viewer.scene.globe.depthTestAgainstTerrain=true;
		function selectPoint(){
			
			handler.setInputAction(function(movement) {
				lng_start=null;lat_start=null;height_start=null;lng_stop=null;lat_stop=null;height_stop=null;
				lng_lerp=[],lat_lerp=[],height_lerp=[];
				cartographic=[];
				cartographic_lerp=[];
				height_terrain=[];
				isSeen=true;
				visiableOrNot=null;;
				inPoint=[];
				outPoint=[];
				m=0;
				n=0;
				var adaptivePosition=viewer.scene.pickPosition(movement.position);
				if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
					var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition); 
					lng_start = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
					lat_start = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
					height_start= positionCarto.height;       
					var point_start={
						position : Cesium.Cartesian3.fromDegrees(parseFloat(lng_start),parseFloat(lat_start),parseFloat(height_start)),
						billboard : {
							image : './img/marker.png',
							color: Cesium.Color.GREEN,
							scale : 0.3,
							verticalOrigin : Cesium.VerticalOrigin.BOTTOM
						}
					}
					viewer.entities.add(point_start);
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			handler.setInputAction(function(movement) {
				var adaptivePosition=viewer.scene.pickPosition(movement.position);
				if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
					var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition); 
					lng_stop = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
					lat_stop = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
					height_stop= positionCarto.height;       
					var point_stop={
						position : Cesium.Cartesian3.fromDegrees(parseFloat(lng_stop),parseFloat(lat_stop),parseFloat(height_stop)),
						billboard : {
							image : './img/marker.png',
							color: Cesium.Color.RED,
							scale : 0.3,
							verticalOrigin : Cesium.VerticalOrigin.BOTTOM
						}
					}
					viewer.entities.add(point_stop);
				}
				visiableAnalysis();
				
			}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		} 
		
		
		function visiableAnalysis(){
			for(var i=0;i<=1000;i++){
				lng_lerp[i]=parseFloat(lng_start)+parseFloat(i*(lng_stop-lng_start)/1000);
				lat_lerp[i]=parseFloat(lat_start)+parseFloat(i*(lat_stop-lat_start)/1000);
				height_lerp[i]=parseFloat(height_start)+parseFloat(i*(height_stop-height_start)/1000);

				cartographic.push(Cesium.Cartographic.fromDegrees(lng_lerp[i], lat_lerp[i], height_lerp[i]));
				cartographic_lerp.push(Cesium.Cartographic.fromDegrees(lng_lerp[i], lat_lerp[i], height_lerp[i]));
			}

			Cesium.sampleHeightMostDetailed(cartographic,example3dtile)
			.then((raisedPositionsCartograhpic) =>{
				var raisedPositions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(raisedPositionsCartograhpic);
				var a=raisedPositionsCartograhpic;
				for(i=0;i<raisedPositionsCartograhpic.length;i++){
					height_terrain.push(raisedPositionsCartograhpic[i].height);
				}
				for(var i=10;i<=1001;i++){
					var forward_hl =height_lerp[i-1];
					var forward_ht = height_terrain[i-1];

					if(forward_ht-forward_hl>=2){
						isSeen=false;
					}

				}
				if(isSeen==true){
					var visiableLine_Positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographic_lerp);
					var visiableLine = viewer.entities.add({
						name: 'polyline',
						polyline: {
							positions: visiableLine_Positions,     
							width: 5,
							material: Cesium.Color.GREEN
						}
					});
					visiableOrNot="通视";
				}
				else{
					for(var i=1;i<=1001;i++){
						var forward_hl2 =height_lerp[i-1];
						var forward_ht2 = height_terrain[i-1];
						var backward_ht2 =height_terrain[i];
						var backward_hl2 = height_lerp[i];
						if(forward_hl2>=forward_ht2){
            //入点
            if(backward_hl2<backward_ht2){
            	inPoint[m]=i;
            	m++;
            }
        }
          //出点
          else{
          	if(backward_hl2>backward_ht2){
          		outPoint[n]=i;
          		n++;
          	}
          }
      }
      var inLine=cartographic_lerp.slice(0,inPoint[0]);
      var outLine=cartographic_lerp.slice(inPoint[0]);
      var inLine_Positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(inLine);
      var partvisiableLine = viewer.entities.add({
      	name: 'polyline',
      	polyline: {
      		positions: inLine_Positions,     
      		width: 5,
      		material: Cesium.Color.GREEN
      	}
      });
      var outLine_Positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(outLine);
      var invisiableLine = viewer.entities.add({
      	name: 'polyline',
      	polyline: {
      		positions: outLine_Positions,     
      		width: 5,
      		material: Cesium.Color.RED
      	}
      });
      visiableOrNot="不通视";
  }
}).then(function(){
	distanceMeasurent();
	$("#visiableTips").css("display", "block");
	var text =
	"起点坐标:"+parseFloat(lng_start).toFixed(3)+"°"+","+parseFloat(lat_start).toFixed(3)+"°"+","+parseFloat(height_start/1000).toFixed(3)+"Km"+"<br/>"
	+"终点坐标:"+parseFloat(lng_stop).toFixed(3)+"°"+","+parseFloat(lat_stop).toFixed(3)+"°"+","+parseFloat(height_stop/1000).toFixed(3)+"Km"+"<br/>"
	+"水平距离:"+parseFloat(horizonDistance).toFixed(3)+"Km"+"<br/>"
	+"垂直距离:"+parseFloat(verticalDistance).toFixed(3)+"Km"+"<br/>"
	+"空间距离:"+parseFloat(spaceDistance).toFixed(3)+"Km"+"<br/>"
	+"空间可视:"+visiableOrNot+"<br/>";
	document.getElementById("visiableAnalysisPanel").innerHTML=text;
	var cartographic=Cesium.Cartographic.fromDegrees(lng_stop,lat_stop,height_stop+200);
	var Cartesian3=ellipsoid.cartographicToCartesian(cartographic);
	var removeHandler = viewer.scene.postRender.addEventListener(function () {
		var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cartesian3);
		if(changedC==undefined){
			return;
		}
		else{
			$("#visiableTips").css("left",changedC.x);
			$("#visiableTips").css("top",changedC.y);
		}

	});
});
}
var horizonDistance,verticalDistance,spaceDistance;
function distanceMeasurent(){
	var line = turf.lineString([[lng_start, lat_start], [lng_stop, lat_stop]]);
	horizonDistance = turf.length(line, {units: 'kilometers'});
	verticalDistance=Math.abs(height_stop-height_start)/1000;
	spaceDistance=Math.sqrt(horizonDistance*horizonDistance+verticalDistance*verticalDistance);
}
var clickTimes1=true;


function endVisiable(handler){
	handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  
	handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
// $("#visible-switch").click(function(){
	// if(clickTimes1==true){
		// alert('请用鼠标左键选择起点，右键选择终点！');
		// var terrainProvider = new Cesium.CesiumTerrainProvider({
			// url : 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path/'
		// });
		// viewer.terrainProvider=terrainProvider;
		// selectPoint();
		// return clickTimes1=false;
	// }
	// if (clickTimes1==false) {
		// alert("通视分析结束！");
		//viewer.terrainProvider = ellipsoidTerrainProvider;
		// viewer.entities.removeAll();
		// $("#measure-result-window").css("display", "none");
		// return clickTimes1=true;
		// alert("ss");
		// handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  
		// handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK); 
	// }

// })
  //}
//return AnalysisTool;
//})