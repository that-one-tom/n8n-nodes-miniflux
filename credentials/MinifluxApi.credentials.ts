import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class MinifluxApi implements ICredentialType {
	name = 'MinifluxApi';
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
			}
		}
	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-Auth-Token': '={{$credentials.apiToken}}'
			}
		},
	} as IAuthenticateGeneric;
}
