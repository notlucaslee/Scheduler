import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

const formatSpots = (num) => {return !num ? "no spots remaining" : num === 1 ? "1 spot remaining" : `${num} spots remaining`};

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots
  })
  return (
    <li className={dayClass} onClick={() => {props.setDay(props.name)
    console.log(props.name)}}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}