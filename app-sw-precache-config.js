module.exports = {
  filename: 'sw.js',
  cacheId: 'locational',
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
  ],
  skipWaiting: true
}
