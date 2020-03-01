# Riot Lazy

[![Build Status][travis-image]][travis-url] [![Code Quality][codeclimate-image]][codeclimate-url] [![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Coverage Status][coverage-image]][coverage-url]

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

[travis-image]:https://img.shields.io/travis/riot/lazy.svg?style=flat-square
[travis-url]:https://travis-ci.org/riot/lazy

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/@riotjs/lazy.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/@riotjs/lazy.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@riotjs/lazy

[coverage-image]:https://img.shields.io/coveralls/riot/lazy/master.svg?style=flat-square
[coverage-url]:https://coveralls.io/github/riot/lazy/?branch=master

[codeclimate-image]:https://api.codeclimate.com/v1/badges/be8992e6e7549e6b72a1/maintainability
[codeclimate-url]:https://codeclimate.com/github/riot/lazy/maintainability
