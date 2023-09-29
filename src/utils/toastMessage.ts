import { toast } from "react-toast";
export const successMessage = (message:string) => {
    toast.success(message);
}

export const errorMessage = (message:string) => {
    toast.error(message);
}