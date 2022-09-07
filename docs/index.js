const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tripleogames Dashboard API Documentation",
    version: "1.0.0",
    description: "The Tripleogames Dashboard API service documentation.",
  },
  servers: [
    {
      url: "http://localhost",
      description: "Development Server(Docker)",
    },
    {
      url: "http://localhost:5000",
      description: "Development Server(Non-Docker)",
    },
    {
      url: "https://s8dashbackendapi.s8services.com",
      description: "Production Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = swaggerDefinition;
