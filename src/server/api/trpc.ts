import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";
import { decrypt } from "~/lib/auth";

import { db } from "~/server/db";

// export const createTRPCContext = async (opts: { headers: Headers}) => {
//   return {
//     db,
//     ...opts
//   };
// };

export const createTRPCContext = (req: Request, resHeaders: Headers) => {
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
  // console.log("headers", ctx.headers.get('authorization'))
  const token = ctx.req.headers.get('authorization');
  
  
  if(token) {
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
// export const privateProcedure = t.procedure.use(isAuthed);
export const privateProcedure = t.procedure.use(isAuthed);
