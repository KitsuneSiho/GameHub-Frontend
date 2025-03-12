import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./NavigationBar";
import Footer from "./Footer";


const Layout = () => (
<>
        <Navigation />
        <Outlet />
        <Footer />

</>
)

export default Layout;