import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  })
}

const addSuperHero = hero => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  // return useMutation(addSuperHero)
  return useMutation(addSuperHero, {
    onSuccess: data => {
     queryClient.invalidateQueries('super-heroes')
}})

}
