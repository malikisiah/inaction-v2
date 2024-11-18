import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const editorRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        jsonBlocks: z.array(z.any()),
        playId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.play.update({
        where: {
          id: input.playId,
        },
        data: {
          content: input.jsonBlocks,
        },
      });
    }),
});
