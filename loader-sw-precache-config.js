module.exports = {
  filename: 'loader-sw.js',
  cacheId: 'locational-loader',
  maximumFileSizeToCacheInBytes: 14194304,
  navigateFallback: 'index.html',
  staticFileGlobsIgnorePatterns: [
    /\.map$/,
    /VERSION/,
    /COMMITHASH/
  ]
}
