import {
	IExecuteFunctions,
	IRequestOptions,
	IDataObject,
	ILoadOptionsFunctions,
	NodeApiError,
	IHttpRequestMethods
} from 'n8n-workflow';

import {
	convert
} from 'html-to-text';

export async function minifluxApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const credentials = await this.getCredentials('minifluxApi');
	const options: IRequestOptions = {
		headers: {
			'X-Auth-Token': credentials.apiToken,
		},
		method,
		body,
		qs,
		uri: `${credentials.appUrl}${endpoint}`,
		json: true,
	};
	// console.log('options', JSON.stringify(options, null, 2));
	try {
		return await this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function extractPlainText(
	html: string,
) {
	const text = convert(html, {
		wordwrap: null,
	});
	return text;
}
