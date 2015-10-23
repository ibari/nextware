angular.module('app')
	.factory('charts', ['stakeholders', function(stakeholders) {
		var charts = {};
		var stakeholders = stakeholders.list;
		var colors = [
	        '#f15a22',
	        '#3f993b',
	        '#00aeef',
	        '#939598',
	        '#fcaf17',
	        '#af1a28',
	        '#8dc63f',
	        '#6c5a50',
	        '#00a79d',
	        '#414042',
	        '#a97c50',
	        '#004873',
	        '#ee2a7b',
	        '#006838',
	        '#602d7e'
 		];

		charts = {
		    impacts: function(facets, stakeholdersFacets) {
		    	var chart = {
					xAxis: {},
					yAxis: {}
				};

		    	chart.xAxis.labels = [];
		    	facets.list.forEach(function(facet, index) {
					if (!facet.name) {
						return;
					}
					chart.xAxis.labels.push(facet.name);
				});

				chart.yAxis.labels = [];
		    	stakeholdersFacets.options.forEach(function(option, index) {
					chart.yAxis.labels.push(option.text);
				});

				chart.data = [];

				stakeholdersFacets.list.forEach(function(stakeholder, index) {
		    		var series = {};
		    		var key = stakeholder.name;

		    		if (key) {
		    			var values = [];
			    		stakeholder.data.phases.forEach(function(phase, index) {
							if (!facets.list[phase.facetId].name) {
								return;
							}
			    			values.push({ x: phase.facetId, y: parseInt(phase.value) - 3 });
			    		});

			    		series.key = key;
			    		series.color = colors[index % colors.length];
			    		series.values = values;
						chart.data.push(series);
					}
				});

				return chart;
		    },
		    interests: function(facets, stakeholdersFacets) {
				var chart = {
					xAxis: {},
					yAxis: {},
					data: {}
				};

		    	chart.xAxis.labels = [];
		    	facets.list.forEach(function(facet, index) {
					if (!facet.name) {
						return;
					}
					chart.xAxis.labels.push(facet.name);
				});

				chart.yAxis.labels = [];
				chart.data.primary = [];
				chart.data.secondary = [];
				chart.data.tertiary = [];

				stakeholdersFacets.list.forEach(function(stakeholder, index) {
		    		var series = {};
		    		var key = stakeholder.name;

		    		if (key) {
		    			var values = [];
			    		stakeholder.data.interestAreas.forEach(function(interestArea, index) {
							if (!facets.list[interestArea.facetId].name) {
								return;
							}
			    			values.push(interestArea.value);
			    		});

			    		series.type = stakeholder.type;
			    		series.key = key;
			    		series.color = "#0077c1";
			    		series.values = values;

			    		switch (stakeholder.type) {
						    case 0:
						        chart.data.primary.push(series);
						        break;
						    case 1:
						        chart.data.secondary.push(series);
						        break;
						    case 2:
						        chart.data.tertiary.push(series);
						        break;
						    default:
						        charts.data.primary.push(series);
						};
					}
				});

				return chart;
		    },
		    threats: function(objectives, threatsObjectives) {
		    	var chart = {
					xAxis: {},
					yAxis: {},
					data: []
				};

		    	chart.xAxis.labels = ['Unlikely', 'Likely'];
				chart.yAxis.labels = ['High', 'Low'];

				chart.data = [];

				threatsObjectives.list.forEach(function(threat, index) {
		    		var series = {};
		    		var key = threat.name;

		    		if (key) {
		    			var values = [];
			    		values.push({
							x: threat.data.objectives[1].value,
							y: threat.data.objectives[0].value
						});

			    		series.key = key;
			    		series.color = "#000000";
			    		series.values = values;
						chart.data.push(series);
					}
				});

				return chart;
		    },
		    test: {
		    	impacts: {
					xAxis: {
						labels: ['Intrusion', 'Discovery', 'Investigation', 'Mitigation', 'Response', 'Recovery']
					},
					yAxis: {
						labels: ['Highly Benefical', 'Moderately Benefical', 'Slightly Benefical', 'None', 'Slightly Damaging', 'Moderately Damaging', 'Highly Damaging']
					},
					data: [
						{
						    key: "Series 1",
						    color: '#f15a29',
						    values: [
						        { x: 0, y: -6 },
						        { x: 1, y: -3 },
						        { x: 2, y: -1 },
						        { x: 3, y: -2 },
						        { x: 4, y: -1 },
						        { x: 5, y: 0 }
						    ]
						},
						{
						    key: "Series 2",
						    color: '#00aeef',
						    values: [
						        { x: 0, y: -4 },
						        { x: 1, y: -1 },
						        { x: 2, y: -4 },
						        { x: 3, y: -2 },
						        { x: 4, y: 0 },
						        { x: 5, y: -1 }
						    ]
						},
						{
						    key: "Series 3",
						    color: '#006738',
						    values: [
						        { x: 0, y: -4 },
						        { x: 1, y: -2 },
						        { x: 2, y: -2 },
						        { x: 3, y: 0 },
						        { x: 4, y: -4 },
						        { x: 5, y: -1 }
						    ]
						}
			    	]
			    },
	            interests: {
	            	xAxis: {
						labels: ['Reputation', 'Financial', 'Legal', 'Operations', 'Technical Security', 'Normative/Precedent Setting']
					},
					yAxis: {
						labels: []
					},
	            	data: {
	            		primary: [
				            {
				            	type: 0,
				                key: "Series 1",
				                color: "#0077c1",
				                values: [1, 3, 0, 2, 3, 2]
				            },
				            {
				            	type: 0,
				                key: "Series 2",
				                color: "#0077c1",
				                values: [2, 1, 3, 0, 2, 2]
				            }
				        ],
				        secondary: [
				            {
				            	type: 1,
				                key: "Series 3",
				                color: "#0077c1",
				                values: [0, 2, 3, 2, 1, 1]
				            },
				            {
				            	type: 1,
				                key: "Series 4",
				                color: "#0077c1",
				                values: [2, 1, 2, 2, 1, 2]
				            }
				        ],
				        tertiary: [
				            {
				            	type: 2,
				                key: "Series 5",
				                color: "#0077c1",
				                values: [2, 0, 1, 0, 1, 3]
				            },
				            {
				            	type: 2,
				                key: "Series 6",
				                color: "#0077c1",
				                values: [3, 3, 2, 1, 1, 2]
				            }
				        ]
			    	}
			    },
			   	threats: {
					xAxis: {
						labels: ['Unlikely', 'Likely']
					},
					yAxis: {
						labels: ['High', 'Low']
					},
					data: [
						{
						    key: "Terrorist Threat",
						    color: '#000000',
						    values: [
						        { x: -2, y: -3 }
						    ]
						},
						{
						    key: "System Shutdown",
						    color: '#000000',
						    values: [
						        { x: -1, y: -1 }
						    ]
						},
						{
						    key: "Data Destruction",
						    color: '#000000',
						    values: [
						        { x: 0, y: 3 }
						    ]
						},
						{
						    key: "Data Threat",
						    color: '#000000',
						    values: [
						        { x: 3, y: 1 }
						    ]
						},
						{
						    key: "Data Leaks",
						    color: '#000000',
						    values: [
						        { x: 2, y: 2 }
						    ]
						}
			    	]
			    }
		    }
		};

		return charts;
	}]);
