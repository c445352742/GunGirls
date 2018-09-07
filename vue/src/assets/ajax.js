function Ajax(params) {
  let type, url, data, success, error;
  type = params.method || 'get',
    url = params.url,
    data = params.data,
    success = params.success,
    error = params.error;
  if (!url) {
    console.log('null url');
    return;
  }
  // 创建ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  type = type.toUpperCase();
  // 用于清除缓存
  xhr.withCredentials = true;//cookie等
  xhr.timeout = 5 * 1000;//超时

  if (type == 'GET') {
    if (typeof data == 'object') {
      var str = '';
      for (var key in data) {
        str += key + '=' + data[key] + '&';
      }
      data = str.replace(/&$/, '');
    }
    if (data) {
      xhr.open('GET', url + '?' + data, true);
    } else {
      xhr.open('GET', url /*+ '?t=' + random*/, true);
    }
    xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
    if (params.header) {
      for (let ele in params.header) {
        xhr.setRequestHeader("content-type", ele || "application/json; charset=utf-8");
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
      }
    }
    xhr.send();
  } else if (type == 'POST') {
    xhr.open('POST', url, true);

    if (params.header) {
      for (let ele in params.header) {
        xhr.setRequestHeader(ele, params.header[ele] || "application/json; charset=utf-8");
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
      }
    }
    xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
    // 标记为ajax
    xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
    // 发送cookie等
    xhr.withCredentials = true;


    // console.log(data);
    // data = null;

    xhr.send(data);
  }

  // 处理返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success ? success(JSON.parse(xhr.responseText)) : console.log(xhr.responseText);
      } else {
        if (error) {
          error(xhr);
        } else {
          console.error(xhr)
        }
      }
    }
  }
  xhr.ontimeout = function () {
    console.error(url + ' request time out');
  }
}

export default Ajax;