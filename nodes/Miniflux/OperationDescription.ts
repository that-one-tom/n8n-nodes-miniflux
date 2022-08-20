import { INodeProperties } from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
	// ----------------------------------
	//         getAll: feedEntry
	// ----------------------------------
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
	{
		displayName: 'Feed ID',
		name: 'feedId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['feedEntry'],
				operation: ['getAll'],
			},
		},
		default: '',
		required: true,
		description: 'ID of the feed to get entries from',
	},
	// ----------------------------------
	//         getAll: feed
	// ----------------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['feed'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve all feeds',
				action: 'Get all feeds',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/feeds',
					},
				},
			},
		],
		default: 'getAll',
	},
];
