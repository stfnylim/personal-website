import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Nav />
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/projects"          element={<Projects />} />
        <Route path="/projects/:id"      element={<ProjectDetail />} />
        <Route path="/about"             element={<About />} />
        {/* Catch-all: redirect unknown paths back home */}
        <Route path="*"                  element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
