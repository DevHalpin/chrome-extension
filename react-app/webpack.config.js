/**
 * Webpack configuration for a development environment.
 * 
 * This configuration sets up a Webpack development server with the following features:
 * - Development mode
 * - Entry point at `./index.tsx`
 * - Output bundle at `dist/bundle.js`
 * - Targets the web platform
 * - Development server running on port 3000, serving static files from `./public`
 * - Automatic opening of the development server in the default browser
 * - Hot Module Replacement (HMR) and live reloading enabled
 * - Resolves TypeScript and JSX files with the `.tsx` and `.ts` extensions
 * - Transpiles TypeScript and JSX files using the `babel-loader`
 * - Generates an HTML template using the `html-webpack-plugin` based on `./public/index.html`
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, "..", "extension"),
        filename: 'content.js'
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