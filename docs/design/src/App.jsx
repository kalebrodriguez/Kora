import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Hero from './components/Hero.jsx'
import CategoryCards from './components/CategoryCards.jsx'
import EventsCarousel from './components/EventsCarousel.jsx'
import HoursTable from './components/HoursTable.jsx'
import RightRail from './components/RightRail.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto flex max-w-shell">
        <Sidebar />

        {/* Main + right rail */}
        <div className="flex min-w-0 flex-1">
          <main className="min-w-0 flex-1 px-8 pb-12 pt-7">
            <Topbar />
            <Hero />
            <CategoryCards />
            <EventsCarousel />
            <HoursTable />
          </main>

          <RightRail />
        </div>
      </div>
    </div>
  )
}
