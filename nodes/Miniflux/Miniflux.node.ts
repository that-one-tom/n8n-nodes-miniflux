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
import {
	minifluxApiRequest
} from './GenericFunctions';

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
					name: 'Category',
					value: 'category',
					description: 'A group of feeds',
				}, {
					name: 'Entry',
					value: 'entry',
					description: 'A single post',
				}, {
					name: 'Feed',
					value: 'feed',
					description: 'A list of posts',
				}, ],
				default: 'entry',
			},
			...operationFields,
		],
	};

	methods = {
		loadOptions: {
			async getFeeds(this: ILoadOptionsFunctions) {
				const feeds = await minifluxApiRequest.call(this, 'GET', '/v1/feeds');
				return feeds.map((e: {
					title: string;id: number;
				}) => {
					return {
						name: e.title,
						value: e.id,
					};
				});
			},
			async getCategories(this: ILoadOptionsFunctions) {
				const categories = await minifluxApiRequest.call(this, 'GET', '/v1/categories');
				return categories.map((e: {
					title: string;id: number;
				}) => {
					return {
						name: e.title,
						value: e.id,
					};
				});
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise < INodeExecutionData[][] > {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;

		// ----------------------------------
		//         getAll: entry
		// ----------------------------------
		if (resource === 'entry' && operation === 'getAll') {
			const {
				categoryId,
				feedId,
				limit,
				status,
				order,
				direction,
			} = this.getNodeParameter('additionalOptions', 0) as IDataObject;

			const endpoint = feedId ? `/v1/feeds/${feedId}/entries` : '/v1/entries';

			const entries = await minifluxApiRequest.call(this, 'GET', endpoint, {}, {
				category_id: categoryId as number,
				limit: limit as number,
				status: status as string,
				order: order as string,
				direction: direction as string,
			});

			returnData.push(...entries.entries);
		}

		// ----------------------------------
		//				 update: entry
		// ----------------------------------
		if (resource === 'entry' && operation === 'update') {
			for (let i = 0; i < items.length; i++) {
				const entryId = this.getNodeParameter('entryId', i) as number;
				const status = this.getNodeParameter('status', i) as string;
				await minifluxApiRequest.call(this, 'PUT', '/v1/entries', {
					entry_ids: [entryId],
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
