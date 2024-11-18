import { config } from "dotenv";

config();

export const port = process.env.PORT || 3000;
export const PRIVATE_STRIPE_KEY = process.env.STRIPE_PRIVATE_KEY;

