import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HelloWorld from "./components/HelloWorld";
import FullProof from "./components/FullProof";

function Home() {
  return <h1 className="text-2xl">Home</h1>;
}

// function About() {
//   return <h1 className="text-2xl">About</h1>;
// }

export default function App() {
  // return <FullProof />

  return (
    <BrowserRouter>
      <nav className="p-4 space-x-4 bg-gray-100">
        <Link to="/">Home</Link>
        <Link to="/hello-world">Hello World</Link>
      </nav>

      <div className="p-4">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/*" element={<FullProof />} />
          <Route path="/hello-world" element={<HelloWorld />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
