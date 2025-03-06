import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./navigation";
import Footer from "./footer";


const Layout = () => (
<>
        <Navigation />
        <Outlet />
        <Footer />

</>
)

export default Layout;