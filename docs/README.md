Bootstrap 3.0 Org-Chart
=======================

*This is a work in progress.*

This project spawned because I needed an org chart that worked responsively.  Since org charts tend to be quite wide, this is a particular challenge.

This code uses JS to create a basic DOM structure from a simple JSON object that describes the organization.  CSS pseudo-elements are used to draw the lines between the nodes.

Demo
----
[Simple Demo](sample.html)

Requirements
------------
- jQuery
- Bootstrap 3.0

Usage
-----
- Include orgchart.js and orgchart.css on your site. (or customize the orgchart.scss)
- Call OrgTree.makeOrgTree(element, data)
- element must be a jQuery reference to the element you want to contain the chart
- Data is an object with a label and children

To-dos
------
* Demo page
* Multiple breakpoints
* Clean SCSS code to remove need for 'list' class
* Enable custom node styling
* Enable node collapsing
