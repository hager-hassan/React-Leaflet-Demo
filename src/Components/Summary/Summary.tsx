import { useContext } from "react"
import { MapContext } from "../../Context/MapContext"


export default function Summary() {
    const {summary} = useContext(MapContext)!;

  return (
    <div className="w-4/5">
        {summary &&
        <>
        <div>
            <p>Distance: {((summary?.distance)/1000)} KM</p>
        </div>

        <div>
            <p>Time: {((summary?.duration)/60)} min</p>
        </div>
        </>
        }
    </div>
  )
}
