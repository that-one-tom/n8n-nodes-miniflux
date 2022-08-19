import { INodeProperties } from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
	// ----------------------------------
	//          getFeedEntries
	// ----------------------------------
	{
		displayName: 'Feed ID',
		name: 'feedId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getFeedEntries'],
			},
		},
		default: '',
		required: true,
		description: 'ID of the feed to get entries from',
	},
];
