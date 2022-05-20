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
