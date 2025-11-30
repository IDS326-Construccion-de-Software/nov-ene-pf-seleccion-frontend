import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
const FinancialAccountOverviewPage = () => {
  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Cuenta Financiera" description="Resumen de la cuenta financiera" />
      </Toolbar>
    </Container>
  );
};

export { FinancialAccountOverviewPage };
