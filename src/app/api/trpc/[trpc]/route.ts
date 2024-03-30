import { FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (args: FetchCreateContextFnOptions, req: Request) => {
  return createTRPCContext(req, args.resHeaders);
};

const handler = async (req: Request) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: (args) => createContext(args, req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
        
  })
  
export { handler as GET, handler as POST };
