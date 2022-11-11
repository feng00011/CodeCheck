## 初始化项目

安装

node v16.14.0



~~~js
npm i //安装需要的库

npm run serve //开发环境下运行网站，调试

npm build //项目打包，通过webpack打包为dist文件夹
~~~



## 部署

修改完成后重新运行

~~~js
npm build
~~~

dist文件夹是webpack打包的文件，压缩了体积，删减了不必要的组件，项目上线的就是该文件

将dist文件夹上传到服务器，利用nginx等软件运行即可完成网站的上线



## 参数修改

修改后台服务器api的地址：

~~~js
vue.config.js文件中
	devServer -> proxy -> target
~~~

~~~js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // 目标服务器的地址
        target: "http://localhost:3000/",
      }
    }
  }
})
~~~





## 数据说明

### 后台接收到的数据

现在是JSON对象（修改为JSON字符串可见下方）

~~~js
{code: "# input code here\nimport numpy as np\n \nmatrix = np…\n    print('第{}轮'.format(i+1))\n    print(vector1)", app: 'CAU', performance: 'hello', traffic: 'foo', packet: 'bar'}
~~~

- code：代码部分
- app、performance、traffic、packet



#### 传递的数据说明

默认传递的是JSON对象，可以在src/store/index

~~~js
 postProfileCode(context,msg){
            let regMsg = JSON.parse(msg)
            let res = Object.assign({},context.state.codeMsg,regMsg)
            // res = JSON.stringify(res)
            // 解开上面的注释，使得传递的数据为JSON字符串
            reqPost(res);
        }
~~~

#### 后台读取代码案例

以node为例

~~~js
app.post('/api/postMsg', (req, res) => {
    console.log(req.body);
    // let data = JSON.parse(req.body)
    let data = req.body.code
    fs.writeFile('./test.py', data, () => {
        res.send(req.body)
    })
    //此处将code部分存储为py文件，成功运行
})
~~~







