import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateRepositoryDTO from '../dtos/ICreateRepositoryDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateRepositoryDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
