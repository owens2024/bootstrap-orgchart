Bootstrap 3.0 Org-Chart
=======================

*This is a work in progress.*

This project spawned because I needed an org chart that worked responsively.  Since org charts tend to be quite wide, this is a particular challenge.

This code uses JS to create a basic DOM structure from a simple JSON object that describes the organization.  CSS pseudo-elements are used to draw the lines between the nodes.

Demo
----
[Demos](https://owens2024.github.io/bootstrap-orgchart/)

Requirements
------------
- jQuery
- Bootstrap 3.0

Usage
-----
### Quick Start
- Include orgchart.js and orgchart.css on your site. (or customize the orgchart.scss)
- Call OrgTree.makeOrgTree(element, data)
- element must be a jQuery reference to the element you want to contain the chart
- Data is an object with a label and children
- [More Documentation](https://owens2024.github.io/bootstrap-orgchart/)

To-dos
------
- Wide and narrow examples
- Unit tests
