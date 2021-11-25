import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Superheroes from './components/Superheroes';
import SuperheroDetails from './components/SuperheroDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/superheroes">SuperHeroes</NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/superheroes" element={<Superheroes />} />
            <Route path="/superheroes/:sid" element={<SuperheroDetails />} />
            <Route path="*" element={<Navigate replace to="/superheroes" />} />
          </Routes>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
