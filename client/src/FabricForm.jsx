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
  setValue("name", `${currFabric.name}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("image", `${currFabric.image}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("description", `${currFabric.description}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("quantity", currFabric.quantity, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("color", `${currFabric.color}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("weave", `${currFabric.weave}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("brand", `${currFabric.brand}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("origin", `${currFabric.origin}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("care", `${currFabric.care}`, {
    shouldValidate: true,
    shouldDirty: true,
  });
  setValue("notes", `${currFabric.notes}`, {
    shouldValidate: true,
    shouldDirty: true,
  });

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
                  variant="outlined"
                  {...register("name", { required: "Name is required" })}
                  required
                  placeholder="Name fabric here"
                  sx={{
                    padding: "10px"
                  }}
                />
      <TextField
                  fullWidth
                  label="image"
                  {...register("image")}
                  placeholder="Place fabric URL"
                  sx={{
                    padding: "10px"
                  }}
                />
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
      {editMode
      ?
    
      <div>
      <button onClick={handleSubmit(putForm)} type="submit">UPDATE FABRIC</button>
      <button onClick={abortEditMode}>EXIT EDIT MODE</button>
      </div>
      :
      <button onClick={handleSubmit(postForm)} type="submit" id="post-butt">SUBMIT FABRIC</button>
    }
    </form>
    </Container>
  )
}

export default FabricForm;
