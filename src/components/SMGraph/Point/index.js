import './index.css';
import { useEffect, useRef } from 'react';

const Point = ({ title, percent=Number }) => {
  const canvasRef = useRef(null)
  const PI2 = Math.PI * 2;

  useEffect(()=>{
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');
    const interval = 1000 / 60

    let canvasWidth, canvasHeight

    function draw() {
      const x = 20
      const y = canvasHeight / 3 + 2

      // graph text
      /// number
      ctx.font = "14px Comic Sans MS";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "start";
      ctx.fillText(`${title}`, x, y);

      /// end
      ctx.textAlign = "end";
      ctx.fillText(`${percent}%`, canvasWidth - x, y);

      controlBar()
    }

    function controlBar() {
      const sides = 20;
      const intervalX = (canvasWidth - 40) / sides;

      for (let i = 0; i <= sides; i++) {
        const x = intervalX * i + 20;
        const y = 36;

        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, PI2, false);
        ctx.fillStyle = '#484848'
        ctx.fill();

        if (i <= (sides * percent / 100)) {
          ctx.arc(x, y, 4, 0, PI2, false);
          ctx.fillStyle = '#ffffff'
          ctx.fill();
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

  }, [percent])

  return (
    <div className='point-canvas-container'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Point
