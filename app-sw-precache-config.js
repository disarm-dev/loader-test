module.exports = {
  filename: 'app-sw.js',
  cacheId: 'locational-app',
  maximumFileSizeToCacheInBytes: 14194304,
  navigateFallback: 'index.html',
  staticFileGlobsIgnorePatterns: [
    /\.map$/,
    /VERSION/,
    /COMMITHASH/
  ],
  runtimeCaching: [
    {
      urlPattern: /\/static\/?(?:[^\/]+\/?)*$/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /(api|tiles)\.mapbox\.com/,
      handler: 'cacheFirst'
    }
  ]
}
