import React, { useState, useEffect } from "react";
import axios from 'axios'
import NotionsList from "./NotionsList";
import NotionsForm from "./NotionsForm";
const Notions = (props) => {


  return (
    <div>
      <h1>Notions Stash</h1>
      <NotionsForm />
      <NotionsList />

    </div>
  )

}
export default Notions