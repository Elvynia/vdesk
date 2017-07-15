import { browser, by, element } from 'protractor';

export class RammPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ramm-root h1')).getText();
  }
}
