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

}

export default new AppService();