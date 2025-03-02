import React, { useState, useEffect } from "react";
import axios from 'axios'
const Notions = () => {
  const [notions, setNotions] = useState([])
  const getAllNotionsDB = () => {

    axios.get('/api/notions/')
      .then((responceObj) => {
        setNotions(responceObj.data)

      })
      .catch(() => console.log())

  };
  useEffect(() => {
    getAllNotionsDB()
  }, []);
  console.log(notions)
  return (
    <div>
      <h1>Notions Stash</h1>

    </div>
  )

}
export default Notions