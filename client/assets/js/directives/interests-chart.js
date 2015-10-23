function updateInterestsChart(canvas, chart) {
    var ctx = canvas.getContext('2d');

    var OFFSET_Y = 25;
    var FONT_SIZE = 14;

    var WIDTH = 1000;
    var elemsNumber = 0;
    for(var key in chart.data) {
        if (!chart.data.hasOwnProperty(key)) {
            return;
        }
        elemsNumber += 1;
        elemsNumber += chart.data[key].length;
    }
    var HEIGHT = elemsNumber * (OFFSET_Y + FONT_SIZE) + 250;

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

    ctx.font = FONT_SIZE + 'px Arial';
    ctx.strokeStyle = 'grey';

    var START_X = 90;
    var START_Y = 70;

    var END_Y = HEIGHT - 50;

    var CHART_START_X = START_X + 160;

    var xLabels = chart.xAxis.labels;

    var OFFSET_X = (xLabels.length > 0) ? Math.floor(780 / xLabels.length) : 0;
    var SCALE_UNIT = Math.floor(OFFSET_X / 3);
    var CENTER_X = WIDTH / 2;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // draw top blue label
    ctx.fillStyle = '#0077c1';
    var text = 'INTEREST AREAS';
    ctx.fillRect(CENTER_X - 37, 20, FONT_SIZE * text.length / 1.3 - 4, FONT_SIZE + 20);
    ctx.fillStyle = 'white';
    ctx.font = 'Bold ' + FONT_SIZE + 'px Arial';
    ctx.fillText(text, CENTER_X - 25, FONT_SIZE + 28);

    var groups = [
        {
            type: 'Primary',
            children: chart.data.primary
        },
        {
            type: 'Secondary',
            children: chart.data.secondary
        },
        {
            type: 'Tertiary',
            children: chart.data.tertiary
        }
    ];

    // draw x-axis labels
    ctx.fillStyle = '#555555';
    xLabels.forEach(function(label, index) {
        label.split(' ').forEach(function(text, i) {
            ctx.fillText(text, CHART_START_X - 60 + index * OFFSET_X, START_Y + 20 + i * FONT_SIZE);
        });
    });

    ctx.save();
    var offset = 0;
    ctx.translate(-60, START_Y + 40);

    // draw data
    groups.forEach(function(group, i) {
        var name = group.type;
        var space = 30;

        // draw group labels
        ctx.translate(0, space);
        ctx.fillStyle = 'black';
        ctx.fillText(name, START_X, OFFSET_Y * offset + 10);

        // draw grid
        ctx.beginPath();

        ctx.setLineDash([5]);
        ctx.strokeWidth = 0.5;

        var groupStartY = OFFSET_Y * offset - FONT_SIZE;

        ctx.moveTo(CHART_START_X, OFFSET_Y * offset - FONT_SIZE);

        if (i === 0) {
            ctx.lineTo(CHART_START_X + (xLabels.length) * OFFSET_X, OFFSET_Y * offset - FONT_SIZE);
        } else {
            ctx.moveTo(CHART_START_X + (xLabels.length) * OFFSET_X, OFFSET_Y * offset - FONT_SIZE);
        }

        ctx.lineTo(CHART_START_X + (xLabels.length) * OFFSET_X, OFFSET_Y * offset - FONT_SIZE + (group.children.length) * OFFSET_Y + space * 2);
        ctx.lineTo(CHART_START_X, OFFSET_Y * offset - FONT_SIZE + (group.children.length) * OFFSET_Y + space * 2);
        ctx.lineTo(CHART_START_X, OFFSET_Y * offset - FONT_SIZE);

        ctx.stroke();

        offset += 1;
        group.children.forEach(function(d) {
            // draw series name
            ctx.fillStyle = d.color;
            ctx.fillText(d.key, START_X, OFFSET_Y * offset + FONT_SIZE);

            // draw bars
            d.values.forEach(function(value, index) {
                ctx.fillRect(
                    CHART_START_X + index * OFFSET_X,
                    OFFSET_Y * offset + 2,
                    SCALE_UNIT * value,
                    FONT_SIZE + 4
                );
            });

            offset += 1;
        });

        // draw dashed vertical lines
        xLabels.forEach(function(_, index) {
            if (index === 0) {
                return;
            }
            ctx.beginPath();
            ctx.moveTo(CHART_START_X + index * OFFSET_X, groupStartY);
            ctx.lineTo(CHART_START_X + index * OFFSET_X, groupStartY + (group.children.length) * OFFSET_Y + space * 2);
            ctx.stroke();
        });
    });

    // draw key
    var LEGEND_SCALE_UNIT = 43;
    var y = HEIGHT - 50;

    ctx.restore();
    ctx.fillStyle = '#555555';
    ctx.fillText('Low Interest', CENTER_X - 220, y + FONT_SIZE);
    ctx.fillText('High Interest', CENTER_X + LEGEND_SCALE_UNIT * 6 - 64, y + FONT_SIZE);

    ctx.fillStyle = '#0077c1';
    ctx.fillRect(CENTER_X - 120, y, LEGEND_SCALE_UNIT * 1, FONT_SIZE + 4);
    ctx.fillRect(CENTER_X + LEGEND_SCALE_UNIT * 1 - 100, y, LEGEND_SCALE_UNIT * 2, FONT_SIZE + 4);
    ctx.fillRect(CENTER_X + LEGEND_SCALE_UNIT * 3 - 80, y, LEGEND_SCALE_UNIT * 3, FONT_SIZE + 4);

    // draw branding text
    ctx.save();
    ctx.translate(WIDTH - 214, HEIGHT - 32);
    ctx.font = '12px Arial';
    ctx.fillStyle = 'grey';
    ctx.fillText('Center for a New American Security', 12, 22);
    ctx.restore();
}

angular.module('app')
    .directive('interestsChart', function() {
        return {
            restrict: 'E',
            template: '<canvas/>',
            scope: {
                chart: '='
            },
            link: function($scope, element) {
                var canvas = element.find('canvas')[0];

                $scope.$watch('chart', function() {
                    updateInterestsChart(canvas, $scope.chart);
                });

                window.addEventListener('resize', function() {
                    updateInterestsChart(canvas, $scope.chart);
                });

                updateInterestsChart(canvas, $scope.chart);
            }
        };
    });