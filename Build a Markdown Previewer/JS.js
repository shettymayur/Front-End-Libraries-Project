console.clear();

let Title = React.createClass({
  render: function() {
    let titleClass = 'heading-text-one';
    let codedByClass = 'heading-text-two';
    return (
      <div>
        <h1 className={titleClass}>{this.props.title}</h1>
      </div>
    )
  }
});
ReactDOM.render(
  <Title title='Markdown Previewer'/>,
  document.getElementById('title')
);

let Tips = React.createClass({
  propTypes: {
    tipArr: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      counter: 0
    }
  },
  _incrementCounter: function() {
    if (this.state.counter >= this.props.tipArr.length - 1) {
      this.setState({counter: 0});
    } else {
      this.setState({counter: this.state.counter + 1});
    }
  },
  componentDidMount: function() {
    let myInterval = setInterval(this._incrementCounter, 10000);
    this.setState({myInterval: myInterval});
  },
  render: function() {
    let classes = 'heading-text-one';
    return (
      <div>
        <h5 className={classes} dangerouslySetInnerHTML={{__html:this.props.tipArr[this.state.counter]}}></h5>
      </div>
    )
  }  
});

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

let MarkdownOutput = React.createClass({
  render: function() {
    return (
    <div>
      <h4>Markdown Output</h4>
      <hr></hr>
      <div dangerouslySetInnerHTML={{__html: marked(this.props.value)}}></div>
    </div>
    )
  }
});
let MarkdownContainer = React.createClass({
  getInitialState: function() {
    return {
      value: '## This is some markdown\n### Consider making your own\n\n#### List items\n- George\n- Paul\n- Ringo\n- John\n\n#### Make it **bold** or make it *italic*\n\n#### Create links [Github](https://github.com)'
    }
  },
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    console.log(marked(this.state.value));
    let containerClass = 'rounded-corners container-class col-xs-12 col-md-6';
    return(
      <div>
        <div className={containerClass}>
          <h4>Markdown Input</h4>
          <hr></hr>
          <textarea className="markdown-text" onChange={this.handleChange} value={this.state.value}/>
          <hr></hr>
          <Tips className='text-center' tipArr={[
            "Use # before text to create an h1.",
            "Use ** ** or __ __ to make text <b>bold</b>.",
            "Use ## before text to create an h2.",
            "Use * * or _ _ to make text <i>italic</i>.",
            "Denote sections of code with ``` ```."
          ]}/>
        </div>
        <div className={containerClass}>
          <MarkdownOutput value={this.state.value}/>
        </div>
      </div>
    )
  }
});
ReactDOM.render(
  <MarkdownContainer />,
  document.getElementById('markdown-container')
);
