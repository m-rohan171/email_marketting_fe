// BusinessForm.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';

const BusinessForm = ({setIsModalVisible}) => {
const { Option } = Select;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/user/save-buissnuess-data', values);
      message.success('Business data submitted successfully');
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to submit business data');
      console.error(error);
    }
  };

  return (
    <div className="business-form" style={{padding:"20px"}}>
      <h2>Business Details</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: 'Please input your business name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Business Email" rules={[{ required: true, message: 'Please input your business email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your business email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your business email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Business Phone Number" rules={[{ required: true, message: 'Please input your business phone number!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="origination" label="Origination" rules={[{ required: true, message: 'Please select an origination method!' }]}>
               <Select placeholder="Select origination method">
                 <Option value="socialMedia">Social Media</Option>
                 <Option value="website">Website</Option>
                 <Option value="app">App</Option>
                 <Option value="internet">Internet</Option>
               </Select>
             </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default BusinessForm;
