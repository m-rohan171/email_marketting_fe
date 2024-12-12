/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  message,
} from "antd";

import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const { Title } = Typography;
const { Content } = Layout;
const SignUp=()=> {
  const navigate = useHistory();

  const onFinish = async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', values);
        console.log("Success:", response.data);
        message.success('Registration successful!');
        navigate.push("/sign-in")
        // Optionally redirect to another page or clear the form here
      } catch (error) {
        console.error("Error:", error);
        message.error('Registration failed. Please try again.');
      }
    };

       const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
   };
    return (
      <>
        <div style={{padding:"0"}} className="layout-default ant-layout layout-sign-up">

         
          <Content className="p-0 main_container">
          <div className="signup_page">
            <div className="header_text">
              <div className="">
                <Title>Sign Up</Title>
              </div>
            </div>
            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              bordered="false"
            >
              <Form
                name="signin"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="signup-form"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input className="signup-input" size="middle" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="signup-input" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password className="signup-input" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Dont have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign IN
                </Link>
              </p>
            </Card>
          </div>

        </Content>
        </div>
      </>
    );
  }

export default SignUp;