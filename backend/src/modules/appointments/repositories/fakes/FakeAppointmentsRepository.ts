import { uuid } from 'uuidv4';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateRepositoryDTO from '@modules/appointments/dtos/ICreateRepositoryDTO';
import { isEqual } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(currentAppointment =>
      isEqual(currentAppointment.date, date),
    );
    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateRepositoryDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);
    return appointment;
  }
}
export default AppointmentsRepository;
