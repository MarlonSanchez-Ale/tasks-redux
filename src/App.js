import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="flex flex-wrap justify-center p-4 text-center text-gray-100">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/create-task' element={<TaskForm />} />
            <Route path='/edit-task/:id' element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
