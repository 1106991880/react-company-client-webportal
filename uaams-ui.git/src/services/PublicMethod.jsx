const PublicMethod = {};
import $ from 'jquery';
import { Modal } from 'antd';
import { hashHistory } from 'react-router';
global.$IsStaticPage = 0 ;// 0是测试  1是正式
PublicMethod.GetUUID = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

//将字符串转化成dom对象;string转换为xml
PublicMethod.StringToXml = (xmlString) => {
    var xmlDoc;
    if (typeof xmlString == "string") {
        //FF
        if (document.implementation.createDocument) {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlString, "text/xml");
        } else if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlString);
        }
    }
    else {
        xmlDoc = xmlString;
    }
    return xmlDoc;
};
//xml转换为string
PublicMethod.XmlToString = (xmlDoc) => {
    if (window.ActiveXObject) {
        return xmlDoc.xml;  //IE
    } else {
        return (new XMLSerializer()).serializeToString(xmlDoc);  //FF
    }
};
//获取当前时间 YYYY + MM + DD + HH + mm + ss;
PublicMethod.formatTime = (xmlDoc) => {
    const myDate = new Date();
    const YYYY = myDate.getFullYear();
    let MM = myDate.getMonth()+1;       // 获取当前月份(0-11,0代表1月)
    MM = (MM > 9 ? '' : '0') + MM;
    let DD = myDate.getDate();
    DD = (DD > 9 ? '' : '0') + DD;
    let HH = myDate.getHours();       // 获取当前小时数(0-23)
    HH = (HH > 9 ? '' : '0') + HH;
    let mm = myDate.getMinutes();     // 获取当前分钟数(0-59)
    mm = (mm > 9 ? '' : '0') + mm;
    let ss = myDate.getSeconds();     // 获取当前秒数(0-59)
    ss = (ss > 9 ? '' : '0') + ss;
    const theDate = YYYY + MM + DD + HH + mm + ss;
    return theDate;
};
PublicMethod.formatDate = (Time) => {
  if(Time == "" || Time == undefined){
    return false;
  }
  console.log("准备格式化的时间为 {}",Time);
  return Time.substring(0,4)+"-"+Time.substring(4,6)+"-"+Time.substring(6,8)+
  " "+Time.substring(8,10)+":"+Time.substring(10,12)+":"+Time.substring(12,14);
},
/* 输入金额时，三位数加一个逗号，如：111222333 = 111,222,333 元  科学计数法*/
PublicMethod.toThousands = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
};
/* 对充值或提现金额字符串进行处理，使保留两位小数*/
PublicMethod.fmoney = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;
  let l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
};

PublicMethod.queryDeposit = (orgCode) =>{
    console.log("准备获取医院押金金额,参数 orgCode 为{}",orgCode);
    const url= global.$variable.bwckkurl+'/thcCardOperController/selectDepositByOrgCode';
    $.ajax({
      type: 'POST',
      url:url,
      dataType: 'json',
      data: {
        orgCode:orgCode
      },
      async: true,
      success: (res) => {
        console.log("=====================================获取医院押金金额返回值为 {} ",res );
        var result = res.result;
        var data = res.data;
        if(result == "true"){
          return res.data;
        } else {
          Modal.error({
            title: '提示',
            content: res.desc,
            okText: '确定',
          });
        }
      },error:(jqXHR, textStatus, errorThrown) => {
        if(textStatus=="timeout"){
          Modal.error({
            title: '提示',
            content: '获取医院押金加载超时，请重试',
            okText: '确定',
          });
        }
      }
    });
};
/*
*提示
*@ result {Boolean} 结构
*@ content {string} 描述
*@ return void
*/
PublicMethod.Hint = (title,result,content) =>{
  console.log("result {}",result);
  if(result == true){
    Modal.success({
      title:title,
      content,
      okText: '确定',
    });
  }else if(result == false){
    Modal.error({
      title:title,
      content,
      okText: '确定',
    });
  }else{
    Modal.info({
      title:title,
      content,
      okText: '确定',
    });
  }
};
PublicMethod.history = () =>{
  console.log("当前登录人员是否为财务人员global.isFinancialStaff {}",global.isFinancialStaff);
  if(global.isFinancialStaff){
    hashHistory.push('/financeHome');
  }else{
    hashHistory.push('/home');
  }
};
PublicMethod.getData = (param) => {
  var returnvalue = {};
  //可用 fetch替换
  $.ajax({
    type: param.type,
    url: param.url,
    dataType: param.dataType,
    data: param.data,
    async: param.async,
    success: (res) => {
      returnvalue = res
    },
    error:(jqXHR, textStatus, errorThrown) => {
      if(textStatus=="timeout"){
        global.$publicMethod.Hint("提示",'info',"服务连接超时，检查网络后请重试");
      }
    }
  });
  return returnvalue
};
//module.exports = CallModule;//导出模块——调用组件
global.$publicMethod = PublicMethod;
export { PublicMethod };
