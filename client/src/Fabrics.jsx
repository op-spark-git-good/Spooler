import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu,
  MenuItem,
  Button,
  Grid2,
  Typography,
  Box,
  Paper
    } from "@mui/material";
import FabricForm from "./FabricForm.jsx";

// This component will hold the list of fabrics

const Fabrics = () => {
  const [fabrics, setFabrics] = useState([]);
  const [fabricsNum, setFabricsNum] = useState(0);
  const [currFabric, setCurrFabric] = useState(fabrics[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  // singleMode will render only one entry at a time
  const [singleMode, setSingleMode] = useState(false);
  // have the below get request run upon mounting(with use effect);
  // create a request that takes in all fabric documents from the database
  const getAllFabrics = () => {
    axios
      .get("/api/fabrics")
      .then(({ data }) => {
        setFabrics(data);
        setCurrFabric(data[0]);
      })
      .catch((err) => console.error(err));
  };
  useEffect(getAllFabrics, []);
  // This is the function for the drop-down menu. I'll have it render on click and show each fabric and an exit button

  const createDropDown = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const singleOut = (index) => {
    setSingleMode(true);
    setFabricsNum(index);
    setCurrFabric(fabrics[index]);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  }

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
        break;
    }
  };
  if (fabrics.length) {
    return (
      <div key={currFabric._id} className="fabric-block">
        <img
          className="fabric-image"
          src={currFabric.image}
          style={{ width: "300px" }}
        />
        <Button variant="contained"
        aria-haspopup="true"
        onClick={createDropDown}
        >
          Short List
        </Button>
          <Menu id="test-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          >
            {fabrics.map((fabric, i) => (
              <MenuItem key={fabric._id} onClick={() => singleOut(i)}>{fabric.name}</MenuItem>
            ))}
          </Menu>

        <div className="fabric-name">{currFabric.name}</div>
        <p className="fabric-description">{currFabric.description}</p>
        <div className="fabric-color">Color: {currFabric.color.join(", ")}</div>
        <div className="fabric-quantity">
          Inventory: {currFabric.quantity}yds
        </div>
        <div className="fabric-weave">Type: {currFabric.weave}</div>
        <div className="fabric-origin">From: {currFabric.origin}</div>
        <div className="fabric-brand">Brand: {currFabric.brand}</div>
        <button
          className="fabric-changer-back"
          onClick={() => turnStyle("back")}
        >{/**DO SINGLEOUT WHEN YOU COME BACK OR AFTER RE-DEPLOYMENT */}
          PREVIOUS FABRIC
        </button>

        <button
          className="fabric-changer-forward"
          onClick={() => turnStyle("forward")}
        >
          NEXT FABRIC
        </button>
        <FabricForm currFabric={currFabric} getAllFabrics={getAllFabrics} />
      </div>
    );
  } else {
    return <button onClick={getAllFabrics}>GET FABRICS</button>;
  }
};
export default Fabrics;
