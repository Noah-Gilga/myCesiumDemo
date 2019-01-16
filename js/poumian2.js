	//*BUG不能计算竖直两个点 echarts最大最小获取有时候又问题*/
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
	var scartesian,ecartesian;		//起点和终点的地理坐标
	var pointSum = 10;
	var handler;
	function poumian(){
		handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
		handler.setInputAction(function(movement) {
			lng_start=null;
			lat_start=null;
			height_start=null;
			lng_stop=null;
			lat_stop=null;
			height_stop=null;
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
			//document.getElementById("measure-result").style.display = 'bolck';
			document.getElementById("measure-result").innerHTML = '<span>当前正在进行：<br/>通视分析</span>';
			//获取起点表面坐标
			var adaptivePosition=viewer.scene.pickPosition(movement.position);
			scartesian=viewer.scene.pickPosition(movement.position);
			if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
				//转成经纬度坐标
				var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition); 
				//起点的经纬度和高度
				lng_start = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
				lat_start = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
				height_start= positionCarto.height;
				//在地图上显示
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
			//鼠标左键添加起点
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		
		handler.setInputAction(function(movement) {
			//获取终点表面坐标
			var adaptivePosition=viewer.scene.pickPosition(movement.position);
			ecartesian=viewer.scene.pickPosition(movement.position);
			if (scene.pickPositionSupported && Cesium.defined(adaptivePosition)) {
				//转成经纬度
				var positionCarto = Cesium.Cartographic.fromCartesian(adaptivePosition);
				//终点的经纬度和高度
				lng_stop = Cesium.Math.toDegrees(positionCarto.longitude).toFixed(8);
				lat_stop = Cesium.Math.toDegrees(positionCarto.latitude).toFixed(8);
				height_stop= positionCarto.height; 
				//在地球上显示
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
				document.getElementById("measure-result").innerHTML = '<span>当前正在进行：<br/>请继续</span>';
				cutPoumian();
				//alert(height_lerp);
				//右键选择终点且同时会执行函数
			}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		}
		
		function cutPoumian(){
			
			for(var i=0;i<=1000;i++){
				//分成1000份差值
				lng_lerp[i]=parseFloat(lng_start)+parseFloat(i*(lng_stop-lng_start)/1000);
				lat_lerp[i]=parseFloat(lat_start)+parseFloat(i*(lat_stop-lat_start)/1000);
				height_lerp[i]=parseFloat(height_start)+parseFloat(i*(height_stop-height_start)/1000);
				
				//将每个插值点存入cartographic数组
				cartographic.push(Cesium.Cartographic.fromDegrees(lng_lerp[i], lat_lerp[i], height_lerp[i]));
				cartographic_lerp.push(Cesium.Cartographic.fromDegrees(lng_lerp[i], lat_lerp[i], height_lerp[i]));
			}

			var sceneHeight = [];
			for(var i = 0; i< cartographic.length;i++){
				sceneHeight[i] = viewer.scene.sampleHeight(cartographic[i]);
			}
			
			/*
			//或者1000差值点的模型cartesian高
			var moudleHeight = [];
			//1000个差值点坐标
			var moudleCartesian = [];
			var heightPick;
			//每个差值点模型的cartographic高
			var moudleCartoHeight = [];
			for(var i=0; i<= 1000 ; i++){
				moudleCartesian[i] = new Cesium.Cartesian2(lng_lerp[i], lat_lerp[i]);
				//或者高度的xyzcartesian
				heightPick = viewer.scene.pickPosition(moudleCartesian[i]);
				moudleCartoHeight[i] = Cesium.Cartographic.fromCartesian(heightPick);
				//得到cartesian值要再转cartographic才有高
				moudleHeight[i] = moudleCartoHeight[i].height;
				
			}
			alert(moudleHeight[1000]);
			*/
			

			var count = 5000;
			var moudleHeight = [];
			var moudleCartesian =[];
			var cartesians = new Array(count);
			for (var i = 0; i < count; ++i) {
				var offset = i / (count - 1);
				cartesians[i] = Cesium.Cartesian3.lerp(scartesian, ecartesian, offset, new Cesium.Cartesian3());
				moudleCartesian[i] = viewer.scene.clampToHeight(cartesians[i]);
				moudleHeight[i] = Cesium.Cartographic.fromCartesian(moudleCartesian[i]).height;
			}
			

			viewer.entities.add({
				polyline : {
					positions : cartesians,
					followSurface : false,
					width : 2,
					material : new Cesium.PolylineOutlineMaterialProperty({
						color : Cesium.Color.YELLOW
					}),
					depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
						color : Cesium.Color.YELLOW
					})
				}
			});
			
			//Cesium.sampleHeightMostDetailed(cartographic)
			//promise.then(function(raisedPositionsCartograhpic){
			//then((raisedPositionsCartograhpic) =>{
				//var raisedPositions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(raisedPositionsCartograhpic);
				//var a=raisedPositionsCartograhpic;
				//for(i=0;i<raisedPositionsCartograhpic.length;i++){
				//	//height_terrain.push(raisedPositionsCartograhpic[i].height);
				//}
				for(var i=10;i<=1001;i++){
					var forward_hl =height_lerp[i-1];
					var forward_ht = sceneHeight[i-1];

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
							material: Cesium.Color.GREEN.withAlpha(0.001)
						}
					});
					//visiableOrNot="通视";
					//document.getElementById("measure-result").innerHTML='<span>两点之间：' + visiableOrNot +'</span>';
				}
				else{
					for(var i=1;i<=1001;i++){
						var forward_hl2 =height_lerp[i-1];
						var forward_ht2 = sceneHeight[i-1];
						var backward_ht2 = sceneHeight[i];
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
				}
			
			var inLine=cartographic_lerp.slice(0,inPoint[0]);
			var outLine=cartographic_lerp.slice(inPoint[0]);
			var inLine_Positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(inLine);
			var partvisiableLine = viewer.entities.add({
				name: 'polyline',
				polyline: {
					positions: inLine_Positions,     
					width: 5,
					material: Cesium.Color.GREEN.withAlpha(0.001)
				}
			});
			var outLine_Positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(outLine);
			var invisiableLine = viewer.entities.add({
				name: 'polyline',
				polyline: {
					positions: outLine_Positions,     
					width: 5,
					material: Cesium.Color.RED.withAlpha(0.001)
				}
			});
			
			//visiableOrNot="不通视";
			//document.getElementById("measure-result").innerHTML='<span>两点之间：' + visiableOrNot + '</span>';
			
			var juli = Math.round(Cesium.Cartesian3.distance(scartesian,ecartesian)); //dp1、dp2 都是三维坐标系
            var yData = moudleHeight;
            var xData = [];
			
            for (var i = 0; i < yData.length; i++){
				yData[i] = yData[i].toFixed(2);
			}
			
			for (var i = 0; i < count; ++i) {
				if(i == 0){
                    xData[i] = 0;
                }else {
                    var offset = i / (count - 1);
				xData[i] = Math.round(Cesium.Math.lerp(0, juli, offset));
				xData[i] = xData[i].toFixed(2);
                }
			}
			
			//document.getElementById("poumian").innerHTML = '<span>当前正在进行：<br/>请继续' + height_lerp + '</span>'+;
			var myChart = echarts.init(document.getElementById('poumian')); 
			
			var option = {
                title : {
                    text: '剖面示意图',
                    left: 'center',
                    subtext: '',
                    textStyle: {
                        color: 'white',
                        fontSize:15
                    }
                },
				backgroundColor : 'rgba(0, 0, 0, 0.6)',
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['']
                },
                //右上角工具条
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        name:"长度(米)",
                        boundaryGap : false,
                        data : xData,
                        axisLabel : {
                            textStyle: {
                                color: 'white'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"white"
                                }
                            }
                        }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:"高程（米）",
                        axisLabel : {
                            // formatter: '{value} 米',
                            textStyle: {
                                color: 'white'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"white"
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'高程',
                        type:'line',
                        data:yData,
                        // markPoint : {
                            // data : [
                                // {type : 'max', name: '最大值'},
                                // {type : 'min', name: '最小值'}
                            // ]
                        // },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };



			// 为echarts对象加载数据 
			myChart.setOption(option); 
			
		
	}
	var clickTimes2=true;
	$("#cutTerrrain-switch").click(function(){
		if(clickTimes2==true){
			var poumianWin = document.getElementById('poumian');
			if(poumianWin.style.display != 'block')
			{
				poumianWin.style.display = 'block';
			}
			
			alert('正在进行剖面分析，请用鼠标左键选择起点，右键选择终点！再次点击该按钮结束。');
			poumian();
			return clickTimes2=false;
		}
		if (clickTimes2==false) {
			alert("剖面分析结束！");
			var poumianWin = document.getElementById('poumian');
			if(poumianWin.style.display != 'none')
			{
				poumianWin.style.display = 'none';
			}
			//viewer.terrainProvider = ellipsoidTerrainProvider;
			handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  
			handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			viewer.entities.removeAll();
			$("#poumian").css("display", "none");
			return clickTimes2=true;
			 
		}

	})