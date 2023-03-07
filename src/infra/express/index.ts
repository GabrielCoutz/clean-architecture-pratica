import express, { Request, Response } from 'express';

import AddCourse from '../../useCases/addCourse.js';
import { CourseInMemory } from '../CourseInMemory.js';

export const app = express();
app.use(express.json());
const repo = new CourseInMemory();

app.post('/', async (req: Request, res: Response) => {
  const addCourseUseCase = new AddCourse(repo);

  try {
    const courseDto = {
      name: req.body.name,
      open: req.body.open,
    };

    const output = await addCourseUseCase.execute(courseDto);
    res.status(200).json(output);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

app.listen(3000, () => console.log('Rodando na porta => 3000'));
