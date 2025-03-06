import React, { useState, useEffect, useForm } from "react";
import axios from "axios";

const FabricForm = () => {
 const [name, setName] = useState(null);
 const [image, setImage] = useState(null);
 const [description, setDescription] = useState(null);
 const [quantity, setQuantity] = useState(0);
 const [color, setColor] = useState(null);
 const [weave, setWeave] = useState(null);
 const [brand, setBrand] = useState(null);
 const [origin, setOrigin] = useState(null);
 const [care, setCare] = useState(null);
 const [notes, setNotes] = useState(null);
  return (
    <div>
      <label for="name">Name:</label>
      <input type="text" id="fab-name" /><br></br>
      <label for="image">Image URL:</label>
      <input type="text" id="fab-image" /><br></br>
      <label for="description">Description:</label>
      <input type="textarea" id="fab-description" /><br></br>
      <label for="quantity">Quantity:</label>
      <input type="number" id="fab-quantity-yds" /><br></br>
      <label for="color">Color(s):</label>
      <input type="text" id="fab-color" /><br></br>
      <label for="weave">Fabric Type:</label>
      <input type="text" id="fab-type" /><br></br>
      <label for="brand">Brand:</label>
      <input type="text" id="fab-brand" /><br></br>
      <label for="origin">Place of Origin:</label>
      <input type="text" id="fab-origin" /><br></br>
      <label for="care">Care Instructions:</label>
      <input type="textarea" id="fab-care" /><br></br>
      <label for="notes">Additional Notes:</label>
      <input type="textarea" id="fab-notes" /><br></br>
    </div>
  )
}

export default FabricForm;
