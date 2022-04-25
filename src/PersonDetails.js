import {
  useQuery,
  gql
} from "@apollo/client";
import React from "react";
import {useParams } from 'react-router-dom';

export function PersonDetails() {
  const {name}: {id: string} = useParams();
  console.log(name)

  const { isLoading, error, data } = useQuery(gql`
  {
      person(name:"${name}"){
          results{
            name
            height
            mass
            hair_color
            skin_color
            eye_color
            birth_year
            gender
            homeworld
            url
          }
        }
  }
`);

console.log(data)
let isSuccess = false;

if (data?.person?.results) {
    isSuccess = true;
}

return <div>
    {isSuccess ? data.person.results[0].name : null}
    {isSuccess ? data.person.results.map((person) => {
        return (
            <div>
            <div className="column-left">
          <p className="paragraphing">
          name: {person.name}
          </p>
          <p className="paragraphing">
          height: {person.height}
          </p>
          <p className="paragraphing">
          mass: {person.mass}
          </p>
          </div>
          <div className="column-center">
          <p className="paragraphing">
          hair_color: {person.hair_color}
          </p>
          <p className="paragraphing">
          eye_color: {person.eye_color}
          </p>
          <p className="paragraphing">
          birth_year: {person.birth_year}
          </p>
          </div>
          <div className="column-right">
          <p className="paragraphing">
          gender: {person.gender}
          </p>
          <p className="paragraphing">
          homeworld: {person.homeworld}
          </p>
          <p className="paragraphing">
          url: {person.url}
          </p>
          </div>
          </div>

        )
    }) : null}
</div>





};



export default PersonDetails;