import React from 'react';
import './App.css';
import {
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
    BrowserRouter, Route, Link, Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Top from "./components/Top";
import RoutineContents from "./components/RoutineContents";


const theme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {
        mode: "dark",
    },
})

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="/routine_contents" element={<RoutineContents />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
