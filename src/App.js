import React, {useState, useEffect} from 'react';
import './App.css';

let quotesURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {

  const [quote, setQuote] = useState('Get a quote!');
  const [author, setAuthor] = useState('');
  const [quotesArr, setQuotesArr] = useState(null);

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArr(parsedJSON.quotes);    
  }

  useEffect(() => { 
    fetchQuotes(quotesURL);
  }, [quotesURL])

  const changeQuote = () => {
    let randomInt = Math.floor(quotesArr.length*Math.random());
    setQuote(quotesArr[randomInt].quote);
    setAuthor(quotesArr[randomInt].author);
  }

  return (
    <div className="App">      
      <div id='quote-box'>        
        <h2 id='text'>"{quote}"</h2>
        <p id='author'>-{author}-</p>
        <button id='new-quote'
                type='checkbox'
                onClick = {() => changeQuote()}>New quote
        </button>
        <a href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}-${author}`)}
           id='tweet-quote'
           target='_blank'>
           <i className="fab fa-twitter"></i>
        </a>
      </div>      
    </div>    
  );
}

export default App;
