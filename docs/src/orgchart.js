/* OrgChart.js 0.8
Author Lee Owens 
https://owens2024.github.io/bootstrap-orgchart/ 
*/
var OrgTree = (function() {
    var publicAPI = {};
    this.bootstrapGridBase = 12;
    
    this.options = {
        baseClass: 'org-tree',
        baseLevel: this.bootstrapGridBase,
        minWidth: 2,
        collapsable: true,
        renderNode: function(node){
            return `<div class="node center-block">
                        ${node.label}
                        ${this.renderCollapseIcon(node)}
                    </div>`;
        },
        renderCollapseIcon: function(node){
            if(this.collapsable && node.children && node.children.length > 0) {
                return `<br />
                <a href="#" class="collapse_node">
                    <i class="glyphicon glyphicon-minus-sign"></i>
                </a>`;
            } else {
                return '';
            }
        },
        toggleCollapseIcon: function(icon) {
            $(icon).toggleClass('glyphicon-minus-sign glyphicon-plus-sign');
        }
    };

    publicAPI.setOptions = function(options) {
        $.extend(this.options, options);
    }.bind(this);

    publicAPI.makeOrgTree = function($elem, data) {
        var base = $('<div class="' + this.options.baseClass + '">');
        var row = $('<div class="row">');
        var level = this.options.baseLevel;
        var width = this.bootstrapGridBase;

        data.forEach(function(node) {
            row.append(getNode(node, width, true, level, 100));
        });
        base.append(row);
        $elem.append(base);
        bindCollapse();
    }.bind(this);
    
    function bindCollapse(){
        if(this.options.collapsable) {
            $(document).on('click.orgchart.collapse', '.collapse_node', $.proxy(function(ev){
                $(ev.target).parents(".item:first").find(".row").toggle();
                $(ev.target).parents(".parent").toggleClass("collapsed");
                this.options.toggleCollapseIcon(ev.target);
            }, this));
        }
    }

    function getNode(node, level, noParent, baseCol, width) {
        var sublevel,
            self = $('<div class="item col-lg-' + level + '"  data-width="' + width + '">');
        if(width > 30) {
            self.addClass('col-md-'+level);
        }

        if (node.children) {

            var childRow = $('<div class="row">');
            baseCol = Math.floor(baseCol / node.children.length);
            if(baseCol == 0) baseCol = 1;
            self.addClass('child-width-'+baseCol);
            self.append(makeNode(node, true, !noParent));
            if (baseCol < this.options.minWidth) {
                sublevel = this.bootstrapGridBase;
            }
            else {
                sublevel = Math.floor(this.bootstrapGridBase / node.children.length);
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
