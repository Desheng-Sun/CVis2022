import { get, post } from "./http.js";

export function helloworld() {
  return get("/helloworld");
}

export function qone() {
  return get("/Qone");
}

export function icclue() {
  return get("/icClueData");
}

export function getBulletChartData() {
  return get("/getBulletChartData");
}

export function getDetailListData() {
  // TODO
  return get("/getDetailListData");
}
