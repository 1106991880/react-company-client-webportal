import React from 'react'
import BreadcrumbCustom from '../../component/breadcrumb/breadcrumb'
import {Row, Input, Col, Icon, Button, message,Card} from 'antd';

import './style/app.less'
import AppTable from '../../component/Table/AppTable/AppTable'
//import data from './request/data.json'//模拟的json数据
import AppService from '../../services/app/AppService'
import AppForm from "../../component/Form/AppForm/AppForm";
import BaseForm from "../../component/Form/BaseForm/BaseForm";

class AppPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            queryInfo: {//设置最初一页显示多少条数据
                current:1,
                pageSize: 5
            },
            tableColumns: [],
            dataSource: {
                count: 0,
                data: []
            },
            loading: true,//是否为加载中状态
            visible: false,//新增窗口隐藏
            isUpdate: false, //是否为修改
            params:{}, //查询参数
        }
    }

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'name',
            placeholder: '请输入名称',
            width: 130
        },
        {
            type: 'SELECT',
            label: '性别',
            field: 'sex',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [
                {id: '0', name: '全部'},
                {id: '男', name: '男'},
                {id: '女', name: '女'}
            ]
        },
        {
            type: 'DATE',
            label: '创建日期',
            field: 'date',
            placeholder: '请输入日期'
        }
    ]

    componentDidMount() {
        //请求后台实际数据,默认查询第一页,每页显示5条数据
        this.handleSearch({},this.state.queryInfo.current, this.state.queryInfo.pageSize);
    }

    //查询数据
    /**queryUser = (current, pageSize) => {
        var params = {
            queryCode: 'CESHI_QUERY_USER',
            current: current,//当前页码
            pageSize: pageSize,//当前页查询的条数
        }

        console.log("参数params:" + JSON.stringify(params));

        var returnResult = AppService.queryUserInfo(params);
        this.setState({
            queryInfo: {//设置最初一页显示多少条数据
                current:current,
                pageSize: pageSize
            },
            dataSource: {//数据存放
                count: returnResult.total,//一共几条数据
                data: returnResult.data,
            },
            loading: false//是否为加载中状态
        })
    }*/

    //单个删除
    deleteSource = (text, record) => {
        var res = AppService.deleteUser(text);
        if (res.result) {
            console.log("删除用户成功");
            message.success('删除成功', 1);
            //刷新页面
            this.handleSearch(this.state.params,this.state.queryInfo.current, this.state.queryInfo.pageSize);
        } else {
            message.error('删除失败', 1);
        }
    };

    //点击修改每页显示数据的条数
    toSelectchange(current, pageSize) {
        console.log("点击了修改每页显示的条数");
        console.log("current->改变显示条数时当前数据所在页----" + current);
        console.log("pageSize->改变后的一页显示条数----" + pageSize);
        this.handleSearch(this.state.params,current,pageSize);
    }

    //点击页码跳转
    gotoThispage(page, pageSize) {
        console.log("点击了选择页码跳转");
        console.log("page->改变后的页码----" + page);
        console.log("pageSize->每页显示的条数----" + pageSize);
        this.handleSearch(this.state.params,page,pageSize);
    }

    //新建信息弹窗
    createItem = () => {
        console.log("显示新建窗口");
        this.setState({
            visible: true,
            isUpdate: false,
        });
        const form = this.form;
        form.resetFields();
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };
    //取消
    handleCancel = () => {
        this.setState({visible: false});
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //打印表单的值
            console.log('Received values of form: ', values);
            var params = values;
            var res = AppService.addUser(params);
            if (res.result) {
                message.success('添加成功', 1);
                this.setState({
                    visible: false
                });
                //刷新页面
                this.handleSearch(this.state.params,this.state.queryInfo.current, this.state.queryInfo.pageSize);
            } else {
                message.error('添加失败', 1)
            }
        })
    }

    //点击修改
    editSource = (text, record) => {
        const form = this.form;
        form.setFieldsValue({
            id:record.id,//隐藏域,用于表单提交
            name: record.name,
            sex: record.sex,
            age: record.age,
            email: record.email,
            createdate:record.createdate,//隐藏域,用于表单提交
            status:record.status,//隐藏域,用于表单提交
        });
        this.setState({
            visible: true,
            isUpdate: true
        })
    }
    //点击确定修改按钮
    handleUpdate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('update Received values of form: ', values);
            console.log("new values:"+JSON.stringify(values));
            var params = values;
            var res = AppService.updateUser(params);
            if(res.result){
                form.resetFields();
                message.success('修改成功', 1);
                this.setState({
                    visible:false,
                });
                //刷新页面
                this.handleSearch(this.state.params,this.state.queryInfo.current, this.state.queryInfo.pageSize);
            }else {
                message.error('修改失败', 1)
            }
        })
    }

    //form表单查询方式
    handleSearch = (params,page,pageSize) => {
        params.queryCode='CESHI_QUERY_USER';
        var paramsForm = params;
        params.current=page;
        params.pageSize=pageSize;
        console.log("params22"+JSON.stringify(params));
        var returnResult = AppService.queryUserInfo(params);
        this.setState({
            queryInfo: {//设置最初一页显示多少条数据
                current:page,
                pageSize: pageSize
            },
            dataSource: {//数据存放
                count: returnResult.total,//一共几条数据
                data: returnResult.data,
            },
            loading: false,//是否为加载中状态
            params:paramsForm,//查询参数
        })
    }

    render() {
        const {queryInfo, dataSource, loading, visible, isUpdate} = this.state;

        return (
            <div>
                <BreadcrumbCustom paths={['首页']}/>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleSearch.bind(this)} queryInfo={this.state.queryInfo}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.createItem}><Icon type="plus"/>新增用户</Button>
                </Card>
                <div className='content-wrap'>
                    {/*<Row gutter={16}>
                        <Col className="gutter-row" sm={4}>
                            <Input addonBefore="姓名" defaultValue={this.state.name}
                                   onChange={this.handleChangeName.bind(this)}/>
                        </Col>
                        <Col className="gutter-row" sm={4}>
                            <Input addonBefore="年龄" defaultValue={this.state.age}
                                   onChange={this.handleChangeAge.bind(this)}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className='addData'>
                            <Button type="primary" onClick={this.createItem}><Icon type="plus"/>新增用户</Button>
                        </div>
                        <div className='searchBtnAndReset'>
                            <Button type="primary" onClick={this.btnSearch_Click}
                                    style={{marginRight: '10px'}}>查询</Button>
                            <Button type="primary" onClick={this.btnClear_Click}
                                    style={{background: '#f8f8f8', color: '#108ee9'}}>重置</Button>
                        </div>
                    </Row>*/}

                    <AppTable queryInfo={queryInfo} //每页显示数据的条数
                              dataSource={dataSource} //数据信息(包括查询结果的总条数和查询的数据)
                              loading={loading} //是否为加载中状态
                              editSource={this.editSource.bind(this)}
                              deleteSource={this.deleteSource.bind(this)}
                              toSelectchange={this.toSelectchange.bind(this)} //选择某一页
                              gotoThispage={this.gotoThispage.bind(this)} //跳转页面
                    />
                    {isUpdate ? <AppForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel}
                                         onCreate={this.handleUpdate} title="修改用户信息" okText="更新"/> :
                        <AppForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel}
                                 onCreate={this.handleCreate} title="新增用户" okText="保存"/>}

                </div>
            </div>
        );
    }

}

export default AppPage