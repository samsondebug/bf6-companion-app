import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const brandingSchema = z.object({
  name: z.string(),
  colors: z.object({
    primary: z.string()
  }),
  logos: z.object({
    icon: z.string().optional(),
    splash: z.string().optional()
  })
});

const appSchema = z.object({
  watchDirs: z.array(z.string()),
  threshold: z.number()
});

export const loadConfig = () => {
  const brandingPath =
    process.env.BRANDING_CONFIG || path.join(process.cwd(), 'config/branding.json');
  const appPath =
    process.env.APP_CONFIG || path.join(process.cwd(), 'config/app.json');
  const branding = brandingSchema.parse(JSON.parse(fs.readFileSync(brandingPath, 'utf-8')));
  const app = appSchema.parse(JSON.parse(fs.readFileSync(appPath, 'utf-8')));
  return { branding, app };
};
