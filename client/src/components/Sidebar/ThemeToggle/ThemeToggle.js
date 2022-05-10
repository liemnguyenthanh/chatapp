import { Box, IconButton, useTheme } from '@mui/material';
import React, { useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../../App';

const ThemeToggle = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'action.hover',
                  },
            }}
            onClick={colorMode.toggleColorMode} 
        >

        <IconButton sx={{ ml: 1, mr: 2 }} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {theme.palette.mode} mode
        </Box>
    );
}

export default ThemeToggle
