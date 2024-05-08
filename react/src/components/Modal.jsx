import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CloseSharp } from '@mui/icons-material';
import AddBook from './Add/AddBook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '60vw',
  borderRadius: '20px',
  // height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TransitionsModal = ({ open, onClose, data, type }) => {
  React.useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 }}}
      >
        <Fade in={open} className='text-black'>
          <Box sx={style}>
            <div className='flex mb-4 flex-row-reverse w-full'>
              <CloseSharp className='relative right-0 hover:text-primary cursor-pointer' onClick={onClose} />
            </div>

            {type === 'Books' && <AddBook open={open} setOpen={onclose} data={data}/>}

          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;