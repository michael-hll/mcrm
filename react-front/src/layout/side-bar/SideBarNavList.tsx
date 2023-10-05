import { FunctionComponent, MouseEventHandler } from 'react';
import List from '@mui/material/List';
import SideBarNavItem from './SideBarNavItem';
import { LinkToPage } from '../../utils/type';
import useAppStore from '../../store/AppStore';
import { NONAME } from 'dns';

interface Props {
  items: Array<LinkToPage>;
  showIcons?: boolean;
  onClick?: MouseEventHandler;
}

/**
 * Renders list of Navigation Items inside SideBar
 * @component SideBarNavList
 * @param {array} items - list of objects to render as navigation items
 * @param {boolean} [showIcons] - icons in navigation items are visible when true
 * @param {function} [onAfterLinkClick] - optional callback called when some navigation item was clicked
 */
const SideBarNavList: FunctionComponent<Props> = ({ items, showIcons, onClick, ...restOfProps }) => {
  const hasLogin = useAppStore(s => s.isAuthenticated);

  return (
    <List component="nav" {...restOfProps}>
      {items.map(({ icon, path, title }) => {
        if (hasLogin && (title === 'Log In' || title === 'Sign Up')) {
          return null;
        }else{
          return <SideBarNavItem key={`${title}-${path}`} icon={showIcons ? icon : undefined} path={path} title={title} onClick={onClick} />
        }
      })}
    </List>
  );
};

export default SideBarNavList;
