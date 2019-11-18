import interact from "interactjs";

var _taifeng = function (main, viewer) {
  var that = this;
  that.playing_pause = function (index, typhoon_data) {
    if (!main.curPlayTyphoon || main.curPlayTyphoon !== typhoon_data) {
      main.clearMap();
      // play new
      main.curPlayTyphoon = typhoon_data;
      that.addTyphoon(typhoon_data);
      main.curPlayTyphoon.typ_playing = true;
      viewer.clock.shouldAnimate = true;
    } else if (main.curPlayTyphoon.typ_playing) {
      // pause play
      main.curPlayTyphoon.typ_playing = false;
      viewer.clock.shouldAnimate = false;
    } else if (!main.curPlayTyphoon.typ_playing) {
      // continue play
      main.curPlayTyphoon.typ_playing = true;
      viewer.clock.shouldAnimate = true;
    }
  };
  that.addTyphoon = function (typhoon) {
    main.__moveCam(typhoon.detail_info.points[0], main.cam_2500K);

    let theta = -500;
    let overlap_typhoons = main.getSamePeriodTyphoons(typhoon);
    main.playingTyphoons = overlap_typhoons;

    let cur_start = Cesium.JulianDate.fromDate(
      new Date(typhoon.typ_starttime)
    );
    let cur_stop = Cesium.JulianDate.fromDate(new Date(typhoon.typ_endtime));

    viewer.clock.shouldAnimate = true;
    viewer.clock.startTime = cur_start.clone();
    viewer.clock.stopTime = cur_stop.clone();
    viewer.clock.currentTime = cur_start.clone();

    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    viewer.clock.multiplier = 12200; //how much time to advance each tick

    let property_position = [];

    let property_year = [];
    let property_month = [];
    let property_date = [];
    let property_hour = [];
    let property_lng = [];
    let property_lat = [];
    let property_press = [];
    let property_speed = [];
    let property_radius_10 = [];
    let property_radius_7 = [];
    for (let ti = 0; ti < overlap_typhoons.length; ti++) {
      let start = Cesium.JulianDate.fromDate(
        new Date(overlap_typhoons[ti].typ_starttime)
      );
      let stop = Cesium.JulianDate.fromDate(
        new Date(overlap_typhoons[ti].typ_endtime)
      );

      let points = overlap_typhoons[ti].detail_info.points;
      property_position[ti] = new Cesium.SampledPositionProperty();
      property_year[ti] = new Cesium.SampledProperty(Number);
      property_month[ti] = new Cesium.SampledProperty(Number);
      property_date[ti] = new Cesium.SampledProperty(Number);
      property_hour[ti] = new Cesium.SampledProperty(Number);
      property_lng[ti] = new Cesium.SampledProperty(Number);
      property_lat[ti] = new Cesium.SampledProperty(Number);
      property_press[ti] = new Cesium.SampledProperty(Number);
      property_speed[ti] = new Cesium.SampledProperty(Number);
      property_radius_10[ti] = new Cesium.SampledProperty(Number);
      property_radius_7[ti] = new Cesium.SampledProperty(Number);

      for (let i = 0; i < points.length; i++) {
        let time = Cesium.JulianDate.addHours(
          start,
          i,
          new Cesium.JulianDate()
        );
        let position = Cesium.Cartesian3.fromDegrees(
          points[i].lng,
          points[i].lat
        );

        let radius_7 = points[i].radius7 == "" ? 0 : points[i].radius7 / 1;
        let radius_10 = points[i].radius10 == "" ? 0 : points[i].radius10 / 1;

        let press = points[i].pressure === "" ? 0 : points[i].pressure;
        let speed = points[i].speed === "" ? 0 : points[i].speed;

        property_position[ti].addSample(time, position);
        let date_cnv = new Date(points[i].time);
        property_year[ti].addSample(time, date_cnv.getFullYear());
        property_month[ti].addSample(time, date_cnv.getMonth() + 1);
        property_date[ti].addSample(time, date_cnv.getDate());
        property_hour[ti].addSample(time, date_cnv.getHours());
        property_lng[ti].addSample(time, points[i].lng);
        property_lat[ti].addSample(time, points[i].lat);
        property_press[ti].addSample(time, press);
        property_speed[ti].addSample(time, speed);
        property_radius_10[ti].addSample(time, radius_10);
        property_radius_7[ti].addSample(time, radius_7);

        //add live points
        main.__addEntities({
          id: overlap_typhoons[ti].typ_no +
            "_" +
            overlap_typhoons[ti].typ_name +
            "_typpoint_" +
            i,
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: time,
              stop: stop
            })
          ]),
          position: position,
          point: {
            pixelSize: 12,
            color: Cesium.Color.BLUE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          }
        });
        // //add live path
        if (i > 0) {
          main.__addEntities({
            id: overlap_typhoons[ti].typ_no +
              "_" +
              overlap_typhoons[ti].typ_name +
              "_path_" +
              i,
            availability: new Cesium.TimeIntervalCollection([
              new Cesium.TimeInterval({
                start: time,
                stop: stop
              })
            ]),
            polyline: {
              positions: new Cesium.Cartesian3.fromDegreesArray([
                points[i - 1].lng,
                points[i - 1].lat,
                points[i].lng,
                points[i].lat
              ]),
              width: 2
            }
          });
        }
      }
    }

    for (let oi = 0; oi < overlap_typhoons.length; oi++) {
      let start = Cesium.JulianDate.fromDate(
        new Date(overlap_typhoons[oi].typ_starttime)
      );
      let stop = Cesium.JulianDate.fromDate(
        new Date(overlap_typhoons[oi].typ_endtime)
      );
      //add tip_window
      let tip_id = "tip_window_" + overlap_typhoons[oi].typ_no + "_" + overlap_typhoons[oi].typ_name;
      let tip_window = document.getElementById(tip_id);
      if (!tip_window) {
        tip_window = document.createElement("div");
        tip_window.className = "tip_window";
        tip_window.id = tip_id;
        viewer.container.appendChild(tip_window);
        interact("#" + tip_window.id).draggable({
          onmove(event) {
            var target = event.target,
              // keep the dragged position in the data-x/data-y attributes
              x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
              y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
            // translate the element
            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";
            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
            target.is_picked = true;
          },
          onend(event) {
            var target = event.target;
            target.is_picked = false;
          }
        });
      }
      tip_window.is_picked = false;
      tip_window.style.display = "none";
      tip_window.start_time = start;
      tip_window.end_time = stop;

      let line_id = "canvas_" + overlap_typhoons[oi].typ_no + "_" + overlap_typhoons[oi].typ_name;
      let line_canvas = document.getElementById(line_id);
      if (!line_canvas) {
        line_canvas = document.createElement("canvas");
        line_canvas.id = line_id;
        viewer.container.appendChild(line_canvas);
      }
      line_canvas.style.display = "none";
      line_canvas.style["pointer-events"] = "none";
      main.__addEntities({
        id: overlap_typhoons[oi].typ_no +
          "_" +
          overlap_typhoons[oi].typ_name +
          "_move_point",
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop
          })
        ]),
        position: new Cesium.CallbackProperty(function (time, result) {
          var cart2_pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            new Cesium.Cartesian3.fromDegrees(
              property_lng[oi].getValue(time),
              property_lat[oi].getValue(time)
            )
          );

          let tyear = property_year[oi].getValue(time);
          let tmonth = property_month[oi].getValue(time);
          let tdate = Math.floor(property_date[oi].getValue(time));
          let thour = Math.floor(property_hour[oi].getValue(time));
          let tlng = property_lng[oi].getValue(time).toFixed(2);
          let tlat = property_lat[oi].getValue(time).toFixed(2);
          let tpress = property_press[oi].getValue(time).toFixed(2);
          let tspeed = property_speed[oi].getValue(time).toFixed(2);
          let tradius7 = property_radius_7[oi].getValue(time).toFixed(1);
          let tradius10 = property_radius_10[oi].getValue(time).toFixed(1);

          let tips = document.getElementById(
            "tip_window_" +
            overlap_typhoons[oi].typ_no +
            "_" +
            overlap_typhoons[oi].typ_name
          );
          if (tips != null) {
            // console.log(tips.id + ": typhoon id")
            let str_typ = "<p>台风名称：" + overlap_typhoons[oi].typ_name + "</p>";
            str_typ +=
              "<p>时间：" +
              tyear +
              "-" +
              tmonth +
              "-" +
              tdate +
              " " +
              thour +
              ":00:00" +
              "</p>";
            str_typ += "<p>经度：" + tlng + "</p>";
            str_typ += "<p>纬度：" + tlat + "</p>";
            str_typ += "<p>中心气压：" + tpress + "</p>";
            str_typ += "<p>最大风速：" + tspeed + "</p>";
            str_typ += "<p>十级风圈半径：" + tradius10 + "</p>";
            str_typ += "<p>七级风圈半径：" + tradius7 + "</p>";
            tips.style.display = "block";
            tips.innerHTML = str_typ;
            let rx, ry, x_diff, y_diff;
            let dx = tips.getAttribute("data-x") != null ? tips.getAttribute("data-x") : 0,
              dy = tips.getAttribute("data-y") != null ? tips.getAttribute("data-y") : 0;
            rx = parseInt(tips.style.left) + parseInt(dx);
            ry = parseInt(tips.style.top) + parseInt(dy);
            x_diff = rx - cart2_pos.x;
            y_diff = ry - cart2_pos.y;
            if (viewer.clock.shouldAnimate && !tips.is_picked) {
              tips.style.left = cart2_pos.x + off_x - dx + "px";
              tips.style.top = cart2_pos.y + off_y - dy + "px";
              x_diff = off_x;
              y_diff = off_y;
              rx = parseInt(tips.style.left);
              ry = parseInt(tips.style.top);
            }

            let cnv = document.getElementById(
              "canvas_" +
              overlap_typhoons[oi].typ_no +
              "_" +
              overlap_typhoons[oi].typ_name
            );
            cnv.style.display = "block";
            cnv.style.position = "absolute";

            cnv.width = Math.abs(x_diff);
            cnv.height = Math.abs(y_diff);
            if (x_diff <= 0) {
              cnv.style.left = rx + "px";
            } else {
              cnv.style.left = cart2_pos.x + "px";
            }
            if (y_diff <= 0) {
              cnv.style.top = ry + "px";
            } else {
              cnv.style.top = cart2_pos.y + "px";
            }
            let context2D = cnv.getContext("2d");
            context2D.beginPath();
            context2D.lineWidth = 2;
            context2D.strokeStyle = "yellow";
            if ((x_diff <= 0 && y_diff >= 0) || (x_diff > 0 && y_diff < 0)) {
              context2D.moveTo(0, cnv.height);
              context2D.lineTo(cnv.width, 0);
            } else {
              context2D.moveTo(0, 0);
              context2D.lineTo(cnv.width, cnv.height);
            }
            context2D.stroke();
            //remove other ended typhoons
            for (let b = 0; b < overlap_typhoons.length; b++) {
              let jtime = Cesium.JulianDate.fromDate(
                new Date(overlap_typhoons[b].typ_endtime)
              );
              if (jtime < time) {
                let tips_stopped = document.getElementById(
                  "tip_window_" +
                  overlap_typhoons[b].typ_no +
                  "_" +
                  overlap_typhoons[b].typ_name
                );
                if (tips_stopped != null) {
                  tips_stopped.style.display = "none";
                  tips_stopped.remove();
                }
                let cnv_stopped = document.getElementById(
                  "canvas_" +
                  overlap_typhoons[b].typ_no +
                  "_" +
                  overlap_typhoons[b].typ_name
                );
                if (cnv_stopped != null) {
                  cnv_stopped.style.display = "none";
                  cnv_stopped.remove();
                }
              }
            }
          }
          return property_position[oi].getValue(time);
        }, false),
        point: {
          pixelSize: 12,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1
        }
      });
      var rotation = Cesium.Math.toRadians(30);

      function getRotationValue() {
        rotation += 0.05;
        return rotation;
      }
      main.__addEntities({
        id: overlap_typhoons[oi].typ_no +
          "_" +
          overlap_typhoons[oi].typ_name +
          "_layer_radius_7",
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop
          })
        ]),
        position: property_position[oi],
        billboard: new Cesium.BillboardGraphics({
          image: "static/images/tf1.gif",
          rotation: new Cesium.CallbackProperty(getRotationValue, false),
          stRotation: new Cesium.CallbackProperty(getRotationValue, false),
          scale: 1
        }),
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function (time, result) {
            return property_radius_7[oi].getValue(time) * 1000;
          }, false),
          semiMajorAxis: new Cesium.CallbackProperty(function (time, result) {
            return property_radius_7[oi].getValue(time) * 1000;
          }, false),
          material: Cesium.Color.GREEN.withAlpha(0.8),
          zIndex: 4
        }
      });
      main.__addEntities({
        id: overlap_typhoons[oi].typ_no +
          "_" +
          overlap_typhoons[oi].typ_name +
          "_layer_radius_10",
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop
          })
        ]),
        position: property_position[oi],
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function (time, result) {
            return property_radius_10[oi].getValue(time) * 1000;
          }, false),
          semiMajorAxis: new Cesium.CallbackProperty(function (time, result) {
            return property_radius_10[oi].getValue(time) * 1000;
          }, false),
          material: Cesium.Color.RED.withAlpha(0.8),
          zIndex: 5
        }
      });
    }

    gBus.$emit("time", typhoon.typ_endtime, typhoon.typ_no);
    console.log("gBus-emit", "time");

    gBus.$emit("draw_taifengtaganyujing_table");
    console.log("gBus-emit", "draw_taifengtaganyujing_table");
  };
};
export default _taifeng;