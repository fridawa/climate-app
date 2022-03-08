import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import moment from "moment";
const RechartLineChart = (props) => {
  const fetchedData = props.data;

  // Dynamic 3nd object
  //Gets the third object in every API for the chart
  let thirdObject = {};
  if (fetchedData[0] == null) {
    // console.error("err");
  } else {
    thirdObject = Object.keys(fetchedData[0])[2];
    // console.log(thirdObject);
  }
  // console.log(thirdObject);
  const third = new Object();
  third.make = thirdObject;
  // console.log(third.make);
  const test = JSON.stringify(third.make);
  // console.log(test);
  const withoutFirstAndLast = test.slice(1, -1);

  // // // // // // // // // // // // // // // // // //

  // Dynamic 2nd object
  let secObject = {};
  if (fetchedData[0] == null) {
    // console.error("err");
  } else {
    secObject = Object.keys(fetchedData[0])[1];
    // console.log(thirdObject);
  }
  // console.log(thirdObject);
  const sec = new Object();
  sec.make = secObject;
  // console.log(third.make);
  const test2 = JSON.stringify(sec.make);
  // console.log(test);
  const withoutFirstAndLast2 = test2.slice(1, -1);
  // console.log(withoutFirstAndLast2);

  // Funktion med moment formatter för årtal ist för datum
  const xAxisTickFormatter = (withoutFirstAndLast2) => {
    return moment(withoutFirstAndLast2).format("YYYY");
  };

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={fetchedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={withoutFirstAndLast2}
          // checks so it only applies to sealevel data
          tickFormatter={
            withoutFirstAndLast2 === "Time" ? xAxisTickFormatter : null
          }
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={withoutFirstAndLast} stroke="#8884d8" />
      </LineChart>
    </>
  );
};
export default RechartLineChart;
