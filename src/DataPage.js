import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RechartLineChart from "./RechartLineChart";
import moment from "moment";
const DataPage = (props) => {
  const { dataName } = useParams();

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
          // console.log(responseOne, responseTwo, responseThree, responseFour);

          setTempData(responseOne.data);
          setGlaciersizeData(responseTwo.data);
          setSealevelData(responseThree.data);
          setCo2Data(responseFour.data);

          let result = responses[0].config.url.includes("temp");
          // console.log(result);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const divStyle = {
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(/img/boots.png)`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
  };

  return (
    <>
      {(() => {
        if (dataName === "temp") {
          // GLOBAL TEMPERATURE
          //Changes the order on the fetched data (high to low)
          const reverseData = [...tempData];
          reverseData.reverse();
          //Filters only one specific data
          //pushing that filtered data into a new array
          const filteredArr = [];
          reverseData.map((n) => {
            if (n.Source === "GISTEMP" && n.Year > 1880) {
              // console.log(n);
              filteredArr.push(n);
              return filteredArr;
            } else {
              return null;
            }
          });
          // sorts out every nth element
          const everyNth = (filteredArr, nth) =>
            filteredArr.filter((e, i) => i % nth === nth - 1);
          return (
            <div>
              <h1>Global Temperature</h1>
              <RechartLineChart data={everyNth(filteredArr, 10)} />
            </div>
          );
        } else if (dataName === "glaciersize") {
          // GLACIER SIZE
          // sorts out every nth element
          const everyNth = (glaciersizeData, nth) =>
            glaciersizeData.filter((e, i) => i % nth === nth - 1);
          return (
            <div>
              <h1>Glacier Size</h1>
              <RechartLineChart data={everyNth(glaciersizeData, 7)} />
            </div>
          );
        } else if (dataName === "sealevel") {
          // SEA LEVEL
          // Funktion med moment formatter för årtal ist för datum
          //Filters only one specific data
          //pushing that filtered data into a new array
          // BUGGIG MEN FUNKAR.
          // FUNKAR INTE OM SIDAN LADDAS OM PGA DÅ FINNS INTE DATAN
          // if (sealevelData[0].GMSL === -158.7) {
          //   console.log("stämmer");
          //   sealevelData.map((n) => {
          //     n.GMSL += 158.7;
          //   });
          // } else {
          //   console.log("nja");
          // }
          // sorts out every nth element
          const everyNth = (sealevelData, nth) =>
            sealevelData.filter((e, i) => i % nth === nth - 10);

          return (
            <div>
              <h1>Sea Level</h1>
              <RechartLineChart data={everyNth(sealevelData, 10)} />
            </div>
          );
        } else if (dataName === "co2") {
          // CO2 EMISSION
          //Filters only one specific data
          //pushing that filtered data into a new array
          const filteredArr = [];
          co2Data.map((n) => {
            if (n.Year > 1880) {
              // console.log(n);
              filteredArr.push(n);
              return filteredArr;
            } else {
              return null;
            }
          });
          // sorts out every nth element
          const everyNth = (filteredArr, nth) =>
            filteredArr.filter((e, i) => i % nth === nth - 1);

          return (
            <div style={divStyle}>
              <h1>Co2 Emissions</h1>
              <RechartLineChart data={everyNth(filteredArr, 10)} />
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
