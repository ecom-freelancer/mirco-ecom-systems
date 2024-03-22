import { Injectable } from '@nestjs/common';
import { CustomerEntity, InjectRepository } from '@packages/nest-mysql';
import { Repository } from 'typeorm';
import { CreateCustomerPayload } from './interfaces/create-customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async checkDuplicatedCustomer({
    email,
    phone,
  }: {
    email?: string;
    phone?: string;
  }): Promise<boolean> {
    const condition = [];
    if (!!email) {
      condition.push({ email });
    }

    if (!!phone) {
      condition.push({ phone });
    }

    return (await this.customerRepository.count({ where: condition })) !== 0;
  }

  async createCustomer(payload: CreateCustomerPayload) {
    const customer = this.customerRepository.create({
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    return await this.customerRepository.save(customer);
  }
}
