import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenses: ExpensesService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.expenses.findAll(req.user.id);
  }

  @Get('summary')
  getSummary(@Req() req: any) {
    return this.expenses.getSummary(req.user.id);
  }

  @Get('recent')
  findRecent(@Req() req: any) {
    return this.expenses.findRecent(req.user.id);
  }

  @Get('monthly')
  findMonthly(@Req() req: any) {
    return this.expenses.findMonthly(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateExpenseDto) {
    return this.expenses.create(req.user.id, dto);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.expenses.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.expenses.remove(req.user.id, id);
  }
}
