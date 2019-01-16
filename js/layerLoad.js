		
		
		var options = {
		camera : viewer.scene.camera,
		canvas : viewer.scene.canvas
		};
		
		function kmlDataLoad(kmlName,kmlPath){
			kmlName.load(kmlPath,options);
		}
		
		/*
		控制加载地名kml
		*/
		// function kmlLoad(){
			// kmlLayer.load('kml/placename.kml',
		 // {
			  // camera: viewer.scene.camera,
			  // canvas: viewer.scene.canvas
		 // });
			// viewer.dataSources.add(kmlLayer);
			
		// }
		
		function kmlLoad(){
			kmlDataLoad(kmlLayer,'kml/placename.kml')
			viewer.dataSources.add(kmlLayer);
		}
		
		//加载景点Km
		function travelLoad(){
			kmlDataLoad(travelLayer,'kml/travel.kml')
			viewer.dataSources.add(travelLayer);
		}
		
		/*
		加载天地图
		要先lower bing地图
		*/
		function tiandituLoad(){
			viewer.imageryLayers.lower(Binglayer);
			var tianMap = new Cesium.WebMapTileServiceImageryProvider({
					url : 'http://t0.tianditu.com/img_w/wmts',
					layer : 'img',
					style : 'default',
					format : 'tiles',
					tileMatrixSetID : 'w',
					credit : new Cesium.Credit('天地图全球影像服务'),
					maximumLevel : 18
				});
			tianLayer = new Cesium.ImageryLayer(tianMap);
			viewer.imageryLayers.add(tianLayer);
			}
		
		
		/*
		加载bing地图
		要先lower天地图
		*/
		function bingLoad(){
			viewer.imageryLayers.lower(tianLayer);
			var bingMap = new Cesium.BingMapsImageryProvider({
					url:'//dev.virtualearth.net',
					key:'RrtMfihZkhPO5yZ7oToT~FpWsSrdQKKlR785PhRAunA~AsteAHRBCGbAimkt8u-n8F_FXnohAU39WqwuVyC7ux5Ei9_ojXWbtX-ycCeU1YD2'
				});
			Binglayer = new Cesium.ImageryLayer(bingMap);
			viewer.imageryLayers.add(Binglayer);	
		}
		
		/*
		加载dom
		要先lower天地图和Bing地图
		*/
		function domLoad(){
			var domMap  =new Cesium.UrlTemplateImageryProvider({
				//url:'./img/1109/{z}/{x}/{y}.png',
				//url:'http://localhost:8090/cesiumMap2/img/08061003/{z}/{x}/{y}.png',
				//查看官网api上的UrlTemplateImagery的接口条件是一定要写zxy
				//url:'http://localhost:9002/api/wmts/gettile/8a21d00917cf41e39e74c9413663a126/{z}/{x}/{y}',
				tilingScheme: new Cesium.WebMercatorTilingScheme(),
				minimumLevel: 0,
				maximumLevel: 20,
			});
			domLayer=new Cesium.ImageryLayer(domMap);
			viewer.imageryLayers.add(domLayer);
		}
		
		//加载dem
		function demLoad(){
			var demMap = new Cesium.UrlTemplateImageryProvider({
				//url:'http://localhost:8090/cesiumProject/img/08061003/{z}/{x}/{y}.png',
				//url:'./img/08061003/{z}/{x}/{y}.png',
				//查看官网api上的UrlTemplateImagery的接口条件是一定要写zxy
				//url:'http://localhost:9002/api/wmts/gettile/8a21d00917cf41e39e74c9413663a126/{z}/{x}/{y}',
				tilingScheme: new Cesium.WebMercatorTilingScheme(),
				minimumLevel: 0,
				maximumLevel: 20,
				});
			demLayer=new Cesium.ImageryLayer(demMap);
			viewer.imageryLayers.add(demLayer);
		}
		
		//取消dem加载
		function demRemove(){
			viewer.imageryLayers.remove(demLayer);
		}
		
		
		/*
		加载世界地形
		*/
		function worldTerrainLoad(){
			worldTerrain = new Cesium.CesiumTerrainProvider({
				url : Cesium.IonResource.fromAssetId(3956),
				requestVertexNormals : true
			});
			viewer.terrainProvider = worldTerrain;
		}
		
		
		
		//取消点云加载
		function pointCloudRemove(){
			//viewer.scene.primitives.removeAll();
			//viewer.scene.primitives.show = false;
			viewer.scene.primitives.remove(tileset);
			viewer.scene.primitives.remove(tileset2);
			viewer.scene.primitives.remove(tileset3);
			viewer.scene.primitives.remove(tileset4);
			viewer.scene.primitives.remove(tileset5);
			viewer.scene.primitives.remove(tileset6);
			viewer.scene.primitives.remove(tileset7);
			viewer.scene.primitives.remove(tileset8);
		}
		
		//取消地名加载
		function kmlRemove(){
			viewer.dataSources.remove(kmlLayer,false);
		}
		
		function travelRemove(){
			viewer.dataSources.remove(travelLayer,false);
		}
		
		
		