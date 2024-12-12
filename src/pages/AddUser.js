// import React, { useState } from 'react';
// import { Steps, Button, Form, Input, Select, message } from 'antd';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import './stepper.css';

// const { Step } = Steps;
// const { Option } = Select;

// export const StepperForm = ({setIsModalVisible}) => {
//   const [current, setCurrent] = useState(0);
//   const [formData, setFormData] = useState({
//     businessDetails: {},
//     userDetails: {},
//     originationDetails: {}
//   });
//   const [customFields, setCustomFields] = useState([]);
//   const navigate = useHistory();


//   const handleNext = () => setCurrent(current + 1);
//   const handlePrevious = () => setCurrent(current - 1);

//   // Handlers for form submission
//   const onFinishBusinessDetails = (values) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       businessDetails: values
//     }));
//     message.success('Business details added');
//     handleNext();
//   };

//   const onFinishUserDetails = (values) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       userDetails: values
//     }));
//     message.success('User details added');
//     handleNext();
//   };

//   const onFinishOriginationDetails = async (values) => {
//     const completeData = {
//       ...formData,
//       originationDetails: values
//     };

//     try {
//       await axios.post('http://localhost:5000/api/user/save-stepper-data', completeData);
//       message.success('Data successfully submitted');
//       setIsModalVisible(false)
//       navigate.push('/tables');
//     } catch (error) {
//       message.error('Failed to submit data');
//       console.error(error);
//     }
//   };

//   // Add a custom customer field dynamically
//   const addCustomField = () => {
//     setCustomFields([...customFields, { name: `customField_${customFields.length + 1}`, label: `Custom Field ${customFields.length + 1}` }]);
//   };

//   return (
//     <div className="stepper-container">
//       <Steps current={current} className="step-navigation">
//         <Step title="Business Details" />
//         <Step title="User Details" />
//         <Step title="Origination" />
//       </Steps>

//       <div className="step-form">
//         {current === 0 && (
//           <Form onFinish={onFinishBusinessDetails} layout="vertical">
//             {/* Business Details Form Fields */}
//             <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: 'Please input your business name!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
//               <Input />
//             </Form.Item>
//             <Button type="primary" htmlType="submit" className="next-button">Next</Button>
//           </Form>
//         )}

//         {current === 1 && (
//           <Form onFinish={onFinishUserDetails} layout="vertical">
//             {/* User Details Form Fields */}
//             <Form.Item name="userFirstName" label="User's First Name" rules={[{ required: true, message: 'Please input the user\'s first name!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="userLastName" label="User's Last Name" rules={[{ required: true, message: 'Please input the user\'s last name!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="userEmail" label="User's Email" rules={[{ required: true, message: 'Please input the user\'s email!' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="userPhone" label="User's Phone Number" rules={[{ required: true, message: 'Please input the user\'s phone number!' }]}>
//               <Input />
//             </Form.Item>
//             {customFields.map((field, index) => (
//               <Form.Item key={index} name={field.name} label={field.label}>
//                 <Input />
//               </Form.Item>
//             ))}
//             <Button onClick={addCustomField} style={{ marginBottom: '16px' }}>Add Customer Field</Button>
//             <div className="button-group">
//               <Button className="previous-button" onClick={handlePrevious}>Previous</Button>
//               <Button type="primary" htmlType="submit" className="next-button">Next</Button>
//             </div>
//           </Form>
//         )}

//         {current === 2 && (
//           <Form onFinish={onFinishOriginationDetails} layout="vertical">
//             {/* Origination Details Form Fields */}
//             <Form.Item name="origination" label="Origination" rules={[{ required: true, message: 'Please select an origination method!' }]}>
//               <Select placeholder="Select origination method">
//                 <Option value="socialMedia">Social Media</Option>
//                 <Option value="website">Website</Option>
//                 <Option value="app">App</Option>
//                 <Option value="internet">Internet</Option>
//                 <Option value="bulkEmail">Bulk Email</Option>
//                 <Option value="singleEmail">Single Email</Option>
//               </Select>
//             </Form.Item>
//             <div className="button-group">
//               <Button className="previous-button" onClick={handlePrevious}>Previous</Button>
//               <Button type="primary" htmlType="submit" className="submit-button">Submit</Button>
//             </div>
//           </Form>
//         )}
//       </div>
//     </div>
//   );
// };


// UserForm.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';

const UserForm = ({setIsModalVisible}) => {
const { Option } = Select;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/user/user-data', values);
      message.success('User data submitted successfully');
      form.resetFields();
      setIsModalVisible(false)
    } catch (error) {
      message.error('Failed to submit user data');
      console.error(error);
    }
  };

  return (
    <div className="user-form" style={{ padding: '20px' }}>
      <h2>User Details</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="userFirstName" label="User's First Name" rules={[{ required: true, message: 'Please input the user\'s first name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userLastName" label="User's Last Name" rules={[{ required: true, message: 'Please input the user\'s last name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userEmail" label="User's Email" rules={[{ required: true, message: 'Please input the user\'s email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userPhone" label="User's Phone Number" rules={[{ required: true, message: 'Please input the user\'s phone number!' }]}>
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

export default UserForm;
