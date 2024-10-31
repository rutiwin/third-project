import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import MainPage from './main/MainPage';
import { UserModel } from '../models/UserModel';
import { getUserDetails } from '../client/authApi';
import Header from './header/Header';
import { VacationModel } from '../models/VacationModel';
import VacationsReport from './vacationsReport/VacationsReport';

type Props = {};

export const UserContext = createContext<{
    user: UserModel | null;
    setUser: (user: UserModel | null) => void;
} | null>(null);

export const VacationsContext = createContext<{
    vacations: VacationModel[];
    setVacations: (vacations: VacationModel[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: (pages: number) => void;
    filters: { followed: boolean; upcoming: boolean; active: boolean };
    setFilters: (filters: { followed: boolean; upcoming: boolean; active: boolean }) => void;
} | null>(null);

const AppRoutes = (props: Props) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ followed: false, upcoming: false, active: false });

    useEffect(() => {
        const userDetails = getUserDetails();
        if (userDetails) {
            setUser(userDetails);
        }
        setIsLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <VacationsContext.Provider value={{ vacations, setVacations, currentPage, setCurrentPage, totalPages, setTotalPages, filters, setFilters }}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/vacation-report"
                            element={
                                isLoading ? null : (user && user.isAdmin ? <VacationsReport /> : <Navigate to="/" />)
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
            </VacationsContext.Provider>
        </UserContext.Provider>
    );
};

export default AppRoutes;
