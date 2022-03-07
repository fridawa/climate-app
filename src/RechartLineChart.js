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
  let thirdObject = {};
  if (fetchedData[0] == null) {
    console.error("err");
  } else {
    thirdObject = Object.keys(fetchedData[0])[2];
    console.log(thirdObject);
  }
  console.log(thirdObject);
  const third = new Object();
  third.make = thirdObject;
  console.log(third.make);
  const test = JSON.stringify(third.make);
  console.log(test);
  const withoutFirstAndLast = test.slice(1, -1);
  console.log(withoutFirstAndLast);
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
        <Line type="monotone" dataKey={withoutFirstAndLast} stroke="#8884d8" />
      </LineChart>
    </>
  );
};
export default RechartLineChart;
