/**
 * Webpack configuration for a development environment.
 * 
 * This configuration sets up a Webpack development server with the following features:
 * - Development mode
 * - Entry point at `./index.js`
 * - Output bundle file `bundle.js` in the `./public` directory
 * - Web target
 * - Development server running on port 3000, serving files from `./public`
 * - Automatically open the app in the browser
 * - Hot Module Replacement (HMR) enabled
 * - Live reloading enabled
 * - Resolve `.js`, `.jsx`, and `.json` file extensions
 * - Use `babel-loader` to transpile JavaScript/JSX files, excluding `node_modules`
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    target: 'web',
    devServer: {
        port: '3000',
        static: ['./public'],
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.tsx','.ts','.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        })
    ]
}