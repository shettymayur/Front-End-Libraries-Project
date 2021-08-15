const quotes = [
  {
    quote: "Don't cry because it's over, smile because it happened.",
    author: "Dr. Seuss"
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West"
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    quote:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein"
  },
  { quote: "So many books, so little time.", author: "Frank Zappa" },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero"
  },
  {
    quote:
      "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    author: "J.K. Rowling"
  }
];

const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const Text = (props) => {
  return <div id="text">{props.text}</div>;
};

const Author = (props) => {
  return <span id="author">{props.text}</span>;
};

const Tweet = (props) => {
  return (
    <a
      id="tweet-quote"
      className="button"
      href={"https://www.twitter.com/intent/tweet".concat(props.tweet)}
      target="_blank"
    >
      <i className="fab fa-twitter" />
    </a>
  );
};

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log("Click happened in Button");
    this.props.handleClick();
  };

  render() {
    return (
      <button onClick={this.handleClick} type="button" id="new-quote">
        {this.props.children}
      </button>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: this.props.quote,
      author: this.props.author
    };
  }

  handleClick = () => {
    console.log("Click handled by QuoteBox");
    let index = getRandomInt(quotes.length);
    do {
      index = getRandomInt(quotes.length);
    } while (this.state.quote === quotes[index].quote);

    this.setState((prevState) => ({
      quote: quotes[index].quote,
      author: quotes[index].author
    }));
  };

  render() {
    return (
      <div id="quote-box">
        <blockquote>
          <Text text={this.state.quote} />
          <cite>
            <Author text={this.state.author} />
          </cite>
        </blockquote>

        <div id="action">
          <Tweet
            tweet={encodeURI(
              "?hashtags=quotes&related=freeCodeCamp&text="
                .concat(this.state.quote)
                .concat(" ")
                .concat(this.state.author)
            )}
          />
          <Button handleClick={this.handleClick}>New quote</Button>
        </div>
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QuoteBox
        quote="There is nothing better than a friend, unless it is a friend with chocolate."
        author="Linda Grayson"
      />
    );
  }
}

ReactDOM.render(<Quote />, document.getElementById("app"));
