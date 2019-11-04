const profiles = require('../../src/config/profile/profiles');

describe('Caso de teste para verificação dos profiles', () => {
    test('Profile - desenvolvimento', (done) => {
        const profile = profiles.profile('desenvolvimento');
        expect(profile.ambiente).toBe('desenvolvimento');
        done();
    });
    test('Profile - homologacao', (done) => {
        const profile = profiles.profile('homologacao');
        expect(profile.ambiente).toBe('homologacao');
        done();
    });
    test('Profile - teste', (done) => {
        const profile = profiles.profile('teste');
        expect(profile.ambiente).toBe('teste');
        done();
    });
    test('Profile - producao', (done) => {
        const profile = profiles.profile('production');
        expect(profile.ambiente).toBe('production');
        done();
    });
});