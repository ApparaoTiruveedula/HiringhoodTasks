// hooks/useJobs.ts
import { useEffect, useState } from 'react';
import API from '../services/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        const jobsArray = res.data;
        const jobsMap: Record<string, Job> = {};
        jobsArray.forEach((job: Job) => {
          jobsMap[job._id] = job;
        });
        setJobs(jobsMap);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading };
};
