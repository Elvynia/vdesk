import { ApolloServerPlugin } from '@apollo/server';

export const ExceptionHandlerPlugin: ApolloServerPlugin = {
	async requestDidStart() {
		return {
			async willSendResponse({ response }) {
				if (response?.body?.kind === 'single' && response.body.singleResult.errors) {
					const err = response.body.singleResult.errors[0];
					const status = (err.extensions as any)?.originalError?.statusCode;

					if (status) {
						response.http.status = status;
					}
				}
			},
		};
	},
}
