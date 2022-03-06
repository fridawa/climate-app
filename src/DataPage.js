import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
              {tempData.map((data) => {
                return <p>{data.Year}</p>;
              })}
            </div>
          );
        } else if (dataName === "glaciersize") {
          return (
            <div>
              {glaciersizeData.map((data) => {
                return <p>{data.Year}</p>;
              })}
            </div>
          );
        } else if (dataName === "sealevel") {
          return (
            <div>
              {sealevelData.map((data) => {
                return <p>{data.Time}</p>;
              })}
            </div>
          );
        } else if (dataName === "co2") {
          return (
            <div>
              {co2Data.map((data) => {
                return <p>{data.Year}</p>;
              })}
            </div>
          );
        } else {
          return <div>catch all</div>;
        }
      })()}

      <div>Username: {dataName}</div>
      {tempData.map((data) => {
        return <div>{data.Year}</div>;
      })}
    </>
  );
};
export default DataPage;
