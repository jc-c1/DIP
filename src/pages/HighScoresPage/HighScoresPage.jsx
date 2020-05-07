import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HighScoresPage.module.css";
import scoresService from "../../utils/scoresService";



class HighScoresPage extends Component {
 

  async componentDidMount() {
    const scores = await scoresService.index();
    this.props.handleUpdateScores(scores);
  }
  
  handleClick = (eventId, status) => {
    const body = {
      eventId,
      status
    };
    return () => scoresService.update(body)
  };




  render() {
    const scoreRows = this.props.scores.map((score, idx) => (
      <tr key={idx}>
        <td>
          <span className="badge">{idx + 1}</span>
        </td>
        <td>{score.initials}</td>
        <td>{score.numGuesses}</td>
        
        <td>
              <button className="btn btn-default" onClick={this.handleClick(score._id, "Dip")}>Dip</button>
              <button className="btn btn-default" onClick={this.handleClick(score._id, "Chip")}>Chip</button>
              <button className="btn btn-default" onClick={this.handleClick(score._id, "Salsa")}>Salsa</button>
        </td>
      </tr>
    ));

    return (
      <div className={styles.HighScores}>
        <header className="header-footer">High Scores</header>
        {this.props.scores.length ? (
          <table className={`${styles.table} table text-info`}>
            
            <tbody>{scoreRows}</tbody>
          </table>
        ) : (
          <h4 className="text-info">No High Scores Yet</h4>
        )}
        <div>
          <Link className={`${styles.cancel} btn btn-default btn-sm`} to="/">
            Back to Game
          </Link>
        </div>
      </div>
    );
  }
}

export default HighScoresPage;
