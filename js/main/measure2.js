/******************************************* */
//测量空间直线距离 
/******************************************* */
var measureLineSpace = function (viewer,handler) {
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
    var positions = [];
    var poly = null;
    var tooltip = document.getElementById("toolTip");
    var distance = 0;
	var cartesian = null;
	var floatingPoint;
    tooltip.style.display = "block";
	var resultText = document.getElementById('measure-result');
	resultText.innerHTML='<span>当前正在进行：<br/>距离测量</span>';
    handler.setInputAction(function (movement) {
        tooltip.style.left = movement.endPosition.x + 3 + "px";
        tooltip.style.top = movement.endPosition.y - 25 + "px";
        tooltip.innerHTML = '<p>单击开始，右击结束</p>';
		
		///////=================================
 
		cartesian = viewer.scene.pickPosition(movement.endPosition); 
		
		/////==================================
        //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
            if (!Cesium.defined(poly)) {
                poly = new PolyLinePrimitive(positions);
            } else {
                positions.pop();
                // cartesian.y += (1 + Math.random());
                positions.push(cartesian);
            }
            distance = getSpaceDistance(positions);
			resultText.innerHTML = '<p>当前线段总长度：<br/>' + distance + '</p>';
            // console.log("distance: " + distance);
            // tooltip.innerHTML='<p>'+distance+'米</p>';
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 
    handler.setInputAction(function (movement) {
		resultText.innerHTML = '<p>当前线段总长度：<br/>' + distance + '</p>';
        tooltip.style.display = "none";
		// cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
		cartesian = viewer.scene.pickPosition(movement.position); 
        if (positions.length == 0) {
            positions.push(cartesian.clone());
        }
        positions.push(cartesian);
        //在三维场景中添加Label
		// var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var textDisance = distance + "米";
		
        // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
		floatingPoint = viewer.entities.add({
            name: '空间直线距离',
			// position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
			position:positions[positions.length - 1],
            point: {
                pixelSize: 5,
                color: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.YELLOW,
				outlineWidth: 2,
				heightReference:Cesium.HeightReference.NONE
            },
            label: {
                text: textDisance,
                font: '16px sans-serif',
                fillColor: Cesium.Color.GOLD,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(20, -20),
				heightReference:Cesium.HeightReference.NONE
            }
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
 
    handler.setInputAction(function (movement) {
		//要先取消cesium中自带的双击效果viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		handler.destroy();//关闭事件句柄
		positions.pop();//最后一个点无效
		viewer.entities.remove(floatingPoint);
        tooltip.style.display = "none";
		viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
 
    var PolyLinePrimitive = (function () {
        function _(positions) {
            this.options = {
                name: '直线',
                polyline: {
                    show: true,
                    positions: [],
                    //material: Cesium.Color.CHARTREUSE  ,
					width: 4,
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
            this.positions = positions;
            this._init();
        }
 
        _.prototype._init = function () {
            var _self = this;
            var _update = function () {
                return _self.positions;
            };
            //实时更新polyline.positions
            this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
            viewer.entities.add(this.options);
        };
 
        return _;
    })();	
  
	};
 
  //空间两点距离计算函数
	function getSpaceDistance(positions) {
		var distance = 0;
		for (var i = 0; i < positions.length - 1; i++) { 
			
		var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
		var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i+1]);
		/**根据经纬度计算出距离**/
		var geodesic = new Cesium.EllipsoidGeodesic();
		geodesic.setEndPoints(point1cartographic, point2cartographic);
		var s = geodesic.surfaceDistance;
		//console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
		//返回两点之间的距离
		s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));	
		distance = distance + s;
		}	
		return distance.toFixed(2);    
	}


	//简单高程
	var measureHeight = function (viewer, handler){		
		handler_g = handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);	
		var positions = [];
		var poly = null;
		var tooltip = document.getElementById("toolTip");
		var height = 0;
		var cartesian = null;
		var floatingPoint;
		tooltip.style.display = "block";
		
		handler.setInputAction(function(movement){
			tooltip.style.left = movement.endPosition.x + 3 + "px";
			tooltip.style.top = movement.endPosition.y - 25 + "px";
			tooltip.innerHTML ='<p>单击开始，双击结束</p>';
			cartesian = viewer.scene.pickPosition(movement.endPosition); 
			
			console.log(positions);
			if(positions.length >= 2){
				if (!Cesium.defined(poly)) {
					poly = new PolyLinePrimitive(positions);
				}else{
					positions.pop();					
					positions.push(cartesian);
				}
				height = getHeight(positions);				
			}
		},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		
		handler.setInputAction(function(movement){
			tooltip.style.display = "none";
			
			cartesian = viewer.scene.pickPosition(movement.position); 
	
			if(positions.length == 0) {
				positions.push(cartesian.clone());
				positions.push(cartesian);
 
				floatingPoint_g = floatingPoint = viewer.entities.add({
				//parent:measure_entities,
				name : '高度',
				position : positions[0],				
				point : {
					pixelSize : 5,
					color : Cesium.Color.RED,
					outlineColor : Cesium.Color.WHITE,
					outlineWidth : 2,
					heightReference:Cesium.HeightReference.none 
					},
				label : {
					text : "0米",
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(20, -40)
					}
				});
			}						
			
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		 
		handler.setInputAction(function(movement){
			handler.destroy();
			//positions.pop();//清除移动点			
			tooltip.style.display = "none";
			//viewer_g.entities.remove(floatingPoint);
			// console.log(positions);
			//在三维场景中添加Label
			
			var textDisance = height + "米";
							
			var point1cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
			var point2cartographic = Cesium.Cartographic.fromCartesian(positions[1]);					
			var point_temp= Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(point1cartographic.longitude), Cesium.Math.toDegrees(point1cartographic.latitude),point2cartographic.height);	
			
 
			viewer.entities.add({
				//parent:measure_entities,
				name : '直线距离',
				position : point_temp,			
				point : {
					pixelSize : 5,
					color : Cesium.Color.RED,
					outlineColor : Cesium.Color.WHITE,
					outlineWidth : 2,
					heightReference:Cesium.HeightReference.none 
				},
				label : {
					text : textDisance,
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(20, -20)
				}
			});		
		}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );		
	
		function getHeight(_positions){
			var cartographic = Cesium.Cartographic.fromCartesian(_positions[0]);
			var cartographic1 = Cesium.Cartographic.fromCartesian(_positions[1]);
			var height_temp = cartographic1.height - cartographic.height;				
			return height_temp.toFixed(2);    			
		}
	
		var PolyLinePrimitive = (function(){
			function _(positions){
				this.options = {
					//parent:measure_entities,
					name:'直线',
					polyline : {					
						show : true,
						positions : [],
						material : Cesium.Color.AQUA    ,
						width : 2						
					},
					ellipse : {
						show : true,
						// semiMinorAxis : 30.0,
						// semiMajorAxis : 30.0,
						// height: 20.0,
						material : Cesium.Color.GREEN.withAlpha(0.5),
						outline : true // height must be set for outline to display
					}
				};
				this.positions = positions;
				this._init();
			}
		
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){	
					var temp_position =[];
					temp_position.push( _self.positions[0]);
					var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);					
					var point_temp= Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(point1cartographic.longitude), Cesium.Math.toDegrees(point1cartographic.latitude),point2cartographic.height);			
					temp_position.push(point_temp);
					console.log(temp_position);
					return temp_position;
				};
				var _update_ellipse = function(){					
					return _self.positions[0];
				};
				var _semiMinorAxis = function(){
					var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);
					/**根据经纬度计算出距离**/
					var geodesic = new Cesium.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					return s;
				};
				var _height =  function(){
					var height_temp = getHeight(_self.positions);
					return height_temp;
				};
				//实时更新polyline.positions
				 this.options.polyline.positions = new Cesium.CallbackProperty(_update,false);
				this.options.position = new Cesium.CallbackProperty(_update_ellipse,false);
				this.options.ellipse.semiMinorAxis =new Cesium.CallbackProperty(_semiMinorAxis,false);
				 this.options.ellipse.semiMajorAxis = new Cesium.CallbackProperty(_semiMinorAxis,false);
				this.options.ellipse.height =  new Cesium.CallbackProperty(_height,false);
				viewer.entities.add(this.options);
			};
		
			return _;
		})();
	};



	var measureTriangle = function (viewer, handler){	
		handler_g = handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
		var positionsTriangle = [];
		var tempPoints ;//保存直角点
		var poly = null;
		var tooltip = document.getElementById("toolTip");
		var cartesian = null;
		var floatingPoint;//浮动点
		tooltip.style.display = "block";
		
		handler.setInputAction(function(movement){
			tooltip.style.left = movement.endPosition.x + 3 + "px";
			tooltip.style.top = movement.endPosition.y - 25 + "px";
			tooltip.innerHTML ='<p>单击开始，双击结束</p>';
			cartesian = viewer.scene.pickPosition(movement.endPosition); 
			//cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
			if(positionsTriangle.length >= 2){
				if (!Cesium.defined(poly)) {				
					poly = new PolylinePrimitive(positionsTriangle);
				}else{
					positionsTriangle.pop();				
											
					positionsTriangle.push(cartesian.clone());
					
					tempPoints= point_conf(positionsTriangle);	
					
				}
				// tooltip.innerHTML='<p>'+distance+'米</p>';
			}
		},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		
		handler.setInputAction(function(movement){
			tooltip.style.display = "none";
			
			// cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
			if(positionsTriangle.length == 0) {
				
				cartesian = viewer.scene.pickPosition(movement.position); 
				
				positionsTriangle.push(cartesian.clone());
				
				positionsTriangle.push(cartesian.clone());
				
				
				// tempPoints= point_conf(positionsTriangle);	
	 
				floatingPoint_g = floatingPoint = viewer.entities.add({
					//parent:measure_entities,
					name : '多边形面积',
					position : positionsTriangle[0],			
					point : {
						pixelSize : 5,
						color : Cesium.Color.RED,
						outlineColor : Cesium.Color.WHITE,
						outlineWidth : 2,
						heightReference:Cesium.HeightReference.none 
					}
				});	
			}		
		},Cesium.ScreenSpaceEventType.LEFT_CLICK);
		 
		handler.setInputAction(function(movement){
			handler.destroy();	
			// handler_g.destroy();//关闭事件句柄		
			tooltip.style.display = "none";
			
			// tempPoints =point_conf(positionsTriangle);
			//在三维场景中添加线
			var tempPositions1 =[];
			var tempPositions2 =[];
			tempPositions1.push(positionsTriangle[0].clone());
			tempPositions1.push(tempPoints.clone());
			var textDistance = getHeight(tempPositions1) + "米";
			
			viewer.entities.add({
				//parent:measure_entities,
				name : '等经纬度',
				position : tempPositions1[0].clone(),
				polyline : {					
					show : true,
					positions : tempPositions1,
					material :  new Cesium.PolylineDashMaterialProperty({
							color: Cesium.Color.RED
						}),
					width : 2						
				},
				label : {
					text : textDistance,
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(20, -20)
				}
			});		
			
			tempPositions2.push(tempPoints.clone());
			tempPositions2.push(positionsTriangle[1].clone());
			textDistance = getDistance(tempPositions2) + "公里";
			
			viewer.entities.add({
				//parent:measure_entities,
				name : '等高度直线',
				position : tempPositions2[0].clone(),
				polyline : {					
					show : true,
					positions : tempPositions2,
					material :  new Cesium.PolylineDashMaterialProperty({
							color: Cesium.Color.RED
						}),
					width : 2						
				},
				label : {
					text : textDistance,
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(60, -20)
				}
			});		
	 
		}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );	
	 
		
		var PolylinePrimitive = (function(){
			function _(positions){
				this.options = {
					//parent:measure_entities,
					name:'直线',
					polyline : {					
						show : true,
						positions : [],
						material : Cesium.Color.GOLD ,
						width : 2						
					},
					label : {					
						font : '18px sans-serif',
						fillColor : Cesium.Color.GOLD,
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						outlineWidth : 2,
						verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
						pixelOffset : new Cesium.Cartesian2(20, -40)
					}
				};
				
				this.positions = positions;
				this._init();
			}
		
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){				
					return _self.positions;
				};
				var _update_label = function(){
					return _self.positions[1].clone();
				};
				var _text = function(){
					var text_temp = getSpaceDistance(_self.positions);
					text_temp = text_temp +"公里";
					return text_temp;
				};
				//实时更新polygon.hierarchy
				this.options.polyline.positions = new Cesium.CallbackProperty(_update,false);
				this.options.position = new Cesium.CallbackProperty(_update_label,false);
				this.options.label.text =new Cesium.CallbackProperty(_text,false);
				viewer.entities.add(this.options);
			};	
			return _;
		})();
		
	};
	