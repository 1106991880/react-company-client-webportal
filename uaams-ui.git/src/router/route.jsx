import '../style/antdpro.css';
import React, {Component} from 'react'; // react核心
import {Router, Route, Redirect, IndexRoute, hashHistory} from 'react-router'; // 创建route所需
import Config from '../config/index';
import $ from 'jquery';
import layout from '../component/layout/layout'; // 布局界面
import login from '../containers/login/login'; // 登录界面
import '../services/PublicMethod'; // 公共方法
global.$pathUrl = Config.target + "/adr/file/upload";
global.$downLoad = "http://111.202.232.179/";

function banBackSpace(e) {
    var ev = e || window.event;
    //各种浏览器下获取事件对象
    var obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
    //按下Backspace键
    if (ev.keyCode == 8) {
        var tagName = obj.nodeName //标签名称
        //如果标签不是input或者textarea则阻止Backspace
        if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
            return stopIt(ev);
        }
        var tagType = obj.type.toUpperCase();//标签类型
        //input标签除了下面几种类型，全部阻止Backspace
        if (tagName == 'INPUT' && (tagType != 'TEXT' && tagType != 'TEXTAREA' && tagType != 'PASSWORD')) {
            return stopIt(ev);
        }
        //input或者textarea输入框如果不可编辑则阻止Backspace
        if ((tagName == 'INPUT' || tagName == 'TEXTAREA') && (obj.readOnly == true || obj.disabled == true)) {
            return stopIt(ev);
        }
    }
}

function stopIt(ev) {
    if (ev.preventDefault) {
        //preventDefault()方法阻止元素发生默认的行为
        ev.preventDefault();
    }
    if (ev.returnValue) {
        //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
        ev.returnValue = false;
    }
    return false;
}

$(function () {
    //实现对字符码的截获，keypress中屏蔽了这些功能按键
    document.onkeypress = banBackSpace;
    //对功能按键的获取
    document.onkeydown = banBackSpace;
})

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下

        return (
            <div>{this.props.children}</div>
        );
    }
}

// 登录验证
const requireAuth = (nextState, replace) => {
    let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
    console.log("ssawdfqweweq", token);
    if (token > 7200000) { // 模拟Token保存2个小时
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}

//测试首页
const app = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/mete/app').default)
    }, 'app');
}
//测试echartspage
const EchartsPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/mete/EchartsPage').default)
    }, 'EchartsPage');
}
//测试富文本页
const RichTextPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/mete/RichTextPage').default)
    }, 'RichTextPage');
}




global.$history = hashHistory;
const RouteConfig = (
    <Router history={$history}>
        <Route component={layout} onEnter={requireAuth}>
            <IndexRoute getComponent={app} onEnter={requireAuth}/> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
            //首页
            <Route path="/app" getComponent={app} onEnter={requireAuth}/>
            //echarts页面
            <Route path="/Echarts/EchartsPage" getComponent={EchartsPage} onEnter={requireAuth}/>
            <Route path="/RichTextPage" getComponent={RichTextPage} onEnter={requireAuth}/>
        </Route>
        <Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
            <IndexRoute component={login}/>
        </Route>
        <Redirect from="*" to="/login"/>
    </Router>
);

export default RouteConfig;