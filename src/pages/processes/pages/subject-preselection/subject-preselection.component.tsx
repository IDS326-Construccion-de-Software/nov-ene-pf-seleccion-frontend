import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const SubjectPreselectionPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading
          title="Preselección de asignaturas"
          description="Página para preseleccionar asignaturas"
        />
      </Toolbar>
    </Container>
  );
};

export { SubjectPreselectionPage };
