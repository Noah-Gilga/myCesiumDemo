<template>
	<section class="main-content-section">

    <el-tabs activeName="base" @tab-click="mapDialog2()"><!-- 切换到地图调色板是，pane内显示地图 -->
      <el-tab-pane label="基本配置" name="base" :key="'base'">
        <div class="base" v-if="data && data.map">
          <div class="line-hr">
            初始位置
          </div>
          <div class="line">
            <label>X：</label>
            <el-input type="number" size="small" v-model="data.map['cen-x']"></el-input>
          </div>
          <div class="line">
            <label>Y：</label>
            <el-input type="number" size="small" v-model="data.map['cen-y']"></el-input>
          </div>
          <div class="line">
            <label>Level：</label>
            <el-input type="number" size="small" v-model="data.map['level']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/map-level.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line">
            <label>设置一个位置：</label>
            <el-button @click="mapDialog()">地图上定位</el-button>
          </div>
          
          <div class="line-hr">
            基础底图
          </div>
          <div class="line">
            <label>是否启用基础底图</label>
            <el-checkbox v-model="data.map['useDefault']"></el-checkbox>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              若不启用需要在项目底图页面配置
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-show="data.map['useDefault']">
            <label>基础底图：</label>
            <!-- 只有佛山（项目配置好的地图）
            <el-select v-model="data.map['default-tile']">
            </el-select> -->
            <!--佛山先暂时禁用-->
            <el-select v-model="data.map['default-tile']">
              <el-option
                v-for="item in data.tiles"
                v-show="item.default"
                :key="item.name"
                :label="item.title"
                :value="item.name">
                <span style="float: left">{{ item.title }}</span>
                <span style="float: right; color: #b4bac4; font-size: 13px">{{ item.name }}</span>
              </el-option>
            </el-select>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/default-tile.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
        </div>
        
        <div class="line-hr">
          高级配置
        </div>
        <div class="line">
          <label>显示高级配置：</label>
          <el-checkbox v-model="ctrl.adv.show"></el-checkbox>
        </div>
        <div class="base" v-show="ctrl.adv.show">
          <div class="line">
            <label>底图放大倍数(PC)：</label>
            <el-input type="number" size="small" v-model="data.map['maximumScreenSpaceErrorPC']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/maximum-screen-space-error.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
           <div class="line">
            <label>底图放大倍数(Wall)：</label>
            <el-input type="number" size="small" v-model="data.map['maximumScreenSpaceErrorWall']"></el-input>
          </div>
          <div class="line" v-show="false">
            <label>地图初始倾斜角度：</label>
            <el-input type="number" size="small" v-model="data.map['pitch']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/camera-pitch.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line">
            <label>地图允许倾斜阈值：</label>
            <el-input type="number" size="small" v-model="data.map['canTiltAngle']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/map-tilt.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line">
            <label>线选缓冲距离：</label>
            <el-input type="number" size="small" v-model="data.map['lineBuffer']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/map-bufferRadius.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line">
            <label>线选面选辅助线线宽：</label>
            <el-input type="number" size="small" v-model="data.map['guideLineWidth']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/map-guideLine.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-show="false">
            <label>绘笔笔宽：</label>
            <el-input type="number" size="small" v-model="data.map['penLineWidth']"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              <pre v-html="loadMarkdown('../vmap2/config/map-penLineWidth.md')"></pre>
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line">
            <label>图标放大倍数：</label>
            <el-input type="number" size="small" v-model="data.map['imageScaleFactor']"></el-input>
          </div>
          <div class="line">
            <label>是否开启OIT：</label>
            <el-checkbox v-model="data.map['OIT']"></el-checkbox>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              开启OIT可以避免几何按顺序排序出现无法正确排序导致渲染效果不正确的问题，但是会更耗费性能
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="项目底图" name="tiles" :key="'tiles'">
        <el-button @click="tileAddDialog()">增加</el-button>
        <el-button @click="allTilesHide()">全部隐藏</el-button>        
        <el-button @click="allTilesShow()">全部显示</el-button> 
        <el-table :data="data.tiles.filter(item => !item.default)" style="width: 100%; height: 100%">
          <el-table-column prop="level" label="层级" width="200">
            <template slot-scope="scope">
                <el-button @click="tileLevelUp(data.tiles.indexOf(scope.row))">上移</el-button>
                <el-button @click="tileLevelDown(data.tiles.indexOf(scope.row))">下移</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="200">
            <template slot-scope="scope">
                <el-button v-show="scope.row.disable" @click="tileDisable(scope.row, false)">启用</el-button>
                <el-button v-show="!scope.row.disable" @click="tileDisable(scope.row, true)">禁用</el-button>
                <el-button v-show="!scope.row.disable" @click="tileModifyDialog(scope.row, scope.$index)">修改</el-button>
                <el-button v-show="!scope.row.disable" @click="tileDeleteDialog(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="show" label="默认显示" width="100">
            <template slot-scope="scope">
                <el-checkbox v-model="scope.row.show"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="底图标题" width="150"></el-table-column>
          <el-table-column prop="map-url" label="底图URL" width="500"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="图层列表" name="layers" :key="'layers'">
        <el-button @click="layerAddDialog()">增加</el-button>
        <el-button @click="allLayersHide()">全部隐藏</el-button>        
        <el-button @click="allLayersShow()">全部显示</el-button>
        <div class="line">
          <label>是否分批加载：</label>
          <el-checkbox v-model="data.map['divideLoad']"></el-checkbox>
        </div>
        <div class="line" v-if="data.map['divideLoad']== true">
          <label>时间间隔(秒)：</label>
          <el-input type="number" size="small" v-model="data.map.timeIntervals"></el-input>
          <label>每段时间请求数：</label>
          <el-input type="number" size="small" v-model="data.map.linksNum"></el-input>
        </div>
        <el-table :data="data.layers" style="width: 100%; height: 100%">
          <el-table-column prop="" label="操作" width="200">
            <template slot-scope="scope">
                <el-button v-show="scope.row.disable" @click="layerDisable(scope.row, false)">启用</el-button>
                <el-button v-show="!scope.row.disable" @click="layerDisable(scope.row, true)">禁用</el-button>
                <el-button v-show="!scope.row.default && !scope.row.disable" @click="layerModifyDialog(scope.row, scope.$index);loadFieldSelect()">修改</el-button>
                <el-button v-show="!scope.row.default && !scope.row.disable" @click="layerDeleteDialog(scope.row, scope.$index)">删除</el-button>
                <span v-show="scope.row.default">默认图层 不做改动</span>
            </template>
          </el-table-column>
          <el-table-column prop="show" label="默认显示" width="100">
            <template slot-scope="scope">
                <el-checkbox v-model="scope.row.show"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="layerType" label="图层类型" width="100">
            <template slot-scope="scope">
                <span v-show="scope.row.layerType == 'point'">点<img :src="scope.row.imageUrl"></span>
                <span v-show="scope.row.layerType == 'line'">线图层</span>
                <span v-show="scope.row.layerType == 'polygon'">面图层</span>
            </template>
          </el-table-column>
          <el-table-column prop="groupType" label="业务类型" width="150"></el-table-column>
          <el-table-column prop="groupSort" label="业务排序" width="150"></el-table-column>
          <el-table-column prop="layerTitle" label="图层标题" width="150"></el-table-column>
          <el-table-column prop="url" label="接口" width="500"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="地图调色板" name="mapColor" :key="'mapColor'">
        <!-- <div class="line-hr">
          地图灰度修正
        </div> -->
        
        
        <div id="map-container2"></div>
        <div class="base" v-for="item in data.mapColor" 
                          :key="data.mapColor.indexOf(item)"
                          :value="item.type">
          <!-- 地图灰度设置 -->
          <div class="line-hr" v-if="item['type']=='grey'">
            地图灰度修正
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <!-- 勾选checkbox的时候才显示具体设置参数 -->
          <div class="line" v-if="item['type']=='grey'&& item.display">
            <label>地图灰度修正值：</label>
            <el-input type="number" size="small" v-model="item.data['reference']" @change="mapColorApply(data.mapColor)"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
           <div class="line" v-if="item['type']=='grey' && item.display">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']" @change="mapColorApply(data.mapColor)"></el-checkbox>
          </div>

          <!-- 地图反色设置 -->
          <div class="line-hr" v-if="item['type']=='invert'">
            地图反色设置
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <div class="line" v-if="item['type']=='invert'&& item.display">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']" @change="mapColorApply(data.mapColor)"></el-checkbox>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              设置地图是否反色
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>

          <!-- 地图色阶设置 -->
          <div class="line-hr" v-if="item['type']=='levels'">
            地图色阶设置
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <div class="line" v-if="item['type']=='levels' && item.display">
            <label>阴影：</label>
            <el-input type="number" size="small" v-model="item.data['black']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>中间调</label>
            <el-input type="number" size="small" v-model="item.data['grayRataio']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>高亮：</label>
            <el-input type="number" size="small" v-model="item.data['white']" @change="mapColorApply(data.mapColor)"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              调整地图颜色色阶，阴影和高亮文本框中请输入一个0~255之间的数值，中间调。
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-if="item['type']=='levels' && item.display">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']" @change="mapColorApply(data.mapColor)"></el-checkbox>
          </div>

          <!-- 地图线性减淡设置 -->
          <div class="line-hr" v-if="item['type']=='linear'">
            地图线性减淡设置
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <div class="line" v-if="item['type']=='linear' && item.display">
            <label>r</label>
            <el-input type="number" size="small" v-model="item.data['r']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>g</label>
            <el-input type="number" size="small" v-model="item.data['g']" @change="mapColorApply(data.mapColor)"></el-input><br/>
            <label>b</label>
            <el-input type="number" size="small" v-model="item.data['b']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>a</label>
            <el-input type="number" size="small" v-model="item.data['a']" @change="mapColorApply(data.mapColor)"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-if="item['type']=='linear' && item.display">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']" @change="mapColorApply(data.mapColor)"></el-checkbox>
          </div>

          <!-- 地图正片叠底设置 -->
          <div class="line-hr" v-if="item['type']=='multiply'">
            地图正片叠底设置
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <div class="line" v-if="item['type']=='multiply' && item.display">
            <label>r</label>
            <el-input type="number" size="small" v-model="item.data['r']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>g</label>
            <el-input type="number" size="small" v-model="item.data['g']" @change="mapColorApply(data.mapColor)"></el-input><br/>
            <label>b</label>
            <el-input type="number" size="small" v-model="item.data['b']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>a</label>
            <el-input type="number" size="small" v-model="item.data['a']" @change="mapColorApply(data.mapColor)"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-if="item['type']=='multiply' && item.display" @change="mapColorApply(data.mapColor)">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']"></el-checkbox>
          </div>

          <!-- 地图滤色设置 -->
          <div class="line-hr" v-if="item['type']=='screen'">
            地图滤色设置
            <label>显示</label>
            <el-checkbox v-model="item.display"></el-checkbox>
            <el-button @click="mapColorDeleteDialog(item, data.mapColor.indexOf(item))">删除</el-button>
          </div>
          <div class="line" v-if="item['type']=='screen' && item.display">
            <label>r</label>
            <el-input type="number" size="small" v-model="item.data['r']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>g</label>
            <el-input type="number" size="small" v-model="item.data['g']" @change="mapColorApply(data.mapColor)"></el-input><br/>
            <label>b</label>
            <el-input type="number" size="small" v-model="item.data['b']" @change="mapColorApply(data.mapColor)"></el-input>
            <label>a</label>
            <el-input type="number" size="small" v-model="item.data['a']" @change="mapColorApply(data.mapColor)"></el-input>
            <el-popover placement="right" trigger="hover"><!-- 帮助 -->
              调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
              <i class="help el-icon-question" slot="reference"></i>
            </el-popover>
          </div>
          <div class="line" v-if="item['type']=='screen' && item.display">
            <label>是否启用</label>
            <el-checkbox v-model="item['status']" @change="mapColorApply(data.mapColor)"></el-checkbox>
          </div>

        </div>
        <el-button @click="mapColorAddDialog()">增加</el-button>
        
      </el-tab-pane>
    </el-tabs>
    

    <el-dialog custom-class="dialog-tile-modify" title="底图配置" :close-on-click-modal="false" :visible.sync="ctrl.dialog.tile.show" :modal-append-to-body="false">
      <div class="line">
        <label>是否默认显示：</label>
        <el-checkbox v-model="ctrl.dialog.tile.data['show']"></el-checkbox>
      </div>
      <div class="line">
        <label>底图名称：</label>
        <el-input size="small" v-model="ctrl.dialog.tile.data['name']" readonly></el-input>
      </div>
      <div class="line">
        <label>底图标题：</label>
        <el-input size="small" v-model="ctrl.dialog.tile.data['title']"></el-input>
      </div>
      <div class="line">
        <label>底图类型：</label>
        <el-select  size="small" style="width:25em" v-model="ctrl.dialog.tile.data['map-type']" placeholder="请选择">
          <el-option key="UrlTemplateImageryProvider" value="UrlTemplateImageryProvider" label="URL模板 - UrlTemplateImageryProvider"></el-option>
          <el-option key="TileMapServiceImageryProvider" value="TileMapServiceImageryProvider" label="TMS格式 - TileMapServiceImageryProvider"></el-option>
          <el-option key="PGISImageryProvider_V03" value="PGISImageryProvider_V03" label="PGIS0.3格式（访问地图服务） - PGISImageryProvider_V03"></el-option>
          <el-option key="PGISImageryProvider_V03_local" value="PGISImageryProvider_V03_local" label="PGIS0.3格式（访问本地切片） - PGISImageryProvider_V03_local"></el-option>
          <el-option key="PGISImageryProvider_V10" value="PGISImageryProvider_V10" label="PGIS1.0格式（访问地图服务） - PGISImageryProvider_V10"></el-option>
          <el-option key="PGISImageryProvider_V10_Local" value="PGISImageryProvider_V10_Local" label="PGIS1.0格式（访问本地切片） - PGISImageryProvider_V10_Local"></el-option>
          <el-option key="PGISImageryProvider_V11" value="PGISImageryProvider_V11" label="PGIS1.0格式（访问地图服务） - PGISImageryProvider_V11"></el-option>
          <el-option key="WebMapServiceImageryProvider" value="WebMapServiceImageryProvider" label="WMS格式 - WebMapServiceImageryProvider"></el-option>
          <el-option key="WebMapTileServiceImageryProvider" value="WebMapTileServiceImageryProvider" label="WMTS格式 - WebMapTileServiceImageryProvider"></el-option>
        </el-select>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <pre v-html="loadMarkdown('../vmap2/config/map-type.md')"></pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      <div class="line">
        <label>底图路径：</label>
        <el-input size="small" v-model="ctrl.dialog.tile.data['map-url']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <pre v-html="loadMarkdown('../vmap2/config/map-path.md')"></pre>
          <i class="help el-icon-question" slot="reference"></i>
          
        </el-popover>
        <label style="width:23em">URL类型参考格式:    /tiles/base/{层级}/{行}/{列}.png<br/>
                                  其他类型参考格式：  /tiles/base/瓦片所在文件夹
        </label>
        
      </div>
      <div class="line" v-show="ctrl.dialog.tile.data['map-type'] == 'WebMapServiceImageryProvider'">
        <label>WMS图层名称：</label>
        <el-input size="small" v-model="ctrl.dialog.tile.data['wms-layers']"></el-input>
      </div>
      <div class="line" v-show="ctrl.dialog.tile.data['map-type'] == 'WebMapTileServiceImageryProvider'">
        <label>请求标识符列表:</label>
        <el-select v-model="ctrl.dialog.tile.data['tileMatrixLabels']" style="width:25em" placeholder="请选择">
          <el-option key="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19" value="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19" label="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19"></el-option>
          <el-option key="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19" value="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19" label="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19"></el-option>
        </el-select>
      </div>
      <div class="line">
        <label>底图版式：</label>
        <el-select v-model="ctrl.dialog.tile.data['format']" placeholder="请选择">
          <el-option key="png" value="png" label="png"></el-option>
          <el-option key="jpg" value="jpg" label="jpg"></el-option>
          <el-option key="jpeg" value="jpeg" label="jpeg"></el-option>
          <el-option key="tiles" value="tiles" label="tiles"></el-option>
        </el-select>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          瓦片数据类型
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      <div class="line">
        <label>最小级别：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.tile.data['min-level']"></el-input>
      </div>
      <div class="line">
        <label>最大级别：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.tile.data['max-level']"></el-input>
      </div>
      <div class="line">
        <label>坐标系：</label>
        <el-select  size="small" v-model="ctrl.dialog.tile.data['map-scheme']" placeholder="请选择">
          <el-option value="GeographicTilingScheme" label="经纬度 - GeographicTilingScheme"></el-option>
          <el-option value="WebMercatorTilingScheme" label="网络墨卡托 - WebMercatorTilingScheme"></el-option>
        </el-select>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          经纬度 - GeographicTilingScheme：单位用°，范围[-180°， 180°]， [-90°， 90°]<br/>
          网络墨卡托 - WebMercatorTilingScheme：单位米，x轴范围[-20037508.3427892,20037508.3427892]，y轴范围[-20037508.3427892,20037508.3427892]
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      <!--
      <div class="line">
        <label>瓦片范围：</label>
        <div style="display:inline-block">
          <el-checkbox v-model="ctrl.dialog.tile.rectangleShow"></el-checkbox>
          <div v-show="ctrl.dialog.tile.rectangleShow">
            西：<el-input size="mini" v-model="ctrl.dialog.tile.data['west']"></el-input>
            南：<el-input size="mini" v-model="ctrl.dialog.tile.data['south']"></el-input>
            <br>
            东：<el-input size="mini" v-model="ctrl.dialog.tile.data['east']"></el-input>
            北：<el-input size="mini" v-model="ctrl.dialog.tile.data['north']"></el-input>
          </div>
        </div>
      </div>
      -->
      <div class="line">
        <label>是否默认反色：</label>
        <el-checkbox v-model="ctrl.dialog.tile.data['invert']"></el-checkbox>
      </div>
      <div class="line">
        <label>反色样式：</label>
        <el-select  size="small" v-model="ctrl.dialog.tile.data['invert-type']" placeholder="请选择">
          <el-option value="0" label="无反色"></el-option>
          <el-option value="1" label="反色样式1"></el-option>
          <el-option value="2" label="反色样式2"></el-option>
          <el-option value="3" label="反色样式3"></el-option>
          <el-option value="4" label="反色样式4"></el-option>
          <el-option value="5" label="反色样式5"></el-option>
          <el-option value="6" label="反色样式6"></el-option>
          <el-option value="7" label="反色样式7"></el-option>
          <el-option value="8" label="反色样式8"></el-option>
        </el-select>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <pre v-html="loadMarkdown('../vmap2/config/map-color.md')"></pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      <div class="line">
        <el-button v-show="ctrl.dialog.tile.isAdd" @click="ctrl.dialog.tile.show = false;tileAdd();">新增</el-button>
        <el-button v-show="!ctrl.dialog.tile.isAdd" @click="ctrl.dialog.tile.show = false;tileModify();">修改</el-button>
        <el-button @click="ctrl.dialog.tile.show = false">取消</el-button>
      </div>
    </el-dialog>

    

    <el-dialog custom-class="dialog-layer-modify" title="图层配置" @opened="handleOpened()" @closed="handleClosed()" :close-on-click-modal="false" :visible.sync="ctrl.dialog.layer.show" :modal-append-to-body="false">
      <div class="line">
        <label>是否默认显示：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['show']"></el-checkbox>
      </div>
      <div class="line" v-show="false">
        <label>是否支持搜索：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['supportSearch']"></el-checkbox>
      </div>
      <div class="line">
        <label>图层类型：</label>
        <el-select v-model="ctrl.dialog.layer.data.layerType" placeholder="请选择">
          <el-option key="point" value="point" label="点图层 - point"></el-option>
          <el-option key="line" value="line" label="线图层 - line"></el-option>
          <el-option key="polygon" value="polygon" label="面图层 - polygon"></el-option>
        </el-select>
      </div>
      <div class="line">
        <label>业务类型：</label>
        <el-select v-model="ctrl.dialog.layer.data.groupType" placeholder="请选择">
          <el-option v-for="item in ctrl.dialog.layer.groupTypeArray" 
                      :value="item"
                      :key="item"
          >{{item}}<el-option>
        </el-select>
        <el-input class="businessType groupType" size="small" v-model="ctrl.dialog.layer.data.groupType"></el-input>
      </div>
      <div class="line" v-show="ctrl.dialog.layer.data.groupType=='默认图层'?false:true">
        <label>业务排序：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.groupSort"></el-input>
      </div>
      <div class="line">
        <label>图层ID：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.layerName" readonly></el-input>
      </div>
      <div class="line">
        <label>图层标题：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.layerTitle"></el-input>
      </div>
      <div class="line">
        <label>图层接口：</label>
        <el-input size="small" style="width:40em" v-model="ctrl.dialog.layer.data.url"></el-input>
        <el-button v-show="ctrl.dialog.layer.data.layerName != 'video'" @click="layerFileSelect()">选择</el-button>
        <!-- <el-button v-show="ctrl.dialog.layer.data.layerName != 'video'" @click="loadFieldSelect()">加载</el-button> -->
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point'">
        <label>是否统一图标：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['sameIcon']"></el-checkbox>
      </div>

      <!--整个图层统一一个图标&&图标类型是序列帧-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == true">
        <label>使用序列帧图标：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['framesIcon']"></el-checkbox>
      </div>

      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == true && ctrl.dialog.layer.data['framesIcon'] == true">
        <label>序列帧行数：</label>
          <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.framesImageColNum"></el-input>
        <label>序列帧列数：</label>
          <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.framesImageRowNum"></el-input>
      </div>

      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == true && ctrl.dialog.layer.data['framesIcon'] == true">
        <label>每个图标的长</label>
          <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.framesImageWidth"></el-input>
        <label>每个图标的宽</label>
          <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.framesImageHeight"></el-input>
      </div>

      <!--整个图层统一一个图标&&图标类型是序列帧-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == true && ctrl.dialog.layer.data['framesIcon'] == true">
        <label>序列帧图标：</label>
        <el-input size="small" style="width:40em" v-model="ctrl.dialog.layer.data.framesImageUrl"></el-input>
        <img class="imageUrl" :src="ctrl.dialog.layer.data.framesImageUrl" @click="layerFramesImageSelect()">
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <pre v-html="loadMarkdown('../vmap2/config/map-icon.md')"></pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <!--整个图层统一一个图标-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == true">
        <label>图层图标：</label>
        <el-input size="small" style="width:40em" v-model="ctrl.dialog.layer.data.imageUrl"></el-input>
        <img class="imageUrl" :src="ctrl.dialog.layer.data.imageUrl" @click="layerImageSelect()">
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <pre v-html="loadMarkdown('../vmap2/config/map-icon.md')"></pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      
      <!--按照字段显示不同图标-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == false">
        <label>赋值字段：</label>
        <!-- <el-select v-model="ctrl.dialog.layer.data.fieldName" @change="pointIconAttributeSelect()" placeholder="请选择">
          <el-option  v-if="ctrl.dialog.layer.fieldColorList.length>0" v-for="item in ctrl.dialog.layer.fieldColorList"
                      :value="item"
                      :key="item"
          ></el-option>
        </el-select> -->
        <!--选择字段-->
        <el-input size="small" v-model="ctrl.dialog.layer.data.iconField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.data.pageFieldDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerIconFieldSelect(scope.row, scope.$index);pointIconAttributeSelect()">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
          <el-button  @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageFieldDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageFieldDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageFieldDetail.dataShow"></label>
          <el-button  @click="nextPage(1)">后一页</el-button>
        </el-popover>

        <el-popover placement="right" width="700" trigger="click">
          <div class="line">
            <!-- <el-table :data="ctrl.dialog.layer.pointFieldAttributeList" v-loading="ctrl.dialog.layer.fieldListLoading"> -->
            <el-table :data="ctrl.dialog.layer.data.pageDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
              <el-table-column width="250" property="field" label="字段值"></el-table-column>
              <el-table-column width="350" height="20" label="图标">
                <template slot-scope="scope">
                    <img class="imageUrl" :src="scope.row.imageUrl" @click="layerIconSelect(scope.row)">
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageDetail.dataShow"></label>
            <el-button slot="reference" @click="nextPage(2)">后一页</el-button>
          </div>
          <el-button slot="reference" @click="countPage()">属性赋值</el-button>
        </el-popover>
      </div>

      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['sameIcon'] == false">
      </div>


      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data.framesIcon == false">
        <label>图标缩放比例：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.scale"></el-input>
        <!-- <img class="imageUrl" :src="ctrl.dialog.layer.data.imageUrl" @click="layerImageSelect()"> -->
        <!--el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <!--pre>调整图标大小</pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>-->
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data.framesIcon == true">
        <label>图标缩放比例：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.scale"></el-input>
        <!-- <img class="imageUrl" :src="ctrl.dialog.layer.data.framesImageUrl" @click="layerFramesImageSelect()"> -->
        <!--el-popover placement="right" trigger="hover"><!-- 帮助 -->
          <!--pre>调整图标大小</pre>
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover-->
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon'">
        <label>填充颜色：</label>
        <el-select v-model="ctrl.dialog.layer.data.fillColorType" placeholder="请选择" @change="loadFieldSelect()">
          <el-option disabled value="">请选择</el-option>
          <el-option key="all" value="all" label="统一赋值" ></el-option>
          <el-option key="attribute" value="attribute" label="按字段属性赋值"></el-option>
        </el-select>
      </div>
      <!--所有面都统一颜色-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon' && ctrl.dialog.layer.data.fillColorType=='all'">
        <label></label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.fillColor" readonly></el-input>
        <el-color-picker size="small" v-model="ctrl.dialog.layer.data.fillColor" show-alpha></el-color-picker>
      </div>
      <!--按字段赋值-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon' && ctrl.dialog.layer.data.fillColorType=='attribute'">
        <label></label>
        <!-- <el-select v-model="ctrl.dialog.layer.data.fieldName" @change="FieldAttributeShow()" placeholder="请选择">
          <el-option  v-if="ctrl.dialog.layer.fieldColorList.length>0" v-for="item in ctrl.dialog.layer.fieldColorList"
                      :value="item"
                      :key="item"
          ></el-option>
        </el-select> -->
        <!--选择字段-->
        <el-input size="small" v-model="ctrl.dialog.layer.data.colorField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <!-- <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading"> -->
          <el-table :data="ctrl.dialog.layer.data.pageFieldDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerColorFieldSelect(scope.row, scope.$index);FieldAttributeShow()">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
          <el-button  @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageFieldDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageFieldDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageFieldDetail.dataShow"></label>
          <el-button  @click="nextPage(1)">后一页</el-button>
        </el-popover>

        <el-popover placement="right" width="500" trigger="click">
          <div class="line">
            <!-- <el-table :data="ctrl.dialog.layer.fieldAttributeList" v-loading="ctrl.dialog.layer.fieldListLoading"> -->
            <el-table :data="ctrl.dialog.layer.data.pageDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
              <el-table-column width="250" property="field" label="字段值"></el-table-column>
              <el-table-column width="150" label="颜色">
                <template slot-scope="scope">
                    <el-color-picker size="small" v-model="scope.row.color" show-alpha></el-color-picker>
                    <!-- <el-button @click="check(scope)">属性赋值</el-button> -->
                </template>
              </el-table-column>
              <el-table-column width="100" property="height" label="拉伸值(0为平面不拉伸)">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.height" show-alpha></el-input>
                    <!-- <el-button @click="check(scope)">属性赋值</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageDetail.dataShow"></label>
            <el-button slot="reference" @click="nextPage(2)">后一页</el-button>
          </div>
          <el-button slot="reference" @click="countPage()">属性赋值</el-button>
        </el-popover>
      </div>

      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon'">
        <label>轮廓线颜色：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.outlineColor" readonly></el-input>
        <el-color-picker size="small" v-model="ctrl.dialog.layer.data.outlineColor" show-alpha></el-color-picker>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line'">
        <label>是否统一颜色：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['sameLineColor']"></el-checkbox>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' && ctrl.dialog.layer.data['sameLineColor'] == true">
        <label>要素颜色：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.color" readonly></el-input>
        <el-color-picker size="small" v-model="ctrl.dialog.layer.data.color" show-alpha></el-color-picker>
      </div>

      <!--按字段赋值-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' && ctrl.dialog.layer.data['sameLineColor'] == false">
        <label></label>
        <!--选择字段-->
        <el-input size="small" v-model="ctrl.dialog.layer.data.lineField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.data.pageFieldDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerLineColorFieldSelect(scope.row, scope.$index);lineColorAttributeShow()">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
          <el-button  @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageFieldDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageFieldDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageFieldDetail.dataShow"></label>
          <el-button  @click="nextPage(1)">后一页</el-button>
        </el-popover>

        <el-popover placement="right" width="500" trigger="click">
          <div class="line">
            <!-- <el-table :data="ctrl.dialog.layer.fieldAttributeList" v-loading="ctrl.dialog.layer.fieldListLoading"> -->
            <el-table :data="ctrl.dialog.layer.data.pageDetail.dataShow" v-loading="ctrl.dialog.layer.fieldListLoading">
              <el-table-column width="250" property="field" label="字段值"></el-table-column>
              <el-table-column width="150" label="颜色">
                <template slot-scope="scope">
                    <el-color-picker size="small" v-model="scope.row.color" show-alpha></el-color-picker>
                    <!-- <el-button @click="check(scope)">属性赋值</el-button> -->
                </template>
              </el-table-column>
              <!--之后可能用来做宽度-->
              <!-- <el-table-column width="100" property="height" label="拉伸值(0为平面不拉伸)">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.height" show-alpha></el-input>
                    <!-- <el-button @click="check(scope)">属性赋值</el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <el-button slot="reference" @click="prePage()">前一页</el-button>
            <label>{{ctrl.dialog.layer.data.pageDetail.currentPage+1}}/{{ctrl.dialog.layer.data.pageDetail.pageNum}}</label>
            <label :label="ctrl.dialog.layer.data.pageDetail.dataShow"></label>
            <el-button slot="reference" @click="nextPage(2)">后一页</el-button>
          </div>
          <el-button slot="reference" @click="countPage()">属性赋值</el-button>
        </el-popover>
      </div>
      <!--轮廓线渐变色-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line'">
        <label>是否使用渐变色：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['gradientColor']"></el-checkbox>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' || ctrl.dialog.layer.data.layerType == 'polygon'">
        <label v-if="ctrl.dialog.layer.data.layerType == 'line'">线宽度(pc)：</label>
        <label v-if="ctrl.dialog.layer.data.layerType == 'polygon'">轮廓线宽度(pc)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.pcWidth"></el-input>
        <label v-if="ctrl.dialog.layer.data.layerType == 'line'">线宽度(wall)：</label>
        <label v-if="ctrl.dialog.layer.data.layerType == 'polygon'">轮廓线宽度(wall)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.wallWidth"></el-input>
      </div>
      <!-- <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' || ctrl.dialog.layer.data.layerType == 'polygon'">
        <label v-if="ctrl.dialog.layer.data.layerType == 'line'">线宽度(wall)：</label>
        <label v-if="ctrl.dialog.layer.data.layerType == 'polygon'">轮廓线宽度(wall)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.wallWidth"></el-input>
      </div> -->
      <!--是否使用优化线图层的接口-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line'">
        <label>是否进行线优化：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['usePrimitiveLine']"></el-checkbox>
      </div>
      <div class="line">
        <label>默认显示字段：</label>
        <el-input size="small" v-model="ctrl.dialog.layer.data.displayField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerDisplayFieldSelect(scope.row, scope.$index)">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
        </el-popover>
      </div>
      <div class="line">
        <label>扩展显示字段：</label>
        <div style="display:inline-block">
          <el-popover placement="top" width="500" trigger="click">
            <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading">
              <el-table-column width="100" label="选择">
                <template slot-scope="scope">
                    <el-button @click="layerDisplayFieldListSelect(scope.row, scope.$index)">选择</el-button>
                </template>
              </el-table-column>
              <el-table-column width="100" property="field" label="字段"></el-table-column>
              <el-table-column width="300" property="value" label="例子值"></el-table-column>
            </el-table>
            <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
          </el-popover>
          <el-table :data="ctrl.dialog.layer.data.displayFieldList">
            <el-table-column width="100" label="操作">
              <template slot-scope="scope">
                  <el-button @click="layerDisplayFieldListDelete(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column width="150" property="field" label="字段"></el-table-column>
            <el-table-column width="150" property="label" label="标题">
              <template slot-scope="scope">
                  <el-input size="10em" v-model="scope.row.label"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--面图层标注-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon'">
        <label>是否显示标注：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['labelShow']"></el-checkbox>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon' && ctrl.dialog.layer.data['labelShow']== true">
        <label>标注大小(pc)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.pcLabelFontSize"></el-input>
        <label>标注大小(wall)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.wallLabelFontSize"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon' && ctrl.dialog.layer.data['labelShow']== true">
        <label>标注位置偏移：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.labelOffset"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'polygon' && ctrl.dialog.layer.data['labelShow'] == true">
        <label>默认标注字段：</label>
        <!-- <el-select v-model="ctrl.dialog.layer.data.labelFieldName" @change="FieldLabelShow()" placeholder="请选择"><!--change的时候用一个方法记录选择了啥字段
          <el-option  v-if="ctrl.dialog.layer.fieldColorList.length>0" v-for="item in ctrl.dialog.layer.fieldColorList"
                      :value="item"
                      :key="item"
          ></el-option>
        </el-select> -->
        <el-input size="small" v-model="ctrl.dialog.layer.data.labelField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerLabelFieldSelect(scope.row, scope.$index)">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
        </el-popover>
      </div>

      <!--线可以用-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line'">
        <label>是否显示标注：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['labelShow']"></el-checkbox>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line'&& ctrl.dialog.layer.data['labelShow']== true">
        <label>标注大小(pc)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.pcLabelFontSize"></el-input>
        <label>标注大小(wall)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.wallLabelFontSize"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' && ctrl.dialog.layer.data['labelShow']== true">
        <label>标注位置偏移：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.labelOffset"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'line' && ctrl.dialog.layer.data['labelShow'] == true">
        <label>默认标注字段：</label>
        <!-- <el-select v-model="ctrl.dialog.layer.data.labelFieldName" @change="FieldLabelShow()" placeholder="请选择"><!--change的时候用一个方法记录选择了啥字段
          <el-option  v-if="ctrl.dialog.layer.fieldColorList.length>0" v-for="item in ctrl.dialog.layer.fieldColorList"
                      :value="item"
                      :key="item"
          ></el-option>
        </el-select> -->
        <el-input size="small" v-model="ctrl.dialog.layer.data.labelField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerLabelFieldSelect(scope.row, scope.$index)">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
        </el-popover>
      </div>

      <!--点可以用-->
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point'">
        <label>是否显示标注：</label>
        <el-checkbox v-model="ctrl.dialog.layer.data['labelShow']"></el-checkbox>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['labelShow']== true">
        <label>标注大小(pc)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.pcLabelFontSize"></el-input>
        <label>标注大小(wall)：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.wallLabelFontSize"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['labelShow']== true">
        <label>标注位置偏移：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.labelOffset"></el-input>
      </div>
      <div class="line" v-if="ctrl.dialog.layer.data.layerType == 'point' && ctrl.dialog.layer.data['labelShow'] == true">
        <label>默认标注字段：</label>
        <!-- <el-select v-model="ctrl.dialog.layer.data.labelFieldName" @change="FieldLabelShow()" placeholder="请选择"><!--change的时候用一个方法记录选择了啥字段
          <el-option  v-if="ctrl.dialog.layer.fieldColorList.length>0" v-for="item in ctrl.dialog.layer.fieldColorList"
                      :value="item"
                      :key="item"
          ></el-option>
        </el-select> -->
        <el-input size="small" v-model="ctrl.dialog.layer.data.labelField"></el-input>
        <el-popover placement="right" width="500" trigger="click">
          <el-table :data="ctrl.dialog.layer.fieldList" v-loading="ctrl.dialog.layer.fieldListLoading">
            <el-table-column width="100" label="选择">
              <template slot-scope="scope">
                  <el-button @click="layerLabelFieldSelect(scope.row, scope.$index)">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" property="field" label="字段"></el-table-column>
            <el-table-column width="300" property="value" label="例子值"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="layerLoadFieldList()">选择字段</el-button>
        </el-popover>
      </div>

      <!--图层根据距离的可视范围-->
      <div class="line">
          <label>最小显示高度：</label>
            <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.near"></el-input>
          <label>最大显示高度：</label>
            <el-input type="number" size="small" v-model="ctrl.dialog.layer.data.far"></el-input>
      </div>

      <div class="line">
        <el-button v-show="ctrl.dialog.layer.isAdd" @click="ctrl.dialog.layer.show = false;layerAdd();">新增</el-button>
        <el-button v-show="!ctrl.dialog.layer.isAdd" @click="ctrl.dialog.layer.show = false;layerModify();">修改</el-button>
        <el-button @click="ctrl.dialog.layer.show = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 调色板配置(增加) -->
    <el-dialog custom-class="dialog-tile-modify" title="调色板配置" :visible.sync="ctrl.dialog.mapColor.show" :modal-append-to-body="false">
      <!-- 选择调色参数类型type -->
      <div class="line">
        <label>调色参数类型：</label>
        <el-select  size="small" v-model="ctrl.dialog.mapColor['type']" placeholder="请选择" @change="mapColorTypeChange">
          <el-option value="grey" label="灰度修正"></el-option>
          <el-option value="invert" label="反色设置"></el-option>
          <el-option value="levels" label="色阶设置"></el-option>
          <el-option value="linear" label="线性减淡"></el-option>
          <el-option value="multiply" label="正片叠底"></el-option>
          <el-option value="screen" label="滤色设置"></el-option>
        </el-select>
      </div>
      <div class="line">
        <label>是否启用：</label>
        <el-checkbox v-model="ctrl.dialog.mapColor.data['status']"></el-checkbox>
      </div>
      <!-- selector值为"grey"地图灰度修正值 -->
      <div class="line" v-if="ctrl.dialog.mapColor['type']=='grey'">
        <label>地图灰度修正值</label>
        <el-input size="small" v-model="ctrl.dialog.mapColor.data.data['reference']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <!-- selector值为"levels"地图色阶设置 -->
      <div class="line" v-if="ctrl.dialog.mapColor['type']=='levels'">
        <!-- <label>地图色阶设置</label> -->
        <!-- <el-input size="small" v-model="ctrl.dialog.mapColor.data.data['black']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 
          调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover> -->
        <label>阴影：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['black']"></el-input><br/>
        <label>中间调</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['grayRataio']"></el-input><br/>
        <label>高亮：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['white']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          调整地图颜色色阶，阴影和高亮文本框中请输入一个0~255之间的数值，中间调。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <!-- selector值为"linear"地图线性减淡 -->
      <div class="line" v-if="ctrl.dialog.mapColor['type']=='linear'">
        <!-- <label>地图色阶设置</label> -->
        <!-- <el-input size="small" v-model="ctrl.dialog.mapColor.data.data['black']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 
          调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover> -->
        <label>r：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['r']"></el-input><br/>
        <label>g</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['g']"></el-input><br/>
        <label>b</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['b']"></el-input><br/>
        <label>a</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['a']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          调整地图线性减淡效果，r,g,b文本框中请输入一个0~255之间的数值，a输入一个0~1之间的数值。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <!-- selector值为"linear"地图正片叠底 -->
      <div class="line" v-if="ctrl.dialog.mapColor['type']=='multiply'">
        <!-- <label>地图色阶设置</label> -->
        <!-- <el-input size="small" v-model="ctrl.dialog.mapColor.data.data['black']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 
          调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover> -->
        <label>r：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['r']"></el-input><br/>
        <label>g</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['g']"></el-input><br/>
        <label>b</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['b']"></el-input><br/>
        <label>a</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['a']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          调整地图正片叠底效果，r,g,b文本框中请输入一个0~255之间的数值，a输入一个0~1之间的数值。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <!-- selector值为"linear"地图滤色设置 -->
      <div class="line" v-if="ctrl.dialog.mapColor['type']=='screen'">
        <!-- <label>地图色阶设置</label> -->
        <!-- <el-input size="small" v-model="ctrl.dialog.mapColor.data.data['black']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 
          调整地图颜色灰度值，请输入一个0~1之间的数值，默认为0。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover> -->
        <label>r：</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['r']"></el-input><br/>
        <label>g</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['g']"></el-input><br/>
        <label>b</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['b']"></el-input><br/>
        <label>a</label>
        <el-input type="number" size="small" v-model="ctrl.dialog.mapColor.data.data['a']"></el-input>
        <el-popover placement="right" trigger="hover"><!-- 帮助 -->
          调整地图滤色效果，r,g,b文本框中请输入一个0~255之间的数值，a输入一个0~1之间的数值。
          <i class="help el-icon-question" slot="reference"></i>
        </el-popover>
      </div>

      <div class="line">
        <el-button v-show="ctrl.dialog.mapColor.isAdd" @click="ctrl.dialog.mapColor.show = false;mapColorAdd();">新增</el-button>
        <el-button @click="ctrl.dialog.mapColor.show = false">取消</el-button>
      </div>
    </el-dialog>
    

    <el-dialog custom-class="dialog-map" title="地图预览" :visible.sync="ctrl.dialog.map.show" :modal-append-to-body="false">
      <el-button @click="mapLocate()">选择该位置为初始位置</el-button>
      <div id="map-container">
      </div>
    </el-dialog>

    <el-dialog custom-class="dialog-help" title="配置帮助" :visible.sync="ctrl.help.show" :modal-append-to-body="false">
      <pre v-html="loadMarkdown('../vmap2/config/vmap2.md')">
      </pre>
    </el-dialog>
	</section>
</template>

<style type="less/css">
.main-content-section {
  display: block;
  width: 100%;
  height: 800px;
  text-align: left;
  
  button {height: 2em; background-color: #4f5b67; border: none;
    margin:.2em;
    padding: .2em .5em; color: #fff; border-radius: .25em; top: .5em; z-index: 99; cursor: pointer;
    &:hover{ background-color: #67c23a;}
    &:last-child{ border-right: none;}
  }
  table{
    width: 100%; border-spacing: 0;
    td,th{ text-align: center;}
    th{ font-weight: 200; color: #fff; background: -webkit-linear-gradient(rgb(90, 100, 110), rgb(60,75,90));}
    td{ border-right:1px solid rgb(60,75,90); border-bottom:1px solid rgb(50,75,90);
      img{ height: 2em; vertical-align: middle;}
    }
  }

  .line table {
    td,th {
      padding:0;
    }
    input[type='text']{
      height:2em;
    }
  }
  .el-tabs{
    height: 100%;
    .el-tabs__header{
      padding-left:1em;
    }
  }
}
.dialog-map {
  width: 100vh;
  height: 80vh;
  .el-dialog__body{
    height: ~'calc(100% - 5em)';
    padding: 1em;
    overflow: auto;
  }

  #map-container {
    width: 100%;
    height: ~'calc(100% - 2.5em)';
    v-std-map-cesium {
      position: relative !important;
    }
  }

  #map-container2 {
    width: 100%;
    height:800px;
    v-std-map-cesium {
      position: relative !important;
    }
  }
}
.dialog-layer-modify{
  .imageUrl {
    width:2em;
    height:2em;
    vertical-align: middle;
    cursor:pointer;
    border: 0;
  }
}

.cesium-credit-lightbox-overlay{
  display: none;
}

.el-dialog__headerbtn{
  display: none;
}

.cesium-viewer-bottom{
  display: 'none';
}
.businessType{
    margin-left: -14.1em;
    font-size: 14px;
    width: 11.5em !important;
}
.businessType .el-input__inner{
    background: #eeeeee;
    border: none;
    margin-left:-22px;
}
</style>

<script>

export default {

  /**
    * 自定义数据
    */
  data: function(){
    var _this = this;

    //默认数据
    var DEFAULT_DATA = {
        "map": {
            "cen-x": "116.3",
            "cen-y": "39.9",
            "level": "5",
            "default-tile": "base",
            "useDefault": false,    
            "divideLoad": false,                  //接口过多的时候是否分批加载
            "timeIntervals": 0,                   //时间间隔单位秒
            "linksNum":0,                           //每段时间请求数
        },
        "tiles": [
            {
                "name": "base",
                "title": "全球影像",
                "show": false,
                "map-type": "UrlTemplateImageryProvider",
                "map-url": "/tiles/base/{z}/{x}/{y}.png",
                "min-level": "1",
                "max-level": "11",
                "map-scheme": "WebMercatorTilingScheme",
                "invert": false
            }
        ],
        "layers": [],
        "mapColor": [
          {
            "type": "grey",
            "data": 10,
            "status": true
          },{
            "type": "invert",
            "status": true
          },{
            "type": "levels",
            "data": {
              "black": "50",
              "grayRataio": "1.25",
              "white": 255
            },
            "status": true
          },{
            "type": "linear",
            "data": {
              "r": 23,
              "g": 150,
              "b": 219,
              "a": 0.11
            },
            "status": true
          },{
            "type": "multiply",
            "data": {
              "r": 9,
              "g": 30,
              "b": 73,
              "a": 0.13
            },
            "status": true
          }
        ]
    }

    //控制参数
    var ctrl = {
      help: {
        show: false,
      },

      dialog:{
        tile: {
          data: {},
          show: false,
        },
        layer: {
          data: {},
          groupTypeArray:[],
          groupSortArray:[],
          groupPreSort:0,
          show: false,
        },
        map: {
          data: {},
          show: false,
        },
        mapColor:{
          data: {},
          show: false,
        }
      },

      adv:{ //高级配置
        show: false,
      }
    }

    //全局按钮
    var buttons = [{
      title: "保存",
      cssClass: "el-button--primary",
      clickFunc: () => {_this.save()}
    }, {
      title: "地图预览",
      clickFunc: () => {_this.mapDialog()}
    }, {
      title: "帮助",
      clickFunc: () => {_this.help()}
    }]

    var data = vtron.util.clone(DEFAULT_DATA);        //当前数据
    var defaultData = vtron.util.clone(DEFAULT_DATA); //默认数据
    var loadedData = vtron.util.clone(DEFAULT_DATA);  //载入数据

    return {
      ctrl: ctrl,
      buttons: buttons,
      data: data,
      defaultData: defaultData,
      loadedData: loadedData,
    }
  },

  api:{
    /**
     * 加载数据
     */
    load(){
      return axios({
        method: 'POST',
        url: "/kettle/vfs/content/?&rep=vfs&path=/default.vmap",
        data: null,
      });
    },
    
    /**
     * 保存数据
     */
    save(data){
      return axios({
        method: 'POST',
        url: "/kettle/vfs/save/?overwrite=true&rep=vfs&path=/default.vmap",
        headers: { 'content-type': 'text/plain' },
        data: data,
      });
    },
     /**
     * 保存数据
     */
    saveData(data,url){
      return axios({
        method: 'POST',
        url: "/kettle/vfs/save/?overwrite=true&rep=vfs&path="+url,
        headers: { 'content-type': 'text/plain' },
        data: data,
      });
    },
    /**
     * 加载数据
     */
    loadData(url){
      return axios({
        method: 'POST',
        url: "/kettle/vfs/content/?&rep=vfs&path="+url,
        data: null,
      });
    },
  },

  /**
    * 视图生命周期：视图挂接完成
    */
  mounted(){
    //把本视图的按钮配置注入到Home视图中
    this.initMainButtons();

    //加载数据
    this.load();
  },

  /**
    * 自定义函数
    */
  methods: {
    //恢复为默认数据
    defaults(){
      this.$data.data = this.$data.defaultData;
    },

    //加载数据
    load(){
      this.$options.api.load().then((resp)=>{
        if(typeof(resp.data) == "string"){
            try{
                resp.data = JSON.parse(resp.data);
            } catch(e){
                this.$message({type: "error", message: "配置文件可能存在错误：" + e});
            }
        }
        this.$data.data = vtron.util.clone(resp.data);
        this.$data.loadedData = vtron.util.clone(resp.data);
      })
    },

    //保存数据
    save(){
      this.$confirm('是否确定保存该配置?', '确认').then(() => {
        
        var data = JSON.stringify(this.$data.data, null, 2);
        console.log(data);
        this.$options.api.save(data);
        this.filterLayer();
      });
    },
    filterLayer(){
      let _this =this;
      let layerArr = this.$data.data.layers;
      let showStr = '';
      let searchStr = '';
      for(key of layerArr){
          if(!key.disable){
            searchStr+=key.layerName+',';
            if(key.show){
              showStr+=key.layerName+',';
            }
          }
      }
      showStr= showStr.slice(0,-1);
      searchStr= searchStr.slice(0,-1);
      
      //插入公安图层配置中
      this.$options.api.loadData('/场景数据/common/globalSearch/layerFilter.json').then((event)=>{
        if(event&&event.data&&event.data.data instanceof Array){
          console.log(event.data.data)
          for(key of event.data.data){
            if(key.id=='important'){
              key.value=searchStr;
              
            }
          }
           _this.$options.api.saveData(JSON.stringify(event.data, null, 2),'/场景数据/common/globalSearch/layerFilter.json');
        }
        
      })
      //插入公安图层配置中
      this.$options.api.loadData('/场景数据/common/layerControl.json').then((event)=>{
        if(event&&event.data&&event.data.data instanceof Array){
          console.log(event.data)
          for(key of event.data.data){
            if(key.id=='layers'){
              key.value=showStr;
            }
          }
        }
         _this.$options.api.saveData(JSON.stringify(event.data, null, 2),'/场景数据/common/layerControl.json');
         
         
      })
    },

    //显示地图预览
    mapDialog(){
      this.ctrl.dialog.map.show = true;
      setTimeout(()=>{
        var data = this.$data.data;

        //创建预览地图
        var str = `
          <v-std-map-cesium autoload="false"
              width="100%" height="100%">
          </v-std-map-cesium>`;
        var $map = $(str);
        $("#map-container").html($map);
        var map = $map.get(0);

        map.init(data, function(){
          console.log("地图初始化完成");
        });
      }, 100);
    },

    mapDialog2(){
      //已经存储好的mapColor数据
      //console.log(this.$data.data.mapColor);
      var mapColorInfo = this.$data.data.mapColor;
      //this.ctrl.dialog.map.show = true;
      setTimeout(()=>{
        var data = this.$data.data;

        //创建预览地图
        var str = `
          <v-std-map-cesium autoload="false"
              width="100%" height="100%">
          </v-std-map-cesium>`;
        var $map = $(str);
        //设置地图调色板页面中地图的宽度大小
        $("#map-container2").css("width", "100%")//("width", "50%");
        //$("#map-container2").css("margin", "0 25% 0 25%");
        $("#map-container2").html($map);
        var map = $map.get(0);
        //设置div样式
        var mapDiv = $("#map-container2").find("v-std-map-cesium").get(0);
        mapDiv.style.position = "relative";
        map.init(data, function(){
          console.log("地图初始化完成");
          //map.canvasHeight = 693;//初始化的时候导致地图组件的canvasHeight为0会触发enableMap(false)
          map.canvasHeight = mapDiv.$.cesiumContainer.offsetHeight;
        });
        //地图初始完成之后按照已有配置完成地图反色
        map.waitMapInit(()=>{
          if(mapColorInfo.length>0){
            for(var i = 0;i<mapColorInfo.length;i++){
            switch(mapColorInfo[i].type){
              case 'grey':
                if(mapColorInfo[i].status){
                  map.baseMapColor_gray(mapColorInfo[i].data);
                }
              break;
              case 'invert':
                if(mapColorInfo[i].status){
                  map.baseMapColor_inverse();
                }
              break;
              case 'levels':
                if(mapColorInfo[i].status){
                  map.baseMapColor_level(mapColorInfo[i].data);
                }
              break;
              case 'linear':
                if(mapColorInfo[i].status){
                  map.baseMapColor_linear(mapColorInfo[i].data);
                }
              break;
              case 'multiply':
                if(mapColorInfo[i].status){
                  map.baseMapColor_multiply(mapColorInfo[i].data);
                }
              break;
              case 'screen':
                if(mapColorInfo[i].status){
                  map.baseMapColor_screen(mapColorInfo[i].data);
                }
              break;
            }
          }
          map.baseMapColor_execute();
          }
        })
      }, 100);
      
    },


    //底图增加
    tileAddDialog(){
      //临时数据
      this.ctrl.dialog.tile.data = {
        "show": true,
        "name": "tile" + Date.now(),
        "title": "新建底图瓦片",
        "map-type": "UrlTemplateImageryProvider",
        "map-url": "/tiles/base/{z}/{x}/{y}.png",
        "format": "png",
        "tileMatrixLabels": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19",
        "min-level": "1",
        "max-level": "10",
        "map-scheme": "WebMercatorTilingScheme",
        "invert": false
      };
      this.ctrl.dialog.tile.show = true;
      this.ctrl.dialog.tile.isAdd = true;
      this.ctrl.dialog.tile.rectangleShow = false;
    },

    allTilesHide(){
      var tiles = this.$data.data.tiles;
      tiles.forEach((tile)=>{
        tile.show = false;
      });
    },

    allTilesShow(){
      var tiles = this.$data.data.tiles;
      tiles.forEach((tile)=>{
        tile.show = true;
      });
    },

    tileLevelUp(index){
      var tiles = this.$data.data.tiles;
      if(index != 0){
        tiles[index] = tiles.splice(index-1, 1, tiles[index])[0];
      }else{
        tiles.push(tiles.shift());
      }
    },

    tileLevelDown(index){
      var tiles = this.$data.data.tiles;
      if(index != (tiles.length - 1)){
        tiles[index] = tiles.splice(index+1, 1, tiles[index])[0];
      }else{
        tiles.unshift(tiles.splice(index, 1)[0]);
      }
    },
    
    //底图修改
    tileModifyDialog(tile, idx){
      //数据复制一份出来（不用源数据）
      this.ctrl.dialog.tile.data = vtron.util.clone(tile);
      this.ctrl.dialog.tile.show = true;
      this.ctrl.dialog.tile.isAdd = false;
      this.ctrl.dialog.tile.rectangleShow = !!(this.ctrl.dialog.tile.west || this.ctrl.dialog.tile.south ||this.ctrl.dialog.tile.east || this.ctrl.dialog.tile.north);
    },

    //底图删除
    tileDeleteDialog(tile, idx){
      this.$confirm(`是否确定删除该底图【${tile.name} ${tile.title}】?`, '确认').then(() => {
        this.$data.data.tiles.remove(idx);
      })
    },

    tileAdd(){
      var data = this.ctrl.dialog.tile.data;
      //从数组前面插入
      this.$data.data.tiles.unshift(data);
    },

    tileModify(){
      var data = this.ctrl.dialog.tile.data;
      this.$data.data.tiles.forEach(function(item){
        if(item.name == data.name){
          //复制信息到源数据中
          $.extend(true, item, data);
        }
      })
    },

    tileDisable(item, disable){
      item.disable = disable;
    },

    //图层增加
    //初始点击增加弹出来的默认数据
    layerAddDialog(){
      this.ctrl.dialog.layer.data = {
        "disable":false,
        "supportSearch": true,
        "show": true,
        "labelShow": false,
        "layerName": "layer" + Date.now(),
        "layerType": "point",
        "groupType": "默认图层",                        //图层业务类型名称
        "groupSort":[],                         //图层业务类型序号
        "groupPreSort":0,
        "fillColorType": "all",                 //选择框默认选择
        "layerTitle": "新建图层",
        "url": "/vfs/地图图层/test.geojson",
        "near": 0.0,                          //图层可以被显示出来的最小高度
        "far": 20000.0,                          //图层可以被显示出来的最大高度
        "imageUrl": "/vfs/地图图例库/unit-01.png",//点
        "framesImageUrl": "/vfs/地图图例库/unit-01.png",//点
        "scale": "1",                            //点
        "sameIcon": true,                       //点，统一一种图标(true)还是按照属性值赋值(false)
        "framesIcon": false,                     //点，统一一种图标(true)且图标是序列帧，默认false
        "framesImageColNum": 8,                  //点，统一一种图标(true)且图标是序列帧，序列帧图片的行数
        "framesImageRowNum": 8,                  //点，统一一种图标(true)且图标是序列帧，序列帧图片的列数
        "framesImageWidth": 25,                  //点，统一一种图标(true)且图标是序列帧，每个图标渲染到地图后的长
        "framesImageHeight": 25,                 //点，统一一种图标(true)且图标是序列帧，每个图标渲染到地图后的长
        "sameLineColor": true,                  //线，统一一种颜色(true)还是按照属性值赋值(false)
        "gradientColor": false,                 //线，是否使用渐变色
        "color": "rgba(255, 255, 0, 0.8)",       //线
        "pcWidth": "2",                            //线
        "wallWidth": "10",
        "usePrimitiveLine": false,               //使用primitive方式加载线
        "fillColor": "rgba(255, 0, 0, 0.3)",     //面
        "fillColor_attribute": "id",             //面
        "outlineColor": "rgba(255, 0, 0, 0.8)",  //面
        "pcLabelFontSize": "36",                 //标注字体大小pc
        "wallLabelFontSize": "45",               //标注字体大小wall
        "labelOffset": 40,                       //标注位置垂直偏移量
        "labelField": "",                         //Label显示字段
        "iconField" : "",
        "colorField" : "",
        "lineField": "",
        "displayField": "name",                  //默认显示字段
        "displayFieldList": [{                   //扩展显示字段
          "field": "name",
          "label": "名称",
        }],
        "pageFieldDetail": {
          "totalData": [],                        //所有数据
          "pageSize": 3,                          //每页显示的数量
          "pageNum": 1,                           //一共多少页
          "dataShow": [],                         //当前显示的数据
          "currentPage": 0                        //当前页数，默认显示第一页
        },
        "pageDetail": {
          "totalData": [],                        //所有数据
          "pageSize": 5,                          //每页显示的数量
          "pageNum": 1,                           //一共多少页
          "dataShow": [],                         //当前显示的数据
          "currentPage": 0                        //当前页数，默认显示第一页
        }
      };
      this.ctrl.dialog.layer.show = true;
      this.ctrl.dialog.layer.isAdd = true;
      this.ctrl.dialog.layer.colorField = "";               //面，用来不同属性的要素赋值的颜色字段
      this.ctrl.dialog.layer.iconField = "";                //点，用来不同属性要素赋值的图标字段
      this.ctrl.dialog.layer.fieldList = [];
      this.ctrl.dialog.layer.fieldColorList = [];
      this.ctrl.dialog.layer.fieldAttributeList = [];       //面，表格上显示的数据（总）
      this.ctrl.dialog.layer.pointFieldAttributeList = [];  //点，表格上显示的数据（总）
      this.ctrl.dialog.layer.lineFieldAttributeList = [];  //线，表格上显示的数据（总）
      this.layerGroupTypeDataInit();
    },

    allLayersHide(){
      //this.$data.data.layers
      console.log(this.$data.data);
      var layers = this.$data.data.layers;
      layers.forEach((layer)=>{
        layer.show = false;
      });
    },

    allLayersShow(){
      //this.$data.data.layers
      console.log(this.$data.data);
      var layers = this.$data.data.layers;
      layers.forEach((layer)=>{
        layer.show = true;
      });
    },
    
    //图层修改
    layerModifyDialog(layer, idx){
      this.ctrl.dialog.layer.data = layer;
      this.ctrl.dialog.layer.groupPreSort = layer.groupSort;
      this.ctrl.dialog.layer.fieldColorList = layer.fieldColorList;
      this.ctrl.dialog.layer.fieldAttributeList = layer.fieldAttributeList;
      this.ctrl.dialog.layer.pointFieldAttributeList = layer.pointFieldAttributeList;
      this.ctrl.dialog.layer.lineFieldAttributeList = layer.lineFieldAttributeList;
      this.ctrl.dialog.layer.show = true;
      this.ctrl.dialog.layer.isAdd = false;
      this.ctrl.dialog.layer.fieldList = [];
      this.layerGroupTypeDataInit();
    },

    //图层删除
    layerDeleteDialog(layer, idx){
      this.$confirm(`是否确定删除该图层【${layer.layerName} ${layer.layerTitle}】?`, '确认').then(() => {
        this.$data.data.layers.remove(idx);
      })
    },

    layerAdd(){
      var data = this.ctrl.dialog.layer.data;
      data.fieldAttributeList = this.ctrl.dialog.layer.fieldAttributeList;
      data.pointFieldAttributeList = this.ctrl.dialog.layer.pointFieldAttributeList;
      data.lineFieldAttributeList = this.ctrl.dialog.layer.lineFieldAttributeList;
      data.fieldColorList = this.ctrl.dialog.layer.fieldColorList;
      //data.colorField = this.ctrl.dialog.layer.colorField;
      
      if(data.groupType == '默认图层') data.groupSort = 99;
      //图层类型不能为空
      if(!data.groupType){
        this.$confirm(`图层类型不能为空`, '确认');
        return;
      }
      //如果没有设定序号或设定序号为0，则无法新增数据
      if(!data.groupSort || data.groupSort==0 || isNaN(Number(data.groupSort))){
        this.$confirm(`业务排序值只能为数字且不能为空或0，该序号将用于确定系统图层的显示顺序`, '确认');
        return;
      }

      //从数组前面插入
      this.$data.data.layers.unshift(data);
      this.$data.data.layers.forEach(function(item){
        if(item.groupType == data.groupType){
          item.groupSort = data.groupSort;
        }
      })
    },

    layerModify(){
      var data = this.ctrl.dialog.layer.data;
      var groupPreSort = this.ctrl.dialog.layer.groupPreSort;
      data.fieldAttributeList = this.ctrl.dialog.layer.fieldAttributeList;
      data.pointFieldAttributeList = this.ctrl.dialog.layer.pointFieldAttributeList;
      data.lineFieldAttributeList = this.ctrl.dialog.layer.lineFieldAttributeList;
      data.fieldColorList = this.ctrl.dialog.layer.fieldColorList;
      //data.colorField = this.ctrl.dialog.layer.colorField;
      if(data.groupType == '默认图层') data.groupSort = 99;
      //图层类型不能为空
      if(!data.groupType){
        this.$confirm(`图层类型不能为空`, '确认');
        return;
      }
      //如果没有设定序号，则无法新增数据
      if(!data.groupSort || data.groupSort==0 || isNaN(Number(data.groupSort))){
        this.$confirm(`业务排序值只能为数字且不能为空或0，该序号将用于确定系统图层的显示顺序`, '确认');
        //console.log(this.$data.data.layers);
        this.$data.data.layers.forEach(function(item){
          if(item.layerName == data.layerName){
            item.groupSort = groupPreSort;
          }
        })
        return;
      }

      this.$data.data.layers.forEach(function(item){
        if(item.layerName == data.layerName){
          //复制信息到源数据中
          $.extend(true, item, data);
        }
        if(item.groupType == data.groupType){
          item.groupSort = data.groupSort;
        }
      })
    },

    layerDisable(item, disable){
      item.disable = disable;
    },

    layerFileSelect(){
      var selector = $("#base-chooser-file-adv").get(0);
      var config = {
        "rep": "vfs",
        "path": "/地图图层",
        "include": ".geojson,.geosql,.shp",
      }
      selector.showSelect(config, (items)=>{
        if(items.length > 0){
          var item = items[0];
          if(item.ext == "shp"){
            this.ctrl.dialog.layer.data.url = "/kettle/gt/shp/json/?&rep=" + config.rep + "&path=" + item.id;
          } else if(item.ext == "geojson"){
            this.ctrl.dialog.layer.data.url = "/kettle/gt/json/json/?&rep=" + config.rep + "&path=" + item.id;
          } else if(item.ext == "sql" || item.ext == "geosql"){
            this.ctrl.dialog.layer.data.url = "/kettle/gt/sql/json/?&rep=" + config.rep + "&path=" + item.id;
          }
        }
      });
    },

    layerImageSelect(){
      var selector = $("#base-chooser-imagelist").get(0);
      var config = {
        "rep": "vfs",
        "path": "/地图图例库",
        "include": ".png,.jpg,.jpeg,.gif",
      };
      selector.showSelect(config, (items)=>{
        if(items.length > 0){
          var item = items[0];
          this.ctrl.dialog.layer.data.imageUrl = "/" + config.rep + item.id;
        }
      });
    },

    layerFramesImageSelect(){
      var selector = $("#base-chooser-imagelist").get(0);
      var config = {
        "rep": "vfs",
        "path": "/地图图例库",
        "include": ".png,.jpg,.jpeg,.gif",
      };
      selector.showSelect(config, (items)=>{
        if(items.length > 0){
          var item = items[0];
          this.ctrl.dialog.layer.data.framesImageUrl = "/" + config.rep + item.id;
        }
      });
    },

    //每个点属性对应一个图标
    layerIconSelect(goal){
      var selector = $("#base-chooser-imagelist").get(0);
      var config = {
        "rep": "vfs",
        "path": "/地图图例库",
        "include": ".png,.jpg,.jpeg,.gif",
      };
      selector.showSelect(config, (items)=>{
        if(items.length > 0){
          var item = items[0];
          goal.imageUrl = "/" + config.rep + item.id;
        }
      });
    },

    layerLoadFieldList(){
      if(this.ctrl.dialog.layer.fieldList && this.ctrl.dialog.layer.fieldList.length > 0)return; //有值就不再加载了
      this.ctrl.dialog.layer.fieldListLoading = true;
      this.$options.api.post(this.ctrl.dialog.layer.data.url).then((resp)=>{
        this.ctrl.dialog.layer.fieldListLoading = false;
        if(resp.data && resp.data.features && resp.data.features.length > 0){
          var f = resp.data.features[0];
          for(var field in f.properties){
            this.ctrl.dialog.layer.fieldList.push({field: field, value: f.properties[field]});
          }
          var fieldList = this.ctrl.dialog.layer.fieldList;
          //计算出总页数
          this.ctrl.dialog.layer.data.pageFieldDetail.pageNum = Math.ceil(fieldList.length/this.ctrl.dialog.layer.data.pageFieldDetail.pageSize) || 1;
          for(let i = 0;i<this.ctrl.dialog.layer.data.pageFieldDetail.pageNum;i++){
            this.ctrl.dialog.layer.data.pageFieldDetail.totalData[i] = fieldList.slice(3 * i, 3*(i+1));
          }
          this.ctrl.dialog.layer.data.pageFieldDetail.dataShow = this.ctrl.dialog.layer.data.pageFieldDetail.totalData[this.ctrl.dialog.layer.data.pageFieldDetail.currentPage];
        }
      })
    },

    //图层类型数据整理
    layerGroupTypeDataInit(){
      var newArray = [];
      this.ctrl.dialog.layer.groupTypeArray = [];
      for(var i=0;i<this.$data.data.layers.length;i++){
        newArray.push(this.$data.data.layers[i].groupType);
      }
      newArray.map((el,index)=>{
        if(this.ctrl.dialog.layer.groupTypeArray.indexOf(el)==-1){
          this.ctrl.dialog.layer.groupTypeArray.push(el);
        }
      })
      
    },

    loadFieldSelect(){
      if(!this.ctrl.dialog.layer.data.url)return;
      this.ctrl.dialog.layer.fieldColorList = [];
      this.$options.api.post(this.ctrl.dialog.layer.data.url).then((resp)=>{
        if(resp.data && resp.data.features && resp.data.features.length > 0){
          var f = resp.data.features[0];
          for(var field in f.properties){
            this.ctrl.dialog.layer.fieldColorList.push(field);
          }
        }
      });
    },

    FieldAttributeShow(){
      if(!this.ctrl.dialog.layer.data.url)return;
      this.ctrl.dialog.layer.fieldAttributeList = []; //每次都清空
      //this.ctrl.dialog.layer.data.colorField = "";
      this.$options.api.post(this.ctrl.dialog.layer.data.url).then((resp)=>{
        if(resp.data && resp.data.features && resp.data.features.length > 0){
          var f = resp.data.features;
          var count = 0;
          var tempArr = [];
          //this.ctrl.dialog.layer.data.colorField = this.ctrl.dialog.layer.data.fieldName;
          f.forEach((item)=>{
            var field = item.properties;
            color = "rgba(" + Math.floor(255*Math.random())+ "," + Math.floor(255*Math.random()) + "," + Math.floor(255*Math.random()) +",0.5)";
            this.ctrl.dialog.layer.fieldAttributeList.push({field: field[this.ctrl.dialog.layer.data.colorField], color: color, height: 0});
            tempArr.push(field[this.ctrl.dialog.layer.data.colorField]);
            if(tempArr.indexOf(field[this.ctrl.dialog.layer.data.colorField])!=count){
              this.ctrl.dialog.layer.fieldAttributeList.pop();
            }
            count++;
          });
        }
      })
    },

    lineColorAttributeShow(){
      if(!this.ctrl.dialog.layer.data.url)return;
      this.ctrl.dialog.layer.lineFieldAttributeList = []; //每次都清空
      this.$options.api.post(this.ctrl.dialog.layer.data.url).then((resp)=>{
        if(resp.data && resp.data.features && resp.data.features.length > 0){
          var f = resp.data.features;
          var count = 0;
          var tempArr = [];
          f.forEach((item)=>{
            var field = item.properties;
            color = "rgba(" + Math.floor(255*Math.random())+ "," + Math.floor(255*Math.random()) + "," + Math.floor(255*Math.random()) +",0.5)";
            this.ctrl.dialog.layer.lineFieldAttributeList.push({field: field[this.ctrl.dialog.layer.data.lineField], color: color, height: 0});
            tempArr.push(field[this.ctrl.dialog.layer.data.lineField]);
            if(tempArr.indexOf(field[this.ctrl.dialog.layer.data.lineField])!=count){
              this.ctrl.dialog.layer.lineFieldAttributeList.pop();
            }
            count++;
          });
        }
      })
    },

    pointIconAttributeSelect(){
      if(!this.ctrl.dialog.layer.data.url)return;
      this.ctrl.dialog.layer.pointFieldAttributeList = []; //每次都清空
      //this.ctrl.dialog.layer.iconField = "";
      this.$options.api.post(this.ctrl.dialog.layer.data.url).then((resp)=>{
        if(resp.data && resp.data.features && resp.data.features.length > 0){
          var f = resp.data.features;
          var count = 0;
          var tempArr = [];
          //this.ctrl.dialog.layer.iconField = this.ctrl.dialog.layer.data.fieldName;
          f.forEach((item)=>{
            var field = item.properties;
            //var iconImage = "";
            this.ctrl.dialog.layer.pointFieldAttributeList.push({field: field[this.ctrl.dialog.layer.data.iconField], imageUrl: this.ctrl.dialog.layer.data.imageUrl}); //iconImage: iconImage, height: 0});
            tempArr.push(field[this.ctrl.dialog.layer.data.iconField]);
            if(tempArr.indexOf(field[this.ctrl.dialog.layer.data.iconField])!=count){
              this.ctrl.dialog.layer.pointFieldAttributeList.pop();
            }
            count++;
          });
        }
      });
    },

    FieldLabelShow(){
      this.ctrl.dialog.layer.data.labelField = this.ctrl.dialog.layer.data.labelFieldName;
    },

    layerDisplayFieldSelect(item, idx){
      this.ctrl.dialog.layer.data.displayField = item.field;
    },

    layerIconFieldSelect(item, idx){
      this.ctrl.dialog.layer.data.iconField = item.field;
    },

    layerColorFieldSelect(item, idx){
      this.ctrl.dialog.layer.data.colorField = item.field;
    },

    layerLineColorFieldSelect(item, idx){
      this.ctrl.dialog.layer.data.lineField = item.field;
    },

    layerLabelFieldSelect(item, idx){
      this.ctrl.dialog.layer.data.labelField = item.field;
    },

    layerDisplayFieldListSelect(item, idx){
      this.ctrl.dialog.layer.data.displayFieldList.push({field: item.field, label: item.field});
    },
    layerDisplayFieldListDelete(item, idx){
      this.ctrl.dialog.layer.data.displayFieldList.remove(idx);
    },

    //图层删除
    mapLocate(){
      var map = $("#map-container").find("v-std-map-cesium").get(0);
      var pos = map.getCameraPosition();
      if(pos){
        this.$data.data.map['cen-x'] = pos.geoCoord.lon;
        this.$data.data.map['cen-y'] = pos.geoCoord.lat;
        this.$data.data.map['level'] = map.getLevel();
      }
      this.ctrl.dialog.map.show = false;
    },

    countPage(){
      this.ctrl.dialog.layer.data.pageDetail.totalData = [];
      //判断图层是点线面中的哪一个
      var layerDataList = [];
      if(this.ctrl.dialog.layer.data.layerType == 'point'){
        layerDataList = this.ctrl.dialog.layer.pointFieldAttributeList;
      }else if(this.ctrl.dialog.layer.data.layerType == 'polygon'){
        layerDataList = this.ctrl.dialog.layer.fieldAttributeList;
      }else if(this.ctrl.dialog.layer.data.layerType == 'line'){
        layerDataList = this.ctrl.dialog.layer.lineFieldAttributeList;
      }
      //计算出总页数
      this.ctrl.dialog.layer.data.pageDetail.pageNum = Math.ceil(layerDataList.length/this.ctrl.dialog.layer.data.pageDetail.pageSize) || 1;
      //根据总页数对所有数据分组，并存进每一页
      for(let i = 0;i<this.ctrl.dialog.layer.data.pageDetail.pageNum;i++){
        this.ctrl.dialog.layer.data.pageDetail.totalData[i] = layerDataList.slice(5 * i, 5*(i+1));
      }
      this.ctrl.dialog.layer.data.pageDetail.dataShow = this.ctrl.dialog.layer.data.pageDetail.totalData[this.ctrl.dialog.layer.data.pageDetail.currentPage];
    },

    nextPage(type){
      if(type==2 && (this.ctrl.dialog.layer.data.pageDetail.currentPage == this.ctrl.dialog.layer.data.pageDetail.pageNum -1)&&this.ctrl.dialog.layer.data.pageDetail.totalData.length!=0){
        return;
      }
      if(type==1 && (this.ctrl.dialog.layer.data.pageFieldDetail.currentPage == this.ctrl.dialog.layer.data.pageFieldDetail.pageNum -1)&&this.ctrl.dialog.layer.data.pageFieldDetail.totalData.length!=0){
        return;
      }
      if(this.ctrl.dialog.layer.data.pageDetail.totalData.length!=0){
        this.ctrl.dialog.layer.data.pageDetail.dataShow = this.ctrl.dialog.layer.data.pageDetail.totalData[++this.ctrl.dialog.layer.data.pageDetail.currentPage];
      }
      if(this.ctrl.dialog.layer.data.pageFieldDetail.totalData.length!=0){
        this.ctrl.dialog.layer.data.pageFieldDetail.dataShow = this.ctrl.dialog.layer.data.pageFieldDetail.totalData[++this.ctrl.dialog.layer.data.pageFieldDetail.currentPage];
      }
    },

    prePage(){
      if(this.ctrl.dialog.layer.data.pageDetail.currentPage == 0 && this.ctrl.dialog.layer.data.pageDetail.totalData.length!=0){
        return;
      }
      if(this.ctrl.dialog.layer.data.pageFieldDetail.currentPage == 0 && this.ctrl.dialog.layer.data.pageFieldDetail.totalData.length!=0){
        return;
      }
      if(this.ctrl.dialog.layer.data.pageDetail.totalData.length!=0){
        this.ctrl.dialog.layer.data.pageDetail.dataShow = this.ctrl.dialog.layer.data.pageDetail.totalData[--this.ctrl.dialog.layer.data.pageDetail.currentPage];
      }
      if(this.ctrl.dialog.layer.data.pageFieldDetail.totalData.length!=0){
        this.ctrl.dialog.layer.data.pageFieldDetail.dataShow = this.ctrl.dialog.layer.data.pageFieldDetail.totalData[--this.ctrl.dialog.layer.data.pageFieldDetail.currentPage];
      }
    },

    check(item){
      console.log(item);
    },


    //每次文本框中内容改变进入该函数
    mapColorApply(dataArr){
      var map = $("#map-container2").find("v-std-map-cesium").get(0);
      var tempObj = {};
      var check = false;
      for(var styleConfig of dataArr){
        var type = styleConfig.type;
        var data = styleConfig.data;
        var status = styleConfig.status;
        if(status){
          check = true;
          if(type == 'grey'){
            map.baseMapColor_gray(data);
          }else if(type == 'invert'){
            map.baseMapColor_inverse();
          }else if(type == 'levels'){
            map.baseMapColor_level(data);
          }else if(type == 'linear'){
            map.baseMapColor_linear(data);
          }else if(type == 'multiply'){
            map.baseMapColor_multiply(data);
          }else if(type == 'screen'){
            map.baseMapColor_screen(data);
          }
        }
      }
      if(check)
      {
        map.baseMapColor_execute();
      }else{
        map.invertMapColor();
      }
    },

    //调色板删除
    mapColorDeleteDialog(item, idx){
      this.$confirm(`是否确定删除该调色参数?`, '确认').then(() => {
        
        this.$data.data.mapColor.remove(idx);
        this.mapColorApply(this.$data.data.mapColor)
      })
    },

    //底图增加
    mapColorAddDialog(){
      //临时赠加的数据
      this.ctrl.dialog.mapColor.data = {
        "type": 'grey',
        "data": {
          "reference": "0.1",
          "black": "55",
          "grayRataio": "1.25",
          "white": "180",
          "r": "90",
          "g": "3",
          "b": "73",
          "a": "0.4"
        },
        "status": true,
        "display": false,
      };
      this.ctrl.dialog.mapColor.show = true;
      this.ctrl.dialog.mapColor.isAdd = true;
    },
    
    mapColorAdd(){
      //整理数据
      var data = {};//存储到配置文件中的数据
      //var data = this.ctrl.dialog.mapColor.data;
      var type = this.ctrl.dialog.mapColor.data.type;
      data.type = type;
      data.status = this.ctrl.dialog.mapColor.data.status;
      if(type == 'grey'){
        data.data = {};
        data.data["reference"] = this.ctrl.dialog.mapColor.data.data.reference;
      }else if(type == 'levels'){
        data.data = {};
        data.data["black"] = this.ctrl.dialog.mapColor.data.data.black;
        data.data["grayRataio"] = this.ctrl.dialog.mapColor.data.data.grayRataio;
        data.data["white"] = this.ctrl.dialog.mapColor.data.data.white;
      }else if(type == 'linear' || type == 'multiply' || type == 'screen'){
        data.data = {};
        data.data["r"] = this.ctrl.dialog.mapColor.data.data.r;
        data.data["g"] = this.ctrl.dialog.mapColor.data.data.g;
        data.data["b"] = this.ctrl.dialog.mapColor.data.data.b;
        data.data["a"] = this.ctrl.dialog.mapColor.data.data.a;
      }
      this.ctrl.dialog.mapColor.data = {
        "type": 'grey',
        "data": {
          "reference": "0.1",
          "black": "55",
          "grayRataio": "1.25",
          "white": "180",
          "r": "90",
          "g": "3",
          "b": "73",
          "a": "0.4"
        },
        "status": true,
        "display": false,
      };
      //从数组前面插入
      this.$data.data.mapColor.unshift(data);
      this.mapColorApply(this.$data.data.mapColor);
    },

    mapColorTypeChange(id,type){
      //console.log(this.ctrl.dialog.mapColor.data.type, id);
      this.ctrl.dialog.mapColor.data.type = id;
    },

    handleOpened(){
      var dialogWin = document.getElementsByClassName("dialog-layer-modify");
      var bgWind = document.getElementsByClassName("el-dialog__wrapper");
      bgWind[1].scrollTop = bgWind[1].scrollHeight;
    },

    handleClosed(){
      var dialogWin = document.getElementsByClassName("dialog-layer-modify");
      var bgWind = document.getElementsByClassName("el-dialog__wrapper");
      bgWind[1].scrollTop = bgWind[1].scrollHeight;
    }
  },
}

</script>