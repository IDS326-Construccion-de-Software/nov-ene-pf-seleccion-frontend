import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/applayout/toolbar';
import { AppLayoutLightSidebarContent } from './';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import EmblaCarousel from '@/components/EmblaCarousel';
import { toAbsoluteUrl } from '@/utils';

const AppLayoutLightSidebarPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 310),
    to: addDays(new Date(2026, 0, 11), 20)
  });

  return (
    <Fragment>
      <Container>
        <EmblaCarousel
          slides={[
            toAbsoluteUrl('/media/emblaCarrusel/banner-web-rector-2025-v3-e70fc06d.webp'),
            toAbsoluteUrl('/media/emblaCarrusel/postgrado-2026-febrero-banner.webp'),
            toAbsoluteUrl('/media/emblaCarrusel/grado-febrero-2026.webp')
          ]}
          options={{ loop: true }}
        />
        <Toolbar>
          <ToolbarHeading title="Dashboard" description="Cuadro de mando integral académico" />
          <ToolbarActions>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  id="date"
                  className={cn(
                    'btn btn-sm btn-light data-[state=open]:bg-light-active',
                    !date && 'text-gray-400'
                  )}
                >
                  <KeenIcon icon="calendar" className="me-0.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Selecciona un rango de fechas</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </ToolbarActions>
        </Toolbar>
      </Container>

      <Container>
        <AppLayoutLightSidebarContent />
      </Container>
    </Fragment>
  );
};

export { AppLayoutLightSidebarPage };
