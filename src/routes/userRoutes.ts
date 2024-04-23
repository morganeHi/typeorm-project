import { Router } from 'express';

import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();

// Define routes
router.get('/users', userController.all);
router.get('/users/:id', userController.one);
router.post('/users', userController.save);
router.delete('/users/:id', userController.remove);

export default router;

/*import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]*/