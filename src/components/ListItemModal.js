import React, { useState } from 'react';
import { ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const ListItemWithModal = ({ primaryText, modalComponent: Modal, isEdit, modalProps }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItemButton sx={{ marginBottom: 2 }}>
        <ListItemText primary={primaryText} />
        <ListItemIcon>
          <IconButton onClick={handleOpen}>
            <ModeEditOutlineOutlinedIcon color="success" />
          </IconButton>
        </ListItemIcon>
      </ListItemButton>
      <Modal open={open} onClose={handleClose} isEdit={isEdit} {...modalProps} />
    </>
  );
};

export default ListItemWithModal;
