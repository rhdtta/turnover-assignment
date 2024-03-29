
import { TRPCClientError } from "@trpc/client";
import { EncryptJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";
import { decrypt, encrypt } from "~/lib/auth";
import {NextResponse} from 'next/server'

import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";
// import { myfunc } from "~/trpc/react";


export const postRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ name: z.string().min(1), email: z.string().email({ message: "Please enter a valid email address." }), password: z.string()}))
    .mutation(async ({ ctx, input }) => {

      const userCreated = await ctx.db.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password
        },
      });

      if(userCreated.id) {
        const session = await encrypt({
          id: userCreated.id
        })

        
        return {token: session}
      }
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email({ message: "Please enter a valid email address." }), password: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const user =  await ctx.db.users.findUnique({
        where: { email: input.email }
      });
      console.log('controle here')
      if(user) {
        if(input.password === user.password) {
          const session = await encrypt({
            id: user.id
          })
          console.log('controle here 2')
          return {token: session}
        } else {
          console.log('controle here 3')
          throw new TRPCClientError('Password incorrect || Email invalid')
        }
      }
    }),

  getCategories: privateProcedure
    .input(z.object({ page: z.number(), perPage: z.number()}))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.users.findUnique({
        where: { id: ctx.userId }
      });

      const selectedCategories = user ? user.selectedcategories : [];
      const categories = await ctx.db.categories.findMany();

      let startIndex = 1+(input.page - 1)*input.perPage - 1;
      let endIndex = input.page < categories.length/input.perPage? startIndex + input.perPage: undefined;
      
      const paginatedCategories = categories.slice(startIndex, endIndex);
      const result =  paginatedCategories.map((obj) => {
        return {
          ...obj,
          checked: selectedCategories.indexOf(obj.id) != -1 ? true : false
        }
      })
      
      // return {
      //   categories: categories,
      //   selectedCats: selectedCategories
      // };
      return { result, selected: selectedCategories, totalPages: categories.length/input.perPage+1};
  }),

  saveSelectedCategories: privateProcedure
    .input(z.object({
      selectedCategories: z.array(z.number()),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = ctx.userId
      const { selectedCategories } = input;
      console.log('id categories', id, selectedCategories)

      try {
        const updatedUser = await ctx.db.users.update({
          where: { id },
          data: {
            selectedcategories: {
              set: selectedCategories,
            },
          },
        });

        console.log('updated?', updatedUser)

        return updatedUser;
      } catch (error) {
        console.error("Error updating selected categories:", error);
        throw new Error("Failed to update selected categories");
      }
    }),
});
