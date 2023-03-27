import webpack from 'webpack'
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfigClient from '../webpack.config.client';
 const compile = (app) => {
    if (process.env.NODE_ENV == 'development'){
        const compiler = webpack(webpackConfigClient);
        const middleware = WebpackDevMiddleware(compiler,{
            publicPath: webpackConfigClient.output.publicPath
        });
        app.use(middleware);
        app.use(WebpackHotMiddleware(compiler));
    }
 }

 module.exports = {compile}