	var handler360 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler360.setInputAction(function (movement) {
    var pick = viewer.scene.pick(movement.position);
    if (Cesium.defined(pick) && (pick.id.id === '360-1')) {//(pick.id.id === '360-1')) {
		//打开iframe窗口
		
		var iframeWin = document.getElementById('iframe-360-1');
		if(iframeWin.style.display != 'block')
			{
				iframeWin.style.display = 'block';
			}
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


