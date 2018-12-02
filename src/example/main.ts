import { imageLoader, ResourceSystemDefault } from '../resource';

const resourceSystem = new ResourceSystemDefault();
resourceSystem.addLoader(imageLoader);
resourceSystem.loadResources({id: 'test', type: 'image', source: './tmw_desert_spacing.png'})
    .then((resourceDatas: any) => {
        console.log(resourceDatas);
        console.log(resourceSystem.getResource('test'));
        console.log(resourceSystem.getResourcesInError());
    });
