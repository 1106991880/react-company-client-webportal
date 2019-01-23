import React from 'react'
import BreadcrumbCustom from '../../component/breadcrumb/breadcrumb'
import {Row, Input, Col, Icon, DatePicker, Button} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;
const {RangePicker} = DatePicker;

import './style/app.less'
import AppTable from '../../component/Table/AppTable/AppTable'
//import data from './request/data.json'//模拟的json数据
import AppService from '../../services/app/AppService'

class AppPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            queryInfo: {//设置最初一页显示多少条数据
                pageSize: 5
            },
            tableColumns: [],
            dataSource: {
                count: 0,
                data: []
            },
            loading: true,//是否为加载中状态
            //查询条件
            name: '',
            age: '',
        }
    }

    componentDidMount() {
        //请求后台实际数据,默认查询第一页,每页显示5条数据
        this.queryUser(1,5);
    }

    //查询数据
    queryUser = (current,pageSize) => {
        var params = {
            queryCode:'CESHI_QUERY_USER',
            current:current,//当前页码
            pageSize:pageSize,//当前页查询的条数
            name:this.state.name,//用户名
            age:this.state.age//用户年龄
        }

        console.log("参数params:"+JSON.stringify(params));

        var returnResult = AppService.queryUserInfo(params);
        console.log("查询结果："+JSON.stringify(returnResult));
        this.setState({
            queryInfo: {//设置最初一页显示多少条数据
                pageSize: pageSize
            },
            dataSource: {//数据存放
                count: returnResult.total,//一共几条数据
                data: returnResult.data,
            },
            loading: false//是否为加载中状态
        })
    }

    //修改
    editSource(text, record) {
        console.log("点击了编辑按钮")
        console.log(JSON.stringify(text) + "---------------------editSource");
        console.log(JSON.stringify(record.key) + "---------------------editSource");
    }

    //删除
    deleteSource(text, record) {
        console.log("点击了删除按钮");
        console.log(JSON.stringify(text) + "---------------------deleteSource");
        console.log(JSON.stringify(record.key) + "---------------------deleteSource");
    }

    //点击修改每页显示数据的条数
    toSelectchange(current, pageSize) {
        console.log("点击了修改每页显示的条数");
        console.log("current->改变显示条数时当前数据所在页----" + current);
        console.log("pageSize->改变后的一页显示条数----" + pageSize);
        //设置新的状态每页显示条数
        this.queryUser(current,pageSize);
    }

    //点击页码跳转
    gotoThispage(page, pageSize) {
        console.log("点击了选择页码跳转");
        console.log("page->改变后的页码----" + page);
        console.log("pageSize->每页显示的条数----" + pageSize);
        this.queryUser(page,pageSize);
    }

    //重置按钮
    btnClear_Click = () => {
        this.setState({
            name:'',
            age:''
        })
        console.log("555555---------------");
    }

    //姓名输入框的值
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    //年龄
    handleChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    //按条件查询
    btnSearch_Click = () => {
        this.queryUser(1,5);
    }


    render() {
        const {queryInfo, dataSource, loading} = this.state;

        return (
            <div>
                <BreadcrumbCustom paths={['首页']}/>
                <div className='appBody'>
                    <Row gutter={16}>
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
                            <Button type="primary"><Icon type="plus"/>新增用户</Button>
                        </div>
                        <div className='searchBtnAndReset'>
                            <Button type="primary" onClick={this.btnSearch_Click}
                                    style={{marginRight: '10px'}}>查询</Button>
                            <Button type="primary" onClick={this.btnClear_Click}
                                    style={{background: '#f8f8f8', color: '#108ee9'}}>重置</Button>
                        </div>
                    </Row>



                    <AppTable queryInfo={queryInfo} //每页显示数据的条数
                              dataSource={dataSource} //数据信息(包括查询结果的总条数和查询的数据)
                              loading={loading} //是否为加载中状态
                              editSource={this.editSource.bind(this)}
                              deleteSource={this.deleteSource.bind(this)}
                              toSelectchange={this.toSelectchange.bind(this)}
                              gotoThispage={this.gotoThispage.bind(this)}
                    />
                </div>
            </div>
        );
    }

}

export default AppPage