import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RechartLineChart = (props) => {
  const fetchedData = props.data;

  //Gets the third object in every API for the chart
  const thirdObject = Object.keys(fetchedData[0])[2];
  console.log(thirdObject);

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={fetchedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={thirdObject} stroke="#8884d8" />
      </LineChart>
    </>
  );
};
export default RechartLineChart;
