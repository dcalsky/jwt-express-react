简单地做了RESTful形式的注册与登录功能

技术栈：
 - 数据库: Postgresql
 - 后端: express sequelize
 - 前端: react

验证主要是通过前端在登录之后，每次都在header里添加auth字段的token，后端获取后判断用户是否有权限使用这个api.

我设置了role这个model来存储不同的用户类型，以便区别不同用户的不同权限

数据库的信息在config目录下面可以修改成自己需要的。(前提是你装了postgresql并且环境配置好了)

任何建议与批评，非常欢迎！


github地址： https://github.com/dcalsky/login-register-express-react
