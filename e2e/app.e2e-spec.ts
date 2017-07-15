import { RammPage } from './app.po';

describe('ramm App', () => {
  let page: RammPage;

  beforeEach(() => {
    page = new RammPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ramm!');
  });
});
