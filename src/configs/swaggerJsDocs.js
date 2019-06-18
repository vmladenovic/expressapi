import swaggerJSDoc from "swagger-jsdoc";

export const spec = swaggerJSDoc({
	swaggerDefinition: {
		basePath: "/api/v1/",
		info: {
			title: 'File Server API',
			version: '1.0.0'
		},
		produces: ['application/json'],
		consumes: ['application/json'],
		securityDefinitions: {
			jwt: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header'
			}
		}
	},
	apis: [
		'src/controllers/*.js',
		'src/models/*.js'
	]
});
