import express, { Request, Response } from 'express';
const router = express.Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { simpleGit} from 'simple-git';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
import { getTSFiles } from '../lib/file';
import fs from 'fs/promises';
import generateReadmeWithGemini from '../lib/api';
const JWT_SECRET = process.env.JWT_SECRET || "";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const signupVal = z.object({
    name: z.string(),
    email:z.string().email(),
    password : z.string(),
    apiKey : z.string()
})
const signinVal = z.object({
    email:z.string(),
    password : z.string()
})

router.post("/signup", async (req: Request, res: Response) : Promise<any>=> {
    const userBody = req.body;
    const success = signupVal.safeParse(userBody);
    if(!success.success){
        return res.status(403).json({"msg":"Wrong format"});
    }
    try{
        const user  = await prisma.user.create({
            data:userBody}
        );
        const token = jwt.sign({id:user.id}, JWT_SECRET);
        res.status(200).json({token:token});
    
    }catch(e){
        return res.status(403).json({msg:"User already exist"});
    }
    
})
router.post("/signin",async (req: Request, res: Response) : Promise<any>=> {
    const signinBody = req.body;
    const success = signinVal.safeParse(signinBody);
    if(!success.success){
        return res.status(403).json({msg:"Invalid Input"})
    }
    try{
        const user = await prisma.user.findFirst({
            where:{
                email:signinBody.email,
                password:signinBody.password
            }
        })
        if(!user){
            return res.status(401).json({msg:"User does not exist"});
        }
        const token = jwt.sign({id:user.id},JWT_SECRET);
        res.status(200).json({msg:"Signin Success",token:token});
    }catch(e){
        
    }
})
router.post('/readme',auth,async (req: Request, res: Response) : Promise<any> => {
    const url = req.body.url;
    try{
    await simpleGit().clone(url as string, `./repos/${req.userId}/`);
    const files = getTSFiles(`./repos/${req.userId}/`);
    const api  = await prisma.user.findUnique({
        where:{
            id: req.userId 
        },select:{
            apiKey:true
        }
    })
    if(!api){
        return res.status(401).json({msg:"User does not exist"});
    }
    const readme = await generateReadmeWithGemini(files, api.apiKey);
    if(!readme){
        return res.status(500).json({msg:"Error in generating readme"});
    }
    await fs.rm(`./repos/${req.userId}/`, { recursive: true, force: true });
    res.json({msg:"Readme generated",readme:readme});
    }catch(e){
        console.log(e);
        res.status(500).json({msg:"Error in generating readme"});
    }

    

})
export default router;