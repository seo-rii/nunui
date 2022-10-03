declare const window: any;
declare const document: any;

let supportsPassive = false
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true
            }
        })
    )
} catch (e) {
}
export const wheelOpt = supportsPassive ? {passive: false} : false
export const wheelEvent =
    typeof document !== 'undefined' && 'onwheel' in document?.createElement?.('div')
        ? 'wheel'
        : 'mousewheel'
