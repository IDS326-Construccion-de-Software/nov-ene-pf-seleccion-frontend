'use client';

import { useState } from 'react';
import { Container } from '@/components';
import { Toolbar, ToolbarHeading } from '@/layouts/applayout/toolbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const SupportCenterPage = () => {
  const [subjects, setSubjects] = useState<string[]>(['']);
  const [reason, setReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');

  const careers = ['IDS', 'IND', 'ICS', 'INS', 'IEE', 'IME', 'ICF'];
  const availableSubjects = [
    'CBM201 - Matemáticas',
    'CBM301 - Física',
    'CBM302 - Química',
    'IDS201 - Programación',
    'INS371 - Base de Datos',
    'IDS342 - Algoritmos'
  ];

  const requestReasons = [
    { value: 'schedule', label: 'Conflicto de horario entre asignaturas' },
    { value: 'quota', label: 'Falta de cupo en sección' },
    { value: 'withdrawal', label: 'Baja involuntaria de asignatura' },
    { value: 'notfound', label: 'No aparece la asignatura' },
    { value: 'other', label: 'Otro' }
  ];


  const handleOtherReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 255);
    setOtherReason(value);
  };

  const handleReasonChange = (value: string) => {
    setReason(value);
    if (value !== 'other') {
      setOtherReason('');
    }
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    if (subjects.length < 5) {
      setSubjects([...subjects, '']);
    }
  };

  const handleRemoveSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects.length === 0 ? [''] : newSubjects);
  };

  const handleReset = () => {
    setSubjects(['']);
    setReason('');
    setOtherReason('');
  };

  const isFormValid = () => {
    const validSubjects = subjects.filter(s => s.trim());
    if (validSubjects.length === 0 || !reason) {
      return false;
    }
    if (reason === 'other' && !otherReason.trim()) {
      return false;
    }
    return true;
  };

  const handleCreateTicket = () => {
    if (isFormValid()) {
      const validSubjects = subjects.filter(s => s.trim());
      console.log({
        subjects: validSubjects,
        reason,
        otherReason: reason === 'other' ? otherReason : null
      });
      // Aquí iría la lógica para crear el ticket
    }
  };

  return (
    <Container>
      <Toolbar>
        <ToolbarHeading title="Ayuda" description="Centro de soporte y ayuda" />
      </Toolbar>

      <div className="mt-6 p-6 bg-white rounded-lg shadow">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

          {/* Listado de asignaturas */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Asignaturas</Label>
              <span className="text-xs text-gray-500">{subjects.filter(s => s.trim()).length}/5</span>
            </div>
            <div className="space-y-2">
              {subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <Select value={subject} onValueChange={(value) => handleSubjectChange(index, value)}>
                      <SelectTrigger id={`subject-${index}`}>
                        <SelectValue placeholder="Selecciona una asignatura" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {subjects.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveSubject(index)}
                      className="px-3 py-2 h-10"
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {subjects.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddSubject}
                className="w-full mt-2"
              >
                + Agregar asignatura
              </Button>
            )}
          </div>

          {/* Botones de motivo de solicitud */}
          <div className="space-y-3">
            <Label>Motivo de solicitud</Label>
            <div className="space-y-2">
              {requestReasons.map((item) => (
                <div key={item.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`reason-${item.value}`}
                    name="request-reason"
                    value={item.value}
                    checked={reason === item.value}
                    onChange={() => handleReasonChange(item.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor={`reason-${item.value}`}
                    className="ml-2 text-sm cursor-pointer font-medium"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Textarea de otro motivo */}
          {reason === 'other' && (
            <div className="space-y-2">
              <Textarea
                id="other-reason"
                placeholder="Explique el problema..."
                value={otherReason}
                onChange={handleOtherReasonChange}
                className="w-full min-h-32 resize-none"
              />
              <p className="text-xs text-gray-500">{otherReason.length}/255 caracteres</p>
            </div>
          )}

          {/* Botones de cancelar y Enviar */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleCreateTicket}
              disabled={!isFormValid()}
              className="flex-1 text-white font-medium"
              style={{
                backgroundColor: isFormValid() ? '#E4022B' : '#cccccc',
                cursor: isFormValid() ? 'pointer' : 'not-allowed'
              }}
            >
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export { SupportCenterPage };
