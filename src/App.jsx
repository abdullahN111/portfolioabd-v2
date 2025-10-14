import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { ContactSection } from "@/pages/ContactSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";
import { projects } from "@/data/projects";
import { ProjectsSection } from "@/pages/ProjectSection";
import { About } from "@/pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <StarBackground />

        <Navbar />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route
            path="/projects"
            element={<ProjectsSection projects={projects} padding={"mt-36"} display={"hidden"} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
