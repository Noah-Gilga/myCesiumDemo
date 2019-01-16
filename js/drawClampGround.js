	//画多段线
	function drawPolyline() {
        DrawDynamicClampGround.startDrawingPolyline(viewer, function (cartesians) {
        //处理结果
		//绘制是不出现cesium的infoBox
		viewer.infoBox = false;
		var lineOpts = {
            polyline: {
				positions: cartesians,
				clampToGround: true,  // 
				width: 3,
				material: Cesium.Color.BLUE.withAlpha(0.5),
			}
        };
        drawingPolyline = viewer.entities.add(lineOpts);
        });
    }
	
	//画点-贴地CLAMP_TO_GROUND
	function drawPoint() {
        DrawDynamicClampGround.startDrawPoint(viewer, function (cartesians) {
        //处理结果
		viewer.infoBox = false;
		var drawingPoints = viewer.entities.add({
			//点的坐标要用笛卡尔坐标
			position :cartesians,
			point : {
				pixelSize : 15,
				color : Cesium.Color.RED,
				outlineColor : Cesium.Color.WHITE,
				outlineWidth : 2,
				//贴地
				heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
			}
		});
        });
	
    }
	
	//画点-贴地RELATIVE_TO_GROUND
	function drawModulePoint() {
        DrawDynamicClampGround.startDrawPoint(viewer, function (cartesians) {
        //处理结果
		viewer.infoBox = false;
		var drawingPoints = viewer.entities.add({
			//点的坐标要用笛卡尔坐标
			position :cartesians,
			point : {
				pixelSize : 15,
				color : Cesium.Color.PURPLE,
				outlineColor : Cesium.Color.WHITE,
				outlineWidth : 2,
				//贴地
				heightReference : Cesium.HeightReference.RELATIVE_TO_GROUND
			}
		});
        });
	
    }
	
	//画面
	function drawPolygon() {
        DrawDynamicClampGround.startDrawingPolygon(viewer, function (cartesians) {
			//处理结果
			viewer.infoBox = false;
			var polygonOpts = {
                polygon: {
				hierarchy: cartesians,
				material : Cesium.Color.YELLOW.withAlpha(0.3),
				clampToGround:true,   									//实现贴地
				classificationType : Cesium.ClassificationType.BOTH
                }
            };
			drawingPolygon = viewer.entities.add(polygonOpts);
        });
    }
	
	//通视线
	function drawVisiblePolyline(){
		DrawDynamicClampGround.startDrawingVisiblePolyline(viewer, function (cartesians) {
        //处理结果
		viewer.infoBox = false;
		var lineSees = {
            polyline: {
				positions: cartesians,
				followSurface: false,  // 
				width: 6,
				material : new Cesium.PolylineOutlineMaterialProperty({
                    color : Cesium.Color.ORANGE,
                    outlineWidth : 2,
                    outlineColor : Cesium.Color.BLACK
                })//,
				// depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                    // color : Cesium.Color.GREEN.withAlpha(0.01),
					// outlineWidth : 2,
                    // outlineColor : Cesium.Color.BLACK
                // })
			}
        };
        drawingPolyline = viewer.entities.add(lineSees);
        });
	}
	
	//画模型线
	function drawModulePolyline(){
		DrawDynamicClampGround.startDrawingVisiblePolyline(viewer, function (cartesians) {
        //处理结果
		viewer.infoBox = false;
		var lineOpts = {
            polyline: {
				positions: cartesians,
				followSurface: false,  // 
				width: 6,
				material : new Cesium.PolylineOutlineMaterialProperty({
                    color : Cesium.Color.ORANGE,
                    outlineWidth : 2,
                    outlineColor : Cesium.Color.BLACK
                }),
				depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                    color : Cesium.Color.GREEN.withAlpha(0.01),
					outlineWidth : 0,
                    outlineColor : Cesium.Color.BLACK
                })
			}
        };
        drawingPolyline = viewer.entities.add(lineOpts);
        });
	}
	
	
	
	//画淹没面面
	function drawPolygonFlood() {
        DrawDynamicClampGround.startDrawingPolygon(viewer, function (cartesians) {
			//处理结果
			viewer.infoBox = false;
			var polygonOpts = {
                polygon: {
				hierarchy: cartesians,
				extrudedHeight : 10,
				material : Cesium.Color.BLUE.withAlpha(0.3),
				clampToGround:true,   									//实现贴地
				classificationType : Cesium.ClassificationType.BOTH
                }
            };
			
			drawingPolygon = viewer.entities.add(polygonOpts);
			
        });
    }
	
	//清楚
	function drawRemove(){
		viewer.entities.removeAll();
	}