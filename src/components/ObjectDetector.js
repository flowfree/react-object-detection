import { useState, useEffect, useRef } from 'react'

function ObjectDetector({ model }) {
  const [image, setImage] = useState(null)
  const [canvas, setCanvas] = useState(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    setImage(imageRef.current)
    setCanvas(canvasRef.current)
  }, [])

  function handleFileChange(e) {
    if (e.target.files.length) {
      image.src = URL.createObjectURL(e.target.files[0])
      image.onload = detectObjects
    }
  }

  function detectObjects() {
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)

    model
      .detect(image)
      .then(predictions => {
        predictions.forEach(p => {
          labelObject(p.class, p.bbox[0], p.bbox[1], p.bbox[2], p.bbox[3])
        })
      })
  }

  function labelObject(label, x, y, width, height) {
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'red'
    ctx.rect(x, y, width, height)
    ctx.stroke()
    ctx.font = '14px courier'
    ctx.textBaseline = 'top'
    const labelWidth = ctx.measureText(label).width
    ctx.fillStyle = 'red'
    ctx.fillRect(x, y, labelWidth, 14)
    ctx.fillStyle = 'yellow'
    ctx.fillText(label, x, y)
  }

  return (
    <div>
      <form>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
      </form>
      <div className="preview">
        <img ref={imageRef} className="img-fluid" alt="" />
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default ObjectDetector
