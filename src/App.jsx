import './App.css'
import Login from './Components/Pages/Login/Login'
import Header from './Components/Ui/Header/Header';
import Footer from './Components/Ui/Footer/Footer';

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
</style>

function App() {
  
  return (
    <div className='App'>
      
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
