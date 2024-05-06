import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipe = () => {
  const APP_ID = '7381e9f0';
  const APP_KEY = '4e05a33447b6e58fea2ea9b49cd9deea';
  const query = 'apple';

  const [loading,setLoading] = useState(true);
  const [recipe,setRecipe] = useState([]);

  const [typing,setTyping] = useState('');

  const [clicked,setClicked] = useState(true);
  const [display,setDisplay] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const searchRecipes = async (query) => {
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      setRecipe(response.data.hits);
      console.log(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching recipes:', error);
      setLoading(false);
    }
  }

  function changeQuery(query) {
    setTyping(query);
    searchRecipes(query);
  }

  useEffect(() => {
    searchRecipes(query);
  }, []);

  function skip(index) {
    setClicked(!clicked);
    setDisplay(!display);
    setSelectedIndex(index === selectedIndex ? null : index);
  }

  return (
    <>
      <section>
        <div className='search'>
          <input type='text' onChange={(e) => setTyping(e.target.value)} placeholder='Search for a recipe...' value={typing} />
          <button className='knopka' type='submit' onClick={() => changeQuery(typing)}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        {loading ? (
          <div className='loading'>Loading...</div>
        ) : (
          recipe.map((c, index) => {
            return (
              <>
                <div className="cuisine" key={c.recipe.label} onClick={() => skip(index)}>
                  <img src={c.recipe.image} alt="" />
                  <h1>{c.recipe.label}</h1>
                  <p>{Math.round(c.recipe.calories)} calories</p>
                  <p>Cuisine type:{c.recipe.cuisineType}</p>
                </div>
                <div className="container" onClick={() => skip(index)} style={{ display: selectedIndex === index ? 'flex' : 'none' }}>
                  <div className="cross">
                    <i class="fa fa-times fa-3x" aria-hidden="true"></i>
                  </div>

                  <img src={c.recipe.image} alt="" />
                  <div className="information">
                    <div className='infoo'>{c.recipe.label}</div>
                    <div className='infoo'>Calories:{Math.round(c.recipe.calories)}</div>
                    <div className='infoo'>Digest:
                      <ul>
                        <li>Fat:{Math.round(c.recipe.digest[0].total)/10}%</li>
                        <li>Carbs:{Math.round(c.recipe.digest[1].total)/10}%</li>
                        <li>Protein:{Math.round(c.recipe.digest[2].total)/10}%</li>
                      </ul>
                    </div>
                    <div className='infoo'>Ingredients:
                      {
                        c.recipe.ingredients.map((ingredient, index) => {
                          return (
                            <ul key={index}>
                              <li>{ingredient.text}</li>
                            </ul>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </>
            )
          })
        )}
      </section>
    </>
  )
}

export default Recipe;
