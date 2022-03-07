import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RechartLineChart from "./RechartLineChart";

const DataPage = (props) => {
  const { dataName } = useParams();
  console.log(dataName);

  //Fetch API
  const [tempData, setTempData] = useState([]);
  const [glaciersizeData, setGlaciersizeData] = useState([]);
  const [sealevelData, setSealevelData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);

  let temp = "https://my.api.mockaroo.com/temp.json?key=8eb9e6f0";
  let glaciersize = "https://my.api.mockaroo.com/glaciersize.json?key=8eb9e6f0";
  let sealevel = "https://my.api.mockaroo.com/sealevel.json?key=8eb9e6f0";
  let co2 = "https://my.api.mockaroo.com/co2.json?key=8eb9e6f0";

  useEffect(() => {
    if (dataName === "temp") {
      document.title = "Global Temperatur";
    } else if (dataName === "glaciersize") {
      document.title = "Glacier Size";
    } else if (dataName === "sealevel") {
      document.title = "Sea Level";
    } else if (dataName === "co2") {
      document.title = "Co2 Emissions";
    } else {
      document.title = "Climate App";
    }
  });

  useEffect(() => {
    const requestOne = axios.get(temp);
    const requestTwo = axios.get(glaciersize);
    const requestThree = axios.get(sealevel);
    const requestFour = axios.get(co2);

    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3];
          console.log(responseOne, responseTwo, responseThree, responseFour);

          setTempData(responseOne.data);
          setGlaciersizeData(responseTwo.data);
          setSealevelData(responseThree.data);
          setCo2Data(responseFour.data);

          let result = responses[0].config.url.includes("temp");
          console.log(result);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {(() => {
        if (dataName === "temp") {
          return (
            <div>
              <h1>Global Temperature</h1>
              <RechartLineChart data={tempData} />
            </div>
          );
        } else if (dataName === "glaciersize") {
          return (
            <div>
              <h1>Glacier Size</h1>
              <RechartLineChart data={glaciersizeData} />
            </div>
          );
        } else if (dataName === "sealevel") {
          return (
            <div>
              <h1>Sea Level</h1>

              {sealevelData.map((data) => {
                return <p>{data.Time}</p>;
              })}
            </div>
          );
        } else if (dataName === "co2") {
          return (
            <div>
              <h1>Co2 Emissions</h1>

              {co2Data.map((data) => {
                return <p>{data.Year}</p>;
              })}
            </div>
          );
        } else {
          return <div>catch all</div>;
        }
      })()}
    </>
  );
};
export default DataPage;
