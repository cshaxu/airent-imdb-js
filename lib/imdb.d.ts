import { CreateArgs, DatabaseSeed, DeleteArgs, FindFirstArgs, FindManyArgs, FindOneArgs, FindUniqueArgs, ModelMap, ModelRecord, UpdateArgs } from "./types";
declare class InMemoryDatabaseError extends Error {
    constructor(message: string);
}
declare class InMemoryCollection<MODEL extends ModelRecord> {
    private rows;
    constructor(seedRows?: Partial<MODEL>[]);
    readonly reset: (rows?: Partial<MODEL>[]) => void;
    readonly exportRows: () => MODEL[];
    readonly findMany: (args?: FindManyArgs<MODEL>) => Promise<MODEL[]>;
    readonly findOne: (args?: FindOneArgs<MODEL>) => Promise<MODEL | null>;
    readonly findUnique: (args: FindUniqueArgs<MODEL>) => Promise<MODEL | null>;
    readonly findFirst: (args?: FindFirstArgs<MODEL>) => Promise<MODEL | null>;
    readonly create: (args: CreateArgs<MODEL>) => Promise<MODEL>;
    readonly update: (args: UpdateArgs<MODEL>) => Promise<MODEL>;
    readonly delete: (args: DeleteArgs<MODEL>) => Promise<MODEL>;
}
declare class InMemoryDatabase<SCHEMA extends ModelMap> {
    private readonly collections;
    constructor(seed?: DatabaseSeed<SCHEMA>);
    table<KEY extends keyof SCHEMA & string>(name: KEY): InMemoryCollection<SCHEMA[KEY]>;
    seed(seed: DatabaseSeed<SCHEMA>): void;
    clear(): void;
    exportData(): DatabaseSeed<SCHEMA>;
}
type InMemoryDatabaseClient<SCHEMA extends ModelMap> = InMemoryDatabase<SCHEMA> & {
    [KEY in keyof SCHEMA]: InMemoryCollection<SCHEMA[KEY]>;
};
declare function createInMemoryDatabase<SCHEMA extends ModelMap>(seed?: DatabaseSeed<SCHEMA>): InMemoryDatabaseClient<SCHEMA>;
export { createInMemoryDatabase, InMemoryCollection, InMemoryDatabase, InMemoryDatabaseClient, InMemoryDatabaseError, };
