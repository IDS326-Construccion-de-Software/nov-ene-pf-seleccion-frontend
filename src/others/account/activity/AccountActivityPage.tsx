import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { PageNavbar } from '@/others/account';

import { useLayout } from '@/providers';

const AccountActivityPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'applayout-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Central Hub for Personal Customization</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Privacy Settings
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container></Container>
    </Fragment>
  );
};

export { AccountActivityPage };
