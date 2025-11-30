import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const ProfileDetailsPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Perfil" description="Información del perfil" />
      </Toolbar>
    </Container>
  );
};

export { ProfileDetailsPage };
