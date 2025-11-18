import './App.css';
import FirstPage from './components/firstPage/page';
import ArchivePage from './components/archivePage/page';
import { useDispatch } from 'react-redux';
import { setActivePage } from './slices/pageSlice';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PageTracker() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === '/transcribe') {
            dispatch(setActivePage('transcribe'));
        } else if (location.pathname === '/archive') {
            dispatch(setActivePage('archive'));
        }
    }, [location.pathname, dispatch]);

    return null;
}

function App() {
    return (
        <Router>
            <PageTracker />

            <Routes>
                <Route path='/transcribe' element={<FirstPage />} />
                <Route path='/archive' element={<ArchivePage />} />
            </Routes>
        </Router>
    );
}

export default App;
