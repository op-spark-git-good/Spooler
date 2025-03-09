import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  MenuItem,
  Button,
  Grid2,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import FabricForm from "./FabricForm.jsx";

// This component will hold the list of fabrics

const Fabrics = () => {
  const [fabrics, setFabrics] = useState([]);
  const [fabricsNum, setFabricsNum] = useState(0);
  const [currFabric, setCurrFabric] = useState(fabrics[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  // singleMode will render only one entry at a time
  const [singleMode, toggleSingleMode] = useState(false);
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
    setAnchorEl(event.currentTarget);
  };
  const singleOut = (index) => {
    toggleSingleMode(true);
    setFabricsNum(index);
    setCurrFabric(fabrics[index]);
    closeMenu();
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleFabricViewClick = () => {
    toggleSingleMode(!singleMode);
  }

  const testFunc = () => {}
    
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
        {singleMode ? (
          <div>
            <img
              className="fabric-image"
              src={currFabric.image}
              style={{ width: "500px" }}
              />
            <Button
              variant="contained"
              aria-haspopup="true"
              onClick={createDropDown}
              >
              Short List
            </Button>
            <Menu
              id="test-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              >
              <MenuItem onClick={closeMenu}>CLOSE LIST</MenuItem>
              {fabrics.map((fabric, i) => (
                <MenuItem key={fabric._id} onClick={() => singleOut(i)}>
                  {fabric.name}
                </MenuItem>
              ))}
            </Menu>
              <Button onClick={handleFabricViewClick}>See All Fabrics</Button>
            <div className="fabric-name">{currFabric.name}</div>
            <p className="fabric-description">{currFabric.description}</p>
            <div className="fabric-color">
              Color: {currFabric.color.join(", ")}
            </div>
            <div className="fabric-quantity">
              Inventory: {currFabric.quantity}yds
            </div>
            <div className="fabric-weave">Type: {currFabric.weave}</div>
            <div className="fabric-origin">From: {currFabric.origin}</div>
            <div className="fabric-brand">Brand: {currFabric.brand}</div>
            <button
              className="fabric-changer-back"
              onClick={() => turnStyle("back")}
              >
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
        ) : (
          <div>
            <button onClick={handleFabricViewClick}>Single Mode</button>
            <h1>Your Closet</h1>
            <img src="https://th.bing.com/th/id/OIP.Zm4Qalb34N9WbYu1Ivm6cgHaE1?w=301&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"/>
            <Button
              variant="contained"
              aria-haspopup="true"
              onClick={createDropDown}
              >
              Short List
            </Button>
            <Menu
              id="test-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              >
              <MenuItem onClick={closeMenu}>CLOSE LIST</MenuItem>
              {fabrics.map((fabric, i) => (
                <MenuItem key={fabric._id} onClick={() => singleOut(i)}>
                  {fabric.name}
                </MenuItem>
              ))}
            </Menu>
              <h1>Fabrics</h1>
            <div className="fabric-overview">
              {fabrics.map((fabric, i) => (
                <div key={fabric._id} className="fabric-overview-block">
                   <img
              className="fabric-image"
              src={fabric.image}
              onClick={() => singleOut(i)}
              style={{ width: "300px" }}
              
              />
                  <div className="fabric-name" onClick={() => singleOut(i)}>{fabric.name}</div>
                  <p className="fabric-description">{fabric.description}</p>
                  <div className="fabric-color">
                    Color: {fabric.color.join(", ")}
                  </div>
                  <div className="fabric-quantity">
                    Inventory: {fabric.quantity}yds
                  </div>
                  <div className="fabric-weave">Type: {fabric.weave}</div>
                  <div className="fabric-origin">From: {fabric.origin}</div>
                  <div className="fabric-brand">Brand: {fabric.brand}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <button onClick={getAllFabrics}>GET FABRICS</button>;
  }
};
export default Fabrics;
