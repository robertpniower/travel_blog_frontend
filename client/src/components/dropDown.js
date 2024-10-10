import React, { useState } from 'react';
import {
  Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput,
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from '@mui/material';

export default function DropDown({ type, data = [] }) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  const isCategory = type === 'Category';

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{type}</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label={type} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => {
                const item = data.find((cat) => cat.id === id);
                return item ? <Chip key={id} label={isCategory ? item.title : item.country} /> : null;
              })}
            </Box>
          )}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {isCategory ? item.title : item.country}
            </MenuItem>
          ))}
          <MenuItem onClick={() => setOpen(true)}>
            + Add New {type}
          </MenuItem>
        </Select>
      </FormControl>

      {/* Dialog for Adding New Item */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New {type}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`${type} Name`}
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
