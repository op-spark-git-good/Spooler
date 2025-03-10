import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  MenuItem,
  Button,
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box,
  Paper,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
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
  };

  // these are the functions for the modal that should pop up upon entering edit mode
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Set an function to delete unwanted entries
  // try to remember to set a dialog warning before proceeding
  const deleteFabric = () => {
    axios
      .delete(`/api/fabrics/${currFabric._id}`)
      .then(() => {
        toggleSingleMode(!singleMode);
        getAllFabrics();
      })
      .catch((err) => {
        console.error("Could not delete fabric", err);
      });
  };
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
        <Box textAlign="center">
          <Button
            component={Link}
            to="/fabric-form"
            variant="contained"
            sx={{ backgroundColor: "rgb(31, 101, 66)" }}
            style={{
              maxWidth: "250px",
              maxHeight: "60px",
              minWidth: "250px",
              minHeight: "60px",
              fontSize: "30px",
            }}
          >
            ADD FABRICS
          </Button>
        </Box>
        {singleMode ? (
          <div>
            <img
              className="fabric-image"
              src={currFabric.image}
              style={{ width: "500px" }}
            />
            <Button
            variant="contained"
            className="delete-button"
            sx={{backgroundColor: "rgb(15, 139, 69)"}}
            onClick={deleteFabric}>
              Cut fabric ✂️
            </Button>

            <Button
              variant="contained"
              aria-haspopup="true"
              sx={{ backgroundColor: "rgb(157, 131, 17)", marginTop: "auto" }}
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
            <Box textAlign="left">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(9, 98, 28)",
                marginTop: "fixed",
              }}
              onClick={handleFabricViewClick}
              style={{
                maxWidth: "120px",
                maxHeight: "40px",
                minWidth: "120px",
                minHeight: "40px",
                fontSize: "10px",
              }}
            >See All Fabrics</Button>
            </Box>
              <Button
              sx={{
                backgroundColor: "rgb(177, 129, 17)",
                marginTop: "fixed",
              }}
              variant="contained"
              onClick={handleClickOpen}>
                Edit This Fabric
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <FabricForm
                  currFabric={currFabric}
                  getAllFabrics={getAllFabrics}
                  handleClose={handleClose}
                />
              </Dialog>
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
            <Button
            sx={{
              backgroundColor: "rgb(9, 98, 28)",
            }}
              variant="contained"
              className="fabric-changer-back"
              onClick={() => turnStyle("back")}
            >
              PREVIOUS FABRIC
            </Button>

            <Button
            sx={{
              backgroundColor: "rgb(170, 145, 18)",
            }}
              variant="contained"
              className="fabric-changer-forward"
              onClick={() => turnStyle("forward")}
            >
              NEXT FABRIC
            </Button>
          </div>
        ) : (
          <div>
            <Box textAlign="center">
              <Button
                variant="string"
                sx={{
                  backgroundColor: "rgb(157, 131, 17)",
                  marginTop: "fixed",
                }}
                onClick={handleFabricViewClick}
                style={{
                  maxWidth: "80px",
                  maxHeight: "35px",
                  minWidth: "80px",
                  minHeight: "35px",
                  fontSize: "10px",
                }}
              >
                Single Mode
              </Button>
            </Box>
            <h1>Your Closet</h1>
            <img src="https://th.bing.com/th/id/OIP.Zm4Qalb34N9WbYu1Ivm6cgHaE1?w=301&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7" />
            <Button
              variant="contained"
              aria-haspopup="true"
              sx={{ backgroundColor: "rgb(157, 131, 17)", marginTop: "auto" }}
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
            <Typography>
              <em>*click a fabric section for options*</em>
            </Typography>
            <div className="fabric-overview">
              {fabrics.map((fabric, i) => (
                <Card
                  key={fabric._id}
                  className="fabric-overview-block"
                  elevation={10}
                  sx={{
                    maxWidth: 345,
                    padding: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                    backgroundColor: "rgb(160, 132, 72)",
                  }}
                >
                  <CardActionArea onClick={() => singleOut(i)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={fabric.image}
                      alt="Fabric not pictured"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {fabric.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {fabric.description}
                      </Typography>
                      <Typography>
                        <strong>Color:</strong> {fabric.color}
                      </Typography>
                      <Typography>
                        <strong>Inventory:</strong> {fabric.quantity}
                        <em>yds</em>
                      </Typography>
                      <Typography>
                        <strong>Type:</strong> {fabric.weave}
                      </Typography>
                      <Typography>
                        <strong>From:</strong> {fabric.origin}
                      </Typography>
                      <Typography>
                        <strong>Brand:</strong> {fabric.brand}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
