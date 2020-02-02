import ComponentWithSlotWrapper from './components/component-with-slot-wrapper.riot'
import UserWrapper from './components/user-wrapper.riot'
import UserWrapperWithoutLoader from './components/user-wrapper-without-loader.riot'
import {component} from 'riot'
import {expect} from 'chai'
import lazy from '../'

const defer = () => Promise.resolve().then.bind(Promise.resolve())

describe('lazy', () => {
  it('it\'s ok being lazy', () => {
    // istn't that funny :D
    expect(lazy).to.be.ok
  })

  it('Components with loader can be lazily loaded', async function() {
    const div = document.createElement('div')
    const el = component(UserWrapper)(div, {
      name: 'Gianluca'
    })

    const loaderP = el.$('p')
    expect(loaderP.innerHTML).to.be.equal('Loading...')

    await defer()

    const userP = el.$('p')
    expect(userP.innerHTML).to.be.equal('Gianluca')

    el.unmount()
  })

  it('Components without loader can be lazily loaded', async function() {
    const div = document.createElement('div')
    const el = component(UserWrapperWithoutLoader)(div, {
      name: 'Gianluca'
    })

    await defer()

    const p = el.$('p')
    expect(p.innerHTML).to.be.equal('Gianluca')

    el.unmount()
  })

  it('Components having slots can be lazily loaded', async function() {
    const div = document.createElement('div')
    const el = component(ComponentWithSlotWrapper)(div, {
      greeting: 'Hello'
    })

    const loaderP = el.$('p')
    expect(loaderP.innerHTML).to.be.equal('Loading...')

    await defer()

    const p = el.$('p')
    expect(p.innerHTML).to.be.equal('Hello')

    el.unmount()
  })
})