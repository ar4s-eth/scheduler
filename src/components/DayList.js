import React from "react";

import "components/DayListItem.scss";

export default function DayList(props) {
  const itemList = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
  return <ul>{itemList}</ul>;
}