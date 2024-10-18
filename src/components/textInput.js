import React from 'react';
import { TextField } from '@mui/material';

export default function InputField({ label, type = 'text', value = '', onChange, ...props }) {
    return (
        <div style={{ maxHeight: 600, overflow: 'auto' }}> 
            <TextField
                fullWidth
                margin="normal"
                label={label}
                variant="outlined"
                type={type}
                value={value}
                onChange={onChange}
                multiline 
                minRows={8} 
                {...props}
            />
        </div>
    );
}
