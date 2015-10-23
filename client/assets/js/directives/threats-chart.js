function updateThreatsChart(canvas, chart) {
    var ctx = canvas.getContext('2d');

    var WIDTH = 1000;
    var HEIGHT = 1000;

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

    var START_X = 100;
    var START_Y = 40;

    var AREA_WIDTH = WIDTH - START_X - 40;
    var AREA_HEIGHT = HEIGHT - START_Y - 120;
    var SCALE_RATE_X = AREA_WIDTH / 6;
    var SCALE_RATE_Y = AREA_HEIGHT / 6;

    // clear chart
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = 'lightgrey';

    // draw dashed lines
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(START_X, START_Y);
    ctx.lineTo(START_X, START_Y + AREA_HEIGHT);
    ctx.lineTo(START_X + AREA_WIDTH, START_Y + AREA_HEIGHT);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = 'grey';

    // draw x-axis
    ctx.save();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(START_X + AREA_WIDTH / 2, START_Y);
    ctx.lineTo(START_X + AREA_WIDTH / 2, START_Y + AREA_HEIGHT);
    ctx.stroke();

    // draw y-axis
    ctx.moveTo(START_X, START_Y + AREA_HEIGHT / 2);
    ctx.lineTo(START_X + AREA_WIDTH, START_Y + AREA_HEIGHT / 2);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#555555';
    ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';

    // draw x-axis labels
    ctx.fillText('Unlikely', START_X, START_Y + AREA_HEIGHT + FONT_SIZE + 10);
    ctx.fillText('Likely', START_X + AREA_WIDTH - 3 * FONT_SIZE, START_Y + AREA_HEIGHT + FONT_SIZE + 10);

    // draw y-axis labels
    ctx.fillText('High', START_X - 3 * FONT_SIZE, START_Y + FONT_SIZE);
    ctx.fillText('Low', START_X - 3 * FONT_SIZE, START_Y + AREA_HEIGHT);

    // draw y-axis blue label
    ctx.save();
    ctx.translate(20, HEIGHT / 2);
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
    ctx.translate(WIDTH / 2 - 20, HEIGHT - 80);
    ctx.fillStyle = '#0077c1';
    var xLabel = 'LIKELIHOOD';
    ctx.fillRect(0, 0, FONT_SIZE * xLabel.length / 1.3, FONT_SIZE + 20);
    ctx.fillStyle = 'white';
    ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(xLabel, 12, FONT_SIZE + 7);
    ctx.restore();

    // draw data
    chart.data.forEach(function(data) {
        var x = START_X + (data.values[0].x + 3) * SCALE_RATE_X;
        var y = START_Y + (data.values[0].y * -1 + 3) * SCALE_RATE_Y;

        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';

        // draw point
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.fill();

        // randomly position key label
        var keyLabelWidth = FONT_SIZE * data.key.length * .55 + 18;
        var keyLabelHeight = FONT_SIZE + 15;
        var rand = Math.random();
        var alpha = rand * Math.PI * 2;
        var radius = 40;
        var lx = x + radius * Math.cos(alpha);
        var ly = y + radius * Math.sin(alpha);

        var keyLabelX = lx;
        var keyLabelY = ly;

        if (data.values[0].x == -3) { // left edge case
            if ((rand > .25) && (rand <= .75)) {
                lx = lx - 2 * radius * Math.cos(alpha);
                keyLabelX = keyLabelX - 2 * radius * Math.cos(alpha); 
            } 

            if (rand >= .5) {
                keyLabelY = keyLabelY - keyLabelHeight;
            }
        } else if (data.values[0].x == 3) { // right edge case
            if (rand >= .3) {
                keyLabelX = keyLabelX - keyLabelWidth;   
            } else {
                lx = lx - 2 * radius * Math.cos(alpha);
                keyLabelX = keyLabelX - keyLabelWidth - 2 * radius * Math.cos(alpha);
            }

            if (rand >= .85) {
                keyLabelY = keyLabelY - keyLabelHeight;
            }
        } else if (data.values[0].y == 3) { // top edge case
            if (rand > .5) {
                ly = ly - 2 * radius * Math.sin(alpha);
                keyLabelY = keyLabelY + keyLabelHeight;
                keyLabelX = keyLabelX - keyLabelWidth;
            } 

            if (rand >= .6) {
                keyLabelY = keyLabelY - keyLabelHeight - 2 * radius * Math.sin(alpha);
            }
        } else if (data.values[0].y == -3) { // bottom edge case
            if (rand < .5) {
                ly = ly - 2 * radius * Math.sin(alpha);
                keyLabelY = keyLabelY - keyLabelHeight - 2 * radius * Math.sin(alpha);
            } 

            if (rand >= .5) {
                keyLabelY = keyLabelY - keyLabelHeight;
            }
        } else if ((rand > .4) && (rand < .6)) {
            keyLabelX = keyLabelX - keyLabelWidth;
        } else if ((rand >= .6) && (rand < .85)) {
            keyLabelX = keyLabelX - keyLabelWidth;
            keyLabelY = keyLabelY - keyLabelHeight;
        } 

        ctx.beginPath();

        // draw line to key label
        ctx.moveTo(x, y);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        ctx.rect(keyLabelX, keyLabelY, keyLabelWidth, keyLabelHeight);
        ctx.stroke();

        // draw key label
        ctx.fillRect(keyLabelX, keyLabelY, keyLabelWidth, keyLabelHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
        ctx.fillText(data.key, keyLabelX + 9, keyLabelY + FONT_SIZE + 4);
    });

    // draw branding text
    ctx.save();
    ctx.translate(WIDTH - 214, HEIGHT - 32);
    ctx.font = '12px Arial';
    ctx.fillStyle = 'grey';
    ctx.fillText('Center for a New American Security', 12, 22);
    ctx.restore();
}

angular.module('app')
	.directive('threatsChart', function() {
		return {
			restrict: 'E',
			template: '<canvas/>',
			scope: {
                chart: '='
			},
			link: function($scope, element) {
                var canvas = element.find('canvas')[0];

                $scope.$watch('chart', function() {
                    updateThreatsChart(canvas, $scope.chart);
                });

                window.addEventListener('resize', function() {
                    updateThreatsChart(canvas, $scope.chart);
                });

                updateThreatsChart(canvas, $scope.chart);
			}
		};
	});
