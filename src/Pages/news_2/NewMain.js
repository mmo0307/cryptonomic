import React, {useState,useEffect} from 'react'
import axios from 'axios';

import NewsItem from '../../Component/News_2/NewsItem';

const NewMain = () => { // Add view attr tags with response

const options = {
    method: 'GET',
    url: 'https://crypto-pulse.p.rapidapi.com/news',
    headers: {
        'X-RapidAPI-Key': '6f8c939be8msh5443d26a510b91ep16bc80jsn4f1490900ae7',
        'X-RapidAPI-Host': 'crypto-pulse.p.rapidapi.com'
    }
};

const [data, setData] = useState([]);

useEffect(() => {
    axios.request(options).then(function (response) {
        setData(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}, []);

  return (
    <div>
        {data.length === 0 ? null :
                data.map((el) => {
                    return(
                        <NewsItem data={el}/>
                    )
                })
        }
    </div>
  )
}

export default NewMain;
