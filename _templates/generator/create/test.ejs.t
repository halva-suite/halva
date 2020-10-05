---
to: _templates/<%= name %>/<%= action || 'new' %>/mytest/<%= name %>.test.js
---

// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
describe('Halva test', () => {
  describe('test global', () => {
    it('Get global var', async () => {
        console.log(halva_accounts[0].address);
    });
  });
});
