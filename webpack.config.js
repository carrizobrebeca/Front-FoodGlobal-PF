const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,    // Maneja archivos .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,    // Maneja archivos .css
        use: ['style-loader', 'css-loader'],
      },
      // Agrega otras reglas para manejar otros tipos de archivos
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],    // Asegúrate de resolver .jsx y .js
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
