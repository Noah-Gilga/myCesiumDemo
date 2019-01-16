if (typeof DCI == "undefined") { var DCI = {}; }
DCI.map2dTool = {
    toolbar2dHtml: "<div class='alright_top_rt'>" +
            "<ul>" +
                "<li class='tool' id='tLi'>" +
                    "<a href='javascript:void(0)' class='toolbg' id='toolType'><span class='toollabel'></span>工具</a><span class='raang_more' id='toolCur'></span>" +
                    "<ul style='display: none;' id='toolDiv'>" +
                        "<li id='bMeasureLine'><a href='javascript:void(0)'><span class='toolcjlabel'></span>测距</a></li>" +
                        "<li id='bMeasureArea'><a href='javascript:void(0)'><span class='toolcmlabel'></span>测面</a></li>" +
                     "</ul>" +
                "</li>" +
            "</ul>" +
        "</div>",
    InitTool: function (viewer) {
        var T = this;
        //加载工具栏
        var child = $("#tool_container").children();
        if (child.length > 0) {
            child.remove();
        }
        $("#tool_container").append(DCI.map2dTool.toolbar2dHtml);
        $("#tLi").bind("mouseover", function () {
            $("#toolDiv").show();
        });
        $("#tLi").bind("mouseout", function () {
            $("#toolDiv").hide();
        });
        //测距
        $("#bMeasureLine").click(function () {
            new measureDistance(viewer);
        });

        //测面积
        $("#bMeasureArea").click(function () {
            new measureArea(viewer);
        });


    },


}
