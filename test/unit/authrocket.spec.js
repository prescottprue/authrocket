/* global describe it expect */
import AuthRocket from '../../src'
let authrocket = new AuthRocket()

describe('AuthRocket', () => {
  describe('Config', () => {
    it('sets correct serverUrl', () => {
      expect(authrocket).to.be.an('object')
    })
  })
})
