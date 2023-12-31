const { dirname } = require('path');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'ui', 'index.js'),
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }
                            ],
                            '@babel/preset-react']
                    }
                }
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'compact.js',
        path: path.resolve(__dirname, 'src', 'ui')
    }
}