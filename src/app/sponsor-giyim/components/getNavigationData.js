import { promises as fs } from 'fs';
import path from 'path';


export default async function getNavigationData({URI}) {
    const filePath = path.join(process.cwd(), URI);
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  }