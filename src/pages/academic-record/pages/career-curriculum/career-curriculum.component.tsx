import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const CareerCurriculumPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Pensum de carrera" description="Pensum de carrera del estudiante" />
      </Toolbar>
    </Container>
  );
};

export { CareerCurriculumPage };
