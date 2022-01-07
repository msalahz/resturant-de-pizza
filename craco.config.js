/* eslint-disable @typescript-eslint/no-var-requires */
const { whenDev } = require('@craco/craco')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  webpack: {
    plugins: {
      add: [
        ...whenDev(
          () => [
            new CircularDependencyPlugin({
              exclude: /node_modules/,
              include: /src/,
              failOnError: true,
              allowAsyncCycles: false,
              cwd: process.cwd(),
            }),
          ],
          []
        ),
      ],
    },
  },
}