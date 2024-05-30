import swaggerJSDoc, { type Options } from 'swagger-jsdoc'
import path from 'path'

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Attendance Backend API Docs',
      description: 'API Documentation for the Smart Attendance',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*.ts')]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export { swaggerSpec }
