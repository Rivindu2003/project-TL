// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PackageManagement from './pages/PackageManagement';
import ReportPage from './components/ReportPage';
import './styles/styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PackageManagement />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </Router>
    );
}