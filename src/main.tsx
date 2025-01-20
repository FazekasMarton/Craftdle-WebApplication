import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('wrapper')!).render(
    <Provider store={store}>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </Provider>
)
