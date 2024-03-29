import 'reflect-metadata';
import express, { Application } from 'express';
import 'tsconfig-paths';
import { registerApiRoutes } from './index';
import { PORT } from '@/config';
import errorMiddleware from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { MikroORM, RequestContext } from '@mikro-orm/core';
import config, { DI } from './mikro-orm.config'
import {User} from "@/entities/user.entity";
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { ProjectUser } from './entities/projectUser.entity';


(async function main() {
  const app: Application = express();

  // Connect to database
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config)
  DI.em = DI.orm.em.fork()
  DI.userRepository = DI.orm.em.fork().getRepository(User);
  DI.projectRepository = DI.orm.em.fork().getRepository(Project)
  DI.projectUserRepository = DI.orm.em.fork().getRepository(ProjectUser)

  app.use((_1, _2, next) => RequestContext.create(DI.orm.em, next));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize API Routes
  registerApiRoutes(app, '/api/v1');

  // Setup error handler
  app.use(errorMiddleware)

  // Setup swagger
  // const options = {
  //   definition: {
  //     openapi: '3.0.0',
  //     info: {
  //       title: 'Callio',
  //       version: '1.0.0',
  //     },
  //   },
  //   apis: ['./src/components/**/*.routes.ts'], // files containing annotations as above
  // };

  // const swaggerDoc = swaggerJsdoc(options)
  // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Listen
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
