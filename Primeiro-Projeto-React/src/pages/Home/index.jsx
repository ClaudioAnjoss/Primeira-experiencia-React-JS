import React, { useState, useEffect } from 'react';

import './styles.css';

import { Card } from '../../components/Card'

export function Home() {

  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({
    name: '',
    avatar: '',
  });

  function handleAddStudent() {

    let user = studentName;

    let id = false

    const userGit = (
      fetch('https://api.github.com/users/' + user)
        .then(response => {
          if (response.ok) {
            return response.json()
          }

          throw new Error('Usuario nao encontrado')
        })

        // .then( response => response.json())
        .then(data => {

          const newStudent = {
            name: data.name,
            avatar: data.avatar_url,
            src: data.avatar_url,
            id: data.id,
            time: new Date().toLocaleTimeString("pt-br", {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          };

          students.forEach(e => {
            if (e.id == newStudent.id) {
              console.log('id ja existe')
              id = true

            }
          })

          if (!id) {
            setStudents(prevState => [...prevState, newStudent]);
          } else {
            alert('O usuario ja está com a presença confirmada')
          }
        })
        .catch(error => {
          alert(error)
        })
    )
  }

  useEffect(() => {
    fetch('https://api.github.com/users/claudioanjoss')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
  }, [students])

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presenças</h1>

        <div>
          <strong>Developer: {user.name}</strong>
          <img src={user.avatar} alt="Foto do Perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite seu nome de usuario do GitHub"
        onChange={e => setStudentName(e.target.value)}
      />

      <button
        type='button'
        onClick={handleAddStudent}
      >Adicionar</button>


      {
        students.map(student => (<Card
          key={student.id}
          name={student.name}
          time={student.time}
          src={student.src}
        />))
      }

    </div>
  )
}


