import './app.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App () {

    const users = [
        {
            userName: 'Midudev',
            name: 'Miguel Duran',
            isFollowing: true,
        },
        {
            userName: 'Nestor',
            name: 'Nestor Cacas',
            isFollowing: false,
        },
        {
            userName: 'Frisman04',
            name: 'Santiago Seipel',
            isFollowing: true,
        },
        {
            userName: 'ursu',
            name: 'Joaquin Cordoba',
            isFollowing: false
        }
    ]

    return (
        <section className='App'>
            {
                users.map(user => {
                    const {userName, name, isFollowing} = user
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                            name={name}
                        /> 
                    )
                })
            }
        </section>
    )
}