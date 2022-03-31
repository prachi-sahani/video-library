import { Route, Routes } from "react-router-dom";
import { Sidenav } from "../sidenav/Sidenav";
import { VideoListing } from "../videoListing/VideoListing";
import "./explorePage.css"

export function ExplorePage(){
    return(
        <main className="explore-page">
        <Sidenav />
        <Routes>
            <Route path="/" element={<VideoListing/>}></Route>
        </Routes>
        </main>
    )
}