import React, {Component} from 'react';
import {Layout, Icon, Menu, Modal} from 'antd';
//import {Link} from "react-router";
//import history from './history';
import Config from '../../config/index';
import { hashHistory } from 'react-router';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;

export default class HeaderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
            visible: false,
        }
        // this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };

    //退出登录
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        const self = this;
        Config.removeLocalItem(Config.localKey.userToken);
        sessionStorage.setItem("userId", ""); //用户ID
        sessionStorage.setItem("userName", "");//用户名称（汉字）
        sessionStorage.setItem("loginName", "");//用户名称（汉字）
        sessionStorage.setItem("userType", "");//用户类型
        sessionStorage.setItem("zoneCode", "");//地区编码
        sessionStorage.setItem("orgCode", "");//机构编码
        sessionStorage.setItem("orgType", "");//机构类别
        sessionStorage.setItem("orgName", "");//机构名称
        sessionStorage.setItem("orgFdObjectId", "");//机构id
        if (sessionStorage.getItem("JumpLogin") == "true") {
            console.log("-------------1");
            sessionStorage.clear();
            window.open("http://111.202.232.179", '_self')
        } else {
            console.log("-------------2");
            sessionStorage.clear();
            hashHistory.push('/login');
        }
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                >
                    <SubMenu
                        title={<span>
                            <Icon type="user" style={{fontSize: 16, color: '#1DA57A'}}/>{this.props.username}
                        </span>}
                    >
                        <Menu.Item key="logout" style={{textAlign: 'center'}} className="logout">
                            <span onClick={this.showModal}>退出登录</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

                <Modal
                    title="退出登录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    确定退出登录吗?
                </Modal>
            </Header>
        )
    }
} 