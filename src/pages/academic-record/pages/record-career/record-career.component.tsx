import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const RecordCareerPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading
          title="Record según pensum"
          description="Record académico del estudiante según su pensum"
        />
      </Toolbar>
    </Container>
  );
};

export { RecordCareerPage };
