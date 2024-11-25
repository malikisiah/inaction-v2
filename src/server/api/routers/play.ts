import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
          content: [
            {
              id: uuidv4(),
              type: "title",
              props: {
                textColor: "default",
                textAlignment: "left",
              },
              content: [
                {
                  text: input.title,
                  type: "text",
                  styles: {},
                },
              ],
              children: [],
            },
            {
              id: uuidv4(),
              type: "paragraph",
              props: {
                textColor: "default",
                textAlignment: "left",
                backgroundColor: "default",
              },
              content: [],
              children: [],
            },
          ],
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
