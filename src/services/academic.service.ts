// Servicios simulados para la integración futura
import type { 
  APIResponse, 
  GradeData, 
  MidtermGradeData, 
  ScheduleData, 
  StudentInfo,
  GradesParams,
  ScheduleParams 
} from '@/types/academic.types';

// Simulación del servicio de calificaciones
export const gradesService = {
  async getGrades(params: GradesParams): Promise<APIResponse<GradeData[] | MidtermGradeData[]>> {
    // TODO: Reemplazar con llamada real al API
    // const response = await fetch(`/api/grades`, { 
    //   method: 'POST',
    //   body: JSON.stringify(params)
    // });
    // return await response.json();
    
    // Por ahora retorna datos mock
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
    
    if (params.type === 'medioTermino') {
      return {
        success: true,
        data: [
          {
            codigo: "ITT-310",
            asignatura: "PROGRAMACION IV",
            creditos: 4,
            seccion: "001",
            parcial1: 85,
            parcial2: 78,
            promedio: 81.5,
            literal: "B+"
          }
          // ... más datos mock
        ]
      };
    } else {
      return {
        success: true,
        data: [
          {
            clave: "CBA203",
            seccion: "01", 
            asignatura: "RESTAURACIÓN ECOLÓGICA",
            calificacion: "B",
            creditos: 2,
            puntos: 6.0
          }
          // ... más datos mock
        ]
      };
    }
  }
};

// Simulación del servicio de horarios
export const scheduleService = {
  async getSchedule(params: ScheduleParams): Promise<APIResponse<ScheduleData[]>> {
    // TODO: Reemplazar con llamada real al API
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: [
        {
          seccion: "ADM315-01",
          asignatura: "ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL",
          creditos: 4,
          profesor: "MARCOS SÁNCHEZ MARTÍNEZ",
          aula: "GC314",
          lunes: "9/11",
          miercoles: "9/11"
        }
        // ... más datos mock
      ]
    };
  }
};

// Simulación del servicio de información del estudiante
export const studentService = {
  async getStudentInfo(studentId: string): Promise<APIResponse<StudentInfo>> {
    // TODO: Reemplazar con llamada real al API
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        id: studentId,
        name: "ISMAEL MARTÍNEZ",
        program: "(IDS 2020) INGENIERÍA DE SOFTWARE (IDS)",
        trimester: "Noviembre 2025 - Enero 2026",
        previousCredits: 114,
        previousPoints: 427.5,
        previousGPA: 3.75
      }
    };
  }
};