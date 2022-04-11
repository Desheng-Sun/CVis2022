import {get, post} from './http.js';

export function helloworld() {
  return get("/helloworld")
}

export function qone(){
  return get("/Qone")
}