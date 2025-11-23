import { type ILayoutConfig } from '@/providers';

// Defining the layout configuration specific to AppLayout2
const AppLayout2LayoutConfig: ILayoutConfig = {
  name: 'applayout2-layout', // Unique name identifier for this layout
  options: {
    header: {
      stickyOffset: 200 // Offset value (in pixels) that determines when the header becomes sticky on scroll
    }
  }
};

export { AppLayout2LayoutConfig };
