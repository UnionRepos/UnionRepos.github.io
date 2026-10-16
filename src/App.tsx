import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Repositories } from "./components/Repositories";
import { Statement } from "./components/Statement";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Nav />
      <main id="content">
        <Hero />
        <Statement />
        <Repositories />
      </main>
      <Footer />
    </>
  );
}
