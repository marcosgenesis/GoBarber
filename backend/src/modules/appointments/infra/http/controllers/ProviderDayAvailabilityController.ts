import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ProviderDayAviabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ProviderDayAviabilityService,
    );
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(availability);
  }
}
