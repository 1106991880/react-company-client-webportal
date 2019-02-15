import React from 'react';
import { Modal, Form, Input, Radio, InputNumber} from 'antd';

const FormItem = Form.Item;

class AppForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="horizontal">
                    {/*列表主键id*/}
                    {getFieldDecorator('id', {})(
                        <Input type="hidden"/>
                    )}
                    <FormItem label="姓名" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="性别" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: '请选择性别！' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="年龄" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: '请输入年龄！' }],
                        })(
                            <InputNumber min={0} max={199} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="邮箱" {...FormItemLayout} hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式不正确！',
                        }, {
                            required: true, message: '请输入邮箱！',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                    {/*createdate*/}
                    {getFieldDecorator('createdate', {})(
                        <Input type="hidden"/>
                    )}
                    {/*status*/}
                    {getFieldDecorator('status', {})(
                        <Input type="hidden"/>
                    )}

                </Form>
            </Modal>
        );
    }

}
//Cannot read property 'getFieldDecorator' of undefined错误,使用form表单
const CreateForm = Form.create()(AppForm);
export default CreateForm;