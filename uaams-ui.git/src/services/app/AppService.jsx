import Tool from "../xhr/index";
import {Message} from "antd";

class AppService {

    //查询
    queryUserInfo(params){
        var res = Tool.post('/uaa/ComSearchService/comSearch.do', params, false);
        if (res.result) {
            return res;
        } else {
            Message.error('查询出错');
            return {};
        }
    }

    //新增用户
    addUser(params){
        var res = Tool.post('/uaa/WebportalUserController/addWebportalUser.do', params, false);
        return res;
    }

    //删除用户
    deleteUser(params){
        var res = Tool.post('/uaa/WebportalUserController/delWebportalUser.do', params, false);
        return res;
    }

    //修改
    updateUser(params){
        var res = Tool.post('/uaa/WebportalUserController/updateWebportalUser.do', params, false);
        return res;
    }

}

export default new AppService();