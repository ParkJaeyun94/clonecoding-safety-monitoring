import './index.css';
import { useEffect, useRef } from 'react';

/**
 *
 * @param data
 * @return Array
 * @constructor
 * [
 *  {
 *   time: 1,
 *   value: 0,
 *  },
 *  {
 *   time: 2,
 *   value: 0,
 *  },
 * ]
 */

const Line = ({ data }) => {
  const canvasRef = useRef(null)
  const PI2 = Math.PI * 2;

  useEffect(()=>{
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');
    const interval = 1000 / 60
    const offsetX = 20
    const offsetY = 40

    let canvasWidth, canvasHeight

    function draw() {
      const x = 20
      const y = canvasHeight / 3 + 2

      controlBar(40)
    }

    function controlBar(percent) {
      const sides = 6;
      const interval = (canvasWidth - offsetX * 2) / sides;
      let prevX = 0;
      let prevY = (canvasHeight - offsetY) / 2;

      for (let i = 0; i < sides; i++) {
        const x = interval * i + offsetX * 2;
        const y = canvasHeight / 2 - data[i].value * 1.3 + offsetY;

        // yAxis
        ctx.strokeStyle = 'rgba(197,197,197,0.3)'
        ctx.moveTo(x, offsetY / 2)
        ctx.lineTo(x, canvasHeight / 2 + offsetY)
        ctx.stroke()

        // circle
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, PI2, false);
        ctx.fillStyle = '#ffffff'
        ctx.fill();
        ctx.strokeStyle = 'rgb(0,0,0)'
        ctx.lineWidth = 2;
        ctx.stroke()

        // line
        ctx.lineWidth = 1;
        ctx.moveTo(prevX + 2, prevY);
        ctx.lineTo(x - 2, y)
        ctx.strokeStyle = 'rgb(82,82,82)'
        ctx.stroke()
        prevX = x
        prevY = y

        // text
        ctx.font = "normal 12px Comic Sans MS";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(`${data[i].value}°`, x, canvasHeight / 2 + offsetY + 20);


        // recent point
        if (i === sides - 1) {
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, PI2, false);
          ctx.strokeStyle = 'rgba(0,225,255,0.4)'
          ctx.stroke()

          ctx.font = "bold 12px Comic Sans MS";
          ctx.fillText(`${data[i].value}°`, x, canvasHeight / 2 + offsetY + 20);
        }
      }
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
    <div className='line-canvas-container'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Line
