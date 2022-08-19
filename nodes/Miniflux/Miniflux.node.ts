import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { operationFields } from './OperationDescription';

export class Miniflux implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Miniflux',
		name: 'Miniflux',
		icon: 'file:miniflux.png',
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
				name: 'MinifluxApi',
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
						name: 'Feed Entries',
						value: 'feedEntries',
					},
				],
				default: 'feedEntries',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['feedEntries'],
					},
				},
				options: [
					{
						name: 'Get Feed Entries',
						value: 'getFeedEntries',
						description: 'Retrieve multiple feed entries',
						action: 'Get Feed Entries',
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
									}
								]
							}
						},
					},
				],
				default: 'getFeedEntries',
			},
			...operationFields,
		],
	};
}
