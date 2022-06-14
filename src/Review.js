import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const url = "http://localhost:5000/users"

const Review = () => {
  const [people, setPeople] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchUrl = async() => {
      const response = await fetch(url)
      const newPeople = await response.json()
      setPeople(newPeople)
      setLoading(false)
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  if(loading) {
    return (
      <main>
        <section>
          <h2>loading...</h2>
        </section>
      </main>
    )
  }
  
  const {name, job, text, image} = people[index]

  const checkNumber = (number) => {
    let lastItem = people.length - 1
    if(number > lastItem) return 0
    if(number < 0) return lastItem
    return number
  }

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1
      return checkNumber(newIndex)
    })
  }

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1
      return checkNumber(newIndex)
    })
  }

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length)
    if(randomNumber === index) randomNumber = index + 1
    setIndex(checkNumber(randomNumber))
  }

  return (
    <article className='review'>
        <div className='img-container'>
          <img src={image} alt={name} className='person-img'/>
          <span className='quote-icon'>
            <FaQuoteRight />
          </span>
        </div>
        <h4 className='author'>{name}</h4>
        <p className='job'>{job}</p>
        <p className='info'>{text}</p>
        <div className='button-container'>
          <button className='prev-btn' onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className='next-btn' onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className='random-btn' onClick={randomPerson}>random review</button>
    </article>
  ) 
}

export default Review