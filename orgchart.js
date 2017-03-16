/* global $ */
var dummyData = [{
    label: 'President',
    children: [{
        label: 'Vice President of Administration',
        children: [{
            label: 'Director of Finance'
        }, {
            label: 'Director of Human Resources'
        }]
    }, {
        label: 'Vice President of Operations',
        children: [{
            label: 'Director of Distribution'
        }, {
            label: 'Director of Customer Service',
            children: [{
                label: 'Technical Support Manager'
            }]
        }]
    }, {
        label: 'Vice President of Merchandising',
        children: [{
            label: 'Director of Purchasing',
            children: [
                {label: 'Internal Purchasing Manager'}]
        }, {
            label: 'Director of Private Label'
        }, {
            label: 'Director of Planning',
            children: [{
                label: 'Off-road Demand Planner'
            }, {
                label: 'Cruiser Demand Planner'
            }]
        }, {
            label: 'Product Information Coordinator'
        }]
    }]
}];

var OrgTree = (function() {
    var publicAPI = {};

    this.options = {
        baseClass: 'org-tree',
        baseLevel: 12,
        minWidth: 2
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
            self = $('<div class="item col-md-' + level + '"  data-width="' + width + '">');

        if (node.children) {

            var childRow = $('<div class="row">');
            baseCol = Math.floor(baseCol / node.children.length);
            childRow.addClass('child-width-'+baseCol);
            if (baseCol < this.options.minWidth) {
                self.append(makeNode(node, true, !noParent, 'list-parent'));
                childRow.addClass('list').removeClass('row');
                sublevel = this.options.baseLevel;
            }
            else {
                self.append(makeNode(node, true, !noParent, ''));
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
            self.append(makeNode(node, false, !noParent, ''));
        }
        return self;
    }

    function makeNode(node, isParent, isChild, addlParentClass) {

        var container, mainItem = $(`
        <div class="node center-block">
                        ${node.label}
                    </div>
`);
        if (!isChild) {
            mainItem.addClass('root');
        }
        if (isParent) {
            container = $(`<div class="parent ${addlParentClass}">`);
            mainItem = container.append(mainItem);

        }
        //if (isChild) {
        container = $('<div class="child">');
        container.append(mainItem);
        mainItem = container.append(mainItem);
        //}
        return mainItem;
    }
    return publicAPI;
})();
