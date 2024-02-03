import { Resend } from "resend";

// Créer une nouvelle instance RESEND dans notre application
export const resend = new Resend(process.env.RESEND_API_KEY);
