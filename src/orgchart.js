/* global $ */
var OrgTree = (function() {
    var publicAPI = {};

    this.options = {
        baseClass: 'org-tree',
        baseLevel: 12,
        minWidth: 2,
        renderNode: function(node){
            return `<div class="node center-block">
                        ${node.label}
                    </div>`;
        }
    };

    publicAPI.init = function(options) {
        $.extend(this.options, options);
    }.bind(this);

    publicAPI.makeOrgTree = function($elem, data) {
        var base = $('<div class="' + this.options.baseClass + '">');
        var row = $('<div class="row">');
        var level = this.options.baseLevel;

        data.forEach(function(node) {
            row.append(getNode(node, level, true, 12, 100));
        });
        base.append(row);
        $elem.append(base);
    }.bind(this);

    function getNode(node, level, noParent, baseCol, width) {
        var sublevel,
            self = $('<div class="item col-lg-' + level + '"  data-width="' + width + '">');
        if(width > 30) {
            self.addClass('col-md-'+level);
        }

        if (node.children) {

            var childRow = $('<div class="row">');
            baseCol = Math.floor(baseCol / node.children.length);
            self.addClass('child-width-'+baseCol);
            self.append(makeNode(node, true, !noParent));
            if (baseCol < this.options.minWidth) {
                sublevel = this.options.baseLevel;
            }
            else {
                sublevel = Math.floor(this.options.baseLevel / node.children.length);
                if (sublevel == 0) {
                    sublevel = 1;
                }
            }
            var childWidth = Math.floor(width / node.children.length);
            node.children.forEach(function(node) {
                childRow.append(getNode(node, sublevel, false, baseCol, childWidth));
            });
            self.append(childRow);
        }
        else {
            self.append(makeNode(node, false, !noParent));
        }
        return self;
    }

    function makeNode(node, isParent, isChild) {

        var container;
        var mainItem = $(this.options.renderNode(node));

        if (isParent) {
            container = $(`<div class="parent">`);
            mainItem = container.append(mainItem);

        }
        container = $('<div class="child">');
        if (!isChild) {
            container.addClass('root');
        }
        container.append(mainItem);
        mainItem = container.append(mainItem);
        return mainItem;
    }
    return publicAPI;
})();
