import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faBriefcase, faChartBar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import './sideNav.css'
import { useState } from "react"

export const SideNav = () => {
    const [active, setActive] = useState("home");

    return (
        <div className="absolute left-0 top-16 h-full rounded-lg flex flex-col w-40 py-3">
            <ul className="flex flex-col gap-1">
                <Link to="/"><li className={`sideNavItem ${active === 'home' ? 'active' : ''}`} onClick={() => setActive('home')}><FontAwesomeIcon icon={faChartBar} /> Dashboard</li></Link>
                <Link to="/portfolio"><li className={`sideNavItem ${active === 'portfolio' ? 'active' : ''}`} onClick={() => setActive('portfolio')}><FontAwesomeIcon icon={faBriefcase} /> Portfolio</li></Link>
                <Link to="/watchlist"><li className={`sideNavItem ${active === 'watchlist' ? 'active' : ''}`} onClick={() => setActive('watchlist')}><FontAwesomeIcon icon={faBookmark} /> Watchlist</li></Link>
            </ul>
        </div>
    )
}