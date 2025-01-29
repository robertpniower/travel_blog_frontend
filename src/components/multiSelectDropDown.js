import React, { useState } from 'react';
import {
    Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput
} from '@mui/material';

export default function MultiSelectDropDown({
    type,
    data = [],
    sendData,
    multiple = false,
    ModalComponent,
    modalProps = {}
}) {
    const [selected, setSelected] = useState(multiple ? [] : null);  // Handle multiple vs single selection
    const [open, setOpen] = useState(false);

    const isCategory = type === 'Category';

    const handleChange = (event) => {
        const { value } = event.target;

        if (multiple) {
            // For multiple selections, value is an array of IDs
            const selectedItems = data.filter(item => value.includes(item.id));  // Find full objects
            setSelected(selectedItems);  // Store selected objects
            if (sendData) {
                sendData(selectedItems);  // Send full objects to the parent
                console.log(selectedItems);
            }
        } else {
            // For single selection, value is a single ID
            const selectedItem = data.find(item => item.id === value);  // Find the full object
            setSelected(selectedItem);  // Store the selected object
            if (sendData) {
                sendData(selectedItem);  // Send the full object to the parent
            }
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>{type}</InputLabel>
                <Select
                    multiple={multiple}  // Enables multi-selection for categories
                    value={multiple ? selected.map(item => item.id) : selected ? selected.id : ''}  // Handle single vs multiple values
                    onChange={handleChange}
                    input={<OutlinedInput label={type} />}
                    renderValue={(selected) => {
                        if (multiple) {
                            // Render chips for multiple selections
                            return (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((id) => {
                                        const item = data.find((item) => item.id === id);
                                        return item ? <Chip key={id} label={isCategory ? item.title : item.city_name} /> : null;
                                    })}
                                </Box>
                            );
                        } else {
                            // Render a single selected value
                            const item = data.find((item) => item.id === selected);
                            return item ? (isCategory ? item.title : item.city_name) : '';
                        }
                    }}
                >
                    {data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {isCategory ? item.title : item.city_name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={() => {
                        setOpen(true);
                    }}>
                        + Add New {type}
                    </MenuItem>
                </Select>
            </FormControl>

            {ModalComponent && (
                <ModalComponent open={open} setOpen={setOpen} type={type} {...modalProps} />
            )}
        </Box>
    );
}
