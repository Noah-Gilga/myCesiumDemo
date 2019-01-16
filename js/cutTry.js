	var leftX = 0;
    var leftY = 0;
	var rightX,rightY;
	
	var height_left,height_right;
	var heightArr = [];
	
	function selectCutPoint(){
		var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
		var scartographic,ecartographic;		//起点和终点的地理坐标
		var slongitude;
        var slatitude;
        var sheight;
 
        var elongitude;
        var elatitude;
        var eheight;
		
		handler.setInputAction(function(movement) {
			//初始点的点坐标
			//cartesian3
			var adaptivePosition = viewer.scene.pickPosition(movement.position);
			leftX = adaptivePosition.x;
            leftY = adaptivePosition.y;
			var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition);
			scartographic = Cesium.Cartographic.fromCartesian(adaptivePosition);
			height_left = positionCarto.height;
			
			if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
				var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition); 
				lng_start = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
				lat_start = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
				height_start= positionCarto.height;       
				var point_start={
					position : Cesium.Cartesian3.fromDegrees(parseFloat(lng_start),parseFloat(lat_start),parseFloat(height_start)),
					billboard : {
						image : './img/marker.png',
						color: Cesium.Color.BLUE,
						scale : 0.3,
						verticalOrigin : Cesium.VerticalOrigin.BOTTOM
					}
				}
				viewer.entities.add(point_start);
			}
			
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		
		handler.setInputAction(function(movement) {
			//终点的点坐标
			var adaptivePosition=viewer.scene.pickPosition(movement.position);
			rightX = adaptivePosition.x;
            rightY = adaptivePosition.y;
            rightZ = adaptivePosition.z;
			var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition);
			ecartographic = Cesium.Cartographic.fromCartesian(adaptivePosition);
			height_right = positionCarto.height;
			
			if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
				var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition); 
				lng_stop = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
				lat_stop = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
				height_stop= positionCarto.height;       
				var point_stop={
					position : Cesium.Cartesian3.fromDegrees(parseFloat(lng_stop),parseFloat(lat_stop),parseFloat(height_stop)),
					billboard : {
						image : './img/marker.png',
						color: Cesium.Color.YELLOW,
						scale : 0.3,
						verticalOrigin : Cesium.VerticalOrigin.BOTTOM
					}
				}
				viewer.entities.add(point_stop);
			}
			
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		countHeightLerp(scartographic);
		
		alert(scartographic);
	} 
	
	
	function countHeightLerp(scartographic){
		slongitude = Cesium.Math.toDegrees(scartographic.longitude);
        slatitude = Cesium.Math.toDegrees(scartographic.latitude);
        sheight = scartographic.height;
 
        elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
        elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
        eheight = ecartographic.height;
		
		
		var pointSum = 10;  //取样点个数
			//两个点之间的经纬度相差值
        var addXTT = Cesium.Math.lerp(slongitude, elongitude, 1.0/pointSum) - slongitude;
        var addYTT = Cesium.Math.lerp(slatitude, elatitude, 1.0/pointSum) - slatitude;
 
 
        var addX = Cesium.Math.lerp(leftX, rightX, 1.0/pointSum) - leftX;
        var addY = Cesium.Math.lerp(leftY, rightY, 1.0/pointSum) - leftY;
		alert(addY);
        
 
        var dp1,dp2;
 
        for(var i =0; i < pointSum; i++){
 
            var longitude = slongitude + (i+1) * addXTT;
            var latitude = slatitude + (i+1) * addYTT;
			//循环计算得出10个点经纬度
            if (i == 0){
                dp1 = new Cesium.Cartesian3(longitude, latitude, 0);
            } else if (i == 1){
                dp2 = new Cesium.Cartesian3(longitude, latitude, 0);
            }
 
            var x = leftX + (i+1) * addX;
            var y = leftY + (i+1) * addY;
 
            var eventPosition = {x:x,y:y};
 
            // var ray = viewer.camera.getPickRay(eventPosition);
            var position = viewer.scene.pick(eventPosition);
            if (Cesium.defined(position)) {
                var cartographic = Cesium.Cartographic.fromCartesian(position);
                    console.log("点击处海拔高度为：" + cartographic.height +"米");
                    heightArr[i] = cartographic.height.toFixed(2);   //保留两位小数
					
            }
 
        }
		
	}
	
	function all(){
		selectPoint();
		countHeightLerp()
	}