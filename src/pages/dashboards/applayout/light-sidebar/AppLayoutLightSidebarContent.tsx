import { EarningsChart, Highlights, TeamMeeting, Teams } from './blocks';

const AppLayoutLightSidebarContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <Highlights limit={3} />
        </div>

        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <TeamMeeting />
        </div>

        <div className="lg:col-span-2">
          <Teams />
        </div>
      </div>
    </div>
  );
};

export { AppLayoutLightSidebarContent };
