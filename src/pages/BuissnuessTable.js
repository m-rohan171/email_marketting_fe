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
import BusinessForm from "./AddBuissnuess";
import Billing from "./Billing"; // Import the Billing component for sending emails

const columns = [
  {
    title: "Business Name",
    dataIndex: "businessName",
    key: "businessName",
    width: "32%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "First Name",
    key: "firstName",
    dataIndex: "firstName",
  },
  {
    title: "Last Name",
    key: "lastName",
    dataIndex: "lastName",
  },
  {
    title: "Phone No",
    key: "phone",
    dataIndex: "phone",
  },
];

function BuissnuessTables() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBillingModalVisible, setIsBillingModalVisible] = useState(false);
  const [buisnuessDetails, setBuisnuessDetails] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleAddUser = (values) => {
    console.log("User added:", values);
    setIsModalVisible(false);
    // Add your logic to update table data here
  };

  const handleSendEmail = () => {
    if (selectedBusinesses.length === 0) {
      message.warning("Please select at least one business to send an email.");
      return;
    }
    setIsBillingModalVisible(true);
  };

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/buisnuess-details"
        );
        // Ensure each row has a unique `key` property
        const dataWithKeys = response.data.map((item, index) => ({
          ...item,
          key: item.id || index, // Use `id` from the API or fallback to index
        }));
        setBuisnuessDetails(dataWithKeys);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    loadOrganizations();
  }, [isModalVisible]);

  // Row Selection for the table
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedBusinesses(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.businessName,
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
              title="Business Directory"
              extra={
                <>
                  <Button
                    type="primary"
                    className="tag-primary"
                    style={{ marginRight: "8px" }}
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </Button>
                  <Button
                    type="primary"
                    className="tag-primary"
                    onClick={showModal}
                  >
                    Add Business
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={buisnuessDetails}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Add Business Modal */}
        <Modal
          title="Add New Business"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <BusinessForm setIsModalVisible={setIsModalVisible} />
        </Modal>

        {/* Send Email Modal */}
        <Modal
          title="Send Email"
          visible={isBillingModalVisible}
          onCancel={() => setIsBillingModalVisible(false)}
          footer={null}
        >
          <Billing
            selectedUsers={selectedBusinesses}
            closeModal={() => setIsBillingModalVisible(false)}
          />
        </Modal>
      </div>
    </>
  );
}

export default BuissnuessTables;
