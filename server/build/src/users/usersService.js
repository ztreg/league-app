"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
class UsersService {
    get(id, name) {
        return {
            id,
            name: name !== null && name !== void 0 ? name : "Jane Doe",
            status: "Happy",
            following: [],
        };
    }
    create(userCreationParams) {
        return Object.assign({ id: Math.floor(Math.random() * 10000), status: "Happy" }, userCreationParams);
    }
}
exports.UsersService = UsersService;
