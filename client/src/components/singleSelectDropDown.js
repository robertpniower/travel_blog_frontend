import React, { useState } from 'react';
import {
    Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput
} from '@mui/material';
import AddCountryModal from './addCountryModal';

export default function SingleSelectDropDown({ type, data = [], sendData }) {
    const [selected, setSelected] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const isCountry = type === 'Country';

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelected(value);
        if (sendData) {
            sendData(value);
        }
    };


    const handleClick = (item) => {
        if (sendData) {
            sendData(item);
        }
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
                            {isCountry ? item.country : item.city_name} {/* Ensure this correctly maps to your country data */}
                        </MenuItem>
                    ))}

                    <MenuItem onClick={() => setOpenModal(true)}>
                        + Add New {type}
                    </MenuItem>
                </Select>
            </FormControl>

            <AddCountryModal openModal={openModal} setOpenModal={setOpenModal} type={type} />
        </Box>
    );
}
