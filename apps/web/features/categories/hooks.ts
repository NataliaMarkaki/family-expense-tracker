"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./api";

export const categoryKeys = {
  all: ["categories"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // categories rarely change
  });
}
