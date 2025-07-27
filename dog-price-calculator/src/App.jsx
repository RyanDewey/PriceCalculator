import './App.css'
import { useState, useRef, useEffect } from 'react'

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
  const [errorMsg, setErrorMsg] = useState('');
  const [numDays, setNumDays] = useState(0);
  const [numHours, setNumHours] = useState(0);
  const myElementRef = useRef(null);

  useEffect(() => {
    if (price !== 0 && myElementRef.current) {
      myElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [price]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const start = new Date(dateOne);
    const end = new Date(dateTwo);

    const diffMs = end - start;

    if (diffMs < 0) {
      console.log("End date is before start date.");
      setErrorMsg("The second date must come after the first, please try again.");
      setPrice(0);
      return;
    }

    const totalHours = diffMs / (1000 * 60 * 60); // milliseconds to hours
    const days = Math.floor(totalHours / 24);
    const hours = Math.round(totalHours % 24);

    setNumDays(days);
    setNumHours(hours);

    console.log(`Date One: ${dateOne}, Date Two: ${dateTwo}`);
    console.log(`Total duration: ${days} days and ${hours} hours`);

    const calculatedPrice = (hours > 5 ? 60 : 50) + (days * 70);

    setPrice(calculatedPrice);
    setErrorMsg("");
  }
  

  return (
    <>
      <div className="text-[50px] text-center mt-10">Doggy Daycare Price Calculator</div>
      <div className='flex justify-center items-center'>
        <div className='flex justify-center text-2xl m-5 p-2 text-left w-sm outline'>
          Pricing: <br></br>
          $70 for each 24 hour stay <br></br>
          $60 for stay longer than 5 hours <br></br>
          $50 for stay 5 hours or less
        </div>
      </div>
      

      <form onSubmit={handleSubmit} className="text-center space-x-16 m-5">
        <div className='text-[30px] m-5'>Enter the dates and times of the stay:</div>
        <div className='text-center space-x-16 m-5'>
          <input
            type="datetime-local"
            className="rounded-md border border-gray-300 p-2 m-5"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
          />
          <input
            type="datetime-local"
            className="rounded-md border border-gray-300 p-2"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
          />
        </div>
          
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-5'>Submit</button>
      </form>

      <div className='text-center text-2xl text-red-500'>{errorMsg}</div>
      <div className='text-center text-3xl' ref={myElementRef}>{price != 0 ? <div className="flex flex-row space-x-2 justify-center"><p>Total Price: </p><p className='font-bold'>${price}</p></div> : <p></p>}</div>
      
      {price != 0 && <div className='text-center text-2xl m-10'>
        <div className='text-2xl font-bold m-2'>Total Stay Time Breakdown</div>
        <div>Days: {numDays} = ${numDays * 70}</div>
        <div>Hours: {numHours} = ${numHours > 5 ? 60 : 50}</div>
        <div>Total: ${price}</div>
      </div>}
    </>
  )
}

export default App
