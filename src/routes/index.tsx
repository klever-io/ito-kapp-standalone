import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import ITOList from 'pages/ITOList';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ito" element={<ITOList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
