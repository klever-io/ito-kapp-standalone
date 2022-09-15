import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import ITOList from 'pages/ITOList';

interface IProtected {
  children: any;
}

const ProtectedRoute: React.FC<IProtected> = ({ children }) => {
  if (!window.kleverWeb?.address) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/ito"
          element={
            <ProtectedRoute>
              <ITOList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
