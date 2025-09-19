import Map from '../Map/Map'
import Summary from '../Summary/Summary'

export default function Layout() {
  return (
    <main className='container mx-auto min-h-[100vh] flex flex-col items-center justify-center gap-5'>
        <Summary/>
        <Map/>
    </main>
  )
}
