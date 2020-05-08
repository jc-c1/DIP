import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./AllEventsPage.module.css";
import eventsService from "../../utils/eventsService";
import Moment from 'react-moment';


class AllEventsPage extends Component {
  async componentDidMount() {
    const events = await eventsService.index();
    this.props.handleUpdateEvents(events);
    console.log(this.props.events)
  }

  handleClick = (eventId, status) => {
    const body = {
      eventId,
      status,
    };
    return () => {
      eventsService.update(body).then((events) => {
        this.props.handleUpdateEvents(events);
      });
    };
  };

  render() {
    const eventRows = this.props.events.map((event, idx) => {
      
      const dateToFormat = event.dates

      const userEventStatus = event.guest.find(
        (i) => i.email == this.props.user.email
      ).status;
      
      const totalTallied = event.guest.reduce(
        (acc, cur)=> {
          if (cur.status == "Dip"){
            acc.Dip += 1
          }
          else if (cur.status == "Chip")
          {
            acc.Chip += 1
          }
          else {acc.Salsa += 1}

          return acc

        }, {"Dip":0, "Chip":0, "Salsa":0}
      )


      const dipstatus = () => {
        if (totalTallied.Dip > (event.guest.length/2)){
          return "red"
        }
        else if (totalTallied.Chip > (event.guest.length/2)){
          return "green"
        }
        else { return "yellow"}
      }

      const disableButton = () => {
        if (userEventStatus == "Dip") {
          return (
            <td>
              <button className="btn btn-default" disabled>
                Dip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Chip")}
              >
                Chip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Salsa")}
              >
                Salsa
              </button>
            </td>
          );
        } else if (userEventStatus == "Chip") {
          return (
            <td>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Dip")}
              >
                Dip
              </button>
              <button className="btn btn-default" disabled>
                Chip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Salsa")}
              >
                Salsa
              </button>
            </td>
          );
        } else if (userEventStatus == "Salsa") {
          return (
            <td>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Dip")}
              >
                Dip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Chip")}
              >
                Chip
              </button>
              <button className="btn btn-default" disabled>
                Salsa
              </button>
            </td>
          );
        } else {
          return (
            <td>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Dip")}
              >
                Dip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Chip")}
              >
                Chip
              </button>
              <button
                className="btn btn-default"
                onClick={this.handleClick(event._id, "Salsa")}
              >
                Salsa
              </button>
            </td>
          );
        }
      };

      return (
        <tr style={{"background-color":dipstatus()}}>
         <td><Moment format='MMM. DD, YYYY'>{dateToFormat}</Moment></td>
          <td><a href={event.eventInfos} target="_blank">{event.eventTitles}</a></td>
          
          <td>{event.comments}</td>
          <td>{disableButton()}</td>
        </tr>
      );
    });

    


    return (
      <div className={styles.allEvents}>
        <header className="header-footer">All Events <Link to='/Create'>+</Link></header>
        {this.props.events.length ? (
          <table className={`${styles.table} table text-info`}>
            <thead>
              <tr><th width={80}>Date</th><th width={130}>Event</th><th width={150}>Comment</th><th width={100}>Status</th></tr>
            </thead>
            <tbody>{eventRows}</tbody>
          </table>
        ) : (
          <h4 className="text-info">No Events Yet</h4>
        )}
        
      </div>
    );
  }
}

export default AllEventsPage;
