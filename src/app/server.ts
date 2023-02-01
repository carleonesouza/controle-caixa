import bodyParser from 'body-parser';
import '@src/util/module-alias';
import { Server } from '@overnightjs/core';
import * as http from 'http';
import { ProductController } from '@src/controllers/product';
import { Application } from 'express';
import { apiHeaderHandle } from '@src/middlewares/header-handle';
import cors from 'cors';
import swaggerUi = require('swagger-ui-express');
import swaggerDocs = require('@src/docs/swagger.json');
import fs = require('fs');
import { apiErrorHandle } from '@src/middlewares/error-handle';

/**
 * Configuração do express via Overnight
 * Fornece o express
 */
export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 4000) {
    super();
  }

  /**
   * Iniciar o server express
   */
  public init(): void {
    this.setupExpress();
    //this.setupHeader();
    this.setupErrorHandlers();
    this.setupControllers();
    this.setDocs();
  }

  public getApp(): Application {
    return this.app;
  }

  /**
   * Configurando express para lidar com json
   */
  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.options('*', cors());
  }

  /**
   * Passando o controller para o Overnight realizar o setup no
   * controller no express.
   */
  private setupControllers(): void {
    const productController = new ProductController();
    this.addControllers([productController]);
  }

  private setupHeader(): void {
    this.app.use(apiHeaderHandle);
  }

  private setDocs(): void {
    const customCss: string = fs.readFileSync(
      process.cwd() + '/src/docs/swagger.css',
      'utf8'
    );
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs, undefined, undefined, customCss)
    );
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorHandle);
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
