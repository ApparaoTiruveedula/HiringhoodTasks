// JobsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const JobsContext = createContext<any>(null);

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] =useState([])

    useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get('/jobs');
      console.log(res.data)
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  console.log(jobs)

   

  return (
    <JobsContext.Provider value={jobs}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
