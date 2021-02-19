# myCesiumDemo
记录一下工作里面做过的功能
<br>
<br>
# 2021 UPDATE
更新一下离开JT去了VTRON之后开发的部分新功能
## 1 掩膜
关注地区高亮效果，其余地方暗淡
<br>
![掩膜](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/掩膜.gif)
<br>
## 2 序列帧
使用序列帧加载动态图标
<br>
![掩膜](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/序列帧.gif)
<br>
## 3 聚合图优化
修改Cesium源码，基于网格距离法，点的聚合计算方式不使用屏幕距离改用实际地理距离，优化原始聚合api中鼠标拖动/倾斜viewer时结果会改变的问题并且聚合图结果会随着地图放大/缩小有下钻/重新聚合的效果
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/聚合图网格距离法优化1.png)
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/聚合图网格距离法优化2.png)
<br>
## 4 动态热力图演变
和时间序列相关的热力图动态演变
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/动态热力图演变.gif)
<br>
## 5 鼠标绘制扇形
绘制扇形
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/手动绘制扇形.png)
<br>
## 6 鼠标绘制复杂图形
鼠标绘制带孔的复杂多边形并且管理图层
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/鼠标绘制复杂图形.png)
<br>
## 7 纹理贴图
线要素加上纹理，可以用来绘制指示线或者作为马路贴图使用等。
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/纹理贴图.png)
<br>
## 8 流动纹理
shader实现的流光线效果以及动态指示箭头的线的效果
<br>
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/动态纹理贴图.png)
![聚合优化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/img/流动纹理.gif)
<br>
<br>
# ABOUT
记录我工作第一年接触开发做的第一个项目。借助近来来比较火的开源3维框架Cesium做的项目。使用的版本是Cesium 1.5.1，Cesium更新频率快，新版本API中还有许多要改良和学习的地方。
<br><br>
##DATA
由于数据太大无法上传，先放在百度云上<br>
**单体化数据**       -链接：https://pan.baidu.com/s1/1nsetZPpuJiOlTJ4FNcm59g 提取码：eub3 <br>
**小村落数据**       -链接：https://pan.baidu.com/s1/1eBAU2plOkqGHqHVLoHL60A 提取码：a892 <br>
**360全景数据**      -链接：https://pan.baidu.com/s1/1-8rGCiWvgCiz52BnQ_7exg 提取码：pvzc <br>
<br>
<br>
# FUNCTION
## 1 主界面
右上角借助开源Navigation插件，实现指南针、快速调整方向功能。随着视角变动，显示当前相机/鼠标点击位置的经纬度坐标及高程信息。
<br>
![界面](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/jiemian.png)
<br>
<br>
## 2 数据图层加载
利用开源ztree.js构建数据图层加载功能，勾选对应数据时加载/移除，选中对应数据名称时自动跳转到对应的boundsphere
<br>
![图层管理](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/shujutucengjiazai.png)
<br>
<br>
## 3 楼层单体化
利用已有的geojson数据对3dtile数据中的楼层单体化，选中对应楼体是高亮，并弹出geojson中存储的楼体信息
![单体化](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/dantihua.png)
<br>
<br>
## 4 光照阴影
利用Cesium中shadow API以及clock API进行场景光照模拟
<br>-加速 时间快进 阴影动画加快
<br>-减速 时间放慢 阴影动画减慢
<br>-暂停 时间暂停 阴影动画停在当前位置
<br>-开始 时间开始 阴影动画重新开始
<br>**不足：没有改 webgl 底层渲染效果差 锯齿严重 下个计划：webgl学习**<br>
<br>
![光照](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/guangzhao.png)
<br>
<br>
## 5 通视
鼠标左键单击确定起点（绿色），右键单击确定终点（棕色），返回通视结果。
<br>通视时，两点之间连线为绿色，表示全部可见
<br>不通视时，两点之间连线为绿色的部分表示起点可视，为红色的部分表示不可视
<br><br>
<br>
![通视](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tongshi.png)
![通视](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tongshi2.png)
<br>
<br>
## 6 淹没
自定义区域模拟3dtile模型的淹没情况
<br>Alpha-调整水体透明度
<br>Height-调整淹没高度
<br>自定义模拟-自定义区域 
<br> **单击左键加点，双击确定区域，初始默认1m**<br>
<br>
<br>![淹没](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/yanmo.png)
<br>![自定义淹没](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/yanmo2.png)
<br>
<br>
## 7 飞行
按照确定/创建飞行路线漫游场景<br>
<br>
<br>![飞行](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/feixing.png)
<br>
<br>
## 8 建筑剖面
借助echarts，绘制两点之间建筑的剖面高程<br>
<br>
<br>![建筑剖面](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/poumian.png)
<br><br>
## 9 调高
自定义调整加载模型的高程<br>
<br>
<br>![调整模型高度](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tiaogao.png)
<br>![调整模型高度](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tiaogao2.png)
## 10 测量绘制
### 模型距离测量
![模型距离测量](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/moxingceliang.png)
### 模型面积测量
![模型面积测量](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/模型面积.png)
### 贴地距离测量
![贴地距离测量](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tiediceliang.png)
### 贴地面积测量
![贴地面积测量](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/tiedimianji.png)
### 模型点标记
![模型点](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/dian.png)
### 贴地点标记
![贴地点](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/dian2.png)
### 模型绘线
![模型绘线](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/xian.png)
### 贴地绘线
![贴地绘线](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/xian2.png)
### 模型贴地绘面
![绘面](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/mian.png)
<br><br>
## 11 动态添加3dtile
输入3dtile地址在网页中加载该模型并跳转至其boundsphere
<br>
![动态添加](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/dongtai.png)
<br><br>
## 12 引入360全景
将360全景与模型相结合 增强可视化<br>
<br>
<br>![360](https://github.com/Noah-Gilga/myCesiumDemo/blob/master/infomation/360.png)
