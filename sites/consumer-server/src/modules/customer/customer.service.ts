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

  async getCustomerByEmail(email: string) {
    return await this.customerRepository.findOne({
      where: { email, isActive: true },
    });
  }

  async getCustomerById(id: string) {
    return await this.customerRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async updateAccount(payload: CustomerEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, email, ...newData } = payload;
    return await this.customerRepository.update({ id }, newData);
  }

  async checkDuplicatedPhoneWithOther(id: string, phone: string) {
    return (await this.customerRepository.count({ where: { id, phone } })) > 0;
  }
}
