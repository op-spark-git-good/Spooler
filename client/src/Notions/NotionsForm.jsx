import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const NotionsForm = ({ initialData }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const stashNotion = state || initialData || {};

  const [formData, setFormData] = useState({
    title: '',
    color: '',
    brand: '',
    upc: '',
    colorNum: '',
    quantity: '',
    length: '',
    image: '',
  });

  useEffect(() => {
    if (stashNotion) {
      const newStashNotion = {
        title: stashNotion.title || '',
        color: stashNotion.color || '',
        brand: stashNotion.brand || '',
        upc: stashNotion.upc || '',
        id: stashNotion._id,
        colorNum: stashNotion.colorNum || '',
        quantity: stashNotion.quantity || '',
        length: stashNotion.length || '',
        image: stashNotion.image || '',
      };

      setFormData(newStashNotion);

      Object.keys(newStashNotion).forEach(key => {
        setValue(key, newStashNotion[key]);
      });
    }
  }, [stashNotion, setValue]);

  const onSubmit = (notion) => {
    const updatedData = {
      item: {
        title: notion.title || formData.title,
        color: notion.color || formData.color,
        brand: notion.brand || formData.brand,
        upc: notion.upc || formData.upc,
        colorNum: notion.colorNum || formData.colorNum,
        quantity: notion.quantity || formData.quantity,
        length: notion.length || formData.length,
        image: notion.image
      }
    };

    axios.put(`/api/notions/${stashNotion.id || state.info.item._id}`, updatedData)
      .then(response => {
        if (response.status === 200) {
          navigate('/notions');
        } else {
          throw new Error('Update failed');
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        alert('Update failed!');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input type="text" {...register('title', { required: 'Title is required' })} defaultValue={formData.title} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <label>Brand</label>
        <input type="text" {...register('brand', { required: 'Brand is required' })} defaultValue={formData.brand} />
        {errors.brand && <span>{errors.brand.message}</span>}
      </div>

      <div>
        <label>Color</label>
        <input type="text" {...register('color', { required: 'Color is required' })} defaultValue={formData.color} />
        {errors.color && <span>{errors.color.message}</span>}
      </div>

      <div>
        <label>Color Number</label>
        <input type="number" {...register('colorNum')} defaultValue={formData.colorNum} />
      </div>

      <div>
        <label>UPC Number</label>
        <input type="text" {...register('upc', { required: 'UPC Number is required' })} defaultValue={formData.upc} />
        {errors.upc && <span>{errors.upc.message}</span>}
      </div>

      <div>
        <label>Quantity</label>
        <input type="number" {...register('quantity', { required: 'Quantity is required' })} defaultValue={formData.quantity} />
      </div>

      <div>
        <label>Length in yards</label>
        <input type="number" {...register('length')} defaultValue={formData.length} />
      </div>

      {formData.image && (
        <div>
          <label>Current Image</label>
          <img src={formData.image} alt="Notion Item" style={{ width: '150px', height: 'auto', marginTop: '10px' }} />
        </div>
      )}

      <button type="submit">Spool On</button>
    </form>
  );
};

export default NotionsForm;