/*
React.useState() or useState
returns an array [undefined, f()]
With array destructuring we can extract the values
and set it to a variable of any name we need
If this was object destructuring we would have
to use the property name of the object that comes back
The f() allows us to make changes to the 1st variable
the convention is to name it set...

*/
/**
     * Note: if you ever need the old value of state
     * to help you determine the new value of state,
     * you should pass a callback function to your
     * state setter function instead of using
     * state directly. This callback function will
     * receive the old value of state as its parameter,
     * which you can then use to determine your new
     * value of state.
 function add() {
     setCount(prevCount => prevCount + 1)
    }
*/

import memesData from "../memesData"
import React from "react"
const Meme = () => {

    // Initialize state for our memes object
    // this object is the meme created on display
    const [memeImg, setImg] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })


    // Intiatlize state for our allMemes object
    // the object contains api data for all memes
    const [allMemes, setAllMemes] = React.useState("")

    //  useEffect handles things outside of React's control
    //  ex APIs, databases, localeStorage, 
    React.useEffect(() => {
        console.log("Effect ran")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    // Whenever something happens in the inputs
    // We will set a new state with the values inputted
    function handleChange(event) {
        const { name, value } = event.target
        setImg(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    function getMemeImage() {
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setImg(prevMeme => {
            return {
                ...prevMeme,
                randomImg: url
            }
        })
    }



    return (
        <div className="form">
            <div className="form__input-container">
                <input
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={memeImg.topText}
                    onChange={handleChange}
                    maxLength="19"
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={memeImg.bottomText}
                    onChange={handleChange}
                    maxLength="20"
                />
            </div>
            <button onClick={getMemeImage}>Get a new meme image  🖼</button>
            {
                memeImg.randomImg &&
                <div className="meme">
                    <img className="meme--img" src={memeImg.randomImg} alt="meme" />
                    <h1 className="meme--text top">{memeImg.topText}</h1>
                    <h1 className="meme--text bottom">{memeImg.bottomText}</h1>
                </div>
            }
        </div>
    )
}

export default Meme;