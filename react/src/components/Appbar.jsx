import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';


function ResponsiveAppBar() {
  const {user} = useContext(AuthContext)
  
  return (
    <AppBar className='bg-white w-full' position="static">
      <div className='w-full'>
        <Toolbar className='flex justify-between bg-white w-full text-secondary'>
          
          <div className='grid place-items-center h-fit'>
            <img src={'/logo512.png'} alt='' width={65} height={50}/>
          </div>

          <Typography variant='h6'>
            {user?.name }
          </Typography>

        </Toolbar>
      </div>

    </AppBar>
  );
}
export default ResponsiveAppBar;