// import App from './loader.html'
//
// const app = new App({
//   target: document.querySelector( 'app' ),
//   data: {
//     name: 'world'
//   }
// });


import compareVersions from 'compare-versions'


(async () => {
  const match_semver_cache = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/ig
  const body = document.querySelector('body')

  let latest_version = []
  try {
    const fetch_version = await fetch('/latest/VERSION')
    latest_version = (await fetch_version.text()).replace('v', '')
  } catch (e) {
    console.log('Fetch for latest version failed - offline?')
  }

  const keys = await caches.keys()

  keys
    .concat(latest_version)
    .reduce((acc, key) => {
      const matched = key.match(match_semver_cache)
      if (matched) {
        if (!acc.includes(matched[0])) acc.push(matched[0])
      }
      return acc
    }, [])
    .sort(compareVersions)
    .forEach(version => {
      const el = document.createElement('a')
      el.href = `/${version}/`
      el.innerText = version
      el.style = 'display: block;'
      body.appendChild(el)
    })

})()
