"use server"
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

export const register = async (values:z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error :"Invalid fields!"};
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exitingUser = await db.user.findUnique({
        where :{
            email,
        }
    });

    if(exitingUser){
        return {error :"Email already in use !"};
    }

    await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    return {success: "Register Success..!"}
}