import {GET} from './api';
import { MENU_LIST_URL } from './apiUrlConst';



export const initMenus = (router, store) => {

    if (store.state.routes.length > 0) {
        return;
    }

    GET(MENU_LIST_URL).then(res => {
        if (res.code == 0 && res.data) {
            // 格式化 Router
            let fmtRoutes = formatRoutes(res.data)
            // 添加到 router
            router.addRoutes(fmtRoutes)
            // 将数据存储到 vuex
            store.commit('initRoutes', fmtRoutes)
        }
    })
}

export const formatRoutes = (routes)  => {
    let fmtRoutes = [];
    routes.forEach(router => {
        
        let{
            path,
            component,
            name,
            iconCls,
            children,
        } = router;
        if (children && children instanceof Array) {
            // 递归
            children = formatRoutes(children)
        }

        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve){
                if (component.startWith('Employee')) {
                    require(['../views/employee/' + component + '.vue'], resolve);    
                }
                else if (component.startWith('Personnel')) {
                    require(['../views/personnel/' + component + '.vue'], resolve);
                }
                else if (component.startWith('Salary')) {
                    require(['../views/salary/' + component + '.vue'], resolve);
                }
                else if (component.startWith('Statistics')) {
                    require(['../views/statistics/' + component + '.vue'], resolve);
                }
                else if (component.startWith('System')) {
                    require(['../views/system/' + component + '.vue'], resolve);
                }
                
            }
        }

        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;
}