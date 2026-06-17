/*
 * Minimal server-side runtime declarations for environments where dev-only
 * type packages are not installed before running an Angular SSR build.
 */

declare module 'node:path' {
  export function join(...paths: string[]): string;
}

declare module 'express' {
  export interface Request {}
  export interface Response {}
  export type NextFunction = (error?: unknown) => void;
  export type RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>;

  export interface Express {
    use(handler: RequestHandler): void;
    use(handler: RequestHandlerFactory): void;
    listen(
      port: string | number,
      callback?: (error?: Error) => void,
    ): unknown;
  }

  export interface StaticOptions {
    maxAge?: string | number;
    index?: boolean | string | string[];
    redirect?: boolean;
  }

  export type RequestHandlerFactory = RequestHandler;

  export interface ExpressFactory {
    (): Express;
    static(path: string, options?: StaticOptions): RequestHandler;
  }

  const express: ExpressFactory;
  export default express;
}

declare const process: {
  env: Record<string, string | undefined>;
};

interface ImportMeta {
  readonly dirname: string;
}
