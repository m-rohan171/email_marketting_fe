import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  // Modify the series data
  lineChart.series = [
    {
      name: "Business Listings",
      data: [120, 140, 150, 160, 180, 200, 220]  // Replace with actual monthly or weekly data
    },
    {
      name: "Event Registrations",
      data: [80, 100, 95, 110, 130, 125, 140]  // Replace with actual monthly or weekly data
    }
  ];

  // Update the x-axis labels to show months or weeks
  lineChart.options = {
    ...lineChart.options,
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],  // Monthly data example
      title: {
        text: "Month"
      }
    },
    yaxis: {
      title: {
        text: "Weeks"
      }
    },
    colors: ["#008FFB", "#00E396"], // Colors for the lines
    dataLabels: {
      enabled: true
    }
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Business Listings & Event Registrations</Title>
          <Paragraph className="lastweek">
            than last month <span className="bnb2">+15%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Business Listings</li>
            <li>{<MinusOutlined />} Event Registrations</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="line"  // Use 'line' or 'area' based on visual preference
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
