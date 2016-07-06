/* global describe it expect */
import AuthRocket from '../../src'
let authrocket = new AuthRocket()

describe('AuthRocket', () => {
  describe('Config', () => {
    it('sets correct serverUrl', () => {
      expect(authrocket).to.be.an('object')
    })
  })
  describe('login method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('login')
    })
    it('accepts username', () =>
      expect(authrocket.login({username: 'testuser', password: 'testpassword'}))
        .to.eventually.resolve
    )
  })
  describe('signup method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('signup')
    })
    it('accepts username', () =>
      expect(authrocket.signup({username: 'testuser'})).to.eventually.resolve
    )
  })
  describe('logout method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('logout')
    })
    it('logs user out', () =>
      expect(authrocket.logout()).to.eventually.resolve
    )
  })
  describe('Realms method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Realms')
    })
    it('returns an object', () =>
      expect(authrocket.Realms()).to.be.an.object
    )
  })
  describe('Users method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Users')
    })
    it('returns an object', () =>
      expect(authrocket.Users()).to.be.an.object
    )
  })
  describe('Credentials method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Credentials')
    })
    it('returns an object', () =>
      expect(authrocket.Credentials()).to.be.an.object
    )
  })
  describe('SignupTokens method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('SignupTokens')
    })
    it('returns an object', () =>
      expect(authrocket.SignupTokens()).to.be.an.object
    )
  })
  describe('Orgs method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Orgs')
    })
    it('returns an object', () =>
      expect(authrocket.Orgs()).to.be.an.object
    )
  })
  describe('Memberships method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Memberships')
    })
    it('returns an object', () =>
      expect(authrocket.Memberships()).to.be.an.object
    )
  })
  describe('AuthProviders method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('AuthProviders')
    })
    it('returns an object', () =>
      expect(authrocket.AuthProviders()).to.be.an.object
    )
  })
  describe('ConnectedApps method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('ConnectedApps')
    })
    it('returns an object', () =>
      expect(authrocket.ConnectedApps()).to.be.an.object
    )
  })
  describe('Hooks method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Hooks')
    })
    it('returns an object', () =>
      expect(authrocket.Hooks()).to.be.an.object
    )
  })
  describe('Sessions method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Sessions')
    })
    it('returns an object', () =>
      expect(authrocket.Sessions()).to.be.an.object
    )
  })
  describe('Events method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Events')
    })
    it('returns an object', () =>
      expect(authrocket.Events()).to.be.an.object
    )
  })
  describe('Notifications method', () => {
    it('exists', () => {
      expect(authrocket).to.respondTo('Notifications')
    })
    it('returns an object', () =>
      expect(authrocket.Notifications()).to.be.an.object
    )
  })
})
