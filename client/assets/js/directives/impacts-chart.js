function updateImpactsChart(canvas, chart) {
    var ctx = canvas.getContext('2d');

    var WIDTH = 1000;
    var HEIGHT = 650;

    var containerWidth = canvas.parentNode.parentNode.offsetWidth;
    var scaleRatio = containerWidth / WIDTH;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

    var deviceRatio = devicePixelRatio / backingStoreRatio;
    var ratio = scaleRatio * deviceRatio;

    canvas.width = WIDTH * ratio;
    canvas.height = HEIGHT * ratio;
    canvas.style.width = WIDTH * scaleRatio + 'px';
    canvas.style.heigth = HEIGHT * scaleRatio + 'px';
    canvas.className = 'chart';

    ctx.scale(ratio, ratio);

    var FONT_SIZE = 14;
    ctx.font = FONT_SIZE + 'px Arial';

    var START_X = 125;
    var START_Y = 55;

    var END_Y = HEIGHT - 100;

    var CHART_START_X = START_X + 40;

    var xLabels = chart.xAxis.labels;
    var OFFSET_X = (xLabels.length > 1) ? Math.floor(735 / (xLabels.length - 1)) : 0;
    var OFFSET_Y = 80;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // draw x-axis labels
    ctx.fillStyle = '#555555';
    xLabels.forEach(function(label, index) {
        ctx.textAlign = 'center';
        ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
        ctx.fillText(label, CHART_START_X + (index * OFFSET_X), END_Y + 10 + FONT_SIZE);
    });

    var yLabels = chart.yAxis.labels;

    // draw y-axis labels
    ctx.fillStyle = '#555555';
    yLabels.forEach(function(label, index) {
        ctx.textAlign = 'right';
        label.split(' ').forEach(function(text, i) {
            ctx.fillText(text, CHART_START_X - 40, START_Y + index * OFFSET_Y + FONT_SIZE / 4 + i * FONT_SIZE);
        });
    });

    ctx.strokeStyle = 'grey';

    // draw center line
    ctx.save();
    ctx.lineWidth = 2;
    ctx.beginPath();

    var y = START_Y + yLabels.indexOf('None') * OFFSET_Y;

    ctx.moveTo(CHART_START_X - 20, y);
    ctx.lineTo(900, y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // draw vertical dashed lines
    ctx.save();
    ctx.fillStyle = 'lightgrey';
    ctx.strokeWidth = 1;
    ctx.setLineDash([5]);
    xLabels.forEach(function(label, index) {
        ctx.beginPath();
        ctx.moveTo(CHART_START_X + index * OFFSET_X, START_Y);
        ctx.lineTo(CHART_START_X + index * OFFSET_X, END_Y);
        ctx.stroke();
    });
    ctx.restore();

    // draw y-axis blue label
    ctx.save();
    ctx.translate(20, HEIGHT / 2 + 10);
    ctx.rotate( -Math.PI / 2);
    ctx.fillStyle = '#0077c1';
    var yLabel = 'IMPACT';
    ctx.fillRect(0, 0, FONT_SIZE * yLabel.length, FONT_SIZE + 20);
    ctx.fillStyle = 'white';
    ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(yLabel, 16, FONT_SIZE + 8);
    ctx.restore();

    // draw x-axis blue label
    ctx.save();
    ctx.translate(WIDTH / 2 - 40, HEIGHT - 55);
    ctx.fillStyle = '#0077c1';
    var xLabel = 'TIME';
    ctx.fillRect(0, 0, FONT_SIZE * xLabel.length + 2, FONT_SIZE + 20);
    ctx.fillStyle = 'white';
    ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(xLabel, 12, FONT_SIZE + 7);
    ctx.restore();

    // draw branding text
    ctx.save();
    ctx.translate(WIDTH - 24, HEIGHT - 32);
    ctx.font = '12px Arial';
    ctx.fillStyle = 'grey';
    ctx.fillText('Center for a New American Security', 12, 22);
    ctx.restore();

    var lines = [];
    var delta = 1;

    // find overlapping lines
    chart.data.forEach(function(series) {
        series.delta = 0;

        for (var i = 0; i < series.values.length; i++) {
            var overlaps = [];
            var line = {
                pt1: {x: series.values[i].x, y: series.values[i].y}
            };

            if (i < series.values.length - 1) {
                line.pt2 = {x: series.values[i + 1].x, y: series.values[i + 1].y};
            }

            overlaps = _.filter(lines, function(item) { 
                return _.isEqual(item, line);
            });

            lines.push(line);

            if (overlaps.length > 0) {
                series.delta = delta++;
                break;
            }
        }
    });

    // draw series
    chart.data.forEach(function(series) {
        var color = series.color;
        var name = series.key;
        var points = [];

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        // draw lines
        for (var i = 0; i < series.values.length; i++) {
            var x = CHART_START_X + OFFSET_X * series.values[i].x;
            var y = START_Y + OFFSET_Y * (-series.values[i].y) + series.delta * 5;

            if (i == 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            points.push({x: x, y: y});    
        }

        ctx.stroke();

        // draw label
        var index = Math.floor(Math.random() * (points.length - 1));
        var coef =  Math.random();
        var xLabel = points[index].x + (points[index + 1].x - points[index].x) * coef;
        var yLabel = points[index].y + (points[index + 1].y - points[index].y) * coef;

        ctx.fillStyle = color;
        ctx.font = 'bold ' + FONT_SIZE + 'px Arial';
        ctx.fillText(name, xLabel, yLabel - FONT_SIZE);
    });
}

angular.module('app')
	.directive('impactsChart', function() {
		return {
			restrict: 'E',
			template: '<canvas/>',
			scope: {
                chart: '='
			},
			link: function($scope, element) {
                var canvas = element.find('canvas')[0];

                function update() {
                    updateImpactsChart(canvas, $scope.chart);
                }

                $scope.$watch('chart', update);
                window.addEventListener('resize', update);

                updateImpactsChart(canvas, $scope.chart);
			}
		};
	});
