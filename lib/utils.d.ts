import { LoadKey } from "./types";
type BatchLoadQuery = {
    where: LoadKey;
    skip: number;
    take: number;
};
declare function batchLoad<ENTITY>(loader: (query: BatchLoadQuery) => Promise<ENTITY[]>, keys: LoadKey[], batchSize?: number, topSize?: number): Promise<ENTITY[]>;
declare function batchLoadTopMany<ENTITY>(loader: (query: BatchLoadQuery) => Promise<ENTITY[]>, matcher: (key: LoadKey, entity: ENTITY) => boolean, keys: LoadKey[], topSize: number, batchSize?: number): Promise<ENTITY[]>;
declare function buildWhere(loadKeys: LoadKey[], allowIn?: boolean): LoadKey;
declare function entityCompare<ENTITY>(original: ENTITY, updated: ENTITY, fields: readonly string[]): string[];
declare function compare<T>(a: T, b: T): boolean;
declare function omit<T extends Record<string, unknown>, K extends Extract<keyof T, string>>(object: T, keys: K | readonly K[]): Omit<T, K>;
export { batchLoad, batchLoadTopMany, buildWhere, compare, entityCompare, omit, };
