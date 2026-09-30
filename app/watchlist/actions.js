"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMovie(id) {
  await prisma.movie.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/watchlist");
}