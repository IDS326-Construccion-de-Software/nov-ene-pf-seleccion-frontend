import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAuthContext } from '@/auth';
import { useLanguage } from '@/i18n';
import { toAbsoluteUrl } from '@/utils';
import { useSettings } from '@/providers/SettingsProvider';
import { KeenIcon } from '@/components';
import * as authService from '@/services/auth/auth.service';
import { MenuItem, MenuLink, MenuSub, MenuTitle, MenuSeparator, MenuIcon } from '@/components/menu';
import { UserData } from '@/interfaces/user';

const DropdownUser = () => {
  const { settings, storeSettings } = useSettings();
  const { logout, auth } = useAuthContext();
  const { isRTL } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth?.access_token) {
          const user = await authService.getMe(auth.access_token);
          setUserData(user as unknown as UserData);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth?.access_token]);

  const handleThemeMode = (event: ChangeEvent<HTMLInputElement>) => {
    const newThemeMode = event.target.checked ? 'dark' : 'light';

    storeSettings({
      themeMode: newThemeMode
    });
  };

  const buildHeader = () => {
    if (loading || !userData) {
      return (
        <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full border-2 border-primary bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <span className="badge badge-xs badge-gray"></span>
        </div>
      );
    }

    const nombreCompleto = `${userData.nombre || userData.nombreUsuario || 'Usuario'} ${userData.apellido || ''}`;
    const correo =
      userData.correoInstitucional || userData.correoPersonal || 'sin-email@ejemplo.com';
    const idUsuario = userData.idUsuario || userData.usuarioId || 'N/A';
    const estatus = userData.estatus || 'Desconocido';
    const estilosActivo = estatus === 'Activo' ? 'badge-success' : 'badge-danger';

    return (
      <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
        <div className="flex items-center gap-2">
          <img
            className="size-9 rounded-full border-2 border-primary"
            src={toAbsoluteUrl('/media/avatars/blank.png')}
            alt={nombreCompleto}
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-gray-800 hover:text-primary font-semibold leading-none">
              {nombreCompleto}
            </span>
            <a className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
              <span className="font-bold">ID:</span> {idUsuario}
            </a>
          </div>
        </div>
        <span className={`badge badge-xs ${estilosActivo} badge-outline`}>{estatus}</span>
      </div>
    );
  };

  const buildMenu = () => {
    return (
      <Fragment>
        <MenuSeparator />
        <div className="flex flex-col">
          <MenuItem>
            <MenuLink path="/profile/details">
              <MenuIcon>
                <KeenIcon icon="profile-circle" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.MY_PROFILE" />
              </MenuTitle>
            </MenuLink>
          </MenuItem>
          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? 'left-start' : 'right-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [50, 0] : [-50, 0] // [skid, distance]
                  }
                }
              ]
            }}
          ></MenuItem>
          {/* <MenuItem>
            <MenuLink path="https://devs.keenthemes.com">
              <MenuIcon>
                <KeenIcon icon="message-programming" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.DEV_FORUM" />
              </MenuTitle>
            </MenuLink>
          </MenuItem> */}
          {/* <DropdownUserLanguages menuItemRef={menuItemRef} /> */}
          <MenuSeparator />
        </div>
      </Fragment>
    );
  };

  const buildFooter = () => {
    return (
      <div className="flex flex-col">
        {/* <div className="menu-item mb-0.5">
          <div className="menu-link">
            <span className="menu-icon">
              <KeenIcon icon="moon" />
            </span>
            <span className="menu-title">
              <FormattedMessage id="USER.MENU.DARK_MODE" />
            </span>
            <label className="switch switch-sm">
              <input
                name="theme"
                type="checkbox"
                checked={settings.themeMode === 'dark'}
                onChange={handleThemeMode}
                value="1"
              />
            </label>
          </div>
        </div> */}

        <div className="menu-item px-4 py-1.5">
          <a onClick={logout} className="btn btn-sm btn-light justify-center">
            <FormattedMessage id="USER.MENU.LOGOUT" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <MenuSub
      className="menu-default light:border-gray-300 w-[200px] md:w-[250px]"
      rootClassName="p-0"
    >
      {buildHeader()}
      {buildMenu()}
      {buildFooter()}
    </MenuSub>
  );
};

export { DropdownUser };
