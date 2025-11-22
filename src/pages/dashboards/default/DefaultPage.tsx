import { useLayout } from '@/providers';
import { AppLayoutLightSidebarPage, AppLayout2Page, AppLayout3Page, AppLayout4Page, AppLayout5Page } from '../';

const DefaultPage = () => {
  const { currentLayout } = useLayout();

  if (currentLayout?.name === 'applayout-layout') {
    return <AppLayoutLightSidebarPage />;
  } else if (currentLayout?.name === 'applayout2-layout') {
    return <AppLayout2Page />;
  } else if (currentLayout?.name === 'applayout3-layout') {
    return <AppLayout3Page />;
  } else if (currentLayout?.name === 'applayout4-layout') {
    return <AppLayout4Page />;
  } else if (currentLayout?.name === 'demo5-layout') {
    return <AppLayout5Page />;
  } else if (currentLayout?.name === 'demo6-layout') {
    return <AppLayout4Page />;
  } else if (currentLayout?.name === 'demo7-layout') {
    return <AppLayout2Page />;
  } else if (currentLayout?.name === 'demo8-layout') {
    return <AppLayout4Page />;
  } else if (currentLayout?.name === 'demo9-layout') {
    return <AppLayout2Page />;
  } else if (currentLayout?.name === 'demo10-layout') {
    return <AppLayout3Page />;
  }
};

export { DefaultPage };
