import './App.css';
import {useState,useEffect} from 'react'
import {Card, CardContent, FormControl, Menu, MenuItem, Select} from '@material-ui/core'
import InfoBox from './Components/InfoBox';
import Table from './Components/Table';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import {sortData,prettyPrintStat} from './Components/util'
import LineGraph from './Components/LineGraph';
import Map from './Components/Map';
import "leaflet/dist/leaflet.css"
import numeral from'numeral'

function App() {

  const [countries, setcountries] = useState([]);
  const [Country, setCountry] = useState('worldwide');
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setmapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setzoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([])
  const [casesType, setcasesType] = useState('cases');

  //https://disease.sh/v3/covid-19/all

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const onCountryChange=async(e)=>{
     const countryCode=e.target.value;

     const url= countryCode==='worldwide'? 'https://disease.sh/v3/covid-19/all'
                                         :`https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
     .then(res=>res.json())
     .then(data=>{
         console.log("data :",data)
         setCountry(countryCode)
         setcountryInfo(data);
         setmapCenter({lat:data.countryInfo.lat,long:data.countryInfo.long})
         console.log("map center updated successfully")
         console.log("mapCenter",mapCenter)
         setzoom(4)
     })
  }

  useEffect(()=>{
    console.log("casesType :",casesType);

    fetch('https://disease.sh/v3/covid-19/all')
    .then(res=>res.json())
    .then(data=>{
      setcountryInfo(data)
    })
  },[])
  
  useEffect(()=>{
      const getCountriesData=async()=>{ 
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res)=>res.json())
        .then((data)=>{
          const countries=data.map((country)=>({
              name:country.country,
              value:country.countryInfo.iso2
          }));
          const sortedData=sortData(data);
          settableData(sortedData)
          setmapCountries(data);
          setcountries(countries);
        })
      }
      getCountriesData();
      
  },[]);

  const classes = useStyles();

  return (
    <div className="App">
      <div className="app_left">
          <div className="App_header">
               
                <h1>Covid 19 Tracker</h1>
                <FormControl> 
                  <Select variant="outlined" value={Country} onClick={onCountryChange}>
                    <MenuItem value="worldwide">WorldWide</MenuItem>
                      {
                        countries.map((country)=>(
                          <MenuItem   value={country.value}>{country.name}</MenuItem>
                        ))
                      }               
                  </Select>
                </FormControl> 
        
          </div> 
          <div className="app_stats">
          <InfoBox
            active={casesType === "cases"}
            onClick={(e) => setcasesType("cases")}
            title="Coronavirus Cases"
            isRed
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setcasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setcasesType("deaths")}
            title="Deaths"
            isRed
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
          </div>
          
          <Map 
              casesType={casesType} 
              countries={mapCountries} 
              center={mapCenter} 
              zoom={zoom} 
          />
          
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} /> 
          {/* <h3>WorldWide new cases</h3>
          <LineGraph /> */}
        </CardContent>
      </Card>
      
    </div>

  );
}

export default App;
