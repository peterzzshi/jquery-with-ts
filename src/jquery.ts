import { ajax } from './ajax';
import { $, SelectorResult } from './selector';
import { JQueryFunction } from './types';

const jQuery = $ as JQueryFunction;
jQuery.ajax = ajax;

export { SelectorResult };
export default jQuery;
