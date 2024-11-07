import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const editorRouter = createTRPCRouter({
  save: publicProcedure
    .input(z.object({ data: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return null;
    }),
});
