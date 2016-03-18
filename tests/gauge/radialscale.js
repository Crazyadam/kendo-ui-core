(function() {
    var dataviz = kendo.dataviz;
    var Gauge = dataviz.Gauge;
    var geo = dataviz.geometry;
    var Rect = geo.Rect;
    var Arc = geo.Arc;
    var arc;
    var radialScale;
    var chartBox = new Rect([0, 0], [400, 300]);

    RadialScale = dataviz.RadialScale.extend({
        options: {
            labels: {
                // Tests expect particular font size
                font: "16px Verdana, sans-serif"
            }
        }
    });

    // ------------------------------------------------------------
    module("RadialScale", {
        setup: function() {
            radialScale = new RadialScale({
                    min: 0,
                    max: 100,
                    majorTicks: {
                        size: 10
                    },
                    endAngle: 180,
                    startAngle: 0,
                    labels: {
                        visible: false
                    }
                });
            radialScale.reflow(chartBox);

            arc = radialScale.arc;
        }
    });

    test("reflow calculates scale arc position", function() {
        equal(arc.center.x, 200);
        equal(arc.center.y, 150);
        equal(arc.getRadiusX(), 150);
    });

    test("tickAngles returns array", function() {
        var tickAngles = radialScale.tickAngles(arc, 10);

        ok(tickAngles instanceof Array);
    });

    test("tickAngles returns proper amount of tick angles", function() {
        var tickAngles = radialScale.tickAngles(arc, 10);

        equal(tickAngles.length, 11);

        tickAngles = radialScale.tickAngles(arc, 1);

        equal(tickAngles.length, 101);
    });

    test("renderTicks does not render duplicate ticks for major and minor points", function() {
        $.extend(radialScale.options, {
            min: 0,
            max: 100,
            majorUnit: 50,
            minorUnit: 25,
            endAngle: 270
        });

        arc = new Arc([100, 100], {
            radiusX: 100,
            radiusY: 100,
            startAngle: 270,
            endAngle: 360
        });

        radialScale.arc = arc;

        var ticks = radialScale.renderTicks();
        var count = radialScale.majorTicks.children.length +
                    radialScale.minorTicks.children.length

        equal(count, 5);
    });

    test("slotAngle() returns startAngle/endAngle for extreme values", function() {
        $.extend(radialScale.options, {
            min: 0,
            max: 100,
            startAngle: 27,
            endAngle: 48
        });

        equal(radialScale.slotAngle(0), 207);
        equal(radialScale.slotAngle(100), 228);
    });

    test("slotAngle() takes options.min and options.max into account", function() {
        $.extend(radialScale.options, {
            min: 38,
            max: 106,
            startAngle: 27,
            endAngle: 48
        });

        equal(radialScale.slotAngle(38), 207);
        equal(radialScale.slotAngle(106), 228);
    });

    // ------------------------------------------------------------
    module("RadialScale / Reverse", {
        setup: function() {
            radialScale = new RadialScale({
                min: 0,
                max: 100,
                majorTicks: {
                    size: 10
                },
                endAngle: 100,
                startAngle: 0,
                reverse: true
            });
        }
    });

    test("slotAngle() returns startAngle/endAngle for extreme values", function() {
        $.extend(radialScale.options, {
            min: 0,
            max: 100,
            startAngle: 27,
            endAngle: 48,
            reverse: true
        });

        equal(radialScale.slotAngle(0), 228);
        equal(radialScale.slotAngle(100), 207);
    });

    test("slotAngle() takes options.min and options.max into account", function() {
        $.extend(radialScale.options, {
            min: 38,
            max: 106,
            startAngle: 27,
            endAngle: 48,
            reverse: true
        });

        equal(radialScale.slotAngle(38), 228);
        equal(radialScale.slotAngle(106), 207);
    });

    test("slotAngle() should return correct values", function() {
        $.extend(radialScale.options, {
            min: 0,
            max: 100,
            startAngle: 0,
            endAngle: 100,
            reverse: true
        });

        equal(radialScale.slotAngle(50), 230);
        equal(radialScale.slotAngle(10), 270);
        equal(radialScale.slotAngle(90), 190);
    });

    function createScale(options) {
        radialScale = new RadialScale(options);
    }

    // ------------------------------------------------------------
    module("RadialScale / Ranges");

    test("render default range", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 100
            }]
        });

        radialScale.reflow(chartBox);
        var ranges = radialScale.ranges.children;
        var arc = ranges[0]._geometry; 

        equal(arc.startAngle, radialScale.slotAngle(0));
        equal(arc.endAngle, radialScale.slotAngle(10));
    });

    test("render range from 10 to 100", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 100
            }]
        });

        radialScale.reflow(chartBox);

        var ranges = radialScale.ranges.children;
        var arc = ranges[1]._geometry;
        
        equal(arc.startAngle, radialScale.slotAngle(10));
        equal(arc.endAngle, radialScale.slotAngle(100));
    });

    test("render range from 10 to 50 and from 50 to 100", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 50
            }, {
                from: 50,
                to: 100
            }]
        });

        radialScale.reflow(chartBox);
        var ranges = radialScale.ranges.children;

        var arc = ranges[1]._geometry;
        equal(arc.startAngle, radialScale.slotAngle(10));
        equal(arc.endAngle, radialScale.slotAngle(50));

        arc = ranges[2]._geometry;
        equal(arc.startAngle, radialScale.slotAngle(50));
        equal(arc.endAngle, radialScale.slotAngle(100));
    });  

    test("render range color", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 100,
                color: "color"
            }]
        });
        radialScale.reflow(chartBox);

        var ranges = radialScale.ranges.children;
        var style = ranges[1].options;

        equal(style.stroke.color, "color");
    });

    test("render range opacity", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 100,
                opacity: 0.2
            }]
        });
        radialScale.reflow(chartBox);

        var ranges = radialScale.ranges.children;
        var style = ranges[1].options;

        equal(style.stroke.opacity, 0.2);
    });

    // ------------------------------------------------------------
    module("RadialScale / Configuration");

    test("render scale with default min, max and majorUnit", function() {
        createScale({ });
        var options = radialScale.options;
        equal(options.min, 0);
        equal(options.max, 100);
        equal(options.majorUnit, 20);
    });

    test("render scale with min=0 max=12 majorUnit=2", function() {
        createScale({
            min: 0,
            max: 12
        });
        equal(radialScale.options.majorUnit, 2);
    });

    test("sets auto majorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(radialScale.options.majorUnit, 200);
    });

    test("sets auto minorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(radialScale.options.minorUnit, 20);
    });

    test("sets majorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            majorUnit: 10
        });
        equal(radialScale.options.majorUnit, 10);
    });

    test("sets minorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            minorUnit: 10
        });
        equal(radialScale.options.minorUnit, 10);
    });
}());