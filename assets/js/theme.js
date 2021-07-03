import '../scss/style.scss';
import HomePage from './pages/home';

class Site {
  constructor(pageName, pageMap, moduleMap) {
    this.pageMap = pageMap;
    this.moduleMap = moduleMap;

    this.initModules();
    this.initPage(pageName);
  }

  initPage(pageName) {
    let Page = this.pageMap[pageName];
    if (Page) this.page = new Page(this);
  }

  initModules() {
    this.modules = {}; 
    Object.entries(this.moduleMap)
      .forEach(([name, Module]) => this.modules[name] = new Module);
  }

  isDebugging() {
    return window.__DEBUG__;
  }
}

new Site(
  $('body').data('page'),
  {
    /** 
     * Add the pages in format:
     * 'page-slug': PageClass
     */
    'home': HomePage,
  },
  {
    /** 
     * Add the modules in format:
     * 'module-slug': ModuleClass
     */
  }
);

