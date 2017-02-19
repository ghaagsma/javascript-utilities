(() => {
    'use strict';

    let chai = require('chai'),
        BinaryTree = require('../src/binary-tree');

    let createAndVerify = () => {
            let tree = new BinaryTree();
            tree.count().should.equal(0);
            return tree;
        },
        insertAndVerify = (tree, value) => {
            let count = tree.count();
            tree.insert(value);
            tree.contains(value).should.equal(true);
            tree.count().should.equal(count + 1);
        },
        deleteAndVerify = (tree, value) => {
            let count = tree.count();
            let result = tree.delete(value);
            if (result)
                tree.count().should.equal(count - 1);
            else
                tree.count().should.equal(count);
            return result;
        },
        buildBalancedTree = () => {
            let tree = createAndVerify();
            insertAndVerify(tree, 8);
            insertAndVerify(tree, 4);
            insertAndVerify(tree, 12);
            insertAndVerify(tree, 2);
            insertAndVerify(tree, 6);
            insertAndVerify(tree, 10);
            insertAndVerify(tree, 14);
            insertAndVerify(tree, 1);
            insertAndVerify(tree, 3);
            insertAndVerify(tree, 5);
            insertAndVerify(tree, 7);
            insertAndVerify(tree, 9);
            insertAndVerify(tree, 11);
            insertAndVerify(tree, 13);
            insertAndVerify(tree, 15);
            return tree;
        },
        verifyDeletionFromBalancedTree = (tree, values) => {
            for (let i = 1; i <= 15; ++i) {
                if (values.indexOf(i) !== -1)
                    tree.contains(i).should.equal(false);
                else
                    tree.contains(i).should.equal(true);
            }
        };

    before(() => {
        chai.should();
    });

    describe('binary-tree', () => {
        describe('insert && contains', () => {
            it('should insert and find a node located at the head', () => {
                let tree = createAndVerify();
                tree.contains(5).should.equal(false);
                insertAndVerify(tree, 5);
            });

            it('should insert and find leaf nodes', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 5);
                tree.contains(2).should.equal(false);
                tree.contains(12).should.equal(false);
                insertAndVerify(tree, 2);
                insertAndVerify(tree, 12);
                tree.contains(2).should.equal(true);
            });

            it('should insert and find parent nodes', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 2);
                insertAndVerify(tree, 12);
                insertAndVerify(tree, 7);
                insertAndVerify(tree, 16);
                tree.contains(12).should.equal(true);
            });

            it('should insert and find duplicate nodes', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                tree.count().should.equal(5);
            });
        });

        describe('delete', () => {
            it('should return false if value is not found', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 3);
                deleteAndVerify(tree, 0).should.equal(false);
            });

            it('should delete the head node from a tree containing 1 node', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 10);
                deleteAndVerify(tree, 10).should.equal(true);
                tree.contains(10).should.equal(false);
            });

            it('should delete the head node with a right subtree', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 10);
                insertAndVerify(tree, 8);
                insertAndVerify(tree, 15);
                insertAndVerify(tree, 12);
                insertAndVerify(tree, 20);
                deleteAndVerify(tree, 10);
                tree.contains(10).should.equal(false);
                tree.contains(8).should.equal(true);
                tree.contains(15).should.equal(true);
                tree.contains(12).should.equal(true);
                tree.contains(20).should.equal(true);
            });

            it('should delete the head node with no right subtree', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 3);
                insertAndVerify(tree, 1);
                insertAndVerify(tree, 4);
                deleteAndVerify(tree, 5);
                tree.contains(5).should.equal(false);
                tree.contains(1).should.equal(true);
                tree.contains(3).should.equal(true);
                tree.contains(4).should.equal(true);
            });

            it('should delete a left child with a right subtree', () => {
                let tree = buildBalancedTree();
                deleteAndVerify(tree, 4).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                verifyDeletionFromBalancedTree(tree, [4, 5]);
            });

            it('should delete a left child with no right subtree', () => {
                let tree = buildBalancedTree();
                deleteAndVerify(tree, 7).should.equal(true);
                deleteAndVerify(tree, 6).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                deleteAndVerify(tree, 4).should.equal(true);
                verifyDeletionFromBalancedTree(tree, [4, 5, 6, 7]);
            });

            it('should delete a right child with a right subtree', () => {
                let tree = buildBalancedTree();
                deleteAndVerify(tree, 12).should.equal(true);
                deleteAndVerify(tree, 13).should.equal(true);
                deleteAndVerify(tree, 14).should.equal(true);
                verifyDeletionFromBalancedTree(tree, [12, 13, 14]);
            });

            it('should delete a right child with no right subtree', () => {
                let tree = buildBalancedTree();
                deleteAndVerify(tree, 12).should.equal(true);
                deleteAndVerify(tree, 13).should.equal(true);
                deleteAndVerify(tree, 14).should.equal(true);
                deleteAndVerify(tree, 15).should.equal(true);
                verifyDeletionFromBalancedTree(tree, [12, 13, 14, 15]);
            });

            it('should delete only one value', () => {
                let tree = createAndVerify();
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                insertAndVerify(tree, 5);
                deleteAndVerify(tree, 5).should.equal(true);
                tree.contains(5).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(true);
                deleteAndVerify(tree, 5).should.equal(false);
            });
        });
    });
})();
