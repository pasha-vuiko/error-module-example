import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { packageJsonInfo } from '@shared/constants/package-json-info';
import { appExceptionsRegistry } from '@shared/modules/error/exceptions/app-exceptions-registry';

export function setupOpenApi(app: NestFastifyApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageJsonInfo.name)
    .setDescription(packageJsonInfo.description)
    .setVersion(packageJsonInfo.version)
    .build();

  const OPEN_API_URL = 'docs';
  const customOptions: SwaggerCustomOptions = {
    jsonDocumentUrl: `${OPEN_API_URL}/swagger.json`,
    yamlDocumentUrl: `${OPEN_API_URL}/swagger.yaml`,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(OPEN_API_URL, app, document, customOptions);

  app.getHttpAdapter().get(`/${OPEN_API_URL}/errors.json`, () => {
    return appExceptionsRegistry.getRegistryObject();
  });
  app.getHttpAdapter().get(`/${OPEN_API_URL}/errors.html`, (_req, res) => {
    const html = appExceptionsRegistry.getRegistryHtml();

    res.type('text/html').send(html);
  });
}
