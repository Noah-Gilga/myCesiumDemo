	// The viewModel tracks the state of our mini application.
	var viewModel = {
		alpha: 0.3,
		height: 1
	};
	Cesium.knockout.track(viewModel);

	var toolbar = document.getElementById('flood-toolbar');
	Cesium.knockout.applyBindings(viewModel, toolbar);
	
	function diyFlood(){
		DrawDynamicClampGround.startDrawingPolygon(viewer, function (cartesians) {
			//处理结果
			viewer.infoBox = false;
			var polygonOpts = {
                polygon: {
					hierarchy: cartesians,
					extrudedHeight : 0.5,
					material : Cesium.Color.BLUE.withAlpha(0.3),
					clampToGround:true,   									//实现贴地
					classificationType : Cesium.ClassificationType.BOTH
                }
            };
			
			drawingFloodPolygon = viewer.entities.add(polygonOpts);
			drawingFloodPolygon.name = '水淹模拟范围';
			Cesium.knockout.getObservable(viewModel, 'alpha').subscribe(
				function(newValue) {
					var alpha = parseFloat(newValue);
					drawingFloodPolygon.polygon.material = Cesium.Color.BLUE.withAlpha(alpha);
					}
				);

			Cesium.knockout.getObservable(viewModel, 'height').subscribe(
				function(newValue) {
					drawingFloodPolygon.polygon.extrudedHeight = newValue;
					}
				);
		});
		

	}
	
	function diyFloodRemove(){
		viewer.entities.removeAll();
	}
	
	
	function floodExample(){
		var co = [118.325561, 24.568553, 0, 
				  118.329448, 24.566610, 0,
				  118.329575, 24.561365, 0,
				  118.324319, 24.561528, 0,
				  118.324504, 24.564889, 0];
		var water = viewer.entities.add({
			name : 'Blue extruded polygon over Colorado',
			polygon : {
				hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights(co),
				extrudedHeight: 3,
				// vertexFormat allows it to warp around the globe
				vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
				material : Cesium.Color.BLUE.withAlpha(0.3),
			}
		});
		
		

		Cesium.knockout.getObservable(viewModel, 'alpha').subscribe(
			function(newValue) {
				var alpha = parseFloat(newValue);
				water.polygon.material = Cesium.Color.BLUE.withAlpha(alpha);
			}
		);

		Cesium.knockout.getObservable(viewModel, 'height').subscribe(
			function(newValue) {
				water.polygon.extrudedHeight = newValue;
			}
		);
	}