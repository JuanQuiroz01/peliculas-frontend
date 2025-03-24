import React, { useState, useEffect} from 'react'
import { getmedia } from '../../services/mediaServicio'


export const Vistamedia = () => {

  const [medias, setmedias ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);


  const listMedias = async () => {

    try {
  
      const { data } = await getmedia();
      console.log(data);
      setmedias(data);
      
  
    } catch(error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
    listMedias();
  }, []);
  
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div>Vistapeliculas</div>
  )
}
