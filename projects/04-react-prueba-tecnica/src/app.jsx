import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
// const CAT_IMAGE_WITH_FIRST_WORD = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`;

export default function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
        
    useEffect(() => {
      fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            setFact(fact) 
        }) 
    }, [])  

    useEffect(() => {
      if(!fact) return

      const threeFirstWords = fact.split(' ', 3).join(' ') 

      fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response => {
          const { url } = response 
          setImageUrl(url)
          console.log(url);
        })
    },[fact])

    return(
        <main> 
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Image extracted using the first trhee words for ${fact}`} />}
            </section>
        </main>
    )
}

