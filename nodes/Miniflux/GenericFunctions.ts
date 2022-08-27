import {
	IExecuteFunctions
} from 'n8n-core';

import {
	OptionsWithUri
} from 'request';

import {
	IDataObject,
	ILoadOptionsFunctions,
	NodeApiError,
	NodeOperationError
} from 'n8n-workflow';

import {
	convert
} from 'html-to-text';

export async function minifluxApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const credentials = await this.getCredentials('minifluxApi');
	const options: OptionsWithUri = {
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
