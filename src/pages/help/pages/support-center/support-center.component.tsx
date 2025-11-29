import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const SupportCenterPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Ayuda" description="Centro de soporte y ayuda" />
      </Toolbar>
    </Container>
  );
};

export { SupportCenterPage };
