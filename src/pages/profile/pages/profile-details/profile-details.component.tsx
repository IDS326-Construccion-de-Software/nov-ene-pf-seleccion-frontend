import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
import { KeenIcon } from '@/components';
import { PersonalInfo, InfoStudent } from '../blocks';

const ProfileDetailsPage = () => {
  return (
    <Container width="fluid">
      <Toolbar>
        <ToolbarHeading title="Perfil" description="Información del perfil" />
        <div className="flex gap-2">
          <button className="btn btn-sm btn-primary gap-2">
            <KeenIcon icon="lock" className="text-base" />
            Cambiar contraseña
          </button>
          <button
            disabled
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <KeenIcon icon="medal-star" className="text-base" />
            Solicitar graduación
          </button>
        </div>
      </Toolbar>

      <div className="grid gap-5 mb-6 lg:grid-cols-2">
        <InfoStudent />
        <PersonalInfo />
      </div>
    </Container>
  );
};

export { ProfileDetailsPage };
