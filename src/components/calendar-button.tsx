'use client'

import { AddToCalendarButton } from 'add-to-calendar-button-react';
import './calendar-button.scss'
import { useEffect, useRef } from "react";


export const CalendarButton = () => {

  const ref = useRef<HTMLElement>(undefined);
  useEffect(() => {
    if(ref.current !== null) {
      const button = document.getElementsByTagName("add-to-calendar-button")[0];
      const style = document.createElement( 'style' )
      style.innerHTML = `#atcb-reference {
        display: none;
      }.atcb-button {
        font-size:24px;
      }
        .atcb-button .atcb-icon {
        margin-right: 10px;
        }
        .atcb-button .atcb-icon-trigger::after {
        font-size: 24px;}`;
      button.shadowRoot?.appendChild( style );
    }
  })
  return (
    <div className="flex justify-center relative">
    <AddToCalendarButton
  name="Fiesta Ed y Flo"
  description="Play with me!"
  startDate="2025-04-11"
  startTime="18:30"
  endDate="2025-04-12"
  endTime="04:00"
  timeZone="America/Buenos_Aires"
  location="Hurlingham Club, Hurlingham, Buenos Aires, Argentina"
  options="'Apple','Google','Outlook.com'"
  listStyle="overlay"
  trigger="click"
  label="Agendar"
  hideCheckmark={true}
  hideBackground={true}
  buttonStyle="text"
></AddToCalendarButton>
    </div>
    )
}