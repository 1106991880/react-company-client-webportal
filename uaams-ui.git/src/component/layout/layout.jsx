import React, {Component} from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import SiderCustom from "./SiderCustom";
import HeaderCustom from './HeaderCustom'

// 布局样式
//import './style/footer.less'
import './style/index.less'

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle}/>
                    <Content style={{margin: '0 16px'}}>
                        <LocaleProvider locale={zh_CN}>{this.props.children}</LocaleProvider>
                    </Content>
                    {/*<Footer style={{textAlign: 'center'}}>*/}
                    {/*yangzb ©2018-2019 Created by yangzb*/}
                    {/*</Footer>*/}
                </Layout>

            </Layout>

        );
    }
}

export default Main;