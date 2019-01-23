import React, {Component} from 'react'; // 引入了React
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialState, goLogin} from '../../redux/action/login/loginAction';
import './style/login.less';
import logo from './style/logo.png';
import {Spin, Form, Input, Button, Icon, Tabs, Alert, Modal, Radio} from 'antd';
import LoginService from '../../services/loginService';
import RetrievePassword from "./RetrievePassword"

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

/* 以类的方式创建一个组件 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
            loginBtnText: '登录',
            rPassVisible: false,
            visible: false,//error提示
            imageValue: "",//图片验证码值
            imageId: "",//32UUID
            imageBase64: "",
            JumpLogin: false
        };
    }

    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        console.log("31351615131531");
        const {actions} = this.props;
        // 初始化数据
        actions.initialState();
        this.getImage();
        var self = this
        window.onmessage = function (e) {
            console.log("eeeeeeeeee", e);
            if (window.top != window.self && e.data == "JumpLogin") {
                console.log("我接到父窗口的值啦");
                self.setState({JumpLogin: true})
            }

        }
    }

    getImage = () => {
        //获取图片验证码
        var uuid = global.$publicMethod.GetUUID()
        console.log("uuid", uuid);
        var image = LoginService.imagecode({imageId: uuid});
        this.setState({imageBase64: image, imageId: uuid})
    }
    handleSubmit = (e) => { // 登录
        console.log("登录");
        e.preventDefault();
        const {actions, form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("密码", values.password);
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        usersName: username,
                        usersPassword: password,
                        imageValue: values.imageValue,
                        imageId: this.state.imageId,
                    };

                var returnValue = LoginService.goLogin(loginParams, this.state.JumpLogin);
                if (!returnValue.result) {
                    this.setState({visible: true});
                }
            }
        });
    }

    callback(key) {
        console.log(key);
    }

    render() {
        const {loading, loginInfo, form} = this.props;
        const getFieldDecorator = form.getFieldDecorator;
        let loginStyle
        if (this.state.JumpLogin) {
            loginStyle = {
                top: "-285px",
                left: "-22px",
            }
        } else {
            loginStyle = {}
        }
        return (
            <div className="login-container" style={loginStyle}>
                <div className="top">
                    <div className="header">
                        <img alt="logo" className="logo" src={logo}/>
                        <span className="title">药品上市许可持有人药品不良反应权限系统</span>
                    </div>
                    <div className="desc">管理员登录</div>
                </div>
                <div className="main">
                    <div className="triangle"></div>
                    <Spin tip="载入中..." spinning={loading}>
                        <div>

                        </div>
                        <Form style={{marginTop: 5, height: this.state.JumpLogin ? "300px" : "250px"}}
                              onSubmit={this.handleSubmit} className="login-form">
                            {/**<center style={{color:"red",fontSize:18}}>测试系统</center>**/}
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: '请填写登录名称!', whitespace: true}],
                                })(
                                    <Input className="username"
                                           prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)', fontSize: 16}}/>}
                                           placeholder="登录名称" maxLength="30"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请填写密码!', whitespace: false}],
                                })(
                                    <Input className="password" type="password"
                                           prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)', fontSize: 16}}/>}
                                           placeholder="密码" maxLength="30"/>
                                )}
                            </FormItem>
                            <FormItem style={{marginBottom: "5px"}}>
                                {getFieldDecorator('imageValue', {
                                    rules: [{required: true, message: '请填写验证码!', whitespace: true}],
                                })(
                                    <Input className="validateKey" maxLength="4" placeholder="验证码"
                                           prefix={<Icon type="exception"
                                                         style={{color: 'rgba(0,0,0,.25)', fontSize: 16}}/>}
                                           addonAfter={<img style={{}} onClick={() => {
                                               this.getImage()
                                           }} src={"data:image/png;base64," + this.state.imageBase64}/>}/>
                                )}
                            </FormItem>
                            <div style={{overflow: "hidden", height: "40px", lineHeight: "40px"}}>
                                <FormItem style={{float: "left", display: "inlineBlock"}}>
                                    {getFieldDecorator('network')(
                                        <RadioGroup>
                                            <Radio value={1}>电信</Radio>
                                            <Radio value={2}>联通</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <a href="javascript:;" style={{float: "right"}} onClick={() => {
                                    this.getImage()
                                }}>看不清楚？换一张图</a>
                            </div>

                            <div style={{overflow: "hidden"}}>
                                {this.state.JumpLogin ? null :
                                    <a href="javascript:;" style={{float: "right"}} onClick={() => {
                                        console.log("22222");
                                        this.setState({rPassVisible: true});
                                    }}>找回密码</a>}
                            </div>

                            <FormItem>
                                <Button size="large" className="clsString"
                                        style={{marginTop: this.state.JumpLogin ? "30px" : "15px"}} type="primary"
                                        htmlType="submit" loading={loginInfo.length > 0 ? true : false}>
                                    {loginInfo.length > 0 ? '登录中...' : '登录'}
                                </Button>
                            </FormItem>
                            <Modal
                                visible={this.state.rPassVisible}
                                destroyOnClose={true}
                                closable={false}
                                width="30%"
                                style={{top: "25%"}}
                                maskClosable={false}
                                footer={false}
                            >
                                <RetrievePassword out={() => {
                                    console.log("333333");
                                    this.setState({rPassVisible: false});
                                }}/>
                            </Modal>
                            <div className="login-account">
                                {
                                    this.state.visible ? (
                                        <Alert
                                            message={sessionStorage.getItem("errorMessage")}
                                            type="error"
                                            style={{width: "100%", marginBottom: 25}}
                                            showIcon
                                            closable
                                            afterClose={() => {
                                                this.setState({visible: false});
                                            }}
                                        />
                                    ) : null
                                }
                            </div>
                        </Form>
                    </Spin>
                </div>
                <div className={this.state.JumpLogin ? "" : "globalFooter"}>
                    <div className="copyright">国家药品不良反应监测中心 | 京ICP备16043083号-2</div>
                </div>
            </div>
        );
    }
}

const LoginForm = Form.create()(Login);

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let {Common, Login} = state;
    return {
        loading: Common.loading,
        loginInfo: Login.loginInfo
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({initialState, goLogin}, dispatch)
});

const Main = connect(mapStateToProps, mapDispatchToProps)(LoginForm); // 连接redux

export default Main;