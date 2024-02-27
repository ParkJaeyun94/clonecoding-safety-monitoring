import './index.css';
import { useEffect, useRef } from 'react';

/**
 *
 * @param data
 * @return Array
 * @constructor
 * [
 *  {
 *   week: sun,
 *   value: 0,
 *  },
 *  {
 *   week: mon,
 *   value: 0,
 *  },
 * ]
 */

const Bar = ({ data }) => {
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
      controlBar()
    }

    function controlBar() {
      const sides = 6;
      const interval = (canvasWidth - offsetX * 2) / sides;
      let prevX = 0;
      let prevY = (canvasHeight - offsetY) / 2;

      for (let i = 0; i < sides; i++) {
        const x = interval * i + offsetX * 2;
        const y = canvasHeight - data[i].value - offsetY / 2 - 2;
        const w = 24

        // xAxis
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(197,197,197,0.3)'
        ctx.setLineDash([4, 2]);
        ctx.moveTo(offsetX, offsetY)
        ctx.lineTo(canvasWidth - offsetX, offsetY)
        ctx.moveTo(offsetX, offsetY * 2 - 10)
        ctx.lineTo(canvasWidth - offsetX, offsetY * 2 - 10)
        ctx.stroke()

        // rect
        ctx.strokeStyle = 'rgba(82,82,82,0.66)'
        ctx.lineWidth = 1;
        ctx.roundRect(x - w / 2, y, w, data[i].value, 4)
        ctx.fillStyle = "#2c2c2c";
        ctx.fill()
        prevX = x
        prevY = y

        // text
        ctx.font = "normal 12px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(`${data[i].week}`, x, canvasHeight / 2 + offsetY + 20);

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
    <div className='bar-canvas-container'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Bar
