import './App.css';
import Layout from "./components/Layout/Layout";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
    
      <BrowserRouter >
	      <Provider store={store}>
	        <div className="App">
	          <Layout />
	        </div>
         </Provider>
      </BrowserRouter>
   
  );
}

export default App;
