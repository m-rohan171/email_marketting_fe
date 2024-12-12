import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import UserForm from "./AddUser";
import Billing from "./Billing";

const columns = [
  {
    title: "FirstName",
    dataIndex: "userFirstName",
    key: "userFirstName",
    width: "32%",
  },
  {
    title: "LastName",
    dataIndex: "userLastName",
    key: "userLastName",
  },
  {
    title: "Email",
    key: "userEmail",
    dataIndex: "userEmail",
  },
  {
    title: "Phone",
    key: "userPhone",
    dataIndex: "userPhone",
  },
];

function Tables() {
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [buisnuessDetails, setBuisnuessDetails] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const showAddUserModal = () => setIsAddUserModalVisible(true);
  const handleAddUserCancel = () => setIsAddUserModalVisible(false);

  const handleAddUser = (values) => {
    console.log("User added:", values);
    setIsAddUserModalVisible(false);
  };

  const showEmailModal = () => {
    // if (selectedUsers.length === 0) {
      // return alert("Please select at least one user.");
      message.warning("Please select at least one user.");
    // }else{

      setIsEmailModalVisible(true);
    // }
  };
  const handleEmailModalClose = () => setIsEmailModalVisible(false);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/user-details"
        );
        setBuisnuessDetails(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        throw error;
      }
    };

    loadOrganizations();
  }, [isAddUserModalVisible]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUsers(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: !record.userEmail, // Disable selection if email is not available
    }),
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Users Table"
              extra={
                <div>
                  <Button
                    type="primary"
                    className="tag-primary"
                    onClick={showAddUserModal}
                    style={{ marginRight: "10px" }}
                  >
                    Add User
                  </Button>
                  <Button type="primary" onClick={showEmailModal}>
                    Send Email
                  </Button>
                </div>
              }
            >
              <div className="table-responsive">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={buisnuessDetails}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Add User Modal */}
        <Modal
          title="Add New User"
          visible={isAddUserModalVisible}
          onCancel={handleAddUserCancel}
          footer={null}
        >
          <UserForm setIsModalVisible={setIsAddUserModalVisible} />
        </Modal>

        {/* Send Email Modal */}
        <Modal
          title="Send Email"
          visible={isEmailModalVisible}
          onCancel={handleEmailModalClose}
          footer={null}
          width={600}
        >
          <Billing
            selectedUsers={selectedUsers} // Pass selected users to the email form
            closeModal={handleEmailModalClose} // To close the modal after sending
          />
        </Modal>
      </div>
    </>
  );
}

export default Tables;
