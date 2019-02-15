import React from 'react'
import {Table, Popconfirm} from "antd";

class AppTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {dataSource, loading, queryInfo, editSource, deleteSource, toSelectchange, gotoThispage} = this.props;
        const tableColumns = [{
            title: '姓名',        //菜单内容
            dataIndex: 'name',   //在数据中对应的属性
            //key: 'name'   //key
        }, {
            title: '性别',
            dataIndex: 'sex',
            //key: 'sex'
        }, {
            title: '年龄',
            dataIndex: 'age',
            //key: 'age'
        }, {
            title: '邮箱',
            dataIndex: 'email',
            //key: 'email',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (  //塞入内容
                <span>
        <span onClick={() => editSource(text, record)}>编辑</span>
                    &nbsp;&nbsp;&nbsp;
                    {/*<a className="delete-data" onClick={() => deleteSource(text, record)}>删除</a>*/}
                    <Popconfirm title="确定要删除吗?" onConfirm={() => deleteSource(text, record)}>删除</Popconfirm>
        </span>
            ),
        }];


        return (
            <Table
                columns={tableColumns} //表头
                rowKey={record => record.id} //数据主键
                dataSource={dataSource.data} //数据
                pagination={{  //分页
                    total: dataSource.count, //数据总数量
                    pageSize: queryInfo.pageSize,  //显示几条一页,每页条数
                    defaultPageSize: queryInfo.pageSize, //默认显示几条一页
                    showSizeChanger: true,  //是否显示可以设置几条一页的选项
                    onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                        toSelectchange(current, pageSize); //这边已经设置了that = this
                    },
                    onChange(page) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
                        gotoThispage(page, queryInfo.pageSize);
                    },
                    showTotal: function () {  //设置显示一共几条数据
                        return '共' + dataSource.count + '条数据';
                    },
                    showQuickJumper: true,//是否显示跳转到多少页的样式
                    pageSizeOptions: ['5', '10', '20', '30'],//指定每页可以显示多少条
                    //size:"small",//小尺寸分页
                }}
                loading={loading}  //设置loading属性,显示为加载中状态
                className="appTable" //样式
            />
        );
    }
}

export default AppTable