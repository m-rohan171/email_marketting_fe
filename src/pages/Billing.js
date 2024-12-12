// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import { Row, Col, Card, Button, Form, Input, Upload, message } from "antd";
// import { useEffect, useState } from "react";
// import { UploadOutlined } from "@ant-design/icons";

// function Billing({ selectedUsers, closeModal }) {
//   const [form] = Form.useForm();
//   const [emailType, setEmailType] = useState(selectedUsers.length > 1 ? "bulk" : "single");
//   const [imageFile, setImageFile] = useState(null);
//   const [body, setBody] = useState(""); // State for ReactQuill

//   useEffect(() => {
//     if (selectedUsers.length === 1) {
//       form.setFieldsValue({
//         recipient: selectedUsers[0].userEmail ? selectedUsers[0].userEmail : selectedUsers[0].email,
//       });
//     } else if (selectedUsers.length > 1) {
//       form.setFieldsValue({
//         recipients: selectedUsers.map((user) => user.userEmail ? user.userEmail : user.email).join(", "),
//       });
//     }
//   }, [selectedUsers, form]);

//   const handleSubmit = async (values) => {
//     const { recipient, recipients, subject } = values;
//     const recipientList = emailType === "bulk"
//       ? recipients.split(",").map((email) => email.trim())
//       : [recipient];

//     const payload = {
//       recipients: recipientList,
//       subject,
//       body, // Quill content
//       image: imageFile,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/user/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         message.success("Emails sent successfully");
//         form.resetFields();
//         setBody(""); // Clear Quill content
//         setImageFile(null);
//         closeModal();
//       } else {
//         const result = await response.json();
//         message.error(`Failed to send emails: ${result.message}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       message.error("An error occurred while sending emails");
//     }
//   };
//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "align",
//     "strike",
//     "script",
//     "blockquote",
//     "background",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//     "code-block",
//   ];
//   return (
//     <div style={{ padding: "20px" }}>
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//         {selectedUsers.length === 1 ? (
//           <Form.Item
//             label="Recipient"
//             name="recipient"
//             rules={[
//               { required: true, message: "Please enter the recipient's email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input placeholder="Enter recipient email" />
//           </Form.Item>
//         ) : (
//           <Form.Item
//             label="Recipients"
//             name="recipients"
//             rules={[{ required: true, message: "Please enter at least one email" }]}
//           >
//             <Input.TextArea placeholder="Emails separated by commas" rows={2} />
//           </Form.Item>
//         )}

//         <Form.Item
//           label="Subject"
//           name="subject"
//           rules={[{ required: true, message: "Please enter the subject" }]}
//         >
//           <Input placeholder="Email subject" />
//         </Form.Item>

//         <Form.Item label="Body" name="body">
//           <ReactQuill theme='snow' value={body} onChange={setBody} placeholder="Email body" formats={formats}/>
//         </Form.Item>

//         <Form.Item label="Upload Image">
//           <Upload
//             beforeUpload={() => false}
//             onChange={(info) => {
//               if (info.file.status === "done" || info.file.status === "uploading") {
//                 const reader = new FileReader();
//                 reader.onload = () => setImageFile(reader.result);
//                 reader.readAsDataURL(info.file.originFileObj);
//               }
//             }}
//             accept="image/*"
//             maxCount={1}
//           >
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//           </Upload>
//           {imageFile && <p style={{ color: "green" }}>Image uploaded successfully</p>}
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
//             Send Email
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default Billing;


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Row, Col, Card, Button, Form, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse"; // Import Papaparse for CSV parsing

function Billing({ selectedUsers, closeModal }) {
  const [form] = Form.useForm();
  const [emailType, setEmailType] = useState(selectedUsers.length > 1 ? "bulk" : "single");
  const [imageFile, setImageFile] = useState(null);
  const [body, setBody] = useState(""); // State for ReactQuill
  const [csvEmails, setCsvEmails] = useState([]); // State for CSV emails

  useEffect(() => {
    if (selectedUsers.length === 1) {
      form.setFieldsValue({
        recipient: selectedUsers[0].userEmail ? selectedUsers[0].userEmail : selectedUsers[0].email,
      });
    } else if (selectedUsers.length > 1) {
      form.setFieldsValue({
        recipients: selectedUsers.map((user) => user.userEmail ? user.userEmail : user.email).join(", "),
      });
    }
  }, [selectedUsers, form]);

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    const { recipient, recipients, subject,csv } = values;
    const recipientList = emailType === "bulk"
      ? [...(recipients ? recipients.split(",").map((email) => email.trim()) : []), ...csvEmails].filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      : [recipient];

    if (recipientList.length === 0) {
      message.error("Please provide valid email addresses.");
      return;
    }

    const payload = {
      recipients: recipientList,
      subject,
      body, // Quill content
      image: imageFile,
      csv: csv,
    };

    try {
      const response = await fetch("http://localhost:5000/api/user/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Emails sent successfully");
        form.resetFields();
        setBody(""); // Clear Quill content
        setImageFile(null);
        setCsvEmails([]); // Clear CSV emails
        closeModal();
      } else {
        const result = await response.json();
        message.error(`Failed to send emails: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while sending emails");
    }
  };

  const handleCsvUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      Papa.parse(reader.result, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const emails = results.data.flat().filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
          setCsvEmails(emails);
          message.success("CSV uploaded successfully");
        },
        error: (error) => {
          message.error("Failed to parse CSV file");
          console.error(error);
        },
      });
    };
    reader.readAsText(file);
    return false; // Prevent default upload behavior
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {selectedUsers.length === 1 ? (
          <Form.Item
            label="Recipient"
            name="recipient"
            rules={[
              { required: true, message: "Please enter the recipient's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter recipient email" />
          </Form.Item>
        ) : (
          <Form.Item
            label={`Recipients (${selectedUsers.length})`}
            name="recipients"
            rules={[{ required: true, message: "Please enter at least one email" }]}
          >
            <Input.TextArea placeholder="Emails separated by commas" rows={2} />
          </Form.Item>
        )}

        <Form.Item name="csv" label="Upload CSV for Recipients">
          <Upload
            beforeUpload={handleCsvUpload}
            accept=".csv"
            maxCount={1}
            name='csv'
          >
            <Button icon={<UploadOutlined />}>Upload CSV</Button>
          </Upload>
          {csvEmails.length > 0 && <p style={{ color: "green" }}>{csvEmails.length} emails added from CSV</p>}
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please enter the subject" }]}
        >
          <Input placeholder="Email subject" />
        </Form.Item>

        <Form.Item label="Body" name="body">
          <ReactQuill 
            theme='snow' 
            value={body} 
            onChange={setBody} 
            placeholder="Email body" 
            formats={formats}
          />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
              }
              return isImage;
            }}
            onChange={(info) => {
              if (info.file.status === "done" || info.file.status === "uploading") {
                const reader = new FileReader();
                reader.onload = () => setImageFile(reader.result);
                reader.readAsDataURL(info.file.originFileObj);
              }
            }}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageFile && <p style={{ color: "green" }}>Image uploaded successfully</p>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Billing;
