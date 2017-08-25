//import {activateLoadingTransition, dismantleLoadingTransition} from '../loading-indicator';
import ENV from '../env'

export function getRootHttp(path, params){
  return getHttp(`${ENV.root}/${path}`, params)
}
export function getHttp(url, params){
  return new Promise((resolve, reject) => {
    let indicatorKey = url;
    preProcess(indicatorKey);

    let xmlhttp = new XMLHttpRequest();
    //params = params || {};

    if(params){
      url = `${url}?${toQueryString(params)}`;
    }

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE){
          if (xmlhttp.status == 200) {
              resolve(xmlhttp.response);
          }

          else {
              reject(xmlhttp.response);
          }

          postProcess(indicatorKey);
      }
    };

    xmlhttp.open("GET", url, true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.send();
  });
}

export function postHttp(url, params){
  return new Promise((resolve, reject) => {
    let indicatorKey = url;
    preProcess(indicatorKey);

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url, true);


    xmlhttp.setRequestHeader("Content-type", "application/json");

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE){
          if (xmlhttp.status == 200) {
              resolve(JSON.parse(xmlhttp.responseText));
          }

          else {
              reject(JSON.parse(xmlhttp.responseText));
          }

          postProcess(indicatorKey);
      }
    };

    let payload = null;

    params = params || {};

    if(params){
      payload = JSON.stringify(params);
    }

    xmlhttp.send(payload);
  });
}

export function putHttp(url, params){
  return new Promise((resolve, reject) => {
    let indicatorKey = url;
    preProcess(indicatorKey);

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("PUT", url, true);

    xmlhttp.setRequestHeader("Content-type", "application/json");

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE){
          if (xmlhttp.status == 200) {
              resolve(JSON.parse(xmlhttp.responseText));
          }

          else {
              reject(JSON.parse(xmlhttp.responseText));
          }

          postProcess(indicatorKey);
      }
    };

    let payload = null;

    params = params || {};

    if(params){
      //payload = toQueryString(params);
      payload = JSON.stringify(params);
    }

    xmlhttp.send(payload);
  });
}

export function deleteHttp(url, params){
  return new Promise((resolve, reject) => {
    let indicatorKey = url;
    preProcess(indicatorKey);

    let xmlhttp = new XMLHttpRequest();

    params = params || {};
    if(params){
      url = `${url}?${toQueryString(params)}`;
    }

    xmlhttp.open("DELETE", url, true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE){
          if (xmlhttp.status == 200) {
              resolve(JSON.parse(xmlhttp.responseText));
          }

          else {
              reject(JSON.parse(xmlhttp.responseText));
          }

          postProcess(indicatorKey);
      }
    };

    xmlhttp.send();
  });
}

function preProcess(url){
  //activateLoadingTransition(url);
}

function postProcess(url){
  //dismantleLoadingTransition(url);
}

function toQueryString(map){
  return Object.keys(map).map(key => `${key}=${map[key]}`).join('&');
}

function getCookieValueByName(cookieName) {
    var c_start, c_end;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookieName + "=");

        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            c_end = document.cookie.indexOf(";", c_start);

            if (c_end == -1) {
                c_end = document.cookie.length;
            }

            return decodeURI(document.cookie.substring(c_start, c_end));
        }

    }

    return "";
}
