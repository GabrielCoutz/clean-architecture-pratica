import express, { Request, Response } from 'express';

import AddCourse from '../../useCases/addCourse.js';
import { CourseInMemory } from '../CourseInMemory.js';

const app = express();
const repo = new CourseInMemory();
app.post('/routes', async (req: Request, res: Response) => {
  const addCourseUseCase = new AddCourse(repo);

  const output = await addCourseUseCase.execute(req.body);
  res.status(200).json(output);
});
