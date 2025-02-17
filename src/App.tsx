// import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import CategoryListPage from './pages/Category/CategoryListPage'
import CreateCategoryPage from './pages/Category/CreateCategory'
import EditCategoryPage from './pages/Category/EditCategoryPage'
import ContactPage from './pages/Contact.Page'
import HomePage from './pages/HomePage'




// import Layout from "./components/Layout";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import CategoryListPage from "./pages/Category/CategoryListPage.tsx";
// import CreateCategoryPage from "./pages/Category/CreateCategoryPage.tsx";
// import EditCategoryPage from "./pages/Category/EditCategoryPage.tsx";


function App() {


  return (
    <Router>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="categories">
                <Route index element={<CategoryListPage />} />
                <Route path="create" element={<CreateCategoryPage />} />
                <Route path="edit/:id" element={<EditCategoryPage />} />
                {/*<Route path=":id" element={<ViewCategoryPage />} />*/}
            </Route>
        </Route>
    </Routes>
</Router>
  )
}

export default App