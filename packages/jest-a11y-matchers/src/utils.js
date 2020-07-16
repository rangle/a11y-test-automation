

export const blockElements = new Set([
    'html',
    'address',
    'blockquote',
    'body',
    'dd',
    'div',
    'dl',
    'dt',
    'fieldset',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'noframes',
    'ol',
    'p',
    'ul',
    'center',
    'dir',
    'hr',
    'menu',
    'pre',
]);


export function pretendVisibleGetComputedStyle(element) {
    // `CSSStyleDeclaration` is not constructable
    // https://stackoverflow.com/a/52732909/3406963
    // this is not equivalent to the declaration from `getComputedStyle`
    // e.g `getComputedStyle` would return a readonly declaration
    // let's hope this doesn't get passed around until it's no longer clear where it comes from
    const declaration = document.createElement('span').style;

    // initial values
    declaration.content = '';
    // technically it's `inline`. We partially apply the default user agent sheet (chrome) here
    // we're only interested in elements that use block
    declaration.display = blockElements.has(element.tagName.toLowerCase()) ? 'block' : 'inline';
    declaration.visibility = 'visible';

    return declaration;
}