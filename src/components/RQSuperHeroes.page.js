import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'



export const RQSuperHeroesPage = () => {
  const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime:50000, //to change cache time
      // staleTime:5000,
      // refetchOnMount: true ,// refetch on component mount when data is stale values : true | false | always
      // refetchOnWindowFocus: false, // refetch on window focus when data is stale values : true | false | always
      // refetchInterval:1000, // Polling: refetching data at regular interval when window is foused
      // refetchIntervalInBackground: false // refetch data even then window is not focused
      // enabled: false // if false query will not run on component mount: now we can use refetch func onClick handler to fetch on click event
      // onSuccess: (data) => console.log('sucessfully fetched data', data), //code to be executed on success
      // onError:(data) => console.log('Some error occured'), //code to be executed error
      // select:(data) => data?.data?.filter(d => d.name !== 'Batman') 
    }
    )
  console.log(isLoading,isFetching, 'data', isError, error)
  return (
    <>
      {
        isLoading
          ?
          <div>Loading ...</div>
          :
          isError
          ?
          <div>{error.message}</div>
          :
          isFetching
          ?
          <div>Fetching ...</div>
          :
          <div>{
            data?.data?.map(d => {
            return(
              <div key={d.id}>{d.name}</div>
            )
          })
          
          }
          </div>
      }
      {/* <button onClick={refetch}>fetch</button> */}
    </>
  )
}




{/* data?.map(d => {
            return(
              <div key={d.id}>{d.name}</div>
            )
          }) */} //use when showing select cb


