import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";

const FabricForm = ({getAllFabrics, currFabric}) => {
  const [editMode, setEditMode] = useState(false);
    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();
/**
 *useLocation to bring in state from the previous component.
 use setValue to set the values on the form

Possibly better idea: move the edit button to this component.
use setValue on click to give the forms their respective values
hide the submit button
reveal the update button.

when the update button is clicked:
get the _id of the currFabric object.
set a put request to replace it with the contents of this form.
Clean out the form values
hide the update button
reveal the submit button
opt. rerender the fabrics array and start from that object.
currFabric = fabrics[fabrics.indexOf(this fabric)].
object.

 */
  // }




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
  // scroll down to the form(and open the accordian)
  
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
  <div>

     <button className="edit-button" onClick={editEntry}>EDIT THIS FABRIC</button>
    <form>
      <label htmlFor="name">Name:</label>
      <input {...register("name", {
        required: "Fabric must have a name"
      })}
      type="text"
      id="fab-name"
      placeholder="Name fabric here"/><br></br>
      <label htmlFor="image">Image URL:</label>
      <input {...register("image")}
      type="text" id="fab-image"
      placeholder="Add picture URL" /><br></br>
      <label htmlFor="description">Description:</label>
      <input {...register("description")}
      type="textarea"
      id="fab-description"
      placeholder="describe the fabric"
      /><br></br>
      <label htmlFor="quantity">Quantity:</label>
      <input {...register("quantity")}
      type="number"
      id="fab-quantity-yds" /><br></br>
      <label htmlFor="color">Color(s):</label>
      <input {...register("colors")}
      type="text"
      id="fab-color"
      placeholder="Which colors are most prominent?"
      /><br></br>
      <label htmlFor="weave">Fabric Type:</label>
      <input {...register("weave")}
      type="text"
      id="fab-type"
      placeholder="What kind of fabric is this?"
      /><br></br>
      <label htmlFor="brand">Brand:</label>
      <input {...register("brand")}
      type="text"
      id="fab-brand"
      placeholder="Leave blank if unknown"
      /><br></br>
      <label htmlFor="origin">Place of Origin:</label>
      <input {...register("origin")}
      type="text"
      id="fab-origin"
      placeholder="Leave blank if unknown"
      /><br></br>
      <label htmlFor="care">Care Instructions:</label>
      <input {...register("care")}
      type="textarea"
      id="fab-care"
      placeholder="Care requirements: Leave blank if unknown"
      /><br></br>
      <label htmlFor="notes">Additional Notes:</label>
      <input {...register("notes")}
      type="textarea"
      id="fab-notes"
      placeholder="Anything else you'd like to say?"
      /><br></br>
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
    </div>
  )
}

export default FabricForm;
