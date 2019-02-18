import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default {
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }
}