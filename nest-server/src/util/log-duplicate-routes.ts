import { INestApplication, Logger } from "@nestjs/common";

export function logDuplicateRoutes(app: INestApplication) {
    const logger = new Logger(logDuplicateRoutes.name);
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const routesMap = new Map<string,number>();
    const availableRoutes: object[] = router.stack
        .map(layer => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route?.path,
                        method: layer.route?.stack[0].method
                    },
                };
            }
        })
        .filter(item => item !== undefined);
    for(let route of availableRoutes){
        const key = `method: ${route['route']['method']} path: ${route['route']['path']}`;
        //logger.log(key);
        routesMap.has(key) ? 
        routesMap.set(key, routesMap.get(key) + 1) : 
        routesMap.set(key, 1);
    } 
    for(let key of routesMap.keys()){
        if(routesMap.get(key) > 1){
            logger.error(`found duplicate routes: ${key} => ${routesMap.get(key)}`);
        }
    }
}