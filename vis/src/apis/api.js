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
export function getInitialSds() {
  return get("/getInitialSds");
}

export function getIcClueDataSds(numId, type) {
  return post("/getIcClueDataSds", {
    numId: numId,
    type: type,
  });
}

export function getSkeletonChartDataSds(Nodes) {
  return post("/getSkeletonChartDataSds", {
    Nodes: Nodes,
  });
}

export function getBulletChartDataSds(nodesLinksInfo) {
  return post("/getBulletChartDataSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function getInfoListSds(nodesLinksInfo) {
  return post("/getInfoListSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function getDifChartSds(linksInfo) {
  return post("/getDifChartSds", {
    linksInfo: linksInfo,
  });
}

export function getMainChartSds(linksInfo) {
  return post("/getMainChartSds", {
    linksInfo: linksInfo,
  });
}

export function getFinalDataSds(nodesLinksInfo) {
  return post("/getFinalDataSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function getDetialListSds(nodesLinksInfo) {
  return post("/getDetialListSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}

export function getIcClueData2Sds(numId, type) {
  return post("/getIcClueData2Sds", {
    numId: numId,
    type: type,
  });
}

export function getClueDenseDataSds() {
  return post("/getClueDenseDataSds");
}

export function getIndustryStackSds(nodesLinksInfo) {
  return post("/getIndustryStackSds", {
    nodesLinksInfo: nodesLinksInfo,
  });
}
