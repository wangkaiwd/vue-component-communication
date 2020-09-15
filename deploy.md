## 部署`Vue`项目到`GitHub Pages`
当我们开发完成一个`Vue`项目后，可能会迫不及待的想要在网络中分享。这里笔者介绍下如何利用`Git Pages`来为`Vue`项目生成线上访问地址。

关于部署到`GitHub Pages`，在`Vue cli`部署章节：[`GitHub Pages`](https://cli.vuejs.org/zh/guide/deployment.html#github-pages) 有介绍。

这里记录一次笔者自己的部署过程。

> * 仓库地址: git@github.com:wangkaiwd/vue-component-communication.git
> * 仓库名：vue-component-communication

1. 在`vue.config.js`中设置`publicPath`
    ```js
    module.exports = {
      productionSourceMap: false,
      publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-component-communication/'
        : '/'
    };
    ```
2. 在项目目录下，创建`deploy.sh`:
    ```shell script
    #!/usr/bin/env sh
    
    # 当发生错误时中止脚本
    set -e
    
    # 打包
    yarn build
    
    # cd 到构建输出的目录下 
    cd dist
    
    # 在dist目录下初始化git
    git init
    git add -A
    git commit -m 'deploy'
    
    # 将dist目录下本地分支master的更改
    # 推送到远程仓库：git@github.com:wangkaiwd/vue-component-communication.git
    # 的gh-pages分支
    git push -f git@github.com:wangkaiwd/vue-component-communication.git master:gh-pages
    
    # 导航到前一个目录，即执行cd dist命令时所在的目录：项目根目录
    cd -
    
    # 删除项目中的打包文件 
    rm -rf dist
    ```

在进行完相关配置后，需要执行`deploy.sh`。

在项目根目录下运行(`mac`系统):
```shell script
sh deploy.sh
```
此时脚本会帮我们进行如下操作：
1. 在项目根目录执行`yarn build`命令进行打包，生成`dist`目录
2. 进入到`dist`目录
3. 在`dist`目录下初始化`git`
4. 将`dist`目录下的所有更改提交到远程分支
5. 回到项目根目录
6. 删除打包生成的`dist`文件

在`GitHub`打开自己的仓库，点击设置：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200915153402.png)

找到预览地址：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200915153727.png)

添加地址到仓库的`Website`：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/202009222215162918.png)
点击地址进行访问，大工告成！
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200915162959.png)

> 参考资料：  
> * [Vue Cli Deploy GitHub Pages](https://cli.vuejs.org/guide/deployment.html#github-pages)
> * [How do I run a .sh or .command file in Terminal](https://apple.stackexchange.com/a/235129)
