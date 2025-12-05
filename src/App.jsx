import './App.css'
import Header from './Components/Ui/Header/Header';
import Footer from './Components/Ui/Footer/Footer';

import AppRoutes from './routes/Route';

function App() {
  
  return (
    <div className='App'>
      
      <Header />
      <AppRoutes/>
      <Footer />

    </div>
  );
}

export default App;
