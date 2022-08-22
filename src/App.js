import React from "react";
import JokeList from "./JokeList";
import JokeListClass from './JokeListClass'

class App extends React.Component {
    render() {
  return (
    <div className="App">
      {/* <JokeList /> */}
      <JokeListClass/>
    </div>
  );
  }
}

export default App;
