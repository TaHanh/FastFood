import { Link, Router } from '../routes/routes';

export function intentPage(path, obj, store, data) {
  if (obj == undefined) {
    Router.pushRoute(path);
    // history.push(path);
    return;
  }

  const objArray = Object.keys(obj);
  const query = `?${objArray.map(o => `${o}=${obj[o]}`).join('&')}`;
  if (data && store) store.dataIntent = data;
  // history.push(path + query);
  Router.pushRoute(path + query);

  ////console.log(path + query);
}
export function intentPageString(path, obj, store, data) {
  if (obj == undefined) {
    return;
  }

  const objArray = Object.keys(obj);
  const query = `?${objArray.map(o => `${o}=${obj[o]}`).join('&')}`;
  if (data && store) store.dataIntent = data;
  // history.push(path + query);
  return path + query;
}
export function getQuery(key) {
  return Router.router.query[key];
}
export function getPathName() {
  return window.location.pathname;
}
export function getDataIntent(store) {
  return store.dataIntent;
}
