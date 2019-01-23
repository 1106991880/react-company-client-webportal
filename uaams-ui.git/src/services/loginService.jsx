import Tool from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message  } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class LoginService {

  /**
    *找回密码
    */
    RetrievePassword(params){
        var res = Tool.post2("/uaa/UserController/retrievePassword.do",params,false);
        if (res.result) {
          return res
        }else {
          if (JSON.stringify(res)=="{}") {
              return
          }else {
            global.$publicMethod.Hint("提交失败",false,res.desc);
          }

        }
    }

    /**
     * 登录界面
     * @param {username} 用户名
     * @param {password} 密码
     * @return {登录信息}
     */
    goLogin(params,JumpLogin) {
        if(Config.testData){
            Config.localItem(Config.localKey.userToken, (new Date()).getTime()); // 模拟登录成功返回的Token
            Simulation.login();
            sessionStorage.setItem("userId", "2");
            sessionStorage.setItem("zoneCode","000000");
            sessionStorage.setItem("shared","1");
            global.userInfo = {userId:"2"};
            hashHistory.push('/home');
        }else{
            console.log("-------------");
            var res = Tool.LoginPost(params, false);
            console.log("登录返回",res);

            if(res.result) {
                console.log("登录成功");
                Config.localItem(Config.localKey.userToken, (new Date()).getTime()); // 模拟登录成功返回的Token
                sessionStorage.setItem("userId", res.data.userId); //用户ID
                sessionStorage.setItem("userName", res.data.realName);//用户名称（汉字）
                sessionStorage.setItem("loginName", res.data.loginName);//用户名称（汉字）
                sessionStorage.setItem("userType", res.data.userType);//用户类型
                sessionStorage.setItem("zoneCode", res.data.zoneCode);//地区编码
                sessionStorage.setItem("orgCode", res.data.orgCode);//机构编码
                sessionStorage.setItem("orgType", res.data.orgType);//机构类别
                sessionStorage.setItem("orgName", res.data.orgName);//机构名称
                sessionStorage.setItem("orgFdObjectId", res.data.orgFdObjectId);//机构id
                if (JumpLogin) {
                  console.log("准备调路由1");
                  if (window.top != window.self) {
                    console.log("准备调路由2");
                    sessionStorage.setItem("JumpLogin","true")
                    window.top.location.href="/#/app"
                  }
                }else {
                  hashHistory.push("/app");
                }

            } else {
              sessionStorage.setItem("errorMessage",res.data==null || res.data=='Bad credentials'?"用户名或密码错误":res.data);
              //Message.error(res.data==null?"用户名或密码错误":res.data);
            }
            return res;
        }
    }

    /**
     * 获取图片验证码--登录所用
     * @param String  imageId  32UUID
     * @return object
     */
    imagecode(params) {
        var res = Tool.postImageCode('/uaa/service/imagecode.do', params, false);
        if(res.result){
          return res.data
        }else{
          global.$publicMethod.Hint("获取验证码失败",false,"获取验证码失败，请重新获取");
        }
    }
}

// 实例化再导出
export default new LoginService();
