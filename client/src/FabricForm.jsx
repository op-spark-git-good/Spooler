import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";

const FabricForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
// set the onSubmit function to play with the useForm hook so that when the submission is made
// We make a POST request to the db with the info the form holds, then empty out the form info
const onSubmit = (info) => {
  console.log("We've done it!! Look:")
  console.log(info)
}

return (
  <div>
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
      <input onClick={handleSubmit(onSubmit)} type="submit" value="submit" />
    </div>
  )
}

export default FabricForm;
