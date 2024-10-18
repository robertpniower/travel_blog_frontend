import React from 'react';
import { TextField } from '@mui/material';

export default function InputField({ label, type = 'text', value = '', onChange, ...props }) {
    return (
        <div style={{ maxHeight: 600, overflow: 'auto' }}> {/* Adjust maxHeight as needed */}
            <TextField
                fullWidth
                margin="normal"
                label={label}
                variant="outlined"
                type={type}
                value={value}
                onChange={onChange}
                multiline // Allows for multiple lines
                minRows={8} // Number of visible rows, adjust as needed
                {...props}
            />
        </div>
    );
}
