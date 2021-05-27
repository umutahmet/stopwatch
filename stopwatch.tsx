import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) => Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}
interface StopwatchState {
  secondsElapsed: number;
  lastClearedIncrementer: number | undefined;
  laps: number[];
}
interface LapProps {
  index: number,
  lap: number,
  onDelete: () => void
}

const Lap = ({index, lap, onDelete}: LapProps) => (
  <div className="stopwatch-lap">
    <strong>{index}</strong>/ {formattedSeconds(lap)}{" "}
    <button onClick={onDelete}> X </button>
  </div>
);
class Stopwatch extends Component<StopwatchProps, StopwatchState> {
  incrementer: number | undefined;
  
  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: undefined,
      laps: [],
    };
  }
  
  handleStartClick = (): void => {
    this.incrementer = window.setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1,
        }),
      1000
    );
  }
  
  handleStopClick = (): void => {
    this.resetIncrementer()
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  }
  
  handleResetClick = (): void => {
    this.resetIncrementer()
    this.setState({
      secondsElapsed: 0,
      laps: []
    });
  }
  
  handleLapClick = (): void => {
    this.setState((state) => ({
      laps: [...state.laps, state.secondsElapsed]
    }));
  }
  
  handleDeleteClick = (index: number) => {
    return () => {
      this.setState((state) => ({
          laps: state.laps.filter((lap, i) => i !== index)
      }));
    }
  }
  
  resetIncrementer = (): void => {
    clearInterval(this.incrementer);
  }
  
  componentWillUnmount(): void {
    this.resetIncrementer()
  }
  
  render() {
    const { secondsElapsed, lastClearedIncrementer, laps } = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type="button" onClick={this.handleLapClick}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type="button" onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}
        <div className="stopwatch-laps">
          {laps && laps.map((lap, i) => (
              <Lap
                key={i}
                index={i + 1}
                lap={lap}
                onDelete={this.handleDeleteClick(i)}
              />
            ))}
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Stopwatch initialSeconds={0} />,
  document.getElementById("root")
);
