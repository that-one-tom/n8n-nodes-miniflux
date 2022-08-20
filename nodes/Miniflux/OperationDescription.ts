import { INodeProperties } from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
	// ----------------------------------
	//         getAll: feedEntry
	// ----------------------------------
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
];
