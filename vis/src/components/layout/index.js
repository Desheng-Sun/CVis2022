import "./index.css";

export default function Layout() {
  return (
    <div id="layout">
      <div id="identifygroup">
        <div id="ileft">
          <div id="titlebar">Black & Gary Instrudy Network Mining</div>
          <div id="searchbar">
            输入/搜索框 用户有IP/Cert类型的线索
            或根据其他节点查找到对应的IP/Cert类型的线索
          </div>
          <div id="filteric">冰柱图 展示当前线索三条内的IP/Cert跳转关系</div>
          <div id="nodelinkic">
            节点连接图 展示用户选择的多个IP/Cert的网络图
          </div>
        </div>
        <div id="iright">
          <div id="container-mainmap">
            <div id="controlmainmap">主图的控制台</div>
            <div id="mainmap">主图</div>
          </div>
          <div id="compareic">帮助用户进一步确定主图的筛选视图</div>
        </div>
      </div>
      <div id="analyzegroup">
        <div id="infotable">列表展示确定团伙的信息</div>
        <div id="statistic">
          组合视图（关系图+柱状图）展示团伙内节点/边的数量与类型
        </div>
        <div id="assetandpath">核心资产与关键链路展示</div>
        <div id="conclusion">文字模板，描述团伙基本信息与主要运作机制</div>
      </div>
    </div>
  );
}
