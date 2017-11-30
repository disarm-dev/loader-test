const match_semver_cache = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/ig

;(async function () {
  const body = document.querySelector('body')
  const keys = await caches.keys()

  keys
    .reduce((acc, key) => {
      const matched = key.match(match_semver_cache)
      if (matched) {
        if (!acc.includes(matched[0])) acc.push(matched[0])
      }
      return acc
    }, [])
    .sort()
    .forEach(version => {
      const el = document.createElement('a')
      el.href = `/${version}/`
      el.innerText = version
      el.style = 'display: block;'
      body.appendChild(el)
    })

})()
