import {get, post} from './http.js';

export function helloworld() {
  return get("/helloworld")
}