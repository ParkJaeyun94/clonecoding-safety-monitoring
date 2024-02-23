import './App.css';
import Routers from './router';
import Layout from './layout';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Routers />
      </Layout>
    </div>
  );
}

export default App;
