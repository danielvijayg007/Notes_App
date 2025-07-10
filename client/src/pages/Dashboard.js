import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/register');
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes', {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post('/api/notes', { content: newNote }, {
        headers: { Authorization: token },
      });
      setNotes([...notes, res.data]);
      setNewNote('');
      setShowInput(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: token }
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete note');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>📝 My Notes</h1>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>

      {showInput && (
        <div className="note-input-container">
          <input
            ref={inputRef}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note..."
          />
          <button onClick={addNote}>Add Note</button>
        </div>
      )}

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note._id}>
            {note.content}
            <button className="delete-btn" onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>

      <button className="floating-add-button" onClick={() => {
        setShowInput(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }}>+</button>
    </div>
  );
}
