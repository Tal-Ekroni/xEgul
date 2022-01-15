import {HomePage} from './pages/home-page.jsx'
import {GameRoom} from './pages/game-room.jsx'


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path:'/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path:'/:tictactoe/:id',
        component: GameRoom,
        label: 'Game Room 🏠',
    }
]

export default routes;