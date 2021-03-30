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
        console.log(`传入菜单列表-2-${router.path}`)
        console.log(`传入菜单列表-2-${router.name}`)
        console.log(`传入菜单列表-2-${router.children.length}`)
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
        console.log(`传入菜单列表-3-${router.path}`)
        console.log(`传入菜单列表-3-${router.name}`)
        console.log(`传入菜单列表-3-${router.children.length}`)

        console.log(`传入菜单列表-4-${router.component}`)
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve){
                // console.log(`传入菜单列表-4-${component}`)
                // require(['../views/' + component + '.vue'], resolve);
            }
        }


        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;
}