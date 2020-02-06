import { component, pure } from 'riot'

// this object will contain all the components implementations lazy loaded
const cache = new WeakMap()

// expose the cache as static property
lazy.cache = cache

export default function lazy(Loader, Component) {
  // it could be that the user don't want to use a loader for whatever reason
  const hasLoader = Loader && Component
  const LazyComponent = hasLoader ? Component : Loader
  const load = () => typeof LazyComponent === 'function' ? LazyComponent() : Promise.resolve(LazyComponent)
  const cachedComponent = cache.get(LazyComponent)

  return {
    name: 'lazy',
    exports: pure(({ slots, attributes, props }) => ({
      mount(el, parentScope) {
        this.el = el
        this.isMounted = true
        const mount = () => this.mountLazyComponent(parentScope)

        if (cachedComponent) {
          mount()
        } else {
          if (hasLoader) this.createManagedComponent(Loader, parentScope)

          load().then(data => {
            cache.set(LazyComponent, data.default || data)
            mount()
          })
        }
      },
      createManagedComponent(Child, parentScope) {
        this.component = component(Child)(this.el, props, {
          attributes, slots, parentScope
        })
      },
      mountLazyComponent(parentScope) {
      // if this component was unmounted just return here
        if (!this.isMounted) return

        // unmount the loader if it was previously created
        // notice the true flat to keep the root node
        if (this.component) this.component.unmount(true)

        // replace the old component instance with the new lazy loaded component
        this.createManagedComponent(cache.get(LazyComponent), parentScope)
      },
      update(parentScope) {
        if (this.isMounted && this.component) this.component.update({}, parentScope)
      },
      unmount(...args) {
        this.isMounted = false

        if (this.component) this.component.unmount(...args)
      }
    }))
  }
}