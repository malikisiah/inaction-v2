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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { length } = await ctx.db.character.findMany({
        where: {
          playId: input.playId,
        },
      });

      const name = `Character #${(length + 1).toString()}`;

      await ctx.db.character.create({
        data: {
          name: name,
          playId: input.playId,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        characterId: z.string(),
        field: z.enum(["name", "description", "image"]),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.character.update({
        where: {
          id: input.characterId,
        },
        data: {
          [input.field]: input.value,
        },
      });
    }),
});
