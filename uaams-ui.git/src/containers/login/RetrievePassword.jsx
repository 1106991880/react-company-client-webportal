import React, { Component } from 'react'; // 引入了React
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { initialState, goLogin } from '../../redux/action/login/loginAction';
import styles from './style/login.less';
import logo from './style/logo.png';
import { Spin, Form, Input, Button, message,Icon,Checkbox,Tabs, Alert } from 'antd';
import LoginService from '../../services/loginService';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
/* 以类的方式创建一个组件 */
class rPassword extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		passwordDirty: false,
    		loginBtnText: '登录',
        visible:false,//error提示
        imageValue:"",//图片验证码值
        imageId:"",//32UUID
        imageBase64:"",
        successfully:true    //找回密码是否成功
    	};
    }
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        this.getImage()

    }
    getImage = () => {
      //获取图片验证码
      var uuid = global.$publicMethod.GetUUID()
      console.log("uuid",uuid);
      var image = LoginService.imagecode({imageId:uuid});
      this.setState({imageBase64:image,imageId:uuid})
    }
  	handleSubmit = (e) => { // 登录
      console.log("找回密码");
    	e.preventDefault();
      const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
          console.log("密码",values.password);
                let username = values.username, // 用户名
                    email = values.email, // 密码
                    loginParams = { // 登录参数
                        loginName: username,
                        emailCode: email,
                        imageValue:values.imageValue,
                        imageId:this.state.imageId,
                    };
                    console.log("loginParams",loginParams);
		        var returnValue = LoginService.RetrievePassword(loginParams);
            if(returnValue){
              if (returnValue.result) {
                  this.setState({successfully:false})
              }

            }
		    }
	    });
	}
  callback(key) {
    console.log(key);
  }
  renderDom=(value)=>{
    if(value){
      const { form } = this.props;
      const getFieldDecorator = form.getFieldDecorator;
      return (
        <div className="rPass">
          <center style={{fontSize:"20px",fontWeight:"600",color:"#1890FF"}}>找回密码</center>
          <Form style={{ marginTop:5}} onSubmit={this.handleSubmit}>
            <FormItem>
                {getFieldDecorator('username',{
                  rules: [{ required: true, message: '请填写登录名称!', whitespace: true }],
                })(
                    <Input className="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="登录名称" maxLength="30" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('email',{
                  rules: [{ required: true, message: '请填写邮箱!', whitespace: false },{type:"email",message:"邮箱格式不正确"}],
                })(
                    <Input  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="邮箱"  />
                )}
            </FormItem>
            <FormItem style={{marginBottom:"5px"}}>
              {getFieldDecorator('imageValue',{
                rules: [{ required: true, message: '请填写验证码!', whitespace: true }],
              })(
                <Input className="validateKey" maxLength="4" placeholder="验证码" prefix={<Icon type="exception" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />}  addonAfter={<img style={{  }}  onClick={()=>{ this.getImage() }}  src={"data:image/png;base64,"+this.state.imageBase64}/>} />
              )}
            </FormItem>
            <div style={{overflow:"hidden"}}>
              <a style={{ float:"right" }} onClick={()=>{ this.getImage() }}>看不清楚？换一张图</a>
            </div>
            <center>
              <Button onClick={this.props.out}>取消</Button>
              <Button type="primary" htmlType="submit" style={{marginLeft:"10px",marginTop:"15px"}}>提交</Button>
            </center>
          </Form>

        </div>)
    }else {
      return (
        <div>
          <center><Icon type="check-circle" style={{color:"#1CA976",fontSize:'60px'}}/></center>
          <center style={{fontSize:"16px",fontWeight:600,margin:"20px 0"}}>申请成功,新密码已发送到您的邮箱！</center>
          <center><Button type="primary" onClick={this.props.out}>确定</Button></center>
        </div>
      )
    }


  }
	render() {
    const { form } = this.props;
    const getFieldDecorator = form.getFieldDecorator;
		return  this.renderDom(this.state.successfully)




	}
}

const RetrievePassword = Form.create()(rPassword);


export default RetrievePassword;
