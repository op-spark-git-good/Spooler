import React from 'react'
const Notion = ({ brand, color, image, title }) => {
  return (
    <div>
      <div > {title}</div>
      <div>{brand}</div>
      <img src={`${image}`}></img>
      <div>{color}</div>
    </div>
  )
}
export default Notion