import React, { Component } from "react";
import "../App.css";

export default class Root extends Component {
  state = {
    tasks: [
      { name: "Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "wip", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "blue" },
      { name: "Next", category: "wip", bgcolor: "red" },
      { name: "Node", category: "complete", bgcolor: "green" }
    ]
  };
  onDragOver = event => {
    event.preventDefault();
  };
  onDragStart = (event, id) => {
    console.log("dragstart", id);
    event.dataTransfer.setData("id", id);
  };
  onDrop = (event, category) => {
    let id = event.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter(task => {
      if (task.name === id) {
        task.category = category;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    });
  };
  render() {
    var tasks = {
      wip: [],
      complete: []
    };
    this.state.tasks.forEach(item => {
      tasks[item.category].push(
        <div
          draggable
          onDragStart={event => this.onDragStart(event, item.name)}
          key={item.name}
          className="draggable"
          style={{ backgroundColor: item.bgcolor }}
        >
          {item.name}
        </div>
      );
      console.log("TASKS:", tasks);
    });
    return (
      <div className="container-drag">
        <h2 className="header">DND</h2>
        <div
          className="wip"
          onDrop={event => this.onDrop(event, "wip")}
          onDragOver={event => this.onDragOver(event)}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => this.onDrop(event, "complete")}
        >
          <span className="task-header">Completed</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}
