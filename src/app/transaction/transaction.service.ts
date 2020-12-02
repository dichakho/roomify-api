import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BaseService } from '@src/base.service';
import { Transaction } from '@src/entities/transaction.entity';
import { IResponseFormat } from '@src/models/base/response.interface';
import { BookingRepository } from '../booking/booking.respository';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService extends BaseService<Transaction, TransactionRepository> {
  constructor(protected readonly repository: TransactionRepository, private readonly bookingRepository: BookingRepository) {
    super(repository);
  }

  async getOneTransaction(id: number): Promise<IResponseFormat<Transaction>> {
    const data = await this.repository.findOne({ where: { id }, relations: ['bookings'] });
    if(!data) throw new NotFoundException('Transaction not found !!!');
    return { data };
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async createTransactionEveryMonth() {
    const transaction = this.repository.create();
    transaction.isPaid = false;
    const create = await this.repository.save(transaction);
    await this.bookingRepository.update({ transactionId: null }, { transactionId: create.id });
  }
}
