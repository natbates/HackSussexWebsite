import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import { useSiteData } from "./hooks/useSiteData";

import "./styles/global.css";
import "./styles/loading.css";

import Committee from "./pages/committee/committee";
import Sponsors from "./pages/sponsors/sponsors";
import Gallery from "./pages/gallery/gallery";
import Events from "./pages/events/events";

import PolaroidColumn from "./components/polaroid-column";

const App = () => {
    const { loading } = useSiteData();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <PolaroidColumn />
            <PolaroidColumn right={true}/>
            <div className="background-grid"></div>
            <Navbar />
            <div className="page-content">
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="/committee" element={<Committee />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;