		// The viewModel2 tracks the state of our mini application.
	var viewModel2 = {
		height: 1
	};
	Cesium.knockout.track(viewModel2);

	var toolbar = document.getElementById('3dHeight-toolbar');
	Cesium.knockout.applyBindings(viewModel2, toolbar);
	
	function change3dHeight(){
		
		var m;
		var primitives = scene.primitives;
		var p = primitives.get(2);
		Cesium.knockout.getObservable(viewModel2, 'height').subscribe(
			function(newValue) {
				var translation = Cesium.Cartesian3.fromArray([1,1,parseFloat(newValue)]);
				p._modelMatrix = Cesium.Matrix4.fromTranslation(translation);
				viewer.scene.primitives.update(p);
				}
			);	
		
	
	}
	
	