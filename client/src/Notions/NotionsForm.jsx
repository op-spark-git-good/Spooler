import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotionsForm = () => {
  const { state } = useLocation();  // Get the state passed from the previous component
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    color: '',
    brand: '',
    upc: '',
  });

  // Autofill the form when the state is available
  useEffect(() => {
    if (state) {
      setFormData(state); // Populate the form fields with the passed data
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <label>Brand</label>
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
      />
      <label>Color</label>
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
      />
      <label>Color Number</label>
      <input
        type='number'
        name='color Number'

      />
      <label>UPC Number</label>
      <input
        type="text"
        name="upc"
        value={formData.upc}
        onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
      />
      <label>Quantity</label>
      <input
        type='text'
        name='quantity'
      />
      <label>Length in yards</label>
      <input
        type='number'
        name='length'
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NotionsForm;