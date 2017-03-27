Bootstrap 3.0 Org-Chart
=======================

*This is a work in progress.*

This project spawned because I needed an org chart that worked responsively.  
Since org charts tend to be quite wide, this is a particular challenge.

This code uses JS to create a basic DOM structure from a simple JSON object that 
describes the organization.  CSS pseudo-elements are used to draw the lines 
between the nodes.

Demo
----
[Simple Demo](sample.html)

[Custom Demo](custom.html)

Requirements
------------
- jQuery
- Bootstrap 3.0

Documentation
-------------

### Quick Start
- Include orgchart.js and orgchart.css on your site. (or customize the orgchart.scss)
- Call OrgTree.makeOrgTree(element, data)
- element must be a jQuery reference to the element you want to contain the chart
- Data is an object with a label and children

### Data
Data passed in must be a nested Javascript object, where children are nested 
inside their parents. By default, the node's label field will be displayed in 
the node, but this can be customized by specifying a custom `renderNode` function.

Example Structure.
```javascript
[
    {
        "label" : "Parent label",
        "children" : [
            {
                "label" : "Child label",
                "children" : [
                    "label" : "Grandchild label"
                ]
            }
        ]
    }
]
```

### OrgTree.setOptions
To override the defualt options call `OrgTree.setOptions(options)` where options
is an object with any of the following properties.
```javascript
{
    "baseClass": "org-tree",
    "baseLevel": 12,
    "minWidth": 2,
    "renderNode": function(node){
        return `<div class="node center-block">
                    ${node.label}
                </div>`;
    }
}
```

#### baseClass
This is the class will wrap the rendered tree.  It must match the same class in
the CSS.

#### baseLevel
This is the Bootstrap Grid column width of the containing element. If the tree is
fullscreen (*reccommended*) then this value should be 12.  Note that there are
currently known issues with responsiveness in values other than 12.

#### minWidth
This is the minimum Bootstrap Grid column width to contain a single node. Once
the tree splits to this width, it will take a vertical layout.

#### renderNode
`renderNode(node)` returns the HTML for an individual node. Additional fields
may be specified in the structure that can be referenced in the function.  See
[Custom Demo](custom.html) for an example.  Note, if you change the node width it
is best to change the `$node-width` variable in orgchart.scss and to recompile
the CSS.

### OrgTree.makeOrgTree
To render the tree, call `OrgTree.makeOrgTree(element, data)` where element is 
a jQuery reference to the containing element and data is a Javascript object
containing the data.

Known Issues
------------
- Non-fullscreen implementations are not responsive.

To-dos
------
* Enable node collapsing

