import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/student-page/HomePage";
import JobDetailPage from "./page/student-page/JobDetailPage";
import CompanyDetailPage from "./page/student-page/CompanyDetailPage";
import BrowseCompanyPage from "./page/student-page/BrowseCompanyPage";
import VacancyApplierPage from "./page/company-page/VacancyApplierPage";
import BrowseJobPage from "./page/student-page/BrowseJobPage";
import CompanyHomePage from "./page/company-page/CompanyHomePage";
import CompanyVacancyPage from "./page/company-page/CompanyVacancyPage";
import NewVacancyPage from "./page/company-page/NewVacancyPage";
import StudentProfilePage from "./page/student-page/StudentProfilePage";
import StudentRequestPage from "./page/student-page/StudentRequestPage";
import BrowseStudentPage from "./page/company-page/BrowseStudentPage";
import LoggedInRoute from "./page/context/LoggedInRoute";
import ProtectedRoute from "./page/context/ProtectedRoute";
import CompanyRoute from "./page/context/CompanyRoute";
import CompanyStudentProfilePage from "./page/company-page/StudentProfilePage";
import CompanyReachoutPage from "./page/company-page/CompanyReachoutPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/login"
              element={
                <LoggedInRoute>
                  <LoginPage />
                </LoggedInRoute>
              }
            />
            <Route
              path="/"
              element={
                <LoggedInRoute>
                  <LoginPage />
                </LoggedInRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-detail/:vacancyId"
              element={
                <ProtectedRoute>
                  <JobDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="/company/:companyId" element={<CompanyDetailPage />} />
            <Route
              path="/browse-company"
              element={
                <ProtectedRoute>
                  <BrowseCompanyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/browse-job"
              element={
                <ProtectedRoute>
                  <BrowseJobPage />
                </ProtectedRoute>
              }
            />
            <Route path="/student-profile" element={<StudentProfilePage />} />
            <Route
              path="/student-profile/:studentId"
              element={<StudentProfilePage />}
            />
            <Route
              path="/company/student-profile/:studentId"
              element={<CompanyStudentProfilePage />}
            />
            <Route
              path="/student/requests"
              element={
                <ProtectedRoute>
                  <StudentRequestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vacancy-applier/:vacancyId"
              element={
                <CompanyRoute>
                  <VacancyApplierPage />
                </CompanyRoute>
              }
            />
            <Route
              path="/company/home"
              element={
                <CompanyRoute>
                  <CompanyHomePage />
                </CompanyRoute>
              }
            />
            <Route
              path="/company/vacancy"
              element={
                <CompanyRoute>
                  <CompanyVacancyPage />
                </CompanyRoute>
              }
            />
            <Route
              path="/company/new-vacancy"
              element={
                <CompanyRoute>
                  <NewVacancyPage />
                </CompanyRoute>
              }
            />
            <Route
              path="/company/browse-student"
              element={
                <CompanyRoute>
                  <BrowseStudentPage />
                </CompanyRoute>
              }
            />
            <Route
              path="/company/reach-out"
              element={
                <CompanyRoute>
                  <CompanyReachoutPage />
                </CompanyRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
