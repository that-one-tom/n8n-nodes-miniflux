import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { operationFields } from './OperationDescription';

export class Miniflux implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Miniflux',
		name: 'Miniflux',
		icon: 'file:Miniflux.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Connect n8n to your Miniflux feed reader',
		defaults: {
			name: 'Miniflux',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'minifluxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.appUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Feed Entry',
						value: 'feedEntry',
					},
					{
						name: 'Feed',
						value: 'feed',
					},
				],
				default: 'feedEntry',
			},
			...operationFields,
		],
	};
}
