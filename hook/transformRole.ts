import { UserRole } from "../types/role"

export const transformRole = (numberIsRole:string) =>{
    if(numberIsRole === "1"){
        return UserRole.Advisor
    }
    if(numberIsRole === "2"){
        return UserRole.Student
    }
    if(numberIsRole === "3"){
        return UserRole.Visitor
    }
}