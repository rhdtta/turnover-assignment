import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { TRPCRequestInfo } from "@trpc/server/unstable-core-do-not-import";
import { Header } from "next/dist/lib/load-custom-routes";
import { type NextResponse, type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: Request, resHeaders: Headers) => {
  console.log('controle here 4')
  return createTRPCContext(req, resHeaders);
};

const handler = (req: Request, resHeaders: Headers) => {
  // console.log('request', req)
  // console.log('response', resHeaders)
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req, resHeaders),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
}

export { handler as GET, handler as POST };
