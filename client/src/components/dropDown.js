import React, { useState } from 'react';
import {
  Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput
} from '@mui/material';
import AddItemModal from './addItemModal';

export default function DropDown({ type, data = [], multiple, setMultiple, sendData }) {
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const isCategory = type === 'Category';
  const isCity = type === 'City';
  const isCountry = type === 'Country';

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

  const handleClick = (item) => {
    if (sendData) {
      sendData(item); // Only call sendData if it is defined
    }
  };


  return (
    <Box sx={{ mt: 3 }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{type}</InputLabel>
        <Select
          multiple={isCategory}
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label={type} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {Array.isArray(selected) ? selected.map((id) => {
                const item = data.find((item) => item.id === id);
                return item ? <Chip key={id} label={
                  isCategory ? item.title : isCountry ? item.country : item.city_name
                } /> : null;
              }) : (
                data.find((item) => item.id === selected)?.[isCategory ? 'title' : isCountry ? 'country' : 'city_name']
              )}
            </Box>
          )}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id} onClick={handleClick}>
              {isCategory ? item.title : isCountry ? item.country : item.city_name}
            </MenuItem>
          ))}
          <MenuItem onClick={() => setOpenModal(true)}>
            + Add New {type}
          </MenuItem>
        </Select>
      </FormControl>

      <AddItemModal openModal={openModal} setOpenModal={setOpenModal} type={type} />
    </Box>
  );
}
