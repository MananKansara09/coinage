import { z } from "zod";

export const requestBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginrequestBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});
