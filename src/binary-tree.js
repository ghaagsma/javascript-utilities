(() => {
    'use strict';

    let isGreater,
        getNode,
        deleteNode,
        promoteLeftChild,
        validateReplace,
        replace,
        getMinimumNodeInRightSubtree = (node) => {
            let curr = node.right;
            if (curr === null)
                return curr;
            while (curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        };

    class Node {
        constructor(value, left, right, parent) {
            this.value = value;
            this.left = left;
            this.right = right;
            this.parent = parent;
        }

        toString() {
            if (this === this.left) {
                throw new Error(`Node determined to be its own left child. ` +
                    `{ ${this.value} }`);
            }
            if (this === this.right) {
                throw new Error('Node determined to be its own right child. ' +
                    `{ ${this.value} }`);
            }

            let result = '';
            if (this.left !== null)
                result += `${this.left}`;
            result += `${this.value} `;
            if (this.right !== null)
                result += `${this.right}`;
            return result;
        }
    }

    class BinaryTree {
        constructor(comparator) {
            this.comparator = typeof (comparator) === typeof (Function) ?
                comparator : (a, b) => {
                    return a - b;
                };
            this.head = null;
            this.size = 0;

            isGreater = (a, b) => {
                return this.comparator(a, b) > 0;
            };

            getNode = (value) => {
                let curr = this.head;
                while (curr !== null) {
                    let diff = this.comparator(value, curr.value);
                    if (diff === 0) {
                        return curr;
                    }
                    if (diff < 0)
                        curr = curr.left;
                    else
                        curr = curr.right;
                }
                return null;
            };

            promoteLeftChild = (node) => {
                // Update parent to point to left child
                if (node.parent === null) {
                    this.head = node.left;
                } else if (!isGreater(node.value, node.parent.value)) {
                    node.parent.left = node.left;
                } else {
                    node.parent.right = node.left;
                }

                // Update parent of left child
                if (node.left !== null)
                    node.left.parent = node.parent;
            };

            validateReplace = (node, replacement) => {
                if (node === null)
                    throw new Error('Unexpected null node');
                if (replacement === null)
                    throw new Error('Unexpected null replacement node');
                if (replacement.parent === null)
                    throw new Error('Unexpected null parent of replacement node');
                if (replacement.left !== null)
                    throw new Error('Unexpected left child of replacement node');
            };

            replace = (node, replacement) => {
                validateReplace(node, replacement);

                // Promote replacement's right child
                if (!isGreater(replacement.value, replacement.parent.value))
                    replacement.parent.left = replacement.right;
                else
                    replacement.parent.right = replacement.right;

                // Update replacement's children
                replacement.left = node.left;
                replacement.right = node.right;

                // Update parent values
                replacement.parent = node.parent;
                if (replacement.left !== null)
                    replacement.left.parent = replacement;
                if (replacement.right !== null)
                    replacement.right.parent = replacement;

                // Place replacement into node's position
                if (node.parent === null) {
                    this.head = replacement;
                    return;
                }
                if (!isGreater(node.value, node.parent.value)) {
                    node.parent.left = replacement;
                } else {
                    node.parent.right = replacement;
                }
            };

            deleteNode = (node) => {
                --this.size;
                let replacement = getMinimumNodeInRightSubtree(node);
                if (replacement === null) {
                    promoteLeftChild(node);
                } else {
                    replace(node, replacement);
                }
            };
        }

        insert(value) {
            let parent = this.head,
                node = new Node(value, null, null, null);
            ++this.size;

            if (parent === null) {
                this.head = node;
                return;
            }

            while (parent !== null) {
                node.parent = parent;
                if (!isGreater(value, parent.value)) {
                    if (parent.left === null) {
                        parent.left = node;
                        return;
                    }
                    parent = parent.left;
                } else {
                    if (parent.right === null) {
                        parent.right = node;
                        return;
                    }
                    parent = parent.right;
                }
            }
        }

        contains(value) {
            return getNode(value) !== null;
        }

        delete(value) {
            let node = getNode(value);
            if (node === null)
                return false;
            deleteNode(node);
            return true;
        }

        count() {
            return this.size;
        }

        toString() {
            return `\n{\n` +
                `  size: ${this.size},\n` +
                (this.head !== null ? `  root: ${this.head.value},\n` : '') +
                `  left-first traversal: [ ${this.head}]\n` +
                `}`;
        }
    }

    module.exports = BinaryTree;
})();
