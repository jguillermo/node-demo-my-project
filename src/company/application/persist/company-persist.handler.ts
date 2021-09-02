import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompanyPersistService } from './company-persist.service';
import { CompanyPersistDto } from './company-persist.dto';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddressStreet } from '../../domain/company-address/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address/company-address-number';
import { CompanyAddress } from '../../domain/company-address/company-address';

@CommandHandler(CompanyPersistDto)
export class CompanyPersistHandler implements ICommandHandler<CompanyPersistDto> {
  constructor(private service: CompanyPersistService) {}

  async execute(dto: CompanyPersistDto): Promise<void> {
    const id = new CompanyId(dto.id);
    const name = new CompanyName(dto.name);
    const addressStreet = new CompanyAddressStreet(dto.addressStreet);
    const addressNumber = new CompanyAddressNumber(dto.addressNumber);
    const address = new CompanyAddress(addressNumber, addressStreet);

    await this.service.execute(id, name, address);
  }
}
