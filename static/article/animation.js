gsap.registerPlugin(ScrollTrigger);

function setColumnsAnimation(chartID) {
  let paths = [];

  for (let pathTag of document.querySelectorAll(`#${chartID} > path`)) {
    let d = pathTag.getAttribute('d');
    paths.push(d);

    // Number value next to the option `v` - the height of the column
    pathTag.setAttribute('d', d.replace(/(?<=v)(.*?)(?<=\s)/, '0'));
  }

  for (let i = 0; i < paths.length; i++) {
    gsap.to(`#${chartID} path:nth-child(${i + 1})`, {
      attr: {
        d: paths[i]
      },
      scrollTrigger: {
        trigger: `#${chartID}`,
        start: '20% 75%',
        once: true
      },
      duration: 2
    });
  }
}


function drawingCurveAnimation() {
  let line = document.querySelector('.line-1');
  var length = line.getTotalLength();

  gsap.set(line, { strokeDasharray: length });
  gsap.fromTo(line, 5, { strokeDashoffset: length }, { strokeDashoffset: 0 });
}

try {
  drawingCurveAnimation();

  for (let i = 1; i <= 4; i++) {
    setColumnsAnimation(`column-chart-${i}`);
  }
} catch {
  console.log('Charts are not found!')
}
