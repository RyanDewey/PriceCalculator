import './App.css'
import { useState } from 'react'

function App() {
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().
    getTimezoneOffset() * 60_000
  )
   .toISOString()
   .slice(0, 16);
  
  const [dateOne, setDateOne] = useState(dateTimeLocalNow);
  const [dateTwo, setDateTwo] = useState(dateTimeLocalNow);
  const [price, setPrice] = useState(0);


  const handleSubmit = (event) => {
    event.preventDefault();

    const start = new Date(dateOne);
    const end = new Date(dateTwo);

    const diffMs = end - start;

    if (diffMs < 0) {
      console.log("End date is before start date.");
      return;
    }

    const totalHours = diffMs / (1000 * 60 * 60); // milliseconds to hours
    const days = Math.floor(totalHours / 24);
    const hours = Math.round(totalHours % 24);

    console.log(`Date One: ${dateOne}, Date Two: ${dateTwo}`);
    console.log(`Total duration: ${days} days and ${hours} hours`);

    setPrice(days * 60);

  }
  

  return (
    <>
      <div className="text-[50px] text-center">Lisa's Doggy Daycare Price Calculator</div>
      <form onSubmit={handleSubmit} className="text-center space-x-16 m-10">
        <div className='text-[30px] m-5'>Enter the dates of the stay:</div>
        <div className='text-center space-x-16 m-10'>
          <input
            type="datetime-local"
            className="rounded-md border border-gray-300 p-2"
            value={dateOne}
            min={dateTimeLocalNow}
            onChange={(e) => setDateOne(e.target.value)}
          />
          <input
            type="datetime-local"
            className="rounded-md border border-gray-300 p-2"
            value={dateTwo}
            min={dateTimeLocalNow}
            onChange={(e) => setDateTwo(e.target.value)}
          />
        </div>
          
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-5'>Submit</button>
      </form>

      <div className='text-center text-[20px]'>Total Price: {price}</div>
      
    </>
  )
}

export default App
