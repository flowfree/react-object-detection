import './App.css'
import { useState, useEffect } from 'react'
import ObjectDetector from './components/ObjectDetector'

require('@tensorflow/tfjs-backend-cpu')
require('@tensorflow/tfjs-backend-webgl')
const cocossd = require('@tensorflow-models/coco-ssd')

function App() {
  const [model, setModel] = useState(null)

  useEffect(() => {
    cocossd.load().then(setModel)
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-md-center mt-3">
        <div className="col-md-8">
          <h3 className="text-center mb-3">Object Detection with TensorFlow.js</h3>
          {model ? (
            <ObjectDetector model={model} />
          ) : (
            <p className="text-center">
              Please wait while we are loading the model...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
