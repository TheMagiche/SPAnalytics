import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
// import personFill from '@iconify/icons-eva/person-fill';
// import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import NextLink from 'next/link';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Avatar,
  Button,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import router from 'next/router';

const MENU_OPTIONS = [
  { label: 'Home', icon: homeFill, linkTo: '/' },
  // { label: 'Profile', icon: personFill, linkTo: '#' },
  // { label: 'Settings', icon: settings2Fill, linkTo: '#' },
];

export default function AccountPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <MIconButton
      ref={anchorRef}
      onClick={handleOpen}
      sx={{
        padding: 0,
        width: 44,
        height: 44,
        ...(open && {
          '&:before': {
            zIndex: 1,
            content: "''",
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          },
        }),
      }}
    >
      <Avatar
        alt='My Avatar'
        src='/static/mock-images/avatars/avatar_default.jpg'
      />
    </MIconButton>
    <MenuPopover
      open={open}
      onClose={handleClose}
      anchorEl={anchorRef.current}
      sx={{ width: 220 }}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant='subtitle1' noWrap>
          Admin
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
          admin@email.com
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {MENU_OPTIONS.map((option) => (
        <NextLink key={option.label} href={option.linkTo} legacyBehavior>
          <MenuItem
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        </NextLink>
      ))}

      <Box sx={{ p: 2, pt: 1.5 }}>
        <Button onClick={() => router.push('/')} fullWidth color='inherit' variant='outlined'>
          Logout
        </Button>
      </Box>
    </MenuPopover>
  </>);
}
