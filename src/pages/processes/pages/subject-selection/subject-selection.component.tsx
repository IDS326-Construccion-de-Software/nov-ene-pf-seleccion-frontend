import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const SubjectSelectionPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading
          title="Selección de asignaturas"
          description="Página para seleccionar asignaturas"
        />
      </Toolbar>
    </Container>
  );
};

export { SubjectSelectionPage };
