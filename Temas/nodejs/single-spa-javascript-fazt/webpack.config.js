const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",

    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader", "css-loader"],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

            {
                test: /\.html$/i,
                loader: "html-loader",
            },

        ],
    }
}