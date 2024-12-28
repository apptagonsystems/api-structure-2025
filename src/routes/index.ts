import { Router } from "express";
import authrouter from "./auth.route";


const router:Router = Router();

router.use('/auth', authrouter);


export default router;


