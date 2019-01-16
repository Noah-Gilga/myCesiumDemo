/*
	var Binglayer;		
	//checkbox选中区域点云
	$('#layerChooser').click(function(){
		if(layer2.checked){
					var bingMap = new Cesium.BingMapsImageryProvider({
						url:'//dev.virtualearth.net',
						key:'RrtMfihZkhPO5yZ7oToT~FpWsSrdQKKlR785PhRAunA~AsteAHRBCGbAimkt8u-n8F_FXnohAU39WqwuVyC7ux5Ei9_ojXWbtX-ycCeU1YD2'
					});
					Binglayer=new Cesium.ImageryLayer(bingMap);
					viewer.imageryLayers.add(Binglayer);
				}
				else{
					viewer.imageryLayers.remove(Binglayer);
				}

			});
*/
	
	//加载村范围的json
	
	
    /*
	Cesium.Math.setRandomNumberSeed(0);
 
    var promise =Cesium.GeoJsonDataSource.load('kml/cun_project.json',{
		clampToGround:true
	});
 
    promise.then(function (dataSource) {
 
        viewer.dataSources.add(dataSource);
 
        var entities =dataSource.entities.values;
 
        var colorHash = {};
 
        for (var i = 0; i < entities.length;i++) {
 
            var entity = entities[i];
 
            var name = entity.id;
 
            var color = colorHash[name];
 
            if (!color) {
 
                color =Cesium.Color.fromRandom({
 
                    alpha: 0.5
 
                });
 
                colorHash[name] = color;
 
            }
 
            entity.polygon.material = color;
 
            entity.polygon.outline = false;
 
           entity.polygon.extrudedHeight =1500.0;
 
        }
 
    });
	*/
	
	
	
	


	//固定加载dom
	
	// var bingMap = new Cesium.UrlTemplateImageryProvider({
		// url:'http://localhost:8090/cesiumProject/img/1114/{z}/{x}/{y}.png',
		// url:'http://localhost:8090/cesiumProject/img/1109/{z}/{x}/{y}.png',
		// 查看官网api上的UrlTemplateImagery的接口条件是一定要写zxy
		// url:'http://localhost:9002/api/wmts/gettile/8a21d00917cf41e39e74c9413663a126/{z}/{x}/{y}',
		// tilingScheme: new Cesium.WebMercatorTilingScheme(),
		// minimumLevel: 0,
		// maximumLevel: 20,
		// });
	// Binglayer=new Cesium.ImageryLayer(bingMap);
	// viewer.imageryLayers.add(Binglayer);
	
	
	//加载阴影效果
	$('#shadow').click(function () {
		var shadowCheck = document.getElementById('shadow');
		if(shadowCheck.checked == true)
		{
			viewer.shadows = true;
			viewer.terrainShadows = Cesium.ShadowMode.ENABLED;
			var shadowMap = viewer.shadowMap;
			shadowMap.maxmimumDistance = 10000.0;
		}
		else
		{
			viewer.shadows = false;
		}
	});
	
	
	//clock重置时间
	$('#resetTime').click(function(){
		var resetTime = viewer.clockViewModel.startTime;
		viewer.clockViewModel.currentTime = resetTime;
		viewer.timeline.updateFromClock();
		alert('重置时间成功！');
	});
	
	//加速
	$('#riseTime').click(function(){
		viewer.clockViewModel.multiplier *= 2;
	});
	
	//减速
	$('#slowTime').click(function(){
		viewer.clockViewModel.multiplier /= 2;
	});
	
	//开始clock
	$('#startTime').click(function(){
		if(clock.shouldAnimate == false)
		{
			clock.shouldAnimate = true;
		}
		else
		{
			//弹出提示已经开始了
			var startWarn = document.getElementById('startClockWarning');
			if(startWarn.style.display != 'block' )
			{
				startWarn.style.display = 'block';
			}
			else 
			{
				startWarn.style.display = 'none';
			}
		}
	});
	
	//停止clock
	$('#stopTime').click(function(){
		if(clock.shouldAnimate == true)
		{
			clock.shouldAnimate = false;
		}
		else
		{
			//弹出提示已经停止了
			var stopWarn = document.getElementById('stopClockWarning');
			if(stopWarn.style.display != 'block' )
			{
				stopWarn.style.display = 'block';
			}
			else 
			{
				stopWarn.style.display = 'none';
			}
		}
	});
	
	//update点云样式方法
	
	function handler(event){
		
		
			
			
			tileset.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset2.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset3.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset4.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset5.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset6.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset7.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			tileset8.style = new Cesium.Cesium3DTileStyle({
				//color : 'vec4(${Temperature})',
				pointSize : this.value
			});
			viewer.scene.primitives.update(tileset);
			viewer.scene.primitives.update(tileset2);
			viewer.scene.primitives.update(tileset3);
			viewer.scene.primitives.update(tileset4);
			viewer.scene.primitives.update(tileset5);
			viewer.scene.primitives.update(tileset6);
			viewer.scene.primitives.update(tileset7);
			viewer.scene.primitives.update(tileset8);
			viewer.scene.primitives.show=true;
		
	}
	
	
	
	
	$("#pointcloudLayerSelect").change( handler );
	
	/*
	var value= document.getElementById('pointcloudLayerSelect');
	function handler(event){
	alert(value);
}


*/

	//重置场景
	function resetScene() {

    //viewer.trackedEntity = undefined;

   // viewer.dataSources.removeAll();

   // viewer.entities.removeAll();

    viewer.scene.primitives.remove(tileset);

  //  viewer.clock.shouldAnimate = false;

   // handler = handler && handler.destroy();

    //scene.skyBox.show = true;

    //scene.camera.flyHome(0.0);

    //scene.requestRender();

    //viewModel.showTimeOptions = false;

    //viewModel.timeChangeEnabled = false;

    //viewModel.maximumRenderTimeChange = 0;

}
	
	
	
/** 
* 
* //@param hex 例如:"#23ff45" 
* //@param opacity 透明度 
* //@returns {string} 
*/ 
	//16进制的颜色转成rgb格式
	function hexToRgba(hex) { 
		//return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) +  ")"; 
	}
	
	//开始着色
	$('#colorApply').click(function () {
	    //alert($("#pointcloudLayerSelect").find("option:selected").val());    获取selected option中改的value
	    var ptnSize = $("#pointcloudLayerSelect").find("option:selected").val();
		//获取应用按钮的ID，点击应用按钮时应用分类颜色同时关闭窗口
		var colorGround = hexToRgba(document.getElementById('ground').value);            
		//获取地面颜色的值        2
		var colorLowVeg = hexToRgba(document.getElementById('lowVegetation').value);
		//获取低矮植被的颜色值    3
		var colorMedVeg = hexToRgba(document.getElementById('mediumVegetation').value);
		//获取中高灌木的颜色值    4
		var colorWater = hexToRgba(document.getElementById('water').value);
		//获取中高灌木的颜色值    9
		var colorHegVeg = hexToRgba(document.getElementById('highVegetation').value);
		//获取高大乔木的颜色值    5
		var colorBuilding = hexToRgba(document.getElementById('building').value);
		//获取建筑物颜色值        6
		var colorRailway = hexToRgba(document.getElementById('railway').value);
		//获取铁路的颜色值       10
		var colorRoad = hexToRgba(document.getElementById('road').value);
		//获取公路的颜色值       11
		var colorOverlap = hexToRgba(document.getElementById('overlap').value);
		//获取overlap的颜色值    12
		var colorWirGud = hexToRgba(document.getElementById('wireGuard').value);
		//获取钢丝铁网的颜色值   13
		var colorWirCond = hexToRgba(document.getElementById('wireConductor').value);
		//获取钢丝引导器的颜色值 14
		var colorTower = hexToRgba(document.getElementById('tramsimissonTower').value);
		//获取杆塔的颜色值       15
		var colorConnector = hexToRgba(document.getElementById('wireSturctureConnerctor').value);
		//获取连接器的颜色值     16
		var colorBridge = hexToRgba(document.getElementById('bridge').value);
		//获取桥梁的颜色值       17
		var colorUnclassified = hexToRgba(document.getElementById('unclassified').value);
		//获取未分类的颜色值      1
		var colorLowptn = hexToRgba(document.getElementById('lowPoint').value);
		//获取lowPoint的颜色值    7
		var colorHegptn = hexToRgba(document.getElementById('hightPoint').value);
		//获取hightPoint的颜色值 18
		var colorKeyptn = hexToRgba(document.getElementById('keyPoint').value);
		//获取keyPoint的颜色值    8
		var colorUnclass= hexToRgba(document.getElementById('unclassified').value);
		//未分类的颜色值
		//1.
		tileset.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
            pointSize:ptnSize
				//pointSize : this.value
			});
			
		//2.
		tileset2.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//3.
		tileset3.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//4.
		tileset4.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//5.
		tileset5.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//6.
		tileset6.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//7.
		tileset7.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
		//8.
		tileset8.style = new Cesium.Cesium3DTileStyle({
				color :  {
							conditions: [
								["${Classification} >=16.9", colorUnclass],
								["${Classification} >=15.9", colorHegptn],                        //hexToRgba已经返回的是个string了 不需要再加""
								["${Classification} >=14.9", colorTower],
								["${Classification} >=13.9", colorWirCond],
								["${Classification} >=12.9", colorWirGud],
								["${Classification} >=10.9", colorRoad],
								["${Classification} >=9.9", colorRailway],
								["${Classification} >=8.9", colorWater],
								["${Classification} >=5.9", colorBuilding],
								["${Classification} >=4.9", colorHegVeg],
								["${Classification} >= 3.9", colorMedVeg],
								["${Classification} >= 2.9", colorLowVeg],
								["${Classification} >= 1.9", colorGround],
								["true", colorUnclass]
							]
				},
				pointSize: ptnSize
				//pointSize : this.value
			});
			
			//实现tileset的style更新
			viewer.scene.primitives.update(tileset);
			viewer.scene.primitives.update(tileset2);
			viewer.scene.primitives.update(tileset3);
			viewer.scene.primitives.update(tileset4);
			viewer.scene.primitives.update(tileset5);
			viewer.scene.primitives.update(tileset6);
			viewer.scene.primitives.update(tileset7);
			viewer.scene.primitives.update(tileset8);
			viewer.scene.primitives.show=true;
		
		
	});
	
	
	
	
	//点击还原分类着色按钮，实现着色回到原来的颜色
	$('#undoClassify').click(function(){
		tileset.style = new Cesium.Cesium3DTileStyle();
		tileset2.style = new Cesium.Cesium3DTileStyle();
		tileset3.style = new Cesium.Cesium3DTileStyle();
		tileset4.style = new Cesium.Cesium3DTileStyle();
		tileset5.style = new Cesium.Cesium3DTileStyle();
		tileset6.style = new Cesium.Cesium3DTileStyle();
		tileset7.style = new Cesium.Cesium3DTileStyle();
		tileset8.style = new Cesium.Cesium3DTileStyle();
		viewer.scene.primitives.update(tileset);
			viewer.scene.primitives.update(tileset2);
			viewer.scene.primitives.update(tileset3);
			viewer.scene.primitives.update(tileset4);
			viewer.scene.primitives.update(tileset5);
			viewer.scene.primitives.update(tileset6);
			viewer.scene.primitives.update(tileset7);
			viewer.scene.primitives.update(tileset8);
			viewer.scene.primitives.show=true;
	});
	
	
	/*
	
	//构建水淹颜色函数（单一）
	function getColorRamp() {                                                                                                                                                                                                                                
			var ramp = document.createElement('canvas');
			ramp.width = 100;
			ramp.height = 1;
			var ctx = ramp.getContext('2d');

			//var values =  elevationRamp ;
			/*干净的水
			var my_gradient=ctx.createLinearGradient(0,0,17,0);
			my_gradient.addColorStop(1,"#336666a1");
			my_gradient.addColorStop(0.5,"#7b9ce8a1");//好看#87CEFA
			my_gradient.addColorStop(0,"black");
			ctx.fillStyle=my_gradient;
			ctx.fillRect(0,0,15,100);
			
			var my_gradient=ctx.createLinearGradient(0,0,17,0);
			my_gradient.addColorStop(1,"#d2a68cad");      //#336666a1
			my_gradient.addColorStop(0.5,"#da9167db");//好看#87CEFA    #7b9ce8a1  
			my_gradient.addColorStop(0,"black");
			ctx.fillStyle=my_gradient;
			ctx.fillRect(0,0,15,100);
			return ramp;
		};
		
		
		
		
	
		//获取的那个text中的值是string 要转成number不要shader会报错
		var minHeight = 1100.0; // approximate dead sea elevation
		//var maxHeight = Number(document.getElementById("water-height").value); // approximate everest elevation
		
		function getElevationContourMaterial(a) {
			// Creates a composite material with both elevation shading and contour lines
			//创建具有高程阴影和轮廓线的复合材质
			return new Cesium.Material({
				fabric: {
					//type: 'ElevationColorContour',
					//materials: {
					//	contourMaterial: {
					//		color: contourColor,
					//		spacing:'150',
					//		width: '2px'
							
					//	},
						//elevationRampMaterial: {
							type: 'ElevationRamp',
							uniforms : {
								image: getColorRamp(),
								minimumHeight: minHeight,
								maximumHeight: a	   
								}
							//}
					//}
				},
				translucent: false
			});
		}
		
		var countHeight = 1;                														//高度计数器
		var floodHeight = Number(document.getElementById("water-height").value);                   //输入的水淹的海拔高度
		var floodSpeed = Number(document.getElementById("water-speed").value);						//输入水淹的平均速度
		var countTime = ((floodHeight - minHeight)/floodSpeed-1);                                           //模拟时间
		var resultTime = countTime+1;
		var material = getElevationContourMaterial(1000);
		globe.material = material;
		function changeTime(){
            //setInterval()计时器的关闭
				if(countTime<=0){
				
					window.clearInterval(interval);													//清除计时器
					
				}
				//不可以吧globe以及material的赋值放在这个函数里，这样会导致每次执行函数都要重新创建material
				//正确的逻辑是在全局创建好material，在函数动态修改material中uniform的maximumHeight的值
				//ie自带的浏览器不支持canvas
				globe.material.uniforms.maximumHeight = Number(minHeight + Number(countHeight*floodSpeed));
				countHeight++;
				countTime--;
				
			}
		
		
		function alertValue()
		{
			countHeight = 1;                														//高度计数器
			floodHeight = Number(document.getElementById("water-height").value);                   //输入的水淹的海拔高度
			floodSpeed = Number(document.getElementById("water-speed").value);
			countTime = (floodHeight - minHeight)/floodSpeed-1;                                           //模拟时间
			resultTime = countTime+1;
			
			//以下参数应该为全局变量
			//var countHeight = 1;                														//高度计数器
			//var floodHeight = Number(document.getElementById("water-height").value);                   //输入的水淹的海拔高度
			//var countTime = (floodHeight - minHeight)/100-1;                                           //模拟时间
			//定义计时器，每一秒改变一次globe material
			var interval = self.setInterval("changeTime()",1000);

			//设定计时器，过了对应时间执行提示函数
			setTimeout("codefans2()",Number(resultTime)*1000);	
			

		}
		
		
		//点击退出水淹模拟，将渲染高度回到1100
		$('#flood-stop-btn').click(function () {
			
			globe.material.uniforms.maximumHeight = 1200;
			
		});
		
		*/
		
		$('#btn1').click(function(){
			var xVal = $("#xlayer").val();
			var yVal = $("#ylayer").val();
			var zVal = $("#zlayer").val();
			
			
			//台贸小镇模型没贴地 需要通过调整矩阵来让它贴地
			var translation=Cesium.Cartesian3.fromArray([ xVal,yVal,zVal]);
			var m= Cesium.Matrix4.fromTranslation(translation);
			var primitives = scene.primitives;
			var p = primitives.get(2);
			//生效
			p._modelMatrix = m;
			viewer.scene.primitives.update(p);
		});
		
		
		
	