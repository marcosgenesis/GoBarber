import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ProviderMonthAviabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAviability = container.resolve(
      ProviderMonthAviabilityService,
    );
    const availability = await listProviderMonthAviability.execute({
      provider_id,
      month,
      year,
    });
    return response.json(availability);
  }
}
