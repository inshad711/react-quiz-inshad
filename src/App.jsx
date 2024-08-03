
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Question from "./Components/Question";
import Score from "./Components/Score";
import qBank from './Components/QuestionBank';
import "./App.css";
// import qBank from "./Components/QuestionBank";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: qBank,
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      quizEnd: false,
    };
  }

  handleOptionChange = (e) => {
    this.setState({selectedOption: e.target.value});
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
    this.handleNextQuestion();
  };

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption, score} = this.state;
    if (selectedOption === questionBank[currentQuestion].answer) {
      this.setState((prevState) => ({score: prevState.score + 1 }));
    }
  };

  handleNextQuestion = () => {
    const { questionBank, currentQuestion } = this.state;
    if (currentQuestion + 1 <questionBank.length ) {
      this.setState((prevState)=> ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    }else {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render(){
    const { quizEnd, questionBank, currentQuestion, selectedOption, score } = this.state;

    return(
      <div className='centered-container'>
        <h1 className='content'><span>INSHAD</span> QUIZ APP</h1>
        <div className='zero'>
        {!quizEnd ? (
          <Question
              question={questionBank[currentQuestion]}
              selectedOption={selectedOption}
              onOptionChange={this.handleOptionChange}
              onSubmit={this.handleFormSubmit}
            />     
        ):(
          <Score 
            score={score}
            onNextQuestion={this.handleNextQuestion}
            className="score"
            />
        )}
        </div>
      </div>
    )
  }
}
export default App;

