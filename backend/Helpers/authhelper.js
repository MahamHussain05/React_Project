import bcrypt from "bcrypt"
//hash a plain text password
export const hashPassword =async (password)=>{
    try{
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.error("Error Hashing Password:" , error);
        throw error;

    }
};

//compare a plain text password with a hashed one
export const comparePassword =async (password , hashedPassword)=>{
    try{
        return await bcrypt.compare(password, hashedPassword);
    }
    catch(error)
    {
        console.error("Error comparing passwords" , error);
        throw error;
    }
};