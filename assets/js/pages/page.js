import $ from 'jquery';

class Page {
  constructor(site) {
    this.site = site;
    this.$page = $('body');
    this.pageName = this.$page.data('page');

    this.setup();
    this.listen();
  }

  setup() {
    // implement in child
  }

  listen() {
    // implement in child
  }

  $(query) {
    if (this.site.isDebugging()) console.log(`page query: ${query}`);
    return this.$page.find(query);
  }

  $find(element) {
    return this.$(this.getSelector(element));
  }

  getSelector(element) {
    return `.${this.getClass(element)}`;
  }

  getClass(element) {
    return `${this.pageName}-page__${element}`;
  }

  toggleScrollLock() {
    const $document = $('html');
    if ($document.hasClass('document--scroll-locked')) {
      $document.removeClass('document--scroll-locked');
      $document.scrollTop($document.data('--scroll-lock-top'));
    } else {
      $document.data('--scroll-lock-top', $document.scrollTop());
      $document.addClass('document--scroll-locked');
    }
  }
}

export default Page;