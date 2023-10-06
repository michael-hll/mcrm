import { Stack } from "@mui/material"
import React, { PropsWithChildren, useCallback, useState } from "react"
import { useEventSwitchDarkMode, useOnMobile } from "../hooks";
import useAppStore from "../store/AppStore";
import { BOTTOM_BAR_DESKTOP_VISIBLE, TOP_BAR_DESKTOP_HEIGHT, TOP_BAR_MOBILE_HEIGHT } from "./config";
import { LinkToPage } from "../utils/type";
import TopBar from "./TopBar/TopBar";
import AppIconButton from "../components/AppIconButton/AppIconButton";
import SideBar from "./SideBar/SideBar";
import ErrorBoundary from "../components/ErrorBoundary";
import BottomBar from "./BottomBar";

const TITLE_PUBLIC = 'MCRM App';

/**
 * SideBar navigation items with links
 */
const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login',
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup',
  },
  {
    title: 'About',
    path: '/about',
    icon: 'info',
  },
];

if (process.env.REACT_APP_DEBUG === 'true') {
  SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings',
  });
}

/**
 * BottomBar navigation items with links
 */
const BOTTOM_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login',
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup',
  },
  {
    title: 'About',
    path: '/about',
    icon: 'info',
  },
];

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const onMobile = useOnMobile();
  const onSwitchDarkMode = useEventSwitchDarkMode();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const store = useAppStore();
  const bottomBarVisible = onMobile || BOTTOM_BAR_DESKTOP_VISIBLE;

  // Variant 1 - Sidebar is static on desktop and is a drawer on mobile
  // const sidebarOpen = onMobile ? sideBarVisible : true;
  // const sidebarVariant = onMobile ? 'temporary' : 'persistent';

  // Variant 2 - Sidebar is drawer on mobile and desktop
  const sidebarOpen = sideBarVisible;
  const sidebarVariant = 'temporary';

  const title = TITLE_PUBLIC;
  document.title = title; // Also Update Tab Title

  const onSideBarOpen = useCallback(() => {
    if (!sideBarVisible) setSideBarVisible(true); // Don't re-render Layout when SideBar is already open
  }, [sideBarVisible]);

  const onSideBarClose = useCallback(() => {
    if (sideBarVisible) setSideBarVisible(false); // Don't re-render Layout when SideBar is already closed
  }, [sideBarVisible]);

  return (
    <Stack
    sx={{
      minHeight: '100vh', // Full screen height
      paddingTop: onMobile ? TOP_BAR_MOBILE_HEIGHT : TOP_BAR_DESKTOP_HEIGHT,
    }}

    >
      <Stack component="header">

        <TopBar
          startNode={<AppIconButton icon="logo" onClick={onSideBarOpen} />}
          title={title}
          endNode={
            <AppIconButton
              icon={store.darkMode ? 'day' : 'night'} // Variant 1
              // icon="daynight" // Variant 2
              title={store.darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
              onClick={onSwitchDarkMode}
            />
          }
        />

        <SideBar
          anchor="left"
          open={sidebarOpen}
          variant={sidebarVariant}
          items={SIDE_BAR_ITEMS}
          onClose={onSideBarClose}
        />
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1, // Takes all possible space
          padding: 1,
        }}
      >
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Stack>

      <Stack component="footer">{bottomBarVisible && <BottomBar items={BOTTOM_BAR_ITEMS} />}</Stack>
    </Stack>
  );
};

export default DefaultLayout;