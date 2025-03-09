import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Notion = ({ brand, color, image, title, id, getAllNotionsDB, length, quantity, colorNum, upc }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`/api/notions/${id}`)
      .then(() => {
        getAllNotionsDB(); // Refresh the list after delete
      })
      .catch((err) => {
        console.error('Could not finish delete request:', err);
      })
      .finally(() => {
        setOpen(false); // Close the dialog after deleting
      });
  };

  const handleUpdate = () => {
    navigate('/notion-form', {
      state: { title, brand, color, image, id, length, quantity, colorNum, upc }
    });
  };

  return (
    <Box textAlign="center" p={2} borderColor="grey.300">
      <Box display="flex" justifyContent="center">
        <img src={image} alt={title} style={{ width: '80px', height: 'auto' }} />
      </Box>

      <Typography variant="h6" align='center' fontWeight="bold">{title}</Typography>
      <Typography variant="body2" color="text.secondary"><strong>Brand:</strong> {brand}</Typography>
      <Typography variant="body2"><strong>Color:</strong> {color}</Typography>
      <Typography variant="body2"><strong>Quantity of Spools:</strong> {quantity}</Typography>
      <Typography variant="body2"><strong>Length of Thread:</strong> {length}</Typography>
      <Typography variant="body2"><strong>Color Number:</strong> {colorNum}</Typography>

      <Box mt={2} display="flex" justifyContent="center" gap={1}>
        <Button sx={{
          backgroundColor: 'rgb(31, 101, 66)',
          color: 'rgb(229, 229, 234)',
        }} size="small" onClick={handleUpdate}>
          Update
        </Button>
        <Button sx={{
          backgroundColor: 'rgb(229, 229, 234)',
          color: 'rgb(87,27,126)',
        }} onClick={handleClickOpen}>
          Delete
        </Button>
      </Box>

      {/* Alert Dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this notion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notion;



