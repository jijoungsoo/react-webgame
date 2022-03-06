const path = require('path')
const webpack = require('webpack')
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports={
    name: 'wordrelay-setting',
    mode: 'development', /*실서비스는 : production */
    devtool: 'eval',
    resolve : {
        extensions: ['.js', '.jsx']
    },
    /*입력 */
    entry : {
       /* app:['./client.jsx','./WordRelay.jsx']*/   /*입력을 배열형태로 넣어줌 */
       /*app:['./client.jsx']*/    /*client.jsx에서  wordRelay를 가져오고 있어서 안써줘도 됨 */
       app:['./client']    /*확장자명도 생략하고   resolve를 기입해주면 알아서 찾는다. */
    },
    module:{/*  entry에 있는걸 moudels적용해서  output을 출력한다. */
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env',{
                        targets:{
                          /*  browsers:['last 2np chrome versions'],*/  /*https://github.com/browserslist/browserslist */
                          browsers:['> 1% in KR'],
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ]
            }
        }]
    }, 
    target:['web','es5'],
    plugins:[    /*확장프로그램? --  https://webpack.js.org/     */ 
        new webpack.LoaderOptionsPlugin({debug: true}),  /*load에 옵션에 debug를 넣어주는 plugin */

        new RefreshWebpackPlugin()

    ], 
    /*출력 */
    output: {
        path: path.join(__dirname, 'dist'),  //현재경로\dist\  만듬  -- entry에 있는게 app.js로 출력됨  --- 실재경로
        filename: 'app.js',
        publicPath: '/dist'   //--가상경로   -- java에 contextpath느낌으로 보인다.

    },
    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname) },
        hot:true
    }
    /* devServer는 핫리로딩 기능을 가지고 있다. */

};