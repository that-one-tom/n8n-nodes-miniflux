import {
	INodeProperties
} from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
	// ----------------------------------
	//         update: entry
	// ----------------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['entry'],
			},
		},
		options: [{
			name: 'Get Many',
			value: 'getAll',
			description: 'Retrieve many entries up to the limit',
			action: 'Get many feed entries',
		}, {
			name: 'Update',
			value: 'update',
			description: 'Mark entries as read/unread',
			action: 'Update feed entries',
		}, ],
		default: 'getAll',
	},
	{
		displayName: 'Entry ID',
		name: 'entryId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['entry'],
				operation: ['update'],
			},
		},
		default: '',
		required: true,
		description: 'ID of the entry to update',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [{
				name: 'Read',
				value: 'read',
			},
			{
				name: 'Unread',
				value: 'unread',
			},
		],
		displayOptions: {
			show: {
				resource: ['entry'],
				operation: ['update'],
			},
		},
		default: 'read',
		required: true,
		description: 'Status to set',
	},
	// ----------------------------------
	//         getAll: entry
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['entry'],
				operation: ['getAll'],
			},
		},
		options: [{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
				displayName: 'Category',
				name: 'categoryId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCategories',
				},
				default: '',
				description: 'ID of the category to get entries for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
				displayName: 'Feed',
				name: 'feedId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getFeeds',
				},
				default: '',
				description: 'ID of the feed to get entries from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [{
						name: 'Category ID',
						value: 'category_id',
					},
					{
						name: 'Category Title',
						value: 'category_title',
					},
					{
						name: 'ID',
						value: 'id',
					},
					{
						name: 'Published At',
						value: 'published_at',
					},
					{
						name: 'Status',
						value: 'status',
					},
				],
				default: 'id',
				description: 'Order by field',
			},
			{
				displayName: 'Order Direction',
				name: 'direction',
				type: 'options',
				options: [{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
				default: 'asc',
			},
			{
				displayName: 'Original Article',
				name: 'originalArticle',
				type: 'boolean',
				default: false,
				description: 'Whether to fetch the original article through Miniflux',
			},
			{
				displayName: 'Plain Text',
				name: 'plainText',
				type: 'boolean',
				default: true,
				description: 'Whether to extract plain text',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [{
						name: 'Read',
						value: 'read',
					},
					{
						name: 'Unread',
						value: 'unread',
					},
					{
						name: 'Removed',
						value: 'removed',
					},
				],
				default: 'unread',
				description: 'Filter by status',
			},
		],
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
		options: [{
			name: 'Get Many',
			value: 'getAll',
			description: 'Retrieve many feeds',
			action: 'Get many feeds',
		}, ],
		default: 'getAll',
	},
	// ----------------------------------
	//         getAll: category
	// ----------------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['category'],
			},
		},
		options: [{
			name: 'Get Many',
			value: 'getAll',
			description: 'Retrieve many categories',
			action: 'Get many categories',
		}, ],
		default: 'getAll',
	},
];
