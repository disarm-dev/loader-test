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
  skipWaiting: true
}
