define(['Cesium','SuperMap','js/analysis/Convert','echartsMin','js/polygonStatistics/tooltip'],function(Cesium, Super, Convert,echarts,tooltip) {
    'use strict';
    var $ = require('jquery');
 
  /*
  * 剖面分析对象
  * 画线截取剖面
  * 起点信息和终点信息
  * 分析结果小窗口显示
  *
  * */
    var handlerLine;
    var line;
    var profile = function () {
    };
    var crossProfile;
    var htmlStr =
        '<div style="position: absolute;background-color: rgba(38, 38, 38, 0.75)">' +
        '<button style="background-color: rgba(38, 38, 38, 0.75);float: right;margin-top: 10px;margin-right: 10px;" aria-label="Close" id="closeScene" class="myModal-close" title="关闭"><span aria-hidden="true">×</span></button><br><br>' +
        '<div id="pro" style="width: 600px;height: 400px;">' +
        '</div>'+
        '</div>';
 
    profile.remove = function(){
        $('#profileLong1').val(0.0);
        $('#profileLat1').val(0.0);
        $('#profileAlt1').val(0.0);
        $('#profileLong2').val(0.0);
        $('#profileLat2').val(0.0);
        $('#profileAlt2').val(0.0);
         if(handlerLine){
             handlerLine.clear();
         }
 
        $("#sceneAttribute").hide();
        $("#pro").width(0);
        $("#pro").height(0);
 
        if(crossProfile){
            crossProfile.destroy();
            crossProfile = undefined;
        }
    };
 
    profile.initializing = function(viewer){
        $("#sceneAttribute").empty().append(htmlStr);
        $("#sceneAttribute").hide();
        $("#closeScene").bind("click",function () {
            $("#sceneAttribute").hide();
            if(handlerLine){
                handlerLine.clear();
            }
        })
        var scene = viewer.scene;
 
        var tooltip = createTooltip(document.body);
 
        if(!crossProfile){
            crossProfile = new Cesium.Profile(scene);
        }
        if(handlerLine){
            handlerLine.clear();
        }
        handlerLine = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Line);
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
 
 
        handlerLine.activeEvt.addEventListener(function(isActive){
            if(isActive == true){
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('drawCur').addClass('drawCur');
            }
            else{
                viewer.enableCursorStyle = true;
                $('body').removeClass('drawCur');
            }
        });
        handlerLine.movingEvt.addEventListener(function(windowPosition){
            if(handlerLine.isDrawing){
                console.log("第一个点绘制完成");
                tooltip.showAt(windowPosition,'<p>右键单击结束绘制</p>');
            }
            else{
                tooltip.showAt(windowPosition,'<p>点击绘制第一个点</p>');
            }
        });
 
        var leftX = 0;
        var leftY = 0;
 
        var rightX,rightY;
 
        handler.setInputAction(function (leftEvent) {
            leftX = leftEvent.position.x;
            leftY = leftEvent.position.y;
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
 
            handler.setInputAction(function (rightEvent) {
                rightX = rightEvent.position.x;
                rightY = rightEvent.position.y;
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
 
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
 
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
 
        handlerLine.drawEvt.addEventListener(function(result) {
            setTimeout(function () {
                console.log("最后一个点绘制完成");
                tooltip.setVisible(false);
                line=result.object;
                var startPoint = line._positions[0];
                var endPoint = line._positions[line._positions.length - 1];
                //起止点相关信息
                var scartographic = Cesium.Cartographic.fromCartesian(startPoint);
                var slongitude = Cesium.Math.toDegrees(scartographic.longitude);
                var slatitude = Cesium.Math.toDegrees(scartographic.latitude);
                var sheight = scartographic.height;
 
                var ecartographic = Cesium.Cartographic.fromCartesian(endPoint);
                var elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
                var elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
                var eheight = ecartographic.height;
                $('#profileLong1').val(slongitude);
                $('#profileLat1').val(slatitude);
                $('#profileAlt1').val(sheight);
                $('#profileLong2').val(elongitude);
                $('#profileLat2').val(elatitude);
                $('#profileAlt2').val(eheight);
                $("#sceneAttribute").show();
 
                var pointSum = 10;  //取样点个数
				//两个点之间的经纬度相差值
                var addXTT = Cesium.Math.lerp(slongitude, elongitude, 1.0/pointSum) - slongitude;
                var addYTT = Cesium.Math.lerp(slatitude, elatitude, 1.0/pointSum) - slatitude;
 
 
                var addX = Cesium.Math.lerp(leftX, rightX, 1.0/pointSum) - leftX;
                var addY = Cesium.Math.lerp(leftY, rightY, 1.0/pointSum) - leftY;
 
                var heightArr = [];
 
                var dp1,dp2;
 
                for(var i =0; i < pointSum; i++){
 
                    var longitude = slongitude + (i+1) * addXTT;
                    var latitude = slatitude + (i+1) * addYTT;
					//循环计算得出10个点
                    if (i == 0){
                        dp1 = new Cesium.Cartesian3(longitude, latitude, 0);
                    } else if (i == 1){
                        dp2 = new Cesium.Cartesian3(longitude, latitude, 0);
                    }
 
                    var x = leftX + (i+1) * addX;
                    var y = leftY + (i+1) * addY;
 
                    var eventPosition = {x:x,y:y};
 
                    var ray = viewer.camera.getPickRay(eventPosition);
                    var position = viewer.scene.globe.pick(ray, viewer.scene);
                    if (Cesium.defined(position)) {
                        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
                        console.log("点击处海拔高度为：" + cartographic.height +"米");
                        heightArr[i] = cartographic.height.toFixed(2);   //保留两位小数
 
                    }
 
                }
 
                //计算两个三维坐标之间的距离
                var juli = Math.round(Cesium.Cartesian3.distance(dp1,dp2) * 100000); //dp1、dp2 都是三维坐标系
                var yData = heightArr;
                var xData = [];
 
                for (var i = 0; i < pointSum;i++){
                    if(i == 0){
                        xData[i] = 0;
                    }else {
                        xData[i] = xData[i - 1] + juli;
                    }
                }
 
                var myChart = echarts.init(document.getElementById("pro"));
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
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
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
 
 
 
            },5);
 
        });
 
        handlerLine.activate();
 
        $('#profileLong1').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val()));
            line._positions[0] = cartesian;
           line._polylineCollection._polylines[0]._positions[0] = cartesian;
            crossProfile.startPoint = [parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val())];
        })
 
        $('#profileLat1').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val()));
            line._positions[0] = cartesian;
            crossProfile.startPoint = [parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val())];
        })
 
        $('#profileAlt1').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val()));
            line._positions[0] = cartesian;
            crossProfile.startPoint = [parseFloat($('#profileLong1').val()), parseFloat($('#profileLat1').val()), parseFloat($('#profileAlt1').val())];
        })
 
        $('#profileLong2').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val()));
            line._positions[line._positions.length - 1] = cartesian;
            crossProfile.endPoint = [parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val())];
        })
 
        $('#profileLat2').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val()));
            line._positions[line._positions.length - 1] = cartesian;
            crossProfile.endPoint = [parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val())];
        })
 
        $('#profileAlt2').on('input propertychange',function(){
            var  cartesian =  Cesium.Cartesian3.fromDegrees(parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val()));
            line._positions[line._positions.length - 1] = cartesian;
            crossProfile.endPoint = [parseFloat($('#profileLong2').val()), parseFloat($('#profileLat2').val()), parseFloat($('#profileAlt2').val())];
        })
 
        $("#profileDel").bind("click",function () {
            profile.remove();
        })
 
    }
 
 
    return profile;
});
