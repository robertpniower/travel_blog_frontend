import React, { useState } from 'react';
import {
    Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput
} from '@mui/material';

export default function MultiSelectDropDown({
    type,
    data = [],
    multiple = false,
    ModalComponent,
    modalProps = {}
}) {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false); // Use 'open' for consistency

    const isCategory = type === 'Category';

    const handleChange = (event) => {
        const { target: { value } } = event;
        setSelected(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>{type}</InputLabel>
                <Select
                    multiple={multiple}
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label={type} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {Array.isArray(selected) ? selected.map((id) => {
                                const item = data.find((item) => item.id === id);
                                return item ? <Chip key={id} label={isCategory ? item.title : item.city_name} /> : null;
                            }) : (
                                data.find((item) => item.id === selected)?.[isCategory ? 'title' : 'city_name']
                            )}
                        </Box>
                    )}
                >
                    {data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {isCategory ? item.title : item.city_name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={() => {
                        console.log("Add New clicked"); // Debug to confirm click
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
