import { Fragment, useEffect, useState } from 'react';
import { useResponsive } from '@/hooks';
import { KeenIcon } from '@/components';
import { TMenuConfig, MenuItem, MenuLink, MenuTitle, MenuArrow, Menu } from '@/components/menu';
import {
  MegaMenuSubProfiles,
  // MegaMenuSubAccount,
  MegaMenuSubNetwork,
  MegaMenuSubAuth,
  MegaMenuSubHelp
} from '@/partials/menu/mega-menu';
import { useAppLayout } from '../AppLayoutProvider';
import { MENU_MEGA } from '@/config';
import { useLanguage } from '@/i18n';

const MegaMenuInner = () => {
  const desktopMode = useResponsive('up', 'lg');
  const { isRTL } = useLanguage();
  const [disabled, setDisabled] = useState(true); // Initially set disabled to true
  const { layout, sidebarMouseLeave, setMegaMenuEnabled } = useAppLayout();

  // Change disabled state to false after a certain time (e.g., 5 seconds)
  useEffect(() => {
    setDisabled(true);

    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1000); // 1000 milliseconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [layout.options.sidebar.collapse, sidebarMouseLeave]);

  useEffect(() => {
    setMegaMenuEnabled(true);
  });

  const build = (items: TMenuConfig) => {
    // Filtrar elementos válidos (que tengan title y path o children)
    const filteredItems = items.filter((item) => item && item.title && (item.path || item.children));
    const linkClass =
      'menu-link text-sm text-gray-700 font-medium menu-link-hover:text-primary menu-item-active:text-gray-900 menu-item-show:text-primary menu-item-here:text-gray-900';
    const titleClass = 'text-nowrap';

    // Mapeo dinámico de los menús principales
    return (
      <Fragment>
        {filteredItems.map((item, idx) => {
          // Determinar el submenú a renderizar según el título
          let submenu = null;
          if (item.title?.toLowerCase().includes('profile')) {
            submenu = MegaMenuSubProfiles(items);
          } else if (item.title?.toLowerCase().includes('network')) {
            submenu = MegaMenuSubNetwork(items);
          } else if (item.title?.toLowerCase().includes('auth')) {
            submenu = MegaMenuSubAuth(items);
          } else if (item.title?.toLowerCase().includes('help')) {
            submenu = MegaMenuSubHelp(items);
          }

          return (
            <MenuItem
              key={item.title || idx}
              toggle={desktopMode ? 'dropdown' : 'accordion'}
              trigger={desktopMode ? 'hover' : 'click'}
              dropdownProps={{
                placement: isRTL() ? 'bottom-end' : 'bottom-start',
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: isRTL()
                        ? [item.title?.toLowerCase().includes('help') ? 20 : 300, 0]
                        : [item.title?.toLowerCase().includes('help') ? -20 : -300, 0]
                    }
                  }
                ]
              }}
            >
              <MenuLink path={item.path} className={linkClass}>
                <MenuTitle className={titleClass}>{item.title}</MenuTitle>
                {submenu && buildArrow()}
              </MenuLink>
              {submenu}
            </MenuItem>
          );
        })}
      </Fragment>
    );
  };

  const buildArrow = () => {
    return (
      <MenuArrow className="flex lg:hidden text-gray-400">
        <KeenIcon icon="plus" className="text-2xs menu-item-show:hidden" />
        <KeenIcon icon="minus" className="text-2xs hidden menu-item-show:inline-flex" />
      </MenuArrow>
    );
  };

  return (
    <Menu
      multipleExpand={true}
      disabled={disabled}
      highlight={true}
      className="flex-col lg:flex-row gap-5 lg:gap-7.5 p-5 lg:p-0"
    >
      {build(MENU_MEGA)}
    </Menu>
  );
};

export { MegaMenuInner };
