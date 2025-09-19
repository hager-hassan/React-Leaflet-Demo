import './App.css'
import Layout from './Components/Layout/Layout'
import MapContextProvider from './Context/MapContextProvider'

function App() {

  return (
    <>
    <MapContextProvider>
      <Layout/>
    </MapContextProvider>
    </>
  )
}

export default App
