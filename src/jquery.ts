import { $, SelectorResult } from './selector';
import { ajax } from './ajax';
import { JQueryFunction } from './types';

const jQuery = $ as JQueryFunction;
jQuery.ajax = ajax;

export { SelectorResult };
export default jQuery;