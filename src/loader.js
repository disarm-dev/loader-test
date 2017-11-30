console.log('loader')

const match_semver_cache = new RegExp('(\d+\.\d+\.\d+)(?:\/)?(?:\$\$\$)?$')

(async function () {
  const keys = await caches.keys()
  const versions = keys.map(key => {
    const matched = match_semver_cache.match(key)
    console.log('matched', matched)
    if (matched) {
      return match[0]
    }
  }).filter(i => i)
  console.log(versions)
})()
