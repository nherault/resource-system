import { imageLoader, jsonLoader, ResourceSystemDefault } from '../resource';

const body: HTMLCollectionOf<HTMLElementTagNameMap['body']> = document.getElementsByTagName('body');

const toLoad = [
    {id: 'imageTest', type: 'image', source: './tmw_desert_spacing.png'},
    {id: 'jsonTest', type: 'json', source: './json-example.json'},
    {id: 'unknown-file', type: 'json', source: './unknown.file'},
    {id: 'unknown-loader', type: 'unknown-loader', source: './unknown-loader'},
];

const resourceSystem = new ResourceSystemDefault();
resourceSystem.addLoader(imageLoader);
resourceSystem.addLoader(jsonLoader);
resourceSystem.loadResources(...toLoad)
    .then((resourceDatas: any) => {
        body[0].innerText = `resourceDatas: ${JSON.stringify(resourceDatas)} |
        imageTest: ${JSON.stringify(resourceSystem.getResource('imageTest'))} |
        isResourcesInError: ${resourceSystem.isResourcesInError()} |
        resourcesInError: ${Object.keys(resourceSystem.getResourcesInError())}`;
    })
    .then(() => {
        body[0].innerText += ` | test`;
    });
