'use client'
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import tvseries from './tvseries';
import actors from './actors';
import characters from './characters';
import products from './products';


const EditActorDialog = ({ open, onClose, actor, onSave }) => {
  const [editedActor, setEditedActor] = useState(actor || {
    TVseries: '',
    season: '',
    date: '',
    episode: '',
    year: '',
    name: '',
    character: '',
    ProductCategory: '',
    imageUrl: '',
    productLink: '',
    productTitle: '',
    alt: '',
  });

  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target;
    debugger
    setEditedActor((prevActor) => ({
      ...prevActor,
      [name]: value || '',
    }));
  };



  const handleSave = () => {
    onSave(editedActor);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{actor ? 'Edit Actor' : 'Add New Actor'}</DialogTitle>
      <DialogContent>
        <Autocomplete size='small'
          options={tvseries}
          value={editedActor.TVseries}
          onInputChange={(event,newvalue)=>{
            setEditedActor((prevActor) => ({
              ...prevActor,
              ['TVseries']: newvalue || '',
            }));
          }}
          renderInput={(params) => (
            <TextField size='small' sx={{ margin: 1 }}
              {...params}
              label="TV Series"
              fullWidth
            />
          )}
        />
        <TextField size='small' sx={{ margin: 1 }}
          label="Season"
          name="season"
          value={editedActor.season}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField size='small' sx={{ margin: 1 }}
          label="Date"
          name="date"
          value={editedActor.date}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField size='small' sx={{ margin: 1 }}
          label="Episode"
          name="episode"
          value={editedActor.episode}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField size='small' sx={{ margin: 1 }}
          label="Year"
          name="year"
          value={editedActor.year}
          onChange={handleInputChange}
          fullWidth
        />
        <Autocomplete size='small'
          options={actors}
          value={editedActor.name}
          onInputChange={(event,newvalue)=>{
            setEditedActor((prevActor) => ({
              ...prevActor,
              ['name']: newvalue || '',
            }));
          }}
          renderInput={(params) => (
            <TextField size='small' sx={{ margin: 1 }}
              {...params}
              label="Actor Name"
              fullWidth
            />
          )}
        />
        <Autocomplete size='small'
          options={characters}
          value={editedActor.character}
          onInputChange={(event,newvalue)=>{
            setEditedActor((prevActor) => ({
              ...prevActor,
              ['character']: newvalue || '',
            }));
          }}
          renderInput={(params) => (
            <TextField size='small' sx={{ margin: 1 }}
              {...params}
              label="Character"
              fullWidth
            />
          )}
        />
        <Autocomplete size='small'
          options={products}
          value={editedActor.ProductCategory}
          onInputChange={(event,newvalue)=>{
            setEditedActor((prevActor) => ({
              ...prevActor,
              ['ProductCategory']: newvalue || '',
            }));
          }}
          renderInput={(params) => (
            <TextField size='small' sx={{ margin: 1 }}
              {...params}
              label="Product Category"
              fullWidth
            />
          )}
        />
        <TextField size='small' sx={{ margin: 1 }}
          label="Image URL"
          name="imageUrl"
          value={editedActor.imageUrl}
          onChange={handleInputChange}
          fullWidth
        />


        <TextField size='small' sx={{ margin: 1 }}
          label="Product Link"
          name="productLink"
          value={editedActor.productLink}
          onChange={handleInputChange}
          fullWidth
        />


        <TextField size='small' sx={{ margin: 1 }}
          label="Product Title"
          name="productTitle"
          value={editedActor.productTitle}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField size='small' sx={{ margin: 1 }}
          label="Alt Text"
          name="alt"
          value={editedActor.alt}
          onChange={handleInputChange}
          fullWidth
        />
        {/* Add more fields for other properties as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{actor ? 'Save' : 'Add Actor'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditActorDialog;
