import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const editorRouter = createTRPCRouter({
  save: publicProcedure
    .input(
      z.object({
        jsonBlocks: z.array(z.any()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.document.create({
        data: {
          content: input.jsonBlocks,
        },
      });
    }),
});
