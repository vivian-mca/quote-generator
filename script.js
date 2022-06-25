const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// If true, show loading spinner. If false, hide loading spinner.
const showLoadingSpinner = (bool) => {
  if (bool) {
    loader.hidden = false;
    quoteContainer.hidden = true;
  } else {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};

// Get a quote from API
const getQuote = async () => {
  showLoadingSpinner(true);
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(`Whoops, something went wrong. Try again later.`);
    console.log(error);
  }
};

// Show new quote
const newQuote = () => {
  showLoadingSpinner(true);

  // Pick a random quote from apiQuotes array
  const randIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randIndex];

  // Check if author field is 'null' (blank) & replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // If quote is longer than 120 characters, make font size smaller
  if (quote.text.length > 120) {
    quoteText.setAttribute("data-state", "long");
  } else {
    quoteText.removeAttribute("data-state", "long");
  }

  // Set quote & hide loader
  quoteText.textContent = quote.text;
  showLoadingSpinner(false);
};

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  // Opens twitter page in new tab
  window.open(twitterUrl, "_blank");
};

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load, run getQuotes()
getQuote();
