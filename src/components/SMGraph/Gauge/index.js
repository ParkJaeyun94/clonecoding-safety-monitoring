import './index.css';
import { useEffect, useRef } from 'react';

const Gauge = ({ temperature=Number }) => {
  const canvasRef = useRef(null)
  const PI2 = Math.PI * 2;
  const offsetY = 20

  useEffect(()=>{
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');
    const interval = 1000 / 60

    let canvasWidth, canvasHeight

    function draw() {
      const x = canvasWidth / 2
      const y = canvasHeight / 2 + offsetY
      const radius = canvasWidth / 4
      const startAngle = 0
      const endAngle = Math.PI * 2
      const ratio = (value) => {
        return (value - 11) / (44 - 11) * 100
      }

      // graph background
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle)

      const grd = ctx.createLinearGradient(0, y + radius, x + radius, 0);
      grd.addColorStop(0.2, "#363636");
      grd.addColorStop(0.9, "#0E0E0E");
      ctx.fillStyle = grd
      ctx.fill()

      // graph arc line
      ctx.beginPath();
      ctx.arc(x, y, radius - 10, startAngle, endAngle)
      const lineGrd = ctx.createLinearGradient(x + radius, y + radius / 2, 0, y + radius / 2);
      lineGrd.addColorStop(0.1, "#ffffff");
      lineGrd.addColorStop(0.8, "#363636");
      ctx.strokeStyle = lineGrd
      ctx.stroke()

      // graph text
      /// number
      ctx.font = "40px Comic Sans MS";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(`${temperature}°`, x, y + 5);

      /// text
      ctx.font = "14px Comic Sans MS";
      ctx.fontWeight = '200'
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("Temperature", x, y + radius / 2 - 10);

      // graph scale text
      /// start
      ctx.font = "12px Comic Sans MS";
      ctx.fontWeight = '200'
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("11", x - (radius + 20), y + radius / 2 - 20);

      /// middle
      ctx.fillText("27.5", x, y - (radius + 35));

      /// end
      ctx.fillText("44", x + (radius + 20), y + radius / 2 - 20);

      controlRound(ratio(temperature))

      gaugeInfo(ratio(temperature))
    }

    function controlRound(ratio) {
      const radius = canvasWidth / 4 - 10
      const cRadius = 5
      const startAngle = 0
      const endAngle = Math.PI * 2

      const x = canvasWidth / 2 + radius * Math.cos( PI2 * ratio / 100 - PI2 / 4)
      const y = canvasHeight / 2 + radius * Math.sin(PI2 * ratio / 100 - PI2 / 4) + cRadius / 4 + offsetY

      ctx.beginPath();
      ctx.arc(x, y, cRadius, startAngle, endAngle)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    }

    function gaugeInfo(ratio) {
      const radius = canvasWidth / 4 + 20
      const sides = 20;
      const angle = (PI2 / 2) / sides;

      for (let i = 0; i <= sides; i++) {
        const x = canvasWidth / 2 - radius * Math.cos(angle * i);
        const y = canvasHeight / 2 - radius * Math.sin(angle * i)  + offsetY;

        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, PI2, false);
        ctx.fillStyle = '#484848'
        ctx.fill();

        if (i <= (sides * ratio / 100)) {
          ctx.arc(x, y, 4, 0, PI2, false);
          ctx.fillStyle = '#ffffff'
          ctx.fill();
        }
      }

    }
    // window.addEventListener('mousemove', gaugeMouseHandler);

    function gaugeMouseHandler(e) {
      console.log(e.clientX)
      console.log(e.clientY)
    }

    function resize() {
      canvasWidth = canvasParent.clientWidth
      canvasHeight = canvasParent.clientHeight
      canvas.style.width = canvasWidth
      canvas.style.height = canvasHeight
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      draw()
    }
    function render() {
      let now, delta
      let then = Date.now()

      const frame = () => {
        requestAnimationFrame(frame)
        now = Date.now()
        delta = now - then
        if (delta < interval) return
        then = now - (delta % interval)

        draw()
      }
      requestAnimationFrame(frame)
    }
    // render()

    window.addEventListener('resize', resize)
    resize()

    // unmount 시 실행
    return () => {
      window.removeEventListener('resize', resize)
    }

  }, [])

  return (
    <div className='gauge-canvas-container'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Gauge
