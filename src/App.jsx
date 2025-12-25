import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { ContactSection } from "@/pages/ContactSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About } from "@/pages/About";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { Projects } from "@/pages/Projects";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />

        <Navbar />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route
            path="/projects"
            element={<Projects />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
