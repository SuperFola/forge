/**
 * author: Alexandre "superfola" Plateau <lexplt.dev@gmail.com>
 */

'use strict';

const isString = require('is-string');

/**
 * Create one or more HTML elements, with or without default properties, in a single function call
 * @details Any tag name (string) followed by an object will create an HTML element with the properties
 *          given in the object. Properties are defined in an object and must follow a string in the
 *          arguments lists. Properties can be forgotten to only leave the tag names.
 *          Example:
 * @code
 * const [ul, li] = forgeSomeElements('ul', 'li');
 * const [table, thead] = forgeSomeElements('table', { 'className': 'cool-table', 'width': '100%' }, 'thead');
 * @endcode
 * @param  {...any} args List of tag names and properties
 * @return {HTMLElement|Array<HTMLElement>}
 */
function forgeSomeElements(...args) {
    if (args.length === 1) {
        // if we have a single argument, return an HTMLElement
        return document.createElement(args[0]);
    } else {
        // otherwise read the argument list and create the HTMLElements following the properties given (if any)
        let current = null;
        let elements = [];
        let hadString = false;  // needed the know if we had a tag name before

        for (let arg of args) {
            // if we are playing with a tag name, we should remember it,
            // and if a tag name is following another one, then just create the
            // previous tag as a naked HTMLElement (no properties) and save it
            if (isString(arg)) {
                if (!hadString) {
                    current = forgeSomeElements(arg);
                } else {
                    elements.push(current);
                    current = forgeSomeElements(arg);
                }
                hadString = true;
            } else if (hadString && !isString(arg)) {
                // add properties to the last created HTMLElement
                Object.keys(arg).forEach(key => current[key] = arg[key]);
                elements.push(current);
                current = null;
                hadString = false;
            }
        }
        // don't forget to add the last element created if no properties were given to it
        if (current !== null)
            elements.push(current);
        // no need to return an array of length 1
        return elements.length === 1 ? elements[0] : elements;
    }
}

/**
 * Create a DOM hierarchy in a single function call
 * @details Example:
 * @code
 * forgeHierarchy(body, [
 *      p, [
 *          h2,
 *          another_p,
 *          div, [img]
 *      ],
 *      article
 * ]);
 * @endcode
 * @param {HTMLElement} parent The top node, to which every sub node of level 1 in the hierarchy should be attached
 * @param {Array<HTMLElement>} hierarchy List of elements and lists attached to the top node
 */
function forgeHierarchy(parent, hierarchy) {
    let previous = null;

    for (let node of hierarchy) {
        if (!Array.isArray(node)) {
            parent.appendChild(node);
            previous = node;
        } else {
            forgeHierarchy(previous, node);
        }
    }
}

/**
 * Add style to an HTMLElement in a single function call, because DRY
 * @param {HTMLElement} element The element which needs to be stylized
 * @param {Object} style A list of properties to add to the element through element.style.property = value
 */
function forgeStyle(element, style) {
    const keys = Object.keys(style);
    for (let key of keys) {
        element.style[key] = style[key];
    }
}

module.exports = {
    forgeSomeElements,
    forgeHierarchy,
    forgeStyle
};