		/*
		图层管理ztree js
		生成各部分列表
		*/
		var setting = {
			view: {
				selectedMulti: false
			},
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeCheck: beforeCheck,
				onCheck: onCheck,
				onClick: onClick
			}
		};
		var example3dtile;


		var zNodes =[
			{ id:1, pId:0, name:"3dtile数据", open: true},
			{ id:11, pId:1, name:"建筑单体化"},
			{ id:12, pId:1, name:"水美村"}
			//{ id:13, pId:1, name:"dem",checked:true,doCheck:false},
			// { id:2, pId:0, name:"geojson数据",  open: true},
			// { id:21, pId:2, name:"地形", checked:true},
			// { id:3, pId:0, name:"kml数据",open: true},
			// { id:31, pId:3, name:"大树村", nocheck:true}
		];
		
		var code;
		
		function setCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			py = $("#py").attr("checked")? "p":"",
			sy = $("#sy").attr("checked")? "s":"",
			pn = $("#pn").attr("checked")? "p":"",
			sn = $("#sn").attr("checked")? "s":"",
			type = { "Y":py + sy, "N":pn + sn};
			zTree.setting.check.chkboxType = type;
			showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
		}
		function showCode(str) {
			if (!code) code = $("#code");
			code.empty();
			code.append("<li>"+str+"</li>");
		}
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			setCheck();
			$("#py").bind("change", setCheck);
			$("#sy").bind("change", setCheck);
			$("#pn").bind("change", setCheck);
			$("#sn").bind("change", setCheck);
		});
		
		
		function beforeCheck(treeId, treeNode) {
			//用列举函数来判断当name=咩时加载对应的东西
			var treeName = treeNode.name;
			switch (treeName) {
				case "点云数据":
					return true;           	//打勾/取消前不影响oncheck执行
					break;
				case "dem":	
					
					return false;
					break;
				case "地名":
					return true;		//打勾/取消前不影响oncheck执行
					break;
				
				case "全球地形":
					//没打勾时可以选，打了不可以改
					break;
				case "地形":
					//默认加载dem函数,加一个提示框吧
					var domBtn = document.getElementById('dem-warning');
					if(domBtn.style.display != 'block')
					{
						domBtn.style.display = 'block';
					}
					return false;
					break;
				case "村名":
					break;
			}
		}	
		
		function onCheck(e, treeId, treeNode) {
			//用列举函数来判断当name=咩时加载对应的东西
			var treeName = treeNode.name
			switch (treeName) {
				case "建筑单体化":
					if(treeNode.checked == false)
					{
						//获取加载模型在primitivesCollection中的目录位置来remove
						var primitives = scene.primitives;
						var p = primitives.get(1);
						viewer.scene.primitives.remove(p);
						break;
						}
					if(treeNode.checked == true)
					{
						//打勾时加载3dtiles
						example3dtile = new Cesium.Cesium3DTileset({
							url: 'data/3dtiles/example/Cesium.json',
							maximumScreenSpaceError: 2,
							maximumNumberOfLoadedTiles: 50000
						});
						viewer.scene.primitives.add(example3dtile);
						//对齐
						var translation=Cesium.Cartesian3.fromArray([ -30,30,30]);
						var m= Cesium.Matrix4.fromTranslation(translation);
						//生效
						example3dtile._modelMatrix = m;
						example3dtile.readyPromise.then(function(example3dtile) {
							// Set the camera to view the newly added tileset
							viewer.camera.viewBoundingSphere(example3dtile.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
							//让镜头看向一个目标，取消追踪这个3dtile
							viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
						});
						break;
						}
				case "水美村":
					if(treeNode.checked == false)
					{
						//获取加载模型在primitivesCollection中的目录位置来remove
						var primitives = scene.primitives;
						var p = primitives.get(2);
						viewer.scene.primitives.remove(p);
						break;
						}
					if(treeNode.checked == true)
					{
						//打勾时加载3dtiles
						example3dtile2 = new Cesium.Cesium3DTileset({
							url: 'data/3dtiles/smc_Cesium/Scene/smc_Cesium.json',
							maximumScreenSpaceError: 2,
							maximumNumberOfLoadedTiles: 50000
						});
						viewer.scene.primitives.add(example3dtile2);
						//对齐
						var translation=Cesium.Cartesian3.fromArray([ 1,-160,-20]);
						var m= Cesium.Matrix4.fromTranslation(translation);
						//生效
						example3dtile2._modelMatrix = m;
						example3dtile2.readyPromise.then(function(example3dtile2) {
							// Set the camera to view the newly added tileset
							viewer.camera.viewBoundingSphere(example3dtile2.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
							//让镜头看向一个目标，取消追踪这个3dtile
							viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
						});
						
						//加载billboard指向360那个
						viewer.entities.add({
							id : '360-1',
							name : '水美村360全景',
							position : Cesium.Cartesian3.fromDegrees(116.112044, 24.094531),
							billboard : {
								image : 'img/camera.png', // default: undefined
								show : true, // default
								pixelOffset : new Cesium.Cartesian2(0, 0), // default: (0, 0)
								eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
								horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
								verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
								scale : 2.0, // default: 1.0
								distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 1000.0),
								scaleByDistance : new Cesium.NearFarScalar(10.0, 0.2, 1000.0, 1.0),
								color : Cesium.Color.BLUE, // default: WHITE
								rotation : 0.0,//Cesium.Math.PI_OVER_FOUR, // default: 0.0
								alignedAxis : Cesium.Cartesian3.ZERO, // default
								heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
								width : 30, // default: undefined
								height : 20 // default: undefined
							}
						});
						viewer.entities.add({
							id : '360-2',
							name : '水美村360全景',
							position : Cesium.Cartesian3.fromDegrees(116.101818, 24.098862),
							billboard : {
								image : 'img/camera.png', // default: undefined
								show : true, // default
								pixelOffset : new Cesium.Cartesian2(0, 0), // default: (0, 0)
								eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
								horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
								verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
								scale : 2.0, // default: 1.0
								distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 1000.0),
								scaleByDistance : new Cesium.NearFarScalar(10.0, 0.2, 1000.0, 1.0),
								color : Cesium.Color.BLUE, // default: WHITE
								rotation : 0.0,//Cesium.Math.PI_OVER_FOUR, // default: 0.0
								alignedAxis : Cesium.Cartesian3.ZERO, // default
								heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
								width : 30, // default: undefined
								height : 20 // default: undefined
							}
						});
						viewer.entities.add({
							id : '360-3',
							name : '水美村360全景',
							position : Cesium.Cartesian3.fromDegrees(116.108867, 24.098447),
							billboard : {
								image : 'img/camera.png', // default: undefined
								show : true, // default
								pixelOffset : new Cesium.Cartesian2(0, 0), // default: (0, 0)
								eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
								horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
								verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
								scale : 2.0, // default: 1.0
								distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 1000.0),
								scaleByDistance : new Cesium.NearFarScalar(10.0, 0.2, 1000.0, 1.0),
								color : Cesium.Color.BLUE, // default: WHITE
								rotation : 0.0,//Cesium.Math.PI_OVER_FOUR, // default: 0.0
								alignedAxis : Cesium.Cartesian3.ZERO, // default
								heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
								width : 30, // default: undefined
								height : 20 // default: undefined
							}
						});
						break;
						}
				case "dem":
					break;
				case "地名":
					if(treeNode.checked == false)
					{
						kmlRemove();
						break;
						}
					if(treeNode.checked == true)
					{
						kmlLoad();
						break;
						}
				case "景点":
					if(treeNode.checked == false)
					{
						travelRemove();
						break;
						}
					if(treeNode.checked == true)
					{
						travelLoad();
						break;
						}
				case"公路":
					if(treeNode.checked == false)
					{
						roadRemove();
						break;
						}
					if(treeNode.checked == true)
					{
						roadLoad();
						break;
						}
				case "区域内景点距离":
					if(treeNode.checked == false)
					{
						pointDistanceRemove();
						break;
						}
					if(treeNode.checked == true)
					{
						pointDistance();
						break;
						}
				case "区域外景点距离":
					if(treeNode.checked == false)
					{
						outDistanceRemove();
						break;
						}
					if(treeNode.checked == true)
					{
						outDistance();
						break;
						}
				case "天地图":
					tiandituLoad();
					break;
				case "必应地图":
					bingLoad();
					break;
				case "全地形":
					//默认加载dem函数,加一个提示框吧
					var worldBtn = document.getElementById('world-warning');
					if(worldBtn.style.display != 'block')
					{
						worldBtn.style.display = 'block';
					}
					
					worldTerrainLoad();				//勾选加载全球地形并弹出提示要刷新才可以看回自生产地形
					break;
				case "地形":
					
					break;
					
				case "村界":
					if(countrySwitch == false)
					{
						contrysideLoad();						//开关未打开，执行加载函数，打开开关
						}
					else if (countrySwitch == true)
					{
						contrysideRemove();					//开关打开，执行移除函数，关闭开关
						}
					break;
					
			}
		}	
		
		function onClick(event, treeId, treeNode, clickFlag) {
			var treeName = treeNode.name;
			switch (treeName) {
				case "建筑单体化":
					var example3dtile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
						url: 'data/3dtiles/example/Cesium.json',
						maximumScreenSpaceError: 2,
						maximumNumberOfLoadedTiles: 50000
					}));
				case "磨雄村":
					viewer.zoomTo(moxiongEntity,new Cesium.HeadingPitchRange(-120.0, -0.5, 1000.0));
					break;
			}
		}