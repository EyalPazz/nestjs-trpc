import type { ProcedureType, ProcedureParams } from '@trpc/server';
import type { MiddlewareResult } from '@trpc/server/dist/core/middleware';

export type MiddlewareResponse =
  | Promise<MiddlewareResult<ProcedureParams>>
  | (<$Context>(opts: {
      ctx: $Context;
    }) => Promise<MiddlewareResult<ProcedureParams>>);

export type MiddlewareOptions<
  TContext extends object = object,
  TRetContext = Record<string, unknown>,
> = {
  ctx: TContext;
  type: ProcedureType;
  path: string;
  input: unknown;
  rawInput: unknown;
  meta: unknown;
  next: (opts?: {
    ctx: TRetContext;
  }) => Promise<MiddlewareResult<ProcedureParams>>;
};

export interface TRPCMiddleware {
  use(
    opts: MiddlewareOptions,
  ): MiddlewareResponse | Promise<MiddlewareResponse>;
}
