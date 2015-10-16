import AuthRocket from '../../src/authrocket';
let authrocket = new AuthRocket();
describe('AuthRocket', () => {
  describe('Config', () => {
    it('sets correct serverUrl', () => {
      expect(authrocket).to.be.an('object');
    });
  });
});
