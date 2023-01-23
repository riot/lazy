# Riot Lazy

[![Riot.js lazy logo](https://raw.githubusercontent.com/riot/branding/main/lazy/lazy-horizontal.svg)](https://github.com/riot/lazy/)

[![Build Status][ci-image]][ci-url] [![Code Quality][codeclimate-image]][codeclimate-url] [![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Coverage Status][coverage-image]][coverage-url]

> Lazy wrapper for Riot.js components


## Table of Contents

- [Install](#install)
- [Documentation](#documentation)

## Install

```sh
npm i -S @riotjs/lazy
```

## Documentation

The following examples show how you can lazy load Riot.js components using modern javascript bundlers like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/).

You can lazy load any component providing a fallback component during the loading process for example:

```riot
<app>
  <user name={state.name}/>
  <sidebar/>

  <script>
    import lazy from '@riotjs/lazy'
    import Loader from './my-loader.riot'

    export default {
      components: {
        // use a fallback loader
        user: lazy(Loader, () => import('./user.riot'))
        // just lazy load the sidebar
        sidebar: lazy(() => import('./sidebar.riot'))
      }
    }
  </script>
</app>
```

When the component is loaded, Lazy will dispatch a 'load' event from the component root element.

This can be useful e.g. for removing splashscreen on app start:

```riot
<app>
  <user name={state.name} onload={ removeSplashscreen }/>

  <script>
    import lazy from '@riotjs/lazy'
    import Loader from './my-loader.riot'

    export default {
      components: {
        // use a fallback loader
        user: lazy(Loader, () => import('./user.riot'))
      },
      removeSplashscreen() {
        // the splashscreen, in this example, is create in pure html
        // in the main page, to avoid blank page loading
        const splashscreen = document.querySelector("#splashscreen");
        if (!splashscreen) {
          return;
        }
        splashcreen.parentElement.removeChild(splashscreen);
      }
    }
  </script>
</app>
```

Lazy loading Riot.js components is recommended combined with [`@riotjs/route`](https://github.com/riot/route)

```riot
<app>
  <router>
    <route path="/user/:name">
      <!-- this component will be loaded only when the route will be matched -->
      <user name={route[0]}/>
    </route>
  </router>

  <script>
    import lazy from '@riotjs/lazy'
    import Loader from './my-loader.riot'

    export default {
      components: {
        user: lazy(Loader, () => import('./user.riot'))
      }
    }
  </script>
</app>
```

[ci-image]:https://img.shields.io/github/actions/workflow/status/riot/lazy/test.yml?style=flat-square
[ci-url]:https://github.com/riot/lazy/actions

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/@riotjs/lazy.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/@riotjs/lazy.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@riotjs/lazy

[coverage-image]:https://img.shields.io/coveralls/riot/lazy/main.svg?style=flat-square
[coverage-url]:https://coveralls.io/github/riot/lazy/?branch=main

[codeclimate-image]:https://api.codeclimate.com/v1/badges/be8992e6e7549e6b72a1/maintainability
[codeclimate-url]:https://codeclimate.com/github/riot/lazy/maintainability
