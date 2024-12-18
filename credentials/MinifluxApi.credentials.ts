import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MinifluxApi implements ICredentialType {
	name = 'minifluxApi';
	displayName = 'Miniflux API';
	properties: INodeProperties[] = [
		{
			displayName: 'Application URL',
			name: 'appUrl',
			type: 'string',
			default: 'https://reader.miniflux.app',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Auth-Token': '={{$credentials.apiToken}}',
			},
		},
	};
}
