import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/user";

const router = Router();

router.post('/', createUser);

router.get('/', getUsers); 

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;