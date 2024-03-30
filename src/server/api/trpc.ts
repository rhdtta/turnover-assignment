import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { NextRequest, NextResponse } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { decrypt } from "~/lib/auth";

import { db } from "~/server/db";

export const createTRPCContext = async (req: Request, resHeaders: Headers) => {
  return {
    db,
    req,
    resHeaders
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

const isAuthed = t.middleware(async ({ctx, next}) =>{
  // JWT integration
  const cookies = ctx.req.headers.get('cookie')?.split(";");

  const ourCookie = cookies?.filter((cookie) => cookie.split("=")[0] === 'token');
  const token = ourCookie? ourCookie[0]?.split("=")[1] : '';

  if(token?.length) {
    const payload = await decrypt(token);

    return next({
      ctx: {
        userId: payload.id
      }
    });
  } else {
    throw new TRPCError({code: 'UNAUTHORIZED'})
  }
})

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
