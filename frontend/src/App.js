import './App.css';
import About from './about/About';
function App() {
      let fruits=["apple","banana","grapes"]
      let car="this is a car"
  return (
    
    <>
      <h1 className='font-bold underline text-3xl'>Hello React</h1>
      <p>Welcome to React world!</p>
      {
        fruits.map((fruit,index)=><h1 key={fruit}> Fruits is {fruit} and index no is {index}</h1>)
      }
      <About para={car}/>
    </>
  );
}

export default App;
