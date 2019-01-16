var bxmap = bxmap || {};
bxmap.FlyCesium = {
    cesiumViewer: null,
    draw3DObj:null,
    drawHelper:null,
    isDrawFly: false,//设定路线模式
    drawPolyline: null,//飞行绘制路线
        data: [{ id: '1', name: '路线1', geojson: '{"orientation":{"heading":90.07372076173362352,"pitch":-10.5574628887292024,"roll":30},"position":{"x":572886.362, "y":2920291.908,"z":1400},"geometry":{"type":"LineString","coordinates":[[105.72,26.3763],[105.7316,26.3655],[105.7058,26.3483]]}}' },
		{ id: '2', name: '路线2', geojson: '{"orientation":{"heading":90.07372076173362352,"pitch":-10.5574628887292024,"roll":30},"position":{"x":567365.060, "y":2916416.264,"z":1400},"geometry":{"type":"LineString","coordinates":[[105.6781,26.3594],[105.6839,26.3616],[105.7017,26.3638]]}}' }],//],//漫游路径信息模拟数据
    Init: function (cesiumViewer, drawHelper) {
        this.cesiumViewer = cesiumViewer; //cesium对象
        this.drawHelper = drawHelper;//drawHelper对象
        this.InitEvent();
        this.loadData();
    },
    InitEvent:function () {
        //飞行路径顶端部分的切换事件
        $(".fly3DPaths_tab li").bind("click", function () {
            $('.fly3DPaths_tab_ul>li').each(function(index){
                $('.fly3DPaths_tab_ul>li').eq(index).removeClass('select');
            })
            //三角形标识切换
            switch ($(this).index()) {
                case 0://预设路线
                    $('#overFlyClick').addClass('select');
                    $("#overFlyPage").css({ display: "block" });
                    $("#drawFlyPage").css({ display: "none" });
                    bxmap.FlyCesium.loadData();
                    break;
                case 1://手动绘制
                    $('#drawFlyCilck').addClass('select');
                    $("#overFlyPage").css({ display: "none" });
                    $("#drawFlyPage").css({ display: "block" });
                    break;
            }
        });
        //开始飞行
        $("#start_Fly3DPaths").click(function(){
            //debugger;
            if(bxmap.FlyCesium.draw3DObj){
                bxmap.FlyCesium.showFly3DPaths(bxmap.FlyCesium.draw3DObj);
            }else{
                jDialog.dialog({
                    title: "提示信息",
                    modal: true,// 非模态，即不显示遮罩层
                    autoClose: 1500,
                    content: "漫游路线不存在"
                });
            }
        });
        //暂停飞行
        $("#pause_Fly3DPaths").click(function(){
            bxmap.FlyCesium.pauseFly3DPaths();
        });
		$("#pause_Fly3DPaths2").click(function(){
            bxmap.FlyCesium.pauseFly3DPaths();
        });
        //向前飞行
        $("#playForward_Fly3DPaths").click(function(){
            bxmap.FlyCesium.playForwardFly3DPaths();
        });
        //向后飞行
        $("#playReverse_Fly3DPaths").click(function(){
            bxmap.FlyCesium.playReverseFly3DPaths();
        });
        //退出飞行
        $("#stop_Fly3DPaths").click(function(){
            $("#cesiumFly3DPaths").click();
            bxmap.FlyCesium.stopFly3DPaths();
        });
        //清空路线
        $("#clear_Fly3DPaths").click(function(){
            bxmap.FlyCesium.clearFly3DPaths();
        });

        //设定路线
        $("#draw_Fly3DPaths").click(function(){
            if(!bxmap.FlyCesium.drawHelper){
                bxmap.FlyCesium.drawHelper = new DrawHelper(bxmap.FlyCesium.cesiumViewer);
            }
            bxmap.FlyCesium.draw3DObj = bxmap.FlyCesium.DrawFly3DPaths(bxmap.FlyCesium.drawHelper);
        });
        //保存路线
        $("#save_Fly3DPaths").click(function(){
            if(bxmap.FlyCesium.draw3DObj && bxmap.FlyCesium.isDrawFly){
                jDialog.dialog({
                    title: '保存路线',
                    content: '<div><span>名称:</span><input type="text" id="FlyAdd_name" value="'+name+'"></div>',
                    width: 300,
                    height: 120,
                    modal: true,// 非模态，即不显示遮罩层
                    buttons: [
                        {
                            text: '确定',
                            handler: function (button, dialog) {
                                var draw3DObj=JSON.stringify(bxmap.FlyCesium.draw3DObj); //将JSON对象转化为JSON字符
                                var TbFly={id:Math.random().toString(36).substr(2),name:$("#FlyAdd_name").val(),geojson:draw3DObj};
                                bxmap.FlyCesium.data.push(TbFly);
                                $("#overFlyClick").click();
                                dialog.close();
                                bxmap.FlyCesium.clearFly3DPaths();

                            }
                        }, {
                            text: '取消',
                            handler: function (button, dialog) {
                                dialog.close();
                            }
                        }
                    ]
                });

            }else{
                jDialog.dialog({
                    title: "提示信息",
                    modal: true,// 非模态，即不显示遮罩层
                    autoClose: 1500,
                    content: "设定的漫游路线不存在，请绘制再保存"
                });
            }

        });

    },
    //飞行路径列表表格监听事件
    flyTableOnclick:function () {
        $("#overFly_table td").click(function () {
            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());//选中的哪行
            var geojson = $("#overFly_table tr:gt(0):eq(" + trSeq + ") td:eq(5)").text();//获取选中行的geojson列值
            var name = $("#overFly_table tr:gt(0):eq(" + trSeq + ") td:eq(0)").text();//获取选中行的name列值
            var id = $("#overFly_table tr:gt(0):eq(" + trSeq + ") td:eq(4)").text();//获取选中行的id列值
            geojson = eval("(" + geojson + ")");
            var tdSeq = $(this).parent().find("td").index($(this));//选中哪一列
            switch (tdSeq) {
                case 0://名称
                    break;
                case 1://飞行
                    bxmap.FlyCesium.draw3DObj = geojson;
                    //bxmap.FlyCesium.cesium.showFly3DPaths(geojson);
                    bxmap.FlyCesium.showFly3DPaths(geojson);
                    $("#drawFlyCilck").click();
                    break;
                case 2://修改
                    
                    break;
                case 3://删除
                    //删除
                    
                    break;
            }
        })
    },
    /**
     * 从数组中移除指定的元素,要是存在的话
     @ serviceArray筛选数组
     @ id移除元素id
     */
    delElement: function (serviceArray, id) {
        var array = [];
        for (var i = 0; i < serviceArray.length; i++) {
            if (serviceArray[i].id != id) {
                array.push(serviceArray[i]);
            }
        }
        return array;
    },
    /**
     * 从数组中修改指定的元素,要是存在的话
     @ serviceArray筛选数组
     @ id修改元素id
     @ name修改元素名称
     */
    modifyElement: function (serviceArray, id, name) {
        var array = [];
        for (var i = 0; i < serviceArray.length; i++) {
            if (serviceArray[i].id == id) {
                serviceArray[i].name = name;
            }
            array.push(serviceArray[i]);
        }
        return array;
    },
    loadData:function () {
        var data = bxmap.FlyCesium.data;
        var html=''
        if (data.length>0) {
            for(var i=0;i<data.length;i++){
                var flydata=data[i];
                html+='<tr>'+
                    // '<td><input type="checkbox" name="FLYNAME" id="'+flydata.id+'" style="cursor: pointer;" onchange=""></td>'+
                    '<td style="width:20px;"><a style="color:#fff;text-decoration:none;font-size:12px;">'+flydata.name+'</a></td>'+
                    '<td style="width:20px;"><button class="btn btn-default btn-xs" style="color:#fff;background-color:#fff0;"><img style="width:20px;height:20px;" src="img/go.png"/></button></td>'+
					//'<td style="width:20px;"><button class="btn btn-default btn-xs" style="color:#fff;">飞行</button></td>'+
                    '<td><button class="btn btn-default btn-xs" style="color:#fff;">修改</button></td>'+
                    '<td><button class="btn btn-default btn-xs" style="color:#fff;">删除</button></td>'+
                    "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.id + "</a></td>" +
                    "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.geojson + "</a></td>" +
                    "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.position + "</a></td>" +
                    "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.orientation + "</a></td>" +
                    '</tr>';
            }
            $("#overFly_table tbody").html(html);
			$('#overFly_table').find('td:eq(2)').hide();//隐藏orientation字段列
			$('#overFly_table').find('td:eq(3)').hide();//隐藏orientation字段列
            $('#overFly_table').find('td:eq(4)').hide();//隐藏id字段列
            $('#overFly_table').find('td:eq(5)').hide();//隐藏geojson字段列
            $('#overFly_table').find('td:eq(6)').hide();//隐藏position字段列
            $('#overFly_table').find('td:eq(7)').hide();//隐藏orientation字段列
			$('#overFly_table').find('td:eq(10)').hide();//隐藏orientation字段列
			$('#overFly_table').find('td:eq(11)').hide();//隐藏orientation字段列
			$('#overFly_table').find('td:eq(12)').hide();//隐藏orientation字段列
			$('#overFly_table').find('td:eq(13)').hide();//隐藏orientation字段列
			
			$('#overFly_table').find('td:eq(14)').hide();//隐藏orientation字段列
			
			$('#overFly_table').find('td:eq(15)').hide();//隐藏orientation字段列
			
			$('#overFly_table').find('th:eq(2)').hide();//隐藏修改行
			
			$('#overFly_table').find('th:eq(3)').hide();//隐藏删除行
            //表格---行点击事件
            bxmap.FlyCesium.flyTableOnclick();
        }
    },
    /**
 * 清空漫游路径
 * @method stopFly3DPaths
 * @param
 * @return
 */
    clearFly3DPaths: function () {
        this.cesiumViewer.trackedEntity = undefined;
        bxmap.FlyCesium.isDrawFly = false;
        bxmap.FlyCesium.draw3DObj = null;
        this.cesiumViewer.entities.removeAll();//清空所有模型
        //清空绘制飞行路线
        if (this.drawPolyline) {
            this.cesiumViewer.scene.primitives.remove(this.drawPolyline);
            this.drawPolyline = null;
        }
    },
    /**
 * 飞行漫游路径
 * @method showFly3DPaths
 * @param  pathsData 飞行路径信息,格式如下:{"orientation":{"heading":2.411783930363565,"pitch":-0.21097267398444197,"roll":0.0015622392231300353},"position": {"x":-2206260.239730831,"y":5510911.392077349,"z":2331987.10863007}, "geometry":{"type": "LineString", "coordinates": [[101.80089882736969, 26.60700234866561], [101.80082205161088, 26.607156056057718]]} }
 * @param  position 飞行路径跳转位置
 同时也要设置飞行的高度
 * @return
 */
 showFly3DPaths:function(pathsData){
    var T = this;
    this.clearFly3DPaths();
    T.cesiumViewer.camera.setView({
        destination : pathsData.position,
        orientation: pathsData.orientation,
    });
    setTimeout(function () {
        executeFly3D();
    }, 200);
    function executeFly3D() {
        if(pathsData && pathsData.geometry){
            var positionA = pathsData.geometry.coordinates;
            var position = [];
            if(positionA.length>0){
                for (var i = 0; i < positionA.length; i++) {
                    var x = positionA[i][0];
                    var y = positionA[i][1];
					var z = 1400;
                    position.push({ x: x, y: y ,z:z});
                }
            }else{
                return;
            }
            function computeCirclularFlight() {
                var property = new Cesium.SampledPositionProperty();
                for (var i = 0; i < position.length; i++) {
                    if (i == 0) {
                        var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                        //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                        var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1400);
                        property.addSample(time, _position);
                    }
                    if (i < 10000 && i > 0) {
                        var position_a = new Cesium.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1]);
                        if (i < 976) {
                            //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                            var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1400);
                        }
                        else if (i > 975 && i < 986) {
                           // var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 20 * (i - 980));
                           var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1400);
                        }
                        else if (i > 985) {
                            //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 200);
                            var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1400);
                        }

                        var positions = [Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_a), Cesium.Ellipsoid.WGS84.cartesianToCartographic(_position)];
                        var a = new Cesium.EllipsoidGeodesic(positions[0], positions[1]);
                        var long = a.surfaceDistance;
                        var _time = long/50;
                        var time = Cesium.JulianDate.addSeconds(property._property._times[i - 1], _time, new Cesium.JulianDate());

                        property.addSample(time, _position);
                    }
                }
                return property;
            }
            var start = Cesium.JulianDate.fromDate(new Date(2018, 3, 15, 16));
            var stop = Cesium.JulianDate.addSeconds(start, 30000, new Cesium.JulianDate());

            //Make sure viewer is at the desired time.
            T.cesiumViewer.clock.startTime = start.clone();
            T.cesiumViewer.clock.stopTime = stop.clone();
            T.cesiumViewer.clock.currentTime = start.clone();
            T.cesiumViewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
            //T.cesiumViewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED; //
            //T.cesiumViewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; //
            //T.cesiumViewer.clock.multiplier = 10;//值越大，飞行越快
            T.cesiumViewer.clock.multiplier = 0.6;
            T.cesiumViewer.clock.canAnimate = false;
            T.cesiumViewer.clock.shouldAnimate = true;//设置时间轴动态效果

            var _position = computeCirclularFlight();

            T.entityFly = T.cesiumViewer.entities.add({
                //Set the entity availability to the same interval as the simulation time.
                availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                })]),
                position: _position,
                orientation: new Cesium.VelocityOrientationProperty(_position),
                /*model: {
                    uri:GLOBAL.domainResource+"/systems/common-bx-gis/models/cesium/SampleData/models/CesiumAir/Cesium_Air.gltf",
                    scale: 6,
                    minimumPixelSize: 64,
                    //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },*/
                point:{
                    color:Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.01),
                    outlineColor:Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.01),
                    outlineWidth:1,
                    pixelSize:15,
                },
                //Show the path as a pink line sampled in 1 second increments.
                path: {
                    resolution: 1,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.1,
                        color:Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.0001)
                    }),
                    //width: 30
                    width: 10
                }
            });
            T.cesiumViewer.trackedEntity = T.entityFly;
            setTimeout(function () {
                T.cesiumViewer.camera.zoomOut(500.0);//缩小地图，避免底图没有数据
            }, 100);
        }else{
            return;
        }
    }
 },
    /**
 * 暂停飞行漫游路径
 * @method pauseFly3DPaths
 * @return
 */
 pauseFly3DPaths: function () {
     var clockViewModel = this.cesiumViewer.clockViewModel;
     if (clockViewModel.shouldAnimate) {
         clockViewModel.shouldAnimate = false;
     } else if (this.cesiumViewer.clockViewModel.canAnimate) {
         clockViewModel.shouldAnimate = true;
     }
 },
    /**
   * 向前飞行漫游路径
   * @method playForwardFly3DPaths
   * @return
   */
 playForwardFly3DPaths: function () {
     var clockViewModel = this.cesiumViewer.clockViewModel;
     var multiplier = clockViewModel.multiplier;
     if (multiplier < 0) {
         clockViewModel.multiplier = -multiplier;
     }
     clockViewModel.shouldAnimate = true;
 },
    /**
     * 向后飞行漫游路径
     * @method playForwardFly3DPaths
     * @return
     */
 playReverseFly3DPaths: function () {
     var clockViewModel = this.cesiumViewer.clockViewModel;
     var multiplier = clockViewModel.multiplier;
     if (multiplier > 0) {
         clockViewModel.multiplier = -multiplier;
     }
     clockViewModel.shouldAnimate = true;
 },
    /**
  * 设定飞行漫游路径
  * @method DrawFly3DPaths
  * @return
  */
 DrawFly3DPaths: function (drawHelper) {
     var T = this;
     this.clearFly3DPaths();
     drawHelper.startDrawingPolyline({
         callback: function (positions) {
             T.drawPolyline = new DrawHelper.PolylinePrimitive({
                 positions: positions,
                 width: 5,
                 type: "plot",
                 geodesic: true
             });
             T.cesiumViewer.scene.primitives.add(T.drawPolyline);
             T.drawPolyline.setEditable();
             //构造设定路线的返回信息
             var coordinates = [];
             var position = null;
             var heading =45; //null;
             var pitch =45; //null;
             var roll = 45; //null;
             for (var i = 0; i < positions.length; i++) {
                 var cartographic = Cesium.Cartographic.fromCartesian(positions[i]);//世界坐标转地理坐标（弧度）
                 var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];//地理坐标（弧度）转经纬度坐标
                 //console.log(point);
                 coordinates.push(point);
             }
             //orientation":{"heading":2.411783930363565,"pitch":-0.21097267398444197,"roll":0.0015622392231300353},"position": {"x":-2206260.239730831,"y":5510911.392077349,"z":2331987.10863007},
             position = drawHelper._cameraPosition;
             heading = drawHelper._cameraHeading;
             pitch = drawHelper._cameraPitch;
             roll = drawHelper._cameraRoll;
             var pathsData = { "orientation": { "heading": heading, "pitch": pitch, "roll": roll }, "position": position, "geometry": { "type": "LineString", "coordinates": coordinates } };

             //var pathsData = { "orientation": { "heading": heading, "pitch": pitch, "roll": roll }, "position": position, "geometry": { "type": "LineString", "coordinates": coordinates } };
             if (bxmap.FlyCesium) {
                 bxmap.FlyCesium.draw3DObj = T.draw3DObj = pathsData;
                 bxmap.FlyCesium.isDrawFly = true;
             }
             //return T.draw3DObj;

         }
     });
 },
    /**
 * 退出飞行漫游路径
 * @method stopFly3DPaths
 * @param
 * @return
 */
 stopFly3DPaths: function () {
     var start = Cesium.JulianDate.fromDate(new Date());
     this.cesiumViewer.clock.startTime = start.clone();
     var stop = Cesium.JulianDate.addSeconds(start, 300000000, new Cesium.JulianDate());
     this.cesiumViewer.clock.stopTime = stop.clone();
     //this.cesiumViewer.entities.remove(this.entityFly);
     this.clearFly3DPaths();
 },


}


