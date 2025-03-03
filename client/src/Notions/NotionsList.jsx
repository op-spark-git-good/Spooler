import React from 'react'
import Notion from './Notion'
const NotionsList = ({ notions }) => {

  return (
    <div>
      {
        notions.map((notion) => {
          return <Notion
            key={notion._id}
            brand={notion.brand}
            color={notion.color}
            image={notion.image}
            title={notion.title}
          />
        })
      }
    </div>
  )



}
export default NotionsList