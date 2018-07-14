# Global-Group-Buying
Global-Group-Buying 是一个电商小程序


## 目录
- [安装部署](#安装部署)
- [项目规范](#项目规范)
  * [mutation-types](#mutation-types)
  * [组件引入与使用](#组件引入与使用)
  * [HTML 标签](#HTML-标签)
- [业务介绍](#业务介绍)
  * [页面及描述](#页面及描述)

## 安装部署

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 项目规范

##### mutation-types

参数 | 固定值 | 分隔符 | 是否必须
--------- | -------- | -------- | --------
是否登录才能访问接口 | USER | \_\_ | –
接口地址 | – | \_ | ○
接口方法 | GET/GETS/POST/PUT/PATCH/DELETE | \_ | ○
其他描述 | – | \_ | –
其他方法 | – | \_ | –

完整的组成：{是否登录\_\_}{接口地址\_}{接口方法\_}{其他描述\_}{其他方法}

完整的案例：USER\_\_PRODUCT\_GETS\_HISTORY\_SET

#####  组件引入与使用

完整的案例：

    // 组件的引入
    import cBtn from '@/c-mobile/packages/components/btn/index'
    import cSelectProduct from '@/components/c-select-product'

    // 组件在 components 中的使用
    components: {
        cBtn,
        cSelectProduct
    }

    // 组件在 DOM 中的使用：
    <c-modal-example />
    <c-btn
        type="primary"
        @click="createPoster"
        suspend>
        Create poster
    </c-btn>

#####  HTML 标签

当 HTML 标签中属性数量超过 1 个，则需要换行。

    <c-btn
        type="primary"
        @click="createPoster"
        suspend>
        Create poster
    </c-btn>

## 业务介绍

##### 页面及描述

页面目录     | 页面描述   | 页面参数   | 参数描述
:--------- | :-------- | :-------- | :--------
pages/home     | 项目首页      |  –   | –


