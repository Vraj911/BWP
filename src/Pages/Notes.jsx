import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import data from "../assets/Notes.json";
import Feedcomponent from '../Components/Feedcomponent'; 

function Notes() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const permData = data;

  useEffect(() => {
    setList(data);
  }, []);

  useEffect(() => {
    const val = search.toUpperCase();
    const filteredList = permData.filter((item) =>
      item.name.toUpperCase().includes(val)
    );
    setList(filteredList);
  }, [search]);

  return (
    <div className='w-full'>
      <label className="input w-full h-15 bg-surface mb-5">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search"
        />
      </label>

      {list.map((item) => (
        <div className="collapse bg-surface mb-2 collapse-plus bg-base-100 border border-base-300" key={item.name}>
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold">{item.name}</div>
          <pre className="collapse-content">{item.description}</pre>
        </div>
      ))}
    </div>
  )
}

export default Notes
