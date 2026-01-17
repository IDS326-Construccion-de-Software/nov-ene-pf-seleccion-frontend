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
  const [studentId, setStudentId] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');

  const careers = ['IDS', 'IND', 'ICS', 'INS', 'IEE', 'IME', 'ICF'];
  const subjects = [
    'CBM201 - Matemáticas',
    'CBM301 - Física',
    'CBM302 - Química',
    'IDS201 - Programación',
    'INS371 - Base de Datos',
    'IDS342 - Algoritmos'
  ];

  const requestReasons = [
    { value: 'schedule', label: 'Conflicto de horario entre asignaturas' },
    { value: 'quota', label: 'Falta de cupo en una sección' },
    { value: 'withdrawal', label: 'Baja involuntaria de asignatura' },
    { value: 'notfound', label: 'No aparece la asignatura' },
    { value: 'other', label: 'Otro' }
  ];

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 7);
    setStudentId(value);
  };

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

  const handleReset = () => {
    setStudentId('');
    setSubject('');
    setReason('');
    setOtherReason('');
  };

  const isFormValid = () => {
    if (studentId.length !== 7 || !subject || !reason) {
      return false;
    }
    if (reason === 'other' && !otherReason.trim()) {
      return false;
    }
    return true;
  };

  const handleCreateTicket = () => {
    if (isFormValid()) {
      console.log({
        studentId,
        subject,
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
          {/* Student ID Input */}
          <div className="space-y-2">
            <Label htmlFor="student-id">ID de Estudiante</Label>
            <Input
              id="student-id"
              type="text"
              inputMode="numeric"
              maxLength={7}
              value={studentId}
              onChange={handleStudentIdChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500">{studentId.length}/7 caracteres</p>
          </div>

          {/* Subject Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="subject">Asignatura</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Selecciona una asignatura" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Request Reason Radio Buttons */}
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

          {/* Other Reason Textarea */}
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

          {/* Buttons */}
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
