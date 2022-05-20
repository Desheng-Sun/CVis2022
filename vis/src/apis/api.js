import { get, post } from "./http.js";

export function helloworld() {
  return get("/helloworld");
}

export function getMainChartData() {
  return get("/getMainChartData");
}

export function getIcClueData() {
  return get("/getIcClueData");
}

export function getBulletChartData() {
  return get("/getBulletChartData");
}

export function getDetailListData() {
  // TODO
  return get("/getDetailListData");
}

//孙德晟判断代码是否正确的接口
export function initialSds() {
  return get("/initialSds");
}

export function icClueDataSds(numId, type) {
  return post("/ic-clue-dataSds", {
    numId: numId,
    type: type,
  });
}

export function skeletonChartSds(Nodes) {
  return post("/skeleton-chartSds", {
    Nodes: Nodes,
  });
}

export function getBulletChartDataSds(nodesLinksInfo) {
  return post("/getBulletChartDataSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function infoList(nodesLinksInfo) {
  return post("/infoList", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function difChart(linksInfo) {
  return post("/difChart", {
    linksInfo: linksInfo,
  });
}
