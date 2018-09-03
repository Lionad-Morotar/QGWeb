/** 所有页面通用的JS代码端放在这里
 * 
 */

// pathname 与 中文名字的映射
const pageNameMap = {
    '/index': '【首页】'
}
// console.log(window.location.pathname)
window.pageNamePrefix = pageNameMap[window.location.pathname] || '【未知页面】'