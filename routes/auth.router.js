//instantiate, authRoute becomes and instance of the Router() function
import { Router } from "express";

const authRouter = Router();

authRouter.post('./signin', (req, res) => res.send({ title: 'Signin' }));
authRouter.post('./signup', (req, res) => res.send({ title: 'Signup' }));
authRouter.post("./signout", (req, res) => res.send({ title: "Signout" }));

export default authRouter;