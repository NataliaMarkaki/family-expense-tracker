import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

interface AuthenticatedRequest {
  user: { id: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenses: ExpensesService) {}

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.expenses.findAll(req.user.id);
  }

  @Get('summary')
  getSummary(@Request() req: AuthenticatedRequest) {
    return this.expenses.getSummary(req.user.id);
  }

  @Get('recent')
  findRecent(@Request() req: AuthenticatedRequest) {
    return this.expenses.findRecent(req.user.id);
  }

  @Get('monthly')
  findMonthly(@Request() req: AuthenticatedRequest) {
    return this.expenses.findMonthly(req.user.id);
  }

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() dto: CreateExpenseDto) {
    return this.expenses.create(req.user.id, dto);
  }

  @Patch(':id')
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenses.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.expenses.remove(req.user.id, id);
  }
}
