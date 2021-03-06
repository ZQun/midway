import {Agent, Application, Logger} from 'egg';
import {AgentWorkerLoader, AppWorkerLoader} from './loader/loader';

const path = require('path');
const MIDWAY_PATH = path.dirname(__dirname);

class MidwayApplication extends (<{
  new(...x)
}> Application) {

  get [Symbol.for('egg#loader')]() {
    return AppWorkerLoader;
  }

  get [Symbol.for('egg#eggPath')]() {
    return MIDWAY_PATH;
  }

  getConfig(key?) {
    return key ? this.config[key] : this.config;
  }

  get enablePlugins() {
    return this.plugins;
  }

  getLogger(name?) {
    return name ? this.loggers[name] : this.logger;
  }

  getPlugin(pluginName) {
    return this.getPluginContext().get(pluginName);
  }

  getPluginContext() {
    return (<AppWorkerLoader>this.loader).pluginContext;
  }

  getApplicationContext() {
    return (<AppWorkerLoader>this.loader).applicationContext;
  }

  generateController(controllerMapping: string) {
    return (<AppWorkerLoader>this.loader).generateController(controllerMapping);
  }

  /**
   * The current code base directory of application
   * in typescript mode is include src
   * @member {String}
   */
  get baseDir(): string {
    return this.loader.baseDir;
  }

  /**
   * The current directory of application
   * @member {String}
   */
  get appDir(): string {
    return this.loader.appDir;
  }

  /**
   * get application context
   */
  get applicationContext() {
    return this.loader.applicationContext;
  }

  /**
   * get plugin context
   */
  get pluginContext() {
    return this.loader.pluginContext;
  }
}

class MidwayAgent extends (<{
  new(...x)
}> Agent) {

  get [Symbol.for('egg#loader')]() {
    return AgentWorkerLoader;
  }

  get [Symbol.for('egg#eggPath')]() {
    return MIDWAY_PATH;
  }

  getConfig(key?) {
    return key ? this.config[key] : this.config;
  }

  getLogger(name?): Logger {
    return name ? this.loggers[name] : this.logger;
  }

  getPlugin(pluginName) {
    return this.getPluginContext().get(pluginName);
  }

  getPluginContext() {
    return (<AgentWorkerLoader>this.loader).pluginContext;
  }

  getApplicationContext() {
    return (<AgentWorkerLoader>this.loader).applicationContext;
  }

  /**
   * The current code base directory of application
   * in typescript mode is include src
   * @member {String}
   */
  get baseDir(): string {
    return this.loader.baseDir;
  }

  /**
   * The current directory of application
   * @member {String}
   */
  get appDir(): string {
    return this.loader.appDir;
  }

  /**
   * get application context
   */
  get applicationContext() {
    return this.loader.applicationContext;
  }

  /**
   * get plugin context
   */
  get pluginContext() {
    return this.loader.pluginContext;
  }
}

export {
  MidwayApplication as Application,
  MidwayAgent as Agent
};
