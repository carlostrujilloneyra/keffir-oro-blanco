'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export enum groups {
  legacy = 'Legacy',
  migrated_acquired = 'MigradoAdquirido',
  native_acquired = 'NativoAdquirido',
  no_deposit = 'NoDeposit',
  monetized = 'Monetizado',
  loyalty = 'Fidelizado',
  default = 'Default',
  LoggedOut = 'LoggedOut',
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const formValues: Post = {
  userId: 10,
  id: 404,
  title: 'Este es un nuevo post',
  body: 'Este post fue agregado al ser capturado desde un formulario',
};

const handleAddPost = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formValues),
    });

    if (!response.ok) throw new Error('No se pudo almacenar el post');

    console.log('Se creó perfectamente!!');

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log('Error al crear un post', error);
  }
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/404');

      setPosts(response.data);
    };

    getPosts();
  }, []);

  return (
    <>
      <p>HomePage</p>

      <pre>{JSON.stringify(posts, null, 2)}</pre>

      <button
        className='mt-2 cursor-pointer rounded-lg bg-slate-500 px-3 py-2 font-bold text-white'
        onClick={handleAddPost}
      >
        Agregar
      </button>
    </>
  );
}
