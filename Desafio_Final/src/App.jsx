import { Routes, Route } from "react-router-dom";
import { GalleryPage } from "./pages/GalleryPage";
import { DetailsPage } from "./pages/DetailsPage";
import { ComparePage } from "./pages/ComparePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/pokemon/:id" element={<DetailsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
