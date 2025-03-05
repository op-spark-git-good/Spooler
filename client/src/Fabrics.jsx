import React, {useState, useEffect} from "react";
import axios from 'axios';

// This component will hold the list of fabrics

const Fabrics = () => {
  const [ fabrics, setFabrics ] = useState([]);
  // set a state variable to act as the current front-facing fabric on the page
  const [ currFabric, setCurrFabric ] = useState(fabrics[0]);
  // also set a state number to index the current fabric.
  const [fabricNum, setFabricNum] = useState(0);
  // have the below get request run upon mounting(with use effect);
  // create a request that takes in all fabric documents from the database
  const getAllFabrics = () => {
    
    axios.get("/api/fabrics").then(({ data }) => {
      setFabrics(data);
    }).catch((err) => console.error(err));
  }
  useEffect(getAllFabrics, []);
// maybe set the post function in here and pass it down as props so we can reset every time it gets called?
  fabrics.forEach((fabric) => {
    for (let key in fabric) {
      if (key === "name") {
        console.log(fabric[key]);
      }
    }
    // console.log('and another one')
    // console.log(fabric);
  })

  // {console.log('Rendering', fabrics[0].name )}
  if (fabrics.length) {
    fabrics.map((fabric) => {
      return (
        <div key={fabric._id} className="fabric-block">
        <img
          className="fabric-image"
          src={fabric.image}
          />
        <div className="fabric-name">{fabric.name} {/*Ghost Sheet*/}</div>
        <p className="fabric-description">{fabric.description}
          {/*This fabric is great to give you a scare!! Nice, simple, comfy cotton
          makes this a winner all through the summer. Or Halloween night!*/}
        </p>
        <div className="fabric-color">Color: {fabric.color.join(', ')} {/*white*/}</div>
        <div className="fabric-quantity">Inventory: {fabric.quantity} {/*8 yards*/}</div>
        <div className="fabric-weave">Type: {fabric.weave}{/*cotton*/}</div>
        <div className="fabric-origin">From: {fabric.origin} {/*The Wayward Haberdashery*/}</div>
        <div className="fabric-brand">Brand: {fabric.brand} {/*Boo-niversity*/}</div>
      </div>
        );
      })
    } else {
      return (
        <button onClick={getAllFabrics}>GET FABRICS</button>
      )
    }
  }
export default Fabrics;
