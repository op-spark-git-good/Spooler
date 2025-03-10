import React, { useState } from "react";

const CategoryForm = ({category, items, setItems, fields }) => {
  const handleAddItem = () => {
    const newItem = fields.reduce((obj, field) => ({ ...obj, [field]: "" }), {});
    setItems([...items, newItem]);
  };
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };
  return (
    <div>
      <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
      {items.map((item, index) => (
        <div key={index}>
          {fields.map((field) => (
            <input
              key={field}
              type={field === "priority" || field === "quantity" ? "number" : "text"}
              placeholder={field}
              value={item[field]}
              onChange={(e) => handleInputChange(index, field, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add {category}</button>
    </div>
  );
};


export default CategoryForm;