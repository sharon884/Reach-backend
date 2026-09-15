export interface BaseRepository<T> {
    create(entity: T): Promise<T>;

    findById(id: string): Promise<T | null>;
}