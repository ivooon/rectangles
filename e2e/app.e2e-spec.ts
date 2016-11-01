import { Rectangles2Page } from './app.po';

describe('rectangles2 App', function() {
  let page: Rectangles2Page;

  beforeEach(() => {
    page = new Rectangles2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
