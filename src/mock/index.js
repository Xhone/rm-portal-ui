import Mock from 'mockjs'
import { baseUrl } from '@/util/global'
import * as login from './modules/login'
import * as user from './modules/user'
import * as role from './modules/role'
import * as dept from './modules/dept'
import * as dict from './modules/dict'
import * as menu from './modules/menu'
import * as log from './modules/log'

let openMock = false
fnCreate(login, openMock)
fnCreate(user, openMock)
fnCreate(role, openMock)
fnCreate(dept, openMock)
fnCreate(dict, openMock)
fnCreate(menu, openMock)
fnCreate(log, openMock)

function fnCreate(mod, isOpen = true) {
    if (isOpen) {
        for (var key in mod) {
            ((res) => {
                if (res.isOpen !== false) {
                    let url = baseUrl
                    if (!url.endsWith("/")) {
                        url = url + "/"
                    }
                    url = rul + res.url
                    Mock.mock(new RegExp(url), res.type, (opts) => {
                        opts['data'] = opts.body ? JSON.parse(opts.body) : null
                        delete opts.body
                        console.log("\n")
                        console.log('%cmock拦截，请求：', 'color:blue', opts)
                        console.log('%cmock拦截，响应：', 'color:blue', res.data)
                        return res.data
                    })
                }
            })(mod[key]() || {})
        }
    }
}

Mock.mock('http://localhost:8080/user', {
    'name': '@name',
    'email': '@email',
    'age|1-10': 5
})

Mock.mock('http://localhost:8080/menu', {
    'id': '@increment',
    'name': 'menu',
    'order|1-20': 5
})