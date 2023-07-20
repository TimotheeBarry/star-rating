import './styles/App.css';
import RatingRow from './components/RatingRow';
import { useEffect, useState } from 'react';

function App() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [totalRow, setTotalRow] = useState(<RatingRow rating={0} setRating={null} title='Total' isTotal={true} hide={true}/>);

  function getAverage() {
    if (rating1 === 0 || rating2 === 0 || rating3 === 0 || rating4 === 0) {
      return 0;
    }
    return (rating1 + rating2 + rating3 + rating4) / 4;
  }

  useEffect(() => {
    buildTotalRow()
  }, [rating1, rating2, rating3, rating4]);

  function buildTotalRow(total = getAverage()) {
    if (total > 0) {
      console.log(total);
      setTotalRow(<RatingRow rating={total} setRating={null} title='Total' isTotal={true} />)
    }
  }




  return (
    <div className="App">
      <div>
        <RatingRow rating={rating1} setRating={setRating1} title='Tests 1' />
        <RatingRow rating={rating2} setRating={setRating2} title='Tests 2' />
      </div>
      <div>
        <RatingRow rating={rating3} setRating={setRating3} title='Tests 3' />
        <RatingRow rating={rating4} setRating={setRating4} title='Tests 4' />

      </div>
      {totalRow}
    </div>
  );
}

export default App;
