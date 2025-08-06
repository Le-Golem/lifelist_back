import { Controller, Get, Post, Delete, Patch, Param, Body, ParseIntPipe, HttpException, HttpStatus } from "@nestjs/common";
import { RecurringPaymentService } from "./recurring_payment.service";
import { UpdateRecurringPaymentDto } from "./dto/update_recurring_payment.dto";
import { CreateRecurringPaymentDto } from "./dto/create_recurring_payment.dto";

@Controller('recurring-payment')
export class RecurringPaymentController {
  constructor(private readonly recurringPaymentService: RecurringPaymentService) {}

  @Post()
  create(@Body() dto: CreateRecurringPaymentDto) {
    return this.recurringPaymentService.create(dto);
  }

  @Get()
  findAll() {
    return this.recurringPaymentService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.recurringPaymentService.delete(id);
    if (!result.deleted) {
      throw new HttpException(result.message || 'Recurring payment not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Recurring payment deleted successfully' };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRecurringPaymentDto,
  ) {
    return this.recurringPaymentService.update(id, updateDto);
  }

  @Patch(':id/pay')
  markAsPaid(@Param('id', ParseIntPipe) id: number) {
    return this.recurringPaymentService.markAsPaid(id);
  }
}
