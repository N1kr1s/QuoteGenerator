// selecting elements
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// state
let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Show single quote

const newQuote = () => {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   checking for quote.author===null
  quote.author
    ? (authorText.innerText = quote.author)
    : (authorText.innerText = "Unknown");

  // Check quote length=> if long change style by adding css class
  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // set quote,Hide loader
  quoteText.innerText = quote.text;
  hideLoadingSpinner();
};

// Quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const responce = await axios.get(apiUrl);
    apiQuotes = responce.data;
    newQuote();
  } catch (error) {
    console.log(error);
  }
};

// tweetQuote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl);
};

// event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
