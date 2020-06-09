import { uuid } from 'uuidv4';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateRepositoryDTO from '@modules/appointments/dtos/ICreateRepositoryDTO';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateRepositoryDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(currentAppointment =>
      isEqual(currentAppointment.date, date),
    );
    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );
    return appointments;
  }
}
export default AppointmentsRepository;
