import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; 
import PageContent from "./Components/PageContent";

function App() {
  return (
    <div className="App">
      <Router>
        <PageContent />
      </Router>
    </div>
  );
}

export default App;
