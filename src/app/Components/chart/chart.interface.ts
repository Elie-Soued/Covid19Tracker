interface initialRawDataGermany {
  cases: number;
  deaths: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
    weekIncidence: number;
  };
  r: {
    value: number;
    rValue4Days: {
      value: number;
      date: string;
    };
    rValue7Days: {
      value: number;
      date: string;
    };
    lastUpdate: string;
  };
  hospitalization: {
    cases7Days: number;
    incidence7Days: number;
    date: string;
    lastUpdate: string;
  };
  meta: {
    source: string;
    contact: string;
    info: string;
    lastUpdate: string;
    lastCheckedForUpdate: string;
  };
}

interface rawDataPerState {
  data: {
    [stateCode: string]: stateCovidStats;
  };
  meta: {
    source: string;
    contact: string;
    info: string;
    lastUpdate: string;
    lastCheckedForUpdate: string;
  };
}

interface stateCovidStats {
  id: number;
  name: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  abbreviation: string;
  weekIncidence: number;
  casesPer100k: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
    weekIncidence: number;
  };
  hospitalization: {
    cases7Days: number;
    incidence7Days: number;
    date: string;
    lastUpdate: string;
  };
}

interface formattedData {
  labels: string[];
  datasets: number[][];
}

interface stateData {
  [stateCode: string]: {
    name: string;
    data: formattedData;
  };
}

export {
  initialRawDataGermany,
  rawDataPerState,
  stateCovidStats,
  formattedData,
  stateData,
};
