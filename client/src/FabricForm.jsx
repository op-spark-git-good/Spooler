import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Typography,
  Modal,
  Paper,
  Card,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Container,
} from "@mui/material";

const FabricForm = ({getAllFabrics, currFabric}) => {
  const [editMode, setEditMode] = useState(false);
  
    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();

// set the onSubmit function to play with the useForm hook so that when the submission is made
// We make a POST request to the db with the info the form holds, then empty out the form info
const postForm = (info) => {
  axios.post("/api/fabrics", {info})
  .then((result) => {
    reset();
    getAllFabrics;
  })
  .catch((err) => console.error(err));
}



const editEntry = () => {
  // scroll down to the form(and open the accordion)

  // setting edit mode to true will vanish the submit(post) button and replace it with the update(put) button
  setEditMode(true);
  setValue("name", `${currFabric.name}`);
  setValue("image", `${currFabric.image}`);
  setValue("description", `${currFabric.description}`);
  setValue("quantity", currFabric.quantity);
  setValue("color", `${currFabric.color}`);
  setValue("weave", `${currFabric.weave}`);
  setValue("brand", `${currFabric.brand}`);
  setValue("origin", `${currFabric.origin}`);
  setValue("care", `${currFabric.care}`);
  setValue("notes", `${currFabric.notes}`);

}
const putForm = (info) => {
  console.log("put form called");
  // take id from currFabric
  // make an axios put request with that id and the form info
  axios.put(`/api/fabrics/${currFabric._id}`, {info})
  .then(() => {
    // .then: reset the form
    reset();
    // close the form(accordion)

    // turn off edit mode
    setEditMode(false);
    // re-render.
    getAllFabrics;
  }).catch((err) => console.error(err));
  
}
const abortEditMode = () => {
  // reset the form
  reset();
  // turn off edit mode
  setEditMode(false);
  // close the form(accordion)
}

return (
  <Container
  maxWidth="md"
  style={{
    height: '100vh',
    padding: '20px'
  }}
  >
    <Button className="edit-button" onClick={editEntry}>EDIT THIS FABRIC</Button>
    <form>
   <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  {...register("name", { required: "Name is required" })}
                  required
                  placeholder="Name fabric here"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="name">Name:</label>
      <input {...register("name", {
        required: "Fabric must have a name"
      })}
      type="text"
      id="fab-name"
      placeholder="Name fabric here"/><br></br> */}
      <TextField
                  fullWidth
                  label="image"
                  {...register("image")}
                  placeholder="Place fabric URL"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="image">Image URL:</label>
      <input {...register("image")}
      type="text" id="fab-image"
      placeholder="Add picture URL" /><br></br> */}
      <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  type="textarea"
                  {...register("description")}
                  placeholder="Tell us about your fabric"
                  multiline
                  rows={4}
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="description">Description:</label>
      <input {...register("description")}
      type="textarea"
      id="fab-description"
      placeholder="describe the fabric"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      }}
      />
      */}
      <br></br>
      <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  {...register("quantity")}
                  placeholder="How much ya got?"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="quantity">Quantity:</label>
      <input {...register("quantity")}
      type="number"
      id="fab-quantity-yds" /><br></br> */}
      <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  inputRef={register("colors")}
                  placeholder="colors"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="color">Color(s):</label>
      <input {...register("colors")}
      type="text"
      id="fab-color"
      placeholder="Which colors are most prominent?"
      /><br></br> */}
      <TextField
                  fullWidth
                  label="Weave"
                  name="weave"
                  inputRef={register("weave")}
                  placeholder="What is it made of?"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="weave">Fabric Type:</label>
      <input {...register("weave")}
      type="text"
      id="fab-type"
      placeholder="What kind of fabric is this?"
      /><br></br> */}
      <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  inputRef={register("brand")}
                  placeholder="Who made it?"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="brand">Brand:</label>
      <input {...register("brand")}
      type="text"
      id="fab-brand"
      placeholder="Leave blank if unknown"
      /><br></br> */}
      <TextField
                  fullWidth
                  label="Origin"
                  name="origin"
                  inputRef={register("origin")}
                  placeholder="Where'd you get it?"
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="origin">Place of Origin:</label>
      <input {...register("origin")}
      type="text"
      id="fab-origin"
      placeholder="Leave blank if unknown"
      /><br></br> */}
      <TextField
                  fullWidth
                  label="Care"
                  name="care"
                  inputRef={register("care")}
                  placeholder="Instructions for care"
                  multiline
                  rows={2}
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="care">Care Instructions:</label>
      <input {...register("care")}
      type="textarea"
      id="fab-care"
      placeholder="Care requirements: Leave blank if unknown"
      /><br></br> */}
      <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  type="textarea"
                  inputRef={register("notes")}
                  placeholder="Anything else?"
                  multiline
                  rows={4}
                  sx={{
                    padding: "10px"
                  }}
                />
      {/* <label htmlFor="notes">Additional Notes:</label>
      <input {...register("notes")}
      type="textarea"
      id="fab-notes"
      placeholder="Anything else you'd like to say?"
      /><br></br> */}
      {editMode
      ?
      // <input onClick={handleSubmit(putForm)} type="submit" value="submit"/>
      <div>
      <button onClick={handleSubmit(putForm)} type="submit">UPDATE FABRIC</button>
      <button onClick={abortEditMode}>EXIT EDIT MODE</button>
      </div>
      :
      // <input onClick={handleSubmit(postForm)} type="submit" value="submit" />
      <button onClick={handleSubmit(postForm)} type="submit" id="post-butt">SUBMIT FABRIC</button>
    }
    </form>
    </Container>
  )
}

export default FabricForm;
