import React, { useState, useEffect } from 'react';
import { KeenIcon } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type FilterData = {
  searchTerm: string;
  tipoAsignatura: string;
  modalidad: string;
  soloDisponibles: boolean;
  periodo: string;
};

const SubjectPreselectionFilters = ({
  onFilterChange
}: {
  onFilterChange: (data: FilterData) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoAsignatura, setTipoAsignatura] = useState('all');
  const [modalidad, setModalidad] = useState('all');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [periodo, setPeriodo] = useState('all');

  const handleClearFilters = () => {
    setSearchTerm('');
    setTipoAsignatura('all');
    setModalidad('all');
    setSoloDisponibles(false);
    setPeriodo('all');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({
        searchTerm,
        tipoAsignatura: tipoAsignatura === 'all' ? '' : tipoAsignatura,
        modalidad: modalidad === 'all' ? '' : modalidad,
        soloDisponibles,
        periodo: periodo === 'all' ? '' : periodo
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, tipoAsignatura, modalidad, soloDisponibles, periodo, onFilterChange]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <KeenIcon
            icon="magnifier"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            className="pl-10 w-full hover:border-gray-400 focus:border-gray-500 focus-visible:ring-gray-500"
            placeholder="Buscar por código, nombre o profesor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">

          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <KeenIcon icon="filter" />
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="hidden md:flex items-center gap-2"
          >
            <KeenIcon icon="trash" /> Limpiar filtros
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Select value={modalidad} onValueChange={setModalidad}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Todas las modalidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las modalidades</SelectItem>
              <SelectItem value="0">Presencial</SelectItem>
              <SelectItem value="1">Virtual</SelectItem>
              <SelectItem value="2">Híbrida</SelectItem>
            </SelectContent>
          </Select>

          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Todos los trimestres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los trimestres</SelectItem>
              {Array.from({ length: 14 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Trimestre {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tipoAsignatura} onValueChange={setTipoAsignatura}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos de asignaturas</SelectItem>
              <SelectItem value="0">Teoría</SelectItem>
              <SelectItem value="1">Laboratorio</SelectItem>
              <SelectItem value="2">Electiva</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-2 px-2 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg w-full sm:w-auto">
          <span className="text-sm text-gray-600 whitespace-nowrap">Mostrar solo disponibles</span>
          <Switch
            checked={soloDisponibles}
            onCheckedChange={setSoloDisponibles}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </div>
    </div>
  );
};

export { SubjectPreselectionFilters };
