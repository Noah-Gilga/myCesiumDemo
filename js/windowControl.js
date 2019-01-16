
	//打开着色器
	$('#shader-switch').click(function(){
		var classifiedBtn = document.getElementById('colorClassify');
		if(classifiedBtn.style.display != 'block')
		{
			classifiedBtn.style.display = 'block';
		}
		else
		{
			alert('你已经打开分类着色器了，请勿重复打开！');
		}
	});
	
	
	
	//点击关闭按钮关闭着色器
	$('#colorClose').click(function(){
		var classified = document.getElementById('colorClassify');
		if(classified.style.display != 'none')
		{
			classified.style.display = 'none';
		}
	});
	
	
	//打开水淹模拟窗口
	$('#flood-switch').click(function(){
		var floodBtn = document.getElementById('flood-toolbar');
		if(floodBtn.style.display != 'block')
		{
			floodBtn.style.display = 'block';
		}
		else
		{
			alert('你已经打开水淹模拟窗口了，请勿重复打开！');
		}
	});
	
	//点击关闭水淹模拟窗口
	$('#flood-close-btn').click(function(){
		var floodBtn = document.getElementById('flood-toolbar');
		if(floodBtn.style.display != 'none')
		{
			floodBtn.style.display = 'none';
			handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  
			handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK); 
		}
	});
	
	

	
	
	//令分类着色器可以拖动
	function dragFunc(id) {
		var Drag = document.getElementById(id);
		Drag.onmousedown = function(event) {
			var ev = event || window.event;
			event.stopPropagation();
			var disX = ev.clientX - Drag.offsetLeft;
			var disY = ev.clientY - Drag.offsetTop;
			document.onmousemove = function(event) {
				var ev = event || window.event;
				Drag.style.left = ev.clientX - disX + "px";
				Drag.style.top = ev.clientY - disY + "px";
				Drag.style.cursor = "move";
			};
		};
		Drag.onmouseup = function() {
			document.onmousemove = null;
			this.style.cursor = "default";
		};
	};
	dragFunc("colorClassify");           //实现函数
	dragFunc("big"); 					//实现工具窗口也可以拖动
	//dragFunc("flood-sim-window");		//实现淹没模拟窗口也可以拖动
	dragFunc("effectOnMap");
	//dragFunc("3dHeight-toolbar");
	//dragFunc("flood-toolbar");
	
	
	
	//打开工具箱
	$('#tool-switch').click(function () {
		var bigTool = document.getElementById('effectOnMap');
		if(bigTool.style.display != 'block')
		{
			bigTool.style.display = 'block';
		}
	});
	
	
	//关闭工具箱
	
	$('#tool-close').click(function () {
		var bigTool = document.getElementById('effectOnMap');
		if(bigTool.style.display != 'none')
		{
			bigTool.style.display = 'none';
		}
	});
	
	//打开工具箱
	$('#changeHeight-switch').click(function () {
		var Height3D = document.getElementById('3dHeight-toolbar');
		if(Height3D.style.display != 'block')
		{
			Height3D.style.display = 'block';
		}
	});
	
	
	//关闭工具箱
	
	$('#3dHeight-close-btn').click(function () {
		var Height3D = document.getElementById('3dHeight-toolbar');
		if(Height3D.style.display != 'none')
		{
			Height3D.style.display = 'none';
		}
	});
	//打开动态加载3dtile窗口
	$('#btnAdd3d').click(function () {
		var Height3D = document.getElementById('add-toolbar');
		if(Height3D.style.display != 'block')
		{
			Height3D.style.display = 'block';
		}
	});
	//关闭动态加载3dtile窗口
	$('#add-close-btn').click(function () {
		var Height3D = document.getElementById('add-toolbar');
		if(Height3D.style.display != 'none')
		{
			Height3D.style.display = 'none';
		}
	});
	
	//关闭iframe窗口
	$('#inframe-close').click(function () {
		var iframeWin = document.getElementById('iframe-360-1');
		if(iframeWin.style.display != 'none')
		{
			iframeWin.style.display = 'none';
		}
	});
	
	//点击打开绘图工具
	$('#draw-switch').click(function () {
		if(getToolbar.style.display!='block')
		{
			getToolbar.style.display = 'block';
		}
		else
		{
			getToolbar.style.display = 'none';                  //打开时再次点击该按钮实现关闭
		}
	});
	
	//点击打开贴地绘图工具
	$('#clamp-switch').click(function () {
		var clampDraw = document.getElementById('draw-control');
		if(clampDraw.style.display!='block')
		{
			clampDraw.style.display = 'block';
		}
		else
		{
			clampDraw.style.display = 'none';                  //打开时再次点击该按钮实现关闭
		}
	});
	
	//点击打开通视分析工具
	//$('#visible-switch').click(function () {
		//var visibleDraw = document.getElementById('visible-control');
		//if(visibleDraw.style.display!='block')
		//{
			//visibleDraw.style.display = 'block';
		//}
		//else
		//{
		//	visibleDraw.style.display = 'none';                  //打开时再次点击该按钮实现关闭
		//}
	//});
	
	
	//点击引导按钮弹出操作提示
	$('#opera-switch').click(function () {
		var mask = document.getElementById('mask-load2');
		if(mask.style.display != 'block')
		{
			mask.style.display = 'block';
		}
	});
	
	//点击其他地方提示关闭
	$('#mask-load2').click(function () {
		$("#mask-load2").hide();
	});
	
	//打开帮助
	$('#info-switch').click(function () {
		var intro = document.getElementById('intro-box');
		if(intro.style.display != 'block')
		{
			intro.style.display = 'block';
		}
	});
	
	//关闭帮助方法1
	$('#helpBtn').click(function () {
		var intro = document.getElementById('intro-box');
		if(intro.style.display != 'none')
		{
			intro.style.display = 'none';
		}
	});
	
	//打开分享窗口
	$('#share-switch').click(function () {
		var share = document.getElementById('modal-content');
		if(share.style.display != 'block')
		{
			share.style.display = 'block';
		}
	});
	
	//关闭分享窗口
	
	$('#shareBtn').click(function () {
		var share = document.getElementById('modal-content');
		if(share.style.display != 'none')
		{
			share.style.display = 'none';
		}
	});
	
	
	//复制分享的连接
	$('#copyBtn').click(function () {
		var copyText =document.getElementById("input_dlink");
		copyText.select(); // 选中文本
		document.execCommand("copy"); // 执行浏览器复制命令
		alert("已成功复制的剪贴板！");

	});
	
	
	
		
	//模拟结果div定时消失
	function codefans(){
		var box=document.getElementById("flood-result");
		if(box.style.display !='none')
		{
			box.style.display="none";
		}				
	};
		
	//模拟结果div定时显示
	function codefans2(){
		var box=document.getElementById("flood-result");
		if(box.style.display !='block')
		{
			box.style.display="block";
		}	
		setTimeout("codefans()",2000);
	};
		
		
	
	
		//打开/关闭量测工具 &打开测量结果工具
	// $('#measure-switch').click(function () {
		// var measureTool = document.getElementById('tool_container');
		// var measureResult = document.getElementById('measure-result-window');
		// var measureResultShow = document.getElementById('measure-result');
		// if(measureResult.style.display != 'block')
		// {
			// measureResult.style.display = 'block';
		// }
		// measureResultShow.innerHTML = "<p>暂无操作</p>";
		// if(measureTool.style.display != 'block')
		// {
			// measureTool.style.display = 'block';
		// }
		// else
			// measureTool.style.display = 'none';
	// });
	
	
	$('#measure-tool-bar').click(function () {
		//var measureTool = document.getElementById('tool_container');
		var measureResult = document.getElementById('measure-result-window');
		var measureResultShow = document.getElementById('measure-result');
		if(measureResult.style.display != 'block')
		{
			measureResult.style.display = 'block';
		}
		measureResultShow.innerHTML = "<span>暂无操作</span>";
		// if(measureTool.style.display != 'block')
		// {
			// measureTool.style.display = 'block';
		// }
		// else
			// measureTool.style.display = 'none';
	});
	
	//关闭测量结果窗口
	$('#measure-close').click(function () {
		var measureResult = document.getElementById('measure-result-window');
		if(measureResult.style.display != 'none')
		{
			measureResult.style.display = 'none';
		}
		
	});
	
	dragFunc("measure-result-window");
	
	
		//隐藏工具菜单
	$('#display-switch').click(function () {
		var topbarRight = document.getElementById('topbar-right');
		var topbarLeft = document.getElementById('topbar-left');
		var hideSwitch = document.getElementById('hide-switch');
		var menuSwitch = document.getElementById('menu-switch');
		if(topbarRight.style.display != 'none')
		{
			topbarRight.style.display = 'none';
		}
		if(hideSwitch.style.display != 'block')
		{
			topbarLeft.style.width = '20%';
			menuSwitch.style.width = '50%';
			hideSwitch.style.width = '50%'
			hideSwitch.style.display = 'block';
		}
	});
	
		//显示工具菜单
	$('#hide-switch').click(function () {
		var topbarRight = document.getElementById('topbar-right');
		var topbarLeft = document.getElementById('topbar-left');
		var hideSwitch = document.getElementById('hide-switch');
		var menuSwitch = document.getElementById('menu-switch');
		if(hideSwitch.style.display != 'none')
		{
			hideSwitch.style.display = 'none';
		}
		if(topbarRight.style.display != 'block')
		{
			topbarRight.style.display = 'block';
			topbarLeft.style.width = '12%';
			menuSwitch.style.width = '100%';
		}
	});
	
	
	
		//显示/关闭图层管理ztree
	$('#menu-switch').click(function () {
		var layerContainer = document.getElementById('zTreeContainer');
		if(layerContainer.style.display != 'block')
			layerContainer.style.display = 'block';
		else 
			layerContainer.style.display = 'none';
	});
	
	
		//关闭dom警告
	$('#domWarnBtn').click(function () {
		var domWar = document.getElementById('dom-warning');
		if(domWar.style.display != 'none')
		{
			domWar.style.display = 'none';
		}
		
	});
	
		//关闭dem警告
	$('#demWarnBtn').click(function () {
		var demWar = document.getElementById('dem-warning');
		if(demWar.style.display != 'none')
		{
			demWar.style.display = 'none';
		}
		
	});
	
	
		//关闭全球地形警告
	$('#worldWarnBtn').click(function () {
		var worldWar = document.getElementById('world-warning');
		if(worldWar.style.display != 'none')
		{
			worldWar.style.display = 'none';
		}
		
	});
	
		//打开飞行窗口
	$('#plane-switch').click(function () {
		var measureTool = document.getElementById('fly3DPaths');
		if(measureTool.style.display != 'block')
		{
			measureTool.style.display = 'block';
		}
		else
			measureTool.style.display = 'none';
		
	});
	
	var btn = document.getElementsByClassName('tb-btn1');
	btn.onclick = function(){
		// switch(btn.id){
			// case"tb-btn1":
				// if(btn.id =='tb-btn1'){
					// var window = document.getElementById('info-window');
					// if(window.style.display !='block'){
						// window.style.display = 'block';
					// }
				// }
				// break;
		// }
		alert(btn);
	};
	
	document.getElementById('add-btn').onclick = function() {
		var tileInfo =  document.getElementById("urlText").value;
		alert(tileInfo);
        var tilesetAdd = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: tileInfo
        }));

        tilesetAdd.readyPromise.then(function() {
        var boundingSphere = tilesetAdd.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        }).otherwise(function(error) {
            throw (error);
        });
    }
	