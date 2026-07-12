import NavBar from "./components/NavBar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.css";

const mySkills = ["Python", "DBMS", "DSA", "Node.js"];

function App() {
  return (
    <>
      <NavBar />
      <Header name="Janvi" themeColor="#3e4c59" />
      <About />
      <Skills skillList={mySkills} />
      <Projects />
      <Footer />
    </>
  );
}

export default App;
