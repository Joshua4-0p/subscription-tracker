import { Router } from "express";

const userRouter = Router();

/* There is what we call static and dynamic route
Static route- for static route the path of the route in the server
is not specific. it's general like /users, to get all users

on the other hand, dynamic route the path is specific to one item or element
like /:id -which is the path to a user or item with that id 

:-is called 
*/

userRouter.get('/', (req, res) => res.send({ title: 'GET all users' }))
userRouter.get('/:id', (req, res) => res.send({ title: 'GET User details' }))
userRouter.post('/', (req, res) => res.send({ title: 'CREATE a user' }))
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE a user credentials' }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE a user" }));

export default userRouter;