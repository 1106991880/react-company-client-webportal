import Config from '../../config/index';
const Tool = {};
import $ from 'jquery';
import { browserHistory } from 'react-router';
import { Modal } from 'antd';

const target = Config.target;
const target2= Config.target2;
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {
    var setting = {
        url: window.location.pathname, //默认ajax请求地址
        async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
        type: 'GET', //请求的方式
        data: {}, //发给服务器的数据
        dataType: 'json',
        success: function (text) { }, //请求成功执行方法
        error: function () { } //请求失败执行方法
    };

    var aData = []; //存储数据
    var sData = ''; //拼接数据
    //属性覆盖
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }
    for (var attr in setting.data) {
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    try {
        if (setting.type == 'GET' || setting.type == 'DELETE') { //get、delete方式请求
            sData = setting.url + '?' + sData;
            xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
            xhr.send();
        } else { //post方式请求
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(sData);
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }
            if (xhr.status == 200) { // 请求成功
                setting.success(response, setting, xhr);
            } else { // 请求失败
                if(!xhr.withCredentials) {
                    // 重新登录
                    window.location.href = '/login';
                } else {
                    setting.error(setting, xhr);
                }
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }

    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    console.log("xhr",xhr);
    return xhr;
};

/**
 * 封装ajax put请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.put = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'PUT', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax delete请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.delete = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'DELETE', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};


/**
 * 登录请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.LoginPost = function ( data, async) {
  console.log("POST数据为:",data);
  var returnResult = {}
  var issucess=false;
  //可用 fetch替换
  $.ajax({
    type: 'post', //请求的方式
    url:target+`/uaa/oauth/token?grant_type=password&username=${data.usersName}&password=${data.usersPassword}`,//ajax请求地址
    dataType: 'json',//数据类型
    //data: data,//发给服务器的数据
    async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
    // 允许携带证书
    xhrFields: {
        withCredentials: false
    },
    crossDomain: true,
    headers: {
      "Authorization": "Basic c2lub3NvZnRDbGllbnRJZDpzaW5vc29mdFNlY3JldA==" //把登录获取的Token加入到http请求头中
    },
    success: (res) => {
      console.log("LoginPost返回数据:",res);
      issucess=true;
      global.token = res.access_token;
      sessionStorage.setItem("userToken",res.access_token);
    },
    error:(jqXHR, textStatus, errorThrown) => {
      var errorMessage = jqXHR.responseJSON.error_description;
      var sessionStatus = jqXHR.getResponseHeader('sessionstatus');
      console.log("sessionStatus",sessionStatus);
      if(sessionStatus == 'timeout') {
          Modal.info({
            title: '由于您长时间没有操作, session已过期, 请重新登录.',
            okText:'立即重新登录',
            content: (
              <div>
                <p>3秒后自动跳转至登录页面</p>
              </div>
            ),
            onOk() {},
          });
          setTimeout(()=>{
            browserHistory.push("/login");
          },3000)
      }
      if(textStatus=="timeout"){
        global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
      }else{
        if(errorMessage==null){
          global.$publicMethod.Hint("提示",'info',"服务出错，请联系管理员");
        }else{
          returnResult={result:false,data:errorMessage};
        }
      }
    }
  });
    console.log("issucess:",issucess);
  if(issucess){
    console.log("issucess11111:",issucess);
    var getUserInfoParams={
      vUserName:'H/2qIBdj9TQ=',
      vPassword:'tW0dE1GYWxk=',
      userName:data.usersName,
      imageValue:data.imageValue,
      imageId:data.imageId,
      applicationName:'UMS'
    }
    var res = this.post("/uaa/service/getUserMessage.do",getUserInfoParams, false);
    returnResult = res;
  }
  return returnResult;
}
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post2 = function (pathname, data, async) {
    console.log("POST地址为:",target + pathname);
    console.log("POST数据为:",data);
    console.log("token:",sessionStorage.getItem("userToken"));
    var returnResult = {}
    //可用 fetch替换
    $.ajax({
      type: 'POST', //请求的方式
      url: target + pathname,//ajax请求地址
      dataType: 'json',//数据类型
      data: data,//发给服务器的数据
      async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
      //允许携带证书
      xhrFields: {
          withCredentials: false
      },
      traditional: true,//这里设置为true
      crossDomain: true,
      headers: {
        "Content-type":"application/x-www-form-urlencoded",
        // "Access-Control-Allow-Origin":"application/json"
      },
      success: (res) => {
        console.log("POST返回数据:",res);
        if (JSON.stringify(res)=="{}") {
            global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");

        }else {
          console.log("jinlaile ");
            returnResult = res

        }

      },
      error:(jqXHR, textStatus, errorThrown) => {
        console.log("textStatus=========",textStatus);
        console.log("error=========",jqXHR);

        var sessionStatus = jqXHR.getResponseHeader('sessionstatus');
        console.log("sessionStatus",sessionStatus);
        if(sessionStatus == 'timeout') {
            Modal.info({
              title: '由于您长时间没有操作, session已过期, 请重新登录.',
              okText:'立即重新登录',
              content: (
                <div>
                  <p>3秒后自动跳转至登录页面</p>
                </div>
              ),
              onOk() {},
            });
            setTimeout(()=>{
              browserHistory.push("/login");
            },3000)
        }
        if(textStatus=="timeout"){
          global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
          return
        }else{
          global.$publicMethod.Hint("提示",'info',"服务出错，请联系管理员");
          return
        }
      }
    });
    return returnResult;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, async) {
    console.log("POST地址为:",target + pathname);
    console.log("POST数据为:",data);
    console.log("token:",sessionStorage.getItem("userToken"));
    var returnResult = {}
    //可用 fetch替换
    $.ajax({
      type: 'POST', //请求的方式
      url: target + pathname,//ajax请求地址
      dataType: 'json',//数据类型
      data: data,//发给服务器的数据
      async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
      //允许携带证书
      xhrFields: {
          withCredentials: false
      },
        traditional: true,//这里设置为true
      crossDomain: true,
      headers: {
        "Authorization":"Bearer "+ sessionStorage.getItem("userToken") //把登录获取的Token加入到http请求头中
      },
      success: (res) => {
        console.log("POST返回数据:",res);
        returnResult = res
      },
      error:(jqXHR, textStatus, errorThrown) => {
        console.log("textStatus=========",textStatus);
        console.log("error=========",jqXHR);

        var sessionStatus = jqXHR.getResponseHeader('sessionstatus');
        console.log("sessionStatus",sessionStatus);
        if(sessionStatus == 'timeout') {
            Modal.info({
              title: '由于您长时间没有操作, session已过期, 请重新登录.',
              okText:'立即重新登录',
              content: (
                <div>
                  <p>3秒后自动跳转至登录页面</p>
                </div>
              ),
              onOk() {},
            });
            setTimeout(()=>{
              browserHistory.push("/login");
            },3000)
        }
        if(textStatus=="timeout"){
          global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
        }else{
          global.$publicMethod.Hint("提示",'info',"服务出错，请联系管理员");
        }
      }
    });
    return returnResult;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.postImageCode = function (pathname, data, async) {
    console.log("POST地址为:",target + pathname);
    console.log("POST数据为:",data);
    console.log("token:",sessionStorage.getItem("userToken"));
    var returnResult = {}
    //可用 fetch替换
    $.ajax({
      type: 'POST', //请求的方式
      url: target + pathname,//ajax请求地址
      dataType: 'json',//数据类型
      data: data,//发给服务器的数据
      async: async,//true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
      success: (res) => {
        console.log("POST返回数据:",res);
        returnResult = res
      },
      error:(jqXHR, textStatus, errorThrown) => {
        var sessionStatus = jqXHR.getResponseHeader('sessionstatus');
        console.log("sessionStatus",sessionStatus);
        if(sessionStatus == 'timeout') {
            Modal.info({
              title: '由于您长时间没有操作, session已过期, 请重新登录.',
              okText:'立即重新登录',
              content: (
                <div>
                  <p>3秒后自动跳转至登录页面</p>
                </div>
              ),
              onOk() {},
            });
            setTimeout(()=>{
              browserHistory.push("/login");
            },3000)
        }
        if(textStatus=="timeout"){
          global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
        }else{
          global.$publicMethod.Hint("提示",'info',"服务出错，请联系管理员");
        }
      }
    });
    return returnResult;
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */

Tool.get = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

export default Tool;
