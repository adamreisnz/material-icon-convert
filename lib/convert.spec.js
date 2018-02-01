'use strict';

/**
 * Dependencies
 */
const convert = require('./convert');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);
const deleteFile = Promise.promisify(fs.unlink);

/**
 * Specifications
 */
describe('Convert', () => {

  //Test string
  const test1 = `<i class="material-icons">face</i>`;
  const test2 = `<i class="Icon">face</i>`;
  const test3 = `<i class="Icon">find_replace</i>`;
  const test4 = `<i class="Icon Icon--foo">face</i>`;
  const test5 = `<i class="Icon--foo Icon">face</i>`;
  const test6 = `<i class="Icon">face</i>\n<i class="Icon">find_replace</i>`;

  //Codes
  const face = '&#xe87c;';
  const fr = '&#xe881;';

  /**
   * Prepare test files
   */
  beforeEach(() => Promise.all([
    writeFile('test1', test1, 'utf8'),
    writeFile('test2', test2, 'utf8'),
    writeFile('test3', test3, 'utf8'),
    writeFile('test4', test4, 'utf8'),
    writeFile('test5', test5, 'utf8'),
    writeFile('test6', test6, 'utf8'),
  ]));

  /**
   * Clean up test files
   */
  afterEach(() => Promise.all([
    deleteFile('test1'),
    deleteFile('test2'),
    deleteFile('test3'),
    deleteFile('test4'),
    deleteFile('test5'),
    deleteFile('test6'),
  ]));

  /**
   * Async with promises
   */
  describe('Async with promises', () => {

    it('should replace the default class name', () => {
      return convert({
        files: 'test1',
      }).then(() => {
        const test1 = fs.readFileSync('test1', 'utf8');
        expect(test1).to.equal(`<i class="material-icons">${face}</i>`);
      });
    });
    it('should replace a custom class name', () => {
      return convert({
        files: ['test2', 'test3'],
        className: 'Icon',
      }).then(() => {
        const test2 = fs.readFileSync('test2', 'utf8');
        const test3 = fs.readFileSync('test3', 'utf8');
        expect(test2).to.equal(`<i class="Icon">${face}</i>`);
        expect(test3).to.equal(`<i class="Icon">${fr}</i>`);
      });
    });
    it('should replace multiple icons', () => {
      return convert({
        files: 'test6',
        className: 'Icon',
      }).then(() => {
        const test6 = fs.readFileSync('test6', 'utf8');
        expect(test6).to.equal(`<i class="Icon">${face}</i>\n<i class="Icon">${fr}</i>`);
      });
    });
    it('should replace with additional class names', () => {
      return convert({
        files: ['test4', 'test5'],
        className: 'Icon',
      }).then(() => {
        const test4 = fs.readFileSync('test4', 'utf8');
        const test5 = fs.readFileSync('test5', 'utf8');
        expect(test4).to.equal(`<i class="Icon Icon--foo">${face}</i>`);
        expect(test5).to.equal(`<i class="Icon--foo Icon">${face}</i>`);
      });
    });
  });
});
