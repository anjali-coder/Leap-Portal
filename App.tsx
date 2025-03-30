import {Route, Routes } from "react-router-dom";
import AboutPage from "./components/pages/about";
import ContactPage from "./components/pages/contact";
import { ContactsPage } from "./components/pages/ContactPage";
import Cookies from "./components/pages/cookies";
import Disclaimer from "./components/pages/disclaimer";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Dashboard from "./components/dashboard";
import Press from "./components/pages/press";
import Services from "./components/pages/services";
import Story from "./components/pages/story";
import Student from "./components/pages/student";
import Teacher from "./components/pages/teacher";

import RootLayout from "./components/root-layout";
// Import the ActiveTabProvider
import { ActiveTabProvider } from "./components/ActiveTabContext";


const App = () => {
    return (
        <div className="min-h-screen bg-black text-foreground">
            {/* Wrap everything inside ActiveTabProvider */}
            <ActiveTabProvider>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="press" element={<Press />} />
                        <Route path="disclaimer" element={<Disclaimer />} />
                        <Route path="cookies" element={<Cookies />} />
                        <Route path="services" element={<Services />} />
                        <Route path="story" element={<Story />} />
                        <Route path="login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="student" element={<Student />} />
                        <Route path="teacher" element={<Teacher />} />
                        <Route path="ContactsPage" element={<ContactsPage />} />
                    </Route>
                </Routes>
            </ActiveTabProvider>
        </div>
    );
};
export default App;
