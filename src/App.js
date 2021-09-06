import { useRef } from 'react'

function ObjectDetector() {
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  function handleFileChange(e) {
    const image = imageRef.current
    const canvas = canvasRef.current

    if (e.target.files.length) {
      image.src = URL.createObjectURL(e.target.files[0])
      image.onload = () => {
        detectObjects(image, canvas)
      }
    }
  }

  function detectObjects(image, canvas) {
    const ctx = canvas.getContext('2d')
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0, image.width, image.height)
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.rect(20, 20, 100, 100)
    ctx.stroke()
  }

  return (
    <div>
      <h3 className="text-center mb-3">Object Detection with TensorFlow.js</h3>
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

function App() {
  return (
    <div className="container">
      <div className="row justify-content-md-center mt-3">
        <div className="col-md-8">
          <ObjectDetector />
        </div>
      </div>
    </div>
  )
}

export default App
