import React, { useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';

export default function SingleSelectDropDown({ 
    type,
    data = [],
    sendData,
    ModalComponent,
    modalProps = {}
}) {
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false); 

    const isCountry = type === 'Country';

    const handleChange = (event) => {
        const { value } = event.target;
        setSelected(value);
        if (sendData) {
            sendData(value); 
        }
    };

    const handleAddNew = () => {
        setOpen(true); 
    };

    return (
        <Box sx={{ mt: 3 }}>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>{type}</InputLabel>
                <Select
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label={type} />}
                    renderValue={(selected) => {
                        const item = data.find(i => i.id === selected);
                        return item ? <Chip label={isCountry ? item.country : item.city_name} /> : '';
                    }}
                >
                    {data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {isCountry ? item.country : item.city_name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleAddNew}>
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
