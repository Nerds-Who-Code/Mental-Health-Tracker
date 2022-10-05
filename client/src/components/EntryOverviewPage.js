import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {fetchEntries} from "../store";
import Chart from "chart.js/auto";
import {Bar, Pie} from "react-chartjs-2";
import ErrorBoundary from './ErrorBoundary';
import NavBtnDefault from "./NavBtnDefault";

export default function EntryOverviewPage() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.userData.userInfo.username);
  const entryDataGlobalState = useSelector(state => state.entryData);

  //Get all the user's entries when this component mounts.
  useEffect( () => {
      dispatch(fetchEntries(username));
  }, []);

  // Insert an H3 if the data is still loading.
  let loadingState = null;
  if (entryDataGlobalState.status === 'pending') {
      loadingState = (<h3>Loading...</h3>);
  }
  // Insert an H3 if the data fetching has failed
  let failedState = null;
  if (entryDataGlobalState.status === 'failed') {
      loadingState = (<h3>Something went wrong.</h3>);
  }

  // This is displayed when the user has not added any entries yet.
  let noEntries = null;
  if (entryDataGlobalState.entryInfo.length === 0) {
      noEntries = (
          <React.Fragment>
          <h3>You have not added any entries yet...</h3>
          <NavBtnDefault link="/add-entry" btnText="Add new entry" />
          </React.Fragment>);
  }

  const entryToChartData = {
    //This maps the dates of all entries to the timelines/dates on the chart
    dates: entryDataGlobalState.entryInfo.map( (entry) => entry.date),
    levels: {
      stress: Array(entryDataGlobalState.entryInfo.length).fill(0),
      anxiety: Array(entryDataGlobalState.entryInfo.length).fill(0),
      depression: Array(entryDataGlobalState.entryInfo.length).fill(0)
    },
    //The counter or number of types of entries there are per type.
    typeCounts: {
      stress: 0, 
      anxiety: 0, 
      depression: 0
    },
    //The counter or number of events there are per type.
    eventCounts: {
      family: 0,
      relationship: 0, 
      work: 0,
      significant: 0,
      trauma: 0,
      unknown: 0
    }
  };

  //The filter function removes duplicate dates (CAUSE WRONG DATA TO DISPLAY)
  //entryDates = entryDates.filter( (date, index) => entryDates.indexOf(date) === index);

  //Map entries to chart data
  (() => {
    for (let i = 0; i < entryDataGlobalState.entryInfo.length; i++) {
      switch (entryDataGlobalState.entryInfo[i].type.toLowerCase()) {
        case "anxiety":
          //Map the levels of each type into an array
          entryToChartData.levels.anxiety[i] = parseInt(entryDataGlobalState.entryInfo[i].level, 10);
          //Increase the count by 1 for each type found.
          entryToChartData.typeCounts.anxiety += 1;
          break;
        
        case "stress":
          entryToChartData.levels.stress[i] = parseInt(entryDataGlobalState.entryInfo[i].level, 10);
          entryToChartData.typeCounts.stress += 1;
          break;
        
        case "depression":
          entryToChartData.levels.depression[i] = parseInt(entryDataGlobalState.entryInfo[i].level, 10);
          entryToChartData.typeCounts.depression += 1;
          break;
        
        default:
          break;
      }

      for (let j = 0; j < entryDataGlobalState.entryInfo[i].event.length; j++) {
        //Get the counts of each event
        switch (entryDataGlobalState.entryInfo[i].event[j]) {
          case "family":
            //Increase the count by 1 for each type found.
            entryToChartData.eventCounts.family += 1;
            break;
          
          case "relationship":
            entryToChartData.eventCounts.relationship += 1;
            break;
          
          case "work":
            entryToChartData.eventCounts.work += 1;
            break;

          case "significant":
            entryToChartData.eventCounts.significant += 1;
            break;

          case "trauma":
            entryToChartData.eventCounts.trauma += 1;
            break;

          case "unknown":
            entryToChartData.eventCounts.unknown += 1;
            break;
          
          default:
            break;
        }
    }
    }
  })();

    //The bar chart data that displays in the bar chart
    const barChartLevelsData = {
      labels: entryToChartData.dates,
      datasets: [
        {
          label: "Stress",
          backgroundColor: "rgb(255,255,0)", //YELLOW
          borderColor: "rgb(255,255,0)",
          data: entryToChartData.levels.stress
        },
        {
          label: "Anxiety",
          backgroundColor: "rgb(255,0,0)", //RED
          borderColor: "rgb(255,0,0)",
          data: entryToChartData.levels.anxiety
        },
        {
          label: "Depression",
          backgroundColor: "rgb(0,0,255)", //BLUE
          borderColor: "rgb(0,0,255)",
          data: entryToChartData.levels.depression
        },
      ],
    };

    //The pie chart event data that displays in the pie chart
    const pieChartTypeData = {
      labels: ["Stress", "Anxiety", "Depression"],
      datasets: [
        {
          backgroundColor: ["rgb(255,255,0)", "rgb(255,0,0)", "rgb(0,0,255)"], //YELLOW, RED, BLUE
          borderColor: "rgb(0,0,0)", //BLACK
          data: [entryToChartData.typeCounts.stress, entryToChartData.typeCounts.anxiety, entryToChartData.typeCounts.depression]
        }
      ],
    };

    //The pie chart event data that displays in the pie chart
    const pieChartEventData = {
      labels: ["family", "relationship", "work", "significant", "trauma", "unknown"],
      datasets: [
        {
          backgroundColor: ["rgb(0,255,0)", "rgb(255,0,0)", "rgb(255,255,0)", "rgb(255,0,255)", "rgb(0,0,255)", "rgb(128,0,0)"], //GREEN, RED, YELLOW, PINK, BLUE, MAROON
          borderColor: "rgb(0,0,0)", //BLACK
          data: [entryToChartData.eventCounts.family,
                 entryToChartData.eventCounts.relationship,
                 entryToChartData.eventCounts.work,
                 entryToChartData.eventCounts.significant,
                 entryToChartData.eventCounts.trauma,
                 entryToChartData.eventCounts.unknown]
        }
      ],
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <h1
                  className='m-2'>
                  Your Mental Health Overview
                </h1>
                <NavBtnDefault link="/dashboard" btnText="Go back to dashboard" />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h2 
                className='m-2'>
                Your mental health levels per day.
              </h2>
              <ErrorBoundary>
                <Bar data={barChartLevelsData} />
              </ErrorBoundary>
              <h2 
                className='m-2'>
                What types of mental health affect you the most.
              </h2>
              <ErrorBoundary>
                <Pie data={pieChartTypeData} />
              </ErrorBoundary>
              <h2 
                className='m-2'>
                Which events have affected you the most.
              </h2>
              <ErrorBoundary>
                <Pie data={pieChartEventData} />
              </ErrorBoundary>
            </div>
        </div>
    );
}
