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

  // This logic worked but then gave message:
  // "Uncaught TypeError: Cannot convert undefined or null to object"
  // so just need to work around that so I can put the key (ar) in <Line></Line>

  //   console.log(Object.keys(fetchedData[0]));
  //   const keyyy = undefined;
  //   if (keyyy === null) {
  //     const keyyy = Object.keys(fetchedData[0]);
  //     console.log(keyyy);
  //   } else {
  //     console.log("falsy");
  //   }
  //     const ar = keyyy[3];
  //     console.log(ar);

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
        <Line type="monotone" dataKey="Year" stroke="#8884d8" />
      </LineChart>
    </>
  );
};
export default RechartLineChart;
