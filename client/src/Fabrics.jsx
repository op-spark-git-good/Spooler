import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import FabricForm from "./FabricForm.jsx"

// This component will hold the list of fabrics

const Fabrics = () => {
  const [fabrics, setFabrics] = useState([]);
  const [fabricsNum, setFabricsNum] = useState(0);
  const [currFabric, setCurrFabric] = useState(fabrics[0]);
  // have the below get request run upon mounting(with use effect);
  // create a request that takes in all fabric documents from the database
  const getAllFabrics = () => {

    axios.get("/api/fabrics").then(({ data }) => {
      setFabrics(data);
      setCurrFabric(data[0]);
    }).catch((err) => console.error(err));
  }
  useEffect(getAllFabrics, []);
// maybe set the post function in here and pass it down as props so we can reset every time it gets called?

// make a function that changes the currFabric variable to the next or previous number in the fabrics array
const turnStyle = (direction) => {
  const max = fabrics.length - 1;
  switch (direction) {
    case "forward":
      if (fabricsNum === max) {
        setFabricsNum(0);
        setCurrFabric(fabrics[0]);
      } else {
        setFabricsNum(fabricsNum + 1);
        setCurrFabric(fabrics[fabricsNum + 1]);
      }
      break;
      case "back":
        if (fabricsNum === 0) {
          setFabricsNum(max);
          setCurrFabric(fabrics[max]);
        } else {
          setFabricsNum(fabricsNum - 1);
          setCurrFabric(fabrics[fabricsNum - 1]);
        }
        break
  }




}
  if (fabrics.length) {
      return (
        <div key={currFabric._id} className="fabric-block">
        <img
          className="fabric-image"
          src={currFabric.image}
          style={{width: "300px"}}
          />
        <div className="fabric-name">{currFabric.name}</div>
        <p className="fabric-description">{currFabric.description}
        </p>
        <div className="fabric-color">Color: {currFabric.color.join(', ')}</div>
        <div className="fabric-quantity">Inventory: {currFabric.quantity}yds</div>
        <div className="fabric-weave">Type: {currFabric.weave}</div>
        <div className="fabric-origin">From: {currFabric.origin}</div>
        <div className="fabric-brand">Brand: {currFabric.brand}</div>
        <button className="fabric-changer-back" onClick={() => turnStyle("back")}>PREVIOUS FABRIC</button>
       
        <button className="fabric-changer-forward" onClick={() => turnStyle("forward")}>NEXT FABRIC</button>
          <FabricForm currFabric={currFabric}getAllFabrics={getAllFabrics} />
      </div>
        );
    } else {
      return (
        <button onClick={getAllFabrics}>GET FABRICS</button>
      )
    }
  }
export default Fabrics;
