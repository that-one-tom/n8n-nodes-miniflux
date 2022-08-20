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
		description: 'Fetch posts from your Miniflux feeds',
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
				],
				default: 'feedEntry',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['feedEntry'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Retrieve all feed entries up to the limit',
						action: 'Get all feed entries',
						routing: {
							request: {
								method: 'GET',
								url: '=/v1/feeds/{{$parameter.feedId}}/entries',
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: {
											property: 'entries',
										},
									},
								],
							},
						},
					},
				],
				default: 'getAll',
			},
			...operationFields,
		],
	};
}
