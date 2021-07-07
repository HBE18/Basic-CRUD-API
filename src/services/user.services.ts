import { CRUD, Patch, UserInsert, UserUpdate } from '../models/models';
import { listUsers } from '../controller/controller';
import { usersConfig } from '../users/users.config';

class UserService implements CRUD {
    async create(resource: UserInsert) {
        return usersConfig.addUser(resource);
    }

    async deleteById(id: string) {
        return removeUserById(id);
    }

    async list(limit: number, page: number) {
        return controller.getUsers();
    }

    async patchById(id: string, resource: Patch): Promise<any> {
        return controller.patchUserById(id, resource);
    }

    async putById(id: string, resource: UserUpdate): Promise<any> {
        return controller.putUserById(id, resource);
    }

    async readById(id: string) {
        return controller.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return controller.getUserByEmail(email);
    }
}

export default new UserService();