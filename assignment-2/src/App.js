import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Degree from './components/Degree';
import DegreeList from './components/DegreeList';
import NewDegree from './components/NewDegree';
import HomePage from './components/HomePage';
import Cohort from './components/Cohort';
import CohortList from './components/CohortsList';
import NewCohort from './components/NewCohort';
import ModulesList from './components/ModulesList';
import Module from './components/Module';
import ModulesInCohort from './components/ModulesToCohort';
import NewModule from './components/NewModule';
import Student from './components/Student';
import NewStudent from './components/NewStudent';
import StudentGrade from './components/StudentGrade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>}/>

        {/* Degrees */}
        <Route path="/degree" element={<DegreeList/>}/>
        <Route path="degree/:shortcode" element={<Degree/>} />
        <Route path="/new-degree" element={<NewDegree/>} />

        {/* Cohorts */}
        <Route path="/cohort" element={<CohortList/>}/>
        <Route path="cohort/:shortcode" element={<Cohort/>} />
        <Route path="/new-cohort" element={<NewCohort/>} />

        {/* Modules */}
        <Route path="/module" element={<ModulesList/>}/>
        <Route path="/module/:shortcode" element={<Module/>} />
        < Route path="/module/module-to-cohort" element={<ModulesInCohort/>} />
        <Route path="/new-module" element={<NewModule/>} />

        {/* Student */}
        <Route path="/student" element={<Student/>}/>
        <Route path="/new-student" element={<NewStudent/>}/>
        <Route path="/student/set-grade" element={<StudentGrade/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
