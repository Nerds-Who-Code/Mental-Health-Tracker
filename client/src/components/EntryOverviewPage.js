import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchEntries} from '../redux/entryDataSlice.js';
import Plot from 'react-plotly.js';
import ErrorBoundary from './ErrorBoundary';
import NavBtnDefault from "./NavBtnDefault";

/*
  PLOTLY DOCUMENTATION
  https://plotly.com/javascript/react/
  https://plotly.com/javascript/reference/layout/
  https://plotly.com/javascript/configuration-options/
  https://plotly.com/javascript/pie-charts/
*/

export default function EntryOverviewPage() {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.userData.userInfo.user_id);
  const entryDataGlobalState = useSelector(state => state.entryData);

  //Get all the user's entries when this component mounts.
  useEffect( () => {
      dispatch(fetchEntries(userID));
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
    dates: entryDataGlobalState.entryInfo.map( (entry) => entry.entry_date),
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
      switch (entryDataGlobalState.entryInfo[i].entry_type.toLowerCase()) {
        case "anxiety":
          //Map the levels of each type into an array
          entryToChartData.levels.anxiety[i] = parseInt(entryDataGlobalState.entryInfo[i].entry_level, 10);
          //Increase the count by 1 for each type found.
          entryToChartData.typeCounts.anxiety += 1;
          break;
        
        case "stress":
          entryToChartData.levels.stress[i] = parseInt(entryDataGlobalState.entryInfo[i].entry_level, 10);
          entryToChartData.typeCounts.stress += 1;
          break;
        
        case "depression":
          entryToChartData.levels.depression[i] = parseInt(entryDataGlobalState.entryInfo[i].entry_level, 10);
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

  //Plot settingss
  const plotLayout = {width: 1000, height: 500, title: ''};
  const plotConfig = {displaylogo: false};

    //The bar chart data that displays in the bar chart
    const barChartLevelsData = [
      {
        type: 'bar', 
        x: entryToChartData.dates, 
        y: entryToChartData.levels.stress,
        name: "Stress"
      },
      {
        type: 'bar', 
        x: entryToChartData.dates, 
        y: entryToChartData.levels.anxiety,
        name: "Anxiety"
      },
      {
        type: 'bar', 
        x: entryToChartData.dates, 
        y: entryToChartData.levels.depression,
        name: "Depression"
      },
      ];

    //The pie chart type data that displays in the pie chart
    const pieChartTypeData = [{
      type: "pie",
      values: [entryToChartData.typeCounts.stress, entryToChartData.typeCounts.anxiety, entryToChartData.typeCounts.depression],
      labels: ["Stress", "Anxiety", "Depression"]
    }];

    //The pie chart event data that displays in the pie chart
    const pieChartEventData = [{
      type: "pie",
      values: [entryToChartData.eventCounts.family,
              entryToChartData.eventCounts.relationship,
              entryToChartData.eventCounts.work,
              entryToChartData.eventCounts.significant,
              entryToChartData.eventCounts.trauma,
              entryToChartData.eventCounts.unknown
            ],
      labels: ["family", "relationship", "work", "significant", "trauma", "unknown"]
    }];

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
                <div className="plotContainer">
                  <Plot 
                    data={barChartLevelsData} 
                    layout={plotLayout}
                    config={plotConfig}
                  />
                </div>
              </ErrorBoundary>
              <h2 
                className='m-2'>
                What types of mental health affect you the most.
              </h2>
              <ErrorBoundary>
                <div className="plotContainer">
                  <Plot 
                    data={pieChartTypeData} 
                    layout={plotLayout}
                    config={plotConfig}
                  />
                </div>
              </ErrorBoundary>
              <h2 
                className='m-2'>
                Which events have affected you the most.
              </h2>
              <ErrorBoundary>
                <div className="plotContainer">
                  <Plot 
                    data={pieChartEventData} 
                    layout={plotLayout}
                    config={plotConfig}
                  />
                </div>
              </ErrorBoundary>
            </div>
        </div>
    );
}
