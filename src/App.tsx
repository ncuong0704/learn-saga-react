import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Route, Switch } from 'react-router-dom';

import './App.css';

function App() {
  
  return (
    <div style={{backgroundColor: "#f3f3f3"}}>
     <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
     </Switch>
    </div>
  );
}

export default App;
