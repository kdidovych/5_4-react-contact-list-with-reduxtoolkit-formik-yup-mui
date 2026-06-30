import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

function App() {
    return (
        <>
            <header>
                <h1>Contact List</h1>
            </header>
            <main>
                <ContactList/>
                <ContactForm/>
            </main>
        </>
    )
}

export default App;