import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const QualificationPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading
          title="Calificaciones"
          description="Calificaciones obtenidas por el estudiante"
        />
      </Toolbar>
    </Container>
  );
};

export { QualificationPage };
