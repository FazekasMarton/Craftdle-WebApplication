import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

createRoot(document.getElementById('wrapper')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
