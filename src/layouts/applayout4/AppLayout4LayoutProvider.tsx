import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MENU_SIDEBAR } from '@/config';
import { useMenus } from '@/providers';
import { ILayoutConfig, useLayout } from '@/providers';
import { deepMerge } from '@/utils';
import { AppLayout4Config } from '.';
import { useMenuChildren } from '@/components';
import { useLocation } from 'react-router';

// Interface defining the properties of the layout provider context
export interface IAppLayout4ProviderProps {
  layout: ILayoutConfig; // The layout configuration object
  mobileSidebarOpen: boolean; // Whether the mobile sidebar is open
  setMobileSidebarOpen: (open: boolean) => void; // Function to toggle the mobile sidebar
}

// Initial layout provider properties, using Demo4 layout configuration as the default
const initalLayoutProps: IAppLayout4ProviderProps = {
  layout: AppLayout4Config, // Default layout configuration
  mobileSidebarOpen: false, // Mobile sidebar is closed by default
  setMobileSidebarOpen: (open: boolean) => {
    console.log(`${open}`);
  }
};

// Create a context to manage the layout-related state and logic for Demo4 layout
const AppLayout4Context = createContext<IAppLayout4ProviderProps>(initalLayoutProps);

// Custom hook to access the layout context in other components
const useAppLayout4 = () => useContext(AppLayout4Context);

// Provider component that sets up the layout state and context for Demo4 layout
const AppLayout4Provider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation(); // Gets the current path
  const { setMenuConfig } = useMenus(); // Hook to manage menu configurations
  const { getLayout, setCurrentLayout } = useLayout(); // Hook to get and set layout configuration

  // Merge the Demo4 layout configuration with the current layout configuration fetched via getLayout
  const layoutConfig = deepMerge(AppLayout4Config, getLayout(AppLayout4Config.name));

  // Set the initial state for layout and mobile sidebar
  const [layout] = useState(layoutConfig); // Layout configuration is stored in state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // Manage state for mobile sidebar

  // Set the menu configuration for the primary menu using the provided MENU_SIDEBAR configuration
  setMenuConfig('primary', MENU_SIDEBAR);
  const secondaryMenu = useMenuChildren(pathname, MENU_SIDEBAR, 0); // Retrieves the secondary menu
  setMenuConfig('secondary', secondaryMenu);

  // When the layout state changes, set the current layout configuration in the layout provider
  useEffect(() => {
    setCurrentLayout(layout); // Update the current layout in the global layout state
  }, [layout, setCurrentLayout]); // Re-run this effect if layout or setCurrentLayout changes

  // Provide the layout state, sticky header state, and sidebar state to children components via context
  return (
    <AppLayout4Context.Provider
      value={{
        layout, // The current layout configuration
        mobileSidebarOpen, // Whether the mobile sidebar is currently open
        setMobileSidebarOpen // Function to toggle the mobile sidebar state
      }}
    >
      {children} {/* Render child components that consume this context */}
    </AppLayout4Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppLayout4Provider, useAppLayout4 };
