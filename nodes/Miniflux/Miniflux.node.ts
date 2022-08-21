import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { minifluxApiRequest } from './GenericFunctions';

import {
	operationFields
} from './OperationDescription';

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
		credentials: [{
			name: 'minifluxApi',
			required: true,
		}, ],
		properties: [{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [{
						name: 'Feed Entry',
						value: 'feedEntry',
					},
					{
						name: 'Feed',
						value: 'feed',
					},
					{
						name: 'Category',
						value: 'category',
					},
				],
				default: 'feedEntry',
			},
			...operationFields,
		],
	};

	methods = {
		loadOptions: {
			async getFeeds(this: ILoadOptionsFunctions) {
				const feeds = await minifluxApiRequest.call(this, 'GET', '/v1/feeds');
				return feeds.map((e: { title: string; id: number; }) => { return {
					name: e.title,
					value: e.id,
				}; });
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise < INodeExecutionData[][] > {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;

		// ----------------------------------
		//         getAll: feedEntry
		// ----------------------------------
		if (resource === 'feedEntry' && operation === 'getAll') {
			const feedId = this.getNodeParameter('feedId', 0) as number;

			const { limit, status, order, direction } = this.getNodeParameter('additionalOptions', 0) as IDataObject;

			const feedEntries = await minifluxApiRequest.call(this, 'GET', `/v1/feeds/${feedId}/entries`, {}, {
				limit: limit as number,
				status: status as string,
				order: order as string,
				direction: direction as string,
			});

			returnData.push(...feedEntries.entries);
		}

		// ----------------------------------
		//				 update: feedEntry
		// ----------------------------------
		if (resource === 'feedEntry' && operation === 'update') {
			for (let i = 0; i < items.length; i++) {
				const entryId = this.getNodeParameter('entryId', i) as number;
				const status = this.getNodeParameter('status', i) as string;
				await minifluxApiRequest.call(this, 'PUT', '/v1/entries', {
					entry_ids: [ entryId ],
					status,
				});
				const updatedEntry = await minifluxApiRequest.call(this, 'GET', `/v1/entries/${entryId}`);
				returnData.push(updatedEntry);
			}
		}

		// ----------------------------------
		//         getAll: feed
		// ----------------------------------
		if (resource === 'feed' && operation === 'getAll') {
			const feeds = await minifluxApiRequest.call(this, 'GET', '/v1/feeds');
			returnData.push(...feeds);
		}

		// ----------------------------------
		//         getAll: category
		// ----------------------------------
		if (resource === 'category' && operation === 'getAll') {
			const categories = await minifluxApiRequest.call(this, 'GET', '/v1/categories');
			returnData.push(...categories);
		}

		// console.log('returnData', JSON.stringify(returnData.slice(0, 3)));
		return [this.helpers.returnJsonArray(returnData)];
	}
}
