// import { useState } from 'react'
// import {
//   useAddSuperHeroData,
//   useSuperHeroesData
// } from '../hooks/useSuperHeroesData'
// import { Link } from 'react-router-dom'

// export const RQSuperHeroesPage = () => {
//   const [name, setName] = useState('')
//   const [alterEgo, setAlterEgo] = useState('')

//   const onSuccess = data => {
//     console.log({ data })
//   }

//   const onError = error => {
//     console.log({ error })
//   }

//   const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
//     onSuccess,
//     onError
//   )

//   const { mutate: addHero } = useAddSuperHeroData()

//   const handleAddHeroClick = () => {
//     const hero = { name, alterEgo }
//     addHero(hero)
//   }

//   if (isLoading) {
//     return <h2>Loading...</h2>
//   }

//   if (isError) {
//     return <h2>{error.message}</h2>
//   }

//   return (
//     <>
//       <h2>React Query Super Heroes Page</h2>
//       <div>
//         <input
//           type='text'
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//         <input
//           type='text'
//           value={alterEgo}
//           onChange={e => setAlterEgo(e.target.value)}
//         />
//         <button onClick={handleAddHeroClick}>Add Hero</button>
//       </div>
//       <button onClick={refetch}>Fetch heroes</button>
//       {data?.data.map(hero => {
//         return (
//           <div key={hero.id}>
//             <Link to={`/rq-super-heroes/${hero.id}`}>
//               {hero.id} {hero.name}
//             </Link>
//           </div>
//         )
//       })}
//       {/* {data.map(heroName => {
//         return <div key={heroName}>{heroName}</div>
//       })} */}
//     </>
//   )
// }


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
      // cacheTime:5000 //to change cache time
      staleTime:50000
      // refetchOnMount: true ,// refetch on component mount when data is stale values : true | false | always
      // refetchOnWindowFocus: true, // refetch on window focus when data is stale values : true | false | always
      // refetchInterval:1000, // Polling: refetching data at regular interval when window is foused
      // refetchIntervalInBackground: false // refetch data even then window is not focused
      // enabled: true // if false query will not run on component mount: now we can use refetch func onClick handler to fetch on click event
      // onSuccess: (data) => console.log('sucessfully fetched data', data), //code to be executed on success
      // onError:(data) => console.log('Some error occured'), //code to be executed error
      // select:(data) => data?.data?.filter(d => d.name !== 'Batman') 
    }
    )
  console.log(data, 'data', isError, error)
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
    </>
  )
}




{/* data?.map(d => {
            return(
              <div key={d.id}>{d.name}</div>
            )
          }) */} //use when showing select cb


