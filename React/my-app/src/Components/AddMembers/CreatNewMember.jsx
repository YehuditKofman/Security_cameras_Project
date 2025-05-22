
// import React from 'react';
// import { Flex, Select } from 'antd';
// import ALL_PERMISSIONS from '../AddMembers/AllPermissions'; // התאימי את הנתיב לפי הצורך
// import { useState } from 'react';
// import {
//     Button,
//     Cascader,
//     DatePicker,
//     Form,
//     Input,
//     InputNumber,
//     Mentions,
//     Segmented,
//     TreeSelect,
// } from 'antd';
// import AxiosCreteMemberByAdministrator from './AxiosCreateMemberByAdministrator';
// import { useSelector } from 'react-redux';

// const CreatNewMember = () => {

//     const [flag, setFlag] = useState(false);
//     const [formData, setFormData] = useState({
//         _id: "",
//         Name: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "Member",
//         arrSecurityCameras: [],
//         arrAnalysisSchema: [],
//         AccessPermissions: []
//     });
//     const admin = useSelector((state) => state.AdministratorSlice); // <-- שליפת הנתונים

//     const ID = admin._id; // תעודת זהות של המנהל
//     const { RangePicker } = DatePicker;
//     const { Option } = Select;
//     const tailFormItemLayout = {
//         wrapperCol: {
//             xs: {
//                 span: 24,
//                 offset: 0,
//             },
//             sm: {
//                 span: 16,
//                 offset: 8,
//             },
//         },
//     };
//     const formItemLayout = {
//         labelCol: {
//             xs: { span: 24 },
//             sm: { span: 6 },
//         },
//         wrapperCol: {
//             xs: { span: 24 },
//             sm: { span: 14 },
//         },
//     };
//     const prefixSelector = (
//         <Form.Item name="prefix" noStyle>
//             <Select style={{ width: 70 }}>
//                 <Option value="972">+972</Option>
//                 <Option value="87">+87</Option>
//             </Select>
//         </Form.Item>
//     );
//     const [form] = Form.useForm();
//     const variant = Form.useWatch('variant', form);
//     return (
//         <Form
//             {...formItemLayout}
//             form={form}
//             variant={variant || 'underlined'}
//             style={{ maxWidth: 600 }}
//             initialValues={{
//                 _id: ID,
//                 Name: '',
//                 password: '',
//                 confirm: '',
//                 email: '',
//                 phone: '',
//                 prefix: '972',
//                 arrPermition: [],
//             }}
//             onValuesChange={(changedValues, allValues) => {
//                 setFormData(allValues);
//                 console.log(allValues);
//             }}
//         >

//             <Form.Item label="Full Name" name="Name" rules={[{ required: true, message: 'Please input firstName and lastName!' }]}>
//                 <Input />
//             </Form.Item>

//             <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input your password!',
//                     },
//                 ]}
//                 hasFeedback
//             >
//                 <Input.Password />
//             </Form.Item>

//             <Form.Item
//                 name="confirm"
//                 label="Confirm Password"
//                 dependencies={['password']}
//                 hasFeedback
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input password!',
//                     },
//                     ({ getFieldValue }) => ({
//                         validator(_, value) {
//                             if (!value || getFieldValue('password') === value) {
//                                 return Promise.resolve();
//                             }
//                             return Promise.reject(new Error('The new password that you entered do not match!'));
//                         },
//                     }),
//                 ]}
//             >
//                 <Input.Password />
//             </Form.Item>
//             <Form.Item
//                 name="email"
//                 label="E-mail"
//                 rules={[
//                     {
//                         type: 'email',
//                         message: 'The input is not valid E-mail!',
//                     },
//                     {
//                         required: true,
//                         message: 'Please input your E-mail!',
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>

//             <Form.Item
//                 name="phone"
//                 label="Phone Number"
//                 rules={[{ required: true, message: 'Please input your phone number!' }]}
//             >
//                 <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
//             </Form.Item>

//             <Form.Item
//                 name="AccessPermissions"
//                 label="Select Access"
//             >
//                 <Select
//                     mode="multiple"
//                     placeholder="Select Access"
//                     variant="underlined"
//                     style={{ flex: 1 }}
//                     options={ALL_PERMISSIONS.map(permission => ({
//                         value: permission,
//                         label: permission,
//                     }))}
//                 />

//             </Form.Item>



//             <Form.Item {...tailFormItemLayout}>
//                 <Button type="primary" htmlType="submit" onClick={() => { setFlag(true); }}>
//                     Create New Member
//                 </Button>

//             </Form.Item>
//             {flag && <AxiosCreteMemberByAdministrator ID={ID} memberData={formData} />}

//         </Form>

//     );
// };



// export default CreatNewMember;  
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import ALL_PERMISSIONS from '../AddMembers/AllPermissions';
import AxiosCreteMemberByAdministrator from './AxiosCreateMemberByAdministrator';
import { useSelector } from 'react-redux';

const CreatNewMember = ({ visible, onClose }) => {
    const [flag, setFlag] = useState(false);
    const [formData, setFormData] = useState({
        _id: "",
        Name: "",
        email: "",
        phone: "",
        password: "",
        role: "Member",
        arrSecurityCameras: [],
        arrAnalysisSchema: [],
        AccessPermissions: []
    });

    const admin = useSelector((state) => state.AdministratorSlice);
    const ID = admin._id;
    const [form] = Form.useForm();

    const handleOk = () => {
        setFlag(true);
        onClose();
    };

    return (
        <>
            <Modal
                title="Member Details"
                open={visible}
                onOk={handleOk}
                onCancel={onClose}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        _id: ID,
                        Name: '',
                        password: '',
                        confirm: '',
                        email: '',
                        phone: '',
                        prefix: '972',
                        AccessPermissions: [],
                    }}
                    onValuesChange={(changedValues, allValues) => {
                        setFormData(allValues);
                    }}
                >
                    <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="AccessPermissions" label="Permissions">
                        <Select
                            mode="multiple"
                            placeholder="Select Access"
                            options={ALL_PERMISSIONS.map(permission => ({
                                value: permission,
                                label: permission,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {flag && <AxiosCreteMemberByAdministrator ID={ID} memberData={formData} />}
        </>
    );
};

export default CreatNewMember;
