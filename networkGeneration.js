/*
 *		author:  	Max Ohn
 *		project: 	Software Praktikum SS18
 *		faculty:    CCSH RWTH Aachen 
 *
 */

//
// ----------------------------< HTML page building >----------------------------
//
d3.selectAll("html body").style("height", "98vh");

d3.select("body").append("div").attr("id", "container").style("position", "relative")
	.append("div")
	.attr("id", "divNetwork")
	.styles({width: "51%", height: "100%", float: "left"});

d3.select("#container")
	.styles({width: "99%", height: "98%", overflow: "hidden", position: "absolute"})
	.append("div").attr("id", "divChart")
	.styles({width: "48%", height: "100%"});;

// Network dropdown button
let networkDropdown = d3.select("#divNetwork")
	.append("div")
	.attr("id", "networkDropdown")
	.styles({float: "left", position: "relative", display: "inline-block"});
networkDropdown.append("button")
	.attrs({id: "networkDropdownButton", onclick: "toggleDropdown(\"network\")"})
	.text("Model type")
	.styles({"background-color": "#0000FF", color: "white", padding: "16px", "font-size": "16px", border: "none", cursor: "pointer"})
	.on("mouseover", d => { d3.select("#networkDropdownButton").style("background-color", "#000080"); })
	.on("mouseout", d => {
		if (d3.select("#networkDropdownMenu").style("display") == "none") {
			d3.select("#networkDropdownButton").style("background-color", "#0000FF");
		}
	});

// Network dropdown menu and items
networkDropdown.append("div")
	.attr("id", "networkDropdownMenu")
	.styles({	display: "none", position: "absolute", overflow: "auto", right: 0, "z-index": 3,
				"min-width": "120px", "background-color": "#f1f1f1", "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"})
	.selectAll("a")
	.data([	{type: "Barabasi", onclick: "changeToBarab()"}, 
			{type: "Minority", onclick: "changeToMinor()"},
			{type: "Gilbert", onclick: "changeToGilbert()"},
			{type: "Watts-Alpha", onclick: "changeToWattsA()"},
			{type: "Watts-Beta", onclick: "changeToWattsB()"}
	]).enter()
	.append("a")
	.attrs({id: d => { return "networkDropdownItem" + d.type; }, onclick: d => { return d.onclick; }})
	.text(d => { return d.type; })
	.styles({display: "block", padding: "12px 16px", cursor: "context-menu"})
	.on("mouseover", d => { d3.select("#networkDropdownItem" + d.type).style("background-color", "#ddd") })
	.on("mouseout", d => { d3.select("#networkDropdownItem" + d.type).style("background-color", "#f1f1f1") });

// Padding between networkDropdownButton and setparamsButton
d3.select("#divNetwork")
	.append("div")
	.styles({float: "left", position: "relative", display: "inline-block", height: "1px", width: "10px"})

// Parameter customization
d3.select("#divNetwork")
	.append("div")
	.styles({float: "left", position: "relative", display: "inline-block"})
	.append("button")
	.attrs({id: "setParamsButton", onclick: "setParameters()"})
	.text("Set parameters")
	.styles({"background-color": "#0000FF", color: "white", padding: "16px", "font-size": "16px", border: "none", cursor: "pointer"})
	.on("mouseover", d => { d3.select("#setParamsButton").style("background-color", "#000080"); })
	.on("mouseout", d => {
		d3.select("#setParamsButton").style("background-color", "#0000FF");
	});

// Prepare chart box
let chartDropdown = d3.select("#divChart").styles({width: "48%", height: "100%", overflow: "hidden", float: "right"})

// Chart dropdown button
	.append("div")
	.attr("id", "chartDropdown")
	.styles({float: "right", position: "relative", display: "inline-block"});
chartDropdown.append("button")
	.attrs({id: "chartDropdownButton", onclick: "toggleDropdown(\"chart\")"})
	.text("Chart type")
	.styles({"background-color": "#0000FF", color: "white", padding: "16px", "font-size": "16px", border: "none", cursor: "pointer"})
	.on("mouseover", d => { d3.select("#chartDropdownButton").style("background-color", "#000080"); })
	.on("mouseout", d => {
		if (d3.select("#chartDropdownMenu").style("display") == "none") {
			d3.select("#chartDropdownButton").style("background-color", "#0000FF");
		}
	});

// Chart dropdown menu and items
 chartDropdown.append("div")
	.attr("id", "chartDropdownMenu")
	.styles({	display: "none", position: "absolute", overflow: "auto", right: 0, "z-index": 3,
				"min-width": "120px", "background-color": "#f1f1f1", "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"})
	.selectAll("a")
	.data([	{type: "Bar", onclick: "changeToBar()"}, 
			{type: "Scatter", onclick: "changeToScatter()"},
			{type: "AvgPathLength", onclick: "changeToAPL()"}
	]).enter()
	.append("a")
	.attrs({id: d => { return "chartDropdownItem" + d.type; }, onclick: d => { return d.onclick; }})
	.text(d => { return d.type; })
	.styles({display: "block", padding: "12px 16px", cursor: "context-menu"})
	.on("mouseover", d => { d3.select("#chartDropdownItem" + d.type).style("background-color", "#ddd") })
	.on("mouseout", d => { d3.select("#chartDropdownItem" + d.type).style("background-color", "#f1f1f1") });

// Radio buttons for x scale
d3.select("#divChart").append("div").attr("id", "chartParams").append("div").attr("id", "xScaleRadio").append("label").text("x: ")
let xScaleRadio = d3.select("#xScaleRadio").selectAll("span")
	.data([{v: "Lin", f: "changeToLin(\"x\")"}, {v: "Log", f: "changeToLog(\"x\")"}])
	.enter().append("span")
xScaleRadio.append("input")
	.attrs({type: "radio", name: "xScaleRadio", value: d => { return d.v.toLowerCase(); }, onchange: d => { return d.f}})
	.property("checked", d => { return d.v === "Lin"})
xScaleRadio.append("label").text(d => { return d.v; })

// Radio buttons for y scale
d3.select("#chartParams").append("div").attr("id", "yScaleRadio").append("label").text("y: ")
let yScaleRadio = d3.select("#yScaleRadio").selectAll("span").data([
		{v: "Lin", f: "changeToLin(\"y\")"}, 
		{v: "Log", f: "changeToLog(\"y\")"},
		{v: "Abs", f: "changeToActual()"}
	]).enter().append("span")
yScaleRadio.append("input")
	.attrs({type: "radio", name: "yScaleRadio", value: d => { return d.v.toLowerCase(); }, onchange: d => { return d.f}})
	.property("checked", d => { return d.v === "Lin"})
yScaleRadio.append("label").text(d => { return d.v; })

// svg containing the network (left)
const svgNetwork = d3.select("#divNetwork").append("svg")
	.attrs({id: "networkCanvas", width: "90%", height: "90%"})
	.styles({overflow: "hidden", border: "3px solid black", margin: "auto", cursor: "pointer"});

// svg containing the chart (right)
const svgChart = d3.select("#divChart").append("svg")
	.attrs({width: "90%", height: "85%"})
	.styles({overflow: "visible", float: "right", margin: "auto", cursor: "pointer"});

 // "Watermark"
 d3.select("#container").append("div")
 	.styles({position: "absolute", bottom: 0})
 	.append("text")
 	.text("Application created by Max Ohn for the course \"Softwarepraktikum\" during the summer semester 2018 " +
 			"at the CSSH faculty of RWTH Aachen, supervision by Dr. Florian Lemmerich and Prof. Dr. Markus Strohmaier.")
	.styles({"font-size": "12px", "font-family": "sans-serif"});

//
// --------------------------- </ HTML page building >---------------------------
//

//
// -----------------------------< Global variables >-----------------------------
//
let network = [];		// Adjacency matrix of the network
let initNodes = 5;		// Amount of initial nodes
let maxNodes = 512;		// Maximal amount of nodes
const radius = d => {	// Radius of nodes depends on node degree
	if (typeof d === "number") {
		return 1.2*d+2;
	}
	return 1.2*d.deg+2; 
};

let model = "barab";	// Current model generating new edges
let initProb = 0.3;		// Probability that an edge in the initial graph exists
let initPartners = 1;	// Determines to how many nodes each new node will connect
let minorityPercentage = 0.2;	// Minority percentage for minority model
let relationalFactor = 0.8;	// Factor deciding whether nodes of the same groups want to connect
							// (1-relationalFactor for nodes of different groups)
let currGilbert;		// Memorizes current nodes for which an edge might be generated
let initDegree = 4;		// Degree of nodes in regular network (watts)
let rewireProb = 0.5;	// Probability that an edge gets rewired (wattsB)
let globalIter;			// Keeps track of a variable with global scope
let alphaFactor = 1;	// wattsA variable to regulate between caveman vs solaria propensities
let finalAvgDegree = 5;	// wattsA halts as soon as this average degree is reached

let color;		// Color scale for nodes and chart bars

let chartType = "bar";		// Type of chart (bar, scatter, apl)
let xScaleType = "lin";		// Scale of x-Axis (lin or log)
let yScaleType = "lin";		// Scale of y-Axis (lin, log or abs)
let twSize = -1;			// Determines how many time steps of the past we save for avgPathLength
let aplTimeWindow;			// Keeps track of previous avgPathLength's
let isFirstStep = true;		// Removes aplTimeWindow's first entry upon starting to generate (else is double)

let go = false;     	// Adding nodes in progress
let refreshRate = 200;	// Amount of milliseconds until the next node comes
let runstatus;			// Interval running after refreshRate (generates nodes)
let finished = false;	// true if no further node/edge can be added

let nodes=[], links=[];	// Current nodes and edges
let oldNodes;			// Saving last interations nodes for visual transition purposes

let node;				// Visuals of nodes
let link;				// Visuals of edges
let counter;			// AvgDegree / Node / Link display

// Saving widths and heights for later use
const widthNetwork = document.getElementById("networkCanvas").clientWidth;
const heightNetwork = Math.round(svgNetwork.style("height").replace("px", ""));
const widthChart = Math.round(svgChart.style("width").replace("px", ""));
const heightChart = Math.round(svgChart.style("height").replace("px", ""));

// Force initialization
const force = d3.forceSimulation()
	.on("tick", tick)														// Applies tick function
	.force("x", d3.forceX(widthNetwork/2))									// Pulling towards horizontal center
	.force("y", d3.forceY(heightNetwork/2))									// Pulling towards vertical center
	.force("charge", d3.forceManyBody().strength(d => {						// Repelling from other nodes
		return Math.min(-70, -490/radius(d));								// The smaller the node, the more it repels others
	}))
	.force("link", d3.forceLink()											// Pulling towards connected nodes
		.strength(0.1).distance(d => {										// Depends on node degrees and avg node degree of network
			return (radius(d.source) + radius(d.target) + Math.min(100, Math.max(40, 600/(d.source.deg + d.target.deg))))*(avgDegree()/2);
	}))																		// And the more nodes, the longer the links
	.force("collision", d3.forceCollide().radius(d => { return radius(d)+5; }))	// Avoid node overlapping
	;
//
// -----------------------------</ Global variables >-----------------------------
//

//
// -----------------------------< Helper functions >-----------------------------
//

/*
 * Function that returns an array of numbers
 * The number at the i-th index indicates the amount of nodes with degree i
 *
 */
function allDegrees() {
	let degrees = new Array(d3.max(nodes.map(d => d.deg))+1).fill(0);
	nodes.forEach(d => {
		degrees[d.deg]++;
	});
	return degrees;
}

/*
 * Function that gives the angle (rad) between two points with
 *		pair: has form {source: {x: a, y: b, ...}, target: {x: c, y: d, ...}, ...} i.e. points (a,b) and (c,b) are compared
 *		swap: if 1 then calculate angle for source point, if -1 then calculate angle for target point
 * Used in tick() to draw links from edge of node to edge of node instead of center of node to center of node
 *
 */
function angle(pair, swap=1) {
	return Math.atan2(swap*(pair.target.y - pair.source.y), swap*(pair.target.x - pair.source.x));
}

/*
 * Function called in setParameters()
 * For some reason this functionality (specifically the "d3.select(this)")
 * did not work without defining a special function for it.
 * d3.select(this) are cells in an HTML table and d contains the data for the cells
 * d has the form {column: c, value: v} with
 *		c is either "text", "range" or "value"
 *		v is an object of the form {"text": t, "id": id, "min": min, "max": max, "value": v}
 *
 */
function fillParameterCell(d) {

	switch(d.column) {

		// The descriptive text is just plain text
		case "text":
			d3.select(this).append("text").html(d.value.text).styles({"margin-left": "1em", cursor: "context-menu"})

				// Description setup
				.on("mouseover", () => {
					return d3.select("#" + d.value.id + "Descr").style("visibility", "visible");
				})
				.on("mousemove", () => {
					return d3.select("#" + d.value.id + "Descr")
								.style("top", (d3.event.pageY - document.getElementById("paramsDiv").getBoundingClientRect().y + 10)+"px")
								.style("left", (d3.mouse(this)[0]+10)+"px");
				})
				.on("mouseout", () => {
					return d3.select("#" + d.value.id + "Descr").style("visibility", "hidden");
				});

			// Add description for mouseover
			d3.select(this).append("div")
				.attr("id", "" + d.value.id + "Descr")
				.styles({	visibility: "hidden", "background-color": "lightgrey", border: "2px solid black", padding: "5px",
							"border-radius": "6px", position: "absolute", "z-index": 2
				}).text(d.value.descr);
			break;

		// The range bar is an input element with type range
		case "range":
			d3.select(this).append("input")
				.attrs({id: "" + d.value.id + "Range", type: "range", min: d.value.min, max: d.value.max, value: d.value.value})
				.attr("onchange", () => {
					if (d.value.id == "initProb" || 
						d.value.id == "minorityPercentage" || 
						d.value.id == "relationalFactor" || 
						d.value.id == "rewireProb") {
						return "updateText(\"" + d.value.id + "Text\", this.value/100)";
					} else {
						return "updateText(\"" + d.value.id + "Text\", this.value)";
					}
				});
			d3.select(this).select("#initDegreeRange").attr("step", 2);
			break;

		// The range value is an input element with type text
		case "value":
			d3.select(this).append("input")
				.attrs({id: "" + d.value.id + "Text", type: "text", size: 3})
				.attr("value", () => {
					if (d.value.id == "initProb" || 
						d.value.id == "minorityPercentage" || 
						d.value.id == "relationalFactor" || 
						d.value.id == "rewireProb") {
						return d.value.value/100;
					} else {
						return d.value.value;
					}
				})
				.style("margin-left", "1em");
			break;

		default:
			console.log("Wrong d.column in toggleRunning: " + d.column)
			break;
	}
}

/*
 * Given an array of probabilities, return a random index of this array based on the probabilities
 *
 */
function randomChoice(probs) {
	let randVal = d3.sum(probs)*Math.random();
	return probs.findIndex(a => (randVal -= a) < 0 );
}

/*
 * Stop the running process
 *
 */
function stop() {
	clearInterval(runstatus);
	go = false;
}

/*
 * Given node d, return the amount of nodes of group minor with the same degree
 *
 */
function minorsWithSameDegree(d) {
	let deg = typeof d === "number" ? d : d.deg;
	return nodes.filter(n => { return n.group == "minor" && n.deg == deg; }).length;
}

/*
 * Instead of letting the force decide the node positions,
 * nodes are evenly distributed on a circle and don't move.
 * This function returns the coordinates for the nodes in an array.
 *
 */
function nodePosInCircle() {
	const cx = widthNetwork/2;
	const cy = heightNetwork/2;
	const r = Math.min(widthNetwork/3, heightNetwork/3)
	let coords = [];
	for (let i = 0, l = nodes.length; i < l; i++) {
		const rads = (270+360*i/nodes.length)*Math.PI/180;
		coords.push([cx + r*Math.cos(rads), cy + r*Math.sin(rads)]);
	}
	return coords;
}

/*
 * Return an array of node indices representing n's neighbors
 *
 */
function getNeighbors(n) {
	return network[n].map((d, i) => { return d ? i : -1}).filter(d => { return d != -1});
}

/*
 * Reinitialize aplTimeWindow i.e. on the first use or on global resets
 *
 */
function resetTimeWindow() {
	if (twSize > 0) {
		aplTimeWindow = Array(twSize).fill(0);
	} else {
		aplTimeWindow = [];
	}
}

/*
 * Given two node indices s and t, return the shortest amount of hops to reach one from the other (Breath-First-Search)
 *
 */
function shortestPath(s, t) {
	let queue = [{node: s, pathLength: 0}];
	let visited = {s: true};
	let tail = 0;
	while (tail < queue.length) {
		const u = queue[tail].node;
		let count = queue[tail++].pathLength;
		const nbs = getNeighbors(u);
		for (let i = 0, l = nbs.length; i < l; i++) {
			if (nbs[i] == t) {
				return count + 1;
			}
			if (!visited[nbs[i]]) {
				visited[nbs[i]] = true;
				queue.push({node: nbs[i], pathLength: count + 1});
			}
		}
	}
	throw -1;
}

/*
 * Return the average path length
 * i.e. the sum of all shortest path between any two nodes devided by the amount of paths in total
 *
 */
function avgPathLength() {
	let shortestPathSum = 0;
	let l = nodes.length;
	for (let i = 0; i < l; i++) {
		for (let j = 0 ; j < l; j++) {
			try {
				shortestPathSum += i != j ? shortestPath(i, j) : 0;
			} catch (e) {
				return e;
			}
		}
	}
	return (1/(nodes.length*(nodes.length - 1)))*shortestPathSum;
}

/*
 * Return the average degree
 * i.e. the sum of all node degrees divided by the amount of nodes
 *
 */
function avgDegree() {
	return preciseRound(d3.sum(nodes.map(d => { return d.deg; }))/nodes.length, 2);
}

/*
 * Recalculate avgPathLength every timestep
 *
 */
function updateAplTimeWindow() {
	if (twSize > 0) {
		aplTimeWindow.shift();
	}

	// Pop first element in the first step to avoid having it as duplicate
	if (isFirstStep &&  aplTimeWindow.filter(d => { return d == 0; }).length == aplTimeWindow.length - 1) {
		isFirstStep = false;
		aplTimeWindow.pop();
	}
	aplTimeWindow.push(avgPathLength())
}

/*
 * n is an array of pairs of node indices
 * Returns an object {0: a, 1: b, 2: c, ...} where
 * the keys are indices of the given array n and
 * a, b, c, ... are arrays containing node indices representing nodes that are connected to both nodes in the pair
 *
 */
function commonNeighbors(n) {
	let commonNeighbors = {};
	for (let i = 0; i < n.length; i++) {
		commonNeighbors[i] = getNeighbors(n[i][0]).filter(d => -1 !== getNeighbors(n[i][1]).indexOf(d));
	}
	return commonNeighbors;
}

/*
 * Check the nLastLinks elements of the links array and update the network adjacency matrix accordingly
 *
 */
function updateAdjMatrix(nLastLinks=links.length) {
	for (let i = links.length-nLastLinks, l = links.length; i < l; i++) {
		addLinkToNetwork(links[i].source.index, links[i].target.index);
	}
}

/*
 * Add row and column to network matrix for new node
 *
 */
function extendMatrix() {
	network.push(Array(nodes.length).fill(false))
	for (let i = 0, l = nodes.length-1; i < l; i++) {
		network[i].push(false);
	}
}

/*
 * Add specific link to network matrix
 *
 */
function addLinkToNetwork(n1, n2) {
	network[n1][n2] = true;
	network[n2][n1] = true;
}

/*
 * Remove specific link to network matrix
 *
 */
function removeLinkFromNetwork(n1, n2) {
	network[n1][n2] = false;
	network[n2][n1] = false;
}

/*
 * Round num to have decimals many decimal points
 *
 */
function preciseRound(num, decimals) {
   const t = Math.pow(10, decimals);   
   return (Math.round((num*t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10/Math.pow(100, decimals))))/t).toFixed(decimals);
}
//
// -----------------------------</ Helper functions >-----------------------------
//

//
// -------------------------------< Initialization >-------------------------------
//

// Event if mouse is being clicked inside svg's or spacebar is being pressed
svgNetwork.on("mousedown", toggleRunning);
svgChart.on("mousedown", toggleRunning);
d3.select("html").on("keydown", () => { if (d3.event.code == "Space") toggleRunning(); })

// Close chart dropdown if it is open and the button is not being clicked
window.onclick = event => {
	if (event.target.id != "chartDropdownButton" && d3.select("#chartDropdownMenu").style("display") == "block") {
		d3.select("#chartDropdownMenu").style("display", "none");
		d3.select("#chartDropdownButton").style("background-color", "#0000CD");
	} else if (event.target.id != "networkDropdownButton" && d3.select("#networkDropdownMenu").style("display") == "block") {
		d3.select("#networkDropdownMenu").style("display", "none");
		d3.select("#networkDropdownButton").style("background-color", "#0000CD");
	}
};

setup();

/* 
 * Initial generation of nodes, edges and chart elements
 *		+ all of their visuals
 *
 */
function setup() {

	// Generate initial nodes of the form {x: a, y: b, deg: c} with
	//		a = random value for the nodes initial horizontal position
	//		b = random value for the nodes initial vertical position
	//		d = 0 because no edges have been set yet, hence degree of zero
	nodes = d3.range(initNodes).map((d, i) => {
		return {x: Math.random()*widthNetwork, y: Math.random()*heightNetwork, deg: 0, index: i};
	});
	network = Array(initNodes).fill().map(() => Array(initNodes).fill(false));

	// If the minority model gets simulated, all nodes are assigned to either the majority or minority group
	if (model == "minor") {
		let amountMinorNodes = Math.floor(minorityPercentage*nodes.length);
		nodes.forEach((d, i) => {
			d.group = --amountMinorNodes < 0 ? "major" : "minor";
		});
	}

	switch(model) {

		// Generate random edges between initial nodes
		case "minor":
		case "barab":
			links = randomNetwork();
			break;

		// Set the "to check" nodes to the first two nodes
		case "gilbert":
			currGilbert = [0, 0];
			break;

		// Generate a regular network
		case "wattsA":
		case "wattsB":
			const nodeCoords = nodePosInCircle();
			nodes.forEach((d, i) => {
				d.x = nodeCoords[i][0];
				d.y = nodeCoords[i][1];
				d.vx = 0;
				d.vy = 0;
			})
			globalIter = 0;
			links = regularNetwork(initDegree);
			break;

		default:
			console.log("Wrong model in setup: " + model)
			break;
	}

	// Clone nodes (for transition purposes in redraw())
	oldNodes = nodes.map(d => Object.assign({}, d));

	// Initialize visuals
	node = svgNetwork.selectAll(".node");
	link = svgNetwork.selectAll(".link");
	counter = svgNetwork.selectAll(".counter");

	// Update adjacency matrix according to links
	updateAdjMatrix();

	// Initial defining of color scale for nodes and chart bars
	setColorScale();

	// Keep track of average path length
	resetTimeWindow();

	// Draw paper text
	showPaper();

	// Draw everything
	redraw();
}
//
// -------------------------------</ Initialization >-------------------------------
//

//
// -----------------------------< Event functions >-----------------------------
//

/*
 * Changes applied by the force i.e. node and edge visuals get relocated
 *
 */
function tick() {
	node.attrs({cx: d => { return d.x; }, cy: d => { return d.y; }});
	
	link.attrs({x1: d => { return d.source.x + radius(d.source)*Math.cos(angle(d)); },
				y1: d => { return d.source.y + radius(d.source)*Math.sin(angle(d)); },
				x2: d => { return d.target.x + radius(d.target)*Math.cos(angle(d,-1)); },
				y2: d => { return d.target.y + radius(d.target)*Math.sin(angle(d,-1)); }});
}

/*
 * Action on mouse click
 * If shift is being held aswell, delete current progress and start anew
 * Otherwise if progression is currently stopped, continue it
 *		i.e. add new node, new edges and update chart
 * If progression runs, stop it
 *
 */
function toggleRunning(){

	go = !go;

	// If shift is pressed, remove everything and start anew
	if (d3.event.shiftKey){
		reset();
	};

	// Start adding nodes and edges
	if (go){

		runstatus = setInterval(

		// Applied every refreshRate amount of milliseconds
		() => {

			// If no further nodes/edges can be generated
			if (finished) {
				return;
			}

			switch(model) {
				case "barab":
				case "minor":
					// If maximum amount nodes not yet reached and no custom network is being created
					if (nodes.length < maxNodes) {

						// Create new node at random location
						const newNode = {x: Math.random()*widthNetwork, y: Math.random()*heightNetwork, deg: 0, index: nodes.length};

						// Determine nodes connected to the new node
						let targets;

						// Check which model to use to generate new edges
						switch(model) {
							case "barab":
								targets = barabasiAlbert();
								break;
							case "minor":
								newNode.group = Math.random() < minorityPercentage ? "minor" : "major";
								targets = minorities(newNode);
								break;
							default:
								console.log("Wrong model in toggleRunning: " + model)
								break;
						}

						targets.forEach(d => {
							links.push({source: newNode, target: d});
						});
						newNode.deg = targets.length;
						nodes.push(newNode);

						// Update network matrix
						extendMatrix();
						updateAdjMatrix(targets.length);
					} else {
						finished = true;
						stop();
					}
					break;
				case "gilbert":
					let foundEdge = false;

					// Check until every pair of nodes has been checked
					while(!foundEdge && currGilbert[0] < nodes.length) {

						// Save next nodes to be compared
						currGilbert[1]++;
						if (currGilbert[1] == nodes.length) {
							currGilbert[0]++;
							currGilbert[1] = currGilbert[0]+1;
						}
						if (currGilbert[0] == nodes.length-1) {
							finished = true;
							stop();
							break;
						}

						// If current node pair is valid and the probability decides for true, set edge and update degrees
						if (currGilbert[0] != currGilbert[1] && Math.random() < initProb) {
							foundEdge = true;
							links.push({source: nodes[currGilbert[0]], target: nodes[currGilbert[1]]});
							nodes[currGilbert[0]].deg++;
							nodes[currGilbert[1]].deg++;
							addLinkToNetwork(currGilbert[0], currGilbert[1]);
						}
					}
					break;
				case "wattsA":

					let searchingNewEdge = true;
					let timeout = 100;

					// Try to create an edge
					while (searchingNewEdge) {
						timeout--;
						if (timeout < 0) {
							stop();
							alert("Could not add edge.")
							return;
						}
						let newTarget;
						try {
							newTarget = randomChoice(wattsPropensity(globalIter));

						// propensityVector threw an error which means that there was no node to connect
						} catch(e) {
							globalIter++;		// Represents nodes indices
							continue;
						}

						// Found matching target -> add edge
						searchingNewEdge = false;
						links.push({source: nodes[globalIter], target: nodes[newTarget]});
						addLinkToNetwork(globalIter, newTarget);
						nodes[globalIter].deg++;
						nodes[newTarget].deg++;
						globalIter = (globalIter + 1) % nodes.length;
					}

					// Finished generating as soon as desired avgDegree is reached
					if (avgDegree() >= finalAvgDegree) {
						finished = true;
						stop();
					}
					break;
				case "wattsB":

					let edgeRewired = false;

					// Try until every link has been checked for rewiring
					while(!edgeRewired && globalIter < links.length) {

						// If the probability decides for true
						if (Math.random() < rewireProb) {
							edgeRewired = true;
							let foundEdge = false;
							let timeout = 100;

							// Keep trying to rewire the edge
							while (!foundEdge) {
								let rewireTarget = Math.floor(Math.random()*nodes.length);

								// If the new edge fits i.e. it's a new connection, update edge target and node degrees
								if (links[globalIter].source.index != rewireTarget && !network[links[globalIter].source.index][rewireTarget]) {
									console.log("" + links[globalIter].source.index + ", " + rewireTarget)
									foundEdge = true;
									removeLinkFromNetwork(links[globalIter].source.index, links[globalIter].target.index);
									links[globalIter].target.deg--;
									nodes[rewireTarget].deg++;
									links[globalIter].target = nodes[rewireTarget];
									addLinkToNetwork(links[globalIter].source.index, rewireTarget);
								}
								timeout--;
								if (timeout < 0) {
									stop();
									alert("Could not rewire edge.")
									return;
								}
							}
						}
						globalIter++;		// Represents links indices
					}
					if (globalIter == links.length) {
						finished = true;
						stop();
					}
					break;
				default:
					console.log("Wrong model in toggleRunning: " + model)
					break;
			}

			// Add new info to the visuals i.e. draw new node and edges + update the chart
			redraw();

		}, refreshRate);

	} else {
		clearInterval(runstatus);
	}
}
//
// -----------------------------</ Event functions >-----------------------------
//

//
// -----------------------------< Network generation >-----------------------------
//

/*
 * Gilbert-Model (Random network)
 * Given the initial nodes, determine which ones are connected
 * Generation of edge depends on variable initProb
 * If mustConnect is true, each node must have at least one edge
 *
 */
function randomNetwork(mustConnect=true) {

	let isConnected;

	let randLinks = [];
	let l = nodes.length;
	for (let i = 0; i < l-1; i++) {
		isConnected = false;
		for (let j = i+1; j < l; j++) {
			if (Math.random() < initProb) {
				nodes[i].deg++;
				nodes[j].deg++;
				randLinks.push({source: nodes[i], target: nodes[j]});
				isConnected = true;
			}
		}

		// If the network should be fully connected but a node has no adjacent node yet, iterate again
		if (mustConnect && !isConnected) {
			i--;
		}
	}
	return randLinks;
}

/*
 * Barabasi-Albert-Model (https://arxiv.org/pdf/cond-mat/9910332.pdf)
 * Generation of edge depends on amount of edges already adjacent to a node
 *
 */
function barabasiAlbert() {
	let targets = [];	// Contains nodes to which the new node will connect

	// Contains probabilities for the new node to connect to the corresponding existing node
	let probs = nodes.map(d => { return d.deg/d3.sum(nodes.map(d => d.deg)); })

	let timeout = 100;

	// Find exactly initPartners many nodes
	while (targets.length < initPartners) {

		// Given the probabilities, choose a random node
		const randNode = randomChoice(probs);

		// If it hasnt been chosen before by this new node, add it as target
		if (!targets.includes(randNode)) {
			nodes[randNode].deg++;
			targets.push(nodes[randNode]);
			timeout++;
		}
		timeout--;
		if (timeout < 0) {
			stop();
			alert("New node could only connect to " + targets.length + " out of " + initPartners + " necessary nodes.")
			break;
		}
	}
	return targets;
}

/*
 * Minority-Model based on Barabasi-Albert (https://arxiv.org/pdf/1702.00150.pdf)
 * Nodes are assigned to a group. Edges to the new node depend on its group and the Barabasi-Albert-Model
 *
 */
function minorities(newNode) {
	let targets = [];	// Contains nodes to which the new node will connect

	// Calculate common divisor for all elements
	let divisor = 0;
	nodes.forEach(d => { divisor += d.group == newNode.group ? relationalFactor*d.deg : (1-relationalFactor)*d.deg; });

	// Contains probabilities for the new node to connect to the corresponding existing node (also depending on the node's group)
	let probs = nodes.map(d => { 
		return d.group == newNode.group ? relationalFactor*d.deg/divisor : (1-relationalFactor)*d.deg/divisor; 
	});

	let timeout = 100;

	// Find exactly initPartners many nodes
	while (targets.length < initPartners) {

		// Given the probabilities, choose a random node
		const randNode = randomChoice(probs);

		// If it hasnt been chosen before by this new node, add it as target
		if (!targets.includes(nodes[randNode])) {
			nodes[randNode].deg++;
			targets.push(nodes[randNode]);
			timeout++;
		}
		timeout--;
		if (timeout < 0) {
			stop();
			alert("New node could only connect to " + targets.length + " out of " + initPartners + " necessary nodes.")
			break;
		}
	}

	return targets;
}

/*
 * Returns links of a regular network with the size of nodes
 * degree parameter must be even and smaller than nodes.length-1
 *
 */
function regularNetwork(degree) {
	let regularLinks = [];

	for (let currStep = 1, maxPartners = degree/2; currStep <= maxPartners; currStep++) {
		for (let i = 0, l = nodes.length; i < l; i++) {
			regularLinks.push({source: nodes[i], target: nodes[(i+currStep)%nodes.length]})
			nodes[i].deg++;
			nodes[(i+currStep)%nodes.length].deg++;
		}
	}
	return regularLinks;
}

/*
 * Return an array containing probabilities to connect node n to its neighbors
 *
 */
function wattsPropensity(n) {
	const avgDeg = avgDegree();
	const nbs = getNeighbors(n);
	if (nbs.length == nodes.length-1) {
		throw -1;
	}
	let neighborProbs = Array(nodes.length);
	for (let i = 0, l = nodes.length; i < l; i++) {

		// Probability is zero for itself or nodes that are already neighbors
		if (i == n || nbs.includes(i)) {
			neighborProbs[i] = 0;

		// If they are not connected yet
		} else {
			let commonNbs = commonNeighbors([[n, i]]);
			commonNbs = commonNbs[0].length;

			// ... and have more common neigbors than the current average degree
			if (commonNbs >= avgDeg) {
				neighborProbs[i] = 1;

			// ... and have no common neighbors
			} else if (commonNbs == 0) {
				neighborProbs[i] = initProb;

			// ... and the amount of common neighbors is between 0 and the current average degree
			} else {
				neighborProbs[i] = initProb + (1-initProb)*Math.pow((commonNbs/avgDeg), alphaFactor)
			}
		}
	}

	// Normalize to get proper probabilities
	const probSum = d3.sum(Object.values(neighborProbs));
	Object.keys(neighborProbs).forEach(k => {
		neighborProbs[k] = neighborProbs[k]/probSum;
	});
	return neighborProbs;
}
//
// -----------------------------</ Network generation >-----------------------------
//

//
// -----------------------------< Drawing functions >-----------------------------
//

/*
 * Remove all visuals (nodes, edges, bars and axes), then start anew
 *
 */
 function reset() {
 	finished = false;
	stop();
	nodes=[], links=[];
	resetTimeWindow();
	svgNetwork.selectAll(".link").remove();
	svgNetwork.selectAll(".node").remove();
	svgNetwork.selectAll(".counter").remove();
	svgChart.select("#avgPathLengthWarning").remove();
	setup();
 }

 /*
 * Constructs color scale for models
 * barab model goes from black to white in a linear fashion
 * minor model goes either orange or lightblue
 *
 */
 function setColorScale() {
	switch(model) {
		case "wattsA":
		case "wattsB":
		case "gilbert":
		case "barab":
			color = d3.scaleLinear()
				.domain([0, d3.max(nodes, radius)])
				.range(["black", "white"]);
			initColor = d3.scaleLinear()
				.domain([0, d3.max(nodes, radius)])
				.range(["red", "white"]);
			break;
		case "minor":
			color = d3.scaleOrdinal()
				.domain(["minor", "major"])
				.range(["orange","lightblue"]);
			break;
		default:
			console.log("Wrong model in setColorScale: " + model)
			break;
	}
 }

/*
 * Redraw function
 * Upon function call, add the new node + edges to the visuals
 * and update the chart
 *
 */
function redraw() {

	const linkStrokeWidth = (d, i) => {
		switch(model) {
			case "barab":
			case "minor":
				return nodes.length == initNodes ? 1 : 2;
			case "gilbert":
				return 2;
			case "wattsA":
				return globalIter == 0 ? 1 : 2;
			case "wattsB":
				return 1;
			default:
				console.log("Wrong model in linkStrokeWidth: " + model)
				break;
		}
	}

	// Colors for newly drawn edges
	const linkStroke = (d, i) => {
		switch(model) {
			case "barab":
			case "minor":
				return nodes.length == initNodes ? "black" : "red";
			case "gilbert":
				return "red";
			case "wattsA":
				return globalIter == 0 ? "black" : "red";
			case "wattsB":
				return "black";
			default:
				console.log("Wrong model in linkStroke: " + model)
				break;
		}
	}

	// Update link visuals i.e. add new edges to html
	link = link.data(links)
		.enter()
		.append("line")
		.attr("class", "link")
		.styles({"stroke-width": linkStrokeWidth, stroke: linkStroke})
		.merge(link);

	// For the wattsB model, recolor the rewired edge
	if (model == "wattsB") {
		link.filter((d, i, list) => { return i == globalIter-1; }).styles({"stroke-width": 2, stroke: "red"});
	}

	// Highlight new edges
	link.filter((d, i, list) => { 
			switch(model) {
				case "wattsA":
				case "barab":
				case "minor":
				case "gilbert":
					return i > list.length - initPartners - 1;
				case "wattsB":
					return i == globalIter - 1;
			}
		}).transition()
		.duration(refreshRate)
		.styles({"stroke-width": 1, stroke: "black"});

	// Update node visuals (use option 2 if edges are supposed to be on top of nodes)
	// Delete all nodes, then draw the old visuals anew (to get the transition effect)
	svgNetwork.selectAll(".node").remove();
	node = svgNetwork.selectAll(".node").data(oldNodes)
		.enter()
		.append("circle")
		.attrs({class: "node", r: radius})
		.style("stroke", "black")
		.style("fill", d => { 
			switch(model) {
				case "wattsA":
				case "wattsB":
				case "gilbert":
				case "barab":
					return color(radius(d));
				case "minor":
					return color(d.group);
				default:
					return "black";
			}
		});

	// Redefine color scale for the current nodes and chart bars
	setColorScale();

	// Apply the radius and color transition from previous step to current step
	node.data(nodes)
		.transition()
		.duration(refreshRate)
		.attr("r", d => { return radius(d); })
		.style("fill", d => { 
			switch(model) {
				case "wattsA":
				case "wattsB":
				case "gilbert":
				case "barab":
					return color(radius(d));
				case "minor":
					return color(d.group);
				default:
					return "black";
			}
		});

	// Add the new node
	node = node.data(nodes).enter().append("circle")
		.attrs({class: "node", r: radius, id: "new"})
		.style("stroke", "black")
		.style("fill", d => { return "red"; })
		.merge(node);

	node.attrs({cx: d => { return model == "wattsB" || model == "wattsA" ? d.x : null; }, 
				cy: d => { return model == "wattsB" || model == "wattsA" ? d.y : null; }});

	// Clone nodes to safe last iteration
	oldNodes = nodes.map(d => Object.assign({}, d));

	// Highlight new node (filters for last element)
	node.filter((d, i, list) => { return i === list.length - 1; })
		.transition()
		.duration(refreshRate)
		.style("fill", d => { 
			switch(model) {
				case "wattsA":
				case "wattsB":
				case "gilbert":
				case "barab":
					return color(radius(d));
				case "minor":
					return color(d.group);
				default:
					return "black";
			}
		});

	// Reapply force on nodes and links
	if (model != "wattsB" && model != "wattsA") {
		force.nodes(nodes);
		force.force("link").links(links);
	}

	// Progress in bottom right corner
	svgNetwork.selectAll(".counter").remove();
	counter = counter.data([{t: "Number of nodes", num: nodes.length}, 
							{t: "Number of links: ", num: links.length},
							{t: "Average degree: ", num: avgDegree()}]);
	counter.enter()
		.append("text")
		.attrs({class: "counter", x: 10, y: (d,i) => { return heightNetwork - 10*(i+1); }})
		.styles({"font-family": "sans-serif", "font-size": "11px"})
		.text(d => { return "" + d.t + ": " + d.num; });

	// Redraw the chart
	updateChart();

	// Refresh force time
	force.alpha(1).restart();
}

/*
 * Redraw the chart
 * First remove previous chart
 * Then calculate axis and draw them and the rectangles
 *
 */
function updateChart(noAplUpdate=false) {

	/*
	 * Helper function to keep things cleaner [Tons of nested switch cases]
	 * 		valueFor should be either "x", "w", "y" or "h" to get values for x, width, y or height
	 * 		d is an amount of nodes which have degree i
	 * 		i is a degree
	 * 		mType should be either "major" or "minor", necessary to distinguish between major and minor chart bar
	 *
	 */
	const getValue = (valueFor, d, i=0, mType="", scatter=false) => {
		switch(valueFor) {
			case "x":
				switch(xScaleType) {
					case "lin":
						return xScale(i-0.5);
					case "log":
						if (scatter) {
							return i < skipDegs ? 0 : i == skipDegs+0.5 ? xScale(Math.max(1, skipDegs+0.5))/2 : xScale(i);
						}
						return i < Math.max(0.5, skipDegs) ? 0 : Math.max(0, xScale(i-0.5));
					default:
						console.log("Wrong xScaleType in getValue: " + xScaleType)
						break;
				}
			case "w":
				switch(xScaleType) {
					case "lin":
						return (widthChart/1.2)/(degrees.length-skipDegs+0.5);
					case "log":
						return i < skipDegs ? 0 : i == skipDegs ? xScale(skipDegs+0.5) : Math.min(xScale(i+0.5) - xScale(i-0.5), xScale(i-0.5));
					default:
						console.log("Wrong xScaleType in getValue: " + xScaleType)
						break;
				}
			case "y":
				switch(model) {
					case "wattsA":
					case "wattsB":
					case "gilbert":
					case "barab":
						switch(yScaleType) {
							case "abs":
							case "lin":
								return yScale(d/yValueDivisor);
							case "log":
								return yScale(Math.max(0.0001, d)/yValueDivisor);
							default:
								console.log("Wrong yScaleType in getValue: " + yScaleType)
								break;
						}
					case "minor":
						switch(mType) {
							case "major":
								switch(yScaleType) {
									case "abs":
									case "lin":
										return yScale((d - minorsWithSameDegree(i))/yValueDivisor);
									case "log":
										return yScale(Math.max(0.0001, (d - minorsWithSameDegree(i))/yValueDivisor));
									default:
										console.log("Wrong yScaleType in getValue: " + yScaleType)
										break;
								}
							case "minor":
								switch(yScaleType) {
									case "abs":
									case "lin":
										return yScale(d/yValueDivisor);
									case "log":
			 							return yScale(Math.max(0.0001, (d/yValueDivisor)));
									default:
										console.log("Wrong yScaleType in getValue: " + yScaleType)
										break;
								}
							default:
								console.log("Wrong mType in getValue: " + mType)
								break;
						}
					default:
						console.log("Wrong model in getValue: " + model)
						break;
				}
			case "h":
				switch(model) {
					case "wattsA":
					case "wattsB":
					case "gilbert":
					case "barab":
						switch(yScaleType) {
							case "abs":
							case "lin":
								return Math.max(0, heightChart - yScale(d/yValueDivisor));
							case "log":
								return Math.max(0, heightChart - yScale(Math.max(0.0001, d)/yValueDivisor));
							default:
								console.log("Wrong yScaleType in getValue: " + yScaleType)
								break;
						}
					case "minor":
						switch(mType) {
							case "major":
								switch(yScaleType) {
									case "abs":
									case "lin":
										return heightChart - yScale((d - minorsWithSameDegree(i))/yValueDivisor);
									case "log":
										return heightChart - yScale(Math.max(0.0001, (d - minorsWithSameDegree(i))/yValueDivisor));
									default:
										console.log("Wrong yScaleType in getValue: " + yScaleType)
										break;
								}
							case "minor":
								switch(yScaleType) {
									case "abs":
									case "lin":
			 							return yScale((d - minorsWithSameDegree(i))/yValueDivisor) - yScale(d/yValueDivisor);
									case "log":
			 							return yScale(Math.max(0.0001, (d - minorsWithSameDegree(i))/yValueDivisor))
			 									 - yScale(Math.max(0.0001, d/yValueDivisor));
									default:
										console.log("Wrong yScaleType in getValue: " + yScaleType)
										break;
								}
							default:
								console.log("Wrong mType in getValue: " + mType)
								break;
						}
					default:
						console.log("Wrong model in getValue: " + model)
						break;
				}
			default:
				console.log("Wrong valueOf in getValue: " + valueOf)
				break;
		}
	}

	// Remove chart and axis from previous tick
	removeChartElems();

	// Keep track of average path length
	if (nodes.length < 51) {	// Too slow at about 50+ nodes
		if (!noAplUpdate) {
			updateAplTimeWindow();
		}
	} else {
		if (!document.getElementById("avgPathLengthWarning") && chartType == "apl") {
			svgChart.append("text")
			.attrs({id: "avgPathLengthWarning", x: 10, y: 25})
			.style("fill", "red")
			.text("avgPathLength computation too heavy, deactivated for 50+ nodes");
		} else {
			if (chartType != "apl") {
				svgChart.select("#avgPathLengthWarning").remove();
			}
		}
	}

	// AvgPathLength is too distinct from the other options
	if (chartType == "apl") {
		drawAvgPathLengthProgress();
		return;
	}

	// Array of numbers where the i-th element indicates the amount of nodes with degree i
	let degrees = allDegrees();

	// Skip degrees if they're either smaller than amount of initial partners or minimal degree of node in initial random network
	let skipDegs;
	switch(model) {
		case "barab":
		case "minor":
			skipDegs = Math.min(degrees.findIndex(d => { return d != 0; }));
			break;
		case "gilbert":
		case "wattsA":
		case "wattsB":
			skipDegs = degrees.findIndex(d => { return d != 0; });
			break;
		default:
			console.log("Wrong model in updateChart: " + model)
			break;
	}

	let xScale, yScale;		// Map values according to chart
	let xTicks, yTicks;		// Format axis' accordingly
	let yText = "Nodes percentage";		// = "Node amount" if yScaleType == "abs"
	let yValueDivisor = nodes.length;	// = 1 if yScaleType == "abs"

	// x-Axis displays the node degrees
	switch(xScaleType) {
		case "lin":
			xScale = d3.scaleLinear()
				.domain([skipDegs-0.5, degrees.length])
				.range([0, widthChart/1.2])
			xTicks = d => { return d%1 == 0 ? d : ""; };
			break;
		case "log":
			xScale = d3.scaleLog()
				.domain([degrees.length, Math.max(0.0001, skipDegs-0.5)])
				.range([widthChart/1.2, 0])
			xTicks =  d => { return d < 1 ? "" : d3.format("d")(d); };
			break;
		default:
			console.log("Wrong xScaleType in updateChart: " + xScaleType)
			break;
	}

	// y-Axis displays the percentual amount of nodes with the corresponding degree
	switch(yScaleType) {
		case "lin":
			yScale = d3.scaleLinear()
				.domain([0, d3.max(degrees)/nodes.length])
				.range([heightChart, 50])
				.nice();

			yTicks = d => { return d; };
			break;

		case "log":
			yScale = d3.scaleLog()
				.domain([0.0001, d3.max(degrees)/nodes.length])
				.range([heightChart, 50])
				.nice();

			yTicks = d => { return Math.log10(d) % 1 == 0 ? d3.format(".1")(d) : ""; };
			break;

		case "abs":
			yScale = d3.scaleLinear()
				.domain([0, d3.max(degrees)])
				.range([heightChart, 50])
				.nice();
			yTicks = d => { return d%1 === 0 ? d : ""; };
			yText = "Node amount";
			yValueDivisor = 1;
			break;

		default:
			console.log("Wrong yScaleType in updateChart: " + yScaleType)
			break;
	}

	switch(chartType) {

		// Draw the rectangles (bars)
		case "bar":
			switch(model) {
				case "wattsA":
				case "wattsB":
				case "gilbert":
				case "barab":
					svgChart.selectAll(".bar")
						.data(degrees.slice(skipDegs))
						.enter()
						.append("rect")
						.attrs({class: "bar", stroke: "black", 
								fill: (d, i) => { return color(radius(i+skipDegs)); },
								x: (d, i) => { return getValue("x", d, i+skipDegs); },
								width: (d, i) => { return getValue("w", d, i+skipDegs); },
								y: d => { return getValue("y", d); },
								height: d => { return getValue("h", d); }
						});
					break;

				case "minor":

					let bars = svgChart.selectAll(".bar")
						.data(degrees.slice(skipDegs))
						.enter();

					// Draw bars of majors
					bars.append("rect")
						.attrs({class: "bar", stroke: "black", id: "bottomBar", fill: "lightblue",
								x: (d, i) => { return getValue("x", d, i+skipDegs, "major"); },
								width: (d, i) => { return getValue("w", d, i+skipDegs, "major"); },
								y: (d, i) => { return getValue("y", d, i+skipDegs, "major"); },
								height: (d, i) => { return getValue("h", d, i+skipDegs, "major"); }
						});

					// Draw bars of minors
					bars.append("rect")
						.attrs({class: "bar", stroke: "black", id: "topBar", fill: "orange",
								x: (d, i) => { return getValue("x", d, i+skipDegs, "minor"); },
								width: (d, i) => { return getValue("w", d, i+skipDegs, "minor"); },
								y: (d, i) => { return getValue("y", d, i+skipDegs, "minor"); },
								height: (d, i) => { return getValue("h", d, i+skipDegs, "minor"); }
						});

					break;

				default:
					console.log("Wrong model in updateChart: " + model)
					break;
			}
			break;

		// Draw points
		case "scatter":
			svgChart.selectAll(".chartPoint")
				.data(degrees.slice(skipDegs))
				.enter()
				.append("circle")
				.attrs({class: "chartPoint", fill : "black", r: 5, 
						cx: (d, i) => { return getValue("x", d, i+skipDegs+0.5, "", true); },
						cy: (d, i) => { return getValue("y", d, i, "minor"); }
				});

			break;

		default:
			console.log("Wrong chartType in updateChart: " + chartType)
			break;
	}

	// Draw x-Axis
	let xAxis = svgChart.append("g")
		.attrs({class: "axis", transform: "translate(0, " + heightChart + ")"})
		.call(d3.axisBottom().scale(xScale).tickFormat(xTicks));
	svgChart.append("text")
		.attrs({class: "axis", transform: "translate(" + (widthChart/2.3) + " ," + (heightChart + 33) + ")",
				"font-family": "sans-serif", "font-size": "14px"})
		.style("text-anchor", "middle")
		.text("Degree");

	// Draw y-Axis
	svgChart.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft().scale(yScale).tickFormat(yTicks));
	svgChart.append("text")
		.attrs({class: "axis", transform: "rotate(270)", x: 0 - (heightChart/2), y: -60, dy: "1em",
				"font-family": "sans-serif", "font-size": "14px"})
		.style("text-anchor", "middle")
		.text(yText);
}

/*
 * Draw a line chart depending on avg path lengths of previous time steps
 *
 */
function drawAvgPathLengthProgress() {

	// Remove chart and axis from previous tick [in case function call does not come from updateChart()]
	removeChartElems();

	let xScale = d3.scaleLinear()
		.domain([aplTimeWindow.length, 0])
		.range([0, widthChart/1.2]);

	let yScale = d3.scaleLinear()
		.domain([0, d3.max(aplTimeWindow)])
		.range([heightChart, 50])
		.nice();

	// Draw points
	svgChart.selectAll(".chartPoint")
		.data(aplTimeWindow)
		.enter()
		.append("circle")
		.attrs({class: "chartPoint", fill : "black", 
				r: d => { return d != -1 ? aplTimeWindow.length < 75 ? Math.min(3, 120/aplTimeWindow.length) : 0 : 0; }, 
				cx: (d, i) => { return  xScale(aplTimeWindow.length - i); },
				cy: yScale
		});

	// Draw lines
	svgChart.selectAll(".chartLine")
		.data(aplTimeWindow.slice(0, aplTimeWindow.length-1))
		.enter()
		.append("line")
		.attrs({class: "chartLine", stroke : "black", 
				"stroke-width": (d, i) => { return d != -1 && i >= aplTimeWindow.findIndex(n => { return n > 0; }) && aplTimeWindow[i+1] != -1 ? 1 : 0; }, 
				x1: (d, i) => { return xScale(aplTimeWindow.length - i); },
				y1: yScale,
				x2: (d, i) => { return xScale(aplTimeWindow.length - i - 1); },
				y2: (d, i) => { return yScale(aplTimeWindow[i+1]); }
		});

	// Draw x-Axis
	let xAxis = svgChart.append("g")
		.attrs({class: "axis", transform: "translate(0, " + heightChart + ")"})
		.call(d3.axisBottom().scale(xScale).tickFormat(d => { return Math.floor(d) != d ? "" : d; }));
	svgChart.append("text")
		.attrs({class: "axis", transform: "translate(" + (widthChart/2.3) + " ," + (heightChart + 33) + ")",
				"font-family": "sans-serif", "font-size": "14px"})
		.style("text-anchor", "middle")
		.text("Time steps ago");

	// Draw y-Axis
	svgChart.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft().scale(yScale));
	svgChart.append("text")
		.attrs({class: "axis", transform: "rotate(270)", x: 0 - (heightChart/2), y: -60, dy: "1em",
				"font-family": "sans-serif", "font-size": "14px"})
		.style("text-anchor", "middle")
		.text("Average Path Length");
}

/*
 * Displays the paper of the current model
 *
 */
function showPaper() {
	d3.select("#paperText").remove();

	let paperString = "Paper: ";
	switch(model) {
		case "barab":
			paperString += "Barabási A.L., Albert R. (1999), Emergence of Scaling in Random Networks";
			break;
		case "minor":
			paperString += "Karimi F., Génois M., Wagner C., Singer P., Strohmaier M. (2017), Visibility of minorites in social networks";
			break;
		case "gilbert":
			paperString += "Gilbert E.N. (1959), Random Graphs";
			break;
		case "wattsA":
			paperString += "Watts D.J. (2004), Small Worlds: The Dynamics of Networks Between Order and Randomness";
			break;
		case "wattsB":
			paperString += "Watts D.J., Strogatz S.H. (1998), Collective dynamics of 'small-world' networks";
			break;
		default:
			console.log("Wrong model in showPaper: " + model)
			break;
	}

	svgNetwork.append("text")
		.attrs({id: "paperText", x: 10, y: 15})
		.styles({"font-family": "sans-serif", "font-size": "13px"})
		.text(paperString);
}

/*
 * Depending on chartType, display different Parameter options
 *
 */
function updateChartParams() {
	d3.select("#chartParams").html("");
	switch(chartType) {
		case "scatter":
		case "bar":
			// Radio buttons for x scale
			d3.select("#chartParams").append("div").attr("id", "xScaleRadio").append("label").text("x: ")
			let xScaleRadio = d3.select("#xScaleRadio").selectAll("span")
				.data([{v: "Lin", f: "changeToLin(\"x\")"}, {v: "Log", f: "changeToLog(\"x\")"}])
				.enter().append("span")
			xScaleRadio.append("input")
				.attrs({type: "radio", name: "xScaleRadio", value: d => { return d.v.toLowerCase(); }, onchange: d => { return d.f}})
				.property("checked", d => { return d.v === "Lin"})
			xScaleRadio.append("label").text(d => { return d.v; });
			xScaleType = "lin";

			// Radio buttons for y scale
			d3.select("#chartParams").append("div").attr("id", "yScaleRadio").append("label").text("y: ")
			let yScaleRadio = d3.select("#yScaleRadio").selectAll("span").data([
					{v: "Lin", f: "changeToLin(\"y\")"}, 
					{v: "Log", f: "changeToLog(\"y\")"},
					{v: "Abs", f: "changeToActual()"}
				]).enter().append("span")
			yScaleRadio.append("input")
				.attrs({type: "radio", name: "yScaleRadio", value: d => { return d.v.toLowerCase(); }, onchange: d => { return d.f}})
				.property("checked", d => { return d.v === "Lin"})
			yScaleRadio.append("label").text(d => { return d.v; });
			yScaleType = "lin";
			break;
		case "apl":
			// Time step size input for x scale
			d3.select("#chartParams").append("label").text("Time steps on x-Axis: ");
			d3.select("#chartParams").append("input")
				.attrs({id: "twSizeInput",type: "text", size: 3, value: twSize, onkeydown: "updateTwSize()", disabled: "disabled"});
			d3.select("#chartParams").append("input")
				.attrs({id: "twCheckbox", type: "checkbox", value: "all", onchange: "checkboxChange(this)", checked: true});
			d3.select("#chartParams").append("label").text("Show all time steps");
			if (twSize == -1) {
				d3.select("#twSizeInput").attrs({disabled: "disabled", value: 20});
				d3.select("#twCheckbox").attrs({checked: true});
			}
			break;
		default:
			console.log("Wrong chartType in updateChartParams: " + chartType)
			break;
	}
}

/*
 * Remove everything of the chart
 *
 */
function removeChartElems() {
	svgChart.selectAll(".axis").remove();
	svgChart.selectAll(".bar").remove();
	svgChart.selectAll(".chartPoint").remove();
	svgChart.selectAll(".chartLine").remove();
}
//
// -----------------------------</ Drawing functions >-----------------------------
//

//
// -----------------------------< Button functions >-----------------------------
//
// Called by linChartButton
function changeToLin(axis) {
	if (axis == "x") {
		xScaleType = "lin"
	} else if (axis == "y") {
		yScaleType = "lin"
	}
	updateChart(true);
}

// Called by logChartButton
function changeToLog(axis) {
	if (axis == "x") {
		xScaleType = "log"
	} else if (axis == "y") {
		yScaleType = "log"
	}
	updateChart(true);
}

// Called by actChartButton
function changeToActual() {
	yScaleType = "abs";
	updateChart(true);
}

// Called by network dropdown item "Barabasi"
function changeToBarab() {
	model = "barab";
	reset();
}

// Called by network dropdown item "Minor"
function changeToMinor() {
	model = "minor";
	if (document.getElementById("paramsDiv")) {
		closeParams();
		setParameters();
	}
	reset();
}

// Called by network dropdown item "Gilbert"
function changeToGilbert() {
	model = "gilbert";
	if (document.getElementById("paramsDiv")) {
		closeParams();
		setParameters();
	}
	reset();
}

// Called by network dropdown item "WattsA"
function changeToWattsA() {
	model = "wattsA";
	if (document.getElementById("paramsDiv")) {
		closeParams();
		setParameters();
	}
	reset();
}

// Called by network dropdown item "WattsA"
function changeToWattsB() {
	model = "wattsB";
	if (document.getElementById("paramsDiv")) {
		closeParams();
		setParameters();
	}
	reset();
}

// Called by setParamsButton
function setParameters() {

	// Only create params window once
	if (document.getElementById("paramsDiv")) {
		return;
	}

	// Stop generating nodes
	stop();

	// Setting up the table
	let paramWin = d3.select("body").append("div")
					.attr("id", "paramsDiv")
					.styles({position: "relative", "z-index": 1, border: "5px solid black", background: "white", overflow: "hidden",
							width: "50%", height: "50%", top: "15%", left: "25%"});

	// Defining table data (which parameters we allow to be changed)
	let columns = ["text", "range", "value"];
	const initNodesSign = model == "barab" || model == "minor" ? "m<sub>0</sub>" : "n";
	let tableData = [{"text": "[" + initNodesSign + "] Amount initial nodes: ", "id": "minNodes", "min": 2, "max": 512, "value": initNodes,
							"descr": "Determines how many nodes the network has upon reset."}
	];	
	switch(model) {
		case "minor":
		case "barab":
			tableData = tableData.concat([	{"text": "Maximal amount of nodes: ", "id": "maxNodes", "min": 2, "max": 512, "value": maxNodes,
												"descr": "Determines how many nodes the network can have."},
											{"text": "Initial edge probability: ", "id": "initProb", "min": 0, "max": 100, "value": initProb*100,
												"descr": "Given any two nodes in the initial network, this is the probability for an edge being between them."},
											{"text": "[m] New edges per node: ", "id": "initPartners", "min": 0, "max": initNodes, "value": initPartners,
												"descr": "Determines to how many nodes every new node will connect."}
			]);
			if (model == "minor") {
				tableData = tableData.concat([	{"text": "Minority nodes percentage: ", "id": "minorityPercentage", "min": 0, "max": 100, "value": minorityPercentage*100,
													"descr": "Determines the percentage of nodes belonging to the minority group."},
												{"text": "[h] Homophily parameter: ", "id": "relationalFactor", "min": 0, "max": 100, "value": relationalFactor*100,
													"descr": "The higher the value, the less willing are nodes of different groups to connect i.e. high group separation."}
				]);
			}
			break;
		case "gilbert":
			tableData = tableData.concat([	{"text": "[p] Edge probability: ", "id": "initProb", "min": 0, "max": 100, "value": initProb*100,
									"descr": "Given any two nodes in the network, this is the probability for an edge being generated between them."}
			]);
			break;
		case "wattsA":
			tableData = tableData.concat([	{"text": "[k] Initial common node degree: ", "id": "initDegree", "min": 0, "max": initNodes-1, "value": initDegree,
												"descr": "Determines the initial degree for every node in the Watts-Model."},
											{"text": "[p] Baseline edge probability: ", "id": "initProb", "min": 0, "max": 100, "value": initProb*100,
												"descr": "Baseline probability to create an edge between any couple of nodes."},
											{"text": "[\u03B1] Alpha factor: ", "id": "alphaFactor", "min": 0, "max": 10000, "value": alphaFactor,
												"descr": "Regulates between the caveman (low) vs solaria (high) propensities for new connections."},
											{"text": "[k<sub>f</sub>] Average degree to reach: ", "id": "finalAvgDegree", "min": 0, "max": 100, "value": finalAvgDegree,
												"descr": "The model keeps running until this average degree is reached."}
			]);
			break;
		case "wattsB":
			tableData = tableData.concat([	{"text": "[k] Initial common node degree: ", "id": "initDegree", "min": 0, "max": initNodes-1, "value": initDegree,
												"descr": "Determines the initial degree for every node in the Watts-Model."},
											{"text": "[\u03B2] Rewiring probability: ", "id": "rewireProb", "min": 0, "max": 100, "value": rewireProb*100,
												"descr": "Determines the probability that a given edge gets rewired in the Watts-Model."}
			]);
			break;
		default:
			console.log("Wrong model in setParameters: " + model)
			break;
	}

	tableData = tableData.concat([{"text": "Milliseconds until next node: ", "id": "refreshRate", "min": 100, "max": 2000, "value": refreshRate,
									"descr": "Determines how fast new nodes are being generated."}
	]);

	// tr's define rows and td's then specify the cells which get filled
	paramWin.append("table")
		.append("tbody")
		.selectAll("tr")
		.data(tableData)
		.enter()
		.append("tr")
			.selectAll("td")
			.data(row => {
				return columns.map(column => {
					return {column: column, value: row};
				});
			}).enter()
			.append("td")
			.each(fillParameterCell);

	let buttonRow = paramWin.append("row")
		.styles({position: "absolute", bottom: "5px", left: "5px"});

	// Save parameters button
	buttonRow.append("columns").append("input")
		.attrs({type: "button", id: "saveParamsButton", value: "Save Parameters", onclick: "saveParams()"});

	// Cancel button
	buttonRow.append("columns").append("input")
		.attrs({type: "button", id: "cancelParamsButton", value: "Cancel", onclick: "closeParams()"});

	// Set to Default button
	buttonRow.append("columns").append("input")
		.attrs({type: "button", id: "setDefaultButton", value: "Set to default", onclick: "setDefault()"});
}

// Called by range inputs' "onchange"
function updateText(c, val) {
	d3.select("#" + c).attr("value", val);
}

// Called by saveParamsButton
function saveParams() {
	let checkInput = parseInt(document.getElementById("minNodesText").value);
	if (isNaN(checkInput) || checkInput < 2 || checkInput > 512) {
		alert("The amount of initial nodes must be between 2 and 512");
		return;
	}
	initNodes = checkInput;

	switch(model) {
		case "minor":
		case "barab":
			checkInput = parseInt(document.getElementById("maxNodesText").value)
			if (isNaN(checkInput) || checkInput < 2 || checkInput > 512) {
				alert("The maximal amount of nodes must be between 2 and 512");
				return;
			}
			maxNodes = checkInput;
			checkInput = parseFloat(document.getElementById("initProbText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
				alert("The initial edge probability must be between 0 and 1");
				return;
			}
			initProb = checkInput;
			checkInput = parseFloat(document.getElementById("initPartnersText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > initNodes) {
				alert("The amount of new edges must be between 0 and the amount of initial nodes");
				return;
			}
			initPartners = checkInput;

			if (model == "minor") {
				checkInput = parseFloat(document.getElementById("minorityPercentageText").value)
				if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
					alert("The percentage of minority nodes must be between 0 and 1");
					return;
				}
				minorityPercentage = checkInput;
				checkInput = parseFloat(document.getElementById("relationalFactorText").value)
				if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
					alert("The homophily parameter must be between 0 and 1");
					return;
				}
				relationalFactor = checkInput;
			}
			break;
		case "gilbert":
			checkInput = parseFloat(document.getElementById("initProbText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
				alert("The edge probability must be between 0 and 1");
				return;
			}
			initProb = checkInput;
			break;
		case "wattsA":
			checkInput = parseFloat(document.getElementById("initProbText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
				alert("The baseline edge probability must be between 0 and 1");
				return;
			}
			initProb = checkInput;
			checkInput = parseFloat(document.getElementById("alphaFactorText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 10000) {
				alert("The alpha factor must be between 0 and 10000");
				return;
			}
			alphaFactor = checkInput;
			checkInput = parseInt(document.getElementById("initDegreeText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > initNodes-1 || checkInput%2 == 1) {
				alert("The initial node degree must be an even number between 0 and the amount of initial nodes minus one");
				return;
			}
			initDegree = checkInput;
			checkInput = parseInt(document.getElementById("finalAvgDegreeText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 200) {
				alert("The destined average degree must be between 0 and 200");
				return;
			}
			finalAvgDegree = checkInput;
			break;
		case "wattsB":
			checkInput = parseInt(document.getElementById("initDegreeText").value)
			if (isNaN(checkInput) || checkInput < 0 || checkInput > initNodes-1 || checkInput%2 == 1) {
				alert("The initial node degree must be an even number between 0 and the amount of initial nodes minus one");
				return;
			}
			initDegree = checkInput;
			checkInput = parseFloat(document.getElementById("rewireProbText").value);
			if (isNaN(checkInput) || checkInput < 0 || checkInput > 1) {
				alert("The rewire probability must be between 0 and 1");
				return;
			}
			rewireProb = checkInput;
			break;
	}

	checkInput = parseInt(document.getElementById("refreshRateText").value)
	if (isNaN(checkInput) || checkInput < 100 || checkInput > 2000) {
		alert("The amount of milliseconds must be between 100 and 2000");
		return;
	}
	refreshRate = checkInput;

	closeParams();
	reset();
}

// Called by cancelParamsButton
function closeParams() {
	d3.select("#paramsDiv").remove();
}

// Called by setDefaultButton
function setDefault() {
	d3.select("#minNodesText").attr("value", 5);
	d3.select("#maxNodesText").attr("value", 512);
	d3.select("#initProbText").attr("value", 0.3);
	d3.select("#minorityPercentageText").attr("value", 0.2);
	d3.select("#relationalFactorText").attr("value", 0.8);
	d3.select("#alphaFactorText").attr("value", 1);
	d3.select("#finalAvgDegreeText").attr("value", 5);
	d3.select("#initDegreeText").attr("value", 4);
	d3.select("#rewireProbText").attr("value", 0.5);
	d3.select("#refreshRateText").attr("value", 200);
}

// Called by chartDropdownButton (dropdown display toggle)
function toggleDropdown(spec) {
	switch(d3.select("#" + spec + "DropdownMenu").style("display")) {
		case "none":
			d3.select("#" + spec + "DropdownMenu").style("display", "block");
			break;
		case "block":
			d3.select("#" + spec + "DropdownMenu").style("display", "none");
			break;
		default:
			console.log("Wrong dropdown menu display in toggleDropdown: " + d3.select("#" + spec + "DropdownMenu").style("display"))
			break;
	}
}

// Called by chart dropdown item "Bar"
function changeToBar() {
	chartType = "bar";
	updateChartParams();
	updateChart(true);
}

// Called by chart dropdown item "Scatter"
function changeToScatter() {
	chartType = "scatter";
	updateChartParams();
	updateChart(true);
}

// Called by chart dropdown item "Avg Path Length"
function changeToAPL() {
	chartType = "apl";
	updateChartParams();
	updateChart(true);
}

// Called by twSizeInput
function updateTwSize(checkKey=true) {

	// If enter was pressed in the text field
	if (event.keyCode == 13 || !checkKey) {

		// Check value
		let checkInput = parseInt(document.getElementById("twSizeInput").value);
		if (isNaN(checkInput) || checkInput < 1) {
			alert("Time step value must be bigger than 0");
			document.getElementById("twSizeInput").value = twSize;
			return;
		}
		twSize = checkInput;
		if (twSize > aplTimeWindow.length) {
			aplTimeWindow = Array(twSize - aplTimeWindow.length).fill(0).concat(aplTimeWindow);
		} else {
			aplTimeWindow = aplTimeWindow.slice(aplTimeWindow.length - twSize);
		}
		drawAvgPathLengthProgress();
	}
}

// Called by twCheckbox
function checkboxChange(cb) {
	if (cb.checked) {
		twSize = -1;	// -1 marks to show all steps
		while (aplTimeWindow[0] == 0 && aplTimeWindow.length > 0) {
			aplTimeWindow.shift();
		}
		d3.select("#twSizeInput").attr("disabled", "disabled")
		drawAvgPathLengthProgress();
	} else {
		d3.select("#twSizeInput").attr("disabled", null)
		updateTwSize(false);
	}
}
//
// -----------------------------</ Button functions >-----------------------------
//

/*
--- TODO's ---
-parameters always visible
-add edge-adding model (befriend with random node, befriend with node's friend with certain probability)

--- BUG's ---
-absolutely none :))
*/