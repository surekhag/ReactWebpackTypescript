import path from "path";
import { Configuration } from "webpack";
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

const mode = process.argv[5];

const GetEnvironmentFile = (env: string) => {
    let environment = "";
    switch (env) {
        case "development":
            environment = "./src/config/web.dev_config.json";
            break;
        case "qa":
            environment = "./src/config/web.qa_config.json"
            break;
        case "uat":
            environment = "./src/config/web.uat_config.json"
            break;
        case "production":
            environment = "./src/config/web.prod_config.json"
            break;
        case "local":
            environment = "./src/config/web.local_config.json"
            break;
    }
    return environment;
}

let env = "";
let environment = "";

process.argv.forEach    ((val, index) => {
    if (val == "--env") {
        env = process.argv[index + 1];
    }
})

if (env)
    environment = GetEnvironmentFile(env);
console.log("Env details******", env, environment);

const PATHS = {
    path: path.join(__dirname, environment),
};

const config: Configuration = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: mode != "production" ? true : false,
                            // Prefer `dart-sass`
                            implementation: require.resolve("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
        ],
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            react: path.resolve(__dirname, 'node_modules', 'react'),
            'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
            '@babel': path.resolve(__dirname, 'node_modules', '@babel')
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "webpack_build"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "webpack_build"),
        compress: true,
        port: 4000,
    },
    devtool: mode != "production" ? "eval" : false, //For debugging only for dev env
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                projectName: JSON.stringify("ProjectInfo") //Test Env variable
            }
        })
    ],
    externals: {
        "configData": JSON.stringify(require(PATHS.path))
    },
    optimization: { // Implement as required
        moduleIds: "deterministic",
        usedExports: true,
        // runtimeChunk: {
        //     name: "manifest",
        //   },
        // splitChunks  : {
        //chunks : "all",   
        // },
        // emitOnErrors  : true,
    },



};

export default config;