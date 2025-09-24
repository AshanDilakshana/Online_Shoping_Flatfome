import './App.css'
import ProductCard from './components/productcard.jsx'
import { BrowserRouter, Route,Routes, } from 'react-router-dom'

import Adminpage from './Pages/Adminpage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Logingpage from './Pages/logingpage.jsx'
import { Toaster } from 'react-hot-toast';
 import Test from './Pages/Test.jsx'


function App() {
  
  return ( 
  
    <BrowserRouter>
    
        <div className="w-full h-[100vh] ">
				<Toaster position="top-right"/>
				<Routes path="/">
					<Route path="/*" element={<HomePage/>}/>
					<Route path="/register" element={<h1>Register page</h1>} />
					<Route path="/login" element={<Logingpage/>} />
					<Route path="/admin/*" element={<Adminpage/>} />
					<Route path="/test" element={<Test/>}/>	
							
				</Routes>

			</div>
    </BrowserRouter>

   )
}
export default App
