import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { CREATED } from "../constants/http";

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(25),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {

    message: "Passwords do not match", 
    path: ["confirmPassword"],
  });

  export const registerHandler = catchErrors(async (req, res) => {
    const request = await registerSchema.parseAsync({  // Changed to parseAsync for proper error handling
      ...req.body,
      userAgent: req.headers["user-agent"]
    });
    // Need to return a response
    return res.status(200).json({ success: true });
  });
  
