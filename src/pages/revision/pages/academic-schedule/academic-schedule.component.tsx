import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const AcademicSchedulePage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Horario" description="Horario académico del estudiante" />
      </Toolbar>
    </Container>
  );
};

export { AcademicSchedulePage };
