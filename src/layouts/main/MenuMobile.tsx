import { Icon } from '@iconify/react';
import { useState, useEffect, ReactNode } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Drawer,
  Collapse,
  LinkProps,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
} from '@mui/material';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
//
import { MenuProps, MenuItemProps } from './MainNavbar';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

type StyleProps = LinkProps & ListItemButtonProps;

// @ts-ignore
interface ListItemStyleProps extends StyleProps {
  component?: ReactNode;
  to?: string;
  end?: boolean;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: ITEM_SIZE,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(PADDING),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
  })
);

// ----------------------------------------------------------------------

type MenuMobileItemProps = {
  item: MenuItemProps;
  isOpen: boolean;
  isActive: boolean;
  onOpen: VoidFunction;
};

function MenuMobileItem({
  item,
  isOpen,
  isActive,
  onOpen,
}: MenuMobileItemProps) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: '92%',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                    'url(/static/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
                '& .MuiListSubheader-root': {
                  pl: PADDING,
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    ml: '6px',
                    mr: '22px',
                    width: 8,
                    height: 2,
                    content: "''",
                    borderRadius: 2,
                    bgcolor: 'currentColor',
                  },
                },
                '& .MuiListItemButton-root': {
                  pl: PADDING,
                  '&:before': { display: 'none' },
                  '&.active': { color: 'primary.main', bgcolor: 'transparent' },
                },
                '& .MuiListItemIcon-root': {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  '&:before': {
                    width: 4,
                    height: 4,
                    content: "''",
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                  },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  return (
    (<NextLink key={title} href={path} legacyBehavior>
      <ListItemStyle
        sx={{
          ...(isActive && {
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              ),
          }),
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </NextLink>)
  );
}

export default function MenuMobile({ isOffset, isHome, navConfig }: MenuProps) {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (<>
    <MIconButton
      onClick={handleDrawerOpen}
      sx={{
        ml: 1,
        ...(isHome && { color: 'common.white' }),
        ...(isOffset && { color: 'text.primary' }),
      }}
    >
      <Icon icon={menu2Fill} />
    </MIconButton>
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { pb: 5, width: 260 } }}
    >
      <Scrollbar>
        <Box sx={{ display: 'inline-flex' }}>
          <NextLink href='/' legacyBehavior>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </NextLink>
        </Box>

        <List disablePadding>
          {navConfig.map((link) => (
            <MenuMobileItem
              key={link.title}
              item={link}
              isOpen={open}
              onOpen={handleOpen}
              isActive={pathname === link.path}
            />
          ))}
        </List>
      </Scrollbar>
    </Drawer>
  </>);
}
