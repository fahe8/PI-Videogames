import React from 'react'
import s from './createGame.module.css'
function CreateGame() {
  return (
    <div className={s.container}>
      <form className={s.formCreate} action="" method="post">

        <div className={s.containerInput}><label for="name">Name:</label><input id="name" name='name' className={s.inputCreate} type="text" /></div>


        <div className={s.containerInput}><label for="released">Released:</label ><input id="released" name='released' className={s.inputCreate} type="text" /></div>

        <div className={s.containerInput}><label for="rating">Rating:</label><input id="rating" name='rating' className={s.inputCreate} type="text" /></div>

        <div className={s.containerInput}><label for="">Description:</label><textarea name="description" id="description" cols="30" rows="5"></textarea></div>

        <div className={s.containerInput}><label for="platforms">PlatForms:</label><select name="platforms" id="platforms" >
          <option value=""  hidden>Select platforms</option>
          <option value="PS"  >ps</option>
          <option value="PS"  >ps</option>
          <option value="PS"  >ps</option>
          <option value="PS"  >ps</option>
          <option value="PS"  >ps</option>
          </select></div>

        <div className={s.containerInput}><label for="">Genres:</label><input className={s.inputCreate} type="text" /></div>


      </form>
    </div>
  )
}

export default CreateGame