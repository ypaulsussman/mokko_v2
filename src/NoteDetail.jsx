import {  useParams } from 'react-router-dom';

function NoteDetail() {
  const { noteId } = useParams();
    return (
    <>
      <p>wow I'm gonna be all the interesting information about a single note soon!</p>
      <p>also the id that you entered in the URL is {noteId}</p>
    </>
  );
}

export default NoteDetail;
