import {notification} from 'antd';

const Simulation = {};//，启动模拟数据

//login
Simulation.login = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    sessionStorage.setItem("userName", "fgl");
    sessionStorage.setItem("usersPassword", "123456");
    sessionStorage.setItem("usersLevel", "1");
    sessionStorage.setItem("areaName", "健康卡");
    sessionStorage.setItem("pkArea", "1");
    sessionStorage.setItem("QQ", "1183283664");
};

//QueryDynamicInformation
Simulation.QueryDynamicInformation = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        data: [{name: "付国霖", data: "20180101", operation: "新建词根", rootName: "XXXX"},
            {name: "付国霖", data: "20180101", operation: "新建词根", rootName: "XXXX"},
            {name: "付国霖", data: "20180101", operation: "新建词根", rootName: "XXXX"},
            {name: "付国霖", data: "20180101", operation: "新建词根", rootName: "XXXX"},
            {name: "付国霖", data: "20180101", operation: "新建词根", rootName: "XXXX"}]
    }
    return List;
};

Simulation.QueryPieChart = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        totalCount: 500,
        data: [{name: "分级诊疗", value: 200}, {name: "主索引", value: 200}, {name: "健康卡", value: 200}, {
            name: "分级诊疗2",
            value: 200
        }]
    }
    return List;
};

Simulation.QueryUploadRoot = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {passValue: 15, notPassValue: 25, auditing: 35}
    return List;
};

Simulation.QueryInformationList = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        data: [{
            "key": "分级诊疗0",
            "pkArea": "分级诊疗0",
            "areaCode": "领域代码",
            "areaName": "分级诊疗0",
            "areaState": "领域状态",
            "resume": "摘要",
            "description": "描述"
        },
            {
                "key": "分级诊疗1",
                "pkArea": "分级诊疗1",
                "areaCode": "领域代码",
                "areaName": "分级诊疗1",
                "areaState": "领域状态",
                "resume": "摘要",
                "description": "描述"
            },
            {
                "key": "分级诊疗2",
                "pkArea": "分级诊疗2",
                "areaCode": "领域代码",
                "areaName": "分级诊疗2",
                "areaState": "领域状态",
                "resume": "摘要",
                "description": "描述"
            },
            {
                "key": "分级诊疗3",
                "pkArea": "分级诊疗3",
                "areaCode": "领域代码",
                "areaName": "分级诊疗3",
                "areaState": "领域状态",
                "resume": "摘要",
                "description": "描述"
            },
            {
                "key": "分级诊疗4",
                "pkArea": "分级诊疗4",
                "areaCode": "领域代码",
                "areaName": "分级诊疗4",
                "areaState": "领域状态",
                "resume": "摘要",
                "description": "描述"
            },
            {
                "key": "分级诊疗5",
                "pkArea": "分级诊疗5",
                "areaCode": "领域代码",
                "areaName": "分级诊疗5",
                "areaState": "领域状态",
                "resume": "摘要",
                "description": "描述"
            }]
    }
    return List;
};

Simulation.QueryRootList = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        data: [
            {
                "key": "主键1",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            },
            {
                "key": "主键2",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            },
            {
                "key": "主键3",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            },
            {
                "key": "主键4",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            },
            {
                "key": "主键5",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            },
            {
                "key": "主键6",
                "pkRoot": "主键",
                "rootCode": "词根代码",
                "rootName": "词根名称",
                "rootState": "词根状态",
                "resume": "摘要",
                "description": "描述",
                "creator": "创建者",
                "version": "版本号(v1.0)"
            }
        ]
    }
    return List;
};

Simulation.QueryUserData = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        data: [
            {
                key: '1',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
            {
                key: '2',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
            {
                key: '3',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
            {
                key: '4',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
            {
                key: '5',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
            {
                key: '6',
                userName: 'XXXXX',
                name: 'XXXXX',
                QQ: 'XXXXX',
                roleName: 'XXXXX',
                createDate: "20180101",
                territory: "XXXXX"
            },
        ]
    }
    return List;
};

Simulation.QueryRootDetail = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        data: [{
            "pk_root": "主键",
            "root_code": "词根代码",
            "root_name": "词根名称",
            "root_state": "词根状态",
            "resume": "摘要",
            "description": "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
            "users_name": "创建者",
            "gmtCreate": "创建时间",
            "gmtModified": "更新时间",
            "area_name": "所属领域",
            "fk_area": "领域外键",
            "version": "版本号(v1.0)",
            "codeRule": {
                "pk_rule": "规则主键",
                "acronym": "缩写规则",
                "format": "书写格式",
                "is_null": "是否为空",
                "verify_rule": "验证规则",
                "type": "类型",
                "length": "长度",
                "gmt_create": "创建时间",
                "gmt_modified": "更新时间",
                "fk_root": "所属领域id",
                "fk_users": "创建者id"
            },
            "databaseRule": {

                "pk_rule": "规则主键",
                "acronym": "缩写规则",
                "format": "书写格式",
                "is_null": "是否为空",
                "type": "类型",
                "length": "长度",
                "verify_rule": "验证规则",
                "gmt_create": "创建时间",
                "gmt_modified": "更新时间",
                "fk_root": "所属领域id",
                "fk_users": "创建者id"
            },
            "groupByArea": [{

                "pk_root": "词根主键",
                "fk_area": "所属领域",
                "root_code": "词根编码",
                "root_name": "词根名称"
            }, {

                "pk_root": "词根主键",
                "fk_area": "所属领域",
                "root_code": "词根编码",
                "root_name": "词根名称"
            }]
        }]
    }
    return List;
};

Simulation.QueryBarGraph = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = [
        {"root_count": 200, "creator": "创建者"},
        {"root_count": 150, "creator": "创建者"},
        {"root_count": 180, "creator": "创建者"},
        {"root_count": 190, "creator": "创建者"},
        {"root_count": 80, "creator": "创建者"},
        {"root_count": 200, "creator": "创建者"},
        {"root_count": 150, "creator": "创建者"},
        {"root_count": 180, "creator": "创建者"},
        {"root_count": 190, "creator": "创建者"},
        {"root_count": 80, "creator": "创建者"},
    ]
    return List;
};

Simulation.QueryCurdStat = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = {
        total: 700,
        data: [
            {
                "count_root": 150,
                "operation": "insertRoot",
                "total": 600
            },
            {
                "count_root": 500,
                "operation": "updateRoot",
                "total": 600
            },
            {
                "count_root": 50,
                "operation": "delete",
                "total": 600
            }
        ]
    }
    return List;
};
Simulation.KeywordsAssociate = () => {
    console.log("测试账号登陆，启动模拟数据=================");
    notification['info']({
        message: '提示',
        description: '功能为模拟数据！',
        duration: 3
    });
    var List = [
        {"root_name": "词根名称1"}, {"root_name": "词根名称2"}, {"root_name": "词根名称3"}, {"root_name": "词根名称4"}, {"root_name": "词根名称5"},
    ]
    return List;
};

export {Simulation};
