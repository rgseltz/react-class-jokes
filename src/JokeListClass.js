import React from "react";
import axios from "axios";

class JokeListClass extends React.Component {
    static defaultProps = {numberOfJokesToGet : 10, sillyArray : ['joke1','joke2','joke3','joke4',]}
    constructor(props) {
        super(props);
        this.state = {jokes : []}
        this.generateNewJokes=this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);
        this.renderJokes = this.renderJokes.bind(this);
    }
    generateNewJokes() {
        this.setState({jokes : []})
    }
    
    componentDidMount() {
        if (this.state.jokes < this.props.numberOfJokesToGet) this.getJokes();
        console.log('Jokes ON MOUNT!')
    
    }

    componentDidUpdate() {
        if (this.state.jokes < this.props.numberOfJokesToGet) this.generateNewJokes();
        console.log('Updated');
        // if (this.state.jokes.length === this.props.numberOfJokesToGet){ 
        //     // this.renderJokes();
        //     this.setState({jokes : this.state.jokes})
        // }
    }

    renderJokes() {
        this.state.jokes.map(j => <p>{j.joke}</p>)
    }
    
    async  getJokes() {
        let jokes = this.state.jokes
        let seenJokes = new Set();
        let jokeVotes = {};
        while (jokes.length < this.props.numberOfJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
            });
            let {status, ...jokeObj } = res.data;
            if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            jokeVotes = jokeVotes[jokeObj.id] || 0;
            this.state.jokes.push({ ...jokeObj, votes : jokeVotes});
            // this.setState(({jokes: [...this.state.jokes.push({...jokeObj, votes : jokeVotes})]}))
            } else {
            console.error("duplicate found!");
            }
            console.log(jokes);
        }
        this.setState({jokes : this.state.jokes})
    }

    vote(id, delta) {
        this.setState(jokes => {jokes : jokes.votes.map(
            joke => joke.id === id ? {...joke, votes: joke.votes + delta} : joke)}   )
    }

    render()  {
        let jokes = this.state;
        let sillyArray = this.props.sillyArray;
        console.log(jokes)
        // let sortedJokes = jokes.sort((a,b) => b.votes - a.votes)
        // console.log(sortedJokes);
        return (
            <div className="JokeList">
              <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                Get New Jokes
              </button>
              {jokes.length === this.props.numberOfJokesToGet ? jokes.map(j => <p>{j.joke}</p>) : null}
              {/* {sillyArray.map(el => <p>{el}</p>)} */}
            </div>
        )
    }
}
export default JokeListClass;