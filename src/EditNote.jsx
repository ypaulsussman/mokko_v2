import {  useParams } from 'react-router-dom';

function EditNote() {
  const { noteId } = useParams();
  return (
    <>
      <p>wow I'm gonna be a form for editing preexisting notes soon!</p>
      <p>also the id that you entered in the URL is {noteId}</p>
    </>
  );
}

export default EditNote;
