import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ playId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.character.findMany({
        where: {
          playId: input.playId,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        playId: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.character.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.image,
          playId: input.playId,
        },
      });
    }),
});
