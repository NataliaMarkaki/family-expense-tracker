-- Drop the existing join table (A=expenses, B=categories — wrong order for Prisma)
DROP TABLE IF EXISTS "_ExpenseCategories";

-- Recreate with correct column order: A=categories, B=expenses (alphabetical model name order)
CREATE TABLE "_ExpenseCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExpenseCategories_AB_pkey" PRIMARY KEY ("A","B")
);

CREATE INDEX "_ExpenseCategories_B_index" ON "_ExpenseCategories"("B");

ALTER TABLE "_ExpenseCategories"
    ADD CONSTRAINT "_ExpenseCategories_A_fkey"
    FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ExpenseCategories"
    ADD CONSTRAINT "_ExpenseCategories_B_fkey"
    FOREIGN KEY ("B") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
