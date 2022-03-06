import { useState, useEffect } from "react";
import axios from "axios";

const DataFetching = ({ childToParent }) => {
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
          const responesThree = responses[2];
          const responseFour = responses[3];
          console.log(responseOne, responseTwo, responesThree, responseFour);
          setTempData(responseOne.data);
          setGlaciersizeData(responseOne.data);
          setSealevelData(responseOne.data);
          setCo2Data(responseOne.data);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {tempData.map((data) => (
        <p className="temp">{data.Year}</p>
      ))}
      {glaciersizeData.map((data) => (
        <p key={data.Row}>{data.Year}</p>
      ))}
    </>
  );
};
export default DataFetching;
