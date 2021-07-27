export interface UserInsert {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    securityLevel: number;
}

export interface UserUpdate {
    id: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    securityLevel: number;
}

export interface Patch extends Partial<UserUpdate> {}

export interface CRUD {
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<string>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<string>;
    patchById: (id: string, resource: any) => Promise<string>;
}
export interface UserResponse{
    id: string;
    email: string;
}