import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

const expenseInclude = {
  categories: { select: { id: true, name: true } },
};

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      include: expenseInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  findRecent(userId: string) {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay()); // start of current week (Sunday)
    start.setHours(0, 0, 0, 0);

    return this.prisma.expense.findMany({
      where: { userId, createdAt: { gte: start } },
      include: expenseInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  findMonthly(userId: string) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    return this.prisma.expense.findMany({
      where: { userId, createdAt: { gte: start } },
      include: expenseInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSummary(userId: string) {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const [monthlyExpenses, recentTransactions] = await Promise.all([
      this.prisma.expense.findMany({
        where: { userId, createdAt: { gte: monthStart } },
        include: expenseInclude,
      }),
      this.prisma.expense.findMany({
        where: { userId, createdAt: { gte: weekStart } },
        include: expenseInclude,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const monthlyTotal = monthlyExpenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0,
    );

    const categoryMap = new Map<string, { id: string; name: string; total: number }>();
    for (const expense of monthlyExpenses) {
      for (const cat of expense.categories) {
        const entry = categoryMap.get(cat.id) ?? { id: cat.id, name: cat.name, total: 0 };
        entry.total += Number(expense.amount);
        categoryMap.set(cat.id, entry);
      }
    }

    return {
      monthlyTotal,
      spendingByCategory: Array.from(categoryMap.values()).sort((a, b) => b.total - a.total),
      recentTransactions,
    };
  }

  create(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        name: dto.name,
        amount: dto.amount,
        userId,
        categories: { connect: dto.categoryIds.map((id) => ({ id })) },
      },
      include: expenseInclude,
    });
  }

  async update(userId: string, id: string, dto: UpdateExpenseDto) {
    await this.assertOwner(userId, id);

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.categoryIds !== undefined && {
          categories: {
            set: dto.categoryIds.map((cid) => ({ id: cid })),
          },
        }),
      },
      include: expenseInclude,
    });
  }

  async remove(userId: string, id: string) {
    await this.assertOwner(userId, id);
    return this.prisma.expense.delete({ where: { id } });
  }

  private async assertOwner(userId: string, id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException('Expense not found');
    if (expense.userId !== userId) throw new ForbiddenException('Access denied');
  }
}
