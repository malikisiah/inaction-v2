import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const playRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.play.findMany();
  }),
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.play.create({
        data: {
          title: input.title,
          content: [{}],
        },
      });
    }),
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
